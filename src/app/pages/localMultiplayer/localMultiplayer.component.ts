import { Component, HostListener, OnInit } from '@angular/core';
import { RoomFormComponent } from '../../components/roomForm/roomForm.component';
import { MainCanvasComponent } from "../../components/mainCanvas/mainCanvas.component";

@Component({
    selector: 'app-localMultiplayer',
    standalone: true,
    templateUrl: './localMultiplayer.component.html',
    styleUrls: ['./localMultiplayer.component.scss'],
    imports: [RoomFormComponent, MainCanvasComponent]
})
export class LocalMultiplayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // GameController.InitialiseUpdate();
  }

}
