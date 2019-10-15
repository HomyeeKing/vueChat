<template>
    <div class="chat">
        <el-menu
                class="el-menu-demo"
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-submenu index="2">
                <template slot="title">个人管理</template>

                <el-menu-item index="2-1"  @click="handleSelect">退出登录</el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="top">
            <span class="title">IRON FRIENDS</span>
            <span class="onlinePeople">({{activeUser}}人在线)</span>
        </div>
        <div class="showMsg">
            <p v-for="u in users" class="tips">{{u}} 加入房间</p>
            <ul >
                <li
                    v-for="m in messages"
                    :key="m.id"
                    :class="{me:(m.name == username)}"
                >
                    <bubble
                            :direction="!(m.name == username)"
                            :msg="m.message"
                            :username="m.name"
                            :avatar="avatar"
                           >

                    </bubble>
                </li>
            </ul>
        </div>


        <div class="bottom">
            <el-form @submit.native.prevent>
                <el-form-item >
                    <el-input type="textarea"
                              v-model="message"
                              clearable
                                class="msgBox"
                    @keyup.enter.native="sendMsg">

                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="danger"  @click="sendMsg">发送</el-button>
                </el-form-item>
            </el-form>

        </div>

    </div>

</template>

<script>

    import {mapGetters, mapActions} from "vuex";
    import bubble from "./showMsg";
    export default {
        name: "chat",
        data() {

            return {
                info: 1,
                messages: [],
                message:"",
                username: "",
                avatar:"",
                activeUser:0,
                users:[]
            }
        },
        created() {
            $("body").css("background",'dodgerblue');
        },
        updated() {
            //实时更新当前在线用户
            this.$socket.emit("updateNum");

        },
        sockets: {
            setValue({name,avatar}) {
                this.username = name;
                this.avatar = avatar;
                this.users.push(name);
            },
            userCount(num) {
                this.activeUser = num;
            },
            offline(name) {
                this.$message({
                    message: `${name}离开了聊天室`,
                    duration:5000,
                })

            },
            receiveMsg(data) {
                this.messages.push(data);

            },


        },
        methods: {

            sendMsg() {
                console.log(this.username);
                this.$socket.emit("sendMsg", this.message,this.username);
                this.message = ""
            },
            handleSelect() {
                this.$socket.emit('offline',this.username);
                this.$store.dispatch('clearCurrentState',this.username);
                sessionStorage.removeItem("eleToken");
                this.$router.push('/login')
            }

        },
        components:{bubble}

    }
</script>

<style scoped>
    /*body{*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    position: fixed;*/
    /*}*/
    .chat {
        width: 70%;
        height: 90%;
        margin: 0 auto;
        /*background-color: #fff;*/
    }
    .chat .top{
        width: 100%;
        height: 10%;
        text-align: center;
        border: 1px solid #000;
        background-color: gold;
        margin-bottom: -16px;
    }
    .chat .top .title{
        font-weight: bold;
        font-size: 2em;
        line-height: 2em;
    }
    .chat .top .onlinePeople{
        margin-left: 30px;
    }

    .chat .showMsg{
        width: 100%;
        height: 72%;
        background-color: gold;
        border-left: 1px solid #000;
        border-right: 1px solid #000;
    }
    .chat .showMsg .tips{
        text-align: center;
        color:#fff;
    }
    .chat .bottom {
        width: 100%;
        height: 18%;
        bottom: 0px;
    }
    .chat .bottom .btn {
        width: 105px;
        height: 35px;
        position: absolute;
        right:0px;
        bottom: -13px;
        padding: 10px;
    }
    .showMsg ul li{
        list-style: none;
    }
    .showMsg ul li.me {
        text-align: right;
        margin-right: 10px;
    }

</style>