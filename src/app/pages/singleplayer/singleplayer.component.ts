import { Component, OnInit } from '@angular/core';
import { GameController } from '../../controllers/GameController';
import { MainCanvasComponent } from '../../components/mainCanvas/mainCanvas.component';
import UserController from '../../controllers/user/UserController';

@Component({
  selector: 'app-singleplayer',
  standalone: true,
  templateUrl: './singleplayer.component.html',
  styleUrls: ['./singleplayer.component.scss'],
  imports: [ MainCanvasComponent ]
})
export class SingleplayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    UserController.isGameRunning = false;
    GameController.InitialiseUpdate();
  }

}
