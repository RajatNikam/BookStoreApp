import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  matBadgeHidden: boolean= true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onWishlist() {
    this.router.navigateByUrl('/dashboard/wishlist');
  }

  hide() {
  this.matBadgeHidden= true;
  }

  profileButton() {
    this.router.navigateByUrl('/dashboard/profile');
  }
}
