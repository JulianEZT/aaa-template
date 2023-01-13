import { createReducer, on } from '@ngrx/store';
import { logout, validateUserSuccess } from '../../actions/user.action';


export const initialState: boolean = (localStorage.getItem('isUser'))?true:undefined;

export const userReducer = createReducer(
    initialState,
    on(validateUserSuccess, (state, { isUser }) => {
        console.log(localStorage.getItem('isUser'));
        if (isUser)
            localStorage.setItem('isUser', 'true');
        return isUser
    }),
    on(logout, (state) => {
        localStorage.removeItem('isUser');
        return undefined;
    })
)