import { Injectable, signal, computed } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Todo, Category } from '../models/todo.model';
import { STORAGE_KEYS } from '../constants/storage.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _storage: Storage | null = null;
  private _todos = signal<Todo[]>([]);
  private _categories = signal<Category[]>([]);

  public todos = computed(() => this._todos());
  public categories = computed(() => this._categories());

  constructor(private storage: Storage) {
    this.init();
  }

  private async init(): Promise<void> {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadInitialData();
  }

  private async loadInitialData(): Promise<void> {
    const todos = await this._storage?.get(STORAGE_KEYS.TODOS) || [];
    const categories = await this._storage?.get(STORAGE_KEYS.CATEGORIES) || [];
    this._todos.set(todos);
    this._categories.set(categories);
  }

  public async addTodo(todo: Omit<Todo, 'id'>): Promise<void> {
    const newTodo: Todo = { ...todo, id: Date.now().toString() };
    this._todos.update(todos => [...todos, newTodo]);
    await this.saveTodos(this._todos());
  }

  public async updateTodo(updatedTodo: Todo): Promise<void> {
    this._todos.update(todos => todos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
    await this.saveTodos(this._todos());
  }

  public async deleteTodo(id: string): Promise<void> {
    this._todos.update(todos => todos.filter(t => t.id !== id));
    await this.saveTodos(this._todos());
  }

  private async saveTodos(todos: Todo[]): Promise<void> {
    await this._storage?.set(STORAGE_KEYS.TODOS, todos);
  }

  public async addCategory(name: string): Promise<void> {
    const newCategory: Category = { id: Date.now().toString(), name };
    this._categories.update(categories => [...categories, newCategory]);
    await this.saveCategories(this._categories());
  }

  public async updateCategory(updatedCategory: Category): Promise<void> {
    this._categories.update(categories => categories.map(c => c.id === updatedCategory.id ? updatedCategory : c));
    await this.saveCategories(this._categories());
  }

  public async deleteCategory(id: string): Promise<void> {
    this._categories.update(categories => categories.filter(c => c.id !== id));
    this._todos.update(todos => todos.map(t => t.categoryId === id ? { ...t, categoryId: undefined } : t));
    
    await this.saveCategories(this._categories());
    await this.saveTodos(this._todos());
  }

  private async saveCategories(categories: Category[]): Promise<void> {
    await this._storage?.set(STORAGE_KEYS.CATEGORIES, categories);
  }
}
