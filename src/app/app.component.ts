import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { APIService } from './API.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private apiService: APIService,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  createTodo() {
    this.apiService.CreateTodo({
      name: 'ionic',
      description: 'testing'
    });
  }

  todos: Array<any>;

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.apiService.ListTodos().then((evt) => {
        this.todos = evt.items;
      });

      this.apiService.OnCreateTodoListener.subscribe((evt) => {
        const data = (evt as any).value.data.onCreateTodo;
        this.todos = [...this.todos, data];
      });
    });
  }
}
