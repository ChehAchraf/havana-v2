import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { AuthActions } from '../../../../store/actions/auth.actions';
import { selectError, selectLoading } from '../../../../store/reducers/auth.reducer';

@Component({
  selector: 'app-login-component',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  // Selectors
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(AuthActions.login({
        email: email!,
        password: password!
      }));
    }
  }
}
