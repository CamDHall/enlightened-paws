import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { LoginComponent } from './profile/login/login.component';
import { SignUpComponent } from './profile/sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { HomeComponent } from './home/home/home.component';

const redirectLoggedInToProfiles = () => redirectLoggedInTo(['profile']);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [ AngularFireAuthGuard ], data: { authGuardPipe: redirectLoggedInToProfiles } },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent, canActivate: [ AngularFireAuthGuard ], data: { authGuardPipe: redirectLoggedInToProfiles } },
  { path: 'profile', component: ProfileComponent, canActivate: [ AngularFireAuthGuard ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }