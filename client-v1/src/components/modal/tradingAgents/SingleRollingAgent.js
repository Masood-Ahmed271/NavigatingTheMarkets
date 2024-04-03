import SingleRollingAgentModal from "./common/SingleRollingAgentModal";

export default function SingleRollingAgent(props) {
    const api = "http://127.0.0.1:5000/single_rolling_agent";
    const description = `eh?`;
    return (
        <SingleRollingAgentModal
            description={description}
            api={api}
            fullForm={props.fullForm}
            isDisabledUnits={false}
            isDisabledDropRate={false}
        />
    );
}
