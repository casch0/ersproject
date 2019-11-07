import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { LoginService } from 'src/app/services/login.service';
import { Reimbursement } from 'src/app/models/reimbursement';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  type = 0;
  amount = 0;
  description = "";
  
  


  constructor(private ticketService: TicketService, private loginService: LoginService ){ }

  ngOnInit() {
    this.getTickets().then(function(tickets){
      tickets.forEach(ticket => {
        console.log(ticket);
      });
    }
    )}

  async submitTicket(){
    const newTicket = {
      type: this.type,
      amount: this.amount,
      description: this.description
    }
    const ret = await this.ticketService.newTicketHttp(newTicket);
    var tickets = await this.getTickets();
    console.log(tickets);
  }
  
  async getTickets(){
    const credentials = {
      username: this.loginService.currentUser,
      role: 1
    }
    var tickets = await this.ticketService.viewTicketHttp(credentials);
    return tickets;
  }

}
