import { Component, OnInit, HostListener } from '@angular/core';
import { MyMealsService } from './my-meals.service';

@Component({
  selector: 'app-my-meals',
  templateUrl: './my-meals.component.html',
  styleUrls: ['./my-meals.component.css'],
})
export class MyMealsComponent implements OnInit {
  meals: any[] = [];
  page = 0;
  size = 5;
  totalPages = 0;
  searchTerm: string = '';
  openMenuIndex: number | null = null;

  toastMessage = '';
  toastType: 'success' | 'error' | '' = '';

  mealToDelete: number | null = null;

  constructor(private mealsService: MyMealsService) {}

  ngOnInit(): void {
    this.loadMeals();
  }

  loadMeals() {
    this.mealsService
      .getMeals(this.page, this.size, this.searchTerm)
      .subscribe((res: any) => {
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

  toggleMenu(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.openMenuIndex = this.openMenuIndex === index ? null : index;
  }

  @HostListener('document:click')
  closeMenu() {
    this.openMenuIndex = null;
  }

  approveMeal(externalId: string) {
    this.mealsService.toggleApprove(externalId).subscribe(() => {
      this.toastMessage = 'Meal status updated';
      this.toastType = 'success';
      this.loadMeals();
      setTimeout(() => (this.toastMessage = ''), 2000);
    });
  }

  openDelete(id: number) {
    this.mealToDelete = id;
    this.openMenuIndex = null;
  }

  cancelDelete() {
    this.mealToDelete = null;
  }

  confirmDelete() {
    if (this.mealToDelete == null) return;

    const id = this.mealToDelete;

    const backupMeals = [...this.meals];

    this.meals = this.meals.filter(m => m.id !== id);

    this.mealToDelete = null;

    this.mealsService.deleteMeal(id).subscribe({

      next: () => {

        this.toastMessage = 'Meal deleted successfully';
        this.toastType = 'success';

        if (this.meals.length === 0 && this.page > 0) {
          this.page--;
        }

        this.loadMeals();

        setTimeout(() => {
          this.toastMessage = '';
          this.toastType = '';
        }, 2000);
      },

      error: () => {

        this.meals = backupMeals;

        this.toastMessage = 'Failed to delete meal';
        this.toastType = 'error';

        setTimeout(() => {
          this.toastMessage = '';
          this.toastType = '';
        }, 2000);
      }
    });
  }


  showDetails(id: number) {}
}
