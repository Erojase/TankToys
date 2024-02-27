
import { TankController } from '../../controllers/TankController';
import { AfterViewInit, Component, ElementRef, EnvironmentInjector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
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
  styleUrls: ['./cpu.component.css'],
  imports: [ CommonModule, CannonComponent ]
})
export class CpuComponent implements OnInit, AfterViewInit {
  @ViewChild('self') self: ElementRef<HTMLDivElement>;

  constructor(private viewRef: ViewContainerRef) { }

  ngAfterViewInit(): void {
    GameMap.registerCollider(this.self.nativeElement.getBoundingClientRect(), "cpu");
  }
  
  ngOnInit() {
    this.viewRef.clear();
        for (let i = 0; i < 1; i++) {
            const compref = this.viewRef.createComponent(BulletComponent);
            compref.setInput("type", "CPU");
            console.log('jamon => ', compref);            
        }
    setInterval(() => {
      CPUController.shootBullet();
    }, 4000);
  }
  
  setCPURotation = (): number => CPUController.cannonRotation;
  setDivStyles(){
    return {
        "position": 'absolute',
        "width": "45px",
        "height": "45px",
        "top": `500px`,
        "left": `575px`,
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
