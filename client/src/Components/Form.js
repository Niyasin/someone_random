import { useState } from "react"

export default function Form(){
  var avatars=['./avatar.jpg',];
  const [Tags,setTags]=useState(['Music','Painting','Astrology']);
  const [result,setResult]=useState([]);
  const [avatarSelect,setAvatarSelect]=useState(false);
  const [avatar,setAvatar]=useState(0);
    return(
        <div className="form">
              <h1>Your Self</h1>
              <div>
                <input placeholder="Give your self a name"/>
                <span>continue with something random <span className="green">lorem-ipsum</span></span>
              </div>
              <div>
                <input placeholder="Add some hashtags"/>
                {result.length?
                  <div className="dropdown">
                    {result.map((r,i)=>{
                      return(
                        <span key={i} onClick={()=>{setTags([...Tags].concat([r]));setResult([])}}>{r}</span>
                      )
                    })}
                  </div>
                :<></>}
                <div className="tagcontainer">
                {Tags.map((T,i)=>{
                  return(
                    <Tag key={i} text={T} close={()=>{let t=[...Tags];t.splice(i,1);setTags(t)}}/>
                    )
                  })}
                </div>
              </div>
              <div>
                <div className="avatarButton" onClick={()=>{avatarSelect?setAvatarSelect(false):setAvatarSelect(true)}}>
                  <img src={avatars[0]} className='avatar'/>
                  <span className="sm">Chose an avatar </span>
                </div>
                {avatarSelect?
                  <div className="avatarDropdown">
                    {avatars.map((a,i)=>{
                      return(
                          <img src={a} className='avatar' onClick={()=>{setAvatar(a);setAvatarSelect(false)}}/>
                        )
                    })}
                  </div>
                :<></>}
              </div>
                <div className="button">Find Someone</div>
          </div>
    )
}

const Tag=({text,close})=>{
  return(
    <div className="tag">
    <svg viewBox='0 0 16 16' onClick={close}>
      <path d="M15.1 3.1l-2.2-2.2-4.9 5-4.9-5-2.2 2.2 5 4.9-5 4.9 2.2 2.2 4.9-5 4.9 5 2.2-2.2-5-4.9z"></path>
    </svg>
    {text}
  </div>
    )
}