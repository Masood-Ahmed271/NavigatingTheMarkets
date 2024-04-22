import CommonModel from "./common/CommonModal";
import { API_ENDPOINT } from "constants";


export default function AnnModal(props) {

    // const api = "http://127.0.0.1:5000/basic_ann_model"
    const api = API_ENDPOINT + "basic_ann_model";
    const description = `This is an implementation of an artificial neural network (ANN) model for stock price prediction.
                         It takes stock data, window size, training rate, dropout rate, batch size, and number of epochs as input.
                         The model consists of three dense layers with dropout layers for regularization. It is compiled with the
                         mean squared error (MSE) loss and the Adam optimizer. The ANN model is trained using the training data and
                         evaluates it on the testing data. It calculates metrics such as root mean squared error (RMSE) and mean
                         absolute percentage error (MAPE) for the predictions. These metrics are averaged over multiple runs.`
    return (
        <CommonModel description={description} api={api} fullForm={props.fullForm} isDisabledUnits={true} isDisabledDropRate={false} />
    )
}