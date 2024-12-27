import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { animate, style, transition, trigger } from '@angular/animations';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  standalone:true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    MatCardModule,
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatButtonModule, 
    MatIconModule,
    HttpClientModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit{

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',Validators.required);
  matcher = new MyErrorStateMatcher();

  constructor(private _router:Router,
    private authService: ApiService
  ){}
  ngOnInit(): void {
   
  }

  login(){
   const form ={
    email:this.email.value ?? '',
    password:this.password.value ?? ''
   }
  console.log(form)
  this.authService.login(form.email, form.password).subscribe({
    next: (response) => {
      console.log('Login successful', response);
      this._router.navigate(['list']);
    },
    error: (error) => {
      console.error('Login failed', error);
    }
  });
  }
  check() {
    return !(this.email.valid && this.password.valid);
  }
}

