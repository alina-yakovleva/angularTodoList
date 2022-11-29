import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from '../types/filter.enum';
import { ToDoInterface } from '../types/todo.interface';

@Injectable()
export class TodoService {
  todos$ = new BehaviorSubject<ToDoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);
  addTodo(text: string): void {
    const newTodo: ToDoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(),
    };

    const updatedTodo = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodo);
  }
  toggleAll(checked: boolean): void {
    const updatedTodo = this.todos$.getValue().map((todo) => {
      return { ...todo, isCompleted: checked };
    });
    this.todos$.next(updatedTodo);
  }
  changeFilter(filterName: FilterEnum): void {
    this.filter$.next(filterName);
  }
  changeTodo(id: string | null, text: string) {
    const updatedTodo = this.todos$
      .getValue()
      .map((todo) => (todo.id == id ? { ...todo, text } : todo));

    this.todos$.next(updatedTodo);
  }
  remove(id: string) {
    const updatedTodo = this.todos$.getValue().filter((todo) => todo.id !== id);

    this.todos$.next(updatedTodo);
  }
  toggleTodo(id: string) {
    const updatedTodo = this.todos$
      .getValue()
      .map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
    this.todos$.next(updatedTodo);
  }
}
