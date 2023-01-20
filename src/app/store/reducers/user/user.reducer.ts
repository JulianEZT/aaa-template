import { createReducer, on } from '@ngrx/store';
import { logout, validateUser, validateUserError, validateUserSuccess } from '../../actions/user.action';


export interface UserState {
    isUser: boolean;
    text?: string;
    state?: number
}

export const initialState: UserState = { 
    isUser: (localStorage.getItem('isUser')) ? true : undefined 
}

export const userReducer = createReducer(
    initialState,
    on(validateUserSuccess, (state, { isUser }) => {
        if (isUser)
            localStorage.setItem('isUser', 'true');
        return { isUser }
    }),
    on(logout, (state) => {
        localStorage.removeItem('isUser');
        return { ...state, isUser: undefined };
    }),
    on(validateUserError, (state, { text, status } ) =>{
        return { text, status, isUser: false }
    }),
    on(validateUser, ( state ) => ({
        isUser: state.isUser 
    }))
)