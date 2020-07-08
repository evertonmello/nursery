import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';

import { AuthService } from './../auth/auth.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}


  submit(){
    this.authService.login(this.form.value);
  }

  ngOnInit(): void {
  }

}
