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
  selector: 'app-admin-add-banner',
  templateUrl: './admin-add-banner.component.html',
  styleUrls: ['./admin-add-banner.component.scss']
})
export class AdminAddBannerComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  BannerList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addBannerForm: FormGroup;
  deletemode: boolean;
  imageUploaded: boolean;
  landscapeurl: string;
  portraiturl: string;
  videourl: string;



  id: string;
  type: string;
  viewmode: boolean = false;
  Editfiletype: any;
  // private special_char: RegExp = new RegExp("^[a-zA-Z0-9.,- ]+$");

  constructor(private adminService: AdminModuleService, private router: Router, private _Activatedroute: ActivatedRoute,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addBannerForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      status: ['', Validators.required],
      filetype: ['', Validators.required],
      landscapeurl: [''],
      portraiturl: [''],
      videourl: [''],
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
        this.adminService.getBannerInfo(this.id).subscribe(data => {
          if (data['success']) {
            console.log(data);

            this.addBannerForm.patchValue({
              id: data['data'].id,
              title: data['data'].title,
              content: data['data'].content,
              status: data['data'].status,
              filetype: data['data'].filetype,
              landscapeurl: data['data'].landscapeurl,
              portraiturl: data['data'].portraiturl,
              videourl: data['data'].videourl,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.landscapeurl = data['data'].landscapeurl;
            this.portraiturl = data['data'].portraiturl;
            this.videourl = data['data'].videourl;
            this.Editfiletype = data['data'].filetype;
            if (this.Editfiletype == 'image') {

              $("#image").css('display', 'block');
              $("#video").css('display', 'none');
            }
            else if (this.Editfiletype == 'video') {
              $("#image").css('display', 'none');
              $("#video").css('display', 'block');
            }
            this.imageUploaded = true;
            $('.addBanner').modal('show');
            this.selectedData_ID = data['data'].id;
            this.addmode = false;
            this.editmode = true;
            this.deletemode = false;
            this.listmode = false;
          } else {

          }
        });
      } else if (this.type == 'clone') {

        this.adminService.getBannerInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addBannerForm.patchValue({
              id: data['data'].id,
              title: data['data'].title,
              content: data['data'].content,
              icon: data['data'].icon,
              status: data['data'].status,
              filetype: data['data'].filetype,
              landscapeurl: data['data'].landscapeurl,
              portraiturl: data['data'].portraiturl,
              videourl: data['data'].videourl,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.landscapeurl = data['data'].landscapeurl;
            this.portraiturl = data['data'].portraiturl;
            this.videourl = data['data'].videourl;
            this.Editfiletype = data['data'].filetype;
            if (this.Editfiletype == 'image') {

              $("#image").css('display', 'block');
              $("#video").css('display', 'none');
            }
            else if (this.Editfiletype == 'video') {
              $("#image").css('display', 'none');
              $("#video").css('display', 'block');
            }

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
        this.addBannerForm.disable();
        this.adminService.getBannerInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addBannerForm.patchValue({
              id: data['data'].id,
              title: data['data'].title,
              content: data['data'].content,
              icon: data['data'].icon,
              status: data['data'].status,
              filetype: data['data'].filetype,
              landscapeurl: data['data'].landscapeurl,
              portraiturl: data['data'].portraiturl,
              videourl: data['data'].videourl,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.landscapeurl = data['data'].landscapeurl;
            this.portraiturl = data['data'].portraiturl;
            this.videourl = data['data'].videourl;
            this.Editfiletype = data['data'].filetype;
            if (this.Editfiletype == 'image') {

              $("#image").css('display', 'block');
              $("#video").css('display', 'none');
            }
            else if (this.Editfiletype == 'video') {
              $("#image").css('display', 'none');
              $("#video").css('display', 'block');
            }
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


    this.adminService.getBannerList().subscribe(async data => {
      if (data['success']) {
        this.BannerList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.BannerList = [];
      }
    });
  }

  getselected(event, i) {
    console.log(i);
  }

  getallselected(event) {

  }

  UploadLandscape(event) {


    let img = new Image()
    img.src = window.URL.createObjectURL(event.target.files[0])
    img.onload = () => {
      console.log(img.width);
      console.log(img.height);


      if (img.width >= 1080 || img.width <= 1200 && img.height >= 512 || img.height <= 630) {
        alert(`Nice, image is the right size. It can be uploaded`)

        this.adminService.uploadBannerCms(event.target.files[0]).subscribe(async data => {
          if (data['success']) {
            this.showSuccess(data['message']);
            this.landscapeurl = await environment.baseurl + "cms-main/banner_cms/viewimage?filename=" + data['uploadedfile'];
            this.addBannerForm.patchValue({
              landscapeurl: environment.baseurl + "cms-main/banner_cms/viewimage?filename=" + data['uploadedfile']
            });
            this.imageUploaded = true;
          } else {
            this.showError(data['message']);
            this.imageUploaded = false;
          }
        });

        // upload logic here
      } else {
        alert(`Sorry, this image doesn't look like the size we wanted. It's 
       ${img.width} x ${img.height} but we require 1980 x 1080 size image.`);
      }
    }



  }
  UploadPortrait(event) {


    let img = new Image()
    img.src = window.URL.createObjectURL(event.target.files[0])
    img.onload = () => {
      if (img.width >= 630 || img.width <= 1080 && img.height >= 1200 || img.height <= 1350) {
        alert(`Nice, image is the right size. It can be uploaded`)

        this.adminService.uploadBannerCms(event.target.files[0]).subscribe(async data => {
          if (data['success']) {
            this.showSuccess(data['message']);
            this.portraiturl = await environment.baseurl + "cms-main/banner_cms/viewimage?filename=" + data['uploadedfile'];
            this.addBannerForm.patchValue({
              portraiturl: environment.baseurl + "cms-main/banner_cms/viewimage?filename=" + data['uploadedfile']
            });
            this.imageUploaded = true;
          } else {
            this.showError(data['message']);
            this.imageUploaded = false;
          }
        });

        // upload logic here
      } else {
        alert(`Sorry, this image doesn't look like the size we wanted. It's 
       ${img.width} x ${img.height} but we require 1080 x 1350 size image.`);
      }
    }

  }

  UploadVideo(event) {


    let img = new Image()
    img.src = window.URL.createObjectURL(event.target.files[0])
    img.onload = () => {
      if (img.width >= 1080 || img.width <= 1200 && img.height >= 512 || img.height <= 630) {
        alert(`Nice, image is the right size. It can be uploaded`)

        this.adminService.uploadBannerCms(event.target.files[0]).subscribe(async data => {
          if (data['success']) {
            this.showSuccess(data['message']);
            this.videourl = await environment.baseurl + "cms-main/banner_cms/viewimage?filename=" + data['uploadedfile'];
            this.addBannerForm.patchValue({
              videourl: environment.baseurl + "cms-main/banner_cms/viewimage?filename=" + data['uploadedfile']
            });
            this.imageUploaded = true;
          } else {
            this.showError(data['message']);
            this.imageUploaded = false;
          }
        });

        // upload logic here
      } else {
        alert(`Sorry, this image doesn't look like the size we wanted. It's 
       ${img.width} x ${img.height} but we require 100 x 100 size image.`);
      }
    }

  }


  addBanner() {
    console.log(this.addBannerForm.value);

    if (this.addBannerForm.valid && this.addBannerForm.controls.title.value.trim() != ""
      && this.addBannerForm.controls.content.value.trim() != "") {
      this.adminService.createBanner(this.addBannerForm.value).subscribe(data => {
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


  onOptionsSelected(selectedVal: any) {


    if (selectedVal == 'image') {

      $("#image").css('display', 'block');
      $("#video").css('display', 'none');
    }
    else if (selectedVal == 'video') {
      $("#image").css('display', 'none');
      $("#video").css('display', 'block');
    }
  }

  editBanner(data) {
    if (data != null) {
      this.addBannerForm.patchValue({
        id: data.id,
        title: data.title,
        content: data.content,
        image: data.image,
        status: data.status,
        filetype: data.filetype,
        landscapeurl: data.landscapeurl,
        portraiturl: data.portraiturl,
        videourl: data.videourl,
        created_at: data.created_at,
        created_by: data.created_by,
        modified_at: data.modified_at,
        modified_by: data.modified_by,

      });
      console.log('some');

      this.landscapeurl = data.landscapeurl;
      this.portraiturl = data.portraiturl;
      this.videourl = data.videourl;



      this.imageUploaded = true;
      $('.addBanner').modal('show');
      this.selectedData_ID = data.id;
      this.addmode = false;
      this.editmode = true;
      this.deletemode = false;
      this.listmode = false;
    } else {
      this.showWarning("Please Select a Record");
    }


  }



  updateBanner() {
    this.dataLoaded = false;
    if (this.addBannerForm.valid && this.addBannerForm.controls.title.value.trim() != ""
      && this.addBannerForm.controls.content.value.trim() != "") {
      this.adminService.updateBanner(this.addBannerForm.value).subscribe(data => {
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
    $('.addBanner').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.imageUploaded = true;
    this.landscapeurl = null;
    this.portraiturl = null;
    this.videourl = null;


    this.onPageReload();
    this.router.navigateByUrl('admin/cms-banner')
  }

  onPageReload() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };
    this.adminService.getBannerList().subscribe(async data => {
      if (data['success']) {
        this.BannerList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.BannerList = [];
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
