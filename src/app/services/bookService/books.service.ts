import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../HTTPservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  token: any;
  booksArray: any;

  constructor(private http: HttpService) { }

  getBooksService() {
    this.token = localStorage.getItem('token')

    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      })
    };
    // console.log(httpAuthOptions);

    return this.http.getService('/bookstore_user/get/book', false, httpAuthOptions);

  }

  addcartitem(productID: any) {
    let headers = {
      headers: new HttpHeaders({
        'x-access-token': this.token,
        'content-Type': 'application/json'
      })
    }
    return this.http.PostService("/bookstore_user/add_cart_item/" + productID, null, true, headers);
  }

}
