// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-add-user-type',
  templateUrl: './admin-add-user-type.component.html',
  styleUrls: ['./admin-add-user-type.component.scss']
})
export class AdminAddUserTypeComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  UserTypeList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  deletemode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addUserTypeForm: FormGroup;
  id: string;
  type: string;
  viewmode: boolean = false;
  private special_char: RegExp = new RegExp("^[a-zA-Z0-9,-. ]*$");


  constructor(private adminService: AdminModuleService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addUserTypeForm = this.formBuilder.group({
      login_user_type_id: [''],
      login_user_type_name: ['', [Validators.required, Validators.pattern(this.special_char)]],
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

    this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
      this.type = params.get('type');
      if (this.type == 'update') {
        this.dataLoaded = true;
        this.addmode = false;
        this.editmode = true;
        this.adminService.getUserTypeInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addUserTypeForm.patchValue({
              login_user_type_id: data['data'].login_user_type_id,
              login_user_type_name: data['data'].login_user_type_name,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.selectedData_ID = data['data'].id;
            this.addmode = false;
            this.editmode = true;
          } else {

          }
        })
      }

      else if (this.type == 'clone') {

        this.adminService.getUserTypeInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addUserTypeForm.patchValue({
              login_user_type_id: data['data'].login_user_type_id,
              login_user_type_name: data['data'].login_user_type_name,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            //this.featuresUrl = data['data'].icon;
            //this.imageUploaded = true;
            //$('.addBanner').modal('show');
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
        this.addUserTypeForm.disable();
        this.adminService.getUserTypeInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addUserTypeForm.patchValue({
              login_user_type_id: data['data'].login_user_type_id,
              login_user_type_name: data['data'].login_user_type_name,
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
      }
    });
  }

  getselected(event, i) {
    console.log(i);
  }

  getallselected(event) {

  }


  addUserType() {
    if (this.addUserTypeForm.valid && this.addUserTypeForm.controls.login_user_type_name.value.trim() != "") {
      this.adminService.createUserType(this.addUserTypeForm.value).subscribe(data => {
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

  updateUserType() {
    this.dataLoaded = false;
    if (this.addUserTypeForm.valid && this.addUserTypeForm.controls.login_user_type_name.value.trim() != "") {
      this.adminService.updateUserType(this.addUserTypeForm.value).subscribe(data => {
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
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.onPageReload();
    this.router.navigateByUrl('admin/user-type-management')
  }

  onPageReload() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };

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
