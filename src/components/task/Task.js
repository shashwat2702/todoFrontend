/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import './Task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readonly: true,
      task: props.task,
    };
  }

  makeEditable = () => {
    this.setState({ readonly: false });
  }

  handleInputChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { readonly, task } = this.state;
    return (
      <div className="individualTask">
        <input
          value={task}
          readOnly={readonly}
          className="existingTodoTask"
          name="task"
          onChange={this.handleInputChange}
        />
        <br />
        <button className="editTaskButton" type="submit" onClick={this.makeEditable}>
            Edit Task
        </button>
        <button className="removeTaskButton" type="submit" onClick={this.sendMessage}>
            Remove Task
        </button>
      </div>
    );
  }
}
