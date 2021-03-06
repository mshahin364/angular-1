import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorService } from './../../admin/vendor/vendor.service';
import { DataService } from './../../../services/data.service';
import { VendorContact } from "app/modules/admin/contact-profile-card/vendor-contact";
import { BreadcrumbHeaderService } from "app/modules/shared/breadcrumb-header/breadcrumb-header.service";
import { HeaderService } from "app/modules/shared/header/header.service";


@Component({
    selector: 'ewo-vendor-profile',
    templateUrl: './vendor-profile.component.html',
})
export class VendorProfileComponent implements OnInit {
    vendor: any;
    insurances: any;
    files: any;
    primaryContact: any;
    contactInfo: VendorContact;

    constructor(
        private vendorService: VendorService,
        private dataService: DataService,
        private route: ActivatedRoute,
        private headerService: HeaderService,
        private breadcrumbHeaderService: BreadcrumbHeaderService
    ) {
    }

    ngOnInit () {
        this.breadcrumbHeaderService.setBreadcrumbTitle('Vendor Profile');
        const contactId = this.route.snapshot.params['id'];
        this.getContactDetails(contactId);
        this.headerService.setDashBoardTitle({ title: 'VENDORS', link: ['/vendor'] });
        this.breadcrumbHeaderService.setBreadcrumbTitle('Vendor Profile');
    }

    getContactDetails (contactId) {

        this.vendorService.getContactDetails(contactId)
            .mergeMap(conact => this.vendorService.getVendor(conact.vendor), (contactInfo, vendorInfo) => ({ contactInfo, vendorInfo }))
            .subscribe(data => {
                this.primaryContact = data.contactInfo;
                this.vendor = data.vendorInfo;
                this.contactInfo = {
                    id: this.primaryContact.id,
                    first_name: this.primaryContact.first_name,
                    last_name: this.primaryContact.last_name,
                    title: this.primaryContact.title,
                    phone: this.primaryContact.phone,
                    phone_extension: this.primaryContact.phone_extension,
                    mobile: this.primaryContact.mobile,
                    photo: this.primaryContact.photo,
                    email: this.primaryContact.email,
                    companyName: this.vendor.company_name,
                    address: this.vendor.address,
                    city: this.vendor.city,
                    state: this.vendor.state,
                    postal_code: this.vendor.postal_code,
                }

                const tempContact = this.vendor.vendor_contacts.filter(data => {
                    return data.active;
                });

                this.vendor.contacts = tempContact;
                this.getInsurances(this.vendor.id);
                this.getFiles(this.vendor.id);
            });
    }

    getPhotoUrl (contact) {
        return this.dataService.getPhotoUrl(contact.photo);
    }

    buildAddressHtml (contact) {
        return this.dataService.buildAddressHtml(contact, this.vendor.company_name);
    }

    updateInActivity (event) {
        this.getContactDetails(this.route.snapshot.params['id']);
    }

    /**
     * Get Insurance list by vendor
     */
    getInsurances (vendor_id) {
        this.vendorService.getInsurances(vendor_id).subscribe(
            data => {
                this.insurances = data.results;
            }
        );
    }

    /**
     * Get Files list by vendor
     */
    getFiles (vendor_id) {
        this.vendorService.getDocuments(vendor_id).subscribe(
            data => {
                this.files = data.results;
            }
        );
    }
}
