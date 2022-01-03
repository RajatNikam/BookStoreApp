import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../services/bookService/books.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FilterService } from '../services/pipe/filter.service';

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
  filteredString: any;
  searchWord: any;

  constructor(private bookServices: BooksService, private router: Router, private dash: FilterService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.getBooks();
    this.dash.rcvSearch.subscribe((response: any) => {
      this.searchWord = response;
    });
  }

  getBooks() {

    this.bookServices.getBooksService().subscribe(
      (response: any) => {

        console.log(response.result)

        this.booksArray = response['result'];
        this.bookcount = response.result.length;

        console.log("getBooksArray", this.booksArray);
        console.log("getBooksArray", this.filteredString);
      })
  }

  // toProductPage(id: any) {
  //   this.id = id;
  //   this.router.navigate(['/dashboard/book-details'], { state: { value: id } })
  // }

  quickView(book: any) {
    console.log('Bookid', book._id);

    localStorage.setItem('bookId', book._id);
    this.router.navigateByUrl('/dashboard/book-details')
  }

}
