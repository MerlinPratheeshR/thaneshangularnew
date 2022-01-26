// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-add-subscription-plan',
  templateUrl: './admin-add-subscription-plan.component.html',
  styleUrls: ['./admin-add-subscription-plan.component.scss']
})
export class AdminAddSubscriptionPlanComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  SubscriptionPlanList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  deletemode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addSubscriptionPlanForm: FormGroup;
  id: string;
  type: string;
  viewmode: boolean = false;
  private special_char: RegExp = new RegExp("^[a-zA-Z0-9,-. ]*$");

  constructor(private adminService: AdminModuleService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addSubscriptionPlanForm = this.formBuilder.group({
      id: [''],
      subscription_name: ['', [Validators.required, Validators.pattern(this.special_char)]],
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
        this.adminService.getSubscriptionPlanInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addSubscriptionPlanForm.patchValue({
              id: data['data'].id,
              subscription_name: data['data'].subscription_name,
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

        this.adminService.getSubscriptionPlanInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addSubscriptionPlanForm.patchValue({
              id: data['data'].id,
              subscription_name: data['data'].subscription_name,
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
        this.addSubscriptionPlanForm.disable();
        this.adminService.getSubscriptionPlanInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addSubscriptionPlanForm.patchValue({
              id: data['data'].id,
              subscription_name: data['data'].subscription_name,
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


  addSubscriptionPlan() {
    if (this.addSubscriptionPlanForm.valid && this.addSubscriptionPlanForm.controls.subscription_name.value.trim() != "") {
      this.adminService.createSubscriptionPlan(this.addSubscriptionPlanForm.value).subscribe(data => {
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

  updateSubscriptionPlan() {
    this.dataLoaded = false;
    if (this.addSubscriptionPlanForm.valid && this.addSubscriptionPlanForm.controls.subscription_name.value.trim() != "") {
      this.adminService.updateSubscriptionPlan(this.addSubscriptionPlanForm.value).subscribe(data => {
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
    this.router.navigateByUrl('admin/subscription-plan-management')
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
