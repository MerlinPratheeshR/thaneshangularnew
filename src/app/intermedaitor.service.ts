// @ts-nocheck

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class IntermedaitorService {
  constructor(private http: HttpClient) { }



  emailIdCheck(emailId) {

    return this.http.get(environment.baseurl + 'intermediator_management/checkMail/' + emailId);
  }

  addIntermedaitor(data) {

    return this.http.post(environment.baseurl + 'intermediator_management/create', data);
  }

  updateIntermedaitor(data) {
    console.log(data);

    return this.http.post(environment.baseurl + 'intermediator_management/update/' + data.id, data);
  }

  listIntermedaitor() {
    return this.http.get(environment.baseurl + 'intermediator_management/getlist');

  }

  detailsIntermedaitor(id) {
    return this.http.get(environment.baseurl + 'intermediator_management/getby_id/' + id);
  }

  deleteIntermedaitor(id) {
    return this.http.delete(environment.baseurl + 'intermediator_management/delete/' + id);

  }
  createId() {
    return this.http.get(environment.baseurl + 'seller_management/createId');

  }

}



