// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-add-usefull-links',
  templateUrl: './admin-add-usefull-links.component.html',
  styleUrls: ['./admin-add-usefull-links.component.scss']
})
export class AdminAddUsefullLinksComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  UsefullLinksList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addUsefullLinksForm: FormGroup;
  deletemode: boolean;
  imageUploaded: boolean;
  UsefullLinksUrl: string;
  type: string;
  id: any;
  viewmode: boolean = false;

  constructor(private adminService: AdminModuleService, private router: Router, private _Activatedroute: ActivatedRoute,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addUsefullLinksForm = this.formBuilder.group({
      id: [''],
      link: ['', Validators.required],
      label: ['', [Validators.required]],
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
        this.adminService.getUsefullLinksInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addUsefullLinksForm.patchValue({
              id: data['data'].id,
              link: data['data'].link,
              label: data['data'].label,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.UsefullLinksUrl = data['data'].icon;
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

        this.adminService.getUsefullLinksInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addUsefullLinksForm.patchValue({
              id: data['data'].id,
              link: data['data'].link,
              label: data['data'].label,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            //this.featuresUrl = data['data'].icon;
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
        this.addUsefullLinksForm.disable();
        this.adminService.getUsefullLinksInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addUsefullLinksForm.patchValue({
              id: data['data'].id,
              link: data['data'].link,
              label: data['data'].label,
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

  addUsefullLinks() {
    if (this.addUsefullLinksForm.valid && this.addUsefullLinksForm.controls.link.value.trim() != ""
      && this.addUsefullLinksForm.controls.label.value.trim() != "") {
      this.adminService.createUsefullLinks(this.addUsefullLinksForm.value).subscribe(data => {
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


  editUsefullLinks(data) {
    if (data != null) {
      this.addUsefullLinksForm.patchValue({
        id: data.id,
        link: data.link,
        label: data.label,
        status: data.status,
        created_at: data.created_at,
        created_by: data.created_by,
        modified_at: data.modified_at,
        modified_by: data.modified_by,
      });
      this.UsefullLinksUrl = data.icon;
      this.imageUploaded = true;
      $('.addUsefullLinks').modal('show');
      this.selectedData_ID = data.id;
      this.addmode = false;
      this.editmode = true;
      this.deletemode = false;
      this.listmode = false;
    } else {
      this.showWarning("Please Select a Record");
    }
  }


  updateUsefullLinks() {
    this.dataLoaded = false;
    if (this.addUsefullLinksForm.valid && this.addUsefullLinksForm.controls.link.value.trim() != ""
      && this.addUsefullLinksForm.controls.label.value.trim() != "") {
      this.adminService.updateUsefullLinks(this.addUsefullLinksForm.value).subscribe(data => {
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
    $('.addUsefullLinks').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.imageUploaded = true;
    this.UsefullLinksUrl = null;
    this.onPageReload();
    this.router.navigateByUrl('admin/cms-usefull-links');
  }

  onPageReload() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };
    this.adminService.getUsefullLinksList().subscribe(async data => {
      if (data['success']) {
        this.UsefullLinksList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.UsefullLinksList = [];
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
