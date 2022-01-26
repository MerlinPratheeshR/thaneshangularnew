// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import { AdvanceFilterService } from 'src/app/advance-filter.service';

import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-make-offer-status',
  templateUrl: './admin-make-offer-status.component.html',
  styleUrls: ['./admin-make-offer-status.component.scss']
})
export class AdminMakeOfferStatusComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  MakeOfferList: any;
  dataLoaded: boolean;
  deletemode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  filterMode: Boolean = true;
  advancefilterMode: Boolean = false;
  p: number = 1;
  itemPage: number = 10;
  FilteredState: boolean = false;
  advanceFilterForm: FormGroup;
  UserList: any;
  name = 'Angular';
  myTextVal: string;

  myForm: FormGroup;
  arr: FormArray;


  createdElements: any;

  constructor(private adminService: AdminModuleService, private AdvanceFilterService: AdvanceFilterService, private toastr: ToastrManager, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.AdvanceFilterService.stringSubject.subscribe(
      data => {
        console.log('next subscribed value: ' + data);
        this.name = data;
      }
    );

    this.advanceFilterForm = this.formBuilder.group({
      status: ['1'],
      created_at: [''],
      created_by: [''],
      modified_at: [''],
      modified_by: [''],
    });

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

    this.getMakeOfferList()
    this.getUserList()

    this.myForm = this.formBuilder.group({
      arr: this.formBuilder.array([this.createItem()])
    })

  }

  createItem() {
    return this.formBuilder.group({
      selectFields: new FormControl('', Validators.required),
      selectCondition: new FormControl('', Validators.required),
      enterValue: new FormControl('', Validators.required)

    })
  }

  addItem() {
    this.arr = this.myForm.get('arr') as FormArray;
    this.arr.push(this.createItem());
    this.createdElements = this.arr.length;
  }

  ResetAdvanceFilter() {

    if (this.createdElements == undefined) {
      this.myForm.reset();
      $("#test select").prop("selectedIndex", 0);
      $("#numberinput" + 0).val('');
    }
    for (let i = this.createdElements; i > 0; i--) {
      this.arr?.removeAt(i);
      $("#test select").prop("selectedIndex", 0);
      $("#numberinput" + (i - 1)).val('');

    }
    this.myForm.setErrors({ 'invalid': true });
    this.getMakeOfferList();
    this.myForm.reset();
    $("#test select").prop("selectedIndex", 0);

  }
  closeItem(i: any) {
    if (i == 0) {

    } else {
      this.arr?.removeAt(i);
    }
  }
  onSubmit() {
    console.log(this.myForm.value);
  }
  onOptionsSelected(selectedVal: any, i: any) {
    console.log(selectedVal);

    if (selectedVal == 'make_offer_status_id') {
      $("#numberinput" + i).attr("type", "number");
      $("#numberinput" + i).val('');
      $("#ddlstatus" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      $("#numberinput" + i).css('display', 'block');
      this.myForm.setErrors({ 'invalid': true });


    }
    else if (selectedVal == 'offer_status_name') {
      $("#ddlstatus" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      $("#numberinput" + i).css('display', 'block');
      $("#numberinput" + i).attr("type", "text");
      $("#numberinput" + i).val('');
      this.myForm.setErrors({ 'invalid': true });
    }
    else if (selectedVal == 'created_at') {
      $("#numberinput" + i).attr("type", "date");
      $("#numberinput" + i).css('display', 'block');
      $("#ddlstatus" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      $("#numberinput" + i).val('');
      this.myForm.setErrors({ 'invalid': true });
    }
    else if (selectedVal == 'status') {
      $("#ddlstatus" + i).css('display', 'block');
      $("#numberinput" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      this.myForm.setErrors({ 'invalid': true });
    }
    else if (selectedVal == 'created_by') {
      $("#ddlcreatedBy" + i).css('display', 'block');
      $("#numberinput" + i).css('display', 'none');
      $("#ddlstatus" + i).css('display', 'none');
      this.myForm.setErrors({ 'invalid': true });
    }
    else {
      $("#ddlcreatedBy" + i).css('display', 'none');
      $("#numberinput" + i).attr("type", "text");
      $("#ddlstatus" + i).css('display', 'none');
      $("#numberinput" + i).css('display', 'block');
      this.myForm.setErrors({ 'invalid': true });
    }
  }

  AdvancesFilterData() {
    this.FilteredState = true;
    $('.bd-example-modal-lg').modal('hide');

    this.dataLoaded = false;
    this.adminService.searchAdvanceFilter(['make_offer_status', this.myForm.value.arr]).subscribe(async data => {
      console.log("advanceFilterForm", data)
      if (data['success']) {
        this.MakeOfferList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.showError(data['msg']);
      }
    });
  }

  sendTextValue() {
    this.AdvanceFilterService.passValue(this.myTextVal);
  }

  getUserList() {
    this.adminService.getUserList().subscribe(async data => {

      if (data['success']) {
        this.UserList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.MakeOfferList = [];
      }
    });
  }

  getMakeOfferList() {
    this.adminService.getMakeOfferList().subscribe(async data => {
      console.log("data", data['data'])
      if (data['success']) {
        this.MakeOfferList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.MakeOfferList = [];
      }
    });
  }

  openAdvanceFilter() {
    $('.bd-example-modal-lg').modal('show')
  }

  addAdvanceFilter() {

  }

  // ClearFilter(){
  //   this.FilteredState = false;
  // }

  // FilterData(){
  //   this.FilteredState = true;
  //   $('.bd-example-modal-lg').modal('hide')
  // }

  pageChanged(event: any) {
    this.p = event;
  }

  // getFilterState(val:any){
  //   if (val == 'filterMode') {
  //     this.filterMode = true;
  //     this.advancefilterMode = false;
  //   } else if (val == 'advancefilterMode'){
  //     this.filterMode = false;
  //     this.advancefilterMode = true;
  //     this.openAdvanceFilter();
  //   }
  // }


  getselected(event, i) {
    console.log(i);
  }

  getallselected(event) {

  }


  addMakeOffer() {
    this.router.navigateByUrl('admin/status-management/make-offer/add/0');
  }


  editFeatures(data) {
    this.router.navigateByUrl('admin/status-management/make-offer/view/' + data.make_offer_status_id);
  }

  cloneFeatures(data) {
    this.router.navigateByUrl('admin/status-management/make-offer/clone/' + data.make_offer_status_id);
  }
  editMakeOffer(data) {
    this.router.navigateByUrl('admin/status-management/make-offer/update/' + data.make_offer_status_id);
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






  deleteMakeOffer() {
    this.dataLoaded = false;
    this.adminService.deleteMakeOffer(this.selectedData_ID).subscribe(data => {
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
    $('.addMakeOffer').modal('hide');
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
    this.adminService.getMakeOfferList().subscribe(async data => {
      if (data['success']) {
        this.MakeOfferList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.MakeOfferList = [];
      }
    });
  }


  showSuccess(msg) {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: msg,
    });
  }

  showError(msg) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: msg,
    });
  }

  showWarning(msg) {
    Swal.fire({
      icon: 'warning',
      title: 'Check',
      text: msg,
    });
  }
  ClearFilter() {
    this.advanceFilterForm.reset();
    this.advanceFilterForm.patchValue({ status: 1 });
    this.getMakeOfferList();
    // this.FilteredState = true;
    // $('.bd-example-modal-lg').modal('hide');
    this.FilteredState = false;
  }

  FilterData() {
    this.FilteredState = true;
    $('.bd-example-modal-lg').modal('hide');
    this.getData();
  }

  getData() {
    this.dataLoaded = false;
    this.adminService.searchFeaturesList(this.advanceFilterForm.value, "make_offer_status").subscribe(async data => {
      console.log("advanceFilterForm", data)
      if (data['success']) {
        this.MakeOfferList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.showError(data['msg']);
      }
    });
  }

  getFilterState(val: any) {
    if (val == 'filterMode') {
      this.filterMode = true;
      this.advancefilterMode = false;
    } else if (val == 'advancefilterMode') {
      this.filterMode = false;
      this.advancefilterMode = true;
      this.openAdvanceFilter();
    }
  }
}
