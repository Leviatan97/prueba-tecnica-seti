import { Component, ChangeDetectionStrategy, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
  IonLabel, IonFab, IonFabButton, IonIcon, IonSearchbar, 
  IonItemSliding, IonItemOptions, IonItemOption, IonButton,
  AlertController, ViewWillEnter 
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { TodoService } from '../../core/services/todo.service';
import { Category } from '../../core/models/todo.model';
import { UI_TEXTS } from '../../core/constants/storage.constants';
import { EmptyStateComponent } from '../../shared/components/molecules/empty-state/empty-state.component';
import { addIcons } from 'ionicons';
import { add, pencilOutline, trashOutline, documentTextOutline } from 'ionicons/icons';
import { RemoteConfigService } from 'src/app/core/services/remote-config.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
    IonLabel, IonFab, IonFabButton, IonIcon, IonSearchbar, 
    IonItemSliding, IonItemOptions, IonItemOption, IonButton,
    EmptyStateComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPage implements OnInit {
  readonly UI = UI_TEXTS;
  private searchTerm = signal<string>('');

  isCreationEnabled = signal<boolean>(true);
  isEditEnabled = signal<boolean>(true);
  isDeleteEnabled = signal<boolean>(true);
  private remoteConfig = inject(RemoteConfigService);

  filteredCategories = computed(() => {
    const categories = this.todoService.categories();
    const term = this.searchTerm();
    return categories.filter(c => c.name.toLowerCase().includes(term.toLowerCase()));
  });

  constructor(
    private todoService: TodoService,
    private alertController: AlertController
  ) {
    addIcons({ add, pencilOutline, trashOutline, documentTextOutline });
  }

  async ngOnInit() {
    this.isCreationEnabled.set(await this.remoteConfig.getBoolean('flagCreacion'));
    this.isEditEnabled.set(await this.remoteConfig.getBoolean('flagEdicion'));
    this.isDeleteEnabled.set(await this.remoteConfig.getBoolean('flagEliminacion'));
  }

  onSearch(event: CustomEvent): void {
    const value = (event.detail as any).value || '';
    this.searchTerm.set(value);
  }

  async editCategory(category: Category): Promise<void> {
    const alert = await this.alertController.create({
      header: this.UI.LABELS.EDIT,
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: this.UI.PLACEHOLDERS.CAT_NAME,
          value: category.name
        }
      ],
      buttons: [
        { text: this.UI.LABELS.CANCEL, role: 'cancel' },
        {
          text: this.UI.LABELS.SAVE,
          handler: (data: { name: string }) => {
            if (data.name && data.name.trim()) {
              this.todoService.updateCategory({
                ...category,
                name: data.name.trim()
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteCategory(id: string): Promise<void> {
    const alert = await this.alertController.create({
      header: this.UI.TITLES.CONFIRM,
      message: this.UI.PROMPTS.DELETE_CAT_CONFIRM,
      buttons: [
        { text: this.UI.BUTTONS.CANCEL, role: 'cancel' },
        {
          text: this.UI.BUTTONS.DELETE,
          role: 'destructive',
          handler: () => {
             this.todoService.deleteCategory(id);
          }
        }
      ]
    });
    await alert.present();
  }
}
