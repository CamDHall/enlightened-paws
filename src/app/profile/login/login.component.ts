import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  
  fbIcon = faFacebook;
  googleIcon = faGoogle;
  twitterIcon = faTwitter;

  constructor(public auth: AngularFireAuth) {
  }
  googleLogin() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  twitterLogin() {
    this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  facebookLogin() {
    this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  emailLogin() {
    this.auth.signInWithEmailAndPassword(this.email, this.password);
  }

  logout() {
    this.auth.signOut();
  }
}
