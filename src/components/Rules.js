import { useEffect, useState } from "react";
import { useStore } from "../store/store";


export default function Rules(props){

    const rules  = useStore((state) => state.gameRules)
    const [increment, setIncrement] = useState(0);


    useEffect(()=>{
        if(increment >= 13){
            props.nextPhase();
        }
    },[increment, props])

    return(
    <div style={{width:"50vw", display:"flex", gap:"5vw"}}>
        <div style={{width:"95%"}}>
            <h2>{increment + 1} - {rules[increment].title}</h2>
            <p>
                {rules[increment].instruction}
            </p>
        </div>
        <div style={{marginTop:"200px", display:"flex", gap:"10px", flexDirection:"column"}}>
            <button onClick={()=>props.nextPhase()}>Skip</button>
            <button onClick={()=>setIncrement(increment+1)}>Next</button>
        </div>
    </div>
    );
}