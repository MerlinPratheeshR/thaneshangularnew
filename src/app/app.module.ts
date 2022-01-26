import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AgGridModule } from 'ag-grid-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DataTablesModule } from 'angular-datatables';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './user-pages/home/home.component';
import { ContactComponent } from './user-pages/contact/contact.component';
import { FooterComponent } from './user-pages/footer/footer.component';
import { ForgotPasswordComponent } from './user-pages/forgot-password/forgot-password.component';
import { NavigationComponent } from './user-pages/navigation/navigation.component';
import { PricingComponent } from './user-pages/pricing/pricing.component';
import { ResetPasswordComponent } from './user-pages/reset-password/reset-password.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';

import { AdvanceFilterService } from './advance-filter.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AddbuyersComponent } from './addbuyers/addbuyers.component';
import { AddcarsComponent } from './addcars/addcars.component';
import { AddintermediatorComponent } from './addintermediator/addintermediator.component';
import { AddsellersComponent } from './addsellers/addsellers.component';
import { AddsettingsComponent } from './addsettings/addsettings.component';
import { AdminCommissionManagementComponent } from './admin-modules/admin-commission-management/admin-commission-management.component';
import { AdminMakeOfferManagementComponent } from './admin-modules/admin-make-offer-management/admin-make-offer-management.component';
import { AdminOrderManagementComponent } from './admin-modules/admin-order-management/admin-order-management.component';
import { AdminAddOrderComponent } from './admin-modules/admin-order-management/admin-add-order/admin-add-order.component';
import { AdminListOrdersComponent } from './admin-modules/admin-order-management/admin-list-orders/admin-list-orders.component';
import { AdminViewOrderDetailsComponent } from './admin-modules/admin-order-management/admin-view-order-details/admin-view-order-details.component';
import { AdminAddMakeOfferComponent } from './admin-modules/admin-make-offer-management/admin-add-make-offer/admin-add-make-offer.component';
import { AdminAddCommissionManagementComponent } from './admin-modules/admin-commission-management/admin-add-commission-management/admin-add-commission-management.component';
import { AdminBrandManagementComponent } from './admin-modules/admin-parts-management/admin-brand-management/admin-brand-management.component';
import { AdminCarManagementComponent } from './admin-modules/admin-parts-management/admin-car-management/admin-car-management.component';
import { AdminGroupManagementComponent } from './admin-modules/admin-parts-management/admin-group-management/admin-group-management.component';
import { AdminModelManagementComponent } from './admin-modules/admin-parts-management/admin-model-management/admin-model-management.component';
import { AdminParameterManagementComponent } from './admin-modules/admin-parts-management/admin-parameter-management/admin-parameter-management.component';
import { AdminSubGroupManagementComponent } from './admin-modules/admin-parts-management/admin-sub-group-management/admin-sub-group-management.component';
import { AdminSubNodeManagementComponent } from './admin-modules/admin-parts-management/admin-sub-node-management/admin-sub-node-management.component';
import { AddcountryComponent } from './admin-modules/app-features/addcountry/addcountry.component';
import { AdminAddCountryComponent } from './admin-modules/app-features/addcountry/admin-add-country/admin-add-country.component';
import { AddstateComponent } from './admin-modules/app-features/addstate/addstate.component';
import { AdminAddStateComponent } from './admin-modules/app-features/addstate/admin-add-state/admin-add-state.component';
import { AddcurrencyComponent } from './admin-modules/app-features/addcurrency/addcurrency.component';
import { AdminAddCurrencyComponent } from './admin-modules/app-features/addcurrency/admin-add-currency/admin-add-currency.component';

import { MatFormFieldModule } from "@angular/material/form-field";
import { AddpayoutScheduleComponent } from './admin-modules/app-features/addpayout-schedule/addpayout-schedule.component';
import { AdminAddPayoutScheduleComponent } from './admin-modules/app-features/addpayout-schedule/admin-add-payout-schedule/admin-add-payout-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    FooterComponent,
    ForgotPasswordComponent,
    NavigationComponent,
    PricingComponent,
    ResetPasswordComponent,
    LandingComponent,
    LoginComponent,
    DashboardComponent,
    AdminComponent,
    AddbuyersComponent,
    AddcarsComponent,
    AddintermediatorComponent,
    AddsellersComponent,
    AddsettingsComponent,
    AdminCommissionManagementComponent,
    AdminMakeOfferManagementComponent,
    AdminOrderManagementComponent,
    AdminAddOrderComponent,
    AdminListOrdersComponent,
    AdminViewOrderDetailsComponent,
    AdminAddMakeOfferComponent,
    AdminAddCommissionManagementComponent,
    AdminBrandManagementComponent,
    AdminCarManagementComponent,
    AdminGroupManagementComponent,
    AdminModelManagementComponent,
    AdminParameterManagementComponent,
    AdminSubGroupManagementComponent,
    AdminSubNodeManagementComponent,
    AddcountryComponent,
    AdminAddCountryComponent,
    AddstateComponent,
    AdminAddStateComponent,
    AddcurrencyComponent,
    AdminAddCurrencyComponent,
    AddpayoutScheduleComponent,
    AdminAddPayoutScheduleComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot(),
    CommonModule,
    AgGridModule,
    NgSelectModule,
    AngularEditorModule,
    NgxPaginationModule,
    FilterPipeModule,
    AutocompleteLibModule,
    DataTablesModule,
    FlexLayoutModule,
    NgChartsModule,
    MatFormFieldModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, AdvanceFilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
