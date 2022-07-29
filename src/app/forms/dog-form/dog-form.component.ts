import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DogService } from 'src/app/services/dog.service';
import Dog from 'src/models/Dog';

@Component({
  selector: 'app-dog-form',
  templateUrl: './dog-form.component.html',
  styleUrls: ['./dog-form.component.sass']
})
export class DogFormComponent implements OnInit {
  @Output("isOpen") isOpen = new EventEmitter<boolean>();
  @Input("dog") dog: Dog | null = null;
  form!: FormGroup;
  loading = false;
  error = false;

  constructor(private dogService: DogService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      name: new FormControl(this.dog?.name ?? '', [ Validators.required ]),
      breed: new FormControl(this.dog?.breed ?? '', [ Validators.required ]),
      age: new FormControl(this.dog?.age ?? '', [ Validators.required ])
    });
  }

  onSubmit() {
    this.loading = true;
    const dogData = new Dog(this.form.get('name')?.value!, this.form.get('breed')?.value!, this.form.get('age')?.value!);

    try {
      if(this.dog === null) {
        this.dogService.addDog(dogData).subscribe(() => {
          this.close();
        });
      } else {
        this.dogService.postDog(dogData).subscribe(() => {
          this.close();
        })
      }
    } catch(error) {
      this.error = true;
      console.error(error);
    }
  }

  close() {
    this.dogService.getDogs();
    this.loading = false;
    this.isOpen.next(false);
  }
}
