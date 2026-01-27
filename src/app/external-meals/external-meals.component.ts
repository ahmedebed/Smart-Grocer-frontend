import { Component, OnInit, HostListener } from '@angular/core';
import { ExternalMealsService } from './external-meals.service';

@Component({
  selector: 'app-external-meals',
  templateUrl: './external-meals.component.html',
  styleUrls: ['./external-meals.component.css']
})
export class ExternalMealsComponent implements OnInit {

  meals: any[] = [];
  searchTerm: string = '';
  page = 0;
  size = 5;
  totalPages = 0;

  // Toast
  toastMessage: string = '';
  toastType: 'success' | 'error' | '' = '';

  openMenuIndex: number | null = null;

  constructor(private mealsService: ExternalMealsService) {}

  ngOnInit(): void {
    this.loadMeals();
  }

  loadMeals() {
    this.mealsService.getMeals(this.page, this.size, this.searchTerm)
      .subscribe(res => {
        this.meals = res.content;
        this.totalPages = res.totalPages;
      });
  }

  search() {
    this.page = 0;
    this.loadMeals();
  }

  reset() {
    this.searchTerm = '';
    this.page = 0;
    this.loadMeals();
  }

  changePage(p: number) {
    this.page = p;
    this.loadMeals();
  }

  get totalPagesArray() {
    return Array(this.totalPages);
  }

  /* ---------- Actions menu ---------- */
  toggleMenu(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.openMenuIndex = this.openMenuIndex === index ? null : index;
  }

  @HostListener('document:click')
  closeMenu() {
    this.openMenuIndex = null;
  }

  /* ---------- Approve ---------- */
  approveMeal(mealId: string) {
    this.mealsService.toggleApprove(mealId).subscribe({
      next: (res) => {
        this.toastMessage = res.message || 'Meal approved successfully';
        this.toastType = 'success';
        this.loadMeals();

        setTimeout(() => (this.toastMessage = ''), 2000);
      },
      error: () => {
        this.toastMessage = 'Action failed, try again';
        this.toastType = 'error';

        setTimeout(() => (this.toastMessage = ''), 3000);
      }
    });
  }
}
