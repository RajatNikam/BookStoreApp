import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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

      })
    };
    return this.http.getService('/bookstore_user/get/book', false, httpAuthOptions);

  }


  getwishlist() {
    let headers = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'x-access-token': this.token
      })
    }

    return this.http.getService("/bookstore_user/get_wishlist_items", true, headers)
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

  updateitemcount(productID: any, payload: any) {
    console.log('added', payload);

    let headers = {
      headers: new HttpHeaders({
        'x-access-token': this.token,
        'content-Type': 'application/json'
      })
    }
    return this.http.PutService("/bookstore_user/cart_item_quantity/" + productID, payload, true, headers);
  }

  getCartItems() {
    let headers = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'x-access-token': this.token
      })
    }
    return this.http.getService("/bookstore_user/get_cart_items", true, headers)
  }

  removecartitem(productID: any) {
    let headers = {
      headers: new HttpHeaders({
        'x-access-token': this.token,
        'content-Type': 'application/json'
      })
    }
    return this.http.DeleteService("/bookstore_user/remove_cart_item/" + productID, null, true, headers);
  }

  orderplace(payload: any) {
    let headers = {
      headers: new HttpHeaders({
        'x-access-token': this.token,
        'content-Type': 'application/json'
      })
    }
    return this.http.PostService("/bookstore_user/add/order", payload, true, headers);
  }



  addwishlist(productID: any) {
    let headers = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'x-access-token': this.token
      })
    }
    return this.http.PostService("/bookstore_user/add_wish_list/" + productID, null, true, headers);
  }

  removewishlistitem(productID: any) {
    let headers = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'x-access-token': this.token
      })
    }
    return this.http.DeleteService("/bookstore_user/remove_wishlist_item/" + productID, null, true, headers);
  }

  updateaddress(payload: any) {
    let headers = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'x-access-token': this.token
      })
    }
    return this.http.PutService("/bookstore_user/edit_user", payload, true, headers);
  }

  review(data: any, productID: any) {
    let headers = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'x-access-token': this.token
      })
    }
    return this.http.PostService("/bookstore_user/add/feedback/" + productID, data, true, headers);
  }

  feedback(data: any) {
    let tokenOption = {
      headers: new HttpHeaders({
        "x-access-token": this.token
      })
    };
    console.log(tokenOption)
    return this.http.PostService("/${data.product_id}", data, false, tokenOption);
  }



  /************Feed-Back*****POST********/
  feedBack(review: any, data: any) {
    this.token = localStorage.getItem('token');
    let options = {
      headers: new HttpHeaders({
        'x-access-token': this.token,
        'Content-Type': 'application/json'
      })
    }
    return this.http.PostService("/bookstore_user/add/feedback/" + data, review, true, options);
  }

  /************Feed-Back*******GET***********/
  getfeedBack(id: any) {

    let httpAuthOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.token,
        'Content-Type': 'application/json'
      })
    }
    console.log(httpAuthOptions);

    return this.http.getService("/bookstore_user/get/feedback/" + id, true, httpAuthOptions);

  }

  addFeedbackService(data: any) {

    this.token = localStorage.getItem('token')
    let options = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'x-access-token': this.token
      })
    }
    console.log('data', data.product_id);
    
    return this.http.PostService(`/bookstore_user/add/feedback/${data.product_id}`, data, true, options)
  }

}