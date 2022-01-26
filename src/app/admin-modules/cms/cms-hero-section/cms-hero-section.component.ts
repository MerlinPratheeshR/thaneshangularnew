// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cms-hero-section',
  templateUrl: './cms-hero-section.component.html',
  styleUrls: ['./cms-hero-section.component.scss']
})
export class CmsHeroSectionComponent implements OnInit {
  aboutForm: FormGroup;
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
      { class: 'poppins', name: 'Poppins' },
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
    uploadUrl: 'environment.baseurl+"cms-main/file"',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  constructor(private formBuilder: FormBuilder, private adminService: AdminModuleService, private toastr: ToastrManager) {
    this.aboutForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      sub_title: ['', Validators.required],
      content: ['', Validators.required],
      link: ['', Validators.required],
      created_at: [''],
      modified_at: [''],
      created_by: [''],
      modified_by: ['']
    })
  }

  ngOnInit(): void {
    this.adminService.getabout(1).subscribe(data => {
      if (data['success']) {
        this.aboutForm.patchValue({
          id: data['data'].id,
          title: data['data'].title,
          sub_title: data['data'].sub_title,
          content: data['data'].content,
          link: data['data'].link,
          created_at: data['data'].created_at,
          modified_at: data['data'].modified_at,
          created_by: data['data'].created_by,
          modified_by: data['data'].modified_by
        });
        this.logoUrl = data['data'].logo;
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


  updateabout() {
    if (this.aboutForm.valid) {
      this.adminService.updateabout(this.aboutForm.value).subscribe(data => {
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
    this.adminService.getabout(1).subscribe(data => {
      if (data['success']) {
        this.aboutForm.patchValue({
          id: data['data'].id,
          title: data['data'].title,
          sub_title: data['data'].sub_title,
          content: data['data'].content,
          link: data['data'].link,
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
