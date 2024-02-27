import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers';
import { Eip1193Provider, JsonRpcSigner, ethers } from 'ethers';




@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css'],
})
export class SignInComponent implements OnInit, AfterViewInit {
  @ViewChild('google') googleBtn: ElementRef<HTMLButtonElement>;
  @ViewChild('metamask') metamaskBtn: ElementRef<HTMLButtonElement>;

  login: HTMLElement | null;
  signin: HTMLElement | null;

  signer: JsonRpcSigner;
  provider: unknown;
  contract: any;

  constructor() { }
  
  ngOnInit() {
  
    this.login = document.getElementById("log");
    this.signin = document.getElementById("sign");
  }
  
  ngAfterViewInit(): void {
    this.googleBtn.nativeElement.addEventListener('click', () => this.googleSignLog());
    this.metamaskBtn.nativeElement.addEventListener('click', () => this.metaSignLog());
  }
  googleSignLog(): any {
    throw new Error('Method not implemented.');
  }
  async metaSignLog(): Promise<any> {
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      this.provider = ethers.getDefaultProvider();
    } else {
      this.provider = new ethers.BrowserProvider(<any>window.ethereum);
      this.signer = await ((<ethers.BrowserProvider>this.provider).getSigner());
      console.log(this.signer);

      
      let j = await this.signer.signMessage("Connect with TankToys");
      console.log(j);
      
    }
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
