// @ts-nocheck

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class BuyersService {

  constructor(private http: HttpClient) { }

  addBuyers(data) {

    return this.http.post(environment.baseurl + 'buyer_management/create', data);
  }

  updateBuyers(data) {
    console.log(data);

    return this.http.post(environment.baseurl + 'buyer_management/update/' + data.id, data);
  }

  listBuyers() {
    return this.http.get(environment.baseurl + 'buyer_management/getlist');
  }

  detailsBuyers(id) {
    return this.http.get(environment.baseurl + 'buyer_management/getby_id/' + id);
  }

  deleteBuyers(id) {
    return this.http.delete(environment.baseurl + 'buyer_management/delete/' + id);

  }
  createId() {
    return this.http.get(environment.baseurl + 'buyer_management/createId');

  }

  emailIdCheck(emailId) {
    console.log(emailId);

    return this.http.get(environment.baseurl + 'buyer_management/checkMail/' + emailId);
  }


  companyLogoupload(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.baseurl + "buyer_management/uploadMasterCard", formData);
  }
}
