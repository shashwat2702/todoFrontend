import {
  getData, postData, updateData, deleteData,
} from './getData';

const axios = require('axios');

const mockPosts = {
  'J K Rowling': [
    {
      Author: 'J K Rowling',
      id: 10,
      Name: 'Harry Potter and the Sorcerers Stone (Harry Potter, #1)',
      rating: 4.45,
    },
  ],
  'Sidney Sheldon': [
    {
      Author: 'Sidney Sheldon',
      id: 80,
      Name: 'If Tomorrow Comes (Tracy Whitney Series, #1)',
      rating: 4.02,
    },
  ],
};

describe('getData () :', () => {
  let getMock;
  beforeAll(() => {
    getMock = jest.spyOn(axios, 'get');
    getMock.mockImplementation(() => Promise.resolve(mockPosts));
  });
  afterAll(() => {
    getMock.mockRestore();
  });
  it('should return an object', async (done) => {
    getData('http://localhost:8080/books').then((data) => {
      expect(data).toEqual(mockPosts);
      expect(getMock).toHaveBeenCalled();
    });
    done();
  });
});

describe('postData () :', () => {
  let postMock;
  beforeAll(() => {
    postMock = jest.spyOn(axios, 'post');
    postMock.mockImplementation(() => Promise.resolve(mockPosts));
  });
  afterAll(() => {
    postMock.mockRestore();
  });
  it('should return an object', async (done) => {
    postData('http://localhost:8080/books', { key: 'dummy' }).then((data) => {
      expect(data).toEqual(mockPosts);
      expect(postMock).toHaveBeenCalled();
    });
    done();
  });
});
const mockUpdateResponse = {
  updated: true,
  taskId: 1,
};
describe('updateData () :', () => {
  let updateMock;
  beforeAll(() => {
    updateMock = jest.spyOn(axios, 'put');
    updateMock.mockImplementation(() => Promise.resolve(mockUpdateResponse));
  });
  afterAll(() => {
    updateMock.mockRestore();
  });
  it('should return an object', async (done) => {
    updateData('http://localhost:8080/updateTask', 1, 'Updated Task').then((data) => {
      expect(data).toEqual(mockUpdateResponse);
      expect(updateMock).toHaveBeenCalled();
    });
    done();
  });
});
const mockdeleteResponse = {
  deleted: true,
  taskId: 1,
};
describe('deleteData () :', () => {
  let deleteMock;
  beforeAll(() => {
    deleteMock = jest.spyOn(axios, 'delete');
    deleteMock.mockImplementation(() => Promise.resolve(mockdeleteResponse));
  });
  afterAll(() => {
    deleteMock.mockRestore();
  });
  it('should return an object', async (done) => {
    deleteData('http://localhost:8080/updateTask', 1).then((data) => {
      expect(data).toEqual(mockdeleteResponse);
      expect(deleteMock).toHaveBeenCalled();
    });
    done();
  });
});
