import { UserState } from "../store/reducers/user/user.reducer";

export interface State{
    readonly userState: UserState;
}