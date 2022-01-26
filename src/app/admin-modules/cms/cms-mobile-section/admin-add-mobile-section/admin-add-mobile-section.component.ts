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
  selector: 'app-admin-add-mobile-section',
  templateUrl: './admin-add-mobile-section.component.html',
  styleUrls: ['./admin-add-mobile-section.component.scss']
})
export class AdminAddMobileSectionComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  MobileSectionList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addMobileSectionForm: FormGroup;
  deletemode: boolean;
  imageUploaded: boolean;
  MobileSectionUrl: string;
  type: string;
  id: any;
  viewmode: boolean = false;
  // private special_char: RegExp = new RegExp("^[a-zA-Z0-9,.- ]+$");



  constructor(private adminService: AdminModuleService, private router: Router, private _Activatedroute: ActivatedRoute,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addMobileSectionForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      image: [''],
      status: ['true',],
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
        this.adminService.getMobileSectionInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addMobileSectionForm.patchValue({
              id: data['data'].id,
              title: data['data'].title,
              content: data['data'].content,
              image: data['data'].image,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.MobileSectionUrl = data['data'].image;
            this.imageUploaded = true;
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

        this.adminService.getMobileSectionInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addMobileSectionForm.patchValue({
              id: data['data'].id,
              title: data['data'].title,
              content: data['data'].content,
              image: data['data'].image,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.MobileSectionUrl = data['data'].image;
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
        this.addMobileSectionForm.disable();
        this.adminService.getMobileSectionInfo(this.id).subscribe(data => {
          //console.log("Hello",data['data']);
          if (data['success']) {
            this.addMobileSectionForm.patchValue({
              id: data['data'].id,
              title: data['data'].title,
              content: data['data'].content,
              image: data['data'].image,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.MobileSectionUrl = data['data'].image;
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

  addMobileSection() {
    if (this.addMobileSectionForm.valid && this.addMobileSectionForm.controls.title.value.trim() != ""
      && this.addMobileSectionForm.controls.content.value.trim() != "") {
      this.adminService.createMobileSection(this.addMobileSectionForm.value).subscribe(data => {
        if (data['success']) {
          this.showSuccess(data['msg']);
          this.cancel();
        } else {
          this.showError(data['msg']);
        }
      });
    } else {
      this.showWarning("Please Select a Record");
    }
  }


  editMobileSection(data) {
    if (data != null) {
      this.addMobileSectionForm.patchValue({
        id: data.id,
        title: data['data'].title,
        content: data['data'].content,
        image: data['data'].image,
        status: data.status,
        created_at: data.created_at,
        created_by: data.created_by,
        modified_at: data.modified_at,
        modified_by: data.modified_by,
      });
      this.MobileSectionUrl = data.icon;
      this.imageUploaded = true;
      $('.addMobileSection').modal('show');
      this.selectedData_ID = data.id;
      this.addmode = false;
      this.editmode = true;
      this.deletemode = false;
      this.listmode = false;
    } else {
      this.showWarning("Please Select a Record");
    }
  }


  updateMobileSection() {
    this.dataLoaded = false;
    if (this.addMobileSectionForm.valid && this.addMobileSectionForm.controls.title.value.trim() != ""
      && this.addMobileSectionForm.controls.content.value.trim() != "") {
      this.adminService.updateMobileSection(this.addMobileSectionForm.value).subscribe(data => {
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

  UploadMobileSection(event) {
    this.adminService.uploadMobileSectionCms(event.target.files[0]).subscribe(async data => {
      if (data['success']) {
        this.showSuccess(data['message']);
        this.MobileSectionUrl = await environment.baseurl + "cms-main/mobile_section_cms/viewimage?filename=" + data['uploadedfile'];
        this.addMobileSectionForm.patchValue({
          image: environment.baseurl + "cms-main/mobile_section_cms/viewimage?filename=" + data['uploadedfile']
        });
        this.imageUploaded = true;
      } else {
        this.showError(data['message']);
        this.imageUploaded = false;
      }
    });
  }


  cancel() {
    $('#deleteModal').modal('hide');
    $('.addMobileSection').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.imageUploaded = true;
    this.MobileSectionUrl = null;
    this.onPageReload();
    this.router.navigateByUrl('admin/cms-mobile-section');
  }

  onPageReload() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };
    this.adminService.getMobileSectionList().subscribe(async data => {
      if (data['success']) {
        this.MobileSectionList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.MobileSectionList = [];
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
