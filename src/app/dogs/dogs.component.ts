import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Dog from 'src/models/Dog';
import { DogService } from '../services/dog.service';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.sass']
})
export class DogsComponent implements OnInit, OnDestroy {
  dogs: Dog[] = [];

  subscriptions: Subscription[] = [];

  constructor(private dogService: DogService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.dogService.dogs.subscribe(dogs => this.dogs = dogs)
    );
  
    this.dogService.getDogs();

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
