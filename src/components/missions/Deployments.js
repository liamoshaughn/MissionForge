import { useStore } from '../../store/store';
import CardCanvas from '../3D/Canvas';
import Autocomplete from '../Autocomplete';

export default function Deployments() {
    const store = useStore();
    const deck = useStore((state) => state.gamemode)
    const deployment= useStore((state) => state.deployment)

    const determineDeployment = () => {
        const randNum = Math.floor(Math.random() * 5);
        store.setDeployment(deck.deployments[randNum]);
    };


    console.log(store);

    return (
        <div style={{width:"fit-content", height:"fit-content"}}>
        <h2>Deployments</h2>
        <Autocomplete data={deck.deployments} select={(deployment) => store.setDeployment(deployment) } />
        {deployment ? (
            <CardCanvas
            data={[deployment]}
            style={{width:"700px", height: "100%", right:"10%", left:"auto", top:"-100px"}}
          />
        ) : <button onClick={()=>determineDeployment()}>Draw deployment</button>}
        </div>
    );
}
