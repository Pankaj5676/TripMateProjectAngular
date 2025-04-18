import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterServiceService } from '../../Service/register-service.service';
import { User } from '../../Class/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;

 user:User =new User();

  constructor(private fb: FormBuilder, private registerService:RegisterServiceService,private snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log("this.registerForm.valid:-  ",this.registerForm.value)
    if (this.registerForm.valid) {

      this.user=this.registerForm.value;

      // const user = new User(
      //   this.registerForm.value.fullName,
      //   this.registerForm.value.email,
      //   this.registerForm.value.phone,
      //   this.registerForm.value.password
      // );


    
      
      this.registerService.registerUser(this.user).subscribe(
        (response:any) => {
          console.log('User registered successfully:', response);
          this.snackBar.open('Successfully Registered!', 'Close', {
            duration: 4000, // 2 seconds
            panelClass: ['snackbar-success'] // optional styling
          });

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);


        },
        (error:any) => {
          console.error('Error during registration:', error);   
            
          this.snackBar.open(error.error, 'Close', {
            duration: 2000,
            panelClass: ['snackbar-success'] 
          });
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }
}