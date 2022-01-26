// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import { environment } from 'src/environments/environment.prod';
declare var $: any;


@Component({
  selector: 'app-add-admin-place-of-supply',
  templateUrl: './add-admin-place-of-supply.component.html',
  styleUrls: ['./add-admin-place-of-supply.component.scss']
})
export class AddAdminPlaceOfSupplyComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  CategoryRequestStatusList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addCategoryRequestStatusForm: FormGroup;
  deletemode: boolean;
  imageUploaded: boolean;
  CategoryRequestStatusUrl: string;
  type: string;
  id: any;

  constructor(private adminService: AdminModuleService, private router: Router, private _Activatedroute: ActivatedRoute,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addCategoryRequestStatusForm = this.formBuilder.group({

      pos_id: ['', Validators.required],
      tax_name: ['', Validators.required],
      tax_code: ['', Validators.required],
      erp_id: ['', Validators.required],
      last_integrated_date: ['', Validators.required],
      status: ['', Validators.required],
      created_at: ['', Validators.required],
      created_by: ['', Validators.required],
      modified_at: ['', Validators.required],
      modified_by: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.dataLoaded = false;
    this.imageUploaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;

    this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
      this.type = params.get('type');
      if (this.type == 'update') {
        this.dataLoaded = true;
        this.imageUploaded = false;
        this.addmode = false;
        this.editmode = true;
        this.deletemode = false;
        this.adminService.geCategoryRequestStatusInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addCategoryRequestStatusForm.patchValue({
              pos_id: data['data'].cat_req_status_id,
              tax_name: data['data'].cat_req_status_name,
              tax_code: data['data'].remarks,
              erp_id: data['data'].remarks,
              last_integrated_date: data['data'].remarks,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.selectedData_ID = data['data'].id;
            this.addmode = false;
            this.editmode = true;
            this.deletemode = false;
            this.listmode = false;
          } else {

          }
        })
      } else {
        this.dataLoaded = true;
        this.imageUploaded = false;
        this.addmode = true;
        this.editmode = false;
        this.deletemode = false;
      }
    });



    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };


  }

  getselected(event, i) {
    console.log(i);
  }

  getallselected(event) {

  }

  addplaceofsupply() {
    this.adminService.createCategoryRequestStatus(this.addCategoryRequestStatusForm.value).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['msg']);
        this.cancel();
      } else {
        this.showError(data['msg']);
      }
    })
  }


  updateplaceofsupply() {
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
    this.CategoryRequestStatusUrl = null;
    this.onPageReload();
    this.router.navigateByUrl('admin/tax-management/place-of-supply')
  }

  onPageReload() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };
    this.adminService.getCategoryRequestStatusList().subscribe(async data => {
      if (data['success']) {
        this.CategoryRequestStatusList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.CategoryRequestStatusList = [];
      }
    });
  }


  showSuccess(msg) {
    this.toastr.successToastr(msg);
  }

  showError(msg) {
    this.toastr.errorToastr(msg);
  }

  showWarning(msg) {
    this.toastr.warningToastr(msg);
  }
}


