import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { LoginService } from 'src/app/services/login.service';
import { Reimbursement } from 'src/app/models/reimbursement';
import { UploadService } from '../../services/upload.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  type = 0;
  amount = 0;
  description = "";
  tickets: Reimbursement[];
  selectedFile: File;
  responseUrl: SafeUrl;
  dirtyUrl: string;


  constructor(private uploadService: UploadService,
    private ticketService: TicketService,
    private loginService: LoginService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getTickets();

  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  async onUpload() {
    let resp = await this.uploadService.uploadHttp(this.selectedFile);
    this.dirtyUrl = resp;
    this.responseUrl = this.sanitizer.bypassSecurityTrustUrl(resp);
  }

  async submitTicket() {
    const newTicket = {
      type: this.type,
      amount: this.amount,
      description: this.description,
      receipt: this.dirtyUrl
    }
    await this.ticketService.newTicketHttp(newTicket);
    this.getTickets();
  }

  async getTickets() {
    const credentials = {
      username: this.loginService.currentUser,
      role: 1
    }
    this.tickets = await this.ticketService.viewTicketHttp(credentials);
    if (this.tickets !== undefined && this.tickets.length != 0) {
      this.tickets.forEach(ticket => {
        ticket.collapsed = true;
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
        // ticket.submitted = formattedDate;
      });
    }
  }
  toggle(ticket: Reimbursement) {
    if (ticket.collapsed === true)
    {ticket.collapsed = false}
    else {ticket.collapsed = true}
  }
}