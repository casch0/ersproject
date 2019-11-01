import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { EmployeeComponent } from 'src/app/components/employee/employee.component';
import { ReimbursementsComponent } from 'src/app/components/reimbursements/reimbursements.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'employee',
  component: EmployeeComponent
}, {
  path: 'reimbursements',
  component: ReimbursementsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
