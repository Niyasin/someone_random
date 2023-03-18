import { useEffect, useRef, useState } from "react"

export default function Chat({data,messages,send}){
    const [message,setMessage]=useState('');
    const inp=useRef(null);
    const last=useRef(null);
    useEffect(()=>{
        if(last.current){
            last.current.scrollIntoView();
        }
        },[messages])
    return(
    <div className="wrap">
           <div className="profile">
            <img src="avatar.jpg"/>
            <h2>{data.name}</h2>
            <div className="tagcontainer center">
                {data.tags.map((e,i)=>{
                    return(<Tag key={i}>{e}</Tag>)
                })}
            </div>
            <div className="button wide">Next</div>
           </div>

           <div className="chat">
            <div className="messages">
                {
                    messages.map((m,i)=>{
                        return(<>
                            {i==messages.length-1?
                                <div className={m.dir?"message send":"message recieved"} ref={last}>{m.text}</div>
                                
                                :
                                <div className={m.dir?"message send":"message recieved"} >{m.text}</div>
                            }
                        </>)
                    })
                }
            </div>
            <div className="inputcontainer">
                <input onChange={e=>{setMessage(e.target.value);}} ref={inp}/>
                <div className="sendbtn" onClick={()=>{
                        if(message.length){
                            send(message);
                            inp.current.value='';
                            setMessage("")
                        }
                    }
                }>
                <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                </div>
            </div>
            </div> 
    </div>
    )
}


const Tag=({children})=>{
    return(
      <div className="tag">
      {children}
    </div>
      )
  }