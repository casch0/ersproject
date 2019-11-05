import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  async newTicketHttp(ticket: {type: number, amount: number, description: string}) {
    const req = {
      type: ticket.type,
      amount: ticket.amount,
      description: ticket.description,
      author: this.loginService.currentUser
    };
    const url = 'http://localhost:8081/Project1/ers';

    const data = await this.httpClient.post(url, req).toPromise();

    var ret = JSON.parse(JSON.stringify(data));
    return ret;
  }



}
