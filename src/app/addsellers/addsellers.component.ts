// @ts-nocheck

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SellersService } from '../sellers.service';

declare var $: any;

@Component({
  selector: 'app-addsellers',
  templateUrl: './addsellers.component.html',
  styleUrls: ['./addsellers.component.scss']
})
export class AddsellersComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  SellerscolumnDefs = [
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
  SellersForm: FormGroup;
  addmode: boolean;
  editmode: boolean;
  Hubs: any;
  Districts: any;
  hubsFilter: any = { hubname: '' };
  Sellers: any;

  constructor(private formBuilder: FormBuilder, private SellersService: SellersService,
    private toastr: ToastrManager) {
    this.SellersForm = this.formBuilder.group({
      id: ['', Validators.required],
      user_id: ['', Validators.required],
      name: ['', Validators.required],
      company_logo: ['', Validators.required],
      subscription_plan_id: ['', Validators.required],
      status: ['', Validators.required],
      b_country: ['', Validators.required],
      b_state: ['', Validators.required],
      b_city: ['', Validators.required],
      b_address1: ['', Validators.required],
      b_address2: ['', Validators.required],
      b_displayname: ['', Validators.required],
      b_phonenumber: ['', Validators.required],
      b_countrycode: ['', Validators.required],
      sh_country: ['', Validators.required],
      sh_state: ['', Validators.required],
      sh_city: ['', Validators.required],
      sh_address1: ['', Validators.required],
      sh_address2: ['', Validators.required],
      sh_display_name: ['', Validators.required],
      sh_phone_number: ['', Validators.required],
      sh_country_code: ['', Validators.required],
      sh_phone_verified: ['', Validators.required],
      p_address: ['', Validators.required],
      pick_address_map: ['', Validators.required],
      payment_mode: ['', Validators.required],
      product_type: ['', Validators.required],
      trading_type: ['', Validators.required],
      business_location: ['', Validators.required],
      authenticated: ['', Validators.required],
      residenceid: ['', Validators.required],
      expiry_date: ['', Validators.required],
      country_of_issue: ['', Validators.required],
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dob: ['', Validators.required],
      reg_name: ['', Validators.required],
      license_number: ['', Validators.required],
      address_line: ['', Validators.required],
      doc_front: ['', Validators.required],
      doc_back: ['', Validators.required],
      doc_license: ['', Validators.required],
      doc_regstatus: ['', Validators.required],
      doc_failreason: ['', Validators.required],
      taxregnumber: ['', Validators.required],
      doc_taxcertificate: ['', Validators.required],
      beneficiary_name: ['', Validators.required],
      bankname: ['', Validators.required],
      branchname: ['', Validators.required],
      baccountnumber: ['', Validators.required],
      bibannumber: ['', Validators.required],
      bswiftcode: ['', Validators.required],
      bcurrency: ['', Validators.required],
      buploadedfile: ['', Validators.required],
      wh_country: ['', Validators.required],
      wh_state: ['', Validators.required],
      wh_city: ['', Validators.required],
      wh_address1: ['', Validators.required],
      wh_address2: ['', Validators.required],
      wh_displaynumber: ['', Validators.required],
      wh_phonenumber: ['', Validators.required],
      wh_countrycode: ['', Validators.required],
      wh_phoneverified: ['', Validators.required],
      wh_addressline: ['', Validators.required],
      wh_pickaddress: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.addmode = true;
    this.editmode = false;
    this.SellersService.listBuyers().subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Sellers = data['data'];
      } else {
        this.showError(data['message']);
        this.Sellers = null;
      }
    });
  }


  addSellers() {
    this.SellersForm.patchValue({
      created: new Date(),
      status: 'active'
    });
    this.SellersService.addBuyers(this.SellersForm.value).subscribe(data => {
      if (data['success']) {
        this.recall();
        this.showSuccess(data['message']);
      } else {
        this.showError(data['message']);
      }
    });
  }

  editSellers() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    if (selectedData.length == 1) {
      this.addmode = false;
      this.editmode = true;
      $('#addSellers').modal('show');
      this.SellersForm.patchValue({
        id: selectedData[0].id,
        user_id: selectedData[0].user_id,
        name: selectedData[0].name,
        company_logo: selectedData[0].company_logo,
        subscription_plan_id: selectedData[0].subscription_plan_id,
        status: selectedData[0].status,
        b_country: selectedData[0].b_country,
        b_state: selectedData[0].b_state,
        b_city: selectedData[0].b_city,
        b_address1: selectedData[0].b_address1,
        b_address2: selectedData[0].b_address2,
        b_displayname: selectedData[0].b_displayname,
        b_phonenumber: selectedData[0].b_phonenumber,
        b_countrycode: selectedData[0].b_countrycode,
        sh_country: selectedData[0].sh_country,
        sh_state: selectedData[0].sh_state,
        sh_city: selectedData[0].sh_city,
        sh_address1: selectedData[0].sh_address1,
        sh_address2: selectedData[0].sh_address2,
        sh_display_name: selectedData[0].sh_display_name,
        sh_phone_number: selectedData[0].sh_phone_number,
        sh_country_code: selectedData[0].sh_country_code,
        sh_phone_verified: selectedData[0].sh_phone_verified,
        p_address: selectedData[0].p_address,
        pick_address_map: selectedData[0].pick_address_map,
        payment_mode: selectedData[0].payment_mode,
        product_type: selectedData[0].product_type,
        trading_type: selectedData[0].trading_type,
        business_location: selectedData[0].business_location,
        authenticated: selectedData[0].authenticated,
        residenceid: selectedData[0].residenceid,
        expiry_date: selectedData[0].expiry_date,
        country_of_issue: selectedData[0].country_of_issue,
        first_name: selectedData[0].first_name,
        middle_name: selectedData[0].middle_name,
        last_name: selectedData[0].last_name,
        dob: selectedData[0].dob,
        reg_name: selectedData[0].reg_name,
        license_number: selectedData[0].license_number,
        address_line: selectedData[0].address_line,
        doc_front: selectedData[0].doc_front,
        doc_back: selectedData[0].doc_back,
        doc_license: selectedData[0].doc_license,
        doc_regstatus: selectedData[0].doc_regstatus,
        doc_failreason: selectedData[0].doc_failreason,
        taxregnumber: selectedData[0].taxregnumber,
        doc_taxcertificate: selectedData[0].doc_taxcertificate,
        beneficiary_name: selectedData[0].beneficiary_name,
        bankname: selectedData[0].bankname,
        branchname: selectedData[0].branchname,
        baccountnumber: selectedData[0].baccountnumber,
        bibannumber: selectedData[0].bibannumber,
        bswiftcode: selectedData[0].bswiftcode,
        bcurrency: selectedData[0].bcurrency,
        buploadedfile: selectedData[0].buploadedfile
      });
    } else {
      this.showError("Select only One record");
    }

  }

  updateSellers() {
    this.SellersService.updateBuyers(this.SellersForm.value).subscribe(data => {
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
      $('#deleteSellers').modal('show');
    } else {
      this.showError("Select atleast One record");
    }

  }

  deleteSellers() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);

    for (let i = 0; i < selectedData.length; i++) {
      this.SellersService.deleteBuyers(selectedData[i].uid).subscribe(data => {
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
    this.SellersForm.reset();
    this.editmode = false;
    this.addmode = true;
  }

  recall() {
    this.SellersForm.reset();
    this.SellersService.listBuyers().subscribe(data => {
      if (data['success']) {
        this.showSuccess(data['message']);
        this.Sellers = data['data'];
      } else {
        this.showError(data['message']);
        this.Sellers = null;
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
