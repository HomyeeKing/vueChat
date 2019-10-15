import Vue from 'vue';
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"//页面刷新  vuex不重置
Vue.use(Vuex);
let vuex =  localStorage.getItem("vuex");
vuex = JSON.parse(vuex);
const types = {
    SET_AUTHENTICATIED: "SET_AUTHENTICATIED",
    SET_USER: "SET_USER",
    USERCOUNT:"USERCOUNT"
};
const state =  {
        isAuthenticated: false,
        users:[],
        userCount:0
};
const getters= {
    users:(state)=>state.users,
    userCount:(state)=>state.userCount
};
const mutations = {
    [types.SET_AUTHENTICATIED](state, isAutenticated) {
        if (isAutenticated) {
            state.isAuthenticated = true;
        } else {
            state.isAuthenticated = false;
        }
    },
    [types.SET_USER](state,user){
        if(user) state.users.push(user);
        else state.users = [];
    },

    ["userOffline"](state,user) {

           let index =  state.users.findIndex(item=>{return item.name == user})
            //    清除状态中下线的user 如果存在删除
            state.users.splice(0);


    },
    ["updateUser"](state, users) {
        state.users = users;
    },
};
const actions= {
    setAuthenticated: ({commit}, isAuthenticated) => {
        commit(types.SET_AUTHENTICATIED, isAuthenticated)
    },
    setUser: ({commit}, user) => {
        commit(types.SET_USER, user);
    },
    clearCurrentState: ({commit}, user) => {
        commit(types.SET_AUTHENTICATIED, false);
        commit("userOffline", user);
    },
    updateUser({commit}, users) {
        commit("updateUser", users);
    },
};
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,

    plugins:[createPersistedState({
        storage: window.localStorage
    })]

});
export default store;