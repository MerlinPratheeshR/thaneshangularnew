// @ts-nocheck

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  constructor(private http: HttpClient) { }

  addCars(data) {
    return this.http.post(environment.baseurl + 'Cars/create', data);
  }

  updateCars(data) {
    return this.http.post(environment.baseurl + 'Cars/update', data);
  }

  listCars() {
    return this.http.get(environment.baseurl + 'Cars/getlist');
  }

  detailsCars(id) {
    return this.http.get(environment.baseurl + 'Cars/details?id=' + id);
  }

  deleteCars(id) {
    return this.http.delete(environment.baseurl + 'Cars/delete?id=' + id);
  }

}
