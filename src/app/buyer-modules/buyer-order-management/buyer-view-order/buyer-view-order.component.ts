// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer-view-order',
  templateUrl: './buyer-view-order.component.html',
  styleUrls: ['./buyer-view-order.component.scss']
})
export class BuyerViewOrderComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };
  }
}
