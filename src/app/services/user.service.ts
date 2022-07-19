import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from 'src/models/User';

const getUserDetailsFunc = "getUserDetails";
const postUserDetailsFunc = "postUserDetails";

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  subscriptions: Subscription[] = [];

  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private fns: AngularFireFunctions) { }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getUserDetails(): void {
    const callable = this.fns.httpsCallable(getUserDetailsFunc);
    this.subscriptions.push(
      callable({}).subscribe((user: User | null) => {
        if(user?.name) {
          this.user.next(user);
        } else {
          this.user.next(null);
        }
      })
    );
  }

  postUserDetails(name: string, phone: string, city: string, state: string, zipCode: number, address1: string, address2: string | null = null): Observable<User> {
    const user = new User(name, phone, city, state, zipCode, address1, address2);
    
    const callable = this.fns.httpsCallable(postUserDetailsFunc);
    return callable(user);
  }
}
