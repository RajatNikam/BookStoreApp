import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/bookService/books.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  data: any;
  bookId: any;


  constructor(private BooksService: BooksService) { }

  ngOnInit(): void {
    this.bookId = localStorage.getItem('bookId');
    this.bookDetails();
  }

  bookDetails() {
    this.BooksService.getBooksService().subscribe((res: any) => {
      res.result.forEach((element: any) => {
        if (element._id == this.bookId) {
          this.data = element;
        }
      });
      console.log(this.data);
    })
  }

}
