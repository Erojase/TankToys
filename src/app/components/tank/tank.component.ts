import { Component, OnInit, Input, HostListener, OnChanges, SimpleChanges, ViewChild, AfterViewInit, ElementRef, ViewContainerRef, ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CannonComponent } from "../cannon/cannon.component";
import { GameController } from "../../controllers/GameController";
import { TankController } from "../../controllers/TankController";
import { CPUManager } from '../../controllers/CPUController';
import { BulletComponent } from "../bullet/bullet.component";
import { GameMap } from '../../models/Map';

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
    
    constructor() { 
    }
    
    @HostListener('window:click', ['$event'])
    onClick(e: Event){
        TankController.shootBullet();
    }

    ngOnInit() {
        GameController.addToGameLoop("move_player", ()=>TankController.MoveV2(this.self.nativeElement.getBoundingClientRect()));
       
        CPUManager.addPlayerToTrack(TankController.tank);     

        let tipoBullet = TankController.tank.bulletType;

        let numBullets:number = 0;
        let wBullet:number = 0;
        let hBullet:number = 0;
        let bounces:number = 0;
        let speed:number = 0;

        //0 - Nomral; 1 - Sniper; 2 - Subfusil; 3 - Shotgun
        if (tipoBullet == 0) {
            numBullets = 3;
            wBullet = 30;
            hBullet = 20;
            bounces = 1;
            speed = 20;
        } else if (tipoBullet == 1) {
            numBullets = 1;
            wBullet = 80;
            hBullet = 20;
            bounces = 4;
            speed = 80;
        } else if (tipoBullet == 2) {
            numBullets = 5;
            wBullet = 20;
            hBullet = 10;
            bounces = -0;
            speed = 70;
        } else if (tipoBullet == 3) {
            numBullets = 10;
            wBullet = 20;
            hBullet = 20;
            bounces = -0;
            speed = 30;
        }

        // this.viewRef.clear();
        for (let i = 0; i < numBullets; i++) {
    
            const compref = this.mainViewRef.createComponent(BulletComponent);
            compref.setInput("type", "player");
            compref.setInput("name", "playerBullet" + i);
            compref.setInput("wBullet", wBullet);
            compref.setInput("hBullet", hBullet);
            compref.setInput("bounces", bounces);
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
            "alignItems": 'center',
            "border": '1px solid green'
        }
    }

    setImgStyles(){
        return {
            "position": 'absolute',
            "width": "45px",
            "height": "45px",
            "zIndex": "50",
            "rotate": `${TankController.tank.rotation}deg`,
            "border": '1px solid green'
        }
    }

}
