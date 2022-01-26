// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cms-info',
  templateUrl: './cms-info.component.html',
  styleUrls: ['./cms-info.component.scss']
})
export class CmsInfoComponent implements OnInit {
  infoForm: FormGroup;
  logoUrl: string;
  imageUploaded: boolean;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
      { class: 'poppins', name: 'Poppins' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'environment.baseurl+"cms-main/file"',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  footer_image1: any;
  footer_image2: any;
  footer_image3: any;
  dynamics_image: any;
  imageUploaded_SSL: boolean;
  imageUploadedMasterCard: boolean;
  imageERPUploaded: boolean;
  imageVisaUploaded: boolean;

  constructor(private formBuilder: FormBuilder, private adminService: AdminModuleService, private toastr: ToastrManager) {
    this.infoForm = this.formBuilder.group({
      id: [''],
      email: ['', [Validators.required, Validators.email]],
      //  contact:['',Validators.compose([Validators.required])],
      contact: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      created_at: [''],
      company_name: ['', Validators.required],
      playstore_link: ['', Validators.required],
      applestore_link: ['', Validators.required],
      description: [''],
      logo: [''],
      footer_image1: [''],
      footer_image2: [''],
      footer_image3: [''],
      dynamics_image: [''],
      copyrights: ['', Validators.required],
      modified_at: [''],
      created_by: [''],
      modified_by: ['']
    })
  }

  ngOnInit(): void {
    this.adminService.getInfoCmsInfo(1).subscribe(data => {
      if (data['success']) {
        this.infoForm.patchValue({
          id: data['data'].id,
          email: data['data'].email,
          company_name: data['data'].company_name,
          description: data['data'].description,
          contact: data['data'].contact,
          playstore_link: data['data'].playstore_link,
          applestore_link: data['data'].applestore_link,
          logo: data['data'].logo,
          footer_image1: data['data'].footer_image1,
          footer_image2: data['data'].footer_image2,
          footer_image3: data['data'].footer_image3,
          dynamics_image: data['data'].dynamics_image,
          copyrights: data['data'].copyrights,
          created_at: data['data'].created_at,
          modified_at: data['data'].modified_at,
          created_by: data['data'].created_by,
          modified_by: data['data'].modified_by
        });
        this.logoUrl = data['data'].logo;
        this.footer_image1 = data['data'].footer_image1;
        this.footer_image2 = data['data'].footer_image2;
        this.footer_image3 = data['data'].footer_image3;
        this.dynamics_image = data['data'].dynamics_image;
        if (this.logoUrl == undefined || this.logoUrl == null) {
          this.imageUploaded = false;
        } else {
          this.imageUploaded = true;
        }
      } else {
        this.imageUploaded = false;
      }
    });
  }



  UploadLogo(event) {
    this.imageUploaded = false;
    this.adminService.uploadLogoCms(event.target.files[0]).subscribe(data => {
      if (data['success']) {
        console.log('som', data);

        this.showSuccess(data['message']);
        this.logoUrl = environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile'];
        this.infoForm.patchValue({
          logo: environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile']
        });
        this.imageUploaded = true;
      } else {
        this.showError(data['message']);
        this.imageUploaded = false;
      }
    });
  }

  UploadSSLImg1(event) {
    this.imageUploaded_SSL = false;
    this.adminService.UploadSSLImg(event.target.files[0]).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['message']);
        this.footer_image1 = environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile'];
        this.infoForm.patchValue({
          footer_image1: environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile']
        });
        this.imageUploaded_SSL = true;
      } else {
        this.showError(data['message']);
        this.imageUploaded_SSL = false;
      }
    });
  }


  UploadMasterCard(event) {
    this.imageUploadedMasterCard = false;
    this.adminService.UploadMasterCard(event.target.files[0]).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['message']);
        this.footer_image2 = environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile'];
        this.infoForm.patchValue({
          footer_image2: environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile']
        });
        this.imageUploadedMasterCard = true;
      } else {
        this.showError(data['message']);
        this.imageUploadedMasterCard = false;
      }
    });
  }


  UploadVisaImg(event) {
    this.imageVisaUploaded = false;
    this.adminService.UploadVisaImg(event.target.files[0]).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['message']);
        this.footer_image3 = environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile'];
        this.infoForm.patchValue({
          footer_image3: environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile']
        });
        this.imageVisaUploaded = true;
      } else {
        this.showError(data['message']);
        this.imageVisaUploaded = false;
      }
    });
  }


  UploadERPImg(event) {
    this.imageERPUploaded = false;
    this.adminService.UploadERPImg(event.target.files[0]).subscribe(data => {
      if (data['success']) {
        console.log(data);

        this.showSuccess(data['message']);
        this.dynamics_image = environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile'];
        this.infoForm.patchValue({
          dynamics_image: environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile']
        });
        this.imageERPUploaded = true;
      } else {
        this.showError(data['message']);
        this.imageERPUploaded = false;
      }
    });
  }


  updateInfo() {
    if (this.infoForm.valid) {
      this.adminService.updateInfoCms(this.infoForm.value).subscribe(data => {
        if (data['success']) {
          this.showSuccess(data['msg']);
          this.onPageReload();
        } else {
          this.showError(data['msg']);
        }
      });
    } else {
      this.showWarning("Form not Valid");
    }
  }

  onPageReload() {
    this.adminService.getInfoCmsInfo(1).subscribe(data => {
      if (data['success']) {
        this.infoForm.patchValue({
          id: data['data'].id,
          email: data['data'].email,
          company_name: data['data'].company_name,
          description: data['data'].description,
          contact: data['data'].contact,
          playstore_link: data['data'].playstore_link,
          applestore_link: data['data'].applestore_link,
          logo: data['data'].logo,
          footer_image1: data['data'].footer_image1,
          footer_image2: data['data'].footer_image2,
          footer_image3: data['data'].footer_image3,
          dynamics_image: data['data'].dynamics_image,
          copyrights: data['data'].copyrights,
          created_at: data['data'].created_at,
          modified_at: data['data'].modified_at,
          created_by: data['data'].created_by,
          modified_by: data['data'].modified_by
        });
        this.logoUrl = data['data'].logo;
        this.footer_image1 = data['data'].footer_image1;
        this.footer_image2 = data['data'].footer_image2;
        this.footer_image3 = data['data'].footer_image3;
        this.dynamics_image = data['data'].dynamics_image;
        if (this.logoUrl == undefined || this.logoUrl == null) {
          this.imageUploaded = false;
        } else {
          this.imageUploaded = true;
        }
      } else {

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
