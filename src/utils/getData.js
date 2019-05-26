const axios = require('axios');

const getData = url => axios.get(url);
const postData = (url, task) => axios({
  method: 'post',
  url,
  data: task,
});
export { getData, postData };
