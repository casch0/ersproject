import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Session } from 'protractor';
import { TicketService } from './ticket.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authenticated = false;
  currentRole = 0;
  currentUser = "";

  constructor(private httpClient: HttpClient, private router: Router) { }


  async loginHttp(credentials: { username: string, password: string }) {
    const loginCredentials = {
      username: credentials.username,
      password: credentials.password
    };
    const url = 'http://localhost:8081/Project1/session';
    const data = await this.httpClient.post(url, loginCredentials)
      .toPromise();
    var b = JSON.parse(JSON.stringify(data));
    if (b.username == '') this.authenticated = false;
    else this.authenticated = true;
    this.currentRole = b.role;
    this.currentUser = b.username;

    return this.authenticated;
  }
}