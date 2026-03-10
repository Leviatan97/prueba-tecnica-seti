export interface Category {
  id: string;
  name: string;
}

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  categoryId?: string;
}
