import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../services/bookService/books.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  edit: boolean = true;
  fullName=localStorage.getItem('fullName');
  email=localStorage.getItem('email');
  password=localStorage.getItem('password');
  number=localStorage.getItem('phoneNumber');

  constructor(private router: Router, private bookservice: BooksService) { }

  ngOnInit(): void {
  }

  homeButton() {
    this.router.navigateByUrl('/dashboard')
  }

  onEdit() {
    this.edit = false;
  }

  onCancel() {
    this.edit = true;
  }
}