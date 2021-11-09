import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/bookService/books.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(private bookservice: BooksService) { }

  wishlistitems: any;
  whislistitemscount: any;

  ngOnInit(): void {
    this.wishlist()
  }

  wishlist() {
    this.bookservice.getwishlist().subscribe(
      (response: any) => { console.log(response); this.wishlistitems = response.result; this.whislistitemscount = response.result.length; console.log(this.wishlistitems) },
      (error) => console.log(error)
    )
  }

  deletewishlistitem(data: any) {
    this.bookservice.removewishlistitem(data.product_id._id).subscribe(
      (response) => { console.log(response); this.wishlist() },
      (error) => console.log(error)
    )
  }

}