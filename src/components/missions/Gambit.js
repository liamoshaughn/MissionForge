import { useEffect, useState } from 'react';
import deck from '../../warhammer-deck.json';
import { useStore } from '../../store/store';
import MissionCard from '../MissionCard';

export default function Gambit(props) {
    const store = useStore();




    const determineGambits = () => {
        const randNum = Math.floor(Math.random() * 3);
        let selectedGambits =deck.gambits.choices.filter((element, index) => index !== randNum);
        selectedGambits.push(deck.gambits.proceed);
        return selectedGambits ;

    };
    const handleClick = (gambit) =>{
        return store.setGambit(gambit)
    }


    return (
        <div style={{width:"100%", height:"fit-content"}}>
            <h2>Select Gambit</h2>
            <div style={{display:"flex", gap:"30px",justifyContent:"center"}}>
                {determineGambits().map((gambit, index)=>{
                    return(
                        <div
                        key={index}
                        onClick={()=> handleClick(gambit)}
                        style={{
                          width: '300px',
                          padding: '10px',
                          position: "relative",
                          border: '1px solid white',
                          cursor: 'pointer' ,
                        }}
                      >
                        <h5>{gambit.name}</h5>
                        <p style={{ fontSize: '10px', paddingBottom:"20px" }}>{gambit.gambit}</p>
                      </div>
                    )
                })}
            </div>
        </div>
    );
}
