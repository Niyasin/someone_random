const express = require("express");
const {Server} =  require("socket.io");
const {createServer} = require("http");
const path = require("path");


const app=express();
const server=createServer(app);
const io = new Server(server);


var users=[];
var waiting=[];




const match=(user)=>{
    if(waiting.length==0){
        waiting.push(user);
    }else{
        let possible = [];
        waiting.forEach((e,i)=>{
            if(!user.blocklist.includes(e.socket.id)){
                possible.push({...e,index:i});
            }
        })
        if(possible.length){
            let selected =findBest(possible,user);
            io.to(selected.socket.id).emit('match',{
                id:user.socket.id,
                ...user.socket.handshake.auth,
            });
            io.to(user.socket.id).emit('match',{
                id:selected.socket.id,
                ...selected.socket.handshake.auth,
            });
            
            waiting=waiting.filter(e=>{if(e.socket.id==possible[0].socket.id){return false}else{return true}});
        }else{
            waiting.push(user);
        }
    }
}

const findBest=(possible,user)=>{
    let topIndex=0;
    let topScore=0;
    let 
    tags=user.socket.handshake.auth.tags;
    possible.forEach((e,i)=>{
        let score=0;
        e.socket.handshake.auth.tags.forEach(t=>{
            if(tags.includes(t)){
                score++;
            }
        });
        if(score>topScore){
            topScore=score;
            topIndex=i;
        }
    });
    return(possible[topIndex]);
}

io.on('connection', async (socket)=>{
    users= await (await io.sockets.fetchSockets()).map(e=>{return(
        {
            id:e.id,
            ...e.handshake.auth,
        }
    )});
    socket.on('find',(blocklist)=>{
        match({socket,blocklist});
    })
    socket.on('message',(data)=>{
        if(socket.id==data.from){
            socket.to(data.to).emit('message',data);
        }
    })
});


app.get('/test',(req,res)=>{
    console.log("😋");
    res.send("😋");
})
app.use(express.static(path.join(__dirname,'client','build')));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'));
})

app.get('/clear',(req,res)=>{
    waiting=[];
    res.send("cleared");
})
server.listen(8080);
console.log("Server Started 🚀");