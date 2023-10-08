import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading: boolean = false;
  ErrorMessage: string = '';
  constructor(private _auth: AuthService, private _router: Router) {

  }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  submitlogin(UserData: FormGroup) {
    this.isLoading = true;
      this._auth.login(this.loginForm.value).subscribe({
        next: (reponse) => {
          if (reponse.message == 'success') {

            localStorage.setItem('userToken', reponse.token);
            this._auth.decodeUserData();
            this.isLoading = true;
            this._router.navigate(['/home']);

          }

        },
        error: (err) => {

          this.ErrorMessage=err.error.message
          this.isLoading=false

        },
        complete: () => {
          console.log("success"),
            this.isLoading = false

        }
      });
  }
}
