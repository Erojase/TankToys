
import { TankController } from '../../controllers/TankController';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CannonComponent } from "../cannon/cannon.component";
import { GameController } from '../../controllers/GameController';
import { CPUController } from '../../controllers/CPUController';
import { GameMap } from '../../models/Map';
import { BulletComponent } from '../bullet/bullet.component';

@Component({
  selector: 'app-cpu',
  standalone: true,
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.scss'],
  imports: [CommonModule, CannonComponent]
})
export class CpuComponent implements OnInit, AfterViewInit {
  @ViewChild('self') self: ElementRef<HTMLDivElement>;
  @Input('mainViewRef') mainViewRef: ViewContainerRef;

  constructor() { }

  public static cpuShoot: any;

  ngAfterViewInit() {
    GameMap.registerCollider(this.self.nativeElement.getBoundingClientRect(), "cpu");
  }
  
  ngOnInit() {
    GameController.addToGameLoop(() => CPUController.pathfinding(this.self.nativeElement.getBoundingClientRect()));
    for (let i = 0; i < 1; i++) {
      const compref = this.mainViewRef.createComponent(BulletComponent);
      compref.setInput("type", "CPU");
      compref.setInput("name", "cpuBullet" + i);
      console.log('jamon => ', compref);
      //GameController.addToGameLoop(() => GameMap.registerCollider(compref.location.nativeElement.getBoundingClientRect(), "cpuBullet" + i));
    }
    CpuComponent.cpuShoot = setInterval(() => {
      CPUController.shootBullet();
    }, 4000);
    
    GameController.addToGameLoop(() => GameMap.registerCollider(this.self.nativeElement.getBoundingClientRect(), "cpu")); 
  }

  setCPURotation = (): number => CPUController.cannonRotation;
  setDivStyles() {
    return {
      "position": 'absolute',
      "width": "45px",
      "height": "45px",
      "top": `${CPUController.cpu.position.x}px`,
      "left": `${CPUController.cpu.position.y}px`,
      "rotate": `${TankController.tank.rotation}deg`,
      "display": 'flex',
      "justifyContent": 'center',
      "alignItems": 'center',
      "border": '1px solid green'
    }
  }

  setImgStyles() {
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
