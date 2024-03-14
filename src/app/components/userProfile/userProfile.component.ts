import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-userProfile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  @Input('username') username: string;

  constructor() { }

  ngAfterViewInit(): void {

  }

  ngOnInit() {
  }


}
