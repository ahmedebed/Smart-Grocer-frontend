import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApprovedMealsComponent } from './pages/approved-meals/approved-meals.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ShoppingListComponent } from './features/shopping-list/pages/shopping-list/shopping-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ApprovedMealsComponent,
    LayoutComponent,
    AdminLayoutComponent,
    TopbarComponent,
    ShoppingListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
