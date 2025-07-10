import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RegisterService } from './register.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;
  serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.serverError = null;
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.registerService.register(username, email, password).subscribe({
        next: (response) => {
          console.log('Успех:', response);
          // Можно добавить редирект или сброс формы
        },
        error: (err) => {
          console.log('Ошибка:', err);
          this.serverError =
            'Ошибка регистрации: ' +
            (err?.error?.message || 'Проверьте данные или попробуйте позже');
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
