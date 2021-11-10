import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  edit: boolean = true;
  disabled: boolean = true;

  fullName = "Shubham Nikam";
  email = localStorage.getItem('email');
  password = localStorage.getItem('password');
  number = "8450958860";
  city = localStorage.getItem('city');
  fullAddress = localStorage.getItem('fullAddress');
  state = localStorage.getItem('state');

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  homeButton() {
    this.router.navigateByUrl('/dashboard')
  }

  onEdit() {
    this.edit = false;
    this.disabled = false;
  }

  onCancel() {
    this.edit = true;
  }
}