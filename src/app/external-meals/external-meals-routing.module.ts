import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalMealsComponent } from './external-meals.component';

const routes: Routes = [{ path: '', component: ExternalMealsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalMealsRoutingModule { }
