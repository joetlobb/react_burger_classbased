import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-1fc0e.firebaseio.com/'

})

export default instance;