import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers';
import { MatCardModule } from '@angular/material/card';
import { JsonRpcSigner, ethers } from 'ethers';
import { ServerCall } from '../../utils/ServerCall';




@Component({
  selector: 'app-signIn',
  standalone: true,
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css'],
  imports: [MatCardModule]
})
export class SignInComponent implements OnInit, AfterViewInit {
  @ViewChild('google') googleBtn: ElementRef<HTMLButtonElement>;
  @ViewChild('metamask') metamaskBtn: ElementRef<HTMLButtonElement>;
  @ViewChild('txtUsername') txtUsername: ElementRef<HTMLInputElement>;

  login: HTMLElement | null;
  signin: HTMLElement | null;

  signer: JsonRpcSigner;
  provider: unknown;
  contract: any;
  address: string;

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
      console.log(this.provider);
      
    } else {
      this.provider = new ethers.BrowserProvider(<any>window.ethereum);
      this.signer = await ((<ethers.BrowserProvider>this.provider).getSigner());
      await this.signer.signMessage("Connect with TankToys");
      let le = await ServerCall.login(this.signer.address);
      console.log(le);
    }
  }

  @HostListener('click', ['$event'])
  onClick(e:Event){
    switch ((<HTMLElement>e.target).className) {
      case "clickable":
        this.submitUsername();
        break;
      default:
        break;
    }
  }

  async submitUsername(){
    let res = await ServerCall.register(this.signer.address, this.txtUsername.nativeElement.value);
    console.log(res);
    
  }


}
