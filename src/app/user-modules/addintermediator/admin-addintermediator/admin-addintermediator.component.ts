// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from 'src/app/admin-module.service';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IntermedaitorService } from 'src/app/intermedaitor.service';
import { CustomValidators } from 'src/app/CustomValidators';

declare var $: any;

@Component({
  selector: 'app-admin-addintermediator',
  templateUrl: './admin-addintermediator.component.html',
  styleUrls: ['./admin-addintermediator.component.scss']
})
export class AdminAddintermediatorComponent implements OnInit {

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
  image: string;
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
  RoleList: any;




  constructor(private formBuilder: FormBuilder, private intermedaitorService: IntermedaitorService, private router: Router, private _Activatedroute: ActivatedRoute, private adminService: AdminModuleService,
    private toastr: ToastrManager) {

    this.BuyersForm = new FormGroup({


      id: new FormControl(''),
      firstname: new FormControl('', [Validators.required, Validators.pattern(this.special_char)]),
      lastname: new FormControl('', [Validators.required, Validators.pattern(this.special_char)]),
      user_name: new FormControl('', [Validators.required, Validators.pattern(this.special_char)]),
      email_id: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      re_enterpassword: new FormControl('', [Validators.required]),
      role: new FormControl('', Validators.required),
      phone_number: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}")]),
      mobile_number: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}")]),
      status: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      address: new FormControl('', [Validators.required, Validators.pattern(this.special_char)]),
      created_at: new FormControl(''),
      created_by: new FormControl(''),
      modified_at: new FormControl(''),
      modified_by: new FormControl(''),

    }, CustomValidators.mustMatch('password', 're_enterpassword')

    );
  }




  onSubmit() {
    this.submitted = true;

    if (this.BuyersForm.invalid) {
      return;
    }

  }

  get f() {
    return this.BuyersForm.controls;
  }

  ngOnInit(): void {


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
        this.intermedaitorService.detailsIntermedaitor(this.id).subscribe(data => {
          console.log(data);
          if (data['success']) {
            this.BuyersForm.patchValue({
              id: data['data'].id,
              firstname: data['data'].firstname,
              lastname: data['data'].lastname,
              user_name: data['data'].user_name,
              email_id: data['data'].email_id,
              password: data['data'].password,
              re_enterpassword: data['data'].re_enterpassword,
              role: data['data'].role,
              phone_number: data['data'].phone_number,
              mobile_number: data['data'].mobile_number,
              status: data['data'].status,
              image: data['data'].image,
              country: data['data'].country,
              language: data['data'].language,
              address: data['data'].address,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by
            });
            this.image = data['data'].image;

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
        this.intermedaitorService.detailsIntermedaitor(this.id).subscribe(data => {
          console.log(data);

          if (data['success']) {
            this.BuyersForm.patchValue({
              id: data['data'].id,
              firstname: data['data'].firstname,
              lastname: data['data'].lastname,
              user_name: data['data'].user_name,
              email_id: data['data'].email_id,
              password: data['data'].password,
              re_enterpassword: data['data'].re_enterpassword,
              role: data['data'].role,
              phone_number: data['data'].phone_number,
              mobile_number: data['data'].mobile_number,
              status: data['data'].status,
              image: data['data'].image,
              country: data['data'].country,
              language: data['data'].language,
              address: data['data'].address,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by
            });
            this.image = data['data'].image;
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
        this.intermedaitorService.detailsIntermedaitor(this.id).subscribe(data => {
          console.log(data);

          if (data['success']) {
            this.BuyersForm.patchValue({
              id: data['data'].id,
              firstname: data['data'].firstname,
              lastname: data['data'].lastname,
              user_name: data['data'].user_name,
              email_id: data['data'].email_id,
              password: data['data'].password,
              re_enterpassword: data['data'].re_enterpassword,
              role: data['data'].role,
              phone_number: data['data'].phone_number,
              mobile_number: data['data'].mobile_number,
              status: data['data'].status,
              image: data['data'].image,
              country: data['data'].country,
              language: data['data'].language,
              address: data['data'].address,
              created_at: data['data'].created_at,
              created_by: data['data'].created_by,
              modified_at: data['data'].modified_at,
              modified_by: data['data'].modified_by
            });
            this.image = data['data'].image;

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



    this.intermedaitorService.listIntermedaitor().subscribe(data => {
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

    this.adminService.getRoleList().subscribe(async data => {
      if (data['success']) {
        this.RoleList = await data['data'];
        this.dataLoaded = true;
      } else {
        this.RoleList = [];
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







  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }



  onFocusOut(email): void {
    console.log(email);

    if (email != null && email != undefined) {
      this.intermedaitorService.emailIdCheck(email).subscribe(async data => {
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

            this.BuyersForm.controls?.login_id?.setValue(email);

          }
        } else {
          this.EmailIdStatus = [];
        }
      });
    }
  }

  onFocusOutPhnNo(email): void {
    if (email != null && email != undefined) {
      this.intermedaitorService.emailIdCheck(email).subscribe(async data => {
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

            this.BuyersForm.controls?.login_id?.setValue(email);

          }
        } else {
          this.EmailIdStatus = [];
        }
      });
    }
  }

  onFocusOutMblNo(email): void {
    if (email != null && email != undefined) {
      this.intermedaitorService.emailIdCheck(email).subscribe(async data => {
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

            this.BuyersForm.controls?.login_id?.setValue(email);

          }
        } else {
          this.EmailIdStatus = [];
        }
      });
    }
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
      this.intermedaitorService.deleteIntermedaitor(selectedData[i].uid).subscribe(data => {
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
    this.intermedaitorService.listIntermedaitor().subscribe(data => {
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
        this.image = environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile'];
        this.BuyersForm.patchValue({
          image: environment.baseurl + "cms-main/viewimage?filename=" + data['uploadedfile']
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



  addIntermediator() {
    console.log(this.BuyersForm.valid);

    if (this.BuyersForm.valid) {
      this.router.navigateByUrl('admin/intermediatormanagement');

      this.intermedaitorService.addIntermedaitor(this.BuyersForm.value).subscribe(data => {
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

    $('#addBuyerModal').modal('hide');




  }

  addClose() {
  }


  updateBuyer() {

    this.router.navigateByUrl('admin/intermediatormanagement');

    if (this.BuyersForm.valid) {
      console.log(this.BuyersForm.value);

      this.intermedaitorService.updateIntermedaitor(this.BuyersForm.value).subscribe(data => {
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
        //this.formnext()
      } else {
        this.showError(data['message']);
        this.fileUploaded = false;
      }
    });
  }
  /*formnext() {


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
 }*/
}


