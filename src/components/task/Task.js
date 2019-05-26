import React, { Component } from 'react';
import { postData } from '../../utils/getData';
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
    const { message } = this.state;
    postData('http://localhost:8080/addTask', message)
      .then(({ data }) => {
        if (data.inserted === true) {
          const { tasks } = this.state;
          const { task, taskId } = data;
          this.setState({ tasks: [...tasks, { taskId, task }] });
        }
      });
    this.setState({ message: '' });
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
        <button className="editTaskButton" type="submit" onClick={this.makeEditable}>
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
