const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../model/User");
const keys = require("./db");

const gravatar = require("gravatar");

//$route GET api/users/test
//@desc 返回请求的json数据
//@access public


router.get('/test', (req, res, next) => {
    res.json({msg:"login works"});
});

//$route POST api/users/register
//@desc 返回请求的json数据
//@access public
router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
        .then((user)=>{
            if (user) {
                return res.status(400).json("邮箱已被注册");
            }else{
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar,
                    password:req.body.password,
                });
                //加密密码
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        if(err) throw err;

                        newUser.password = hash;

                        newUser.save()
                            .then(user=>{
                                return res.json(user);})
                            .catch(err=>{
                                console.log(err);});
                    });
                });

            }
        })
});

//$route POST api/login
//@desc 返回token jwt passport
//@access public
router.post("/login",(req,res)=>{
    const email = req.body.email;
    const password =  req.body.password;
//    查询数据库
    User.findOne({email})
        .then((user)=>{
            if (!user) {
                return res.status(404).json("用户不存在");
            }

            //    密码匹配
            bcrypt.compare(password, user.password)
                .then( isMatch=>{
                    if(isMatch){
                        const rule = {
                            id:user.id,
                            name: user.name,
                            avatar:user.avatar,
                        };
                        jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                            if(err) throw err;
                            res.json({
                                success:true,
                                token:"Bearer " + token
                            })
                        })

                    }else{
                        return res.status(400).json("密码错误");
                    }
                })
        })
});


//$route GET api/users/current
//@desc return current user
//@access Private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
    });
});
module.exports = router;