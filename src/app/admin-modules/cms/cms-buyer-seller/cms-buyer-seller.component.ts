// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cms-buyer-seller',
  templateUrl: './cms-buyer-seller.component.html',
  styleUrls: ['./cms-buyer-seller.component.scss']
})
export class CmsBuyerSellerComponent implements OnInit {
  BSForm: FormGroup;
  logoUrl: string;

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
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
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
    uploadUrl: environment.baseurl + "cms-main/file",
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  BuyerUrl: any;
  SellerUrl: any;
  imageUploaded1: boolean;
  imageUploaded2: boolean;

  constructor(private formBuilder: FormBuilder, private adminService: AdminModuleService, private toastr: ToastrManager) {
    this.BSForm = this.formBuilder.group({
      id: [''],
      buyer_title: ['', Validators.required],
      buyer_content: ['', Validators.required],
      buyer_link: ['', Validators.required],
      buyer_image: [''],
      seller_title: ['', Validators.required],
      seller_content: ['', Validators.required],
      seller_link: ['', Validators.required],
      seller_image: [''],
      created_at: [''],
      modified_at: [''],
      created_by: [''],
      modified_by: ['']
    })
  }

  ngOnInit(): void {
    this.adminService.getBuyerSellerCmsInfo(1).subscribe(data => {
      if (data['success']) {
        this.BSForm.patchValue({
          id: data['data'].id,
          buyer_title: data['data'].buyer_title,
          buyer_content: data['data'].buyer_content,
          buyer_link: data['data'].buyer_link,
          buyer_image: data['data'].buyer_image,
          seller_title: data['data'].seller_title,
          seller_content: data['data'].seller_content,
          seller_link: data['data'].seller_link,
          seller_image: data['data'].seller_image,
          created_at: data['data'].created_at,
          modified_at: data['data'].modified_at,
          created_by: data['data'].created_by,
          modified_by: data['data'].modified_by,
        });
        this.BuyerUrl = data['data'].buyer_image;
        this.SellerUrl = data['data'].seller_image;
        if (this.BuyerUrl == undefined || this.BuyerUrl == null) {
          this.imageUploaded1 = false;
        } else {
          this.imageUploaded1 = true;
        }
        if (this.SellerUrl == undefined || this.SellerUrl == null) {
          this.imageUploaded2 = false;
        } else {
          this.imageUploaded2 = true;
        }
      } else {
        this.imageUploaded1 = false;
        this.imageUploaded2 = false;
      }
    });
  }

  UploadBuyerLogo(event) {
    this.imageUploaded1 = false;
    this.adminService.uploadBSCms(event.target.files[0]).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['message']);
        this.BuyerUrl = environment.baseurl + "cms-main/buyer_seller_cms/viewimage?filename=" + data['uploadedfile'];
        this.BSForm.patchValue({
          buyer_image: environment.baseurl + "cms-main/buyer_seller_cms/viewimage?filename=" + data['uploadedfile']
        });
        this.imageUploaded1 = true;
      } else {
        this.showError(data['message']);
        this.imageUploaded1 = false;
      }
    });
  }

  UploadSellerLogo(event) {
    this.imageUploaded2 = false;
    this.adminService.uploadBSCms(event.target.files[0]).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['message']);
        this.SellerUrl = environment.baseurl + "cms-main/buyer_seller_cms/viewimage?filename=" + data['uploadedfile'];
        this.BSForm.patchValue({
          seller_image: environment.baseurl + "cms-main/buyer_seller_cms/viewimage?filename=" + data['uploadedfile']
        });
        this.imageUploaded2 = true;
      } else {
        this.showError(data['message']);
        this.imageUploaded2 = false;
      }
    });
  }


  updateInfo() {
    if (this.BSForm.valid) {
      this.adminService.updateBuyerSellerCms(this.BSForm.value).subscribe(data => {
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
    this.adminService.getBuyerSellerCmsInfo(1).subscribe(data => {
      if (data['success']) {
        this.BSForm.patchValue({
          id: data['data'].id,
          email: data['data'].email,
          contact: data['data'].contact,
          created_at: data['data'].created_at,
          modified_at: data['data'].modified_at,
          created_by: data['data'].created_by,
          modified_by: data['data'].modified_by
        });
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
