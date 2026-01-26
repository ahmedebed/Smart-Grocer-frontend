import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['', Validators.required],
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
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    // Cast form value to correct type to satisfy TypeScript
    const signupData = this.signupForm.value as {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      role: string;
    };

    this.authService.signup(signupData).subscribe({
      next: (res) => {
        this.loading = false;
        this.toastMessage = 'Signed up successfully!';
        this.toastType = 'success';

        setTimeout(() => {
          this.toastMessage = '';
          // Navigate to login after successful signup
          this.router.navigate(['/login']);
        }, 2000);

        this.signupForm.reset();
      },
      error: (err) => {
        this.loading = false;
        this.toastMessage = 'Signup failed. Try again!';
        this.toastType = 'error';

        setTimeout(() => (this.toastMessage = ''), 3000);

        this.errorMsg = err.error?.message || 'Something went wrong';
      }
    });
  }
}
