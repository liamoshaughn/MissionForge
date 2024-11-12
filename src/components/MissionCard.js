import { useStore } from '../store/store';

export default function MissionCard(props) {
  const store = useStore();
  const mission = props.mission;
  const isSelected = props.selectedMissions && props.selectedMissions.includes(mission);
  const handleClick = () => (props.toggleSelection ? props.toggleSelection(mission) : null);

  return (
    <div
      onClick={handleClick}
      style={{
        flex: '1',
        padding: '10px',
        minWidth: '200px',
        position: 'relative',
        border: isSelected ? '2px solid red' : '1px solid white',
        cursor: props.selectedMissions ? 'pointer' : 'default',
      }}
    >
      <h5>{mission.name}</h5>
      <p style={{ fontSize: '10px', paddingBottom: '20px' }}>{mission.mission}</p>
      {props.handleDiscard && (store.mode !== 'fixed' || props?.index === 2) && (
        <button style={{ position: 'absolute', bottom: '10px' }} onClick={() => props.handleDiscard(mission)}>
          discard
        </button>
      )}
      {store.turn < 1 &&props.handleShuffle && mission.shuffle && (store.mode !== 'fixed' || props?.index === 2) && (
        <button style={{ position: 'absolute', bottom: '10px', right: '10px' }} onClick={() => props.handleShuffle(mission)}>
          Shuffle
        </button>
      )}
    </div>
  );
}
