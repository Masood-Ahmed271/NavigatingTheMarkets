import CommonModel from "./common/CommonModal";
import { API_ENDPOINT } from "constants";


export default function LstmOneModal(props) {

    const api = API_ENDPOINT + "lstm_model_one";
    const description = `This is an implementation of a stock price prediction models that is designed to forecast stock
    prices using LSTM neural networks. It takes stock data, window size, training rate, dropout rate, batch size, LSTM units,
    and training epochs as input.
    The LSTM model is created with a single LSTM layer, followed by a dropout layer and a dense layer. The LSTM layer, with
    return_sequences=False, only returns the final hidden state output. This architecture is commonly used when only the final
    prediction for the sequence is needed, without considering the temporal dependencies within the sequence.
    The model is trained using the training data, and predictions are made on the test data. During training, the
    function calculates and accumulates metrics such as root mean squared error (RMSE) and mean absolute percentage error (MAPE).
    These metrics provide insights into the model's performance.`
    return (
        <CommonModel description={description} api={api} fullForm={props.fullForm} isDisabledUnits={false} isDisabledDropRate={false} />
    )
}