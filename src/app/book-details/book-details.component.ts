import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../services/bookService/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  hidden = false;
  comment: any;
  rating: any = []; ;
  book: any;
  bookId: any;
  data: any;
  orderCount = 0;
  addToBagHide: boolean = true;
  countHide: boolean = false;
  currentVal: any;
  currentfeedback: any;
  booksdata: any;
  bookStoreArray: any = [];
  token: any;
  id: any;
  value: any;
  // item.rating:  any = []; 
  constructor(private bookService: BooksService, private router: Router) { }

  ngOnInit(): void {
    this.bookId = localStorage.getItem('bookId');
    this.bookDetails();
    this.getfeedBack();

  }

  addFeedback() {
    let data = {
      rating: this.value,
      comment: this.comment,
      product_id: this.bookId
    }

    this.bookService.addFeedbackService(data).subscribe((response: any) => {
      console.log("the response", response);

    })
  }

  getfeedBack() {
    let data = {
      product_id: this.bookId
    }
    this.bookService.getfeedBack(data).subscribe(
      (response: any) => {
        console.log(response);
        this.bookStoreArray = response.result;
  })
}


  bookDetails() {
    this.bookService.getBooksService().subscribe((res: any) => {
      res.result.forEach((element: any) => {
        if (element._id == this.bookId) {
          this.data = element;
        }
      });
      console.log(this.data);
    })
  }

  addtobagbuttonhide() {
    this.addToBagHide = false;
    this.countHide = true;
    this.bookService.addcartitem(this.data._id).subscribe((response) => {
      console.log(response);
    },
      (error) => console.log(error)
    )
  }

  countincrease() {
    this.orderCount += 1
    this.updateCount()
  }

  countdecrease() {
    if (this.orderCount > 0) {
      this.orderCount -= 1;
      this.updateCount()
    }
    else {
      return;
    }
  }

  updateCount() {
    let payload = {
      "quantityToBuy": this.orderCount
    }
    this.bookService.updateitemcount(this.data._id, payload).subscribe(
      (response) => { console.log(response) },
      (error) => console.log(error)
    )
  }

  addtowishlist() {
    this.bookService.addwishlist(this.data._id).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => console.log(error)
    )
  }

  homeButton() {
    this.router.navigateByUrl('/dashboard/get-all-books')
  }

}
