import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { UserService } from "src/app/services/user/user.service";
import { validateUser, validateUserError, validateUserSuccess } from "../../actions/user.action";

@Injectable()
export class UserEffect {
    constructor(private userService: UserService, private actions$: Actions) { }

    validateUser$ = createEffect(() => this.actions$.pipe(
        ofType(validateUser),
        mergeMap(({user}) => this.userService.validateUser(user)
            .pipe(
                map((isUser: any) =>{
                    return validateUserSuccess({isUser: true})
                }),
                catchError((err: HttpErrorResponse)  => {
                    return [validateUserError({ text: err.error, status: err.status })]
                })
            )
        )
    ));
}