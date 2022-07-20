import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTachographDigital } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.sass']
})
export class UserDetailsFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = false;

  @Input("user") user: User | null = null;
  @Output("closeForm") closeForm = new EventEmitter<boolean>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  cancel() {
    this.closeForm.next(false);
  }

  buildForm() {
    this.form = new FormGroup({
      name: new FormControl(this.user?.name ?? '', [ Validators.required ]),
      address1: new FormControl(this.user?.address1 ?? '', [ Validators.required ]),
      address2: new FormControl(this.user?.address2 ?? ''),
      city: new FormControl(this.user?.city ?? '', [ Validators.required ]),
      state: new FormControl(this.user?.state ?? '', [ Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      zipCode: new FormControl(this.user?.zipCode ?? '', [ Validators.required ]),
      phone: new FormControl(this.user?.phone ?? '', [ Validators.required ])
    });
  }

  async onSubmit() {
    this.loading = true;

    try {
      await this.userService.postUserDetails(
        this.form.get('name')!.value, this.form.get('phone')!.value, this.form.get('city')!.value, this.form.get('state')!.value, this.form.get('zipCode')!.value, this.form.get('address1')!.value, this.form.get('address2')?.value
      ).subscribe(() => {
        this.userService.getUserDetails();
      });
    } catch(error) {
      this.error = true;
      this.loading = true;
      console.error(error);
    }
  }
}
