"""
Description:
    This code implements a function named lstm_one that uses LSTM neural networks to forecast stock prices.
    The function takes stock data, window size, training rate, dropout rate, batch size, LSTM units, and training
    epochs as input. It first pre-processes the data by filtering the 'Close' column and normalizing the values using
    MinMaxScaler. It then splits the data into input-output pairs and further divides it into training and testing 
    sets. The LSTM model is created and trained using the training data, and predictions are made on the test data.
    The function calculates and accumulates metrics such as root mean squared error (RMSE) and mean absolute percentage
    error (MAPE) during training. Finally, it returns the training and validation data with the predicted values, 
    the loss graph of the first model, and the mean values of the metrics. 
    
    The main difference between this and other lstm codes is its  architecture, which includes only single LSTM layers
    followed by dropout and dense layer.The LSTM layer in this case does not return sequences (return_sequences=False),
    so it only returns the final hidden state output. This architecture is commonly used when only the final prediction
    for the sequence is needed, without considering the temporal dependencies within the sequence.
    
"""

import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from sklearn.metrics import mean_absolute_percentage_error

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM, Dropout

def lstm_one(stk_data,window_size,train_rate, drop_rate, batch_size, lstm_gru_units, epochs):
    print("model")
    data_close=stk_data.filter(['Close'])

    s_data=data_close.values
    sca=MinMaxScaler(feature_range=(0,1))
    normal_data=sca.fit_transform(s_data)

    def data_split(data, step_size):
        x,y,z=[],[],[]
        for i in range(step_size,len(data)):
            x.append(data[i-step_size:i,-1])
            y.append(data[i-1,-1])
        return np.array(x), np.array(y)

    x1, y1=data_split(normal_data, step_size=window_size)

    split_index=int(np.ceil(len(x1)*(train_rate)))
    x_train,x_test=x1[:split_index],x1[split_index:]
    y_train,y_test=y1[:split_index],y1[split_index:]

    x_test=np.reshape(x_test,(x_test.shape[0],x_test.shape[1],1))
    x_train=np.reshape(x_train,(x_train.shape[0],x_train.shape[1],1))

    y_train=np.reshape(y_train,(y_train.shape[0],1))
    y_test=np.reshape(y_test,(y_test.shape[0],1))
    
    av_rmse=0
    av_rmse1=0
    av_mape=0

    #LSTM Model One
    def lstm_model_one(av_rmse,av_rmse1,av_mape):
        model_loss_graph_points = []
        for i in range(10):
            lstm1=Sequential()
            lstm1.add(LSTM(lstm_gru_units,input_shape=(x_train.shape[1],x_train.shape[2]),activation='tanh',return_sequences=False))
            lstm1.add(Dropout(drop_rate))
            lstm1.add(Dense(1))
            lstm1.compile(loss='mse',optimizer='adam')

            history=lstm1.fit(x_train,y_train,epochs=epochs,batch_size=batch_size, verbose=0)
            y_test_pred=lstm1.predict(x_test)
            y_train_pred=lstm1.predict(x_train)

            rmse=mean_squared_error(y_test,y_test_pred,squared=False)
            av_rmse=av_rmse+rmse
            y_test_pred_nn=sca.inverse_transform(y_test_pred)
            y_train_pred_nn=sca.inverse_transform(y_train_pred)
            y_test_nn=sca.inverse_transform(y_test)
            rmse1=mean_squared_error(y_test_nn,y_test_pred_nn,squared=False)
            mape=mean_absolute_percentage_error(y_test,y_test_pred)
            av_rmse1=av_rmse1+rmse1
            av_mape=av_mape+mape
            lstm1.reset_states()
            model_loss_graph_points.append(history.history['loss'])

        print('Mean Norm RMSE=',av_rmse/10,'Mean RMSE=',av_rmse1/10,'Mean MAPE=',av_mape/10)

        train=data_close[window_size:split_index+window_size]
        valid=data_close[split_index+window_size:]

        train['Prediction'] =y_train_pred_nn
        valid['Prediction'] =y_test_pred_nn

        return train[['Close','Prediction']], valid[['Close','Prediction']], model_loss_graph_points[0], av_rmse/10, av_rmse1/10, av_mape/10
    

    df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape = lstm_model_one(av_rmse,av_rmse1,av_mape)
    return df1, df2, model_loss, mean_norm_rmse, mean_rmse, mean_mape