import { Injectable, Output } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { User } from "src/app/model/user.model";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export let subject = new Subject<any>();

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    validateUser(user: User): Observable<any> {

        return this.http.get('http://localhost:3000/login?username=' + user.username + '&password=' + user.password)
    }

    public getMessage(): Observable<any> {
        return subject.asObservable();
    }


}