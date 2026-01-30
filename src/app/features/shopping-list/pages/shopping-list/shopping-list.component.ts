import { Component, OnInit, HostListener } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
import { ShoppingItem } from '../../models/shopping-item.model';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  items: ShoppingItem[] = [];

  page = 0;
  size = 5;
  totalPages = 0;

  loading = false;

  toastMessage = '';
  toastType: 'success' | 'error' | '' = '';

  openMenuIndex: number | null = null;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.loading = true;

    this.shoppingService.getAll(this.page, this.size)
      .subscribe({
        next: (res) => {
          this.items = res.content || [];
          this.totalPages = res.totalPages || 0;
          this.loading = false;
          this.openMenuIndex = null;
        },
        error: () => {
          this.items = [];
          this.totalPages = 0;
          this.loading = false;

          this.showToast('Failed to load shopping list', 'error');
        }
      });
  }

  changePage(p: number) {
    if (p === this.page) return;
    this.page = p;
    this.loadItems();
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages });
  }

  deleteItem(id: number) {
    this.shoppingService.delete(id).subscribe({
      next: () => {
        this.showToast('Item deleted successfully', 'success');
        this.loadItems();
      },
      error: () => {
        this.showToast('Delete failed', 'error');
      }
    });
  }

  toggleMenu(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.openMenuIndex = this.openMenuIndex === index ? null : index;
  }

  @HostListener('document:click')
  closeMenu() {
    this.openMenuIndex = null;
  }

  getTotalPrice(): number {
    return this.items.reduce(
      (sum, item) => sum + ((item.meal?.price || 0) * (item.quantity || 0)),
      0
    );
  }

  private showToast(msg: string, type: 'success' | 'error') {
    this.toastMessage = msg;
    this.toastType = type;
    setTimeout(() => this.toastMessage = '', 3000);
  }
}
