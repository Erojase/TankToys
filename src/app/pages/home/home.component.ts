import { Component, OnInit } from '@angular/core';
import UserController from '../../controllers/user/UserController';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.scss'],
  imports: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    UserController.isGameRunning = true;
  }

}
