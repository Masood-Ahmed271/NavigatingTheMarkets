import CommonModel from "./common/CommonModal";


export default function GruThreeModal(props) {

    const api = "http://127.0.0.1:5000/gru_model_three"
    const description = `This is an implementation of a stock price prediction using the GRU (Gated Recurrent Unit) neural
    network. It takes stock data, window size, training rate, dropout rate, batch size, GRU units, and number of epochs as input.
    The model consists of a three GRU layers, followed by a dropout layer for regularization, and a dense layer
    for the model output. The first two GRU layers have the return_sequences=True argument, which means they return
    the hidden state output for each time step in the input sequence. This allows the subsequent GRU layers to receive
    the full sequence of hidden states. The third GRU layer, however, does not have return_sequences=True, indicating
    that it only returns the final hidden state output. The dropout layers are added after each GRU layer to prevent
    overfitting by randomly dropping out a fraction of the units during training. Finally, a dense layer with one output
    unit is added to produce the final prediction. This architecture, with multiple GRU layers that both receive and
    return sequences, is often used when capturing long-term dependencies and intricate patterns in sequential data.
    The additional layer allows for more complex modeling of temporal relationships within the input sequence.`
    return (
        <CommonModel description={description} api={api} fullForm={props.fullForm} isDisabledUnits={false} isDisabledDropRate={false} />
    )
}