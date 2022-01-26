// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer-list-orders',
  templateUrl: './buyer-list-orders.component.html',
  styleUrls: ['./buyer-list-orders.component.scss']
})
export class BuyerListOrdersComponent implements OnInit {
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



  viewOrder(id) {
    this.router.navigateByUrl('buyers/order-management/view-order');
  }

}
