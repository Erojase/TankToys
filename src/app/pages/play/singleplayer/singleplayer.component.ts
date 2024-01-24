import { Component, OnInit } from '@angular/core';
import { GameController } from '../../../controllers/GameController';
import { MainCanvasComponent } from '../../../components/mainCanvas/mainCanvas.component';

@Component({
  selector: 'app-singleplayer',
  standalone: true,
  templateUrl: './singleplayer.component.html',
  styleUrls: ['./singleplayer.component.css'],
  imports: [ MainCanvasComponent ]
})
export class SingleplayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    GameController.InitialiseUpdate();
  }

}
