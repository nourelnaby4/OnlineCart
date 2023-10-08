import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isLoading: boolean = false;
  ErrorMessage: string = '';
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(14)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(14)]),
    rePassword: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(14)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern('01[0125][0-9]{8}')]),
  });

  constructor(private _auth: AuthService, private _route: Router) {

  }
  ngOnInit(): void {
    // Add a custom validator to repassword field
    this.registerForm.get('repassword')?.setValidators([Validators.required, this.passwordMatchValidator.bind(this)]);
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = this.registerForm.get('password')?.value;
    const repassword = control.value;

    if (password === repassword) {
      return null; // Passwords match
    } else {
      return { 'passwordMismatch': true }; // Passwords don't match
    }
  }

  registerSubmit(registerForm: FormGroup) {
    if (registerForm.valid) {
      this.isLoading = true;
      this._auth.register(registerForm.value).subscribe({
        next: (reponse) => {
          if (reponse.message === 'success') {
            this._route.navigate(['/login']);
          }
          console.log("register")
        },
        error: (err) => {
          console.log(err)
          this.ErrorMessage=err.error.message
          this.isLoading=false

        },
        complete: () => {
          console.log(" Success"),
            this.isLoading = false
        },
      });
    }
  }

}
