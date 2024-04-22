import CommonModel from "./common/CommonModal";
import { API_ENDPOINT } from "constants";


export default function GruOneModal(props) {

    const api = API_ENDPOINT + "gru_model_one";
    const description = `This is an implementation of a stock price prediction using the GRU (Gated Recurrent Unit) neural
    network. It takes stock data, window size, training rate, dropout rate, batch size, GRU units, and number of epochs as input.
    The model consists of a single GRU layer, followed by a dropout layer for regularization, and a dense layer
    for the model output. The model is compiled with the mean squared error (MSE) loss and the Adam optimizer.
    The GRU layer in this case does not have return_sequences=True, so it only returns the final hidden state output.
    This architecture is commonly used when only the final prediction for the sequence is needed, without considering
    the temporal dependencies within the sequence.`
    return (
        <CommonModel description={description} api={api} fullForm={props.fullForm} isDisabledUnits={false} isDisabledDropRate={false} />
    )
}