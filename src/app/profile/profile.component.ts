import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';

type ProfileDto = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loading = true;
  saving = false;

  successMsg = '';
  errorMsg = '';
  role = '';

  editMode = false;
  private originalData: { firstName: string; lastName: string; email: string } | null = null;

  profileForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (res: ProfileDto) => {
        this.profileForm.patchValue({
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email
        });

        this.role = res.role;

        // Save original snapshot
        this.originalData = this.profileForm.getRawValue();

        // Start in read-only mode
        this.profileForm.disable({ emitEvent: false });
        this.editMode = false;

        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load profile';
        setTimeout(() => (this.errorMsg = ''), 3000);
        this.loading = false;
      }
    });
  }

  isInvalid(controlName: 'firstName' | 'lastName' | 'email') {
    const c = this.profileForm.get(controlName);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  enableEdit() {
    this.errorMsg = '';
    this.successMsg = '';

    this.editMode = true;
    this.profileForm.enable({ emitEvent: false });
  }

  cancelEdit() {
    if (this.originalData) {
      this.profileForm.patchValue(this.originalData);
    }
    this.profileForm.markAsPristine();
    this.profileForm.markAsUntouched();

    this.profileForm.disable({ emitEvent: false });
    this.editMode = false;
  }

  save() {
    if (!this.editMode) return; // safety

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.saving = true;

    const payload = this.profileForm.getRawValue();

    this.profileService.updateProfile(payload).subscribe({
      next: () => {
        this.successMsg = 'Profile updated successfully ✅';
        setTimeout(() => (this.successMsg = ''), 3000);

        this.errorMsg = '';

        // Update snapshot
        this.originalData = payload;

        // Back to read-only
        this.profileForm.disable({ emitEvent: false });
        this.editMode = false;

        this.saving = false;
      },
      error: () => {
        this.errorMsg = 'Update failed ❌';
        setTimeout(() => (this.errorMsg = ''), 3000);

        this.successMsg = '';
        this.saving = false;
      }
    });
  }
}
