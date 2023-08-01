import React from "react";
import Todo from "./Todo";

export default class TodoList extends React.Component {
  render() {
    return (
      <Todo
        deleteTask={this.props.deleteTask}
        toggleComplete={this.props.toggleComplete}
        data={this.props.data}
      />
    );
  }
}
