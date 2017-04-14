import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToasterService } from 'angular2-toaster';
// import { NotificationService } from '../../services/notification.service';
import { Observable } from 'rxjs/Observable';

import { Employee } from '../../../interfaces/employee.interface';


import {
    AppHttp,
    DataService,
    EventService,
    NotificationService,

} from '../../../services';

@Injectable()
export class EmployeeService extends DataService {

    constructor(
        protected http: AppHttp,
        protected events: EventService,
        private notifications: NotificationService,
        private toasterService: ToasterService
    ) {
        super(events);
    }

    create (data?: any): Observable<Employee> {
        data = Object.assign({}, data);

        // POST '/employee'
        const observable = this.http.post('employee/', data);

        observable.subscribe(data => {
            // this.toasterService.pop('success', 'ADD', 'Employee has been saved successfully');
            // console.log(data);
        },
            error => {
                // this.toasterService.pop('error', 'ADD', 'Employee not Saved due to API error!!!');
                console.log(error);
            });

        return observable;
    }

    createWithFile (formData: FormData): Observable<any> {
        const observable = this.http.postWithFile('employee/', formData);
        observable.subscribe(data => {
            // console.log(data);
        });
        return observable;
    }

    update (data?: any): Observable<Employee> {
        data = Object.assign({}, data);

        // PUT '/employee'
        const observable = this.http.patch(data.url, data);

        observable.subscribe(data => {
            // this.toasterService.pop('success', 'UPDATE', 'Employee has been updated successfully');
            console.log(data);
        },
            error => {
                // this.toasterService.pop('error', 'UPDATE', 'Employee not updated due to API error!!!');
                console.log(error);
            });

        return observable;
    }

    updateWithFile (url, formData: FormData): Observable<any> {
        const observable = this.http.putWithFile(url, formData);
        observable.subscribe(data => {
            // console.log('Updated Employee Info: ' + data);
        });
        return observable;
    }

    /**
     * Get All employee by Company Id
     * @returns {Observable<any>}
     */
    getAllEmployees (company_id) {
        const observable = this.http.get('employee/', { company_id: company_id, ordering: 'last_name, first_name' });
        observable.subscribe(data => {
            // console.log(data);
        });
        return observable;
    }

    /**
     * Get All active employee by Company Id
     * @returns {Observable<any>}
     */
    getAllActiveEmployees (company_id) {
        const observable = this.http.get('employee/', { company_id: company_id, active: true, ordering: 'last_name, first_name' });
        observable.subscribe(data => {
            // console.log(data);
        });
        return observable;
    }

    /**
     * Get All employee by Company Id
     * @returns {Observable<any>}
     */
    getEmployeeById (contact_id) {
        const observable = this.http.get(`employee/${contact_id}/`);
        observable.subscribe(data => {
            // console.log('Employee Data: ', data);
        });
        return observable;
    }

    getEmployeeByIdByUrl (url) {
        const observable = this.http.get(url);
        observable.subscribe(data => {
            // console.log('Employee Data: ', data);
        });
        return observable;
    }

    /**
     * Get Employee company by Company Id
     * @returns {Observable<any>}
     */
    getCompanyById (companyId: any) {
        const observable = this.http.get(companyId);
        observable.subscribe(data => {
            // console.log('Company Data: ', data);
        });
        return observable;
    }

    get (url: string) {
        return this.http.get(url);
    }

    postToS3 (url: string, postData: FormData): Observable<any> {
        return this.http.postToS3(url, postData);
    }

    putToS3 (url: string, postData: FormData): Observable<any> {
        return this.http.putToS3(url, postData);
    }
}
