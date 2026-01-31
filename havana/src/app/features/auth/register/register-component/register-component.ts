import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { AuthActions } from '../../../../store/actions/auth.actions';
import { selectError, selectLoading } from '../../../../store/reducers/auth.reducer';

@Component({
  selector: 'app-register-component',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.store.dispatch(AuthActions.signup({
        username: username!,
        email: email!,
        password: password!,
        role: 'ROLE_USER'
      }));
    }
    console.log(this.registerForm.value);
  }
}
