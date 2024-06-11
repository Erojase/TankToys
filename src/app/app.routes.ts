import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { GarageComponent } from './pages/garage/garage.component';
import { SignInComponent } from './pages/signIn/signIn.component';

import { PlayComponent } from './pages/play/play.component';
import { SingleplayerComponent } from './pages/singleplayer/singleplayer.component';
import { LocalMultiplayerComponent } from './pages/localMultiplayer/localMultiplayer.component';
import { OnlineMultiplayerComponent } from './pages/onlineMultiplayer/onlineMultiplayer.component';
import { ShopComponent } from './pages/shop/shop.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home' , pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'garage', component: GarageComponent },
    { path: 'play', component: PlayComponent },
    { path: 'singleplayer', component: SingleplayerComponent },
    { path: 'online', component: OnlineMultiplayerComponent },
    { path: 'multiplayer', component: LocalMultiplayerComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'shop', component: ShopComponent }
];
