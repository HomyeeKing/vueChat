<template>
    <div class="index">
        <div class="panel">
            <section>
                <el-form :model="registerUser" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input  v-model="registerUser.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="registerUser.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerUser.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2">
                        <el-input type="password" v-model="registerUser.password2" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btn"  type="primary"  @click="submitForm('ruleForm')">立即注册</el-button>
                    </el-form-item>
                </el-form>
            </section>
            <div class="register">
                <span>已有账号，现在<router-link to="/login">登录</router-link></span>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: "register",
        data(){
            var validatePass2 = (rule, value, callback) => {
                if (value !== this.registerUser.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                registerUser:{
                    name: "",
                    email: "",
                    password: "",
                    password2: ""
                },
                rules:{
                    name:[{
                        required:true,
                        message: "用户名不能为空",
                        trigger:"blur"
                    },{
                        min:2,max:30,
                        message: "长度在2-30个字符之间",
                        trigger:"blur"
                    }],
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
                    ],
                    password2:[{
                        required:true,
                        message: "确认密码不能为空",
                        trigger:"blur"
                    },{
                        min:6,
                        max:30,
                        message:"密码长度在6-30之间",
                        trigger:"blur"

                    },{
                        validator:validatePass2,
                        trigger:"blur"
                    }]

                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/api/users/register",this.registerUser)
                            .then(res=>{
                                this.$message({
                                    message: "注册成功！",
                                    type:"success"
                                })
                            });
                        this.$router.push("/login");
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
        background: url(../assets/bg.jpg);
    }

    .panel {
        width: 30em;
        height: 400px;
        position: relative;
        top: 150px;
        left: 30%;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border-radius: 10px;

    }

    .panel section {
        position: relative;
        left: -20px;
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