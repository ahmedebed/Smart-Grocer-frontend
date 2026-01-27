import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { RouterModule } from '@angular/router';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';

@NgModule({
  declarations: [
    ToastComponent,
    SideNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ToastComponent,
    SideNavbarComponent
  ]
})
export class SharedModule { }
