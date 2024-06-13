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
    
    tipoBullet:BulletType = BulletType.Normal;

    constructor() { 
    }
    
    @HostListener('window:click', ['$event'])
    onClick(e: Event){
        TankController.shootBullet();
    }

    ngOnInit() {
        TankController.tank = new Tank(GameMap.PositionAssign(window.innerWidth, window.innerHeight), "player")
        GameController.addToGameLoop("move_player", ()=>TankController.MoveV2(this.self.nativeElement.getBoundingClientRect()));
       
        CPUManager.addPlayerToTrack(TankController.tank);     

        this.tipoBullet = TankController.tank.bulletType;


        // this.viewRef.clear();
        for (let i = 0; i < this.tipoBullet.numBullets; i++) {
    
            const compref = this.mainViewRef.createComponent(BulletComponent);
            compref.setInput("type", "player");
            compref.setInput("name", "playerBullet" + i);
            compref.setInput("wBullet", this.tipoBullet.wBullet);
            compref.setInput("hBullet", this.tipoBullet.hBullet);
            compref.setInput("bounces", this.tipoBullet.bounces);
            compref.setInput("cooldown", this.tipoBullet.cooldown);
            console.log('jamon => ', compref);            
            
            //GameController.addToGameLoop(()=> GameMap.registerCollider(compref.location.nativeElement.getBoundingClientRect(), "playerBullet"+i));
        }
        
    }
    
    ngAfterViewInit(){
        GameController.addToGameLoop("collider_player", ()=> GameMap.registerCollider(this.self.nativeElement.getBoundingClientRect(), "player"));
    }
    
    @HostListener('window:keypress', ['$event'])
    onKeyPress(e: KeyboardEvent){
        TankController.addKey(e.key)
    }
    
    @HostListener('window:keyup', ['$event'])
    onKeyUp(e: KeyboardEvent){
        TankController.removeKey(e.key)
    }
    
    setCannonRotation = () => TankController.cannonRotation;

    setDivStyles(){
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

    setImgStyles(){
        return {
            "position": 'absolute',
            "width": "45px",
            "height": "45px",
            "zIndex": "50",
            "rotate": `${TankController.tank.rotation}deg`
        }
    }

}
