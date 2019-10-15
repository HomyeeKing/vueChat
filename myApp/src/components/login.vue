<template>
    <div class="index">
        <div class="panel">
            <section>
                <el-form :model="userInfo" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="userInfo.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="userInfo.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btn"  type="primary" size="medium" @click="submitForm('ruleForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </section>
            <div class="register">
                <span>没有账号？赶紧<router-link to="/register">注册</router-link>吧！</span>
            </div>
        </div>
    </div>

</template>

<script>
    import jwt_decode from "jwt-decode"



    export default {
        name: "login",
        data(){
            return{
                userInfo:{
                    email: "",
                    password: "",
                    name:""
                },
                rules:{
                    email:[
                        {
                            type: "email",
                            required:true,
                            message:"邮箱格式不正确",
                            trigger: "blur"
                        }
                    ],
                    password:[
                        {
                            required:true,
                            message: "密码不能为空",
                            trigger: "blur"
                        },{
                            min:6,
                            max:30,
                            message: "密码长度在6-30之间",
                            trigger:"blur"
                        }
                    ]
                }
            }
        },
        methods:{
            isEmpty(value){
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === 'object' && Object.keys(value).length===0) ||
                    (typeof value === 'string' && value.trim().length===0)
                );
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/api/users/login",this.userInfo)
                            .then(res=>{
                                const {token} = res.data;
                                sessionStorage.setItem("eleToken", token);
                                const decode = jwt_decode(token);
                                this.name = decode.name;
                                if(localStorage.getItem("vuex")){
                                    let vuex =  localStorage.getItem("vuex");
                                    vuex = JSON.parse(vuex);
                                    //获取已经登录的用户信息
                                    let users = vuex.users;
                                    //如果输入的账户已经登陆 则禁止登录
                                    const isLogin = users.find(item =>{
                                        return item.name == decode.name;
                                    });
                                    if (isLogin) {
                                        this.$message({
                                            type: "warning",
                                            message:"当前用户已登录！"
                                        })
                                    }else{
                                        //登录成功后认证
                                        this.$store.dispatch("setAuthenticated", !this.isEmpty(decode));
                                        this.$store.dispatch("setUser", decode);
                                        //告诉后端登录的对象
                                        this.$socket.emit('online', decode);
                                        this.$socket.emit('userCount');


                                        this.$router.push("/chat");
                                    }

                                }


                            });
                    }
                });
            }
        }


    }
</script>

<style scoped>
    .index {
        width: 100%;
        height: 100%;
        background: url("../assets/bg.jpg") no-repeat center center;
        background-size: 100% 100%;
    }

    .panel {
        width: 30em;
        height: 300px;
        position: relative;
        top: 150px;
        left: 30%;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border-radius: 10px;

    }

    .panel section {
        position: relative;
        left: -30px;
        top: 70px;
    }

    section .btn {
        width: 370px;
        height: 40px;
    }
    .panel .register{
        position: relative;
        left: 200px;
        top: 60px;
    }
    .panel .register span{
        color: #f40;
    }

</style>