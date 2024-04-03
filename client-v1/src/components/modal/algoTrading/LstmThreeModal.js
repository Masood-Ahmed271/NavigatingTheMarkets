import CommonModel from "./common/CommonModal";


export default function LstmTwoModal(props) {

    const api = "http://127.0.0.1:5000/lstm_model_three"
    const description = `This is an implementation of a stock price prediction models that is designed to forecast stock
    prices using LSTM neural networks. It takes stock data, window size, training rate, dropout rate, batch size, LSTM units,
    and training epochs as input.
    This LSTM model is created with a three LSTM layers, followed by dropout regularization and a dense layer for the model output.
    The first LSTM layer is set to return sequences (return_sequences=True), meaning it returns the hidden state output for each time
    step in the input sequence. This allows the subsequent LSTM layers to receive the full sequence of hidden states. The second
    LSTM layer also has return_sequences=True, receiving the sequence of hidden states from the previous LSTM layer and returning
    its own sequence of hidden states. The third LSTM layer, however, has return_sequences=False, indicating that it only returns
    the final hidden state output. This architecture, with multiple LSTM layers that both receive and return sequences, is often
    used to capture long-term dependencies and intricate patterns in sequential data. The additional layer allows for more complex
    modeling of temporal relationships within the input sequence.
    The model is trained using the training data, and predictions are made on the test data. During training, metrics such as
    root mean squared error (RMSE) and mean absolute percentage error (MAPE) are calculated, and their average values are
    accumulated. The function also visualizes the loss graph during training.`
    return (
        <CommonModel description={description} api={api} fullForm={props.fullForm} isDisabledUnits={false} isDisabledDropRate={false} />
    )
}