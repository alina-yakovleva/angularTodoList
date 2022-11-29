import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MainComponent } from '../main/main.component';
import { TodoService } from '../services/todo.service';
import { TodoComponent } from '../todo/todo.component';
import { TodosComponent } from './todos.component';
const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  },
];
@NgModule({
  declarations: [
    TodosComponent,
    HeaderComponent,
    MainComponent,
    TodoComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [TodoService],
})
export class TodosModule {}
