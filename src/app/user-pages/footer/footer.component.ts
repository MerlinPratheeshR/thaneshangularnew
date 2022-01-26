// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { AdminModuleService } from '../../admin-module.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  logoUrl: any;
  contact: any;
  email: any;
  description: any;
  medialinksList: any;
  UsefullLinksList: any;
  NavLinksList: any;
  footer_image1: any;
  footer_image2: any;
  footer_image3: any;
  dynamics_image: any;
  copyrights: any;

  constructor(private adminService: AdminModuleService) { }

  ngOnInit(): void {
    this.adminService.getInfoCmsInfo(1).subscribe(data => {
      if (data['success']) {
        console.log(data);
        this.logoUrl = data['data'].logo;
        this.description = data['data'].description;
        this.contact = data['data'].contact;
        this.email = data['data'].email;
        this.footer_image1 = data['data'].footer_image1;
        this.footer_image2 = data['data'].footer_image2;
        this.footer_image3 = data['data'].footer_image3;
        this.dynamics_image = data['data'].dynamics_image;
        this.copyrights = data['data'].copyrights;
      } else {

      }
    });

    this.adminService.getMediaLinksList2().subscribe(async data => {
      let mediaLinksList2 = data['data'].filter(item => item.status == true);
      if (data['success']) {
        this.medialinksList = await mediaLinksList2;
      } else {
        this.medialinksList = [];
      }
    });

    this.adminService.getUsefullLinksList().subscribe(async data => {
      let usefullLinksList = data['data'].filter(item => item.status == true);
      if (data['success']) {
        this.UsefullLinksList = await usefullLinksList;
      } else {
        this.UsefullLinksList = [];
      }
    });

    this.adminService.getNavLinksList().subscribe(async data => {
      let usefullLinksList = data['data'].filter(item => item.status == true);
      if (data['success']) {
        this.NavLinksList = await usefullLinksList;
      } else {
        this.NavLinksList = [];
      }
    });
  }

}
