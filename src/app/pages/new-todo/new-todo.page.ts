import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, 
  IonBackButton, IonItem, IonLabel, IonInput, IonButton, 
  IonIcon, IonCard, IonCardContent,
  IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack, arrowForward, save, checkmarkCircleOutline } from 'ionicons/icons';
import { TodoService } from 'src/app/core/services/todo.service';
import { UI_TEXTS } from 'src/app/core/constants/storage.constants';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.page.html',
  styleUrls: ['./new-todo.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonTitle, 
    IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, 
    IonInput, IonButton, IonIcon, IonCard, 
    IonCardContent, IonSelect, IonSelectOption
  ]
})
export class NewTodoPage implements OnInit {
  private todoService = inject(TodoService);
  private router = inject(Router);

  public readonly UI = UI_TEXTS;
  public categories = this.todoService.categories;
  
  public todoTitle = signal<string>('');
  public categoryId = signal<string>('');
  public step = signal<number>(1);

  constructor() {
    addIcons({ arrowBack, arrowForward, save, checkmarkCircleOutline });
  }

  ionViewWillEnter(): void {
    this.todoTitle.set('');
    this.categoryId.set('');
    this.step.set(1);
  }

  ngOnInit(): void {}

  public nextStep(): void {
    if (this.todoTitle().trim() && this.categoryId()) {
      this.step.set(2);
    }
  }

  public prevStep(): void {
    this.step.set(1);
  }

  public async createTodo(): Promise<void> {
    if (this.todoTitle().trim() && this.categoryId()) {
      await this.todoService.addTodo({
        title: this.todoTitle().trim(),
        categoryId: this.categoryId(),
        isCompleted: false
      });
      this.router.navigate(['/tabs/todos']);
    }
  }
}
