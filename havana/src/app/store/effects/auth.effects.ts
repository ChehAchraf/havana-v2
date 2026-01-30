import { inject, Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { AuthService } from "../../core/service/auth-service";


@Injectable()
export class AuthEffetcs{
    private action$ = inject(Actions)
    private authService = inject(AuthService)
}
