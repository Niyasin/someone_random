import Hero from './Components/Hero'
import Form from './Components/Form'
import Chat from './Components/Chat';
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
  const [data,setData]=useState(null);
  const [user,setUser]=useState(null);
  const [stage,setStage]=useState(0);
  return (
  <>
    {data?
      <Chat data={data}/>
      :
      <div className="container">
            <img src="./main.png" className="mainImage"/>
            {stage==0?<Hero/>:<Form/>}
      </div>
    }
    </>
  );
}

