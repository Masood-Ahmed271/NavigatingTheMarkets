import CommonModel from "./common/CommonModal";


export default function LstmThreeModal(props) {

    const api = "http://127.0.0.1:5000/lstm_model_two"
    const description = `This is an implementation of a stock price prediction models that is designed to forecast stock
    prices using LSTM neural networks. It takes stock data, window size, training rate, dropout rate, batch size, LSTM units,
    and training epochs as input.
    This LSTM model is created with a two LSTM layers, followed by a dropout layer and a dense layer. The first LSTM layer is
    set to return sequences (return_sequences=True), meaning it returns the hidden state output for each time step in the input
    sequence. The second LSTM layer does not return sequences (return_sequences=False) and only returns the final hidden state
    output. This architecture allows the LSTM layers to capture temporal dependencies in the data when they are stacked.
    The model is trained using the training data, and predictions are made on the test data. During training, metrics such as
    root mean squared error (RMSE) and mean absolute percentage error (MAPE) are calculated and their average values are
    accumulated. The function also visualizes the loss graph during training.`
    return (
        <CommonModel description={description} api={api} fullForm={props.fullForm} isDisabledUnits={false} isDisabledDropRate={false} />
    )
}