import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from '../../../components/commons/button/button.component';
import { EmailInputComponent } from '../../../components/commons/form/email-input/email-input.component';
import { FormComponent } from '../../components/../commons/form/form.component';
import { PasswordInputComponent } from '../../../components/commons/form/password-input/password-input.component';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/security/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormComponent,
    EmailInputComponent,
    PasswordInputComponent,
    ButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.setUserCredentials(email, password);
    this.authService.login().subscribe({
      next: (token) => {
        this.authService.token = token;
        this.authService.isAuthenticated = true;
        this.router.navigate(['/workspace']);
      },
      error: (error) => {
        alert(
          'Login failed. Please check your email and password and try again.'
        );
        this.authService.isAuthenticated = false;
      },
    });
  }

  handleClick() {
    const imgContainer = document.querySelector('.imgContainer');
    const formContainer = document.querySelector('.loginForm');
    imgContainer?.classList.add('unstage');
    formContainer?.classList.add('unstage');
    setTimeout(() => {
      this.router.navigate(['/signup']);
    }, 510);
  }
}
