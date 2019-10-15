import axios from 'axios'
import { Loading,Message } from 'element-ui';
import router from "./router/index";
let loading;

function startLoading() {
    loading = Loading.service({
        lock:true,
        text: "拼命加载中...",
        background:'rgba(0,0,0,0.7)'
    });
}
function endLoading() {
    loading.close();
}
//  请求拦截
axios.interceptors.request.use(config=>{
    // 在发送请求之前做些什么
//    加载动画
    startLoading();
    if (localStorage.eleToken) {
    //    设置统一的请求头
        config.headers.Authorization = localStorage.eleToken;

    }

    return config;
},error => {
    //对请求错误做些什么
    return Promise.reject(error);
});

axios.interceptors.response.use(res=>{
//    对响应数据做些什么
//    结束加载动画
    endLoading();
    return res;

},error => {
    //对响应错误做些什么
    //错误提醒
    endLoading();
    Message.error(error.response.data);

    //获取错误状态码
    const {status} = error.response;
    if (status == 401) {
        Message.error("token失效，请重新登录");
    //    清楚token
        localStorage.removeItem("eleToken");
    //    跳转到登录页面
        router.push("/login");
    }

    return Promise.reject(error);
});

//  响应拦截
export default  axios;