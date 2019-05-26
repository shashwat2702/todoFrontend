import React, { Component } from 'react';
import './Homepage.css';

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
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
    const { message } = this.state;
    return (
      <div className="homePageContainer">
        <input
          type="text"
          name="message"
          value={message}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}
