import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyMealsComponent } from './my-meals.component';

const routes: Routes = [{ path: '', component: MyMealsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyMealsRoutingModule { }
