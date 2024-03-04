import { Component, HostListener, OnInit, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dimensions } from '../../utils/utils';
import { TankController } from "../../controllers/TankController";
import { ScopeComponent } from "../scope/scope.component";
import { TankComponent } from "../tank/tank.component";
import { BulletComponent } from "../bullet/bullet.component";
import { MapComponent } from "../map/map.component";
import { CpuComponent } from '../cpu/cpu.component';
import { ReferenceRepository } from '../../controllers/ReferenceRepository';

@Component({
    selector: 'app-mainCanvas',
    standalone: true,
    templateUrl: './mainCanvas.component.html',
    styleUrls: ['./mainCanvas.component.css'],
    imports: [
        CommonModule,
        ScopeComponent,
        TankComponent,
        BulletComponent,
        MapComponent,
        CpuComponent
    ]
})
export class MainCanvasComponent implements OnInit {

    currentWindow: dimensions = {
        height: 0,
        width: 0
    }

    constructor(private viewRef: ViewContainerRef) { }

    @HostListener('mousemove', ['$event'])
    onMouseMove(e: MouseEvent){
        TankController.scopePlacement(e);
    }



    setDivStyles(){
        return {
            "border": "1px solid black", 
            "height": `${this.currentWindow.height}px`, 
            "width": `${this.currentWindow.width}px`
        }
    }

    ngOnInit() {
        this.currentWindow = {
            height: window.innerHeight,
            width: window.innerWidth
        }
        this.viewRef.clear();
        const TankComponentRef = this.viewRef.createComponent(TankComponent);
        TankComponentRef.setInput("mainViewRef", this.viewRef);
        
        const CpuComponentRef = this.viewRef.createComponent(CpuComponent);  
        CpuComponentRef.setInput("mainViewRef", this.viewRef);
        
        ReferenceRepository.Component["player"] = TankComponentRef;
        ReferenceRepository.Component["cpu"] = CpuComponentRef;
    }

}
