import CommonModel from "./common/CommonModal";
import { API_ENDPOINT } from "constants";


export default function RNNModal(props) {

    const api = API_ENDPOINT + "rnn_model";
    const description = `This is an implementation of a recurrent neural network (RNN) model for stock price prediction.
                         It takes stock data, window size, training rate, batch size, and number of epochs as input.
                         The model consists of a SimpleRNN layer with four units, followed by a dense layer with one output
                         unit. The model is compiled with the mean squared error (MSE) loss and the Adam optimizer. The
                         function trains the RNN model using the training data and evaluates it on the testing data. It
                         calculates metrics such as root mean squared error (RMSE) and mean absolute percentage error (MAPE)
                         for the predictions. These metrics are averaged over multiple runs.`
    return (
        <CommonModel description={description} api={api} fullForm={props.fullForm} isDisabledUnits={true} isDisabledDropRate={true} />
    )
}