import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealsListComponent } from './pages/meals-list/meals-list.component';

const routes: Routes = [
  {
    path: '',
    component: MealsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealsRoutingModule { }
