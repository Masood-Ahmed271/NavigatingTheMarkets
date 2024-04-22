import CommonModel from "./common/TurtleAgentModal";
import { API_ENDPOINT } from "constants";

export default function TurtleAgentModal(props) {
    const api = API_ENDPOINT + "turtle_agent";
    const description = `Turtles were taught very specifically how to implement a trend-following strategy. The idea is that the "trend is your friend," so you should buy futures breaking out to the upside of trading ranges and sell short downside breakouts. In practice, this means, for example, buying new four-week highs as an entry signal.`;
    return (
        <CommonModel
            description={description}
            api={api}
            fullForm={props.fullForm}
            isDisabledUnits={true}
            isDisabledDropRate={true}
        />
    );
}
