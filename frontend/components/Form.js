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
      },
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const newTask = {
      ...this.state.newTask,
      id: Math.random(),
      name: e.target.value,
    };
    this.setState({ newTask });
  };

  handleSubmit = (e) => {
    const newTask = this.state.newTask;
    axios
      .post("http://localhost:9000/api/todos", newTask)
      .then(
        (res) => console.log(res.data),
        this.setState({ ...this.state, name: "", id: "" })
      )
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Add New Task:&nbsp;
          <input
            onChange={this.handleChange}
            placeholder="NewTask"
            value={this.state.newTask.name}
          />
        </label>{" "}
        <button>Add</button>
      </form>
    );
  }
}
