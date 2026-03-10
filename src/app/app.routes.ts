import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'todos',
        loadComponent: () => import('./pages/todos/todos.page').then((m) => m.TodosPage),
      },
      {
        path: 'categories',
        loadComponent: () => import('./pages/categories/categories.page').then((m) => m.CategoriesPage),
      },
      {
        path: 'new-todo',
        loadComponent: () => import('./pages/new-todo/new-todo.page').then((m) => m.NewTodoPage),
      },
      {
        path: 'new-category',
        loadComponent: () => import('./pages/new-category/new-category.page').then((m) => m.NewCategoryPage),
      },
      {
        path: '',
        redirectTo: '/tabs/todos',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
];

