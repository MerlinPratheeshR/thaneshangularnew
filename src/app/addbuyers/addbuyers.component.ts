// @ts-nocheck

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BuyersService } from '../buyers.service';
declare var $: any;

@Component({
  selector: 'app-addbuyers',
  templateUrl: './addbuyers.component.html',
  styleUrls: ['./addbuyers.component.scss']
})
export class AddbuyersComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  BuyerscolumnDefs = [
    { headerName: 'UID', field: 'uid', width: 150, checkboxSelection: true, headerCheckboxSelection: true, sortable: true, filter: true },
    {
      headerName: 'Logo', field: 'logo', width: 120, cellRenderer: function (params) {
        return '<img style="height: 50px; width: auto;" src="' + params.value + '" alt="">';
      }
    },
    { headerName: 'Ecell', field: 'ecellname', resizable: true, sortable: true, filter: true },
    { headerName: 'Ecell Email', field: 'ecellemail', resizable: true, sortable: true, filter: true },
    { headerName: 'College Name', field: 'collegename', resizable: true, sortable: true, filter: true },
    { headerName: 'Type', field: 'type', sortable: true, filter: true },
    { headerName: 'Stream', field: 'stream', sortable: true, filter: true },
    { headerName: 'District', field: 'district', sortable: true, filter: true },
    { headerName: 'City', field: 'city', sortable: true, filter: true },
    { headerName: 'Address', field: 'address', resizable: true, sortable: true, filter: true },
    { headerName: 'Status', field: 'status', sortable: true, filter: true },
    { headerName: 'Created', field: 'created', sortable: true, filter: true }
  ];
  BuyersForm: FormGroup;
  addmode: boolean;
  editmode: boolean;
  Hubs: any;
  Districts: any;
  hubsFilter: any = { hubname: '' };
  Buyers: any;

  constructor(private formBuilder: FormBuilder, private buyersService: BuyersService,
    private toastr: ToastrManager) {
    this.BuyersForm = this.formBuilder.group({
      id: ['', Validators.required],
      login_id: ['', Validators.required],
      password: ['', Validators.required],
      business_name: ['', [Validators.required]],
      business_com_logo: ['', Validators.required],
      business_subscrip_plan: ['', Validators.required],
      business_status: ['', Validators.required],
      billing_country: ['', Validators.required],
      billing_state: ['', Validators.required],
      billing_city: ['', Validators.required],
      b_address1: ['', Validators.required],
      b_address2: ['', Validators.required],
      b_displayname: ['', Validators.required],
      b_phonenumber: ['', Validators.required],
      b_country_code: ['', Validators.required],
      shipping_country: ['', Validators.required],
      shipping_state: ['', Validators.required],
      shipping_city: ['', Validators.required],
      s_address1: ['', Validators.required],
      s_address2: ['', Validators.required],
      s_displayname: ['', Validators.required],
      s_phonenumber: ['', Validators.required],
      s_country_code: ['', Validators.required],
      s_phoneno_verified: ['', Validators.required],
      pickup_address: ['', Validators.required],
      payment_info: ['', Validators.required],
      product_type: ['', Validators.required],
      trading_type: ['', Validators.required],
      iv_locate: ['', Validators.required],
      iv_licenese: ['', Validators.required],
      iv_national: ['', Validators.required],
      iv_exp_date: ['', Validators.required],
      iv_country_issue: ['', Validators.required],
      iv_f_name: ['', Validators.required],
      iv_m_name: ['', Validators.required],
      iv_l_name: ['', Validators.required],
      iv_dob: ['', Validators.required],
      iv_r_bussiness_name: ['', Validators.required],
      iv_licenese_no: ['', Validators.required],
      iv_r_address: ['', Validators.required],
      id_doc: ['', Validators.required],
      bus_doc_license: ['', Validators.required],
      bus_doc_r_status: ['', Validators.required],
      bus_doc_fail_reason: ['', Validators.required],
      vat_info_number: ['', Validators.required],
      vat_r_certificate: ['', Validators.required],
      bank_benefi_name: ['', Validators.required],
      bank_name: ['', Validators.required],
      bank_ac_no: ['', Validators.required],
      back_iban: ['', Validators.required],
      swift_code: ['', Validators.required],
      bank_currency: ['', Validators.required],
      bank_browse_file: ['', Validators.required],
      created_at: ['', Validators.required],
      created_by: ['', Validators.required],
      modified_at: ['', Validators.required],
      modified_by: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this.addmode = true;
    this.editmode = false;
    this.buyersService.listBuyers().subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Buyers = data['data'];
      } else {
        this.showError(data['message']);
        this.Buyers = null;
      }
    });
  }


  addBuyers() {
    this.BuyersForm.patchValue({
      created: new Date(),
      status: 'active'
    });
    this.buyersService.addBuyers(this.BuyersForm.value).subscribe(data => {
      if (data['success']) {
        this.recall();
        this.showSuccess(data['message']);
      } else {
        this.showError(data['message']);
      }
    });
  }

  editBuyers() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    if (selectedData.length == 1) {
      this.addmode = false;
      this.editmode = true;
      $('#addBuyers').modal('show');
      this.BuyersForm.patchValue({
        id: selectedData[0].id,
        login_id: selectedData[0].login_id,
        password: selectedData[0].password,
        business_name: selectedData[0].business_name,
        business_com_logo: selectedData[0].business_com_logo,
        business_subscrip_plan: selectedData[0].business_subscrip_plan,
        business_status: selectedData[0].business_status,
        billing_country: selectedData[0].billing_country,
        billing_state: selectedData[0].billing_state,
        billing_city: selectedData[0].billing_city,
        b_address1: selectedData[0].b_address1,
        b_address2: selectedData[0].b_address2,
        b_displayname: selectedData[0].b_displayname,
        b_phonenumber: selectedData[0].b_phonenumber,
        b_country_code: selectedData[0].b_country_code,
        shipping_country: selectedData[0].shipping_country,
        shipping_state: selectedData[0].shipping_state,
        shipping_city: selectedData[0].shipping_city,
        s_address1: selectedData[0].s_address1,
        s_address2: selectedData[0].s_address2,
        s_displayname: selectedData[0].s_displayname,
        s_phonenumber: selectedData[0].s_phonenumber,
        s_country_code: selectedData[0].s_country_code,
        s_phoneno_verified: selectedData[0].s_phoneno_verified,
        pickup_address: selectedData[0].pickup_address,
        payment_info: selectedData[0].payment_info,
        product_type: selectedData[0].product_type,
        trading_type: selectedData[0].trading_type,
        iv_locate: selectedData[0].iv_locate,
        iv_licenese: selectedData[0].iv_licenese,
        iv_national: selectedData[0].iv_national,
        iv_exp_date: selectedData[0].iv_exp_date,
        iv_country_issue: selectedData[0].iv_country_issue,
        iv_f_name: selectedData[0].iv_f_name,
        iv_m_name: selectedData[0].iv_m_name,
        iv_l_name: selectedData[0].iv_l_name,
        iv_dob: selectedData[0].iv_dob,
        iv_r_bussiness_name: selectedData[0].iv_r_bussiness_name,
        iv_licenese_no: selectedData[0].iv_licenese_no,
        iv_r_address: selectedData[0].iv_r_address,
        id_doc: selectedData[0].id_doc,
        bus_doc_license: selectedData[0].bus_doc_license,
        bus_doc_r_status: selectedData[0].bus_doc_r_status,
        bus_doc_fail_reason: selectedData[0].bus_doc_fail_reason,
        vat_info_number: selectedData[0].vat_info_number,
        vat_r_certificate: selectedData[0].vat_r_certificate,
        bank_benefi_name: selectedData[0].bank_benefi_name,
        bank_name: selectedData[0].bank_name,
        bank_ac_no: selectedData[0].bank_ac_no,
        back_iban: selectedData[0].back_iban,
        swift_code: selectedData[0].swift_code,
        bank_currency: selectedData[0].bank_currency,
        bank_browse_file: selectedData[0].bank_browse_file,
        created_at: selectedData[0].created_at,
        created_by: selectedData[0].created_by,
        modified_at: selectedData[0].modified_at,
        modified_by: selectedData[0].modified_by
      });
    } else {
      this.showError("Select only One record");
    }

  }

  updateBuyer() {
    console.log('some', this.BuyersForm.value);

    this.buyersService.updateBuyers(this.BuyersForm.value).subscribe(data => {
      if (data['success']) {
        this.recall();
        this.showSuccess(data['message']);
      } else {
        this.showError(data['message']);
      }
    });
  }

  Validate() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);

    if (selectedData.length > 0) {
      $('#deleteBuyers').modal('show');
    } else {
      this.showError("Select atleast One record");
    }

  }

  deleteBuyers() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);

    for (let i = 0; i < selectedData.length; i++) {
      this.buyersService.deleteBuyers(selectedData[i].uid).subscribe(data => {
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
    this.BuyersForm.reset();
    this.editmode = false;
    this.addmode = true;
  }

  recall() {
    this.BuyersForm.reset();
    this.buyersService.listBuyers().subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Buyers = data['data'];
      } else {
        this.showError(data['message']);
        this.Buyers = null;
      }
    });
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
}
