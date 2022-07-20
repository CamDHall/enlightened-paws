import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  loading = true;
  user: User | null = null;
  editForm = false;
  newDogFormOpen = false;

  counter: number = 0;

  constructor(private authService: AuthService, private userService: UserService, private fns: AngularFireFunctions) { }

  ngOnInit(): void {
    this.userService.user.subscribe((user: User | null) => {
      this.user = user;

      this.editForm = this.user === null;

      this.loading = this.counter === 0 ? true : false;
      this.counter++;
    });
  
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
