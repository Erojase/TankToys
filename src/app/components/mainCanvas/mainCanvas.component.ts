import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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
import { GameMap } from '../../models/Map';

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
    @ViewChild('map') map: MapComponent;

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
        // this.audioController.play();

        if (this.type == "singleplayer") {
            StageController.Init(this);
            this.initializeSingleplayer();
        }
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
    }

    initializeSingleplayer() {
        GameController.clear();
        GameMap.resetColliders();
        this.viewRef.clear();
        this.map.reload();
        TankController.bullets = [];
        GameController.isSingleplayer = true;

        const TankComponentRef = this.viewRef.createComponent(TankComponent);
        TankComponentRef.setInput("mainViewRef", this.viewRef);
        ReferenceRepository.Component["player"] = TankComponentRef;

        for (let i = 0; i < StageController.currentStage.enemies; i++) {
            let cpuComponent = this.viewRef.createComponent(CpuComponent);
            cpuComponent.setInput("mainViewRef", this.viewRef);
            cpuComponent.setInput("name", "cpu"+(i+1));
            ReferenceRepository.Component["cpu"+(i+1)] = cpuComponent;
        }
    }

}
