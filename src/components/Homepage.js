import React, { Component } from 'react';
import './Homepage.css';

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  render() {
    return (
      <div>
      Hello World
      </div>
    );
  }
}
