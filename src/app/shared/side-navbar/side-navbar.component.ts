import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent {

  constructor(public authService: AuthService) {}

  isAdmin(): boolean {
    return this.authService.getRoleFromToken() === 'ADMIN_ROLE';
  }
}
