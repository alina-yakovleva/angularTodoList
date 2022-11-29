import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { FilterEnum } from '../types/filter.enum';
import { ToDoInterface } from '../types/todo.interface';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  visibleTodos$: Observable<ToDoInterface[]>;
  noTodoClass$: Observable<boolean>;
  isAllTodosSelected$: Observable<boolean>;
  editingId: string | null = null;

  constructor(private todoService: TodoService) {
    this.isAllTodosSelected$ = this.todoService.todos$.pipe(
      map((todos) => todos.every((t) => t.isCompleted))
    );
    this.noTodoClass$ = this.todoService.todos$.pipe(
      map((t) => t.length === 0)
    );
    this.visibleTodos$ = combineLatest(
      this.todoService.todos$,
      this.todoService.filter$
    ).pipe(
      map(([todos, filter]: [ToDoInterface[], FilterEnum]) => {
        if (filter == FilterEnum.active) {
          return todos.filter((t) => !t.isCompleted);
        } else if (filter == FilterEnum.completed) {
          return todos.filter((t) => t.isCompleted);
        }
        return todos;
      })
    );
  }
  toggleAllTodos(event: Event) {
    const target = event.target as HTMLInputElement;
    this.todoService.toggleAll(target.checked);
  }
  setEditingId(editingId: string | null) {
    this.editingId = editingId;
  }
}
