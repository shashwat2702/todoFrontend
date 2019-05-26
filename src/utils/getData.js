const axios = require('axios');

const getData = url => axios.get(url);
const postData = (url, data) => axios({
  method: 'post',
  url,
  data,
});
export { getData, postData };
