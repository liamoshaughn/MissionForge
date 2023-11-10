import { useStore } from '../store/store';
import { useEffect, useState } from 'react';
import MissionCard from './MissionCard';
import Gambit from './missions/Gambit';

export default function Battle(props) {
  const store = useStore();
  const turn = useStore((state) => state.turn);
  const deck = useStore((state) => state.deck);
  const primaryScore = useStore((state) => state.primaryScore);
  const secondaryScore = useStore((state) => state.secondaryScore);
  const secondary = useStore((state) => state.secondary);
  const gambit = useStore((state) => state.gambit);

  const [currentPrimary, setCurrentPrimary] = useState(0);
  const [currentSecondary, setCurrentSecondary] = useState(0);
  const [gambitTime, setGambitTime] = useState(false);

  const handleDiscard = (discard) => {
    store.setSecondary(secondary.filter((mission) => mission !== discard));
  };

  const handleNext = () => {
    if (turn == 2) {
      setGambitTime(true);
    }
    const maxPrimaryScore = 50;
    const maxSecondaryScore = 40;
    const newPrimaryScore = store.primaryScore + Number(currentPrimary);
    const newSecondaryScore = store.secondaryScore + Number(currentSecondary);

    store.setPrimaryScore(Math.min(newPrimaryScore, maxPrimaryScore));
    setCurrentPrimary(0);
    
    store.setSecondaryScore(Math.min(newSecondaryScore, maxSecondaryScore));
    setCurrentSecondary(0);
    
    store.setTurn();
    handleDrawMission();
  };

  console.log(store); 
const handleDrawMission = () => {
    const hasTargetsOfOpportunity = store.rule.some(rule => rule.name === "Targets of Opportunity");

    const maxHandSize = hasTargetsOfOpportunity ? 3 : 2;

    if (deck.length > 0 && secondary.length < maxHandSize) {
        const remainingCardsToDraw = maxHandSize - secondary.length;
        const drawnMissions = [];

        for (let i = 0; i < remainingCardsToDraw; i++) {
            const drawnMission = deck.pop();
            drawnMissions.push(drawnMission);
        }

        store.setDeck(deck); // Assuming you have a setDeck function in your store
        store.setSecondary([...secondary, ...drawnMissions]);
    }
};


  useEffect(()=>{
    handleDrawMission();
  },[])

  return (
    <div style={{ width: '100vw', height: 'fit-content' }}>
      {gambitTime && !gambit ? (
        <Gambit />
      ) : (
        <div style={{ display: 'flex', gap: '3%', flexWrap:"wrap" }}>
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <h2>Battle - Turn {turn + 1}</h2>
            <h3>Current Missions</h3>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {secondary.map((mission, index) => (
                <MissionCard key={index} index={index} mission={mission} handleDiscard={() => handleDiscard(mission)} />
              ))}
            </div>
          </div>
          <div style={{ width: '100%', maxWidth: '300px' }}>
            <h2>Score {primaryScore + secondaryScore}</h2>
            <div>
              <h3>Primary Score</h3>
              <input
                disabled={gambit && gambit?.name != 'Proceed as Planned' ? true : false}
                value={currentPrimary}
                onChange={(e) => setCurrentPrimary(e.target.value)}
              />
            </div>
            <div>
              <h3>Secondary Score</h3>
              <input value={currentSecondary} onChange={(e) => setCurrentSecondary(e.target.value)} />
            </div>
            <div style={{ marginTop: '20px' }}>
              <button onClick={() => handleNext()}>Next Turn</button>
            </div>
          </div>
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <div>
              {gambit && gambit.name != 'Proceed as Planned' ? (
                <>
                  <h3>Gambit</h3>
                  <h4>{gambit.name}</h4>
                  <p>
                    <strong>Gambit Mission:</strong> <br />
                    {gambit.gambit}
                  </p>
                </>
              ) : (
                <>
                  <h3>Primary Mission</h3>
                  <h4>{store.mission.name}</h4>
                  <p>
                    <strong>Primary Mission Rule:</strong> <br />
                    {store.mission.special}
                  </p>
                  <p>
                    <strong>Scoring for current round:</strong> <br /> {store.mission.battle_rounds[turn]}
                  </p>
                </>
              )}
            </div>
            <div>
              <h4>
                <strong>Mission Rule</strong>
              </h4>
              <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '30px' }}>
                {store.rule.map((mission, index) => {
                  return (
                    <div key={index} style={{ border: '1px solid white', padding: '20px', flex: '1' }}>
                      <h3>{mission.name}</h3>
                      <div style={{ fontSize: '12px' }}>
                        <p>{mission.rule}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h3>Deployment</h3>
              <img style={{ maxWidth: '300px' }} alt="Deployment Zone" src={store.deployment.image} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
