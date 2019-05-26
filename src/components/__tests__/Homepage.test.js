import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Homepage from '../Homepage';
import * as apiCalls from '../../utils/getData';

describe('Homepage snapshot', () => {
  it('should render correctly', () => {
    const HomepageSnap = renderer.create(<Homepage />);
    const HomepageJson = HomepageSnap.toJSON();
    expect(HomepageJson).toMatchSnapshot();
  });
});

describe('getTodoTasks', () => {
  it('should call getData', () => {
    jest.spyOn(apiCalls, 'getData');
    const wrapper = shallow(<Homepage />);
    const instance = wrapper.instance();
    instance.getTodoTasks();
    expect(apiCalls.getData).toHaveBeenCalled();
  });
});

describe('handleInputChange', () => {
  it('should set value in newTask attribute of state', () => {
    const wrapper = shallow(<Homepage />);
    const instance = wrapper.instance();
    const event = {
      target: {
        name: 'newTask',
        value: 'Create',
      },
    };
    instance.handleInputChange(event);
    expect(instance.state.newTask).toEqual(event.target.value);
  });
});

describe('addTask', () => {
  it('should not call postData when newTask is empty', () => {
    jest.spyOn(apiCalls, 'postData');
    const wrapper = shallow(<Homepage />);
    const instance = wrapper.instance();
    instance.addTask({ preventDefault: jest.fn() });
    expect(apiCalls.postData).not.toHaveBeenCalled();
  });
  it('should call postData when newTask has some data', () => {
    jest.spyOn(apiCalls, 'postData');
    const wrapper = shallow(<Homepage />);
    const instance = wrapper.instance();
    instance.setState({ newTask: 'Create Todo App' });
    instance.addTask({ preventDefault: jest.fn() });
    expect(apiCalls.postData).toHaveBeenCalled();
  });
});

describe('deleteTask', () => {
  it('should call deleteTask with parameter id', () => {
    jest.spyOn(apiCalls, 'deleteData');
    const wrapper = shallow(<Homepage />);
    const event = {
      target: {
        id: 1,
      },
    };
    const instance = wrapper.instance();
    instance.deleteTask(event);
    expect(apiCalls.deleteData).toHaveBeenCalledWith('http://localhost:8080/removeTask', event.target.id);
  });
});
