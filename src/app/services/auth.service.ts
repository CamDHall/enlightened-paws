import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public auth: AngularFireAuth, private router: Router) {
  }

  async signup(email: string, password: string): Promise<void> {
    await this.auth.createUserWithEmailAndPassword(email, password);
    // createUser on server side needs to finish before redirecting
    await delay(3000);
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
    this.router.navigate(['login']);
  }
}
