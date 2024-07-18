import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistsListComponent } from './components/artists-list/artists-list.component';
import { LocalListComponent } from './components/local-list/local-list.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { ProfileViewComponent } from './components/profile/profile-view/profile-view.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { CreateEventComponent } from './components/create-event/create-event.component';

import { AuthGuard } from './guards/auth.guard';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'artists', component: ArtistsListComponent },
  { path: 'locals', component: LocalListComponent },
  { path: 'events', component: EventListComponent },
  { path: 'profile/:id', component: ProfileViewComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id/edit', component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: 'events', component: EventListComponent },
  { path: 'events/:id', component: EventDetailComponent },
  { path: 'new-event', component: CreateEventComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];
