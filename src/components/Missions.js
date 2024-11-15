import { useState } from "react";
import Primary from "./missions/Primary";
import GameRule from "./missions/GameRule";
import Deployments from "./missions/Deployments";
import Secondary from "./missions/Secondary";

export default function Missions(props){
    const [phase, setPhase] = useState(0);

    return(
    <div style={{width:"70vw",height:"100%"}}>
        {phase === 0 && <Primary />}
        {phase === 1 && <GameRule />}
        {phase === 2 && <Deployments />}
        {phase === 3 && <Secondary nextPhase={()=>props.nextPhase()} />}
        {phase !== 3 && <button style={{position:'absolute', zIndex:2, bottom: "10vh", left:'50vw', transform: 'translate(-50%, -50%)',}} onClick={()=>setPhase(phase+1)}s>Next</button>}
    </div>
    );
}