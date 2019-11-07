import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { LoginService } from 'src/app/services/login.service';
import { Reimbursement } from 'src/app/models/reimbursement';

@Component({
  selector: 'app-reimbursements',
  templateUrl: './reimbursements.component.html',
  styleUrls: ['./reimbursements.component.css']
})
export class ReimbursementsComponent implements OnInit {
  tickets: Reimbursement[];
  constructor(private ticketService: TicketService, private loginService: LoginService) { }

  ngOnInit() {
    this.getTickets();
  }


  async getTickets() {
    const credentials = {
      username: this.loginService.currentUser,
      role: this.loginService.currentRole
    }
    this.tickets = await this.ticketService.viewTicketHttp(credentials);
    if (this.tickets !== undefined && this.tickets.length != 0) {
      this.tickets.forEach(ticket => {
        switch ("" + ticket.status) {
          case "1": { ticket.status = "Pending"; break; }
          case "2": { ticket.status = "Approved"; break; }
          case "3": { ticket.status = "Declined"; break; }
        }
        switch ("" + ticket.type) {
          case "1": { ticket.type = "Lodging"; break; }
          case "2": { ticket.type = "Travel"; break; }
          case "3": { ticket.type = "Food"; break; }
          case "4": { ticket.type = "Other"; break; }
        }
        var d = new Date(ticket.submitted);
        var formattedDate = d.getMonth() + "/" + (d.getDate() + 1) + "/" + d.getFullYear();
        var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
        var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
        var formattedTime = hours + ":" + minutes;

        formattedDate = formattedDate + " " + formattedTime;
        ticket.submitted = formattedDate
      });
    }
  }
}
