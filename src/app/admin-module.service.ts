// @ts-nocheck

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdminModuleService {
  token: string;
  constructor(private http: HttpClient, private router: Router,) {
    this.token = localStorage.getItem("user");
  }

  // CITY MANAGEMENT API LIST STARTS HERE //


  getCityList() {
    return this.http.get(environment.baseurl + 'city-management/getlist')
  }

  getCityInfo(id) {
    return this.http.get(environment.baseurl + 'city-management/getby_id/' + id);
  }

  createCity(data) {
    return this.http.post(environment.baseurl + 'city-management/create', data);
  }

  updateCity(data) {
    return this.http.put(environment.baseurl + 'city-management/update/' + data.id, data)
  }

  deleteCity(id) {
    return this.http.delete(environment.baseurl + 'city-management/delete/' + id);
  }

  searchCityList(data) {
    return this.http.post(environment.baseurl + 'city-management/search', data)
  }


  // CITY MANAGEMENT API LIST ENDEDS HERE //



  // STATE MANAGEMENT API LIST STARTS HERE //

  searchState(data, collection_name) {
    data.collection = collection_name;
    return this.http.post(environment.baseurl + 'state-management/search', data)
  }

  getStateList(params) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `${this.token}` });
    let httpparams = new HttpParams();
    for (let k in params) {
      if (k === 'conditions') {
        params[k].forEach((element, i) => {
          httpparams = httpparams.append('conditions[' + i + '][key]', element.key);
          httpparams = httpparams.append('conditions[' + i + '][condition]', element.condition);
          httpparams = httpparams.append('conditions[' + i + '][value]', element.value);
          httpparams = httpparams.append('conditions[' + i + '][join_condition]', element.join_condition);
        });
      }
      else if (k === 'columns') {

      } else if (k === 'order') {
        console.log(params[k]);
        params[k].forEach((element, i) => {
          switch (element['column']) {
            case 0:
              break;
            case 1:
              element.name = 'country_name';
              break;
            case 2:
              element.name = 'country_code';
              break;
            case 3:
              element.name = 'status';
              break;
            case 4:
              element.name = 'createdat';
              break;
            case 5:
              element.name = 'updatedat';
              break;
            case 6:
              element.name = 'createdby';
              break;
            case 7:
              element.name = 'updatedby';
              break;
          }
          if (element.name) {
            httpparams = httpparams.append('orderby[' + i + '][name]', element.name);
            httpparams = httpparams.append('orderby[' + i + '][dir]', element.dir);
          }
        });
      }
      else if (k === 'search') {
        if (params[k].value && params[k].value !== null && params[k].value !== '') {
          httpparams = httpparams.append('search_value', params[k].value);
        }
      }
      else if (params[k] instanceof Array) {
        console.log(params[k]);
        params[k].forEach((element, i) => {

        });
      }
      else {
        httpparams = httpparams.append(k, params[k]);
      }
    }
    const options = { headers: headers, params: httpparams };
    return this.http.get(environment.baseurl + 'state-management/getlist', options);
  }

  getStateInfo(id) {
    return this.http.get(environment.baseurl + 'state-management/getby_id/' + id);
  }

  getState_list(id) {
    return this.http.get(environment.baseurl + 'state-management/getby_country_id/' + id);
  }




  createState(data) {
    return this.http.post(environment.baseurl + 'state-management/create', data);
  }

  updateState(data) {
    return this.http.put(environment.baseurl + 'state-management/update/' + data.id, data)
  }

  deleteState(id) {
    return this.http.delete(environment.baseurl + 'state-management/delete/' + id);
  }

  searchStateList(data) {
    return this.http.post(environment.baseurl + 'city-management/search', data)
  }


  // STATE MANAGEMENT API LIST ENDEDS HERE //


  // Country MANAGEMENT API LIST STARTS HERE //

  getCountryList(params) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `${this.token}` });
    let httpparams = new HttpParams();
    for (let k in params) {
      if (k === 'conditions') {
        params[k].forEach((element, i) => {
          httpparams = httpparams.append('conditions[' + i + '][key]', element.key);
          httpparams = httpparams.append('conditions[' + i + '][condition]', element.condition);
          httpparams = httpparams.append('conditions[' + i + '][value]', element.value);
          httpparams = httpparams.append('conditions[' + i + '][join_condition]', element.join_condition);
        });
      }
      else if (k === 'columns') {

      } else if (k === 'order') {
        console.log(params[k]);
        params[k].forEach((element, i) => {
          switch (element['column']) {
            case 0:
              break;
            case 1:
              element.name = 'country_name';
              break;
            case 2:
              element.name = 'country_code';
              break;
            case 3:
              element.name = 'status';
              break;
            case 4:
              element.name = 'createdat';
              break;
            case 5:
              element.name = 'updatedat';
              break;
            case 6:
              element.name = 'createdby';
              break;
            case 7:
              element.name = 'updatedby';
              break;
          }
          if (element.name) {
            httpparams = httpparams.append('orderby[' + i + '][name]', element.name);
            httpparams = httpparams.append('orderby[' + i + '][dir]', element.dir);
          }
        });
      }
      else if (k === 'search') {
        if (params[k].value && params[k].value !== null && params[k].value !== '') {
          httpparams = httpparams.append('search_value', params[k].value);
        }
      }
      else if (params[k] instanceof Array) {
        console.log(params[k]);
        params[k].forEach((element, i) => {

        });
      }
      else {
        httpparams = httpparams.append(k, params[k]);
      }
    }
    const options = { headers: headers, params: httpparams };
    return this.http.get(environment.baseurl + 'country-management/getlist', options);
  }

  getCountryInfo(id) {
    return this.http.get(environment.baseurl + 'country-management/getby_id/' + id);
  }

  createCountry(data) {
    // this.router.navigate(['admin/routerApi']);

    return this.http.post(environment.baseurl + 'country-management/create', data);
  }

  updateCountry(data) {
    return this.http.put(environment.baseurl + 'country-management/update/' + data.id, data)
  }

  deleteCountry(id: any, country_id: string) {
    var data = { id, country_id }
    return this.http.post(environment.baseurl + 'country-management/delete/', data);
  }

  searchCountryList(data) {
    return this.http.post(environment.baseurl + 'country-management/search', data)
  }


  // Country MANAGEMENT API LIST ENDEDS HERE //

  // COMMISSION MANAGEMENT API LIST STARTS HERE//
  getCommissionList() {
    return this.http.get(environment.baseurl + 'commission_management/getlist')
  }
  getCommissionInfo(id) {
    return this.http.get(environment.baseurl + 'commission_management/getby_id/' + id);
  }

  createCommission(data) {
    return this.http.post(environment.baseurl + 'commission_management/create', data);
  }

  updateCommission(data) {
    return this.http.put(environment.baseurl + 'commission_management/update/' + data.id, data)
  }

  deleteCommission(id) {
    return this.http.delete(environment.baseurl + 'commission_management/delete/' + id);
  }

  searchCommissionList(data) {
    return this.http.post(environment.baseurl + 'commission-management/search', data)
  }

  // Currency MANAGEMENT API LIST STARTS HERE //

  getCurrencyList() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `${this.token}` });
    let httpparams = new HttpParams();
    for (let k in params) {
      if (k === 'conditions') {
        params[k].forEach((element, i) => {
          httpparams = httpparams.append('conditions[' + i + '][key]', element.key);
          httpparams = httpparams.append('conditions[' + i + '][condition]', element.condition);
          httpparams = httpparams.append('conditions[' + i + '][value]', element.value);
          httpparams = httpparams.append('conditions[' + i + '][join_condition]', element.join_condition);
        });
      }
      else if (k === 'columns') {

      } else if (k === 'order') {
        console.log(params[k]);
        params[k].forEach((element, i) => {
          switch (element['column']) {
            case 0:
              break;
            case 1:
              element.name = 'country_name';
              break;
            case 2:
              element.name = 'country_code';
              break;
            case 3:
              element.name = 'status';
              break;
            case 4:
              element.name = 'createdat';
              break;
            case 5:
              element.name = 'updatedat';
              break;
            case 6:
              element.name = 'createdby';
              break;
            case 7:
              element.name = 'updatedby';
              break;
          }
          if (element.name) {
            httpparams = httpparams.append('orderby[' + i + '][name]', element.name);
            httpparams = httpparams.append('orderby[' + i + '][dir]', element.dir);
          }
        });
      }
      else if (k === 'search') {
        if (params[k].value && params[k].value !== null && params[k].value !== '') {
          httpparams = httpparams.append('search_value', params[k].value);
        }
      }
      else if (params[k] instanceof Array) {
        console.log(params[k]);
        params[k].forEach((element, i) => {

        });
      }
      else {
        httpparams = httpparams.append(k, params[k]);
      }
    }
    const options = { headers: headers, params: httpparams };
    return this.http.get(environment.baseurl + 'currency-management/getlist', options);
  }
  getUserList() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `${this.token}` });
    const options = { headers: headers };
    return this.http.get(environment.baseurl + 'currency-management/getuserlist', options);
  }

  getCurrencyInfo(id) {
    return this.http.get(environment.baseurl + 'currency-management/getby_id/' + id);
  }

  createCurrency(data) {
    return this.http.post(environment.baseurl + 'currency-management/create', data);
  }

  updateCurrency(data) {
    return this.http.put(environment.baseurl + 'currency-management/update/' + data.id, data)
  }

  deleteCurrency(id) {
    return this.http.delete(environment.baseurl + 'currency-management/delete/' + id);
  }

  searchCurrencyList(data) {
    return this.http.post(environment.baseurl + 'currency-management/search', data)
  }


  // Currency MANAGEMENT API LIST ENDEDS HERE //

  // PAYOUT SCHEDULE MANAGEMENT API LIST STARTS HERE //

  getPayoutList() {
    return this.http.get(environment.baseurl + 'payout-management/getlist')
  }

  getPayoutInfo(id) {
    return this.http.get(environment.baseurl + 'payout-management/getby_id/' + id);
  }

  createPayout(data) {
    return this.http.post(environment.baseurl + 'payout-management/create', data);
  }

  updatePayout(data) {
    return this.http.put(environment.baseurl + 'payout-management/update/' + data.id, data)
  }

  deletePayout(id) {
    return this.http.delete(environment.baseurl + 'payout-management/delete/' + id);
  }

  searchPayoutList(data) {
    return this.http.post(environment.baseurl + 'payout-management/search', data)
  }


  // PAYOUT SCHEDULE MANAGEMENT API LIST ENDEDS HERE //


  // Product Type MANAGEMENT API LIST STARTS HERE //

  getProductTypeList() {
    return this.http.get(environment.baseurl + 'productType-management/getlist')
  }

  getProductTypeInfo(id) {
    return this.http.get(environment.baseurl + 'productType-management/getby_id/' + id);
  }

  createProductType(data) {
    return this.http.post(environment.baseurl + 'productType-management/create', data);
  }

  updateProductType(data) {
    return this.http.put(environment.baseurl + 'productType-management/update/' + data.id, data)
  }

  deleteProductType(id) {
    return this.http.delete(environment.baseurl + 'productType-management/delete/' + id);
  }

  searchProductTypeList(data) {
    return this.http.post(environment.baseurl + 'productType-management/search', data)
  }


  // Product Type MANAGEMENT API LIST ENDEDS HERE //


  // ROLE MANAGEMENT API LIST STARTS HERE //

  getRoleList() {
    return this.http.get(environment.baseurl + 'role-management/getlist')
  }

  getRoleInfo(id) {
    return this.http.get(environment.baseurl + 'role-management/getby_id/' + id);
  }

  createRole(data) {
    return this.http.post(environment.baseurl + 'role-management/create', data);
  }

  updateRole(data) {
    return this.http.put(environment.baseurl + 'role-management/update/' + data.id, data)
  }

  deleteRole(id) {
    return this.http.delete(environment.baseurl + 'role-management/delete/' + id);
  }

  searchRoleList(data) {
    return this.http.post(environment.baseurl + 'role-management/search', data)
  }


  // ROLE MANAGEMENT API LIST ENDEDS HERE //

  // Reason Type MANAGEMENT API LIST STARTS HERE //

  getReasonList() {
    return this.http.get(environment.baseurl + 'reason-management/getlist')
  }

  getReasonInfo(id) {
    return this.http.get(environment.baseurl + 'reason-management/getby_id/' + id);
  }

  createReason(data) {
    return this.http.post(environment.baseurl + 'reason-management/create', data);
  }

  updateReason(data) {
    return this.http.put(environment.baseurl + 'reason-management/update/' + data.id, data)
  }

  deleteReason(id) {
    return this.http.delete(environment.baseurl + 'reason-management/delete/' + id);
  }

  searchReasonList(data) {
    return this.http.post(environment.baseurl + 'reason-management/search', data)
  }


  // Reason Type MANAGEMENT API LIST ENDEDS HERE //



  // InfoCms Type MANAGEMENT API LIST STARTS HERE //

  getInfoCmsList() {
    return this.http.get(environment.baseurl + 'cms-main/info_cms/getlist')
  }

  getInfoCmsInfo(id) {
    return this.http.get(environment.baseurl + 'cms-main/info_cms/getby_id/' + id);
  }

  createInfoCms(data) {
    return this.http.post(environment.baseurl + 'cms-main/info_cms/create', data);
  }

  updateInfoCms(data) {
    console.log(data);

    return this.http.put(environment.baseurl + 'cms-main/info_cms/update/' + data.id, data)
  }

  deleteInfoCms(id) {
    return this.http.delete(environment.baseurl + 'cms-main/info_cms/delete/' + id);
  }

  searchInfoCmsList(data) {
    return this.http.post(environment.baseurl + 'cms-main/info_cms/search', data)
  }

  uploadLogoCms(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.baseurl + "cms-main/file", formData);
  }
  UploadSSLImg(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.baseurl + "cms-main/uploadSSLImg", formData);
  }
  UploadMasterCard(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.baseurl + "cms-main/uploadMasterCard", formData);
  }
  UploadVisaImg(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.baseurl + "cms-main/UploadVisaImg", formData);
  }


  UploadERPImg(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.baseurl + "cms-main/uploadMasterCard", formData);
  }

  viewUploadedImage(file) {
    return this.http.get(environment.baseurl + 'cms-main/viewimage?filename=' + file);
  }

  // InfoCms Type MANAGEMENT API LIST ENDEDS HERE //



  // InfoCms Type MANAGEMENT API LIST STARTS HERE //

  getBuyerSellerCmsInfo(id) {
    return this.http.get(environment.baseurl + 'cms-main/buyer_seller_cms/getby_id/' + id);
  }

  updateBuyerSellerCms(data) {
    return this.http.put(environment.baseurl + 'cms-main/buyer_seller_cms/update/' + data.id, data)
  }

  uploadBSCms(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.baseurl + "cms-main/buyer_seller_cms/file", formData);
  }

  // BUYER & SELLER MANAGEMENT API LIST ENDEDS HERE //



  // BANNER MANAGEMENT API LIST STARTS HERE //

  getBannerList() {
    return this.http.get(environment.baseurl + 'cms-main/banner_cms/getlist')
  }

  getBannerInfo(id) {
    return this.http.get(environment.baseurl + 'cms-main/banner_cms/getby_id/' + id);
  }

  createBanner(data) {
    return this.http.post(environment.baseurl + 'cms-main/banner_cms/create', data);
  }

  updateBanner(data) {
    return this.http.put(environment.baseurl + 'cms-main/banner_cms/update/' + data.id, data)
  }

  deleteBanner(id) {
    return this.http.delete(environment.baseurl + 'cms-main/banner_cms/delete/' + id);
  }

  searchBannerList(data) {
    return this.http.post(environment.baseurl + 'cms-main/banner_cms/search', data)
  }

  uploadBannerCms(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.baseurl + "cms-main/banner_cms/file", formData);
  }

  viewBannerImage(file) {
    return this.http.get(environment.baseurl + 'cms-main/banner_cms/viewimage?filename=' + file);
  }

  // BANNER MANAGEMENT API LIST ENDEDS HERE //


  // FEATURES MANAGEMENT API LIST STARTS HERE //

  getFeaturesList() {
    return this.http.get(environment.baseurl + 'cms-main/features_cms/getlist')
  }

  getFeaturesInfo(id) {
    return this.http.get(environment.baseurl + 'cms-main/features_cms/getby_id/' + id);
  }

  createFeatures(data) {
    return this.http.post(environment.baseurl + 'cms-main/features_cms/create', data);
  }

  updateFeatures(data) {
    return this.http.put(environment.baseurl + 'cms-main/features_cms/update/' + data.id, data)
  }

  deleteFeatures(id) {
    return this.http.delete(environment.baseurl + 'cms-main/features_cms/delete/' + id);
  }

  searchFeaturesList(data, collection_name) {
    data.collection = collection_name;
    return this.http.post(environment.baseurl + 'cms-main/features_cms/search', data)
  }

  searchAdvanceFilter(data) {
    console.log(data);
    return this.http.post(environment.baseurl + 'cms-main/features_cms/AdvanceFiltersearch', data)
  }

  uploadFeaturesCms(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.baseurl + "cms-main/features_cms/file", formData);
  }

  viewFeaturesImage(file) {
    return this.http.get(environment.baseurl + 'cms-main/features_cms/viewimage?filename=' + file);
  }

  // FEATURES MANAGEMENT API LIST ENDEDS HERE //


  // SERVICES MANAGEMENT API LIST STARTS HERE //

  getServicesList() {
    return this.http.get(environment.baseurl + 'cms-main/services_cms/getlist')
  }

  getServicesInfo(id) {
    return this.http.get(environment.baseurl + 'cms-main/services_cms/getby_id/' + id);
  }

  createServices(data) {
    return this.http.post(environment.baseurl + 'cms-main/services_cms/create', data);
  }

  updateServices(data) {
    return this.http.put(environment.baseurl + 'cms-main/services_cms/update/' + data.id, data)
  }

  deleteServices(id) {
    return this.http.delete(environment.baseurl + 'cms-main/services_cms/delete/' + id);
  }

  searchServicesList(data) {
    return this.http.post(environment.baseurl + 'cms-main/services_cms/search', data)
  }

  uploadServicesCms(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.baseurl + "cms-main/services_cms/file", formData);
  }

  viewServicesImage(file) {
    return this.http.get(environment.baseurl + 'cms-main/services_cms/viewimage?filename=' + file);
  }

  // SERVICES MANAGEMENT API LIST ENDEDS HERE //


  // ABOUT MANAGEMENT API LIST STARTS HERE //

  getaboutList() {
    return this.http.get(environment.baseurl + 'cms-main/hero_section_cms/getlist')
  }

  getabout(id) {
    return this.http.get(environment.baseurl + 'cms-main/hero_section_cms/getby_id/' + id);
  }

  createabout(data) {
    return this.http.post(environment.baseurl + 'cms-main/hero_section_cms/create', data);
  }

  updateabout(data) {
    return this.http.put(environment.baseurl + 'cms-main/hero_section_cms/update/' + data.id, data)
  }

  deleteabout(id) {
    return this.http.delete(environment.baseurl + 'cms-main/hero_section_cms/delete/' + id);
  }

  searchaboutList(data) {
    return this.http.post(environment.baseurl + 'cms-main/hero_section_cms/search', data)
  }

  // ABOUT MANAGEMENT API LIST ENDEDS HERE //



  // MediaLinks API LIST STARTS HERE //

  getMediaLinksList() {
    return this.http.get(environment.baseurl + 'cms-main/social_media_links_cms/getlist')
  }

  getMediaLinksList2() {
    return this.http.get(environment.baseurl + 'cms-main/social_media_links_cms/get_list_type_2')
  }

  getMediaLinksInfo(id) {
    return this.http.get(environment.baseurl + 'cms-main/social_media_links_cms/getby_id/' + id);
  }

  createMediaLinks(data) {
    return this.http.post(environment.baseurl + 'cms-main/social_media_links_cms/create', data);
  }

  updateMediaLinks(data) {
    return this.http.put(environment.baseurl + 'cms-main/social_media_links_cms/update/' + data.id, data)
  }

  deleteMediaLinks(id) {
    return this.http.delete(environment.baseurl + 'cms-main/social_media_links_cms/delete/' + id);
  }

  searchMediaLinksList(data) {
    return this.http.post(environment.baseurl + 'cms-main/social_media_links_cms/search', data)
  }

  uploadMediaLinksCms(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.baseurl + "cms-main/social_media_links_cms/file", formData);
  }


  // MediaLinks API LIST ENDEDS HERE //


  // UsefullLinks API LIST STARTS HERE //

  getUsefullLinksList() {
    return this.http.get(environment.baseurl + 'cms-main/useful_links_cms/getlist')
  }

  getUsefullLinksInfo(id) {
    return this.http.get(environment.baseurl + 'cms-main/useful_links_cms/getby_id/' + id);
  }

  createUsefullLinks(data) {
    return this.http.post(environment.baseurl + 'cms-main/useful_links_cms/create', data);
  }

  updateUsefullLinks(data) {
    return this.http.put(environment.baseurl + 'cms-main/useful_links_cms/update/' + data.id, data)
  }

  deleteUsefullLinks(id) {
    return this.http.delete(environment.baseurl + 'cms-main/useful_links_cms/delete/' + id);
  }

  searchUsefullLinksList(data) {
    return this.http.post(environment.baseurl + 'cms-main/useful_links_cms/search', data)
  }


  // Usefull Links API LIST ENDEDS HERE //


  // NavLinks API LIST STARTS HERE //

  getNavLinksList() {
    return this.http.get(environment.baseurl + 'cms-main/nav_links_cms/getlist')
  }

  getNavLinksInfo(id) {
    return this.http.get(environment.baseurl + 'cms-main/nav_links_cms/getby_id/' + id);
  }

  createNavLinks(data) {
    return this.http.post(environment.baseurl + 'cms-main/nav_links_cms/create', data);
  }

  updateNavLinks(data) {
    return this.http.put(environment.baseurl + 'cms-main/nav_links_cms/update/' + data.id, data)
  }

  deleteNavLinks(id) {
    return this.http.delete(environment.baseurl + 'cms-main/nav_links_cms/delete/' + id);
  }

  searchNavLinksList(data) {
    return this.http.post(environment.baseurl + 'cms-main/nav_links_cms/search', data)
  }


  // Nav Links API LIST ENDEDS HERE //


  // Mobile Section API LIST STARTS HERE //

  getMobileSectionList() {
    return this.http.get(environment.baseurl + 'cms-main/mobile_section_cms/getlist')
  }

  getMobileSectionInfo(id) {
    return this.http.get(environment.baseurl + 'cms-main/mobile_section_cms/getby_id/' + id);
  }

  createMobileSection(data) {
    return this.http.post(environment.baseurl + 'cms-main/mobile_section_cms/create', data);
  }

  updateMobileSection(data) {
    return this.http.put(environment.baseurl + 'cms-main/mobile_section_cms/update/' + data.id, data)
  }

  deleteMobileSection(id) {
    return this.http.delete(environment.baseurl + 'cms-main/mobile_section_cms/delete/' + id);
  }

  searchMobileSectionList(data) {
    return this.http.post(environment.baseurl + 'cms-main/mobile_section_cms/search', data)
  }


  uploadMobileSectionCms(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.baseurl + "cms-main/mobile_section_cms/file", formData);
  }


  // Nav Links API LIST ENDEDS HERE //


  // Category Request Status API LIST STARTS HERE //

  getCategoryRequestStatusList() {
    return this.http.get(environment.baseurl + 'status-management/category_request/getlist')
  }

  geCategoryRequestStatusInfo(id) {
    return this.http.get(environment.baseurl + 'status-management/category_request/getby_id/' + id);
  }

  createCategoryRequestStatus(data) {

    return this.http.post(environment.baseurl + 'status-management/category_request/create', data);
  }

  updateCategoryRequestStatus(data) {
    console.log(data);

    return this.http.put(environment.baseurl + 'status-management/category_request/update/' + data.id, data)
  }

  deleteCategoryRequestStatus(id) {
    return this.http.delete(environment.baseurl + 'status-management/category_request/delete/' + id);
  }

  searchCategoryRequestStatusList(data) {
    return this.http.post(environment.baseurl + 'status-management/category_request/search', data)
  }


  // Category Request Status API LIST ENDEDS HERE //



  // Make Offer Status API LIST STARTS HERE //

  getMakeOfferStatusList() {
    return this.http.get(environment.baseurl + 'status-management/make_offer/getlist')
  }

  geMakeOfferStatusInfo(id) {
    return this.http.get(environment.baseurl + 'status-management/make_offer/getby_id/' + id);
  }

  createMakeOfferStatus(data) {
    return this.http.post(environment.baseurl + 'status-management/make_offer/create', data);
  }

  updateMakeOfferStatus(data) {
    return this.http.put(environment.baseurl + 'status-management/make_offer/update/' + data.make_offer_status_id, data)
  }

  deleteMakeOfferStatus(id) {
    return this.http.delete(environment.baseurl + 'status-management/make_offer/delete/' + id);
  }

  searchMakeOfferStatusList(data) {
    return this.http.post(environment.baseurl + 'status-management/make_offer/search', data)
  }


  // Make Offer Status API LIST ENDEDS HERE //



  // Order Status API LIST STARTS HERE //

  getOrderStatusList() {
    return this.http.get(environment.baseurl + 'status-management/order/getlist')
  }

  geOrderStatusInfo(id) {
    return this.http.get(environment.baseurl + 'status-management/order/getby_id/' + id);
  }

  createOrderStatus(data) {
    return this.http.post(environment.baseurl + 'status-management/order/create', data);
  }

  updateOrderStatus(data) {
    return this.http.put(environment.baseurl + 'status-management/order/update/' + data.order_status_id, data)
  }

  deleteOrderStatus(id) {
    return this.http.delete(environment.baseurl + 'status-management/order/delete/' + id);
  }

  searchOrderStatusList(data) {
    return this.http.post(environment.baseurl + 'status-management/order/search', data)
  }


  // Order Status API LIST ENDEDS HERE //

  // Parts Request API LIST STARTS HERE //

  getPartsRequestStatusList() {
    return this.http.get(environment.baseurl + 'status-management/parts_req/getlist')
  }

  gePartsRequestStatusInfo(id) {
    return this.http.get(environment.baseurl + 'status-management/parts_req/getby_id/' + id);
  }

  createPartsRequestStatus(data) {
    return this.http.post(environment.baseurl + 'status-management/parts_req/create', data);
  }

  updatePartsRequestStatus(data) {
    return this.http.put(environment.baseurl + 'status-management/parts_req/update/' + data.parts_req_status_id, data)
  }

  deletePartsRequestStatus(id) {
    return this.http.delete(environment.baseurl + 'status-management/parts_req/delete/' + id);
  }

  searchPartsRequestStatusList(data) {
    return this.http.post(environment.baseurl + 'status-management/parts_req/search', data)
  }


  // Parts Request Status API LIST ENDEDS HERE //



  // Parts Request API LIST STARTS HERE //

  getPaymentStatusList() {
    return this.http.get(environment.baseurl + 'status-management/payment/getlist')
  }

  gePaymentStatusInfo(id) {
    return this.http.get(environment.baseurl + 'status-management/payment/getby_id/' + id);
  }

  createPaymentStatus(data) {
    return this.http.post(environment.baseurl + 'status-management/payment/create', data);
  }

  updatePaymentStatus(data) {
    return this.http.put(environment.baseurl + 'status-management/payment/update/' + data.payment_status_id, data)
  }

  deletePaymentStatus(id) {
    return this.http.delete(environment.baseurl + 'status-management/payment/delete/' + id);
  }

  searchPaymentStatusList(data) {
    return this.http.post(environment.baseurl + 'status-management/payment/search', data)
  }


  // Parts Request Status API LIST ENDEDS HERE //



  // Quotes Status API LIST STARTS HERE //

  getQuoteStatusList() {
    return this.http.get(environment.baseurl + 'status-management/quote/getlist')
  }

  geQuoteStatusInfo(id) {
    return this.http.get(environment.baseurl + 'status-management/quote/getby_id/' + id);
  }

  createQuoteStatus(data) {
    return this.http.post(environment.baseurl + 'status-management/quote/create', data);
  }

  updateQuoteStatus(data) {
    return this.http.put(environment.baseurl + 'status-management/quote/update/' + data.quote_status_id, data)
  }

  deleteQuoteStatus(id) {
    return this.http.delete(environment.baseurl + 'status-management/quote/delete/' + id);
  }

  searchQuoteStatusList(data) {
    return this.http.post(environment.baseurl + 'status-management/quote/search', data)
  }


  // Quotes Status API LIST ENDEDS HERE //


  // Registration Status API LIST STARTS HERE //

  getRegistrationStatusList() {
    return this.http.get(environment.baseurl + 'status-management/registration/getlist')
  }

  geRegistrationStatusInfo(id) {
    return this.http.get(environment.baseurl + 'status-management/registration/getby_id/' + id);
  }

  createRegistrationStatus(data) {
    return this.http.post(environment.baseurl + 'status-management/registration/create', data);
  }

  updateRegistrationStatus(data) {
    return this.http.put(environment.baseurl + 'status-management/registration/update/' + data.reg_status_id, data)
  }

  deleteRegistrationStatus(id) {
    return this.http.delete(environment.baseurl + 'status-management/registration/delete/' + id);
  }

  searchRegistrationStatusList(data) {
    return this.http.post(environment.baseurl + 'status-management/registration/search', data)
  }


  // Registration Status API LIST ENDEDS HERE //


  // Shipment Status API LIST STARTS HERE //

  getShipmentStatusList() {
    return this.http.get(environment.baseurl + 'status-management/shipment/getlist')
  }

  geShipmentStatusInfo(id) {
    return this.http.get(environment.baseurl + 'status-management/shipment/getby_id/' + id);
  }

  createShipmentStatus(data) {
    return this.http.post(environment.baseurl + 'status-management/shipment/create', data);
  }

  updateShipmentStatus(data) {
    return this.http.put(environment.baseurl + 'status-management/shipment/update/' + data.shipment_status_id, data)
  }

  deleteShipmentStatus(id) {
    return this.http.delete(environment.baseurl + 'status-management/shipment/delete/' + id);
  }

  searchShipmentStatusList(data) {
    return this.http.post(environment.baseurl + 'status-management/shipment/search', data)
  }


  // Shipment Status API LIST ENDEDS HERE //


  // SUBSCRIPTION PLAN MANAGEMENT API LIST STARTS HERE //

  getSubscriptionPlanList() {
    return this.http.get(environment.baseurl + 'subscription-plan-management/getlist')
  }

  getSubscriptionPlanInfo(id) {
    return this.http.get(environment.baseurl + 'subscription-plan-management/getby_id/' + id);
  }

  createSubscriptionPlan(data) {
    return this.http.post(environment.baseurl + 'subscription-plan-management/create', data);
  }

  updateSubscriptionPlan(data) {
    return this.http.put(environment.baseurl + 'subscription-plan-management/update/' + data.id, data)
  }

  deleteSubscriptionPlan(id) {
    return this.http.delete(environment.baseurl + 'subscription-plan-management/delete/' + id);
  }

  searchSubscriptionPlanList(data) {
    return this.http.post(environment.baseurl + 'subscription-plan-management/search', data)
  }


  // SUBSCRIPTION PLAN MANAGEMENT API LIST ENDEDS HERE //


  // TRADING TYPE MANAGEMENT API LIST STARTS HERE //

  getTradingTypeList() {
    return this.http.get(environment.baseurl + 'trading-type-management/getlist')
  }

  getTradingTypeInfo(id) {
    return this.http.get(environment.baseurl + 'trading-type-management/getby_id/' + id);
  }

  createTradingType(data) {
    return this.http.post(environment.baseurl + 'trading-type-management/create', data);
  }

  updateTradingType(data) {
    return this.http.put(environment.baseurl + 'trading-type-management/update/' + data.id, data)
  }

  deleteTradingType(id) {
    return this.http.delete(environment.baseurl + 'trading-type-management/delete/' + id);
  }

  searchTradingTypeList(data) {
    return this.http.post(environment.baseurl + 'trading-type-management/search', data)
  }


  // TRADING TYPE MANAGEMENT API LIST ENDEDS HERE //



  // USER TYPE MANAGEMENT API LIST STARTS HERE //

  getUserTypeList() {
    return this.http.get(environment.baseurl + 'user-type-management/getlist')
  }

  getUserTypeInfo(id) {
    return this.http.get(environment.baseurl + 'user-type-management/getby_id/' + id);
  }

  createUserType(data) {
    return this.http.post(environment.baseurl + 'user-type-management/create', data);
  }

  updateUserType(data) {
    return this.http.put(environment.baseurl + 'user-type-management/update/' + data.login_user_type_id, data)
  }

  deleteUserType(id) {
    return this.http.delete(environment.baseurl + 'user-type-management/delete/' + id);
  }

  searchUserTypeList(data) {
    return this.http.post(environment.baseurl + 'user-type-management/search', data)
  }


  // USER TYPE MANAGEMENT API LIST ENDEDS HERE //


  // SMS TEMPLATE MANAGEMENT API LIST STARTS HERE //

  getSMSList() {
    return this.http.get(environment.baseurl + 'sms_template/getlist')
  }

  getSMSInfo(id) {
    return this.http.get(environment.baseurl + 'sms_template/getby_id/' + id);
  }

  createSMS(data) {
    return this.http.post(environment.baseurl + 'sms_template/create', data);
  }

  updateSMS(data) {
    return this.http.put(environment.baseurl + 'sms_template/update/' + data.id, data)
  }

  deleteSMS(id) {
    return this.http.delete(environment.baseurl + 'sms_template/delete/' + id);
  }

  searchSMSList(data) {
    return this.http.post(environment.baseurl + 'sms_template/search', data)
  }


  // SMS TEMPLATE MANAGEMENT API LIST ENDS HERE //

  // EMAIL TEMPLATE MANAGEMENT API LIST STARTS HERE //

  getEmailList() {
    return this.http.get(environment.baseurl + 'email_template/getlist')
  }

  getEmailInfo(id) {
    return this.http.get(environment.baseurl + 'email_template/getby_id/' + id);
  }

  createEmail(data) {
    return this.http.post(environment.baseurl + 'email_template/create', data);
  }

  updateEmail(data) {
    return this.http.put(environment.baseurl + 'email_template/update/' + data.id, data)
  }

  deleteEmail(id) {
    return this.http.delete(environment.baseurl + 'email_template/delete/' + id);
  }

  searchEmailList(data) {
    return this.http.post(environment.baseurl + 'email_template/search', data)
  }


  // EMAIL TEMPLATE MANAGEMENT API LIST ENDS HERE //

  // Configuration Details MANAGEMENT API LIST STARTS HERE //

  getConfiguration_detailsList() {
    return this.http.get(environment.baseurl + 'template-management/configuration-details/getlist')
  }

  getConfiguration_detailsInfo(id) {
    return this.http.get(environment.baseurl + 'template-management/configuration-details/getby_id/' + id);
  }

  createConfiguration_details(data) {
    return this.http.post(environment.baseurl + 'template-management/configuration-details/create', data);
  }

  updateConfiguration_details(data) {
    return this.http.put(environment.baseurl + 'template-management/configuration-details/update/' + data.id, data)
  }

  deleteConfiguration_details(id) {
    return this.http.delete(environment.baseurl + 'template-management/configuration-details/delete/' + id);
  }

  searchConfiguration_detailsList(data) {
    return this.http.post(environment.baseurl + 'template-management/configuration-details/search', data)
  }


  // Configuration Details MANAGEMENT API LIST ENDS HERE //

  // Make Offer MANAGEMENT API LIST STARTS HERE //

  getMakeOfferList() {
    return this.http.get(environment.baseurl + 'status-management/make_offer/getlist')
  }

  getMakeOfferInfo(id) {
    return this.http.get(environment.baseurl + 'status-management/make_offer/getby_id/' + id);
  }

  createMakeOffer(data) {
    return this.http.post(environment.baseurl + 'status-management/make_offer/create', data);
  }

  updateMakeOffer(data) {
    return this.http.put(environment.baseurl + 'status-management/make_offer/update/' + data.id, data)
  }

  deleteMakeOffer(id) {
    return this.http.delete(environment.baseurl + 'status-management/make_offer/delete/' + id);
  }

  searchMakeOfferList(data) {
    return this.http.post(environment.baseurl + 'status-management/make_offer/search', data)
  }


  // MakeOffer TEMPLATE MANAGEMENT API LIST ENDS HERE //

}

