import { Component, HostListener } from '@angular/core';
import { LayoutService } from '../layout.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent {

  isUserMenuOpen = false;

  constructor(
    public layout: LayoutService,
    public auth: AuthService,
    private router: Router
  ) {}

  toggleSidebar() {
    this.layout.toggle();
  }

  getInitials(): string {
    const name = this.auth.getInitialsFromSub?.() || 'User';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu() {
    this.isUserMenuOpen = false;
  }

  onAvatarWrapClick(event: Event) {
    event.stopPropagation();
    this.toggleUserMenu(event);
  }

  goToProfile() {
    this.closeUserMenu();
    this.router.navigate(['/profile']);
  }
  logout() {
    this.closeUserMenu();
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.closeUserMenu();
  }
}
