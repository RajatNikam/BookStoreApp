import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
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
}
