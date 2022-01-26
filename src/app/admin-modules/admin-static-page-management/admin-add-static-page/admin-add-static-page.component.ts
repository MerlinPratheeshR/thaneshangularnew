// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-add-static-page',
  templateUrl: './admin-add-static-page.component.html',
  styleUrls: ['./admin-add-static-page.component.scss']
})
export class AdminAddStaticPageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  countryList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  deletemode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addCountryForm: FormGroup;
  id: string;
  type: string;
  constructor(private adminService: AdminModuleService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addCountryForm = this.formBuilder.group({
      id: [''],
      country_name: ['', Validators.required],
      country_code: ['', Validators.required],
      status: ['true', Validators.required],
      created_at: [''],
      created_by: [''],
      modified_at: [''],
      modified_by: [''],
    });
  }

  ngOnInit(): void {

    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;

    this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
      this.type = params.get('type');
      if (this.type == 'update') {
        this.dataLoaded = true;
        this.addmode = false;
        this.editmode = true;
        this.deletemode = false;
        this.adminService.getCountryInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addCountryForm.patchValue({
              id: data['data'].id,
              country_name: data['data'].country_name,
              country_code: data['data'].country_code,
              remarks: data['data'].remarks,
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
        this.addmode = true;
        this.editmode = false;
        this.deletemode = false;
      }
    });
  }

  getselected(event, i) {
    console.log(i);
  }

  getallselected(event) {

  }


  addCountry() {
    if (this.addCountryForm.valid) {
      this.adminService.createCountry(this.addCountryForm.value).subscribe(data => {
        if (data['success']) {
          this.showSuccess(data['msg']);
          this.cancel();
        } else {
          this.showError(data['msg']);
        }
      });
    } else {
      this.showWarning("Please Fill all Fields");
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



  editCountry(data) {
    if (data != null) {
      this.addCountryForm.patchValue({
        id: data.id,
        country_name: data.country_name,
        created_at: data.created_at,
        created_by: data.created_by,
        modified_at: data.modified_at,
        modified_by: data.modified_by,
      });
      $('.addCountry').modal('show');
      this.selectedData_ID = data.id;
      this.addmode = false;
      this.editmode = true;
      this.deletemode = false;
      this.listmode = false;
    } else {
      this.showWarning("Please Select a Record");
    }
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

  updateCountry() {
    this.dataLoaded = false;
    this.adminService.updateCountry(this.addCountryForm.value).subscribe(data => {
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
    $('.addCountry').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.onPageReload();
    this.router.navigateByUrl('admin/static-page-management')
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
