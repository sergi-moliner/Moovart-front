import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistsListComponent } from './components/artists-list/artists-list.component';
import { LocalListComponent } from './components/local-list/local-list.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { ArtistProfileComponent } from './components/profiles/artist-profile/artist-profile.component';
import { LocalProfileComponent } from './components/profiles/local-profile/local-profile.component';
import { ProfileRedirectComponent } from './components/profiles/profile-redirect/profile-redirect.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'artists', component: ArtistsListComponent },
  { path: 'locals', component: LocalListComponent },
  { path: 'events', component: EventListComponent },
  { path: 'artist-profile', component: ArtistProfileComponent, canActivate: [AuthGuard] },
  { path: 'local-profile', component: LocalProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileRedirectComponent, canActivate: [AuthGuard] },
];
