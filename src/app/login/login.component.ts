// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService) {
    this.LoginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  async login() {
    if (this.LoginForm.valid) {
      this.auth.login(this.LoginForm.value).subscribe((data) => {
        if (data['success']) {
          this.router.navigateByUrl('admin/dashboard');
          localStorage.setItem('user', data['token']);
        } else {
          this.showError(data['msg']);
        }
      });
    } else {
      this.showError('Please Enter Valid Email and Password');
    }
  }

  showSuccess(msg: String) {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: msg,
    })
  }

  showError(msg: String) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: msg,
    })
  }

  showWarning(msg: String) {
    Swal.fire({
      icon: 'warning',
      title: 'Check',
      text: msg,
    })
  }
}
