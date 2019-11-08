import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Reimbursement } from '../models/reimbursement';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  async viewTicketHttp(credentials: { username: string, role: number }) {
    const viewCredentials = {
      username: credentials.username,
      role: credentials.role
    };
    const url = 'http://localhost:8081/Project1/view';
    const data = await this.httpClient.post(url, viewCredentials).toPromise();
    var tickets:Array<Reimbursement>;
    tickets = JSON.parse(JSON.stringify(data));
    return tickets;
  }



  async newTicketHttp(ticket: {type: number, amount: number, description: string, receipt: string}) {
    const req = {
      type: ticket.type,
      amount: ticket.amount,
      description: ticket.description,
      author: this.loginService.currentUser,
      receipt: ticket.receipt
    };
    console.log(ticket.receipt);
    const url = 'http://localhost:8081/Project1/ers';

    const data = await this.httpClient.post(url, req).toPromise();

    var ret:Reimbursement = JSON.parse(JSON.stringify(data));

    return ret;
  }

  async updateTicketHttp(ticket: {status: string, resolver: string, author: string, id: number}) {
    const url = 'http://localhost:8081/Project1/ers';

    const data = await this.httpClient.post(url, ticket).toPromise();

    var ret:Reimbursement = JSON.parse(JSON.stringify(data));

    return ret;
  }

}
