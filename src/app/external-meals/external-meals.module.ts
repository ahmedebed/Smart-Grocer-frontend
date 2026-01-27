import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExternalMealsRoutingModule } from './external-meals-routing.module';
import { ExternalMealsComponent } from './external-meals.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ExternalMealsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ExternalMealsRoutingModule,
    SharedModule  
  ]
})
export class ExternalMealsModule { }
