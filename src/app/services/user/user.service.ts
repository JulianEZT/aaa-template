import { Injectable, Output } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { User } from "src/app/model/user.model";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export let subject = new Subject<any>();

@Injectable({
    providedIn: 'root'
})
export class UserService{
    constructor(private http: HttpClient){}

    validateUser(user: User): Observable<boolean>{
        return new Observable(suscribe => {

            let respuesta = this.http.get('/api/users/login?username='+user.username+'&password='+user.password).subscribe( response => {
            let data = JSON.stringify(response)
            let respuesta = JSON.parse(data)
            console.log(respuesta)
            if(user.username === respuesta.username && user.password === respuesta.password){
                suscribe.next(true);
            }else{
                suscribe.next(false);
            }
           }, err => {
            subject.next({text: err.error, status: err.status});
            })
        })
    }

    public getMessage(): Observable<any> {
        return subject.asObservable();
      }


}