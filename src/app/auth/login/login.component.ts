import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loading = false;
  errorMsg = '';
  toastMessage: string = '';
  toastType: 'success' | 'error' | '' = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    const loginData = this.loginForm.value as {
      email: string;
      password: string;
    };

    this.authService.login(loginData).subscribe({
      next: (res) => {
        this.loading = false;

        this.authService.saveToken(res.token);

        const role = this.authService.getRoleFromToken();

        if (role === 'ADMIN_ROLE') {
          this.router.navigate(['/external-meals']);
        } else {
          this.router.navigate(['/meals']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error?.message || 'Invalid email or password';
      }
    });
  }
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
