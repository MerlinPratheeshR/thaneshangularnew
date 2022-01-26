// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
declare var $: any;

@Component({
  selector: 'app-admin-add-payout-schedule',
  templateUrl: './admin-add-payout-schedule.component.html',
  styleUrls: ['./admin-add-payout-schedule.component.scss']
})
export class AdminAddPayoutScheduleComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  PayoutList: any;
  dataLoaded: boolean;
  addmode: boolean;
  arr: FormArray;

  editmode: boolean;
  deletemode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addPayoutForm: FormGroup;
  id: string;
  type: string;
  viewmode: boolean = false;
  private special_char: RegExp = new RegExp("^[a-zA-Z0-9,-. ]*$");


  constructor(private adminService: AdminModuleService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addPayoutForm = this.formBuilder.group({
      id: [''],
      subscription_name: ['', [Validators.required, Validators.pattern(this.special_char)]],
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
        this.adminService.getPayoutInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addPayoutForm.patchValue({
              id: data['data'].id,
              subscription_name: data['data'].subscription_name,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            $('.addBanner').modal('show');
            this.selectedData_ID = data['data'].id;
            this.addmode = false;
            this.editmode = true;
            this.deletemode = false;
            this.listmode = false;
          }


        })
      } else if (this.type == 'clone') {

        this.adminService.getPayoutInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addPayoutForm.patchValue({
              id: data['data'].id,
              subscription_name: data['data'].subscription_name,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            // this.featuresUrl = data['data'].icon;
            // this.imageUploaded = true;
            $('.addBanner').modal('show');
            this.selectedData_ID = data['data'].id;
            this.addmode = true;
            this.editmode = false;
            this.deletemode = false;
            this.listmode = false;
          } else {

          }
        });
      }

      else if (this.type == 'view') {
        this.viewmode = true;
        this.editmode = false;
        this.addmode = false;
        this.addPayoutForm.disable();
        this.adminService.getPayoutInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addPayoutForm.patchValue({
              id: data['data'].id,
              subscription_name: data['data'].subscription_name,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
          }
        })
      }

      else {
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


  addPayout() {
    if (this.addPayoutForm.valid && this.addPayoutForm.controls.subscription_name.value.trim() != "") {
      this.adminService.createPayout(this.addPayoutForm.value).subscribe(data => {
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



  editPayout(data) {
    if (data != null) {
      this.addPayoutForm.patchValue({
        id: data.id,
        Payout_name: data.Payout_name,
        created_at: data.created_at,
        created_by: data.created_by,
        modified_at: data.modified_at,
        modified_by: data.modified_by,
      });
      $('.addPayout').modal('show');
      this.selectedData_ID = data.id;
      this.addmode = false;
      this.editmode = true;
      this.deletemode = false;
      this.listmode = false;
    } else {
      this.showWarning("Please Select a Record");
    }
  }


  deletePayout() {
    this.dataLoaded = false;
    this.adminService.deletePayout(this.selectedData_ID).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['msg']);
        this.cancel();
        this.selectedData_ID = null;
      } else {
        this.showError(data['msg']);
      }
    });
  }

  updatePayout() {
    this.dataLoaded = false;
    if (this.addPayoutForm.valid && this.addPayoutForm.controls.subscription_name.value.trim() != "") {
      this.adminService.updatePayout(this.addPayoutForm.value).subscribe(data => {
        if (data['success']) {
          this.showSuccess(data['msg']);
          this.cancel();
          this.selectedData_ID = null;
        } else {
          this.showSuccess(data['msg']);
        }
      });
    } else {
      this.showWarning("Please Select a Record");
    }
  }

  cancel() {
    $('#deleteModal').modal('hide');
    $('.addPayout').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.onPageReload();
    this.router.navigateByUrl('admin/payout-schedule-management')
  }

  onPageReload() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };
    this.adminService.getPayoutList().subscribe(async data => {
      if (data['success']) {
        this.PayoutList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.PayoutList = [];
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
