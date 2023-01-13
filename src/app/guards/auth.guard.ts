import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { State } from "../model/state.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    isUser: boolean;
    constructor(private store: Store<State>, private router: Router) {
        this.store.subscribe(({ isUser }) => {
            this.isUser = isUser;
        })
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.isUser) {
            return this.isUser;
        } else {
            this.router.navigate(['/login'])
        }

    }
}