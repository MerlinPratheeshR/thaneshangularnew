// @ts-nocheck

import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goto(location) {
    $.scrollTo($(location), 1000);
  }

}
