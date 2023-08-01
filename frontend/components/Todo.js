import React from "react";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      currentText: "",
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
          {this.props.data.map((task, idx) => {
            return this.state.isEditing && task.id === this.state.editTaskId ? (
              <li key={idx}>
                <form onSubmit={(e) => this.handleSubmit(e, task.id)}>
                  <input
                    type="text"
                    value={this.state.currentText}
                    onChange={this.handleInputChange}
                  />
                  <button type="submit">Save</button>
                </form>
              </li>
            ) : (
              <li
                key={idx}
                className="task"
                onDoubleClick={() => this.props.toggleComplete(task.id)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.name}
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <button onClick={() => this.handleEdit(task)}>Edit</button>
                &nbsp;
                <button onClick={() => this.props.deleteTask(task.id)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
