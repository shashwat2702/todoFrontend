/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import './Task.css';

export default class Task extends Component {
  render() {
    const { task } = this.props;
    return (
      <div className="individualTask">
        {task}
      </div>
    );
  }
}
