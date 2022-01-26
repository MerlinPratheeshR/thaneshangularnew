// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-registration-status',
  templateUrl: './admin-registration-status.component.html',
  styleUrls: ['./admin-registration-status.component.scss']
})
export class AdminRegistrationStatusComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  RegistrationStatusList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addRegistrationStatusForm: FormGroup;
  deletemode: boolean;
  imageUploaded: boolean;
  RegistrationStatusUrl: string;
  filterMode: Boolean = true;
  advancefilterMode: Boolean = false;
  p: number = 1;
  itemPage: number = 10;
  FilteredState: boolean = false;
  advanceFilterForm: FormGroup;
  UserList: any;

  myForm: FormGroup;
  arr: FormArray;
  myTextVal: string;
  createdElements: any;
  imageERPUploaded: boolean;
  infoForm: any;
  dynamics_image: string;
  constructor(private adminService: AdminModuleService, private router: Router,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addRegistrationStatusForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      content: ['', Validators.required],
      icon: ['', Validators.required],
      status: ['', Validators.required],
      created_at: ['', Validators.required],
      created_by: ['', Validators.required],
      modified_at: ['', Validators.required],
      modified_by: ['', Validators.required],
    });
  }

  ngOnInit(): void {

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

    this.getRegistrationStatusList();

    this.getUserList();
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
    this.getRegistrationStatusList();
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
    if (selectedVal == 'reg_status_id') {
      $("#numberinput" + i).attr("type", "number");
      $("#numberinput" + i).val('');
      $("#ddlstatus" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      $("#numberinput" + i).css('display', 'block');
      this.myForm.setErrors({ 'invalid': true });
    }
    else if (selectedVal == 'reg_status_name') {
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
    this.adminService.searchAdvanceFilter(['registration_status', this.myForm.value.arr]).subscribe(async data => {
      console.log("advanceFilterForm", data)
      if (data['success']) {
        this.RegistrationStatusList = await data['data'];
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
        this.dataLoaded = true;
      } else {
        this.RegistrationStatusList = [];
      }
    });
  }

  getRegistrationStatusList() {
    this.adminService.getRegistrationStatusList().subscribe(async data => {
      if (data['success']) {
        this.RegistrationStatusList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.RegistrationStatusList = [];
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

  addRegistrationStatus() {
    this.router.navigateByUrl('admin/status-management/registration/add/0');
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


  editRegistrationStatus(data) {
    this.router.navigateByUrl('admin/status-management/registration/update/' + data.reg_status_id);
  }


  deleteRegistrationStatus() {
    this.dataLoaded = false;
    this.adminService.deleteRegistrationStatus(this.selectedData_ID).subscribe(data => {
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
    $('.addPartsRequestStatus').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
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
    this.adminService.getRegistrationStatusList().subscribe(async data => {
      if (data['success']) {
        this.RegistrationStatusList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.RegistrationStatusList = [];
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
    this.router.navigateByUrl('admin/status-management/registration/view/' + data.reg_status_id);
  }

  cloneFeatures(data) {
    this.router.navigateByUrl('admin/status-management/registration/clone/' + data.reg_status_id);
  }

  ClearFilter() {
    this.advanceFilterForm.reset();
    this.advanceFilterForm.patchValue({ status: 1 });
    this.getRegistrationStatusList();
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
    this.adminService.searchFeaturesList(this.advanceFilterForm.value, "registration_status").subscribe(async data => {
      console.log("advanceFilterForm", data)
      if (data['success']) {
        this.RegistrationStatusList = await data['data'];
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
  UploadERPImg(event) {
    this.imageERPUploaded = false;
    this.adminService.UploadERPImg(event.target.files[0]).subscribe(data => {
      if (data['success']) {
        console.log(data);

        this.showSuccess(data['message']);
        this.dynamics_image = environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile'];
        this.infoForm.patchValue({
          dynamics_image: environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile']
        });
        this.imageERPUploaded = true;
      } else {
        this.showError(data['message']);
        this.imageERPUploaded = false;
      }
    });
  }

}



