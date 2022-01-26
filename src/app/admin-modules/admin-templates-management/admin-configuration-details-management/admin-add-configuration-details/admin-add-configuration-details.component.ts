// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-add-configuration-details',
  templateUrl: './admin-add-configuration-details.component.html',
  styleUrls: ['./admin-add-configuration-details.component.scss']
})
export class AdminAddConfigurationDetailsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  Configuration_detailsList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  deletemode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addConfiguration_detailsForm: FormGroup;
  id: string;
  type: string;
  constructor(private adminService: AdminModuleService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addConfiguration_detailsForm = this.formBuilder.group({
      id: [''],
      config_name: ['', Validators.required],
      config_URL: ['', Validators.required],
      config_username: ['', Validators.required],
      config_password: ['', Validators.required],
      config_port: ['', Validators.required],
      config_parameter: ['', Validators.required],
      config_MobileNumber: ['', Validators.required],
      config_mtype: ['', Validators.required],
      config_message: ['', Validators.required],
      config_secretkey: ['', Validators.required],
      status: ['', Validators.required],
      remarks: ['', Validators.required],
      created_at: ['', Validators.required],
      modified_at: ['', Validators.required],
      created_by: ['', Validators.required],
      modified_by: ['', Validators.required],
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
        this.adminService.getConfiguration_detailsInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addConfiguration_detailsForm.patchValue({
              id: data['data'].id,
              module_id: data['data'].module_id,
              title_name: data['data'].title_name,
              Configuration_details_content: data['data'].Configuration_details_content,
              action: data['data'].action,
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


  addConfiguration_details() {
    if (this.addConfiguration_detailsForm.valid) {
      this.adminService.createConfiguration_details(this.addConfiguration_detailsForm.value).subscribe(data => {
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



  editConfiguration_details(data) {
    if (data != null) {
      this.addConfiguration_detailsForm.patchValue({
        id: data.id,
        Configuration_details_name: data.Configuration_details_name,
        created_at: data.created_at,
        created_by: data.created_by,
        modified_at: data.modified_at,
        modified_by: data.modified_by,
      });
      $('.addConfiguration_details').modal('show');
      this.selectedData_ID = data.id;
      this.addmode = false;
      this.editmode = true;
      this.deletemode = false;
      this.listmode = false;
    } else {
      this.showWarning("Please Select a Record");
    }
  }


  deleteConfiguration_details() {
    this.dataLoaded = false;
    this.adminService.deleteConfiguration_details(this.selectedData_ID).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['msg']);
        this.cancel();
        this.selectedData_ID = null;
      } else {
        this.showError(data['msg']);
      }
    });
  }

  updateConfiguration_details() {
    this.dataLoaded = false;
    this.adminService.updateConfiguration_details(this.addConfiguration_detailsForm.value).subscribe(data => {
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
    $('.addConfiguration_details').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.onPageReload();
    this.router.navigateByUrl('admin/templates-management/configuration-details-management')
  }

  onPageReload() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };
    this.adminService.getConfiguration_detailsList().subscribe(async data => {
      if (data['success']) {
        this.Configuration_detailsList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.Configuration_detailsList = [];
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
