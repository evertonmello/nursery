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
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loginService: LoginService
  ) {}


  submit(){
    this.authService.login(this.form.value);
  }

  ngOnInit(): void {

      
  }
  loginWithGoogle(){
    this.loginService.googleSignin().then((user)=>{
    },(error)=>{
    })
  }

  login(){
    this.loginService.login('pedro@asd.com','passasdasda123').then(
      ()=>{
        console.log('')
      },(error)=>{
        console.log(error)
        
      });
  }

  signUp(){
    this.loginService.signUp("pedro@asd.com", "passasdasda123").then(
      (success)=>{

      },(error)=>{
        
      });
  }

}
