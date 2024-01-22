import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})
export class SignInComponent implements OnInit {

  login: HTMLElement | null;
  signin: HTMLElement | null;

  constructor() { }

  ngOnInit() {
    this.login = document.getElementById("log");
    this.signin = document.getElementById("sign");
  }

  @HostListener('click', ['$event'])
  onClick(e:Event){
    switch ((<HTMLElement>e.target).className) {
      case "clickable":
        this.hiddenToggle();
        break;
      default:
        break;
    }
  }

  hiddenToggle(){
    if (this.login!.className.includes("hide") ) {
      this.login!.classList.remove("hide");
      this.signin!.classList.add("hide");
  } else {
      this.signin!.classList.remove("hide");
      this.login!.classList.add("hide");
  }
  }


}
