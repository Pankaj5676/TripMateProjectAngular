import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../Service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  step: number = 1;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['',],
      newPassword: ['']
    });
  }

  sendOtp() {
    const email = this.form.get('email')?.value;
    this.loginService.sendOtp(email).subscribe(
      (data) => {
        this.step = 2;
        this.snackBar.open("otp send successfully to email, check email", 'Close', {
        duration: 3000,
        panelClass: ['snackbar-success']
        });
        console.log(this.step);
    
      },
      (error) => {
        this.snackBar.open("invalid email", 'Close', {
          duration: 3000,
          panelClass: ['snackbar-danger']
        });
      }
    );
  }


  resetPassword() {
    
    const email = this.form.value.email;
    const otp = this.form.value.otp;
    const newPassword = this.form.value.newPassword;
  
    this.loginService.resetPassword(email, otp, newPassword).subscribe((data) => {      
        this.snackBar.open(data, 'Close', {
        duration: 3000,
        panelClass: ['snackbar-success']
        });
        this.form.reset();
        this.step = 1;
        this.router.navigate(['/login'])
      },
      (error) => {

        console.log(error);

        const errorMessage = error.error?.message || 'Something went wrong';
        this.snackBar.open(errorMessage, 'Close', {
          duration: 2000,
          panelClass: ['snackbar-danger']
          });
      }
    );
  }

}


// http://localhost:8080/api/users/reset-password?email=pankajbhogade1@gmail.com&otp=660260&newPassword=Pankaj"
// http://localhost:8080/api/users/reset-password?email=pankajbhogade1@gmail.com&otp=016983&newPassword=PankajNewPass