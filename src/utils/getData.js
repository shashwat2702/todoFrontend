const axios = require('axios');

const getData = url => axios.get(url);
const postData = (url, task) => axios({
  method: 'post',
  url,
  data: task,
});
const updateData = (url, id, task) => axios({
  method: 'put',
  url: `${url}/${id}`,
  data: task,
});
const deleteData = (url, id) => axios({
  method: 'delete',
  url: `${url}/${id}`,
});
export {
  getData, postData, updateData, deleteData,
};
