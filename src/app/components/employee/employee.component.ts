import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { LoginService } from 'src/app/services/login.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  type = 0;
  amount = 0;
  description = "";
  
  


  constructor(private ticketService: TicketService) { }

  ngOnInit() {
  }

  async submitTicket(){
    const newTicket = {
      type: this.type,
      amount: this.amount,
      description: this.description
    }
    const ret = await this.ticketService.newTicketHttp(newTicket);
    this.type = 0;
    this.amount = 0;
    this.description = "";
    console.log(ret);
  }

  
}
