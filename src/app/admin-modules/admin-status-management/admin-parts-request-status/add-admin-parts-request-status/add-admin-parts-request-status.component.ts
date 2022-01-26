// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-add-admin-parts-request-status',
  templateUrl: './add-admin-parts-request-status.component.html',
  styleUrls: ['./add-admin-parts-request-status.component.scss']
})
export class AddAdminPartsRequestStatusComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  PartsRequestStatusList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addPartsRequestStatusForm: FormGroup;
  deletemode: boolean;
  imageUploaded: boolean;
  PartsRequestStatusUrl: string;
  type: string;
  id: any;
  viewmode: boolean = false;
  private special_char: RegExp = new RegExp("^[a-zA-Z0-9,-. ]*$");

  constructor(private adminService: AdminModuleService, private router: Router, private _Activatedroute: ActivatedRoute,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addPartsRequestStatusForm = this.formBuilder.group({
      parts_req_status_id: [''],
      parts_req_status_name: ['', [Validators.required, Validators.pattern(this.special_char)]],
      remarks: ['', [Validators.required, Validators.pattern(this.special_char)]],
      status: ['true', Validators.required],
      created_at: [''],
      created_by: [''],
      modified_at: [''],
      modified_by: [''],
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
        this.adminService.gePartsRequestStatusInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addPartsRequestStatusForm.patchValue({
              parts_req_status_id: data['data'].parts_req_status_id,
              parts_req_status_name: data['data'].parts_req_status_name,
              remarks: data['data'].remarks,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.PartsRequestStatusUrl = data['data'].icon;
            this.imageUploaded = true;
            $('.addBanner').modal('show');
            this.selectedData_ID = data['data'].id;
            this.addmode = false;
            this.editmode = true;
            this.deletemode = false;
            this.listmode = false;
          } else {

          }
        })
      }

      else if (this.type == 'clone') {

        this.adminService.gePartsRequestStatusInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addPartsRequestStatusForm.patchValue({
              parts_req_status_id: data['data'].parts_req_status_id,
              parts_req_status_name: data['data'].parts_req_status_name,
              remarks: data['data'].remarks,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            // this.featuresUrl = data['data'].icon;
            this.imageUploaded = true;
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
        this.addPartsRequestStatusForm.disable();
        this.adminService.gePartsRequestStatusInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addPartsRequestStatusForm.patchValue({
              parts_req_status_id: data['data'].parts_req_status_id,
              parts_req_status_name: data['data'].parts_req_status_name,
              remarks: data['data'].remarks,
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

  addPartsRequestStatus() {
    if (this.addPartsRequestStatusForm.valid &&
      this.addPartsRequestStatusForm.controls.parts_req_status_name.value.trim() != ""
      && this.addPartsRequestStatusForm.controls.remarks.value.trim() != "") {
      this.adminService.createPartsRequestStatus(this.addPartsRequestStatusForm.value).subscribe(data => {
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



  updatePartsRequestStatus() {
    this.dataLoaded = false;
    if (this.addPartsRequestStatusForm.valid &&
      this.addPartsRequestStatusForm.controls.parts_req_status_name.value.trim() != ""
      && this.addPartsRequestStatusForm.controls.remarks.value.trim() != "") {
      this.adminService.updatePartsRequestStatus(this.addPartsRequestStatusForm.value).subscribe(data => {
        if (data['success']) {
          this.showSuccess(data['msg']);
          this.cancel();
          this.selectedData_ID = null;
        } else {
          this.showSuccess(data['msg']);
        }
      });
    } else {
      this.showWarning("Please Fill all Fields");
    }
  }

  cancel() {
    $('#deleteModal').modal('hide');
    $('.addPartsRequestStatus').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.imageUploaded = true;
    this.PartsRequestStatusUrl = null;
    this.onPageReload();
    this.router.navigateByUrl('admin/status-management/parts-request')
  }

  onPageReload() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };
    this.adminService.getPartsRequestStatusList().subscribe(async data => {
      if (data['success']) {
        this.PartsRequestStatusList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.PartsRequestStatusList = [];
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
