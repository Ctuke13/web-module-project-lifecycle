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
      error: "",
    };
  }

  fetchAllTodos = () => {
    axios
      .get(URL)
      .then((res) =>
        this.setState({ ...this.state, data: res.data.data }, () => {
          console.log(this.state);
        })
      )
      .catch((err) => {
        this.setState({ ...this.state, error: err.response.data.message });
      });
  };

  componentDidMount() {
    this.fetchAllTodos();
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

  handleClear = () => {
    // get the date from the state and then update all items to have completed: false
    console.log("handleClear");
    let updatedData = this.state.data.map((item) => {
      return { ...item, completed: false };
    });
    this.setState({ data: updatedData });
  };

  render() {
    return (
      <div className="app-container">
        <div id="error">
          {this.state.error ? "Error: " : ""}
          {this.state.error}
        </div>
        <div id="todos">
          <h2>Todos:</h2>
          <TodoList
            toggleComplete={this.handleToggleComplete}
            data={this.state.data}
            deleteTask={this.handleDeleteTask}
          />
        </div>
        <Form
          submit={this.handleSubmit}
          handleChange={this.handleChange}
          onClear={this.handleClear}
        />
      </div>
    );
  }
}
