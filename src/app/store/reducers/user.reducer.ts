import { createReducer, on } from '@ngrx/store';
import { validateUserSuccess } from '../actions/user.action';

export const initialState = false;

export const userReducer = createReducer(
    initialState,
    on(validateUserSuccess, (state, {isUser}) => isUser)
)