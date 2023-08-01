import React from "react";
import Todo from "./Todo";

export default class TodoList extends React.Component {
  render() {
    console.log(this.props);
    let todos;
    if (this.props.displayCompleted) {
      todos = this.props.data;
    } else {
      todos = this.props.data.filter((task) => !task.completed);
    }
    return (
      <Todo
        deleteTask={this.props.deleteTask}
        toggleComplete={this.props.toggleComplete}
        data={todos}
      />
    );
  }
}
