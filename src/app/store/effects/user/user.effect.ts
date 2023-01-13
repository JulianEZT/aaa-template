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
                map((isUser: boolean) =>{
                    return validateUserSuccess({isUser})
                }),
                catchError(err => [validateUserError(err)])
            )
        )
    ));
}