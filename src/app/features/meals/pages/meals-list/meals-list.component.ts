import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { Meal } from '../../models/meal.model';

interface MealUI extends Meal {
  quantity: number;
}

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.css']
})
export class MealsListComponent implements OnInit {

  meals: MealUI[] = [];

  page = 0;
  totalPages = 0;

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.loadMeals();
  }

  loadMeals() {
    this.mealService.getMeals(this.page, 10).subscribe(res => {
      console.log(res.content);
      this.meals = res.content.map(m => ({
        ...m,
        quantity: 1
      }));

      this.totalPages = res.totalPages;
    });
  }

  increaseQty(meal: MealUI) {
    if (meal.quantity < 5) {
      meal.quantity++;
    }
  }

  decreaseQty(meal: MealUI) {
    if (meal.quantity > 1) {
      meal.quantity--;
    }
  }

  getTotalMealPrice(meal: MealUI) {
    return meal.price * meal.quantity;
  }

  addToShoppingList(meal: MealUI) {
    this.mealService
      .addToShoppingList(meal.id, meal.quantity)
      .subscribe({
        next: () => {
          alert('Added to shopping list successfully');
        },
        error: () => {
          alert('Error while adding to shopping list');
        }
      });
  }

}
