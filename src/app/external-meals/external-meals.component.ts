import { Component, OnInit, HostListener } from '@angular/core';
import { ExternalMealsService } from './external-meals.service';
import { Router } from '@angular/router';

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

  loading = false;

  toastMessage: string = '';
  toastType: 'success' | 'error' | '' = '';

  openMenuIndex: number | null = null;

  constructor(
    private mealsService: ExternalMealsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMeals();
  }

  loadMeals() {
    this.loading = true;
    this.meals = [];

    this.mealsService.getMeals(this.page, this.size, this.searchTerm)
      .subscribe({
        next: (res) => {
          this.meals = res.content || [];
          this.totalPages = res.totalPages || 0;
          this.loading = false;
          this.openMenuIndex = null;
        },
        error: () => {
          this.meals = [];
          this.totalPages = 0;
          this.loading = false;
          this.toastMessage = 'Failed to load meals';
          this.toastType = 'error';
          setTimeout(() => (this.toastMessage = ''), 3000);
        }
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
    if (p === this.page) return;
    this.page = p;
    this.loadMeals();
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages });
  }

  toggleMenu(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.openMenuIndex = this.openMenuIndex === index ? null : index;
  }

  @HostListener('document:click')
  closeMenu() {
    this.openMenuIndex = null;
  }

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

  showDetails(mealId: string) {
    this.openMenuIndex = null;
    this.router.navigate(['/external-meals', mealId]);
  }
}
