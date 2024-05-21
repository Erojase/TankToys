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

    bullet: Bullet;

    constructor() {
        this.bullet = new Bullet();
    }

    ngOnInit() {      
        
        if (this.type == "player") {
            TankController.bullets.push(this.bullet);
        } else {
            this.controller!.bullet = this.bullet;
        }
        //GameController.addToGameLoop(() => GameMap.registerCollider(this.self.nativeElement.getBoundingClientRect(), this.name));
    }

    ngAfterViewInit() {
        //GameMap.registerCollider(this.self.nativeElement.getBoundingClientRect(), this.name);
    }

    setStyles() {
        return {
            "position": 'absolute',
            "zIndex": 60,
            "width": "30px",
            "height": "20px",
            "top": `${this.bullet.position.y}px`,
            "left": `${this.bullet.position.x}px`,
            "rotate": `${this.bullet.rotation}rad`
        }
    }

}
