// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-addreason',
  templateUrl: './addreason.component.html',
  styleUrls: ['./addreason.component.scss']
})
export class AddreasonComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  ReasonList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  deletemode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addReasonForm: FormGroup;
  filterMode: Boolean = true;
  advancefilterMode: Boolean = false;
  p: number = 1;
  itemPage: number = 10;
  FilteredState: boolean = false;
  advanceFilterForm: FormGroup;
  UserList: any;
  myForm: FormGroup;
  arr: FormArray;
  createdElements: any;

  constructor(private adminService: AdminModuleService,
    private toastr: ToastrManager, private router: Router,
    private formBuilder: FormBuilder) {
    this.addReasonForm = this.formBuilder.group({
      id: [''],
      reason_name: ['', Validators.required],
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
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      ordering: true,
      lengthMenu: [10, 25, 50, 100]
    };

    this.getReasonList();

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
    this.getReasonList();
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
    if (selectedVal == 'id') {
      $("#numberinput" + i).attr("type", "number");
      $("#numberinput" + i).val('');
      $("#ddlstatus" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      $("#numberinput" + i).css('display', 'block');
      this.myForm.setErrors({ 'invalid': true });
      $(".ddlcondition").val('').attr("selected", "selected");
      $(".ddlcondition").children("option[value^=like]").hide()
    }
    else if (selectedVal == 'reason_name') {
      $("#ddlstatus" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      $("#numberinput" + i).css('display', 'block');
      $("#numberinput" + i).attr("type", "text");
      $("#numberinput" + i).val('');
      this.myForm.setErrors({ 'invalid': true });
      $(".ddlcondition").val('').attr("selected", "selected");
      $(".ddlcondition").children("option[value^=like]").show()
    }
    else if (selectedVal == 'created_at') {
      $("#numberinput" + i).attr("type", "date");
      $("#numberinput" + i).css('display', 'block');
      $("#ddlstatus" + i).css('display', 'none');
      $("#numberinput" + i).val('');
      $("#ddlcreatedBy" + i).css('display', 'none');
      this.myForm.setErrors({ 'invalid': true });
      $(".ddlcondition").val('').attr("selected", "selected");
      $(".ddlcondition").children("option[value^=like]").hide()
    }
    else if (selectedVal == 'status') {
      $("#ddlstatus" + i).css('display', 'block');
      $("#numberinput" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      this.myForm.setErrors({ 'invalid': true });
      $(".ddlcondition").val('').attr("selected", "selected");
      $(".ddlcondition").children("option[value^=like]").hide()
    }
    else if (selectedVal == 'created_by') {
      $("#ddlcreatedBy" + i).css('display', 'block');
      $("#numberinput" + i).css('display', 'none');
      $("#ddlstatus" + i).css('display', 'none');
      this.myForm.setErrors({ 'invalid': true });
      $(".ddlcondition").val('').attr("selected", "selected");
      $(".ddlcondition").children("option[value^=like]").hide()
    }
    else {
      $("#numberinput" + i).attr("type", "text");
      $("#ddlstatus" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      $("#numberinput" + i).css('display', 'block');
      this.myForm.setErrors({ 'invalid': true });
      $(".ddlcondition").val('').attr("selected", "selected");
      $(".ddlcondition").children("option[value^=like]").hide()
    }
  }

  AdvancesFilterData() {
    this.FilteredState = true;
    $('.bd-example-modal-lg').modal('hide');

    this.dataLoaded = false;
    this.adminService.searchAdvanceFilter(['reason_details', this.myForm.value.arr]).subscribe(async data => {
      console.log("advanceFilterForm", data)
      if (data['success']) {
        this.ReasonList = await data['data'];
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
        this.ReasonList = [];
      }
    });
  }

  getReasonList() {

    this.adminService.getReasonList().subscribe(async data => {
      if (data['success']) {
        this.ReasonList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.ReasonList = [];
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


  addReason() {
    this.router.navigateByUrl('admin/reason-management/configure/add/0');
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

  editFeatures(data) {
    this.router.navigateByUrl('admin/reason-management/configure/view/' + data.id);
  }

  cloneFeatures(data) {
    this.router.navigateByUrl('admin/reason-management/configure/clone/' + data.id);
  }

  editReason(data) {
    this.router.navigateByUrl('admin/reason-management/configure/update/' + data.id);
  }


  deleteReason() {
    this.dataLoaded = false;
    this.adminService.deleteReason(this.selectedData_ID).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['msg']);
        this.cancel();
        this.selectedData_ID = null;
      } else {
        this.showError(data['msg']);
      }
    });
  }

  updateReason() {
    this.dataLoaded = false;
    this.adminService.updateReason(this.addReasonForm.value).subscribe(data => {
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
    $('.addReason').modal('hide');
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
    this.adminService.getReasonList().subscribe(async data => {
      if (data['success']) {
        this.ReasonList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.ReasonList = [];
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

  ClearFilter() {
    this.advanceFilterForm.reset();
    this.advanceFilterForm.patchValue({ status: 1 });
    this.getReasonList();
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
    this.adminService.searchFeaturesList(this.advanceFilterForm.value, "reason_details").subscribe(async data => {
      console.log("advanceFilterForm", data)
      if (data['success']) {
        this.ReasonList = await data['data'];
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
