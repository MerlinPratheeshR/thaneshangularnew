// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-add-admin-order-status',
  templateUrl: './add-admin-order-status.component.html',
  styleUrls: ['./add-admin-order-status.component.scss']
})
export class AddAdminOrderStatusComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  OrderStatusList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addOrderStatusForm: FormGroup;
  deletemode: boolean;
  imageUploaded: boolean;
  OrderStatusUrl: string;
  type: string;
  id: any;
  viewmode: boolean = false;
  private special_char: RegExp = new RegExp("^[a-zA-Z0-9,-. ]*$");

  constructor(private adminService: AdminModuleService, private router: Router, private _Activatedroute: ActivatedRoute,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addOrderStatusForm = this.formBuilder.group({
      order_status_id: [''],
      order_status_name: ['', [Validators.required, Validators.pattern(this.special_char)]],
      remarks: ['', [Validators.required, Validators.pattern(this.special_char)]],
      status: ['true', Validators.required],
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
        this.adminService.geOrderStatusInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addOrderStatusForm.patchValue({
              order_status_id: data['data'].order_status_id,
              order_status_name: data['data'].order_status_name,
              remarks: data['data'].remarks,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            this.OrderStatusUrl = data['data'].icon;
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

        this.adminService.geOrderStatusInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addOrderStatusForm.patchValue({
              order_status_id: data['data'].order_status_id,
              order_status_name: data['data'].order_status_name,
              remarks: data['data'].remarks,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            //this.featuresUrl = data['data'].icon;
            //this.imageUploaded = true;
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
        this.addOrderStatusForm.disable();
        this.adminService.geOrderStatusInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addOrderStatusForm.patchValue({
              order_status_id: data['data'].order_status_id,
              order_status_name: data['data'].order_status_name,
              remarks: data['data'].remarks,
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

  addOrderStatus() {
    if (this.addOrderStatusForm.valid &&
      this.addOrderStatusForm.controls.order_status_name.value.trim() != ""
      && this.addOrderStatusForm.controls.remarks.value.trim() != "") {
      this.adminService.createOrderStatus(this.addOrderStatusForm.value).subscribe(data => {
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



  updateOrderStatus() {
    this.dataLoaded = false;
    if (this.addOrderStatusForm.valid &&
      this.addOrderStatusForm.controls.order_status_name.value.trim() != ""
      && this.addOrderStatusForm.controls.remarks.value.trim() != "") {
      this.adminService.updateOrderStatus(this.addOrderStatusForm.value).subscribe(data => {
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
    $('#deleteModal').modal('hide');
    $('.addOrderStatus').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.imageUploaded = true;
    this.OrderStatusUrl = null;
    this.onPageReload();
    this.router.navigateByUrl('admin/status-management/order')
  }

  onPageReload() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };
    this.adminService.getOrderStatusList().subscribe(async data => {
      if (data['success']) {
        this.OrderStatusList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.OrderStatusList = [];
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
