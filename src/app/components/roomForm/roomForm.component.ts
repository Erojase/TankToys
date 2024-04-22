import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import MultiplayerController from '../../controllers/multiplayer/MultiplayerController';
import UserController from '../../controllers/user/UserController';

@Component({
  selector: 'app-roomForm',
  standalone: true,
  templateUrl: './roomForm.component.html',
  styleUrls: ['./roomForm.component.scss']
})
export class RoomFormComponent implements OnInit {
  @ViewChild('roomIdField') roomIdField: ElementRef<HTMLInputElement>;
  
  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:click', ['$event'])
  onClick(e:Event){
    switch (true) {
      case (<HTMLElement>e.target).className.includes("join"):
          MultiplayerController.joinRoom(UserController.user?.address!, this.roomIdField.nativeElement.value).then(res => {
            if (res) {
              alert("joined room");
            } else {
              alert("could't join room");
            }
          });
        break;
      case (<HTMLElement>e.target).className.includes("create"):
          MultiplayerController.createRoom(UserController.user?.address!, 0).then(res => {
            alert(res);
          });
        break;
      default:
        break;
    }
  }

}
