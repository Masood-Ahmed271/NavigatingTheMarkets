import SingleRollingAgentModal from "./common/SingleRollingAgentModal";
import { API_ENDPOINT } from "constants";

export default function SingleRollingAgent(props) {
    const api = API_ENDPOINT + "single_rolling_agent";
    const description = `Single Movement Rolling is a lagging indicator used by analysts and investors to assess support and resistance levels of an asset by examining its historical price movements. By calculating a moving average, it provides insights into the underlying trend and helps predict future price movements. This technique filters out short-term fluctuations and noise, allowing for a smoother representation of the price action. It aids in identifying trends, potential turning points, and making informed investment decisions based on the signals generated by the moving average.`;
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
