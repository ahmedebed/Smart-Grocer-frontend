// layout.component.ts
import { Component } from '@angular/core';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  collapsed = false;

  constructor(private layout: LayoutService) {
    this.layout.collapsed$.subscribe(v => (this.collapsed = v));
  }
}
