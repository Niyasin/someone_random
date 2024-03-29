import Hero from './Components/Hero'
import Form from './Components/Form'
import Chat from './Components/Chat';
import {io} from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
export default function App() {
  const dummy={
    name:'Lorem Ipsum',
    tags:['music','TikTok','Art'],
    messages:[
      {dir:0,text:'Hello'},
      {dir:0,text:'Lorem Ipsum'},
      {dir:1,text:'Hello 😋'},
      {dir:1,text:'Hello Hi'},
      {dir:0,text:'Hello'},
      {dir:1,text:'Hello'},
    ]
  };
  const [data,setData]=useState();
  const [user,setUser]=useState(null);
  const [stage,setStage]=useState(0);
  const [current,setCurrent]=useState(null);
  const [messages,setMessages]=useState([]);
  const msgref=useRef();
  msgref.current=messages;

  const [socket,setSocket]=useState(null);


  const test=()=>{
    let xhr=new XMLHttpRequest();
    xhr.open('GET','/test');
    xhr.onload=()=>{
      console.log(xhr.responseText);
    }
    xhr.send();
  }

  const connect=(data)=>{
    setSocket(io({auth:data}))
    setUser({...data,blocklist:[]})
  }

  useEffect(()=>{
    if(socket){
      socket.on('connect',()=>{
        socket.emit('find',[]);
        setStage(2);
      });
      socket.on('match',(data)=>{
        console.log("🍎Match" ,data);
        setData({...data,messages:[]});
        setStage(3);
      });
  
      socket.on('message',(msg)=>{
        console.log(msg);
        // if(msg.from==data.id){
          setMessages([...msgref.current,{dir:0,text:msg.message}]);
        // }
      })
    }
  },[socket])
  function send(message){
    if(socket){
      socket.emit('message',{
        to:data.id,
        from:socket.id,
        message
      });
      setMessages(()=>[...messages,{dir:1,text:message}]);
    }
  }
  return (
  <>
    {stage==3?
      <Chat data={data} messages={messages} send={(d)=>{send(d,socket)}}/>
      :
      <div className="container">
            <img src="./main.png" className="mainImage"/>
            {stage==0?<Hero setStage={setStage}/>:
              <>{stage==1?<Form connect={connect} user={user} setUser={setUser}/>:
                <Loading/>
              }</>
              }
      </div>
    }
    </>
  );
}

const Loading=()=>{
  return(
    <div className="loading">
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}