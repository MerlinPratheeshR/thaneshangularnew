// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-cms-features',
  templateUrl: './cms-features.component.html',
  styleUrls: ['./cms-features.component.scss']
})
export class CmsFeaturesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  FeaturesList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addFeaturesForm: FormGroup;
  deletemode: boolean;
  imageUploaded: boolean;
  featuresUrl: string;
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

  constructor(private adminService: AdminModuleService, private router: Router,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addFeaturesForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      content: ['', Validators.required],
      icon: ['', Validators.required],
      status: ['', Validators.required],
      created_at: [''],
      created_by: [''],
      modified_at: [''],
      modified_by: [''],
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



    // var $th = $('.tableFixHead').find('thead th')
    // $('.tableFixHead').on('scroll', function() {
    //   $th.css('transform', 'translateY('+ this.scrollTop +'px)');
    // });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };

    this.getFeaturesList();

    this.getUserList();
    this.myForm = this.formBuilder.group({
      arr: this.formBuilder.array([this.createItem()])
    })

  }

  createItem() {
    return this.formBuilder.group({
      selectFields: ['', Validators.required],
      selectCondition: ['', Validators.required],
      enterValue: ['', Validators.required],


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
    this.getFeaturesList();
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
    if (selectedVal == 'id') {
      $("#numberinput" + i).attr("type", "number");
      $("#numberinput" + i).val('');
      $("#ddlstatus" + i).css('display', 'none');
      $("#ddlcreatedBy" + i).css('display', 'none');
      $("#numberinput" + i).css('display', 'block');
      this.myForm.setErrors({ 'invalid': true });
    }
    else if (selectedVal == 'title') {
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
    this.adminService.searchAdvanceFilter(['banner_cms', this.myForm.value.arr]).subscribe(async data => {
      console.log("advanceFilterForm", data);
      if (data['success']) {
        this.FeaturesList = await data['data'];
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
        this.FeaturesList = [];
      }
    });
  }


  getFeaturesList() {
    this.adminService.getFeaturesList().subscribe(async data => {
      if (data['success']) {
        this.FeaturesList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.FeaturesList = [];
      }
    });
  }

  openAdvanceFilter() {
    $('.bd-example-modal-lg').modal('show')
  }

  addAdvanceFilter() {

  }

  ClearFilter() {
    this.advanceFilterForm.reset();
    this.advanceFilterForm.patchValue({ status: 1 });
    this.getFeaturesList();
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
    // this.formatDate('2021-11-09');
    this.adminService.searchFeaturesList(this.advanceFilterForm.value, "features_cms").subscribe(async data => {
      console.log("advanceFilterForm", data)
      if (data['success']) {
        this.FeaturesList = await data['data'];
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

  pageChanged(event: any) {
    this.p = event;
  }

  getselected(event, i) {
    console.log(i);
  }

  getallselected(event) {

  }



  UploadFeatures(event) {
    this.adminService.uploadFeaturesCms(event.target.files[0]).subscribe(async data => {
      if (data['success']) {
        this.showSuccess(data['message']);
        this.featuresUrl = await environment.baseurl + "cms-main/features_cms/viewimage?filename=" + data['uploadedfile'];
        this.addFeaturesForm.patchValue({
          icon: environment.baseurl + "cms-main/features_cms/viewimage?filename=" + data['uploadedfile']
        });
        this.imageUploaded = true;
      } else {
        this.showError(data['message']);
        this.imageUploaded = false;
      }
    });
  }

  addFeatures() {
    let feature_count = this.FeaturesList.filter(item => item.status == true);
    if (feature_count.length <= 7) {
      this.router.navigateByUrl('admin/cms/features/add/0');
    } else {
      this.showWarning("Limited to 8 Entries only");
    }
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

  viewFeatures(data) {
    this.router.navigateByUrl('admin/cms/features/view/' + data.id);
  }

  editFeatures(data) {
    this.router.navigateByUrl('admin/cms/features/update/' + data.id);
  }

  cloneFeatures(data) {
    this.router.navigateByUrl('admin/cms/features/clone/' + data.id);
  }


  deleteFeatures() {
    this.dataLoaded = false;
    this.adminService.deleteFeatures(this.selectedData_ID).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['msg']);
        this.cancel();
        this.selectedData_ID = null;
      } else {
        this.showError(data['msg']);
      }
    });
  }

  updateFeatures() {
    this.dataLoaded = false;
    this.adminService.updateFeatures(this.addFeaturesForm.value).subscribe(data => {
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
    $('.addFeatures').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.imageUploaded = true;
    this.featuresUrl = null;
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
    this.adminService.getFeaturesList().subscribe(async data => {
      if (data['success']) {
        this.FeaturesList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.FeaturesList = [];
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
