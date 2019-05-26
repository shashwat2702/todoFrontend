import React, { Component } from 'react';
import './Homepage.css';
import Task from './task/Task';
import { getData, postData, deleteData } from '../utils/getData';

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: '',
      tasks: [],
    };
  }


  componentDidMount() {
    this.getTodoTasks();
  }

  getTodoTasks = () => {
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

  addTask = (event) => {
    event.preventDefault();
    const { newTask } = this.state;
    if (newTask !== '') {
      postData('http://localhost:8080/addTask', newTask)
        .then((response) => {
          if (response.status === 200) {
            const { data } = response;
            if (data.inserted === true) {
              const { tasks } = this.state;
              const { task, taskId } = data;
              this.setState({ tasks: [...tasks, { taskId, task }] });
            }
          }
        });
      this.setState({ newTask: '' });
    }
  };

  deleteTask = (event) => {
    const { target } = event;
    const { id } = target;
    deleteData('http://localhost:8080/removeTask', id)
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          const { deleted } = data;
          if (deleted === true) {
            this.getTodoTasks();
          }
        }
      });
  }

  render() {
    const { newTask, tasks } = this.state;
    return (
      <div className="homePageContainer">
        <form className="addTaskContainer" onSubmit={(e) => { e.preventDefault(); }}>
          <input
            className="addTodoInputField"
            type="text"
            name="newTask"
            value={newTask}
            onChange={this.handleInputChange}
            placeholder="What needs to be done?"
          />
          <button className="addTaskButton" type="submit" onClick={this.addTask}>
            Add Task
          </button>
        </form>
        <div className="headingTodo">
          ALL THE TODO TASKS
        </div>
        <div className="listOfTasks">
          {tasks.map(({ task, taskId }) => (
            <Task task={task} key={taskId} id={taskId} onDelete={this.deleteTask} />
          ))}
        </div>
      </div>
    );
  }
}
