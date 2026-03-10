import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, 
  IonBackButton, IonItem, IonLabel, IonInput, IonButton, 
  IonIcon, IonCard, IonCardContent
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack, save, checkmarkCircleOutline, arrowForward } from 'ionicons/icons';
import { TodoService } from 'src/app/core/services/todo.service';
import { UI_TEXTS } from 'src/app/core/constants/storage.constants';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.page.html',
  styleUrls: ['./new-category.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonTitle, 
    IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, 
    IonInput, IonButton, IonIcon, IonCard, IonCardContent
  ]
})
export class NewCategoryPage {
  private todoService = inject(TodoService);
  private router = inject(Router);

  public readonly UI = UI_TEXTS;
  public categoryName = signal<string>('');
  public step = signal<number>(1);

  constructor() {
    addIcons({ arrowBack, save, checkmarkCircleOutline, arrowForward });
  }

  ionViewWillEnter(): void {
    this.categoryName.set('');
    this.step.set(1);
  }

  public nextStep(): void {
    if (this.categoryName().trim()) {
      this.step.set(2);
    }
  }

  public prevStep(): void {
    this.step.set(1);
  }

  public async createCategory(): Promise<void> {
    if (this.categoryName().trim()) {
      await this.todoService.addCategory(this.categoryName().trim());
      this.router.navigate(['/tabs/categories']);
    }
  }
}
