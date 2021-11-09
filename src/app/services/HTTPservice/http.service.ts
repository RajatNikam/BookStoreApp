import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  BaseUrl = environment.BaseUrl;
  token: any;

  constructor(private http: HttpClient) { }

  PostService(url: any, data: any, token: boolean = false, headers: any) {

    return this.http.post(this.BaseUrl + url, data, token && headers);
  }

  getService(url: any, token: boolean = false, headers: any) {
    return this.http.get(this.BaseUrl + url, token && headers);
  }

  PutService(url: string, data: any = null, token: any = false, headers: any = null) {
    return this.http.put(this.BaseUrl + url, data, token && headers)
  }

  DeleteService(url: string, data: any = null, token: any = false, headers: any = null) {
    return this.http.delete(this.BaseUrl + url, token && headers)
  }

  addToCart(url: any, data: any) {
    this.token = localStorage.getItem('Token');
    let options = {
      headers: new HttpHeaders({
        'x-access-token': this.token,
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(this.BaseUrl + url, data, options);
  }

  getCarts(url: any) {
    this.token = localStorage.getItem('Token');
    let options = {
      headers: new HttpHeaders({
        'x-access-token': this.token,
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(this.BaseUrl + url, options);
  }

  Put(url: any, data: any, headers: any) {
    return this.http.put(this.BaseUrl + url, data, headers)
  }
}
