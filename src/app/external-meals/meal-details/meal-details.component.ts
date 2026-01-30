import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExternalMealsService } from '../external-meals.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css']
})
export class MealDetailsComponent implements OnInit {

  meal: any;

  toastMessage = '';
  toastType: 'success' | 'error' | '' = '';

  constructor(
    private route: ActivatedRoute,
    private mealsService: ExternalMealsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadMeal(id);
  }

  loadMeal(id: string) {
    this.mealsService.getMealById(id).subscribe(res => {
      this.meal = res;
    });
  }

  approveMeal() {
    this.mealsService.toggleApprove(this.meal.idMeal).subscribe({
      next: () => {
        this.toastMessage = 'Meal approved successfully';
        this.toastType = 'success';
        setTimeout(() => (this.toastMessage = ''), 3000);
      },
      error: () => {
        this.toastMessage = 'Action failed';
        this.toastType = 'error';
        setTimeout(() => (this.toastMessage = ''), 3000);
      }
    });
  }

  get ingredients() {
    return [
      { name: this.meal?.strIngredient1, measure: this.meal?.strMeasure1 },
      { name: this.meal?.strIngredient2, measure: this.meal?.strMeasure2 },
      { name: this.meal?.strIngredient3, measure: this.meal?.strMeasure3 },
      { name: this.meal?.strIngredient4, measure: this.meal?.strMeasure4 },
      { name: this.meal?.strIngredient5, measure: this.meal?.strMeasure5 }
    ].filter(i => i.name);
  }
}
