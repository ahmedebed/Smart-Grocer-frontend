import { Component } from '@angular/core';
import { LayoutService } from '../layout/layout.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {

  collapsed = false;
  isAdmin = false;

  constructor(
    private layout: LayoutService,
    private auth: AuthService
  ) {
    this.layout.collapsed$.subscribe(v => this.collapsed = v);
    this.isAdmin = this.auth.isAdmin();
  }
}
