import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { GarageComponent } from './pages/garage/garage.component';
import { SignInComponent } from './pages/signIn/signIn.component';

import { PlayComponent } from './pages/play/play.component';
import { SingleplayerComponent } from './pages/play/singleplayer/singleplayer.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home' , pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'garage', component: GarageComponent },
    { path: 'play', component: PlayComponent },
    { path: 'play/singleplayer', component: SingleplayerComponent },
    { path: 'signIn', component: SignInComponent }
];
