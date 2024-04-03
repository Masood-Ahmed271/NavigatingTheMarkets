import CommonModel from "./common/CommonModal";


export default function GruTwoModal(props) {

    const api = "http://127.0.0.1:5000/gru_model_two"
    const description = `This is an implementation of a stock price prediction using the GRU (Gated Recurrent Unit) neural
    network. It takes stock data, window size, training rate, dropout rate, batch size, GRU units, and number of epochs as input.
    The model consists of a two GRU layers, followed by a dropout layer for regularization, and a dense layer
    for the model output. The first GRU layer is set to return sequences (return_sequences=True), meaning that
    it returns the hidden state output for each time step in the input sequence. The second GRU layer does not
    have return_sequences=True, so it only returns the final hidden state output. This architecture is often used
    when stacking GRU layers to capture temporal dependencies in the data.`
    return (
        <CommonModel description={description} api={api} fullForm={props.fullForm} isDisabledUnits={false} isDisabledDropRate={false} />
    )
}