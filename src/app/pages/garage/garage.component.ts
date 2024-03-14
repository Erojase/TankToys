import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss']
})
export class GarageComponent implements OnInit {

  imgs: HTMLCollectionOf<HTMLImageElement>;
  check: HTMLElement | null;

  constructor() {

  }

  ngOnInit() {
    this.imgs = <HTMLCollectionOf<HTMLImageElement>>document.getElementsByClassName("tankImg");
    this.check = document.getElementById("check");
  }

  @HostListener('change', ['$event'])
  onChange(e: Event) {
    switch ((<HTMLElement>e.target).id) {
      case "check":
        this.change(e);   
        break;
      default:
        break;
    }
  }

  change(e: Event) {
    if ((<HTMLInputElement>e.target).checked) {
      for (const img of this.imgs) {
        img.src = img.src.replace("top", "bot");
      }
    } else {
      for (const img of this.imgs) {
        img.src = img.src.replace("bot", "top");
      }
    }

    let progressBars = document.getElementsByTagName("progress");

    for (const bar of progressBars) {
      bar.value = Math.random() * 100;
    }
  }

}
