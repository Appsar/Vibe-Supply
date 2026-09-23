import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);

  // Simple form group for the login form
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  // When trying to login validate that there is an email and password present and then login the user via the authservice login
  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    if (!email || !password) return;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/user']);
      },
      error: () => {
        this.errorMessage.set('Invalid email or password');
      },
    });
  }
}
