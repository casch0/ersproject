import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  manager = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    if (this.loginService.currentRole === 2){
      this.manager = true;
    }
  }

}
