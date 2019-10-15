const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require("body-parser");
const user = require("./user");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//解决跨域
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin",  '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); // 可以带cookies
    if(req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

//连接数据库
const mongoose = require('mongoose');
const db = require("./db").url;
mongoose.connect(db,{ useNewUrlParser: true } )
    .then(()=>{
        console.log(db);})
    .catch(()=>{
        console.log("连接数据库失败");});

app.use("/api/users", user);
var Users = [];
io.on('connection', function (socket) {

    // 上线
    socket.on('online',(user)=>{
        Users.push(user);
        console.log(Users);
        io.emit("setValue", user);
    });
    //实时更新在线用户
    socket.on("updateNum", ()=>{
        io.emit("userCount", Users.length);
    });
    //离开
    socket.on('offline',(name)=>{
        let index =  Users.findIndex(item=>{return item.name == name})
        //    清除状态中下线的user 如果存在删除
        Users.splice(index,1);
        console.log(Users);
        io.emit('offline', name);

    });
    //当前在线人数
    // 群聊
    socket.on('sendMsg', (msg,user) => {
        let data = {
            name:user,
            message:msg
        };
       io.emit('receiveMsg', data)
    });
    // 断开连接
    socket.on('disconnect', () => {
        console.log("offline");
    });
    socket.on('message',(msg)=>{
        console.log(msg);
    })

});



server.listen(3000,function(){
    console.log('listening on *:3000');
});