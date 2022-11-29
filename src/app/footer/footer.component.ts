import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';
import { FilterEnum } from '../types/filter.enum';
import { ToDoInterface } from '../types/todo.interface';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  noTodoClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemLeftText$: Observable<string>;
  filterEnum = FilterEnum;
  filter$: Observable<FilterEnum>;
  constructor(private todoService: TodoService) {
    this.activeCount$ = this.todoService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.itemLeftText$ = this.activeCount$.pipe(
      map((active) => `item${active !== 1 ? 's' : ''} left`)
    );
    this.noTodoClass$ = this.todoService.todos$.pipe(
      map((todos) => todos.length == 0)
    );
    this.filter$ = this.todoService.filter$;
  }
  changeFilter(event: Event, filter: FilterEnum): void {
    event.preventDefault();
    this.todoService.changeFilter(filter);
  }
}
