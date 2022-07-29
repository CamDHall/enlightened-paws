import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import Dog from 'src/models/Dog';

const addDogFunc = "addDog";
const postDogFunc = "postDog";
const deleteDogFunc = "deleteDog";
const getDogsFunc = "getDogs";

@Injectable({
  providedIn: 'root'
})
export class DogService implements OnDestroy {
  subscriptions: Subscription[] = [];
  dogs: BehaviorSubject<Dog[]> = new BehaviorSubject<Dog[]>([]);
  dogsAreLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private fns: AngularFireFunctions) { }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  addDog(dog: Dog): Observable<any> {
    const callable = this.fns.httpsCallable(addDogFunc);
    return callable(dog);
  }

  postDog(dog: Dog): Observable<any> {
    const callable = this.fns.httpsCallable(postDogFunc);
    return callable(dog);
  }

  deleteDog(dogId: string): Observable<any> {
    const callable = this.fns.httpsCallable(deleteDogFunc);
    return callable(dogId);
  }

  getDogs(): void {
    const callable = this.fns.httpsCallable(getDogsFunc);
    this.dogsAreLoading.next(true);

    this.subscriptions.push(
      callable({}).subscribe((dogs: any[]) => {
        this.dogsAreLoading.next(false);
        this.dogs.next(dogs);
      })
    );
  }
}
