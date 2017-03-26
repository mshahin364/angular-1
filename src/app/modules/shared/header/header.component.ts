import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';
import { AuthenticationService } from "app/modules/authentication";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dashboarTitle: any;
  constructor(
    private authService: AuthenticationService,
    private headerService: HeaderService,
    private router: Router) {
    this.headerService.dashboardTitle$.subscribe(data => this.dashboarTitle = data);
  }

  ngOnInit() {
    this.headerService.setDashBoardTitle({ title: 'TICKETS', link: ['/'] });
  }

  onLinkClicked(event) {
    this.router.url == '/admin' && this.headerService.setDashBoardTitle({ title: 'TICKETS', link: ['/'] });
    this.router.url == '/admin/building' && this.headerService.setDashBoardTitle({ title: 'TICKETS', link: ['/'] });
    this.router.url == '/admin/problem-type' && this.headerService.setDashBoardTitle({ title: 'TICKETS', link: ['/'] });
    this.router.url == '/admin/tenant' && this.headerService.setDashBoardTitle({ title: 'TICKETS', link: ['/'] });
    this.router.url == '/admin/employee' && this.headerService.setDashBoardTitle({ title: 'TICKETS', link: ['/'] });
  }

  logOut() {
    this.authService.signout();
  }
}