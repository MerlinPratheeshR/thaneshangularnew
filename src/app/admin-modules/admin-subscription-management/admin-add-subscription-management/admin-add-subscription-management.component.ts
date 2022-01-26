// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-add-subscription-management',
  templateUrl: './admin-add-subscription-management.component.html',
  styleUrls: ['./admin-add-subscription-management.component.scss']
})
export class AdminAddSubscriptionManagementComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  SubscriptionPlanList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addSubscriptionPlanForm: FormGroup;
  deletemode: boolean;
  imageUploaded: boolean;
  SubscriptionPlanUrl: string;
  type: string;
  id: any;
  ModulesList = [
    { id: 1, name: "Module 1", status: 'Active' },
    { id: 2, name: "Module 2", status: 'Active' },
    { id: 3, name: "Module 3", status: 'Active' },
    { id: 4, name: "Module 4", status: 'Active' },
    { id: 5, name: "Module 5", status: 'Active' }
  ]

  constructor(private adminService: AdminModuleService, private router: Router, private _Activatedroute: ActivatedRoute,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addSubscriptionPlanForm = this.formBuilder.group({
      id: [''],
      subscription_name: ['', Validators.required],
      number_of_users: ['', Validators.required],
      modules_list: ['', Validators.required],
      days: ['', Validators.required],
      price: ['', Validators.required],
      valid_till: ['', Validators.required],
      effective: ['', Validators.required],
      status: ['', Validators.required],
      action: [''],
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
        this.adminService.getSubscriptionPlanInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addSubscriptionPlanForm.patchValue({
              shipment_status_id: data['data'].shipment_status_id,
              shipment_status_name: data['data'].shipment_status_name,
              remarks: data['data'].remarks,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.SubscriptionPlanUrl = data['data'].icon;
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
      } else {
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

  addSubscriptionPlan() {
    this.adminService.createSubscriptionPlan(this.addSubscriptionPlanForm.value).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['msg']);
        this.cancel();
      } else {
        this.showError(data['msg']);
      }
    })
  }



  updateSubscriptionPlan() {
    this.dataLoaded = false;
    this.adminService.updateSubscriptionPlan(this.addSubscriptionPlanForm.value).subscribe(data => {
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
    $('.addSubscriptionPlan').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.imageUploaded = true;
    this.SubscriptionPlanUrl = null;
    this.onPageReload();
    this.router.navigateByUrl('admin/subscription-management')
  }

  onPageReload() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };
    this.adminService.getSubscriptionPlanList().subscribe(async data => {
      if (data['success']) {
        this.SubscriptionPlanList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.SubscriptionPlanList = [];
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
