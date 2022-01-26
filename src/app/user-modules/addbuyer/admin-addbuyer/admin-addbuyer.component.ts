// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import { BuyersService } from 'src/app/buyers.service';
import { environment } from 'src/environments/environment.prod';
import Stepper from 'bs-stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-admin-addbuyer',
  templateUrl: './admin-addbuyer.component.html',
  styleUrls: ['./admin-addbuyer.component.scss']
})
export class AdminAddbuyerComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  addmode: boolean;
  editmode: boolean;
  listmode: boolean;
  BuyersForm: FormGroup;
  Hubs: any;
  Districts: any;
  hubsFilter: any = { hubname: '' };
  Sellers: any;
  countryList: any;
  fileUploaded: boolean = true;
  form1: boolean = false;
  form2: boolean = false;
  logoUrl: string;
  imageERPUploaded: boolean;
  companyLogoUploaded: boolean;
  infoForm: any;
  business_com_logo: string;

  id_doc_front_side: string;
  id_doc_back_side: string;
  bus_doc_license: string;
  bank_browse_file: string;
  vat_r_certificate: string;
  selectedData_ID: any;
  id: string;
  type: string;
  checkboxGroup: FormGroup;
  paymentModeGroup: FormGroup;
  submittedValue: any;
  subscription: Subscription;
  dataLoaded: boolean;
  deletemode: boolean;
  viewmode: boolean;
  stateList: any[];
  CurrencyList: any;
  private special_char: RegExp = new RegExp("^[a-zA-Z0-9,-. ]*$");
  submitted: boolean;
  RegistrationStatusList: any;
  ReasonList: any;
  ProductTypeList: any;
  TradingTypeList: any;
  newbyerId: any;
  EmailIdStatus: any;

  payment_mode = [{
    name: 'paymentmode 1',
    value: 'value-1'
  }, {
    name: 'paymentmode 2',
    value: 'value-2'
  }, {
    name: 'paymentmode 3',
    value: 'value-3'
  },
  {
    name: 'paymentmode 4',
    value: 'value-4'
  }, {
    name: 'paymentmode 5',
    value: 'value-5'
  }];

  constructor(private formBuilder: FormBuilder, private router: Router, private _Activatedroute: ActivatedRoute, private adminService: AdminModuleService, private BuyersService: BuyersService,
    private toastr: ToastrManager) {


    this.BuyersForm = this.formBuilder.group({

      id: [''],
      iv_license: [false, Validators.requiredTrue],
      iv_country: ['', Validators.required],
      iv_company_id: [''],
      iv_national: ['', Validators.required],
      iv_exp_date: ['', Validators.required],
      iv_country_issue: ['', Validators.required],
      iv_f_name: ['', [Validators.required, Validators.pattern(this.special_char)]],
      iv_m_name: ['', [Validators.required, Validators.pattern(this.special_char)]],
      iv_l_name: ['', [Validators.required, Validators.pattern(this.special_char)]],
      iv_dob: ['', Validators.required],
      iv_r_bussiness_name: ['', [Validators.required, Validators.pattern(this.special_char)]],
      iv_licenese_no: ['', [Validators.required, Validators.pattern(this.special_char)]],
      iv_r_address: ['', [Validators.required, Validators.pattern(this.special_char)]],
      business_multiple_branch: ['', Validators.required],
      business_name: ['', [Validators.required, Validators.pattern(this.special_char)]],
      login_id: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      status: ['', Validators.required],
      business_com_logo: ['', Validators.required],
      id_doc_front_side: ['', Validators.required],
      id_doc_back_side: ['', Validators.required],
      bus_doc_license: ['', Validators.required],
      bus_doc_r_status: ['', Validators.required],
      bus_doc_fail_reason: ['', Validators.required],

      billing_country: ['', Validators.required],
      billing_state: ['', Validators.required],
      billing_city: ['', [Validators.required, Validators.pattern(this.special_char)]],
      billing_branch_address: ['', [Validators.required, Validators.pattern(this.special_char)]],
      billing_branch_pincode: ['', Validators.required],
      billing_branch_geolocation: ['', Validators.required],
      b_address1: ['', [Validators.required, Validators.pattern(this.special_char)]],
      b_address2: ['', [Validators.required, Validators.pattern(this.special_char)]],
      b_displayname: ['', [Validators.required, Validators.pattern(this.special_char)]],
      b_phonenumber: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      b_country_code: ['', Validators.required],
      pickup_address: ['', [Validators.required, Validators.pattern(this.special_char)]],
      pickup_address_googlemap: ['ff'],
      shipping_country: ['', Validators.required],
      shipping_state: ['', Validators.required],
      shipping_city: ['', [Validators.required, Validators.pattern(this.special_char)]],
      s_address1: ['', [Validators.required, Validators.pattern(this.special_char)]],
      s_address2: ['', [Validators.required, Validators.pattern(this.special_char)]],
      s_display_name: ['', [Validators.required, Validators.pattern(this.special_char)]],
      s_phone_number: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      s_country_code: ['', Validators.required],
      s_phoneno_verified: ['', Validators.required],

      bank_benefi_name: ['', [Validators.required, Validators.pattern(this.special_char)]],
      bank_name: ['', [Validators.required, Validators.pattern(this.special_char)]],
      bank_ac_no: ['', Validators.required],
      back_iban: ['', Validators.required],
      swift_code: ['', Validators.required],
      bank_currency: ['', Validators.required],
      bank_browse_file: ['', Validators.required],
      payment_mode: this.formBuilder.array(this.payment_mode.map(x => false)),
      vat_tax_registration_number: ['', Validators.required],
      vat_r_certificate: ['', Validators.required],

      wh_country: ['', Validators.required],
      wh_state: ['', Validators.required],
      wh_city: ['', [Validators.required, Validators.pattern(this.special_char)]],
      wh_addressline1: ['', [Validators.required, Validators.pattern(this.special_char)]],
      wh_addressline2: ['', [Validators.required, Validators.pattern(this.special_char)]],
      wh_display_name: ['', [Validators.required, Validators.pattern(this.special_char)]],
      wh_phone_number: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      wh_country_code: ['', Validators.required],
      wh_address_line: ['', Validators.required],
      wh_phonenumber_verified: ['', Validators.required],
      wh_pickaddress: ['f'],
      product_type: ['', Validators.required],
      trading_type: ['', Validators.required],
    });

  }

  private stepper: Stepper;
  next1() {
    console.log(this.BuyersForm.value);
    this.stepper.next();
    this.submitted = false;

  }




  onSubmit() {
    console.log(this.BuyersForm.value);
    return false;
  }

  ngOnInit(): void {


    this.paymentModeGroup = this.formBuilder.group({
      payment_mode: this.formBuilder.array(this.payment_mode.map(x => false))
    });
    const paymentModeControl = (this.paymentModeGroup.controls.payment_mode as FormArray);
    this.subscription = paymentModeControl.valueChanges.subscribe(checkbox => {
      paymentModeControl.setValue(
        paymentModeControl.value.map((value, i) => value ? this.payment_mode[i].value : false),
        { emitEvent: false }
      );
    });


    this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
      this.type = params.get('type');
      if (this.type == 'update') {
        this.dataLoaded = true;
        this.fileUploaded = false;
        this.addmode = false;
        this.viewmode = false;
        this.editmode = true;
        this.deletemode = false;
        this.BuyersService.detailsBuyers(this.id).subscribe(data => {
          console.log(data);
          if (data['success']) {
            this.BuyersForm.patchValue({
              id: data['data'].id,
              iv_country: data['data'].iv_country,
              iv_license: data['data'].iv_license,
              iv_company_id: data['data'].iv_company_id,
              iv_national: data['data'].iv_national,
              iv_exp_date: this.formatDate(data['data'].iv_exp_date),
              iv_country_issue: data['data'].iv_country_issue,
              iv_f_name: data['data'].iv_f_name,
              iv_m_name: data['data'].iv_m_name,
              iv_l_name: data['data'].iv_l_name,
              iv_dob: this.formatDate(data['data'].iv_dob),
              iv_r_bussiness_name: data['data'].iv_r_bussiness_name,
              iv_licenese_no: data['data'].iv_licenese_no,
              iv_r_address: data['data'].iv_r_address,
              business_multiple_branch: data['data'].business_multiple_branch,
              business_name: data['data'].business_name,
              login_id: data['data'].login_id,
              status: data['data'].status,
              business_com_logo: data['data'].business_com_logo,
              id_doc_front_side: data['data'].id_doc_front_side,
              id_doc_back_side: data['data'].id_doc_back_side,
              bus_doc_license: data['data'].bus_doc_license,
              bus_doc_r_status: data['data'].bus_doc_r_status,
              bus_doc_fail_reason: data['data'].bus_doc_fail_reason,
              billing_country: data['data'].billing_country,
              billing_state: data['data'].billing_state,
              billing_city: data['data'].billing_city,
              billing_branch_address: data['data'].billing_branch_address,
              billing_branch_pincode: data['data'].billing_branch_pincode,
              billing_branch_geolocation: data['data'].billing_branch_geolocation,
              b_address1: data['data'].b_address1,
              b_address2: data['data'].b_address2,
              b_displayname: data['data'].b_displayname,
              b_phonenumber: data['data'].b_phonenumber,
              b_country_code: data['data'].b_country_code,
              pickup_address: data['data'].pickup_address,
              pickup_address_googlemap: ['ff'],
              shipping_country: data['data'].shipping_country,
              shipping_state: data['data'].shipping_state,
              shipping_city: data['data'].shipping_city,
              s_address1: data['data'].s_address1,
              s_address2: data['data'].s_address2,
              s_display_name: data['data'].s_display_name,
              s_phone_number: data['data'].s_phone_number,
              s_country_code: data['data'].s_country_code,
              s_phoneno_verified: data['data'].s_phoneno_verified,
              bank_benefi_name: data['data'].bank_benefi_name,
              bank_name: data['data'].bank_name,
              bank_ac_no: data['data'].bank_ac_no,
              back_iban: data['data'].back_iban,
              swift_code: data['data'].swift_code,
              bank_currency: data['data'].bank_currency,
              bank_browse_file: data['data'].bank_browse_file,
              payment_mode: data['data'].payment_mode,
              vat_tax_registration_number: data['data'].vat_tax_registration_number,
              vat_r_certificate: data['data'].vat_r_certificate,
              wh_country: data['data'].wh_country,
              wh_state: data['data'].wh_state,
              wh_city: data['data'].wh_city,
              wh_addressline1: data['data'].wh_addressline1,
              wh_addressline2: data['data'].wh_addressline2,
              wh_display_name: data['data'].wh_display_name,
              wh_phone_number: data['data'].wh_phone_number,
              wh_country_code: data['data'].wh_country_code,
              wh_address_line: data['data'].wh_address_line,
              wh_phonenumber_verified: data['data'].wh_phonenumber_verified,
              wh_pickaddress: ['f'],
              product_type: data['data'].product_type,
              trading_type: data['data'].trading_type,
            });
            this.business_com_logo = data['data'].business_com_logo;
            this.bank_browse_file = data['data'].bank_browse_file;
            this.id_doc_front_side = data['data'].id_doc_front_side;
            this.id_doc_back_side = data['data'].id_doc_back_side;
            this.bus_doc_license = data['data'].bus_doc_license;
            this.vat_r_certificate = data['data'].vat_r_certificate
            this.selectedData_ID = data['data'].id;
          } else {

          }
        })
      }

      else if (this.type == 'clone') {
        this.dataLoaded = true;
        this.fileUploaded = false;
        this.addmode = true;
        this.viewmode = false;
        this.editmode = false;
        this.deletemode = false;
        this.BuyersService.detailsBuyers(this.id).subscribe(data => {
          console.log(data);

          if (data['success']) {
            this.BuyersForm.patchValue({
              id: data['data'].id,
              iv_country: data['data'].iv_country,
              iv_license: data['data'].iv_license,
              iv_company_id: data['data'].iv_company_id,
              iv_national: data['data'].iv_national,
              iv_exp_date: this.formatDate(data['data'].iv_exp_date),
              iv_country_issue: data['data'].iv_country_issue,
              iv_f_name: data['data'].iv_f_name,
              iv_m_name: data['data'].iv_m_name,
              iv_l_name: data['data'].iv_l_name,
              iv_dob: this.formatDate(data['data'].iv_dob),
              iv_r_bussiness_name: data['data'].iv_r_bussiness_name,
              iv_licenese_no: data['data'].iv_licenese_no,
              iv_r_address: data['data'].iv_r_address,
              business_multiple_branch: data['data'].business_multiple_branch,
              business_name: data['data'].business_name,
              login_id: data['data'].login_id,
              status: data['data'].status,
              business_com_logo: data['data'].business_com_logo,
              id_doc_front_side: data['data'].id_doc_front_side,
              id_doc_back_side: data['data'].id_doc_back_side,
              bus_doc_license: data['data'].bus_doc_license,
              bus_doc_r_status: data['data'].bus_doc_r_status,
              bus_doc_fail_reason: data['data'].bus_doc_fail_reason,
              billing_country: data['data'].billing_country,
              billing_state: data['data'].billing_state,
              billing_city: data['data'].billing_city,
              billing_branch_address: data['data'].billing_branch_address,
              billing_branch_pincode: data['data'].billing_branch_pincode,
              billing_branch_geolocation: data['data'].billing_branch_geolocation,
              b_address1: data['data'].b_address1,
              b_address2: data['data'].b_address2,
              b_displayname: data['data'].b_displayname,
              b_phonenumber: data['data'].b_phonenumber,
              b_country_code: data['data'].b_country_code,
              pickup_address: data['data'].pickup_address,
              pickup_address_googlemap: ['ff'],
              shipping_country: data['data'].shipping_country,
              shipping_state: data['data'].shipping_state,
              shipping_city: data['data'].shipping_city,
              s_address1: data['data'].s_address1,
              s_address2: data['data'].s_address2,
              s_display_name: data['data'].s_display_name,
              s_phone_number: data['data'].s_phone_number,
              s_country_code: data['data'].s_country_code,
              s_phoneno_verified: data['data'].s_phoneno_verified,
              bank_benefi_name: data['data'].bank_benefi_name,
              bank_name: data['data'].bank_name,
              bank_ac_no: data['data'].bank_ac_no,
              back_iban: data['data'].back_iban,
              swift_code: data['data'].swift_code,
              bank_currency: data['data'].bank_currency,
              bank_browse_file: data['data'].bank_browse_file,
              payment_mode: data['data'].payment_mode,
              vat_tax_registration_number: data['data'].vat_tax_registration_number,
              vat_r_certificate: data['data'].vat_r_certificate,
              wh_country: data['data'].wh_country,
              wh_state: data['data'].wh_state,
              wh_city: data['data'].wh_city,
              wh_addressline1: data['data'].wh_addressline1,
              wh_addressline2: data['data'].wh_addressline2,
              wh_display_name: data['data'].wh_display_name,
              wh_phone_number: data['data'].wh_phone_number,
              wh_country_code: data['data'].wh_country_code,
              wh_address_line: data['data'].wh_address_line,
              wh_phonenumber_verified: data['data'].wh_phonenumber_verified,
              wh_pickaddress: ['f'],
              product_type: data['data'].product_type,
              trading_type: data['data'].trading_type,
            });
            this.business_com_logo = data['data'].business_com_logo;
            this.bank_browse_file = data['data'].bank_browse_file;
            this.id_doc_front_side = data['data'].id_doc_front_side;
            this.id_doc_back_side = data['data'].id_doc_back_side;
            this.bus_doc_license = data['data'].bus_doc_license;
            this.vat_r_certificate = data['data'].vat_r_certificate
            this.selectedData_ID = data['data'].id;

          } else {

          }
        })
      }

      else if (this.type == 'view') {
        this.dataLoaded = true;
        this.fileUploaded = false;
        this.addmode = false;
        this.viewmode = true;
        this.editmode = false;
        this.deletemode = false;
        this.BuyersForm.disable();
        this.BuyersService.detailsBuyers(this.id).subscribe(data => {
          console.log(data);

          if (data['success']) {
            this.BuyersForm.patchValue({
              id: data['data'].id,
              iv_country: data['data'].iv_country,
              iv_license: [data['data'].iv_license],
              iv_company_id: data['data'].iv_company_id,
              iv_national: data['data'].iv_national,
              iv_exp_date: this.formatDate(data['data'].iv_exp_date),
              iv_country_issue: data['data'].iv_country_issue,
              iv_f_name: data['data'].iv_f_name,
              iv_m_name: data['data'].iv_m_name,
              iv_l_name: data['data'].iv_l_name,
              iv_dob: this.formatDate(data['data'].iv_dob),
              iv_r_bussiness_name: data['data'].iv_r_bussiness_name,
              iv_licenese_no: data['data'].iv_licenese_no,
              iv_r_address: data['data'].iv_r_address,
              business_multiple_branch: data['data'].business_multiple_branch,
              business_name: data['data'].business_name,
              login_id: data['data'].login_id,
              status: data['data'].status,
              business_com_logo: data['data'].business_com_logo,
              id_doc_front_side: data['data'].id_doc_front_side,
              id_doc_back_side: data['data'].id_doc_back_side,
              bus_doc_license: data['data'].bus_doc_license,
              bus_doc_r_status: data['data'].bus_doc_r_status,
              bus_doc_fail_reason: data['data'].bus_doc_fail_reason,
              billing_country: data['data'].billing_country,
              billing_state: data['data'].billing_state,
              billing_city: data['data'].billing_city,
              billing_branch_address: data['data'].billing_branch_address,
              billing_branch_pincode: data['data'].billing_branch_pincode,
              billing_branch_geolocation: data['data'].billing_branch_geolocation,
              b_address1: data['data'].b_address1,
              b_address2: data['data'].b_address2,
              b_displayname: data['data'].b_displayname,
              b_phonenumber: data['data'].b_phonenumber,
              b_country_code: data['data'].b_country_code,
              pickup_address: data['data'].pickup_address,
              pickup_address_googlemap: ['ff'],
              shipping_country: data['data'].shipping_country,
              shipping_state: data['data'].shipping_state,
              shipping_city: data['data'].shipping_city,
              s_address1: data['data'].s_address1,
              s_address2: data['data'].s_address2,
              s_display_name: data['data'].s_display_name,
              s_phone_number: data['data'].s_phone_number,
              s_country_code: data['data'].s_country_code,
              s_phoneno_verified: data['data'].s_phoneno_verified,
              bank_benefi_name: data['data'].bank_benefi_name,
              bank_name: data['data'].bank_name,
              bank_ac_no: data['data'].bank_ac_no,
              back_iban: data['data'].back_iban,
              swift_code: data['data'].swift_code,
              bank_currency: data['data'].bank_currency,
              bank_browse_file: data['data'].bank_browse_file,
              payment_mode: data['data'].payment_mode,
              vat_tax_registration_number: data['data'].vat_tax_registration_number,
              vat_r_certificate: data['data'].vat_r_certificate,
              wh_country: data['data'].wh_country,
              wh_state: data['data'].wh_state,
              wh_city: data['data'].wh_city,
              wh_addressline1: data['data'].wh_addressline1,
              wh_addressline2: data['data'].wh_addressline2,
              wh_display_name: data['data'].wh_display_name,
              wh_phone_number: data['data'].wh_phone_number,
              wh_country_code: data['data'].wh_country_code,
              wh_address_line: data['data'].wh_address_line,
              wh_phonenumber_verified: data['data'].wh_phonenumber_verified,
              wh_pickaddress: ['f'],
              product_type: data['data'].product_type,
              trading_type: data['data'].trading_type,
            });
            this.business_com_logo = data['data'].business_com_logo;
            this.bank_browse_file = data['data'].bank_browse_file;
            this.id_doc_front_side = data['data'].id_doc_front_side;
            this.id_doc_back_side = data['data'].id_doc_back_side;
            this.bus_doc_license = data['data'].bus_doc_license;
            this.vat_r_certificate = data['data'].vat_r_certificate;
            this.selectedData_ID = data['data'].id;
          } else {

          }
        })
      }

      else {
        this.dataLoaded = false;
        this.fileUploaded = false;
        this.addmode = true;
        this.editmode = false;
        this.deletemode = false;
      }

    });

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });

    this.BuyersService.listBuyers().subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Sellers = data['data'];
      } else {
        this.showError(data['message']);
        this.Sellers = null;
      }
    });




    this.adminService.getCountryList().subscribe(async data => {
      if (data['success']) {
        let countryList = data['data'].filter(item => item.status == true);
        this.countryList = await countryList;
        console.log(this.countryList);

      } else {
        this.countryList = [];
      }
    });


    this.adminService.getStateList().subscribe(async data => {
      if (data['success']) {
        let stateList = data['data'].filter(item => item.status == true);
        this.stateList = await stateList;
        console.log(this.stateList);

      } else {
        this.stateList = [];
      }
    });

    this.adminService.getCurrencyList().subscribe(async data => {
      if (data['success']) {
        this.CurrencyList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.CurrencyList = [];
      }
    });
    this.adminService.getRegistrationStatusList().subscribe(async data => {
      console.log(data);

      if (data['success']) {
        this.RegistrationStatusList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.RegistrationStatusList = [];
      }
    });

    this.adminService.getReasonList().subscribe(async data => {
      if (data['success']) {
        this.ReasonList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.ReasonList = [];
      }
    });

    this.adminService.getProductTypeList().subscribe(async data => {
      if (data['success']) {
        this.ProductTypeList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.ProductTypeList = [];
      }
    });

    this.adminService.getTradingTypeList().subscribe(async data => {
      if (data['success']) {
        this.TradingTypeList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.TradingTypeList = [];
      }
    });




  }
  onPaymentModeChange(e) {
    const payment_mode: FormArray = this.BuyersForm.get('payment_mode') as FormArray;
    if (e.target.checked) {
      payment_mode.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      payment_mode.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          payment_mode.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }




  getLocation() {
    var x = document.getElementById("demo");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log("position", position);
        this.BuyersForm.patchValue({
          billing_branch_geolocation: position.coords.latitude + ',' + position.coords.longitude
        });
      });
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }








  onFocusOut(email): void {
    console.log(email);

    if (email != null && email != undefined) {
      this.BuyersService.emailIdCheck(email).subscribe(async data => {
        if (data['success']) {
          this.EmailIdStatus = await data['data'];
          console.log(this.EmailIdStatus);
          this.dataLoaded = true;
          if (this.EmailIdStatus.mailcount == 1) {
            this.BuyersForm.controls.login_id.setValue('');
            console.log('clear', this.EmailIdStatus.mailcount);
            $("#emailId").val('');

          } else {
            console.log('ok', this.EmailIdStatus.mailcount);

            this.BuyersForm.controls?.login_id.setValue(email);

          }
        } else {
          this.EmailIdStatus = [];
        }
      });
    }
  }

  onOptionsSelected(selectedVal: any) {
    console.log(selectedVal);

    this.BuyersService.createId().subscribe(async data => {
      if (data['success']) {
        this.newbyerId = await data['data'];
        console.log(this.newbyerId.id);
        this.dataLoaded = true;
      } else {
        this.newbyerId = [];
      }
      var strDate = new Date();
      var shortYear = strDate.getFullYear();
      var twoDigitYear = shortYear.toString().substr(-2);
      console.log('BUY' + twoDigitYear + selectedVal + this.newbyerId.id);

      this.BuyersForm.controls.iv_company_id.setValue('BUY' + twoDigitYear + selectedVal + this.newbyerId.id);

    });


  }


  get f(): { [key: string]: AbstractControl } {
    return this.BuyersForm.controls;
  }
  Validate() {
    const selectedNodes = null;
    const selectedData = selectedNodes.map(node => node.data);

    if (selectedData.length > 0) {
      $('#deleteSellers').modal('show');
    } else {
      this.showError("Select atleast One record");
    }

  }

  deleteSellers() {
    const selectedNodes = null;
    const selectedData = selectedNodes.map(node => node.data);

    for (let i = 0; i < selectedData.length; i++) {
      this.BuyersService.deleteBuyers(selectedData[i].uid).subscribe(data => {
        if (data['success']) {
          this.showSuccess(data['message']);
        } else {
          this.showError(data['message']);
        }
      });
    }
    this.recall();
  }

  cancel() {
    this.editmode = false;
    this.addmode = true;
    $('#addBuyerModal').modal('hide');

  }

  recall() {
    this.BuyersForm.reset();
    this.BuyersService.listBuyers().subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Sellers = data['data'];
      } else {
        this.showError(data['message']);
        this.Sellers = null;
      }
    });
  }





  companyLogoUpload(event) {
    this.imageERPUploaded = false;
    this.adminService.UploadERPImg(event.target.files[0]).subscribe(data => {
      if (data['success']) {
        console.log(data);

        this.showSuccess(data['message']);
        this.business_com_logo = environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile'];
        this.BuyersForm.patchValue({
          business_com_logo: environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile']
        });
        this.imageERPUploaded = true;
      } else {
        this.showError(data['message']);
        this.imageERPUploaded = false;
      }
    });
  }

  frontSideUpload(event) {
    this.imageERPUploaded = false;
    this.adminService.UploadERPImg(event.target.files[0]).subscribe(data => {
      if (data['success']) {
        console.log(data);

        this.showSuccess(data['message']);
        this.id_doc_front_side = environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile'];
        this.BuyersForm.patchValue({
          id_doc_front_side: environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile']
        });
        this.imageERPUploaded = true;
      } else {
        this.showError(data['message']);
        this.imageERPUploaded = false;
      }
    });
  }

  backSideUpload(event) {
    this.imageERPUploaded = false;
    this.adminService.UploadERPImg(event.target.files[0]).subscribe(data => {
      if (data['success']) {
        console.log(data);

        this.showSuccess(data['message']);
        this.id_doc_back_side = environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile'];
        this.BuyersForm.patchValue({
          id_doc_back_side: environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile']
        });
        this.imageERPUploaded = true;
      } else {
        this.showError(data['message']);
        this.imageERPUploaded = false;
      }
    });
  }

  licenseUpload(event) {
    this.imageERPUploaded = false;
    this.adminService.UploadERPImg(event.target.files[0]).subscribe(data => {
      if (data['success']) {
        console.log(data);

        this.showSuccess(data['message']);
        this.bus_doc_license = environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile'];
        this.BuyersForm.patchValue({
          bus_doc_license: environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile']
        });
        this.imageERPUploaded = true;
      } else {
        this.showError(data['message']);
        this.imageERPUploaded = false;
      }
    });
  }

  broweFiles(event) {
    this.imageERPUploaded = false;
    this.adminService.UploadERPImg(event.target.files[0]).subscribe(data => {
      if (data['success']) {
        console.log(data);

        this.showSuccess(data['message']);
        this.bank_browse_file = environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile'];
        this.BuyersForm.patchValue({
          bank_browse_file: environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile']
        });
        this.imageERPUploaded = true;
      } else {
        this.showError(data['message']);
        this.imageERPUploaded = false;
      }
    });
  }

  taxRegistrationUpload(event) {
    this.imageERPUploaded = false;
    this.adminService.UploadERPImg(event.target.files[0]).subscribe(data => {
      if (data['success']) {
        console.log(data);

        this.showSuccess(data['message']);
        this.vat_r_certificate = environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile'];
        this.BuyersForm.patchValue({
          vat_r_certificate: environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile']
        });
        this.imageERPUploaded = true;
      } else {
        this.showError(data['message']);
        this.imageERPUploaded = false;
      }
    });
  }

  addBuyer() {
    console.log(this.BuyersForm.valid);

    /*this.router.navigateByUrl('admin/buyermanagement');

    if (this.BuyersForm.valid) {
      this.BuyersService.addBuyers(this.BuyersForm.value).subscribe(data => {
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
*/
    this.router.navigateByUrl('admin/buyermanagement');
    if (this.BuyersForm.valid) {

      this.BuyersService.addBuyers(this.BuyersForm.value).subscribe(data => {
        if (data['success']) {
          console.log(data);

          this.showSuccess(data['msg']);
          this.cancel();
        } else {
          this.showError(data['msg']);
        }
      });
    } else {
      this.showWarning("Please Fill all Fields");
    }


    $('#addBuyerModal').modal('hide');

  }

  addClose() {
    this.router.navigateByUrl('admin/buyermanagement');
  }

  updateBuyer() {
    this.router.navigateByUrl('admin/buyermanagement');

    console.log(this.BuyersForm.value);

    if (this.BuyersForm.valid) {
      this.BuyersService.updateBuyers(this.BuyersForm.value).subscribe(data => {
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

  showSuccess(msg) {
    this.toastr.successToastr(msg);
  }

  showError(msg) {
    this.toastr.errorToastr(msg);
  }

  showWarning(msg) {
    this.toastr.warningToastr(msg);
  }

  addBuyerDialog() {
    this.submitted = true;

    if (this.BuyersForm.valid) {
      $('#addBuyerModal').modal('show');
      this.addmode = true;
      this.editmode = false;
      this.deletemode = false;
      this.listmode = false;
    } else {
      this.showError('please fill all fields');
    }
  }


  UploadFile(event) {
    this.fileUploaded = false;
    this.adminService.uploadLogoCms(event.target.files[0]).subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['message']);
        this.logoUrl = environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile'];
        this.BuyersForm.patchValue({
          company_logo: environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile']
        });
        this.fileUploaded = true;
        this.formnext()
      } else {
        this.showError(data['message']);
        this.fileUploaded = false;
      }
    });
  }
  formnext() {


    if (this.BuyersForm.value.name != undefined && this.BuyersForm.value.subscription_plan_id != undefined && this.BuyersForm.value.status != undefined && this.logoUrl != undefined) {
      this.form1 = true
      console.log(this.BuyersForm.value.name)
      console.log(this.BuyersForm.value.subscription_plan_id)
      console.log(this.BuyersForm.value.status)
    }
    else {
      this.form1 = false
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}