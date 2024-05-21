import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import MultiplayerController from '../../controllers/multiplayer/MultiplayerController';
import UserController from '../../controllers/user/UserController';
import { GameController } from '../../controllers/GameController';
import { TankController } from '../../controllers/TankController';
import { GameMap } from '../../models/Map';

@Component({
	selector: 'app-roomForm',
	standalone: true,
	templateUrl: './roomForm.component.html',
	styleUrls: ['./roomForm.component.scss']
})
export class RoomFormComponent implements OnInit {
	@ViewChild('roomIdField') roomIdField: ElementRef<HTMLInputElement>;

	constructor(private ele: ElementRef<HTMLElement>) { }

	ngOnInit() {
		let room = window.localStorage.getItem("room");
		if (room != null || room != undefined) {
			this.joinRoom();
		}
	}

	@HostListener('window:click', ['$event'])
	onClick(e: Event) {
		switch (true) {
			case (<HTMLElement>e.target).className.includes("join"):
					window.localStorage.setItem("room", this.roomIdField.nativeElement.value);
					this.joinRoom();
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

	joinRoom = () => {
		MultiplayerController.joinRoom(UserController.user?.address!, window.localStorage.getItem("room")!).then(res => {
			if (res) {
				alert("joined room");
				GameController.addToGameLoop(() => {
					MultiplayerController.roomData(window.localStorage.getItem("room")!, { x: TankController.tank.position.x, y: TankController.tank.position.y }).then(res => {
						console.log(JSON.stringify(res));
					})
				});
				GameController.reloadUpdate();
				this.ele.nativeElement.remove();
			} else {
				alert("couldn't join room");
			}
		});
	}

}
