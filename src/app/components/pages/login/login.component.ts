import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import { LoginService } from './../../../shared/services/login.service'

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
  error;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loginService: LoginService
  ) {}


  ngOnInit(): void {

  }

  login(){
   this.loginService.login(this.form.value.username,this.form.value.password).then(
    ()=>{
      this.authService.login(this.form.value)
    },(error)=>{
      this.error = error;
    });
  }

  signUp(){
    this.loginService.signUp(this.form.value.username, this.form.value.password).then(
      (data)=>{
        this.authService.login(data.user)
      },(error)=>{
        console.log(error)
        this.error = error;
      });
  }

}
