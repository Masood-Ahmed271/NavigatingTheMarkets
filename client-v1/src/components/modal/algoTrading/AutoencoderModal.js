import CommonModel from "./common/CommonModal";


export default function AutoencoderModal(props) {

    const api = "http://127.0.0.1:5000/autoendcoder_model"
    const description = `This is an implementation of an autoencoder model for stock price prediction. It takes stock data,
                         window size, training rate, batch size, and number of epochs as input. The model consists of 
                         an input layer, an encoding layer with a specified number of dimensions, a decoding layer, and an
                         output layer. The model uses activation functions such as tanh and relu. The autoencoder is compiled
                         with the mean squared error (MSE) loss and the Adam optimizer. The function trains the autoencoder
                         model using the training data and evaluates it on the testing data. It calculates metrics such as
                         root mean squared error (RMSE) and mean absolute percentage error (MAPE) for the predictions. 
                         These metrics are averaged over multiple runs.`
    return (
        <CommonModel description={description} api={api} fullForm={props.fullForm} isDisabledUnits={true} isDisabledDropRate={true} />
    )
}