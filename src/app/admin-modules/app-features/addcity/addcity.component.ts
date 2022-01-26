// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrls: ['./addcity.component.scss']
})
export class AddcityComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  CityList: any;
  dataLoaded: boolean;
  addmode: boolean;
  editmode: boolean;
  listmode: boolean;
  selectedData_ID: any;
  addCityForm: FormGroup;
  countryList: any;
  stateList: any[];
  stateList_dup: any[];
  deletemode: boolean;

  state_name = '';
  country_name = '';

  constructor(private adminService: AdminModuleService,
    private toastr: ToastrManager,
    private formBuilder: FormBuilder) {
    this.addCityForm = this.formBuilder.group({
      id: [''],
      city_name: ['', Validators.required],
      state_id: ['', Validators.required],
      country_id: ['', Validators.required],
      created_at: ['', Validators.required],
      created_by: ['', Validators.required],
      modified_at: ['', Validators.required],
      modified_by: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };

    this.adminService.getCountryList().subscribe(async data => {
      if (data['success']) {
        this.countryList = await data['data'];
      } else {
        this.countryList = [];
      }
    });

    this.adminService.getStateList().subscribe(async data => {
      if (data['success']) {
        this.stateList = await data['data'];
      } else {
        this.stateList = [];
      }
    });

    this.adminService.getCityList().subscribe(async data => {
      if (data['success']) {
        this.CityList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.CityList = [];
      }
    });
  }

  getselected(event, i) {
    console.log(i);
  }

  getallselected(event) {

  }


  selectOption(data) {
    console.log(data);
    this.stateList_dup = [];
    this.adminService.getState_list(data).subscribe(async data => {
      if (data['success']) {
        this.stateList_dup = await data['data'];
      } else {
        this.stateList_dup = [];
      }
      console.log(data);
    });


  }


  addCity() {
    this.adminService.createCity(this.addCityForm.value).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['msg']);
        this.cancel();
      } else {
        this.showError(data['msg']);
      }
    })
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



  editCity(data) {
    if (data != null) {
      this.addCityForm.patchValue({
        id: data.id,
        city_name: data.city_name,
        state_id: data.state_id,
        country_id: data.country_id,
        created_at: data.created_at,
        created_by: data.created_by,
        modified_at: data.modified_at,
        modified_by: data.modified_by,
      });
      $('.addCity').modal('show');
      this.selectedData_ID = data.id;
      this.addmode = false;
      this.editmode = true;
      this.deletemode = false;
      this.listmode = false;
    } else {
      this.showWarning("Please Select a Record");
    }
  }


  deleteCity() {
    this.dataLoaded = false;
    this.adminService.deleteCity(this.selectedData_ID).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['msg']);
        this.cancel();
        this.selectedData_ID = null;
      } else {
        this.showError(data['msg']);
      }
    });
  }

  updateCity() {
    this.dataLoaded = false;
    this.adminService.updateCity(this.addCityForm.value).subscribe(data => {
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
    $('.addCity').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.onPageReload();
  }

  onPageReload() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering: true,
      lengthMenu: [5, 10, 25, 50, 100]
    };
    this.adminService.getCityList().subscribe(async data => {
      if (data['success']) {
        this.CityList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.CityList = [];
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
