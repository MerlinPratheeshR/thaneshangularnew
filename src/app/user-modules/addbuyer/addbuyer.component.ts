// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { removeAllListeners } from 'process';
import { AdminModuleService } from 'src/app/admin-module.service';
import { AdvanceFilterService } from 'src/app/advance-filter.service';
import { BuyersService } from 'src/app/buyers.service';

import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-addbuyer',
  templateUrl: './addbuyer.component.html',
  styleUrls: ['./addbuyer.component.scss']
})
export class AddbuyerComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  BuyerList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addCategoryRequestStatusForm: FormGroup;
  deletemode: boolean;
  imageUploaded: boolean;
  filterMode: Boolean = true;
  advancefilterMode: Boolean = false;
  p: number = 1;
  itemPage: number = 10;
  FilteredState: boolean = false;
  advanceFilterForm: FormGroup;
  UserList: any;
  test: number = 10;

  name = 'Angular';
  myForm: FormGroup;
  arr: FormArray;
  createdElements: any;
  emptyData: boolean;

  constructor(private adminService: AdminModuleService, private buyersService: BuyersService, private router: Router, private AdvanceFilterService: AdvanceFilterService,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addCategoryRequestStatusForm = this.formBuilder.group({
      id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      user_name: ['', Validators.required],
      email_id: ['', Validators.required],
      role: ['', Validators.required],
      phone_number: ['', Validators.required],
      mobile_number: ['', Validators.required],
      status: ['', Validators.required],
      image: ['', Validators.required],
      country: ['', Validators.required],
      language: ['', Validators.required],
      address: ['', Validators.required],
      created_at: ['', Validators.required],
      created_by: ['', Validators.required],
      modified_at: ['', Validators.required],
      modified_by: ['', Validators.required],
    });
  }

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
    this.imageUploaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };

    this.getBuyerList();

    this.getUserList();

    this.myForm = this.formBuilder.group({
      arr: this.formBuilder.array([this.createItem()])
    });



  }

  //merlin  
  createItem() {
    return this.formBuilder.group({
      selectFields: ['', Validators.required],
      selectCondition: ['', Validators.required],
      enterValue: ['', Validators.required]
    })
  }

  sort(a) {
    console.log(a);
    this.test = a;




  }


  addItem() {
    this.arr = this.myForm.get('arr') as FormArray;
    this.arr.push(this.createItem());
    this.createdElements = this.arr.length;
  }

  ResetAdvanceFilter() {
    console.log(this.createdElements);

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
    this.getBuyerList();
    this.myForm.reset();
    $("#test select").prop("selectedIndex", 0);

    console.log(this.myForm.value);

  }
  closeItem(i: any) {
    if (i == 0) {
    } else {
      this.arr?.removeAt(i);
    }


  }
  onSubmit() {



  }



  onOptionsSelected(selectedVal: any, i: any) {
    console.log(selectedVal);
    if (selectedVal == 'b_phonenumber') {
      $("#numberinput" + i).attr("type", "number");
      $("#numberinput" + i).val('');
      $("#ddlstatus" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      $("#numberinput" + i).css('display', 'block');
      this.myForm.setErrors({ 'invalid': true });
    }
    else if (selectedVal == 'business_name') {
      $("#ddlstatus" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      $("#numberinput" + i).css('display', 'block');
      $("#numberinput" + i).attr("type", "text");
      $("#numberinput" + i).val('');
      this.myForm.setErrors({ 'invalid': true });
    }
    else if (selectedVal == 'business_name') {
      $("#ddlstatus" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      $("#numberinput" + i).css('display', 'block');
      $("#numberinput" + i).attr("type", "text");
      $("#numberinput" + i).val('');
      this.myForm.setErrors({ 'invalid': true });
    }
    else if (selectedVal == 'iv_company_id') {
      $("#ddlstatus" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      $("#numberinput" + i).css('display', 'block');
      $("#numberinput" + i).attr("type", "text");
      $("#numberinput" + i).val('');
      this.myForm.setErrors({ 'invalid': true });
    }
    else if (selectedVal == 'login_id') {
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
      $("#numberinput" + i).val('');
      $("#ddlcreatedBy" + i).css('display', 'none');
      this.myForm.setErrors({ 'invalid': true });
    }
    else if (selectedVal == 'status') {
      $("#ddlstatus" + i).css('display', 'block');
      $("#numberinput" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      this.myForm.setErrors({ 'invalid': true });
    }
    else if (selectedVal == 'b_address1') {
      $("#ddlstring" + i).css('display', 'block');
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
      $("#numberinput" + i).attr("type", "text");
      $("#ddlstatus" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      $("#numberinput" + i).css('display', 'block');
      this.myForm.setErrors({ 'invalid': true });
    }
  }
  AdvancesFilterData() {
    this.FilteredState = true;
    $('.bd-example-modal-lg').modal('hide');
    this.dataLoaded = false;
    this.adminService.searchAdvanceFilter(['new_buyer_details', this.myForm.value.arr]).subscribe(async data => {
      console.log("advanceFilterForm", data);
      if (data['success']) {
        this.BuyerList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.showError(data['msg']);
      }
    });




  }
  getUserList() {
    this.adminService.getUserList().subscribe(async data => {
      if (data['success']) {
        this.UserList = await data['data'];
        console.log(data);
        this.dataLoaded = true;
      } else {
        this.BuyerList = [];
      }
    });
  }

  getBuyerList() {
    this.buyersService.listBuyers().subscribe(async data => {
      if (data['success']) {
        this.BuyerList = await data['data'];
        console.log(this.BuyerList);
        this.dataLoaded = true;
      } else {
        this.BuyerList = [];
      }
    });
  }

  openAdvanceFilter() {
    $('.bd-example-modal-lg').modal('show')
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
    console.log(event);

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

  addBuyer() {
    this.router.navigateByUrl('admin/buyer/add/0');
  }


  validate(id) {
    if (id != null) {
      $('#deleteModal').modal('show');
      this.selectedData_ID = id;
      this.addmode = false;
      this.editmode = false;
      this.deletemode = true;
      this.listmode = false;
    } else {
      this.showWarning("Please Select a Record");
    }
  }



  editCategoryRequestStatus(data) {
    this.router.navigateByUrl('admin/buyer/update/' + data.id);
  }


  deleteBuyer() {
    this.dataLoaded = false;
    this.buyersService.deleteBuyers(this.selectedData_ID).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['msg']);
        this.cancel();
        this.selectedData_ID = null;
      } else {
        this.showError(data['msg']);
      }
    });
  }

  updateCategoryRequestStatus() {
    this.dataLoaded = false;
    this.adminService.updateCategoryRequestStatus(this.addCategoryRequestStatusForm.value).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['msg']);
        this.cancel();
        this.selectedData_ID = null;
      } else {
        this.showSuccess(data['msg']);
      }
    });
  }

  cancel() {
    $('#deleteModal').modal('hide');
    $('.addCategoryRequestStatus').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.imageUploaded = true;
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
    this.buyersService.listBuyers().subscribe(async data => {
      if (data['success']) {
        this.BuyerList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.BuyerList = [];
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


  editFeatures(data) {
    console.log(data);

    this.router.navigateByUrl('admin/buyer/view/' + data.id);
  }

  cloneFeatures(data) {
    this.router.navigateByUrl('admin/buyer/clone/' + data.id);
  }

  ClearFilter() {
    this.advanceFilterForm.reset();
    this.advanceFilterForm.patchValue({ status: 1 });
    this.getBuyerList();
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
    this.adminService.searchFeaturesList(this.advanceFilterForm.value, "new_buyer_details").subscribe(async data => {
      console.log("advanceFilterForm", data)
      if (data['success']) {
        this.BuyerList = await data['data'];
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


