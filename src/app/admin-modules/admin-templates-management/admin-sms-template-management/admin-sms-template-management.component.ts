// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-sms-template-management',
  templateUrl: './admin-sms-template-management.component.html',
  styleUrls: ['./admin-sms-template-management.component.scss']
})
export class AdminSmsTemplateManagementComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  SMSList: any;
  dataLoaded: boolean;
  deletemode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  filterMode: Boolean = true;
  advancefilterMode: Boolean = false;
  p: number = 1;
  itemPage: number = 10;
  FilteredState: Boolean = false;
  searchSMSForm: FormGroup;

  name = 'Angular';
  myForm: FormGroup;
  arr: FormArray;
  createdElements: any;

  constructor(private adminService: AdminModuleService, private formBuilder: FormBuilder, private toastr: ToastrManager, private router: Router) {

    this.searchSMSForm = this.formBuilder.group({
      status: [''],
      created_at: [''],
      created_by: [''],
      modified_at: [''],
      modified_by: [''],
    });


  }

  ngOnInit(): void {

    this.dataLoaded = false;
    this.deletemode = false;
    this.listmode = true;
    this.filterMode = true;
    this.advancefilterMode = false;
    this.FilteredState = false;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };

    this.getSMSList();

    this.myForm = this.formBuilder.group({
      arr: this.formBuilder.array([this.createItem()])
    })
  }



  createItem() {
    return this.formBuilder.group({
      selectFields: ['', Validators.required],
      selectCondition: ['', Validators.required],
      enterValue: ['', Validators.required]
    })
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
    this.getSMSList();
    this.myForm.reset();
    $("#test select").prop("selectedIndex", 0);

    console.log(this.myForm.value);


  }

  getSMSList() {
    this.adminService.getSMSList().subscribe(async data => {
      if (data['success']) {
        this.SMSList = await data['data'];
        console.log(this.SMSList);
        this.dataLoaded = true;
      } else {
        this.SMSList = [];
      }
    });

  }
  ClearFilter() {
    this.FilteredState = false;
  }

  FilterData() {

    console.log(this.searchSMSForm.value);

    this.FilteredState = true;
    this.getData();

  }

  getData() {
    this.dataLoaded = false;
    this.adminService.searchFeaturesList(this.searchSMSForm.value, "sms_template").subscribe(async data => {
      console.log(data);

      console.log("sms_template", data)
      if (data['success']) {
        this.SMSList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.showError(data['msg']);
      }
    });
  }

  onOptionsSelected(selectedVal: any, i: any) {
    console.log(selectedVal);
    if (selectedVal == 'id') {
      $("#numberinput" + i).attr("type", "number");
      $("#numberinput" + i).val('');
      $("#ddlstatus" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      $("#numberinput" + i).css('display', 'block');
      this.myForm.setErrors({ 'invalid': true });
    }
    else if (selectedVal == 'title_name') {
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
    this.adminService.searchAdvanceFilter(['sms_template', this.myForm.value.arr]).subscribe(async data => {
      console.log("advanceFilterForm", data);
      if (data['success']) {
        this.SMSList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.showError(data['msg']);
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
      this.openAdvanceFilter();
    }
  }

  openAdvanceFilter() {
    $('.bd-example-modal-lg').modal('show')
  }

  getselected(event, i) {
    console.log(i);
  }

  getallselected(event) {

  }


  addSMS() {
    this.router.navigateByUrl('admin/templates-management/sms-templates-management/configure/add/0');
  }


  validate(id) {
    console.log(id);

    if (id != null) {
      $('#deleteModal').modal('show');
      this.selectedData_ID = id;
      this.deletemode = true;
      this.listmode = false;
    } else {
      this.showWarning("Please Select a Record");
    }
  }



  editSMS(data) {
    console.log(data);
    this.router.navigateByUrl('admin/templates-management/sms-templates-management/configure/update/' + data.id);
  }


  deleteSMS() {
    this.dataLoaded = false;
    this.adminService.deleteSMS(this.selectedData_ID).subscribe(data => {
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
    $('.addSMS').modal('hide');
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
    this.adminService.getSMSList().subscribe(async data => {
      if (data['success']) {
        this.SMSList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.SMSList = [];
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
