import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormComponent } from '../../../components/commons/form/form.component';
import { TextInputComponent } from '../../../components/commons/form/text-input/text-input.component';
import { PasswordInputComponent } from '../../../components/commons/form/password-input/password-input.component';
import { ConfirmPasswordInputComponent } from '../../../components/commons/form/confirm-password-input/confirm-password-input.component';
import { EmailInputComponent } from '../../../components/commons/form/email-input/email-input.component';
import { ButtonComponent } from '../../../components/commons/button/button.component';
import { SignupService } from '../../../services/security/signup/signup.service';
import { InputSanitizerService } from '../../../services/input-sanitizer/input-sanitizer.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormComponent,
    TextInputComponent,
    EmailInputComponent,
    PasswordInputComponent,
    ConfirmPasswordInputComponent,
    ButtonComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private signupService: SignupService,
    private fb: FormBuilder,
    private router: Router,
    private sanitizer: InputSanitizerService
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    });
  }

  onSubmit() {
    const name = this.sanitizer.sanitize(this.signupForm.value.name);
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const pswConfirmation = this.signupForm.value.passwordConfirmation;
    if (password !== pswConfirmation) {
      return alert('Passwords must match');
    }
    this.signupService.setUser(name, email, password);
    this.signupService.signUp().subscribe({
      next: (userEntity) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert('An error occurred during signup. Please try again.');
      },
    });
  }
}
