import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Input values
  inputUsername = '';
  inputPassword = '';
  authenticated = false;

  // Flag set to true when user supplies invalid input
  invalidInput = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  submit() {
    const credentials = {
      username: this.inputUsername,
      password: this.inputPassword
    };
    this.loginService.loginHttp(credentials);
    if(this.loginService.loginHttp(credentials)){
      this.authenticated = true;
    }
    else {
      this.invalidInput = true;
    }
  }
}
