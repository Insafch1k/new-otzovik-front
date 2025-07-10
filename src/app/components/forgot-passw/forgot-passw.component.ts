import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordChangeService } from './forgot-passw.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-forgot-passw',
  templateUrl: './forgot-passw.component.html',
  styleUrls: ['./forgot-passw.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class ForgotPasswComponent {
  forgotForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private passwordChangeService: PasswordChangeService,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotForm.get('email');
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.forgotForm.invalid) {
      return;
    }
    this.loading = true;

    this.passwordChangeService.sendResetLink(this.email?.value).subscribe({
      next: () => {
        this.successMessage =
          'Проверьте вашу почту — мы отправили ссылку для восстановления пароля.';
        this.loading = false;
      },
      error: (err: { error: { message: string; }; }) => {
        this.errorMessage =
          err?.error?.message ||
          'Ошибка при отправке письма. Попробуйте ещё раз.';
        this.loading = false;
      },
    });
  }
}
