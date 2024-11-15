import { useStore } from '../../store/store';
import Autocomplete from '../Autocomplete';
import CardCanvas from '../3D/Canvas';

export default function Primary() {
  const store = useStore();
  const deck = useStore((state) => state.gamemode);
  const turn = useStore((state) => state.turn);
  const mission = useStore((state) => state.mission);
  const determineMission = () => {
    const randNum = Math.floor(Math.random() * 9);
    store.setMission(deck.primary_missions[randNum]);
  };

  return (
    <div style={{ width: '100%', height: 'fit-content' }}>
      <div style={{position:'absolute'}}>
      <h2>Primary Mission</h2>
      <Autocomplete data={deck.primary_missions} select={(mission) => store.setMission(mission)} />

      </div>
      {mission ? (
        <CardCanvas
          data={[mission]}
          onClick={() => determineMission()}
          onPointerEnter={null}
          onPointerLeave={null}
          style={{width:"100vw", height: "100vh", right:"0", left:"auto", top:"-100px"}}
        />
      ) : (
        <button style={{position:"absolute", bottom:'50vh', left:'50vw', transform: 'translate(-50%)', zIndex: 2}} onClick={() => determineMission()}>Draw Mission</button>
      )}
    </div>
  );
}
