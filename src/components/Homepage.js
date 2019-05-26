import React, { Component } from 'react';
import './Homepage.css';
import Task from './task/Task';
import { getData, postData } from '../utils/getData';

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      tasks: [],
    };
  }

  componentDidMount() {
    getData('http://localhost:8080/tasks').then((response) => {
      if (response.status === 200) {
        const { data } = response;
        this.setState({ tasks: data });
      }
    });
  }

  handleInputChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  }

  sendMessage = (event) => {
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
    const { message, tasks } = this.state;
    return (
      <div className="homePageContainer">
        <form className="addTaskContainer" onSubmit={(e) => { e.preventDefault(); }}>
          <input
            className="addTodoInputField"
            type="text"
            name="message"
            value={message}
            onChange={this.handleInputChange}
            placeholder="What needs to be done?"
          />
          <button className="addTaskButton" type="submit" onClick={this.sendMessage}>
            Add Task
          </button>
        </form>
        <div className="headingTodo">
          ALL THE TODO TASKS
        </div>
        <div className="listOfTasks">
          {tasks.map(({ task, taskId }) => (
            <Task task={task} key={taskId} />
          ))}
        </div>
      </div>
    );
  }
}
