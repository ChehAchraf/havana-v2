import {createActionGroup, emptyProps, props} from '@ngrx/store';


export const AuthActions = createActionGroup({
    source: 'Auth API',
    events : {
        'login' : props<{email: string, password: string}>(),
        'signup' : props<{username : string, email : string , password : string, role : "ROLE_USER"}>(),
        'login Success': props<{token : string,role:string}>(),
        'login Failure': props<{error : string}>(),    
        'signup Success': props<{token : string,role:string}>(),
        'signup Failure': props<{error : string}>(),
        'logout' : emptyProps()
    }
})
