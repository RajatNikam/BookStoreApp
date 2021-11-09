import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../services/bookService/books.service';
import { DataService } from '../services/dataService/data.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  hidden = false;
  comment: any;
  rating: any;
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
  constructor(private bookService: BooksService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.bookId = localStorage.getItem('bookId');
    this.bookDetails();

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
      if(this.orderCount > 0) {
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

  onSubmit() {
    let data = {
      "comment": this.comment,
      "rating": this.rating
    }

    this.bookService.review(this.data._id, data).subscribe(
      (response: any) => {
        console.log(response);
        console.log('id', this.data._id);
        console.log('data', data);


      },
      (error) => console.log(error)

    )
  }

  getVal(val: any) {
    console.warn(val);
    this.currentVal = val
  }


}
