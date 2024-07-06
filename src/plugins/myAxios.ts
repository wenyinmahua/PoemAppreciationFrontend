import axios from "axios";
import {message} from "ant-design-vue";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api',
    timeout: 1000,
    headers: {}
});


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    const data = response.data;
    if (data.code === 0){
        // message.success(data.message)
        return data.data;
    }else {
        message.error(data.description || data.message || '未知错误');
    }


}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;