import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { GarageComponent } from './pages/garage/garage.component';
import { PlayComponent } from './pages/play/play.component';
import { SignInComponent } from './pages/signIn/signIn.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'garage', component: GarageComponent},
    {path: 'play', component: PlayComponent},
    {path: 'signIn', component: SignInComponent}
];
