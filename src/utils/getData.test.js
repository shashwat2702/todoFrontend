import { getData, postData } from './getData';

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
    });
    done();
  });
});

describe('postData () :', () => {
  let getMock;
  beforeAll(() => {
    getMock = jest.spyOn(axios, 'post');
    getMock.mockImplementation(() => Promise.resolve(mockPosts));
  });
  afterAll(() => {
    getMock.mockRestore();
  });
  it('should return an object', async (done) => {
    postData('http://localhost:8080/books', { key: 'dummy' }).then((data) => {
      expect(data).toEqual(mockPosts);
    });
    done();
  });
});
