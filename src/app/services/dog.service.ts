import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable } from 'rxjs';
import Dog from 'src/models/Dog';

const addDogFunc = "addDog";
const postDogFunc = "postDog";
const deleteDogFunc = "deleteDog";

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private fns: AngularFireFunctions) { }

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
}
