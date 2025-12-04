import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username: string = '';
  password: string = '';

  message: string = '';
  token: string | null = null;

  constructor(private authService: AuthService,
    private router: Router) { }

  onLogin() {
    if (!this.username || !this.password) {
      this.message = 'Please enter username & password.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.token = res.token;
        this.message = 'Login successful!';

        // Save auth state
        this.authService.setLoginState(this.username);

        // Navigate to home page
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.message = err.error?.message || 'Login error';
      }
    });
  }

  onLogout() {
    if (!this.token) return;

    this.authService.logout(this.token).subscribe({
      next: () => {
        this.authService.clearLoginState();
        this.token = null;
        this.router.navigate(['/login']);
      }
    });
  }

}
