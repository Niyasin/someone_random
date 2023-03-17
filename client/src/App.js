import Hero from './Components/Hero'
import Form from './Components/Form'
import Chat from './Components/Chat';
import {io} from 'socket.io-client';
import { useState } from 'react';
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
  const [data,setData]=useState(dummy);
  const [user,setUser]=useState(null);
  const [stage,setStage]=useState(0);

  const test=()=>{
    let xhr=new XMLHttpRequest();
    xhr.open('GET','/test');
    xhr.onload=()=>{
      console.log(xhr.responseText);
    }
    xhr.send();
  }
  var socket = null;
  const connect=()=>{
    socket = io({
      auth:{
        name:'niyas',
        tags:[],
      }
    });
  }

  return (
  <>
    {stage==3?
      <Chat data={data}/>
      :
      <div className="container">
            <img src="./main.png" className="mainImage"/>
            {/* <div className="button" onClick={test}>Test</div> */}
            {stage==0?<Hero setStage={setStage}/>:
              <>{stage==1?<Form connect={connect} />:
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