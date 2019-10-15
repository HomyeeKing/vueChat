<template>
    <div class="showMsg">
        <div class="bubble" v-if="direction">
            <el-avatar :size="40" :src="avatar?avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
            <span class="username">{{username}}:</span>
            <span class="content">{{msg}}</span>
        </div>
        <div class="bubble" v-else>
            <span class="content">{{msg}}</span>
            <span class="username">:{{username}}</span>
            <el-avatar :size="40" :src="avatar?avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>

        </div>
    </div>

</template>

<script>
    export default {
        name: "showMsg",
        props: {
            msg: String,
            avatar:String,
            username:String,
            direction:Boolean
        },
    }
</script>

<style scoped>
    .showMsg {
        margin-bottom: 20px;
    }
    .showMsg .content{
        color:#fff;
        height: auto;
        background-color: cornflowerblue;
        border-radius: 20px;
        padding: 5px;
    }
    .showMsg .content:hover {
        top: -2px;
        left: -2px;
        -moz-box-shadow: 3px 3px 2px hsla(0, 0%, 0%, 0.3);
        -webkit-box-shadow: 3px 3px 2px hsla(0, 0%, 0%, 0.3);
        box-shadow: 3px 3px 2px hsla(0, 0%, 0%, 0.3);
    }
    .showMsg .bubble .username{
        color:green;
        font-weight: bold;
        font-size:18px;
        position: relative;
        top: 0;
    }

</style>