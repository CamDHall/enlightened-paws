import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  emailControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]
  );
  passwordControl = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]
  );
  confirmPasswordControl = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]
  );

    loading = false;
    error = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  async signup() {
    if(!this.isValid()) {
      alert("Invalid signup information provided.");
      return;
    }

    this.loading = true;

    try {
      await this.authService.signup(this.emailControl.value!, this.passwordControl.value!);
      this.loading = false;
      this.error = false;
      this.router.navigate(['/']);
    } catch(e) {
      this.loading = false;
      this.error = true;
    }
  }

  isValid() {
    return this.emailControl.valid && this.passwordControl.valid && this.confirmPasswordControl.valid && this.passwordControl.value === this.confirmPasswordControl.value;
  }
}
