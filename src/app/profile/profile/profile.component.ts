import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DogService } from 'src/app/services/dog.service';
import { UserService } from 'src/app/services/user.service';
import Dog from 'src/models/Dog';
import { User } from 'src/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit, OnDestroy {
  loading = true;
  user: User | null = null;
  editForm = false;
  newDogFormOpen = false;
  dogs: Dog[] = [];

  counter: number = 0;
  subscriptions: Subscription[] = []

  constructor(private authService: AuthService, private userService: UserService, private fns: AngularFireFunctions, private dogService: DogService) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.user.subscribe((user: User | null) => {
        this.user = user;
  
        this.editForm = this.user === null;
  
        this.loading = this.counter === 0 ? true : false;
        this.counter++;
      }),
      this.dogService.dogsAreLoading.subscribe((val) => this.loading = this.loading && val)
    );
  
    this.userService.getUserDetails();
  }

  toggleEditForm(shouldClose: boolean) {
    this.editForm = shouldClose;
  }

  toggleDogForm(isOpen: boolean) {
    this.newDogFormOpen = isOpen;
  }

  logout() {
    this.authService.logout();
  }
}
