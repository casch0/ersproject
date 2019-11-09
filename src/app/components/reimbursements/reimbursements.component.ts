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
  pending: Reimbursement[] = [];
  approved: Reimbursement[]= [];
  denied: Reimbursement[]= [];
  selectedImage: string;

  constructor(private ticketService: TicketService, private loginService: LoginService) { }

  ngOnInit() {
    this.getTickets();
  }

  imageSelect(selected: string){
    this.selectedImage = selected;
  }


  async getTickets() {
    const credentials = {
      username: this.loginService.currentUser,
      role: this.loginService.currentRole
    }
    this.tickets = await this.ticketService.viewTicketHttp(credentials);
    this.pending=[];
    this.approved= [];
    this.denied= [];
    if (this.tickets !== undefined && this.tickets.length != 0) {
      this.tickets.forEach(ticket => {
        ticket.collapsed=true;
        switch ("" + ticket.type) {
          case "1": { ticket.type = "Lodging"; break; }
          case "2": { ticket.type = "Travel"; break; }
          case "3": { ticket.type = "Food"; break; }
          case "4": { ticket.type = "Other"; break; }
        }
        //var d = new Date(ticket.submitted);
        //var formattedDate = d.getMonth() + "/" + (d.getDate() + 1) + "/" + d.getFullYear();
        //ticket.submitted = formattedDate
        //var e = new Date(ticket.resolved);
        //var formattedDate = e.getMonth() + "/" + (e.getDate() + 1) + "/" + e.getFullYear();
        //ticket.resolved = formattedDate
        switch ("" + ticket.status) {
          case "1": { ticket.status = "Pending"; 
          this.pending.push(ticket); break; }
          case "2": { ticket.status = "Approved"; 
          this.approved.push(ticket); break; }
          case "3": { ticket.status = "Denied"; 
          this.denied.push(ticket); break; }
        }
      });
    }
  }

  async approveTicket(ticket:Reimbursement) {
    const mod = {
      status : "2",
      resolver : this.loginService.currentUser,
      author : ticket.author,
      id : ticket.id
      }
    const ret = await this.ticketService.updateTicketHttp(mod);
    this.getTickets();
  }

  async denyTicket(ticket:Reimbursement) {
    const mod = {
    status : "3",
    resolver : this.loginService.currentUser,
    author : ticket.author,
    id : ticket.id
    }
    const ret = await this.ticketService.updateTicketHttp(mod);
    this.getTickets();
 
  }
  toggle(ticket: Reimbursement) {
    if (ticket.collapsed === true)
    {ticket.collapsed = false}
    else {ticket.collapsed = true}
  }
}
