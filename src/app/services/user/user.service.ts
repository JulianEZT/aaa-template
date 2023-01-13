import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { User } from "src/app/model/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    constructor(){}

    validateUser(user: User): Observable<boolean>{
        return new Observable(suscribe => {
            if(user.username === 'Julian' && user.password == '12345'){
                suscribe.next(true);
            }else{
                suscribe.next(false);
            }
        })
    }
}