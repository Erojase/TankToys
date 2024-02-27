import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css'],
})
export class SignInComponent implements OnInit, AfterViewInit {
  @ViewChild('googleSign') googleSignBtn: ElementRef<HTMLButtonElement>;
  @ViewChild('metaSign') metaSignBtn: ElementRef<HTMLButtonElement>;
  @ViewChild('googleLog') googleLogBtn: ElementRef<HTMLButtonElement>;
  @ViewChild('metaLog') metaLogBtn: ElementRef<HTMLButtonElement>;

  login: HTMLElement | null;
  signin: HTMLElement | null;

  constructor() { }
  
  ngOnInit() {
  
    this.login = document.getElementById("log");
    this.signin = document.getElementById("sign");
  }
  
  ngAfterViewInit(): void {
    this.googleSignBtn.nativeElement.addEventListener('click', () => this.googleSign());
    this.metaSignBtn.nativeElement.addEventListener('click', () => this.metaSign());
    this.googleLogBtn.nativeElement.addEventListener('click', () => this.googleLog());
    this.metaLogBtn.nativeElement.addEventListener('click', () => this.metaLog());
  }
  googleSign(): any {
    throw new Error('Method not implemented.');
  }
  metaSign(): any {
    throw new Error('Method not implemented.');
  }
  googleLog(): any {
    throw new Error('Method not implemented.');
  }
  metaLog(): any {
    throw new Error('Method not implemented.');
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
