### LSTM Model Two Documentation

This code defines a function named `lstm_two` that utilizes LSTM neural networks for stock price forecasting. The function takes the same set of input parameters as the LSTM One code.

### Preprocessing

The function starts by preprocessing the stock data. It filters the 'Close' column from the stock data and applies the MinMaxScaler to normalize the data. This step ensures that the data is within a specific range (0 to 1) and helps improve the performance of the model.

### Data Split

The normalized data is split into training and testing sets based on the specified training rate. The function uses the `data_split` function to create input sequences and corresponding target values. The input sequences are created by taking a sliding window of size `window_size` over the data, and the target values are set to the last value of each window. The training and testing data are split based on the training rate.

### Model Architecture

The LSTM model consists of two LSTM layers followed by dropout and a dense layer. The first LSTM layer is set to return sequences (`return_sequences=True`), meaning that it returns the hidden state output for each time step in the input sequence. The second LSTM layer does not return sequences (`return_sequences=False`), so it only returns the final hidden state output. This architecture is commonly used when the LSTM layers are stacked to capture temporal dependencies in the data. The model is compiled with the mean squared error (MSE) loss function and the Adam optimizer.

### Training and Evaluation

The LSTM model is trained using the training data. The function evaluates the trained model on the testing data and calculates metrics such as root mean squared error (RMSE) and mean absolute percentage error (MAPE) for the predictions. These metrics are accumulated over 10 runs, and the average values are calculated. The function also stores the loss values during training to visualize the loss graph.

### Output

The function returns the following outputs:

- `df1`: A DataFrame containing the 'Close' column and the corresponding predictions for the training data.
- `df2`: A DataFrame containing the 'Close' column and the corresponding predictions for the testing data.
- `model_loss`: The loss graph of the first model run.
- `mean_norm_rmse`: The mean normalized RMSE calculated over multiple runs.
- `mean_rmse`: The mean RMSE calculated over multiple runs.
- `mean_mape`: The mean MAPE calculated over multiple runs.

These outputs provide useful information for analysis and further processing, including the predicted values, loss graph, and mean values of evaluation metrics.
