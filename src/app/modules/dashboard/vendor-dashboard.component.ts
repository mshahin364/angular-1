import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorService } from './../admin/vendor/vendor.service';
import { DataService } from './../../services/data.service';
import { VendorContact } from './../admin/contact-profile-card/vendor-contact';
import { BreadcrumbHeaderService } from './../shared/breadcrumb-header/breadcrumb-header.service';


@Component({
    selector: 'ewo-vendor-dashboard',
    templateUrl: './vendor-dashboard.component.html',
})
export class VendorDashboardComponent implements OnInit {
    @Input() vendorContactId: any;

    vendor: any;
    insurances: any;
    files: any;
    primaryContact: any;
    contactInfo: VendorContact;

    constructor(
        private vendorService: VendorService,
        private dataService: DataService,
        private route: ActivatedRoute,
        private breadcrumbHeaderService: BreadcrumbHeaderService
    ) {}

    ngOnInit() {
        this.breadcrumbHeaderService.setBreadcrumbTitle('Vendor Desktop');
        this.getContactDetails(this.vendorContactId);
    }

    getContactDetails(contactId) {

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

                /*let tempContact = this.vendor.vendor_contacts.filter(data => {
                 return !data.isprimary_contact;
                 });*/

                this.vendor.contacts = this.vendor.vendor_contacts;
                this.getInsurances(this.vendor.id);
                this.getFiles(this.vendor.id);
            });
    }

    getPhotoUrl(contact) {
        return this.dataService.getPhotoUrl(contact.photo);
    }

    buildAddressHtml(contact) {
        return this.dataService.buildAddressHtml(contact, this.vendor.company_name);
    }

    updateInActivity(event) {
        this.getContactDetails(this.vendor.id);
    }

    /**
     * Get Insurance list by vendor
     */
    getInsurances(vendor_id) {
        this.vendorService.getInsurances(vendor_id).subscribe(
            data => {
                this.insurances = data.results;
            }
        );
    }

    /**
     * Get Files list by vednor
     */
    getFiles (vendor_id) {
        this.vendorService.getDocuments(vendor_id).subscribe(
            data => {
                this.files = data.results;
            }
        );
    }
}
