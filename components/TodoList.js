import React, { Component } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

export default class TodoList extends Component {
  state = {
    todos: [],
    todoShow: "all",
    toggleAllComplete: true
  };

  addTodo = todo => {
    const newTodo = [todo, ...this.state.todos];
    this.setState({
      todos: newTodo
    });
  };

  toggleComplete = id => {
    // console.log(id);
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete
          };
        } else {
          return todo;
        }
      })
    });
  };

  deleteTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  };

  removeCompletetodos = () => {
    this.setState({
      todos: this.state.todos.filter(todo => !todo.complete)
    });
  };
  render() {
    let todos = [];

    if (this.state.todoShow === "all") {
      todos = this.state.todos;
    } else if (this.state.todoShow === "active") {
      todos = this.state.todos.filter(todo => !todo.complete);
    } else if (this.state.todoShow === "completed") {
      todos = this.state.todos.filter(todo => todo.complete);
    }
    return (
      <div>
        <TodoForm onSubmitAction={this.addTodo} />
        <div>
          <div>
            {todos.map(todo => (
              <Todo
                todo={todo}
                key={todo.id}
                toggleComplete={() => this.toggleComplete(todo.id)}
                deleteTodo={() => this.deleteTodo(todo.id)}
              />
            ))}
          </div>
          <div>
            Todos Left :{" "}
            {this.state.todos.filter(todo => !todo.complete).length}
          </div>
          <div>
            <button onClick={() => this.setState({ todoShow: "all" })}>
              All
            </button>
            <button onClick={() => this.setState({ todoShow: "active" })}>
              Active
            </button>
            <button onClick={() => this.setState({ todoShow: "completed" })}>
              Completed
            </button>
          </div>
          {this.state.todos.some(todo => todo.complete) ? (
            <div>
              <button onClick={() => this.removeCompletetodos()}>
                Remove all completed todos
              </button>
            </div>
          ) : null}
        </div>
        <button
          onClick={() =>
            this.setState({
              todos: this.state.todos.map(todo => ({
                ...todo,
                complete: this.state.toggleAllComplete
              }))
            })
          }
        >
          Toggle All Complete : {`${this.state.toggleAllComplete}`}
        </button>
      </div>
    );
  }
}
