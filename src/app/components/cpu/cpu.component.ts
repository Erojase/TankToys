
import { TankController } from '../../controllers/TankController';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CannonComponent } from "../cannon/cannon.component";
import { GameController } from '../../controllers/GameController';
import { CPUController } from '../../controllers/CPUController';
import { GameMap } from '../../models/Map';

@Component({
  selector: 'app-cpu',
  standalone: true,
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css'],
  imports: [ CommonModule, CannonComponent ]
})
export class CpuComponent implements OnInit, AfterViewInit {
  @ViewChild('self') self: ElementRef<HTMLDivElement>;

  constructor() { }

  ngAfterViewInit(): void {
    GameMap.registerCollider(this.self.nativeElement.getBoundingClientRect(), "tank");
  }
  
  ngOnInit() {
    
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
