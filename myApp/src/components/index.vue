<template>
    <div class="index">
        <div class="form">
            <span class="title">What's your nickname?</span>
            <el-form :rules="rules" @submit.native.prevent>
                <el-form-item>
                    <el-input
                            class="username"
                            @keyup.enter = "skip"
                            v-model="username"
                            placeholder="请输入昵称"
                            @keyup.enter.native="skip">

                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

    export default {
        name: "index",
        data(){
            return{
                username:"",
                rules:{
                    username:[
                        {
                            required:true,
                            message: "请输入昵称",
                            trigger: "blur"
                        }
                    ]
                }
            }
        },
       methods:{
            skip(){
                if (this.username == "") {
                    alert("请输入nickname");
                }else{
                    this.$socket.emit("welcome",{
                        username:this.username
                    });
                    this.$router.push('/chat');
                }
            }
       }

    }
</script>

<style scoped>
.index{
    width: 100%;
    height: 100%;
    background-color: #000;
}
.index .form{
    position: absolute;
    left:40%;
    top: 300px;
    text-align: center;
}

.index span {
    color: #fff;
    font-family: "Microsoft YaHei";
    font-size: 2em;
}


</style>