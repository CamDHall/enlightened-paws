import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  emailControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passwordControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  loading = false;
  error = false;
  
  fbIcon = faFacebook;
  googleIcon = faGoogle;
  twitterIcon = faTwitter;

  constructor(public auth: AngularFireAuth, private router: Router) {
  }
  googleLogin() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(() => {
      this.router.navigate(['profile']);
    });
  }

  twitterLogin() {
    this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
    .then(() => {
      this.router.navigate(['profile']);
    });
  }

  facebookLogin() {
    this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(() => {
      this.router.navigate(['profile']);
    });
  }

  emailLogin() {
    if(!this.isValid()) {
      alert('Login is invalid. Please contact support.');
    }
    
    this.loading = true;

    this.auth.signInWithEmailAndPassword(this.emailControl.value, this.passwordControl.value)
    .then(() => {
      this.router.navigate(['profile']);
    })
    .catch(error => {
      this.loading = false;
      this.error = true;

      console.error(error);
    });
  }

  logout() {
    this.auth.signOut();
  }

  isValid() {
    return this.emailControl.valid && this.passwordControl.valid;
  }
}
