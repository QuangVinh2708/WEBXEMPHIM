import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:5000/api', // hoặc đường dẫn API chính xác của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Axios;
