import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupShown: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.signupShown = true;
    this.router.navigateByUrl('login');
  }

  signup() {
    this.signupShown = false;
    this.router.navigateByUrl('register');
  }

}
