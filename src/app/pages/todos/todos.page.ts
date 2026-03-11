import { Component, ChangeDetectionStrategy, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionSheetController, IonBadge, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar, ViewWillEnter } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { TodoService } from '../../core/services/todo.service';
import { RemoteConfigService } from '../../core/services/remote-config.service';
import { Todo } from '../../core/models/todo.model';
import { CATEGORY_CONSTANTS, UI_TEXTS } from '../../core/constants/storage.constants';
import { EmptyStateComponent } from '../../shared/components/molecules/empty-state/empty-state.component';
import { add, chevronDownOutline, chevronUpOutline, documentTextOutline, filter, list, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
    IonLabel, IonCheckbox, IonFab, IonFabButton, IonIcon, 
    IonSearchbar, IonSelect, IonSelectOption, IonItemSliding,
    IonItemOptions, IonItemOption,
    IonBadge,
    EmptyStateComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosPage implements ViewWillEnter, OnInit {
  readonly UI = UI_TEXTS;
  readonly unselectedConstant = CATEGORY_CONSTANTS.UNSELECTED;

  isCreationEnabled = signal<boolean>(true);
  private remoteConfig = inject(RemoteConfigService);

  filterStatus: 'all' | 'completed' | 'pending' = 'all';

  private searchTerm = signal<string>('');
  private categoryFilter = signal<string>(CATEGORY_CONSTANTS.UNSELECTED);
  private statusFilter = signal<string>('all');

  categories = this.todoService.categories;

  filteredTodos = computed(() => {
    const todos = this.todoService.todos();
    const cats = this.todoService.categories();
    const term = this.searchTerm().toLowerCase();
    const catId = this.categoryFilter();
    const status = this.statusFilter();

    return todos.filter(t => {
      const matchT = !term || t.title.toLowerCase().includes(term);
      const matchC = catId === CATEGORY_CONSTANTS.UNSELECTED || t.categoryId === catId;
      const matchS = status === "all" || (status === "completed" && t.isCompleted) || (status === "pending" && !t.isCompleted);
      return matchT && matchC && matchS;
    }).map(t => ({ ...t, categoryName: cats.find(c => c.id === t.categoryId)?.name || "Sin categor�a" }));
  });

  constructor(
    private todoService: TodoService
  ) {
    addIcons({ add, filter, list, chevronDownOutline, chevronUpOutline, documentTextOutline, trashOutline });
  }

  async ngOnInit() {
    this.isCreationEnabled.set(await this.remoteConfig.getBoolean('flagCreacion'));
  }

  ionViewWillEnter(): void {
  }

  onSearch(event: CustomEvent): void {
    const value = (event.detail as any).value || '';
    this.searchTerm.set(value);
  }

  onCategoryFilter(event: CustomEvent): void {
    const value = (event.detail as any).value;
    this.categoryFilter.set(value);
  }

  onStatusFilterChange(): void {
    this.statusFilter.set(this.filterStatus);
  }

  toggleTodo(todo: Todo): void {
    this.todoService.updateTodo({
      ...todo,
      isCompleted: !todo.isCompleted
    });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
  }
}
