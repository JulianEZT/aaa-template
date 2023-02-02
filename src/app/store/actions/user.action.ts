import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/model/user.model';

export const validateUser = createAction('[Users API] validate user', props<{user: User}>());
export const validateUserSuccess = createAction('validate user Success', props<{isUser: boolean, token: string}>());
export const validateUserError = createAction('validate user error', props<{text: string, status: number}>());
export const logout = createAction('logout');