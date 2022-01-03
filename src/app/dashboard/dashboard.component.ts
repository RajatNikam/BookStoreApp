import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../services/bookService/books.service';
import { FilterService } from '../services/pipe/filter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  badgeVisibility: boolean | undefined;
  filteredString: string = '';
  isSearch = false;
  number: number = 1;
  cartitemscount: any;
  countitems: number | undefined;

  constructor(private router: Router, private filter: FilterService, private bookservice: BooksService) {
  }

  ngOnInit(): void {
    this.bookservice.getBooksService();
    // this.count(this.any);
    this.any();

  }

  shareSearchWord(search: any) {
    this.filter.sendSearch(search);
  }

  onWishlist() {
    this.router.navigateByUrl('/dashboard/wishlist');
  }

  profileButton() {
    this.router.navigateByUrl('/dashboard/profile');
  }

  count(callback: any) {
    this.bookservice.getCartItems().subscribe(
      (response: any) => {
        // console.log(response);
        this.cartitemscount = response.result;
        this.countitems = response.result.length;
        console.log('count of cart items:', this.countitems);
        callback();
        // return this?.countitems;
      },
      (error) => console.log(error)
    )
  }

  any() {
    this.count(() => {
      if (this.countitems == 0) {
        console.log('NoBadge', this.countitems);
        this.badgeVisibility = true;
      } else {
        console.log('YesBadge', this.countitems);
        this.badgeVisibility = false;
      }
    })
  }
}
