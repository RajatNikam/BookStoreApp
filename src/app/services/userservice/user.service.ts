import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpService } from '../HTTPservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: any;
  BaseUrl = environment.BaseUrl;

  constructor(private httpService: HttpService) {
    localStorage.getItem('token');
  }

  registrationService(data: any) {
    // console.log("given data is", data);

    this.token = localStorage.getItem('token');
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'this.token'
      })
    };
    return this.httpService.PostService('/bookstore_user/registration', data, false, options)
  }

  loginService(data: any) {
    // console.log("given data is", data);
    this.token = localStorage.getItem('token');
    let options = {
      headers: new HttpHeaders({
        'Authorization': this.token,
        'Content-Type': 'application/json'
      })
    }
    return this.httpService.PostService("/bookstore_user/login", data, false, options)

  }

}