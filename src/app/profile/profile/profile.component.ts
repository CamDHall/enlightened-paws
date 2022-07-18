import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AngularFireAuth, private authService: AuthService, private fns: AngularFireFunctions) { }

  ngOnInit(): void {
    const callable = this.fns.httpsCallable('userDetails');
    const temp = callable({});
    temp.subscribe(data => {
      console.log(data);
    });
  }

  logout() {
    this.authService.logout();
  }
}
