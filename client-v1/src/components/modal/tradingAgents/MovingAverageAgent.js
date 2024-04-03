import MovingAverageAgentModal from "./common/MovingAverageAgentModal";

export default function MovingAverageAgent(props) {
    const api = "http://127.0.0.1:5000/moving_average_agent";
    const description = `Analysts use the moving average to examine support and resistance by evaluating the movements of an asset’s price. A moving average reflects the previous price action/movement of a security. Analysts or investors then use the information to determine the potential direction of the asset price. It is known as a lagging indicator because it trails the price action of the underlying asset to produce a signal or show the direction of a given trend. `;
    return (
        <MovingAverageAgentModal
            description={description}
            api={api}
            fullForm={props.fullForm}
            isDisabledUnits={false}
            isDisabledDropRate={false}
        />
    );
}
