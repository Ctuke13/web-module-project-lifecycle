import React from "react";
import axios from "axios";

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      newTask: {
        id: "",
        name: "",
        completed: false,
        error: "",
        displayCompleted: true,
      },
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const { value } = e.target;
    const newTask = {
      ...this.state.newTask,
      id: Math.random(),
      name: value,
    };
    this.setState({ newTask });
  };

  handleSubmit = (e) => {
    console.log(this.props.URL);
    e.preventDefault();
    const newTask = this.state.newTask;
    axios
      .post(this.props.URL, newTask)
      .then((res) => {
        this.props.fetchAllTodos();
      })
      .catch((err) => {
        debugger;
        this.setState({ ...this.state, error: err.response.data.message });
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="error">
          {this.state.error ? "Error: " : ""}
          {this.state.error}
        </div>
        <label>
          Add New Task:&nbsp;
          <input
            onChange={this.handleChange}
            placeholder="NewTask"
            value={this.state.newTask.name}
          />
        </label>{" "}
        <button>Add</button>
        {/* <button type="button" onClear={this.props.onClear}>
          Clear Completed
        </button> */}
      </form>
    );
  }
}
