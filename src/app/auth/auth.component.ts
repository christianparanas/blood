import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;

  constructor(private authService: AuthService, public router: Router) {
    this.authForm = new FormGroup({
      username: new FormControl('admin', Validators.required),
      password: new FormControl('admin', Validators.required)
    });
   }

  ngOnInit(): void {
    this.checkIfAuth()
  }

  checkIfAuth() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.authForm.status == 'INVALID') {
      alert("Please fill out the fields.")
      return;
    }
    
    this.authService.login(this.authForm.value);
  }

}
