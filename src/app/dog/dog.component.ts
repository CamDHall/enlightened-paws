import { Component, Input, OnInit } from '@angular/core';
import Dog from 'src/models/Dog';
import { DogService } from '../services/dog.service';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.sass']
})
export class DogComponent implements OnInit {
  @Input("dog")
  dog!: Dog;
  isOpen: boolean = false;

  constructor(private dogService: DogService) { }

  ngOnInit(): void {
  }

  toggleEdit() {
    this.isOpen = !this.isOpen;
  }

  deleteDog() {
    this.dogService.deleteDog(this.dog.name).subscribe(() => {
      this.dogService.getDogs();
    })
  }
}
