import { Component, OnInit, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bullet } from '../../models/Bullet';
import { TankController } from '../../controllers/TankController';
import { CPUController } from '../../controllers/CPUController';

@Component({
    selector: 'app-bullet',
    standalone: true,
    templateUrl: './bullet.component.html',
    styleUrls: ['./bullet.component.scss'],
    imports: [CommonModule]
})
export class BulletComponent implements OnInit, AfterViewInit {
    @ViewChild('self') self: ElementRef<HTMLElement>;
    @Input("type") type: "player" | "CPU";
    @Input("controller") controller: undefined | CPUController;
    @Input("name") name: string;
    @Input("wBullet") wBullet:number = 30;
    @Input("hBullet") hBullet:number = 20;
    @Input("bounces") maxBounces:number = 1;
    @Input("cooldown") cooldown:number = 200;

    bullet: Bullet;
    // _wBullet:number;
    // _hBullet:number;

    constructor() {
        this.bullet = new Bullet();
        
    }

    ngOnInit() {      
        this.bullet.wBullet = this.wBullet;
        this.bullet.hBullet = this.hBullet;
        this.bullet.maxBounce = this.maxBounces;
        this.bullet.cooldown = this.cooldown;
        if (this.type == "player") {
            TankController.bullets.push(this.bullet);
        } else {
            this.controller!.bullet = this.bullet;
        }
    }

    ngAfterViewInit() {
        
        
    }

    setStyles() {
        return {
            "position": 'absolute',
            "zIndex": 60,
            "width": `${this.wBullet}px`,
            "height": `${this.hBullet}px`,
            "top": `${this.bullet.position.y}px`,
            "left": `${this.bullet.position.x}px`,
            "rotate": `${this.bullet.rotation}rad`
        }
    }

}
