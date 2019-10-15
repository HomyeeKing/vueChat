#websocket 使用
> websock 
是基于tcp的协议，只需连接一次就可以永久性连接，并进行双向数据传输    
可以跨域
## 安装
```
cnpm i ndoe-websocket -S
```
##websocket 方法
|  方法  | 描述  |
|  ----  | ----  |
| Socket.send()  | 使用连接时发送数据 |
| Socket.close() | 关闭连接 |

##websocket事件
|  事件  | 描述  |
|  ----  | ----  |
| Socket.onopen | 连接建立时触发 |
| Socket.onmessage | 客户端接收服务端返回的数据
|Socket.onerror|通信发生错误时触发|
|Socket.onclose|连接关闭时触发|
##创建websocket服务器
```$xslt
 const ws = require("nodejs-websocket");
 //创建服务端口号
 ws.createServer(con=>{
     console.log("检测到用户进入");//当客户端访问这个端口就会打印这条消息
     
 
 }).listen(8000,()=>{
     console.log('port 8000 is listened');
 });

 
```
##客户端
```$xslt
      var ws = new WebSocket("ws://localhost:8000");//客户端访问服务端    
```
##客户端向服务端发送数据
```
 ws.onopen = (ev)=>{
        console.log("连接成功");
        ws.send("来自客户端的数据");
      }
```
###服务端接收并向客户端返回数据
```$xslt
//服务端sendText()
 con.on('text',(str)=>{
       console.log(str);//接收客户端数据，
       con.sendText("客户端返回的数据")
   });
   //客户端接收 onmessage()
   ws.onmessage = (ev => {
           console.log(ev.data);
         });
   
```