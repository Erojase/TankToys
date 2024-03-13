import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ShopItemComponent } from '../../components/shopItem/shopItem.component';

export interface shopItem{
  title: string;
  price: number;
  imgSrc: string;
}

const shopItems: shopItem[] = [
  {
    title: "test",
    price: 4,
    imgSrc: "https://www.maitreshygiene.ma/wp-content/uploads/2023/05/TEST-IMAGE.jpg"
  },
  {
    title: "test",
    price: 4,
    imgSrc: "https://www.maitreshygiene.ma/wp-content/uploads/2023/05/TEST-IMAGE.jpg"
  },
  {
    title: "test",
    price: 4,
    imgSrc: "https://www.maitreshygiene.ma/wp-content/uploads/2023/05/TEST-IMAGE.jpg"
  },
]

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private viewRef: ViewContainerRef) { }

  ngOnInit() {
    this.initShopItems();
  }
  initShopItems() {
    this.viewRef.clear()
    shopItems.forEach(item =>{
      let shopComp = this.viewRef.createComponent(ShopItemComponent);
      shopComp.setInput('title', item.title);
      shopComp.setInput('price', item.price);
      shopComp.setInput('imgSrc', item.imgSrc);
    })
  }

}
