import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  // AUTH (Login / Signup)
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule)
  },

  // APP WITH NAVBAR
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'external-meals',
        loadChildren: () =>
          import('./external-meals/external-meals.module').then(m => m.ExternalMealsModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'my-meals',
        loadChildren: () =>
          import('./my-meals/my-meals.module').then(m => m.MyMealsModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then(m => m.ProfileModule)
      },

      {
        path: 'shopping-list',
        loadChildren: () =>
          import('./features/shopping-list/shopping-list.module')
            .then(m => m.ShoppingListModule)
      }
    ]
  },

  // fallback
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
