// @ts-nocheck

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
//import { OwlOptions } from 'ngx-owl-carousel-o';
//import 'owl.carousel';
import { AdminModuleService } from 'src/app/admin-module.service';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.min.js'
//import { ComponentFixtureAutoDetect } from '@angular/core/testing';

declare var $: any;
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

	/*customOptions: OwlOptions = {
		loop: true,
		autoplay: true,
		center: true,
		dots: true,
		animateOut: 'animate__slideOutDown',
		animateIn: 'animate__slideInDown',
		autoHeight: true,
		autoWidth: true,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: false,
		navSpeed: 700,
		margin: 0,
		nav: false,
		dotsData: true,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		responsive: {
			0: {
				items: 1
			},
			400: {
				items: 1
			},
			740: {
				items: 1
			},
			940: {
				items: 1
			},
			1440: {
				items: 1
			}
		}
	}*/
	logoUrl: any;
	contact: any;
	email: any;
	featuresLoaded: boolean;
	FeaturesList: any;
	hero_title: any;
	hero_sub_title: any;
	hero_content: any;
	hero_link: any;
	ServicesList: any;
	BannerList: any;
	buyer_title: any;
	buyer_content: any;
	buyer_link: any;
	buyer_image: any;
	seller_title: any;
	seller_content: any;
	seller_link: any;
	seller_image: any;
	imageUploaded1: boolean;
	imageUploaded2: boolean;
	NavLinksList: any;
	playstore_link: any;
	applestore_link: any;
	mobile_section_title: any;
	mobile_section_content: any;
	mobile_section_image: any;
	mobileSecList: any;
	imageLink: any;
	bannerId: any;
	bannertitle: any;
	bannercontent: any;
	orientation: string = (window.innerHeight > window.innerWidth) ? "portrait" : "landscape";

	constructor(private adminService: AdminModuleService) {



	}

	ngOnInit(): void {
		/*$('.home-slider').owlCarousel({
			loop: true,
			autoplay: true,
			margin: 0,
			animateOut: 'animate__slideOutDown',
			animateIn: 'animate__slideInDown',
			nav: false,
			dots: true,
			autoplayHoverPause: true,
			items: 1,
			navText: ["<span class='fa fa-chevron-left'></span>", "<span class='fa fa-chevron-right'></span>"],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 1
				},
				1000: {
					items: 1
				}
			}
		});*/
		/*get getOrientation(){
			return (window.innerHeight > window.innerWidth) ? "portrait" : "landscape";
		}*/
		this.adminService.getBannerList().subscribe(async data => {
			console.log(data);

			let bannerList = data['data'].filter(item => item.status == true);
			console.log("bannerList", data['data']);
			if (data['success']) {


				$(function () {
					let $div = $(".carousel-inner");
					let $indicators = $(".carousel-indicators");

					let active = "active";
					let orientation = (window.innerHeight > window.innerWidth) ? "portrait" : "landscape";
					console.log(bannerList);
					bannerList.forEach((x, i) => {
						if (orientation === 'landscape') {
							$div.append($("<div class='carousel-item landscape " + active + "'>\
								<div class='position-relative'> \
									<img src='" + (x.landscapeurl !== '' ? x.landscapeurl : x.portraiturl) + "' />\
									<div class='title'>"+ x.title + "</div> \
									<div class='description'>"+ x.content + "</div>\
								</div>\
							</div>"));
						}
						else if (orientation === 'portrait') {
							$div.append($("<div class='carousel-item portrait " + active + "'>\
								<div class='position-relative'> \
									<div class='title'>"+ x.title + "</div> \
									<div class='description'>"+ x.content + "</div>\
									<img src='" + (x.portraiturl !== '' ? x.portraiturl : x.landscapeurl) + "' />\
								</div>\
							</div>"));
						}
						else if (x.videourl !== '') {
							$div.append($("<div class='carousel-item landscape " + active + "'>\
							<div class='position-relative'> \
							<video controls autoplay muted><source src='" + x.videourl + "'></source></video>\
							<div class='title'>"+ x.title + "</div> \
							<div class='description'>"+ x.content + "</div>\
							</div>"));
							/*<img style=height:120vh;width:100vw;  src='" + x.videourl + "' />*/
						}
						$indicators.append(`<button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="${i}" class="${active}" aria-current="${active === 'active' ? true : false}" aria-label="${x.title}"></button>`)
						active = "";
					});
					$("#hero-carousel").carousel({ interval: 1000 * 5 });
				})




				this.BannerList = await bannerList;


				for (let i = 0; i < this.BannerList.length; i++) {


					if (this.BannerList[i].filetype == "image") {

						this.imageLink = this.BannerList[i]?.landscapeurl;

						console.log('image', this.imageLink);

					}
					if (this.BannerList[i].filetype == "video") {

						this.imageLink = this.BannerList[i]?.videourl;

						console.log('video', this.imageLink);

					}
				}

				console.log(this.imageLink);



			} else {


				this.BannerList = [];
			}
		});

		this.adminService.getInfoCmsInfo(1).subscribe(data => {
			if (data['success']) {
				console.log(data);
				this.logoUrl = data['data'].logo;
				this.contact = data['data'].contact;
				this.email = data['data'].email;
				this.playstore_link = data['data'].playstore_link;
				this.applestore_link = data['data'].applestore_link;
			} else {

			}
		});

		this.adminService.getFeaturesList().subscribe(async data => {
			console.log(data);

			//let featuresList = data['data'].filter(item => item.status == false);
			if (data['success']) {
				this.FeaturesList = await data['data'];

				console.log(this.FeaturesList);

				this.featuresLoaded = true;
			} else {
				this.FeaturesList = [];
				this.featuresLoaded = false;
			}
		});

		this.adminService.getabout(1).subscribe(data => {
			if (data['success']) {
				this.hero_title = data['data'].title;
				this.hero_sub_title = data['data'].sub_title;
				this.hero_content = data['data'].content;
				this.hero_link = data['data'].link;
			} else {

			}
		});

		this.adminService.getServicesList().subscribe(async data => {
			let servicesList = data['data'].filter(item => item.status == true);
			if (data['success']) {
				this.ServicesList = await servicesList;
			} else {
				this.ServicesList = [];
			}
		});

		this.adminService.getBuyerSellerCmsInfo(1).subscribe(data => {
			if (data['success']) {
				this.buyer_title = data['data'].buyer_title,
					this.buyer_content = data['data'].buyer_content,
					this.buyer_link = data['data'].buyer_link,
					this.buyer_image = data['data'].buyer_image,
					this.seller_title = data['data'].seller_title,
					this.seller_content = data['data'].seller_content,
					this.seller_link = data['data'].seller_link,
					this.seller_image = data['data'].seller_image
			} else {
				this.imageUploaded1 = false;
				this.imageUploaded2 = false;
			}
		});

		this.adminService.getNavLinksList().subscribe(async data => {
			let navLinksList = data['data'].filter(item => item.status == true);
			if (data['success']) {
				this.NavLinksList = await navLinksList;
			} else {
				this.NavLinksList = [];
			}
		});
		this.adminService.getMobileSectionList().subscribe(async data => {
			let mobileSecList = data['data'].filter(item => item.status == true);
			this.mobile_section_title = mobileSecList[0]['title'];
			this.mobile_section_content = mobileSecList[0]['content'];
			this.mobile_section_image = mobileSecList[0]['image'];
		});

		/*this.adminService.getMobileSectionInfo(6).subscribe(data => {
			if (data['success']) {
				this.mobile_section_title = data['data']['title'];
				this.mobile_section_content = data['data']['content'];
				this.mobile_section_image = data['data']['image'];
			} else {

			}
		});*/
	}







}
