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
  @ViewChild('links') linksParent: ElementRef;

  currentPage: string;
  ignoredPages = ['singleplayer', 'multiplayer', 'online'];

  constructor(private viewRef: ViewContainerRef){    
  }

  ngOnInit(): void {
    this.viewRef.clear();
    
  }

  ngAfterViewInit(): void {
    this.currentPage = window.location.href.split("/").slice(-1)[0];
    this.whiteBarLogic()
  }

  isLogged(currentAnchor: HTMLAnchorElement) {
    let user = UserController.user
    if (user) {
      // const UserProfileRef = this.viewRef.createComponent(UserProfileComponent);
      // UserProfileRef.setInput("username", user.user);
      currentAnchor.innerHTML = `<img width="45" src="${user.profileImage}"><div>${user.user}</div>`;
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

}
