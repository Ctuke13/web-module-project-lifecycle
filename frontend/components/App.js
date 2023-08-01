import React from "react";
import axios from "axios";

import Form from "./Form";
import TodoList from "./TodoList";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    console.log(this.state);
    axios
      .get("http://localhost:9000/api/todos")
      .then((res) =>
        this.setState({ data: res.data.data }, () => {
          console.log(this.state);
        })
      )
      .catch((err) => console.error(err));
  }

  handleToggleComplete = (taskId) => {
    axios
      .patch(`http://localhost:9000/api/todos/${taskId}`)
      .then((res) => {
        console.log("Task updated", res.data);
        const updatedData = this.state.data.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              completed: !task.completed,
            };
          }
          return task;
        });
        this.setState({ data: updatedData });
      })
      .catch((err) => console.log(err));
  };

  handleDeleteTask = (taskId) => {
    axios
      .delete(`http://localhost:9000/api/todos/${taskId}`)
      .then((res) => {
        console.log(res);
        const updatedData = this.state.data.filter(
          (task) => task.id !== taskId
        );
        this.setState({ data: updatedData });
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div className="app-container">
        <TodoList
          toggleComplete={this.handleToggleComplete}
          data={this.state.data}
          deleteTask={this.handleDeleteTask}
        />
        <Form submit={this.handleSubmit} handleChange={this.handleChange} />
      </div>
    );
  }
}
