import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyMealsRoutingModule } from './my-meals-routing.module';
import { MyMealsComponent } from './my-meals.component';


@NgModule({
  declarations: [
    MyMealsComponent
  ],
  imports: [
    CommonModule,
    MyMealsRoutingModule
  ]
})
export class MyMealsModule { }
