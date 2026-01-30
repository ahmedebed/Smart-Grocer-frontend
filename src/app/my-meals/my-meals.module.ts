import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMealsComponent } from './my-meals.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { MyMealsRoutingModule } from './my-meals-routing.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    MyMealsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MyMealsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class MyMealsModule {}
