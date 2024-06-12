import { AfterViewInit, Component, HostListener, Input, OnInit, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dimensions } from '../../utils/utils';
import { TankController } from "../../controllers/TankController";
import { ScopeComponent } from "../scope/scope.component";
import { TankComponent } from "../tank/tank.component";
import { BulletComponent } from "../bullet/bullet.component";
import { MapComponent } from "../map/map.component";
import { CpuComponent } from '../cpu/cpu.component';
import { ReferenceRepository } from '../../controllers/ReferenceRepository';
import { StageController } from '../../controllers/StageController';
import { GameController } from '../../controllers/GameController';

@Component({
    selector: 'app-mainCanvas',
    standalone: true,
    templateUrl: './mainCanvas.component.html',
    styleUrls: ['./mainCanvas.component.scss'],
    imports: [
        CommonModule,
        ScopeComponent,
        TankComponent,
        BulletComponent,
        MapComponent,
        CpuComponent
    ]
})
export class MainCanvasComponent implements OnInit, AfterViewInit {
    @Input('type') type: string;

    currentWindow: dimensions = {
        height: 0,
        width: 0
    }

    audioController: HTMLAudioElement;

    constructor(private viewRef: ViewContainerRef) { }

    ngAfterViewInit(): void {
        this.audioController = new Audio();
        this.audioController.src = "/assets/audio/videoplayback.wav";
        this.audioController.load();
        this.audioController.play();
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(e: MouseEvent) {
        TankController.scopePlacement(e);
    }

    setDivStyles() {
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
        ReferenceRepository.Component["player"] = TankComponentRef;

        if (this.type == "singleplayer") {
            this.initializeSingleplayer();
        }
    }

    initializeSingleplayer() {
        GameController.isSingleplayer = true;
        StageController.Init();
        const Cpu1ComponentRef = this.viewRef.createComponent(CpuComponent);
        Cpu1ComponentRef.setInput("mainViewRef", this.viewRef);
        Cpu1ComponentRef.setInput("name", "cpu1");

        const Cpu2ComponentRef = this.viewRef.createComponent(CpuComponent);
        Cpu2ComponentRef.setInput("mainViewRef", this.viewRef);
        Cpu2ComponentRef.setInput("name", "cpu2");

        ReferenceRepository.Component["cpu1"] = Cpu1ComponentRef;
        ReferenceRepository.Component["cpu2"] = Cpu2ComponentRef;
    }

}
