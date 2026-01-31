import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { Router } from "@angular/router";
import { AuthActions } from "../actions/auth.actions";
import { AuthService } from "../../core/service/auth-service";

@Injectable()
export class AuthEffects {

    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap((action) =>
                this.authService.login({ email: action.email, password: action.password }).pipe(
                    map(response => AuthActions.loginSuccess({
                        token: response.token,
                        role: response.role
                    })),
                    catchError((error) => of(AuthActions.loginFailure({
                        error: error.error?.message || 'Login failed'
                    })))
                )
            )
        )
    );

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap((action) => {
                localStorage.setItem('token', action.token);
                localStorage.setItem('role', action.role);
                this.router.navigate(['/']);
            })
        ),
        { dispatch: false }
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                this.router.navigate(['/login']);
            })
        ),
        { dispatch: false }
    );

    signup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.signup),
            exhaustMap((action) =>
                this.authService.register({
                    username: action.username,
                    email: action.email,
                    password: action.password,
                    role: action.role
                }).pipe(
                    map(response => AuthActions.signupSuccess({
                        token: response.token,
                        role: response.role
                    })),
                    catchError((error) => of(AuthActions.signupFailure({
                        error: error.error?.message || 'Registration failed'
                    })))
                )
            )
        )
    );

    signupSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.signupSuccess),
            tap((action) => {
                localStorage.setItem('token', action.token);
                localStorage.setItem('role', action.role);
                this.router.navigate(['/']);
            })
        ),
        { dispatch: false }
    );
}