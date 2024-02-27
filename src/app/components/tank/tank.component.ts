import { Component, OnInit, Input, HostListener, OnChanges, SimpleChanges, ViewChild, AfterViewInit, ElementRef, ViewContainerRef, ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CannonComponent } from "../cannon/cannon.component";
import { GameController } from "../../controllers/GameController";
import { TankController } from "../../controllers/TankController";
import { Position, Tank } from "../../models/Tank";
import { CPUController } from '../../controllers/CPUController';
import { BulletComponent } from "../bullet/bullet.component";

@Component({
    selector: 'app-tank',
    standalone: true,
    templateUrl: './tank.component.html',
    styleUrls: ['./tank.component.css'],
    imports: [CommonModule, CannonComponent, BulletComponent]
})
export class TankComponent implements OnInit, AfterViewInit {
    @ViewChild('self') self: ElementRef<HTMLElement>; 
    @ViewChild('b1') bullet1: ElementRef<BulletComponent>;
    
    constructor(private viewRef: ViewContainerRef) { 
    }
    
    ngOnInit() {
        GameController.addToGameLoop(()=>TankController.MoveV2(this.self.nativeElement.getBoundingClientRect()));
        CPUController.addPlayerToTrack(TankController.tank);
        
        this.viewRef.clear();
        for (let i = 0; i < 5; i++) {
            const compref = this.viewRef.createComponent(BulletComponent);
            console.log('jamon => ', compref);            
        }
        
    }
    
    ngAfterViewInit(){
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
            "zIndex": "50px",
            "rotate": `${TankController.tank.rotation}deg`,
            "border": '1px solid green'
        }
    }

}
