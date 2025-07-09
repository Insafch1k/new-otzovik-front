import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-forgot-passw',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-passw.component.html',
  styleUrl: './forgot-passw.component.scss'
})
export class ForgotPasswComponent {
  authForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      console.log('Форма отправлена:', this.authForm.value);
    }
  }
}

