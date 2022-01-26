// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-admin-payment-management',
  templateUrl: './admin-payment-management.component.html',
  styleUrls: ['./admin-payment-management.component.scss']
})
export class AdminPaymentManagementComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  countryList: any;
  dataLoaded: boolean;
  deletemode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  filterMode: Boolean = true;
  advancefilterMode: Boolean = false;
  p: number = 1;
  itemPage: number = 10;
  constructor(private adminService: AdminModuleService, private toastr: ToastrManager, private router: Router) { }

  ngOnInit(): void {

    this.dataLoaded = false;
    this.deletemode = false;
    this.listmode = true;
    this.filterMode = true;
    this.advancefilterMode = false;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };

    this.adminService.getCountryList().subscribe(async data => {
      if (data['success']) {
        this.countryList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.countryList = [];
      }
    });
  }

  pageChanged(event: any) {
    this.itemPage = event.target.value;
  }

  getFilterState(val: any) {
    if (val == 'filterMode') {
      this.filterMode = true;
      this.advancefilterMode = false;
    } else if (val == 'advancefilterMode') {
      this.filterMode = false;
      this.advancefilterMode = true;
    }
  }

  getselected(event, i) {
    console.log(i);
  }

  getallselected(event) {

  }


  addCountry() {
    this.router.navigateByUrl('admin/country-management/configure/add/0');
  }


  validate(id) {
    if (id != null) {
      $('#deleteModal').modal('show');
      this.selectedData_ID = id;
      this.deletemode = true;
      this.listmode = false;
    } else {
      this.showWarning("Please Select a Record");
    }
  }



  editCountry(data) {
    this.router.navigateByUrl('admin/country-management/configure/update/' + data.id);
  }


  deleteCountry() {
    this.dataLoaded = false;
    this.adminService.deleteCountry(this.selectedData_ID, '').subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['msg']);
        this.cancel();
        this.selectedData_ID = null;
      } else {
        this.showError(data['msg']);
      }
    });
  }

  cancel() {
    $('#deleteModal').modal('hide');
    $('.addCountry').modal('hide');
    this.dataLoaded = false;
    this.deletemode = false;
    this.listmode = true;
    this.onPageReload();
  }

  onPageReload() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };
    this.adminService.getCountryList().subscribe(async data => {
      if (data['success']) {
        this.countryList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.countryList = [];
      }
    });
  }


  showSuccess(msg) {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: msg,
    })
  }

  showError(msg) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: msg,
    })
  }

  showWarning(msg) {
    Swal.fire({
      icon: 'warning',
      title: 'Check',
      text: msg,
    })
  }
}
