import deck from '../../warhammer-deck.json';
import { useStore } from '../../store/store';
import { useEffect, useState } from 'react';
import MissionCard from '../MissionCard';

export default function Secondary(props) {
  const store = useStore();
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
        ...deck.secondary_missions.fixed.filter((mission) => !selectedMissions.includes(mission)),
        ...deck.secondary_missions.tactical.filter((mission) => !selectedMissions.includes(mission)),
      ];

      // Shuffle the remaining missions
      const shuffled = remainingMissions.sort(() => Math.random() - 0.5);


      console.log(shuffled);
      store.setDeck(shuffled);
    } else {
      const shuffled = deck.secondary_missions.tactical;
      console.log(shuffled);
      store.setDeck(shuffled);
    }
    props.nextPhase();
  };

  const handleClick = (mode) =>{
    setType(mode);
    setSelectedMissions([]);
  }

  useEffect(() => {
    store.setMode(type);
  }, [type]);

  useEffect(() => {
    store.setSecondary(selectedMissions);
  }, [selectedMissions]);



  return (
    <div style={{ width: '100%', height: 'fit-content' }}>
      <h2>Secondary Missions</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => handleClick('fixed')}>Fixed</button>
        <button onClick={() => handleClick('tactical')}>Tactical</button>
        {selectedMissions.length === 2 && <button onClick={handleNext}>Next</button>}
      </div>
      {type === 'fixed' && (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {deck.secondary_missions.fixed.map((mission, index) => (
             <MissionCard toggleSelection={()=>toggleSelection(mission)} selectedMissions={selectedMissions} mission={mission} key={index}/>
          ))}
        </div>
      )}
      {type === 'tactical' && (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {deck.secondary_missions.tactical.map((mission, index) => (
            <MissionCard toggleSelection={()=>toggleSelection(mission)} selectedMissions={selectedMissions} mission={mission} key={index}/>
          ))}
        </div>
      )}
    </div>
  );
}
