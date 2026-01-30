import {createFeature, createReducer, on} from '@ngrx/store';
import {AuthActions} from '../actions/auth.actions';

export interface AuthState{
    token : string | null,
    role : string | null,
    loading : boolean
    error : string | null

}

const initialState : AuthState = {
    token : null,
    role : null,
    loading: false,
    error : null
}

export const authFeature = createFeature({
    name : 'auth',
    reducer: createReducer(
        initialState,
        on(AuthActions.login, (state) => ({
            ...state,
            loading: true,
            error: null
        })),
        on(AuthActions.loginSuccess, (state, { token, role }) => ({
            ...state,
            token,
            role,
            loading: false,
            error: null
        })),
        on(AuthActions.loginFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error
        })),
        on(AuthActions.signup, (state) => ({
            ...state,
            loading: true,
            error: null
        })),
        on(AuthActions.signupSuccess, (state, { token, role }) => ({
            ...state,
            token,
            role,
            loading: false,
            error: null
        })),
        on(AuthActions.signupFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error
        })),
        on(AuthActions.logout, (state) => ({
            ...state,
            token: null,
            role: null,
            loading: false,
            error: null
        }))
    )
})

export const {
    selectToken,
    selectRole,
    selectLoading,
    selectError,
    selectAuthState
} = authFeature
