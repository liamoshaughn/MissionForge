import { useStore } from '../../store/store';

export default function Gambit(props) {
  const store = useStore();
  const deck = useStore((state) => state.gamemode);

  const determineGambits = () => {
    if (store.gamemode.secrets) {
      return store.gamemode.secrets;
    } else {
      const randNum = Math.floor(Math.random() * 3);
      let selectedGambits = deck.gambits.choices.filter((element, index) => index !== randNum);
      selectedGambits.push(deck.gambits.proceed);
      return selectedGambits;
    }
  };
  const handleClick = (gambit) => {
    store.setPrimaryScore(Math.min(20, store.primaryScore))
    return store.setGambit(gambit);
  };

  return (
    <div style={{ width: '100%', height: 'fit-content' }}>
      {store.gamemode.secrets && (
        <div>
            <h3>Current Primary Score: {store.primaryScore}</h3>
          <h2>
            Is your primary score lower than your opponents? If so you can undertake a secret mission. If you can and
            would like to undertake a secret mission click one below otherwise skip
          </h2>
          <div>
            <button onClick={props.skip}>Skip</button>
          </div>
        </div>
      )}
      <h2>Select {store.gamemode.secrets ? 'Secret Mission' : 'Gambit'}</h2>
      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap:"wrap" }}>
        {determineGambits().map((gambit, index) => {
          return (
            <div
              key={index}
              onClick={() => handleClick(gambit)}
              style={{
                width: '300px',
                padding: '10px',
                position: 'relative',
                border: '1px solid white',
                cursor: 'pointer',
              }}
            >
              <h5>{gambit.name}</h5>
              <p style={{ fontSize: '10px', paddingBottom: '20px' }}>{gambit.gambit}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
