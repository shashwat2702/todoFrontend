import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Task from '../Task';
import * as apiCalls from '../../../utils/getData';

describe('Task snapshot', () => {
  it('should render correctly', () => {
    const TaskSnap = renderer.create(<Task
      task="Create Todo"
      id={1}
      onDelete={jest.fn()}
    />);
    const TaskJson = TaskSnap.toJSON();
    expect(TaskJson).toMatchSnapshot();
  });
});

describe('makeEditable', () => {
  it('should set readonly attribute inside state to false', () => {
    jest.spyOn(apiCalls, 'getData');
    const wrapper = shallow(<Task
      task="Create Todo"
      id={1}
      onDelete={jest.fn()}
    />);
    const instance = wrapper.instance();
    expect(instance.state.readonly).toEqual(true);
    instance.makeEditable();
    expect(instance.state.readonly).toEqual(false);
  });
});

describe('handleInputChange', () => {
  it('should set value in task attribute of state', () => {
    const wrapper = shallow(<Task
      task="Create Todo"
      id={1}
      onDelete={jest.fn()}
    />);
    const instance = wrapper.instance();
    const event = {
      target: {
        name: 'task',
        value: 'Create',
      },
    };
    instance.handleInputChange(event);
    expect(instance.state.task).toEqual(event.target.value);
  });
});

describe('updateTask', () => {
  it('should call updateData with parameter taskId and new task', () => {
    jest.spyOn(apiCalls, 'updateData');
    const wrapper = shallow(<Task
      task="Create Todo"
      id={1}
      onDelete={jest.fn()}
    />);
    const event = {
      preventDefault: jest.fn(),
    };
    const newState = { task: 'Updated Task', taskId: 1 };
    const instance = wrapper.instance();
    instance.setState(newState);
    instance.updateTask(event);
    expect(apiCalls.updateData).toHaveBeenCalledWith('http://localhost:8080/updateTask', newState.taskId, newState.task);
  });
});
