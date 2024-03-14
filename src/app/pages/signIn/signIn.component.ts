import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers';
import { MatCardModule } from '@angular/material/card';
import { BrowserProvider, JsonRpcSigner, ethers } from 'ethers';
import { ServerCall } from '../../utils/ServerCall';
import { Router } from '@angular/router';
import UserController from '../../controllers/user/UserController';
import Web3Controller from '../../controllers/Web3Controller';
import { GoogleLoginProvider, SocialAuthService, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';



@Component({
  selector: 'app-signIn',
  standalone: true,
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.scss'],
  imports: [MatCardModule, GoogleSigninButtonModule]
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

  constructor(private router: Router, private socialAuthService: SocialAuthService) { }
  
  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => this.signUp(user.id, user.name));
    this.login = document.getElementById("log");
    this.signin = document.getElementById("sign");
  }

  ngAfterViewInit(): void {
    this.metamaskBtn.nativeElement.addEventListener('click', () => this.metaSignLog());
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
      let j = Web3Controller.LogPlayer(<BrowserProvider>this.provider);

      UserController.SetSigner(this.signer);
      
      this.router.navigate(['/']).then(()=>{
        window.location.reload();
        if (UserController.Signer != null) {
          ServerCall.getUser(UserController.Signer.address);
        }
        console.log(j);}
      );
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

  async signUp(id:string, username:string){
    console.log(`signin up ${username} user with id ${id}`);
    
    let res = await ServerCall.register(id, username);
    console.log(res);
  }

  submitUsername = async () => await this.signUp(this.signer.address, this.txtUsername.nativeElement.value);


}
