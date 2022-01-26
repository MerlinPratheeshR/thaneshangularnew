import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';

import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './user-pages/contact/contact.component';
import { ForgotPasswordComponent } from './user-pages/forgot-password/forgot-password.component';
import { HomeComponent } from './user-pages/home/home.component';
import { NavigationComponent } from './user-pages/navigation/navigation.component';
import { PricingComponent } from './user-pages/pricing/pricing.component';
import { ResetPasswordComponent } from './user-pages/reset-password/reset-password.component';
import { AddcountryComponent } from './admin-modules/app-features/addcountry/addcountry.component';
import { AdminAddCountryComponent } from './admin-modules/app-features/addcountry/admin-add-country/admin-add-country.component';
import { AddstateComponent } from './admin-modules/app-features/addstate/addstate.component';
import { AdminAddStateComponent } from './admin-modules/app-features/addstate/admin-add-state/admin-add-state.component';
import { AddcurrencyComponent } from './admin-modules/app-features/addcurrency/addcurrency.component';
import { AdminAddCurrencyComponent } from './admin-modules/app-features/addcurrency/admin-add-currency/admin-add-currency.component';
import { AddpayoutScheduleComponent } from './admin-modules/app-features/addpayout-schedule/addpayout-schedule.component';
import { AdminAddPayoutScheduleComponent } from './admin-modules/app-features/addpayout-schedule/admin-add-payout-schedule/admin-add-payout-schedule.component';

const routes: Routes = [
  { path: '', redirectTo: 'navigation', pathMatch: 'full' },
  {
    path: 'navigation', component: NavigationComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'pricing', component: PricingComponent },
    ]
  },
  { path: 'home', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthenticationGuard], children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'country-management', component: AddcountryComponent },
      { path: 'country-management/configure/:type/:id', component: AdminAddCountryComponent },
      { path: 'state-management', component: AddstateComponent },
      { path: 'state-management/configure/:type/:id', component: AdminAddStateComponent },
      { path: 'currency-management', component: AddcurrencyComponent },
      { path: 'currency-management/configure/:type/:id', component: AdminAddCurrencyComponent },
      {path:'payout-schedule-management', component:AddpayoutScheduleComponent},
      {path:'payout-schedule-management/configure/:type/:id', component:AdminAddPayoutScheduleComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
