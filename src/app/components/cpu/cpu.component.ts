
import { TankController } from '../../controllers/TankController';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CannonComponent } from "../cannon/cannon.component";
import { GameController } from '../../controllers/GameController';
import { CPUController, CPUManager } from '../../controllers/CPUController';
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
  @Input("name") name: string;

  _cpuController: CPUController;

  constructor() { 
    this._cpuController = new CPUController(GameMap.PositionAssign(window.innerWidth, window.innerHeight));
    CPUManager.CPUs.push(this._cpuController);
  }
  
  public cpuShoot: any;
  
  ngAfterViewInit() {
    GameMap.registerCollider(this.self.nativeElement.getBoundingClientRect(), this.name);
  }
  
  ngOnInit() {
    this._cpuController._name = this.name;
    setTimeout(() => {
      GameController.addToGameLoop("pathFind_"+this.name, () => this._cpuController.pathfinding(this.self.nativeElement.getBoundingClientRect()));
    }, 3000);
    for (let i = 0; i < 1; i++) {
      const compref = this.mainViewRef.createComponent(BulletComponent);
      compref.setInput("type", "CPU");
      compref.setInput("name", "cpuBullet" + i);
      compref.setInput("controller", this._cpuController);
      console.log('jamon => ', compref);
      //GameController.addToGameLoop(() => GameMap.registerCollider(compref.location.nativeElement.getBoundingClientRect(), "cpuBullet" + i));
    }
    this.cpuShoot = setInterval(() => {
      this._cpuController.shootBullet();
    }, 4000);
    
    GameController.addToGameLoop("collider_"+this.name, () => GameMap.registerCollider(this.self.nativeElement.getBoundingClientRect(), this.name)); 
  }

  setCPURotation = (): number => this._cpuController.cannonRotation;
  setDivStyles() {
    return {
      "position": 'absolute',
      "width": "45px",
      "height": "45px",
      "top": `${this._cpuController.cpu.position.x}px`,
      "left": `${this._cpuController.cpu.position.y}px`,
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
