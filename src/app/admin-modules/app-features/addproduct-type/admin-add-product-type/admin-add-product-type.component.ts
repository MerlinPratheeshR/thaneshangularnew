// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-add-product-type',
  templateUrl: './admin-add-product-type.component.html',
  styleUrls: ['./admin-add-product-type.component.scss']
})
export class AdminAddProductTypeComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  ProductTypeList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  deletemode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addProductTypeForm: FormGroup;
  id: string;
  type: string;
  viewmode: boolean = false;
  private special_char: RegExp = new RegExp("^[a-zA-Z0-9,-. ]*$");

  constructor(private adminService: AdminModuleService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addProductTypeForm = this.formBuilder.group({
      id: [''],
      product_type_name: ['', [Validators.required, Validators.pattern(this.special_char)]],
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
    this.deletemode = false;

    this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
      this.type = params.get('type');
      if (this.type == 'update') {
        this.dataLoaded = true;
        this.addmode = false;
        this.editmode = true;
        this.deletemode = false;
        this.adminService.getProductTypeInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addProductTypeForm.patchValue({
              id: data['data'].id,
              product_type_name: data['data'].product_type_name,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            $('.addBanner').modal('show');
            this.selectedData_ID = data['data'].id;
            this.addmode = false;
            this.editmode = true;
            this.deletemode = false;
            this.listmode = false;
          }


        })
      }
      else if (this.type == 'clone') {

        this.adminService.getProductTypeInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addProductTypeForm.patchValue({
              id: data['data'].id,
              product_type_name: data['data'].product_type_name,
              status: data['data'].status,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by,
            });
            // this.featuresUrl = data['data'].icon;
            // this.imageUploaded = true;
            $('.addBanner').modal('show');
            this.selectedData_ID = data['data'].id;
            this.addmode = true;
            this.editmode = false;
            this.deletemode = false;
            this.listmode = false;
          }
        });
      }

      else if (this.type == 'view') {
        this.viewmode = true;
        this.editmode = false;
        this.addmode = false;
        this.addProductTypeForm.disable();
        this.adminService.getProductTypeInfo(this.id).subscribe(data => {
          if (data['success']) {
            this.addProductTypeForm.patchValue({
              id: data['data'].id,
              product_type_name: data['data'].product_type_name,
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
        this.deletemode = false;
      }
    });
  }

  getselected(event, i) {
    console.log(i);
  }

  getallselected(event) {

  }


  addProductType() {
    if (this.addProductTypeForm.valid && this.addProductTypeForm.controls.product_type_name.value.trim() != "") {
      this.adminService.createProductType(this.addProductTypeForm.value).subscribe(data => {
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


  validate(id) {
    if (id != null) {
      $('#deleteModal').modal('show');
      this.selectedData_ID = id;
      this.addmode = false;
      this.editmode = false;
      this.deletemode = true;
      this.listmode = false;
    } else {
      this.showWarning("Please Select a Record");
    }
  }



  editProductType(data) {
    if (data != null) {
      this.addProductTypeForm.patchValue({
        id: data.id,
        ProductType_name: data.ProductType_name,
        created_at: data.created_at,
        created_by: data.created_by,
        modified_at: data.modified_at,
        modified_by: data.modified_by,
      });
      $('.addProductType').modal('show');
      this.selectedData_ID = data.id;
      this.addmode = false;
      this.editmode = true;
      this.deletemode = false;
      this.listmode = false;
    } else {
      this.showWarning("Please Select a Record");
    }
  }


  deleteProductType() {
    this.dataLoaded = false;
    this.adminService.deleteProductType(this.selectedData_ID).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['msg']);
        this.cancel();
        this.selectedData_ID = null;
      } else {
        this.showError(data['msg']);
      }
    });
  }

  updateProductType() {
    this.dataLoaded = false;
    if (this.addProductTypeForm.valid && this.addProductTypeForm.controls.product_type_name.value.trim() != "") {
      this.adminService.updateProductType(this.addProductTypeForm.value).subscribe(data => {
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
    $('.addProductType').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.onPageReload();
    this.router.navigateByUrl('admin/product-type-management')
  }

  onPageReload() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };
    this.adminService.getProductTypeList().subscribe(async data => {
      if (data['success']) {
        this.ProductTypeList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.ProductTypeList = [];
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
