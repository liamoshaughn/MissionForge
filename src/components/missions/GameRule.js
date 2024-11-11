import { useState } from 'react';
import deck from '../../warhammer-deck.json';
import { useStore } from '../../store/store';
import Autocomplete from '../Autocomplete';

export default function GameRule() {
  const store = useStore();
  const rule = useStore((state) => state.rule);

  const [maelstrom, setMaelstrom] = useState(false);

  const determineRule = () => {
    let missions = deck.mission_rules;
    const randNum = Math.floor(Math.random() * 12);

    if (missions[randNum].name === 'Maelstrom of Battle') {
      // Remove "Maelstrom of Battle" from missions
      missions = missions.filter((mission) => mission.name !== 'Maelstrom of Battle');

      // Draw two new missions
      const drawnMissions = [];
      for (let i = 0; i < 2; i++) {
        const newRandNum = Math.floor(Math.random() * missions.length);
        drawnMissions.push(missions[newRandNum]);
        // Remove the drawn mission from missions
        missions.splice(newRandNum, 1);
      }

      // Check if any of the drawn missions is "Chilling Rain"
      const chillingRainIndex = drawnMissions.findIndex((mission) => mission.name === 'Chilling Rain');
      if (chillingRainIndex !== -1) {
        // Remove "Chilling Rain" from the selected array
        drawnMissions.splice(chillingRainIndex, 1);

        // Draw two new missions to replace "Chilling Rain"
        for (let i = 0; i < 2; i++) {
          const newRandNum = Math.floor(Math.random() * missions.length);
          drawnMissions.push(missions[newRandNum]);
          // Remove the drawn mission from missions
          missions.splice(newRandNum, 1);
        }
      }

      store.setRule(drawnMissions);
    } else {
      store.setRule([missions[randNum]]);
    }
  };

  const handleSelection = (selection) => {
    if (selection.name === 'Maelstrom of Battle') {
      setMaelstrom(true);
    } else {
      const rulesArray = rule || [];
      rulesArray.push(selection);
      store.setRule(rulesArray);
    }
  };


  return (
    <div style={{ width: '100%', height: 'fit-content' }}>
      <h2>Mission Rule</h2>
      <Autocomplete data={deck.mission_rules} select={(selection) => handleSelection(selection)} />
      {maelstrom ? (
        <>
          <Autocomplete data={deck.mission_rules} select={(selection) => handleSelection(selection)} />
          <Autocomplete data={deck.mission_rules} select={(selection) => handleSelection(selection)} />
          <Autocomplete data={deck.mission_rules} select={(selection) => handleSelection(selection)} />
        </>
      ) : null}
      {rule?.length >= 2 && <div><p>Maelstrom of Battle, extra rules have been drawn</p></div>}
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '30px' }}>
        {rule ? (
          <>
            {rule.map((mission, index) => (
              <div key={index} style={{ border: '1px solid white', padding: '20px', flex: '1' }}>
                <h3>{mission.name}</h3>
                <div style={{ fontSize: '12px' }}>
                  <h4>
                    <strong>Rule</strong>
                  </h4>
                  <p>{mission.rule}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <button onClick={() => determineRule()}>Draw Rule</button>
        )}
      </div>
    </div>
  );
}
