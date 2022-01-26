// @ts-nocheck

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdvanceFilterService {

  public stringSubject = new Subject<string>();

  passValue(data) {
    //passing the data as the next observable
    this.stringSubject.next(data);
    console.log(data);
  }

  constructor() { }
}
