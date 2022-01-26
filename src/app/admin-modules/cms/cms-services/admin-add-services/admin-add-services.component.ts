// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-add-services',
  templateUrl: './admin-add-services.component.html',
  styleUrls: ['./admin-add-services.component.scss']
})
export class AdminAddServicesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  ServicesList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addServicesForm: FormGroup;
  deletemode: boolean;
  imageUploaded: boolean;
  ServicesUrl: string;
  id: any;
  type: string;
  viewmode: boolean = false;
  // private special_char: RegExp = new RegExp("^[a-zA-Z0-9.,-]+$");

  constructor(private adminService: AdminModuleService, private router: Router, private _Activatedroute: ActivatedRoute,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addServicesForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      icon: [''],
      status: ['true'],
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
        this.adminService.getServicesInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addServicesForm.patchValue({
              id: data['data'].id,
              title: data['data'].title,
              content: data['data'].content,
              icon: data['data'].icon,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });

            this.ServicesUrl = data['data'].icon;
            this.imageUploaded = true;
            $('.addBanner').modal('show');
            this.selectedData_ID = data['data'].id;
            this.addmode = false;
            this.editmode = true;
            this.deletemode = false;
            this.listmode = false;
          }
        })
      } else if (this.type == 'clone') {
        this.adminService.getServicesInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addServicesForm.patchValue({
              id: data['data'].id,
              title: data['data'].title,
              content: data['data'].content,
              icon: data['data'].icon,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.ServicesUrl = data['data'].icon;
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
        this.addServicesForm.disable();
        this.adminService.getServicesInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addServicesForm.patchValue({
              id: data['data'].id,
              title: data['data'].title,
              content: data['data'].content,
              icon: data['data'].icon,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.ServicesUrl = data['data'].icon;
            this.imageUploaded = true;
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

  UploadServices(event) {
    this.adminService.uploadServicesCms(event.target.files[0]).subscribe(async data => {
      if (data['success']) {
        this.showSuccess(data['message']);
        this.ServicesUrl = await environment.baseurl + "cms-main/services_cms/viewimage?filename=" + data['uploadedfile'];
        this.addServicesForm.patchValue({
          icon: environment.baseurl + "cms-main/services_cms/viewimage?filename=" + data['uploadedfile']
        });
        this.imageUploaded = true;
      } else {
        this.showError(data['message']);
        this.imageUploaded = false;
      }
    });
  }






  addServices() {
    if (this.addServicesForm.valid && this.addServicesForm.controls.title.value.trim() != ""
      && this.addServicesForm.controls.content.value.trim() != "") {
      this.adminService.createServices(this.addServicesForm.value).subscribe(data => {
        if (data['success']) {
          this.showSuccess(data['msg']);
          this.cancel();
        }
        else {
          this.showError(data['msg']);
        }
      });
    } else {
      this.showWarning("Please Select a Record");
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



  editServices(data) {
    if (data != null) {
      this.addServicesForm.patchValue({
        id: data.id,
        title: data.title,
        content: data.content,
        icon: data.icon,
        status: data.status,
        created_at: data.created_at,
        created_by: data.created_by,
        modified_at: data.modified_at,
        modified_by: data.modified_by,
      });
      this.ServicesUrl = data.icon;
      this.imageUploaded = true;
      $('.addServices').modal('show');
      this.selectedData_ID = data.id;
      this.addmode = false;
      this.editmode = true;
      this.deletemode = false;
      this.listmode = false;
    } else {
      this.showWarning("Please Select a Record");
    }
  }


  deleteServices() {
    this.dataLoaded = false;
    this.adminService.deleteServices(this.selectedData_ID).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['msg']);
        this.cancel();
        this.selectedData_ID = null;
      } else {
        this.showError(data['msg']);
      }
    });
  }

  updateServices() {
    this.dataLoaded = false;
    if (this.addServicesForm.valid && this.addServicesForm.controls.title.value.trim() != ""
      && this.addServicesForm.controls.content.value.trim() != "") {
      this.adminService.updateServices(this.addServicesForm.value).subscribe(data => {
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
    $('.addServices').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.imageUploaded = true;
    this.ServicesUrl = null;
    this.onPageReload();
    this.router.navigateByUrl('admin/cms-services');
  }

  onPageReload() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };
    this.adminService.getServicesList().subscribe(async data => {
      if (data['success']) {
        this.ServicesList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.ServicesList = [];
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
