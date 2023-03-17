export default function Chat({data}){
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
                    data.messages.map((m,i)=>{
                        return(
                            <div className={m.dir?"message send":"message recieved"}>{m.text}</div>
                        )
                    })
                }
            </div>
            <div className="inputcontainer">
                <input/>
                <div className="sendbtn">
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