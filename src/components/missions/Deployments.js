import { useStore } from '../../store/store';
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
            <div style={{ border: '1px solid white', padding:"20px", maxWidth:"65vw" }}>
            <h3>{deployment.name}</h3>
                <img style={{width:"100%"}} alt={`The Chosen Deployment Zone - ${deployment.name}`} src={deployment.image}/>
            </div>
        ) : <button onClick={()=>determineDeployment()}>Draw deployment</button>}
        </div>
    );
}
