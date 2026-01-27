import { Component } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent {
  collapsed = false;

  constructor(private layout: LayoutService) {
    this.layout.collapsed$.subscribe(v => this.collapsed = v);
  }
}
