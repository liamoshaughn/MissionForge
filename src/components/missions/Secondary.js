import { useStore } from '../../store/store';
import { useEffect, useState } from 'react';
import CardCanvas from '../3D/Canvas';

export default function Secondary(props) {
  const store = useStore();
  const deck = useStore((state) => state.gamemode)
  const [type, setType] = useState();
  const [selectedMissions, setSelectedMissions] = useState([]);

  const toggleSelection = (mission) => {
    if (selectedMissions.includes(mission)) {
      // If mission is already selected, deselect it
      setSelectedMissions(selectedMissions.filter((selected) => selected !== mission));
    } else {
      // If mission is not selected, add it to the selectedMissions array
      if (selectedMissions.length === 2) {
        // If two missions are already selected, remove the oldest one
        setSelectedMissions([selectedMissions[1], mission]);
      } else {
        setSelectedMissions([...selectedMissions, mission]);
      }
    }
  };


  const handleNext = () => {
    if (type === 'tactical') {
      const remainingMissions = [
        ...deck.secondary_missions.fixed,
        ...deck.secondary_missions.tactical,
      ];

      // Shuffle the remaining missions
      const shuffled = remainingMissions.sort(() => Math.random() - 0.5);
      store.setSecondary([shuffled.pop(), shuffled.pop()]);


      store.setDeck(shuffled);
    } else {
      store.setSecondary(selectedMissions);
      const shuffled = deck.secondary_missions.tactical;
      store.setDeck(shuffled);
    }
    props.nextPhase();
  };

  const handleClick = (mode) =>{
    setType(mode);
    setSelectedMissions([]);
  }

  useEffect(() => {
    if(!store.mode && type){
      store.setMode(type);
    }
    
  }, [type, store]);




  return (
    <div style={{ width: '100%', height: 'fit-content' }}>
      <h2>Secondary Missions</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => handleClick('fixed')}>Fixed</button>
        <button style={{zIndex:"2"}} onClick={() => handleClick('tactical')}>Tactical</button>
        {selectedMissions.length === 2 && <button style={{position:'absolute', zIndex:2, bottom: "10vh", left:'50vw', transform: 'translate(-50%, -50%)',}} onClick={handleNext}>Next</button>}
      </div>
      {type === 'fixed' && (
        <CardCanvas
        carousel={true}
        data={deck.secondary_missions.fixed}
        onClick={(mission) => toggleSelection(mission)}
        selected = {selectedMissions}
        onPointerEnter={null}
        onPointerLeave={null}
        style={{ width: '100vw', height: '100%', bottom: 0, top:"auto" }}
      />
      )}
      {type === 'tactical' && (
        <div style={{ display: 'flex', gap: '20px', flexDirection:"column" }}>
          By clicking next you confirm that you are using Tactical Missions
          <div>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
