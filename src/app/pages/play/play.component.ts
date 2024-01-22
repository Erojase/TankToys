import { Component, HostListener, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  @HostListener('click', ['$event'])
  onClick(e:Event){
    console.log((<HTMLElement>e.target).tagName);
    
    switch ((<HTMLElement>e.target).tagName) {
      case "IMG":
        this.goto((<HTMLImageElement>e.target).alt);
        break;
      default:
        break;
    }
  }

  goto(route:string){
    this.router.navigate(['/play/'+route])
  }

}
