// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModuleService } from '../admin-module.service';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  imgurl: any;
  brandname: any;
  companyname: any;
  tagline: any;
  description: any;
  email: any;
  mobile: any;
  whatsapp: any;
  facebook: any;
  linkedin: any;
  twitter: any;
  address: any;
  iframe: any;
  prp: any;
  trc: any;
  scrollTop: any;
  logoUrl: any;
  contact: any;
  playstore_link: any;
  applestore_link: any;
  copyrights: any;

  constructor(private toastr: ToastrManager, private router: Router, private adminService: AdminModuleService) { }

  ngOnInit(): void {

    this.adminService.getInfoCmsInfo(1).subscribe(data => {
      if (data['success']) {
        console.log(data);
        this.logoUrl = data['data'].logo;
        this.contact = data['data'].contact;
        this.email = data['data'].email;
        this.playstore_link = data['data'].playstore_link;
        this.applestore_link = data['data'].applestore_link;
        this.copyrights = data['data'].copyrights;
      } else {

      }
    });

    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on('click', function (e: any) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $('.sidebar .collapse').collapse('hide');
      };
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(function () {
      if ($(window).width() < 768) {
        $('.sidebar .collapse').collapse('hide');
      };

      // Toggle the side navigation when window is resized below 480px
      if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
        $("body").addClass("sidebar-toggled");
        $(".sidebar").addClass("toggled");
        $('.sidebar .collapse').collapse('hide');
      };
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', (e: any) => {
      if ($(window).width() > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });
    // $(document).on('scroll', () => {
    //   var scrollDistance = $(this).scrollTop();
    //   if (scrollDistance > 100) {
    //     $('.scroll-to-top').fadeIn();
    //   } else {
    //     $('.scroll-to-top').fadeOut();
    //   }
    // });

    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', (e: any) => {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top)
      }, 1000, 'easeInOutExpo');
      e.preventDefault();
    });
  }

  logout() {
    const tdata = {
      id: localStorage.getItem('id'),
      token: localStorage.getItem('token')
    };
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
