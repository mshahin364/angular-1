import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";

@Injectable()
export class UpdatePeopleService {
    updatePeopleInfoSource = new Subject<string>();
    updatePeopleInfo$ = this.updatePeopleInfoSource.asObservable();

    setUpdatePeople(data: any) {
        this.updatePeopleInfoSource.next(data);
    }
}