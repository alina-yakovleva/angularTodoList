import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../services/todo.service';

import { ToDoInterface } from '../types/todo.interface';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  @Input('todo') todoProps: ToDoInterface;
  @Input('isEditing') isEditingProps: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter();
  constructor(private todoService: TodoService) {}
  editingText: string = ' ';
  ngOnInit(): void {
    console.log(this.editingText);
    this.editingText = this.todoProps.text;
  }
  setTodoInEditMode() {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }
  removeTodo() {
    this.todoService.remove(this.todoProps.id);
  }
  toggleTodo() {}
  changeText(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }
  changeTodo() {
    this.setEditingIdEvent.emit(null);
    this.todoService.changeTodo(this.todoProps.id, this.editingText);
  }
}
