import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

const router = new Router({

    routes:[
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/index",
            component: () => import("../components/index")
        },
        {
            path: "/login",
            name:"login",
            component: () => import("../components/login")
        },
        {
            path: "/chat",
            name:"chat",
            component: () => import("../components/chat")
        },
        {
            path: "/register",
            name:"register",
            component: () => import("../components/register")
        },
        {
            path: "/showMsg",
            name:"msg",
            component: () => import("../components/showMsg")
        },
        {
            path:'*',
            name:"/404",
            component:()=>import("../components/notFound.vue")
        }
    ]
});
//路由守卫
router.beforeEach((to, from, next) =>{
    const isLogin  = sessionStorage.eleToken?true:false;
    if (to.path == "/login" || to.path == "/register"||to.path == '/showMsg') {
        next();
    }else{
        isLogin ? next() : next("/login");
    }
});

export default router;