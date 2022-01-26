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
  selector: 'app-admin-add-social-media-links',
  templateUrl: './admin-add-social-media-links.component.html',
  styleUrls: ['./admin-add-social-media-links.component.scss']
})
export class AdminAddSocialMediaLinksComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  MediaLinksList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addMediaLinksForm: FormGroup;
  deletemode: boolean;
  imageUploaded: boolean;
  MediaLinksUrl: string;
  type: string;
  id: any;
  viewmode: boolean = false;
  // private special_char: RegExp = new RegExp("^[a-zA-Z0-9.,- ]+$");

  constructor(private adminService: AdminModuleService, private router: Router, private _Activatedroute: ActivatedRoute,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addMediaLinksForm = this.formBuilder.group({
      id: [''],
      link: ['', [Validators.required]],
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
        this.adminService.getMediaLinksInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addMediaLinksForm.patchValue({
              id: data['data'].id,
              link: data['data'].link,
              icon: data['data'].icon,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.MediaLinksUrl = data['data'].icon;
            this.imageUploaded = true;
            $('.addBanner').modal('show');
            this.selectedData_ID = data['data'].id;
            this.addmode = false;
            this.editmode = true;
            this.deletemode = false;
            this.listmode = false;
          }



          else {

          }
        })
      }

      else if (this.type == 'clone') {

        this.adminService.getMediaLinksInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addMediaLinksForm.patchValue({
              id: data['data'].id,
              link: data['data'].link,
              icon: data['data'].icon,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.MediaLinksUrl = data['data'].icon;
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
        this.addMediaLinksForm.disable();
        this.adminService.getMediaLinksInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addMediaLinksForm.patchValue({
              id: data['data'].id,
              link: data['data'].link,
              icon: data['data'].icon,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.MediaLinksUrl = data['data'].icon;
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

  addMediaLinks() {
    if (this.addMediaLinksForm.valid && this.addMediaLinksForm.controls.link.value.trim() != "") {
      this.adminService.createMediaLinks(this.addMediaLinksForm.value).subscribe(data => {
        if (data['success']) {
          this.showSuccess(data['msg']);
          this.cancel();
        } else {
          this.showError(data['msg']);
        }
      });
    }
    else {
      this.showWarning("Please Select a Record");
    }
  }

  UploadMediaLinks(event) {
    this.adminService.uploadMediaLinksCms(event.target.files[0]).subscribe(async data => {
      if (data['success']) {
        this.showSuccess(data['message']);
        this.MediaLinksUrl = await environment.baseurl + "cms-main/social_media_links_cms/viewimage?filename=" + data['uploadedfile'];
        this.addMediaLinksForm.patchValue({
          icon: environment.baseurl + "cms-main/social_media_links_cms/viewimage?filename=" + data['uploadedfile']
        });
        this.imageUploaded = true;
      } else {
        this.showError(data['message']);
        this.imageUploaded = false;
      }
    });
  }




  editMediaLinks(data) {
    if (data != null) {
      this.addMediaLinksForm.patchValue({
        id: data.id,
        link: data.link,
        icon: data.icon,
        status: data.status,
        created_at: data.created_at,
        created_by: data.created_by,
        modified_at: data.modified_at,
        modified_by: data.modified_by,
      });
      this.MediaLinksUrl = data.icon;
      this.imageUploaded = true;
      $('.addMediaLinks').modal('show');
      this.selectedData_ID = data.id;
      this.addmode = false;
      this.editmode = true;
      this.deletemode = false;
      this.listmode = false;
    } else {
      this.showWarning("Please Select a Record");
    }
  }


  updateMediaLinks() {
    this.dataLoaded = false;
    if (this.addMediaLinksForm.valid && this.addMediaLinksForm.controls.link.value.trim() != "") {
      this.adminService.updateMediaLinks(this.addMediaLinksForm.value).subscribe(data => {
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
    $('.addMediaLinks').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.imageUploaded = true;
    this.MediaLinksUrl = null;
    this.onPageReload();
    this.router.navigateByUrl('admin/cms-social-media-links')
  }

  onPageReload() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };
    this.adminService.getMediaLinksList().subscribe(async data => {
      if (data['success']) {
        this.MediaLinksList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.MediaLinksList = [];
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
