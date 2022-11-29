import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private todoService: TodoService) {
    // Подписка
    // this.todoService.todos$.subscribe((todos) => console.log(todos));
  }
  text: string = '';
  changeText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }
  addTodo(): void {
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}
