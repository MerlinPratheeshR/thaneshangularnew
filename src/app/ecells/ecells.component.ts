// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecells',
  templateUrl: './ecells.component.html',
  styleUrls: ['./ecells.component.scss']
})
export class EcellsComponent implements OnInit {
  EcellsList: any;
  p: number = 1;
  ecellsFilter: any = { collegename: '', uid: '' };

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  selectEvent(item) {
    console.log(item);

    this.ecellsFilter.uid = item.uid;
  }

  onChangeSearch(val: string) {
    this.ecellsFilter.collegename = val;
  }

  onFocused(e) {
    this.ecellsFilter.uid = '';
    this.ecellsFilter.collegename = '';
  }

  goto(id) {
    this.router.navigateByUrl('ecell/profile/' + id);
  }

}
