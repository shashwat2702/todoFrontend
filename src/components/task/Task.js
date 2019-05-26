/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { updateData } from '../../utils/getData';
import './Task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readonly: true,
      task: props.task,
      taskId: props.id,
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

  updateMessage = (event) => {
    event.preventDefault();
    const { task, taskId } = this.state;
    updateData('http://localhost:8080/updateTask', taskId, task)
      .then(({ data }) => {
        if (data.updated === true) {
          this.setState({ task: data.task });
        } else {
          const { task } = this.props;
          this.setState({ task });
        }
      },
      () => {
        const { task } = this.props;
        this.setState({ task });
      });
    this.setState({ readonly: true });
  };

  render() {
    const { readonly, task, taskId } = this.state;
    return (
      <div className="individualTask">
        <input
          value={task}
          readOnly={readonly}
          className={readonly ? 'existingTodoTask' : 'editableTodoTask'}
          name="task"
          id={taskId}
          onChange={this.handleInputChange}
        />
        <br />
        {!readonly
        && (
        <button className="editTaskButton" type="submit" onClick={this.updateMessage}>
            Update Task
        </button>
        )
        }
        {readonly
        && (
        <button className="editTaskButton" type="submit" onClick={this.makeEditable}>
            Edit Task
        </button>
        )
        }
        <button className="removeTaskButton" type="submit" onClick={this.sendMessage}>
            Remove Task
        </button>
      </div>
    );
  }
}
