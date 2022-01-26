// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-view-order-details',
  templateUrl: './admin-view-order-details.component.html',
  styleUrls: ['./admin-view-order-details.component.scss']
})
export class AdminViewOrderDetailsComponent implements OnInit {
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
