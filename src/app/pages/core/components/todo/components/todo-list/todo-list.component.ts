import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
import { MaterialModule } from '../../../../../shared/Modules/material.module';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  private service = inject(TodoService);
  private fb = inject(FormBuilder);

  noFound: string = 'Not Found Any Item';
  username: string = 'user';
  todos!: Todo[];
  taskForm!: FormGroup;

  CreateTodoForm() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(250)]],
      completed: false,
      userId: 0
    });
  }
  constructor() {
    this.getTodos();
    this.CreateTodoForm();
  }

  getTodos() {
    this.service.getTodos().subscribe({
      next: (todo) => {
        this.todos = todo;
      },
      error: (e) => console.error(e),
    });
  }

  getTodo(id: number) {
    this.service.getTodo(id).subscribe({
      next: (todo) => {
      },
      error: (e) => console.error(e),
    });
  }
  createTodo() {
    console.log(this.taskForm.value);
    if(this.taskForm.valid){
      this.service.createTodo(this.taskForm.value).subscribe({
        next: (response) => {
          this.getTodos()
        },
        error: (e) => console.error(e),
      });
    }
  }
  updateTodo(todo: Todo) {
    console.log(todo);
    this.service.updateTodo(todo).subscribe({
      next: (response) => {
        this.getTodos();
      },
      error: (e) => console.error(e),
    });
  }
  deleteTodo(id: any) {
    this.service.deleteTodo(id, this.username).subscribe({
      next: (response) => {
        console.info(response);
      },
      error: (e) => console.error(e),
    });
  }
}
