import deck from '../../warhammer-deck.json';
import { useStore } from '../../store/store';
import Autocomplete from '../Autocomplete';

export default function Primary() {
    const store = useStore();
    const turn = useStore((state) => state.turn)
    const mission = useStore((state) => state.mission)
    const determineMission = () => {
        const randNum = Math.floor(Math.random() * 9);
        store.setMission(deck.primary_missions[randNum]);
    };




    return (
        <div style={{width:"100%", height:"fit-content"}}>
        <h2>Primary Mission</h2>
        <Autocomplete data={deck.primary_missions} select={(mission)=>store.setMission(mission)}/>
        {mission ? (
            <div style={{ border: '1px solid white', padding:"20px" }}>
            <h3>{mission.name}</h3>
            <div style={{ fontSize: '12px' }}>
                <h4><strong>Special Rule</strong></h4>
                <p>{mission.special}</p>
                <h4><strong>Battle Round - Turn {turn + 1}</strong></h4>
                <p>{mission.battle_rounds[turn]}</p>
            </div>
            </div>
        ) : <button onClick={()=>determineMission()}>Draw Mission</button>}
        </div>
    );
}
