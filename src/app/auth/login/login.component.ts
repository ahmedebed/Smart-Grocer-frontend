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
    // Stop submission if form is invalid
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    // Cast form value to correct type to satisfy TypeScript
    const loginData = this.loginForm.value as { email: string; password: string };

    this.authService.login(loginData).subscribe({
      next: (res) => {
        this.loading = false;
        this.toastMessage = 'Login successful!';
        this.toastType = 'success';

        this.authService.saveToken(res.token);

        const role = this.authService.getRoleFromToken();

        setTimeout(() => {
          this.toastMessage = '';

          if (role === 'ADMIN_ROLE') {
            this.router.navigate(['/external-meals']);
          } else {
            this.router.navigate(['/my-meals']);
          }

        }, 1000);
      },
      error: (err) => {
        this.loading = false;
        this.toastMessage = 'Login failed. Try again!';
        this.toastType = 'error';
        this.errorMsg = err.error?.message || 'Something went wrong';

        setTimeout(() => (this.toastMessage = ''), 3000);
      }
    });
  }
}
