import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public userName = '';
  public userRole = '';

  constructor() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))[0];
    this.userName = currentUser.username;
    this.userRole = currentUser.role;
   }

  ngOnInit() {
  }

}
