import { Component, OnInit, Input, HostListener, OnChanges, SimpleChanges, ViewChild, AfterViewInit, ElementRef, ViewContainerRef, ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CannonComponent } from "../cannon/cannon.component";
import { GameController } from "../../controllers/GameController";
import { TankController } from "../../controllers/TankController";
import { CPUManager } from '../../controllers/CPUController';
import { BulletComponent } from "../bullet/bullet.component";
import { GameMap } from '../../models/Map';
import { BulletType, Tank } from '../../models/Tank';

@Component({
    selector: 'app-tank',
    standalone: true,
    templateUrl: './tank.component.html',
    styleUrls: ['./tank.component.scss'],
    imports: [CommonModule, CannonComponent, BulletComponent]
})
export class TankComponent implements OnInit, AfterViewInit {
    @ViewChild('self') self: ElementRef<HTMLElement>;
    @Input('mainViewRef') mainViewRef: ViewContainerRef;
    // @ViewChild('b1') bullet1: ElementRef<BulletComponent>;

    tipoBullet: BulletType = BulletType.Normal;
    compref: ComponentRef<BulletComponent>[] = [];


    constructor() {
    }

    @HostListener('window:click', ['$event'])
    onClick(e: Event) {
        TankController.shootBullet();
    }

    @HostListener('window:keyup', ['$event'])
    onKeyUp(event: KeyboardEvent) {
        let chiv = false;

        TankController.removeKey(event.key)

        if (event.key == "1") { //Nomral
            chiv = true;
            this.tipoBullet = BulletType.Normal;
            TankController.tank.bulletType = BulletType.Normal;
        } else if (event.key == "2") { //Rafagas
            chiv = true;
            this.tipoBullet = BulletType.Rafagas;
            TankController.tank.bulletType = BulletType.Rafagas;
        } else if (event.key == "3") { //Subfusil
            chiv = true;
            this.tipoBullet = BulletType.Subfusil;
            TankController.tank.bulletType = BulletType.Subfusil;
        } else if (event.key == "4") { //Sniper
            chiv = true;
            this.tipoBullet = BulletType.Sniper;
            TankController.tank.bulletType = BulletType.Sniper;
        } else if (event.key == "5") { //Escopeta
            chiv = true;
            this.tipoBullet = BulletType.Shotgun;
            TankController.tank.bulletType = BulletType.Shotgun;
        } else if (event.key == "6") { //Tortuga
            chiv = true;
            this.tipoBullet = BulletType.Tortuga;
            TankController.tank.bulletType = BulletType.Tortuga;
        } else if (event.key == "q") { //SUPERS
            console.log("Super");
            
            chiv = true;
            if (this.tipoBullet == BulletType.Normal) {
                this.tipoBullet = BulletType.SuperNormal;
                TankController.tank.bulletType = BulletType.SuperNormal;
            } else if (this.tipoBullet == BulletType.Rafagas) {
                this.tipoBullet = BulletType.SuperRafagas;
                TankController.tank.bulletType = BulletType.SuperRafagas;
            } else if (this.tipoBullet == BulletType.Subfusil) {
                this.tipoBullet = BulletType.SuperSubfusil;
                TankController.tank.bulletType = BulletType.SuperSubfusil;
            } else if (this.tipoBullet == BulletType.Sniper) {
                this.tipoBullet = BulletType.SuperSniper;
                TankController.tank.bulletType = BulletType.SuperSniper;
            } else if (this.tipoBullet == BulletType.Shotgun) {
                this.tipoBullet = BulletType.SuperShotgun;
                TankController.tank.bulletType = BulletType.SuperShotgun;
            } else if (this.tipoBullet == BulletType.Tortuga) {
                this.tipoBullet = BulletType.SuperTortuga;
                TankController.tank.bulletType = BulletType.SuperTortuga;
            }
        }


        if (chiv) {
            for (const bullet of this.compref) {
                bullet.destroy();
                this.compref = [];
            }
            TankController.bullets = [];

            for (let i = 0; i < this.tipoBullet.numBullets; i++) {

                let bullet = this.mainViewRef.createComponent(BulletComponent);
                bullet.setInput("type", "player");
                bullet.setInput("name", "playerBullet" + i);
                bullet.setInput("wBullet", this.tipoBullet.wBullet);
                bullet.setInput("hBullet", this.tipoBullet.hBullet);
                bullet.setInput("bounces", this.tipoBullet.bounces);
                bullet.setInput("cooldown", this.tipoBullet.cooldown);
                this.compref.push(bullet);
                console.log('jamon => ', bullet);

                //GameController.addToGameLoop(()=> GameMap.registerCollider(compref.location.nativeElement.getBoundingClientRect(), "playerBullet"+i));
            }
            chiv = false;
        }



    }

    ngOnInit() {
        window.innerHeight
        TankController.tank = new Tank(GameMap.PositionAssign(window.innerWidth, window.innerHeight), "player")
        GameController.addToGameLoop("move_player", () => TankController.MoveV2(this.self.nativeElement.getBoundingClientRect()));

        CPUManager.addPlayerToTrack(TankController.tank);

        this.tipoBullet = TankController.tank.bulletType;

        // this.viewRef.clear();
        for (let i = 0; i < this.tipoBullet.numBullets; i++) {

            let bullet = this.mainViewRef.createComponent(BulletComponent);
            bullet.setInput("type", "player");
            bullet.setInput("name", "playerBullet" + i);
            bullet.setInput("wBullet", this.tipoBullet.wBullet);
            bullet.setInput("hBullet", this.tipoBullet.hBullet);
            bullet.setInput("bounces", this.tipoBullet.bounces);
            bullet.setInput("cooldown", this.tipoBullet.cooldown);
            this.compref.push(bullet);
            console.log('jamon => ', bullet);

            //GameController.addToGameLoop(()=> GameMap.registerCollider(compref.location.nativeElement.getBoundingClientRect(), "playerBullet"+i));
        }

    }

    ngAfterViewInit() {
        GameController.addToGameLoop("collider_player", () => GameMap.registerCollider(this.self.nativeElement.getBoundingClientRect(), "player"));
    }

    @HostListener('window:keypress', ['$event'])
    onKeyPress(e: KeyboardEvent) {
        TankController.addKey(e.key)
    }

    setCannonRotation = () => TankController.cannonRotation;

    setDivStyles() {
        return {
            "position": 'absolute',
            "width": "45px",
            "height": "45px",
            "top": `${TankController.tank.position.x}px`,
            "left": `${TankController.tank.position.y}px`,
            "rotate": `${TankController.tank.rotation}deg`,
            "display": 'flex',
            "justifyContent": 'center',
            "alignItems": 'center'
        }
    }

    setImgStyles() {
        return {
            "position": 'absolute',
            "width": "45px",
            "height": "45px",
            "zIndex": "50",
            "rotate": `${TankController.tank.rotation}deg`
        }
    }

}
