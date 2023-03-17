export default function Hero({setStage}){
    return(
        <div className="hero">
            <div>
              <h1>Find Someone</h1>
              <h1>Random</h1>
            </div>
            <span className="sm">Connect with a stranger, discover a world of new possibilities!</span>
            <div className="button" onClick={()=>{setStage(1)}}>Get Started</div>
          </div>
    )
}