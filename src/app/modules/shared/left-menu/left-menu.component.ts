import { Component, OnInit, Input } from '@angular/core';
import { Storage } from "app/services";

@Component({
    selector: 'app-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

    constructor(private storage: Storage) { }
    @Input() userInfo: any;
    @Input() contactStat: any;

    ngOnInit() {
        // this.userInfo = this.storage.getUserInfo();
    }
}
