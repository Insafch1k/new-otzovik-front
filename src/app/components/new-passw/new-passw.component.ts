import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-passw',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './new-passw.component.html',
  styleUrl: './new-passw.component.scss'
})
export class NewPasswComponent {
  NewPasswForm!: FormGroup;
  showPassword = false;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.NewPasswForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  onSubmit(): void {
    if (this.NewPasswForm.valid) {
      console.log('Форма отправлена:', this.NewPasswForm.value);
    }
  }

}

