import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../services/bookService/books.service';

@Component({
  selector: 'app-get-all-books',
  templateUrl: './get-all-books.component.html',
  styleUrls: ['./get-all-books.component.scss']
})
export class GetAllBooksComponent implements OnInit {

  booksArray: any;
  token: any;
  data: any;
  id: any;
  bookcount: any;

  constructor(private bookServices: BooksService, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.getBooks();
  }

  getBooks() {

    this.bookServices.getBooksService().subscribe(
      (response: any) => {

        console.log(response.result)

        this.booksArray = response['result'];
        this.bookcount = response.result.length;

        console.log("getBooksArray", this.booksArray);

      })
  }

  // toProductPage(id: any) {
  //   this.id = id;
  //   this.router.navigate(['/dashboard/book-details'], { state: { value: id } })
  // }

  quickView(book: any) {
    console.log(book._id);

    localStorage.setItem('bookId', book._id);
    this.router.navigateByUrl('/dashboard/book-details')
  }

}
