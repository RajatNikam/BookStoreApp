import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/bookService/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  booksArray: any;
  data: any;
  book: any;
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
