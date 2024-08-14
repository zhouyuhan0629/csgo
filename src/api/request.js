import axios from 'axios';

const requestApi = axios.create({
   baseURL: 'http://localhost:3002', 
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token') 
  }
});

requestApi.interceptors.request.use(
    async config => {
      if (localStorage.getItem('token')) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      }
      return config;
    },
  );

   

 const http = async function (params) {
    let res = await requestApi.get('/api/v1/getAccessToken', {});
    console.log(res);
    localStorage.setItem('token',res.data.access_token)
    return requestApi(params)
}
export default http;
