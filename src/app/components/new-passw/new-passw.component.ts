import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NewPasswService } from './new-passw.service';

@Component({
  selector: 'app-new-passw',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './new-passw.component.html',
  styleUrl: './new-passw.component.scss',
})
export class NewPasswComponent implements OnInit {
  NewPasswForm!: FormGroup;
  showPassword = false;
  token: string | null = null;
  serverError: string | null = null;
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private newPasswService: NewPasswService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.NewPasswForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.serverError = null;
    if (this.NewPasswForm.valid && this.token) {
      const password = this.NewPasswForm.value.password;
      this.newPasswService.resetPassword(this.token, password).subscribe({
        next: () => (this.success = true),
        error: (err: { error: { message: string; }; }) =>
          (this.serverError = err?.error?.message || 'Ошибка сброса пароля'),
      });
    } else {
      this.NewPasswForm.markAllAsTouched();
    }
  }
}
