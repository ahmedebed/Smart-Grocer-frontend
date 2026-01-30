import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalMealsComponent } from './external-meals.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
const routes: Routes = [{ path: '', component: ExternalMealsComponent },{
  path: ':id',
  component: MealDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalMealsRoutingModule { }
