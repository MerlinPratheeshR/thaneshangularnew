// @ts-nocheck
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
declare var $: any;

@Component({
  selector: 'app-addcurrency',
  templateUrl: './addcurrency.component.html',
  styleUrls: ['./addcurrency.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AddcurrencyComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  CurrencyList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  deletemode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addCurrencyForm: FormGroup;
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
  test: number = 10;
  constructor(private adminService: AdminModuleService,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.addCurrencyForm = this.formBuilder.group({
      id: [''],
      currency_name: ['', Validators.required],
      created_at: ['', Validators.required],
      created_by: ['', Validators.required],
      modified_at: ['', Validators.required],
      modified_by: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.assign_dtOptions();

    setTimeout(() => {
      this.dtTrigger.next();
    }, 500);

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

    /* this.dtOptions = {
       pagingType: 'full_numbers',
       pageLength: 10,
       processing: true,
       ordering: true,
       lengthMenu: [10, 25, 50, 100]
     };*/

    //this.getCurrencyList()
    this.getUserList();

    this.myForm = this.formBuilder.group({
      arr: this.formBuilder.array([this.createItem()])
    })
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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
    this.getCurrencyList();
    this.myForm.reset();
    $("#test select").prop("selectedIndex", 0);

  }

  assign_dtOptions() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false,
      info: false,
      serverSide: true,
      processing: true,
      pageLength: 10,
      ordering: true,
      lengthMenu: [10, 25, 50, 100],
      columnDefs: [{
        targets: 0,
        orderable: false
      }],
      language: {
        paginate: {
          previous: "<",
          next: ">",
          first: "<<",
          last: ">>"
        }
      },
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters.conditions = [];
        for (let x in this.advanceFilterForm.value) {
          if (this.advanceFilterForm.value[x] !== '' && this.advanceFilterForm.value[x] !== null) {
            dataTablesParameters.conditions.push({ key: x, condition: '=', value: this.advanceFilterForm.value[x], join_condition: 'and' });
          }
        }
        for (let x in this.myForm.value.arr) {
          if (this.myForm.value.arr[x].selectFields !== null && this.myForm.value.arr[x].enterValue !== '' && this.myForm.value.arr[x].enterValue !== null) {
            dataTablesParameters.conditions.push({ key: this.myForm.value.arr[x].selectFields, condition: this.myForm.value.arr[x].selectCondition, value: this.myForm.value.arr[x].enterValue, join_condition: this.myForm.value.arr[x].joinCondition });
          }
        }
        this.adminService.getCountryList(dataTablesParameters).subscribe(resp => {
          this.CurrencyList = resp.data;

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: [],
          });
        });
      },
      drawCallback: function (settings) {
        console.log(settings);
        $("#details_gdr_length").appendTo("#details_gdr_footer");
        $("#details_gdr_paginate").appendTo("#details_gdr_footer");
        $("#details_gdr_paginate").addClass("ngx-pagination");
        $(".paginate_button").addClass("mx-2 text-decoration-none text-dark").removeClass("paginate_button").css("cursor", "pointer");
      }
    };
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
    else if (selectedVal == 'currency_name') {
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
    this.assign_dtOptions();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
    $('.bd-example-modal-lg').modal('hide');

    /* this.dataLoaded = false;
     this.adminService.searchAdvanceFilter(['currency_details', this.myForm.value.arr]).subscribe(async data => {
       console.log("advanceFilterForm", data)
       if (data['success']) {
         this.CurrencyList = await data['data'];
         this.dataLoaded = true;
       } else {
         this.showError(data['msg']);
       }
     });*/


  }

  getCurrencyList() {
    this.adminService.getCurrencyList().subscribe(async data => {
      if (data['success']) {
        this.CurrencyList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.CurrencyList = [];
      }
    });
  }

  sort(a) {
    console.log(a);
    this.test = a;
    this.p = 1;




  }

  getUserList() {
    this.adminService.getUserList().subscribe(async data => {

      if (data['success']) {
        this.UserList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.CurrencyList = [];
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


  addCurrency() {
    this.router.navigateByUrl('admin/currency-management/configure/add/0');
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
    this.router.navigateByUrl('admin/currency-management/configure/view/' + data.id);
  }

  cloneFeatures(data) {
    this.router.navigateByUrl('admin/currency-management/configure/clone/' + data.id);
  }

  editCurrency(data) {
    console.log(data);

    this.router.navigateByUrl('admin/currency-management/configure/update/' + data.id);
  }


  deleteCurrency() {
    this.dataLoaded = false;
    this.adminService.deleteCurrency(this.selectedData_ID).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['msg']);
        this.cancel();
        this.selectedData_ID = null;
      } else {
        this.showError(data['msg']);
      }
    });
  }

  updateCurrency() {
    this.dataLoaded = false;
    this.adminService.updateCurrency(this.addCurrencyForm.value).subscribe(data => {
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
    $('.addCurrency').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.onPageReload();
  }

  onPageReload() {
    /*
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };*/
    this.adminService.getCurrencyList().subscribe(async data => {
      if (data['success']) {
        this.CurrencyList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.CurrencyList = [];
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
    this.getCurrencyList();
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
    this.adminService.searchFeaturesList(this.advanceFilterForm.value, "currency_details").subscribe(async data => {
      console.log("advanceFilterForm", data)
      if (data['success']) {
        this.CurrencyList = await data['data'];
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

  get myFormArr() {
    return this.myForm.get('arr') as FormArray
  }


}
