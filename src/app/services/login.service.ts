import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

/* Note that services will generally have this decorator */
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentlyLoggedIn = false;
  authenticated = false;

  constructor(private httpClient: HttpClient, private router: Router) { }


  async loginHttp(credentials: {username: string, password: string}) {
    const loginCredentials = {
      username: credentials.username,
      password: credentials.password
    };
    var valid = false;
    const url = 'http://localhost:8081/Project1/session';
    await this.httpClient.post(url, loginCredentials)
        .subscribe((data) => {
          var b = JSON.parse(JSON.stringify(data));
          if (b.username == ''){
            valid=false;
          } else {
            valid = true;
          }
          if (valid) {
            this.authenticated = true;
          } else {
            this.authenticated = false;
          }
        });
        return this.authenticated;
  }
}