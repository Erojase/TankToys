import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopItem',
  templateUrl: './shopItem.component.html',
  styleUrls: ['./shopItem.component.scss']
})
export class ShopItemComponent implements OnInit {
  @Input('title') title: string;
  @Input('price') price: number;
  @Input('imgSrc') imgSrc: string;

  constructor() { }

  ngOnInit() {
  }

}
