import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './../_service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginuserForm: FormGroup;
  userName: FormControl;
  password: FormControl;
  error = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.loginuserForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)]))
    });
  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    this.authenticationService.login(this.loginuserForm.get('userName').value,
      this.loginuserForm.get('password').value)
      .subscribe(
        result => {
          if (result) {
            this.router.navigate(['/home/1']);
          } else {
              this.error = 'Invalid Username or Password!!';
              this.router.navigate(['/login']);
          }
        },
    );
  }

}
