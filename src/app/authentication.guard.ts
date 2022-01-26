// @ts-nocheck

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private Auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.Auth.gettoken()) {
      this.router.navigateByUrl("/login");
    }
    return this.Auth.gettoken();
  }
}