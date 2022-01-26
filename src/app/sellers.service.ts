// @ts-nocheck

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class SellersService {


  constructor(private http: HttpClient) {

  }
  $listBuyers() {
    throw new Error('Method not implemented.');
  }
  addBuyers(data) {

    return this.http.post(environment.baseurl + 'seller_management/create', data);
  }

  updateBuyers(data) {
    console.log(data);

    return this.http.post(environment.baseurl + 'seller_management/update/' + data.id, data);
  }

  listBuyers() {
    return this.http.get(environment.baseurl + 'seller_management/getlist');
  }

  detailsBuyers(id) {
    return this.http.get(environment.baseurl + 'seller_management/getby_id/' + id);
  }

  deleteBuyers(id) {
    return this.http.delete(environment.baseurl + 'seller_management/delete/' + id);

  }
  createId() {
    return this.http.get(environment.baseurl + 'seller_management/createId');

  }

  emailIdCheck(emailId) {
    console.log(emailId);

    return this.http.get(environment.baseurl + 'seller_management/checkMail/' + emailId);
  }


  companyLogoupload(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.baseurl + "seller_management/uploadMasterCard", formData);
  }
}


