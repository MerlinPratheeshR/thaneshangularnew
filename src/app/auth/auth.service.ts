import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(environment.baseurl + 'auth/login', data);
  }

  logout() {

    return this.http.get(environment.baseurl + 'auth/logout');

  }

  gettoken() {
    return !!localStorage.getItem("user");

  }
}
