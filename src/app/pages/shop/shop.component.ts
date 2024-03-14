import { AfterViewInit, Component, ComponentRef, OnInit, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
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
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, AfterViewInit {
  @ViewChild('container', {read: ViewContainerRef}) viewRef: ViewContainerRef;
  @ViewChild('body', {read: ElementRef}) body: ElementRef<HTMLElement>;

  constructor(  ) { }

  ngAfterViewInit(): void {
    Promise.resolve(null).then(() => this.initShopItems());
  }

  ngOnInit() {
    
  }

  initShopItems() {
    this.viewRef.clear()
      shopItems.forEach(item =>{
      let shopComp = this.viewRef.createComponent(ShopItemComponent);
      shopComp.setInput('title', item.title);
      shopComp.setInput('price', item.price);
      shopComp.setInput('imgSrc', item.imgSrc);
    })
    console.log(this.body.nativeElement.children);
    
    for (const child of this.body.nativeElement.children) {
      (<HTMLElement>child).style.height = "min-content"
    }
  }


}
