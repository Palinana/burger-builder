import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-c8bc7.firebaseio.com/'
});

export default instance;