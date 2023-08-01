import React from "react";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      currentText: "",
      displayCompleted: true,
    };
  }

  handleEdit = (task) => {
    this.setState({ isEditing: true, currentText: task.value });
  };

  handleInputChange = (e) => {
    this.setState({ currentText: e.target.value });
  };

  handleSubmit = (e, taskId) => {
    e.preventDefault();
    this.props.editTask(taskId, this.state.currentText);
    this.setState({ isEditing: false, currentText: "" });
  };

  render() {
    return (
      <div>
        <ul>
          {this.props.data.reduce((acc, task, idx) => {
            if (this.state.displayCompleted || !task.completed) {
              return acc.concat(
                <li
                  key={idx}
                  className="task"
                  onDoubleClick={() => this.props.toggleComplete(task.id)}
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  <div>{task.name}</div>
                  <br />
                  <button onClick={() => this.handleEdit(task)}>Edit</button>
                  &nbsp;
                  <button onClick={() => this.props.deleteTask(task.id)}>
                    Delete
                  </button>
                </li>
              );
            } else {
              return acc;
            }
          }, [])}
        </ul>
      </div>
    );
  }
}
