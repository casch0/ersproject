import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReimbursementsComponent } from './components/reimbursements/reimbursements.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './services/login.service';
import { TicketService } from './services/ticket.service';
import { UploadService } from './services/upload.service';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReimbursementsComponent,
    MainComponent,
    LoginComponent,
    EmployeeComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [LoginService, TicketService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
