import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import UserController from '../../controllers/user/UserController';
import { ServerCall } from '../../utils/ServerCall';
import { UserProfileComponent } from '../userProfile/userProfile.component';

@Component({
  selector: 'navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit, OnInit {
  @ViewChild('nav') nav: ElementRef<HTMLDivElement>;
  @ViewChild('links') linksParent: ElementRef<HTMLElement>;
  @ViewChild('burger') burger: ElementRef<HTMLDivElement>;

  currentPage: string;
  ignoredPages = ['none'/*'singleplayer', 'multiplayer', 'online'*/];

  linksToggle = false;

  constructor(private viewRef: ViewContainerRef){    
  }

  ngOnInit(): void {
    this.viewRef.clear();
    
  }

  ngAfterViewInit(): void {    
    this.burger.nativeElement.addEventListener('click', ()=>{this.menuTransitionToggle(this.linksParent)})
    this.currentPage = window.location.href.split("/").slice(-1)[0];
    this.whiteBarLogic()
  }

  isLogged(currentAnchor: HTMLAnchorElement) {
    let user = UserController.user
    if (user) {
      // const UserProfileRef = this.viewRef.createComponent(UserProfileComponent);
      // UserProfileRef.setInput("username", user.user);
      let img = document.createElement('img');
      img.src = user.profileImage;
      img.style.borderRadius = "10px";
      img.width = 45;

      let div = document.createElement('div');
      div.innerHTML = user.username;

      currentAnchor.innerHTML = "";
      currentAnchor.appendChild(img);
      currentAnchor.appendChild(div);
      currentAnchor.href = "/user";
      // currentAnchor.innerHTML = `<img width="45" src="${user.profileImage}"><div>${user.user}</div>`;
    }   
  }

  whiteBarLogic(){
    let linksChildren = (<HTMLDivElement>this.linksParent.nativeElement).children;

    if (this.ignoredPages.includes(this.currentPage)) {
      this.nav.nativeElement.style.visibility = "collapse";
    } else {
      this.nav.nativeElement.style.visibility = "visible";
    }
    

    for (const child of linksChildren) {
      let currentAnchor = <HTMLAnchorElement>child.children[0];    
      if (currentAnchor.href.split('/').slice(-1)[0] == this.currentPage) {
        currentAnchor.classList.add("nav-active");
      } else {
        currentAnchor.classList.remove("nav-active");
      }

      if (currentAnchor.href.split('/').slice(-1)[0] == 'home' && this.currentPage.length <= 1) {
        currentAnchor.classList.add("nav-active");
      }      

      if (currentAnchor.href.split('/').slice(-1)[0] == 'signIn') {
        this.isLogged(currentAnchor);
      }
      
    }
  }

  menuTransitionToggle(linksParent: ElementRef<HTMLElement>) {
    let keyframes = []
    let translation = "0%";
    if (this.linksToggle) {
      keyframes = [
        { transform: "translateY(0%)" },
        { transform: "translateY(-100%)" },
      ];
      translation = "-100%";
    } else {
      keyframes = [
        { transform: "translateY(-100%)" },
        { transform: "translateY(0%)" },
      ];
      translation = "0%";
    }
    linksParent.nativeElement.animate(
      keyframes,
      {
        // timing options
        duration: 500,
        iterations: 1,
      },
    );
    linksParent.nativeElement.style.transform = `translateY(${translation})`;
    this.linksToggle = !this.linksToggle;
  }

}
