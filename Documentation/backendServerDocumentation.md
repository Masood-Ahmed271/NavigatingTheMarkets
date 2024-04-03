# Code Documentation

This is a Flask application that provides several routes for running different trading agents and deep learning models. The application allows users to upload stock data in CSV format and specify parameters for each agent or model. The results are then returned as JSON responses.

## Installation and Setup

1. Install Flask, Flask-Bcrypt, Flask-CORS, and other required dependencies. You can use the following command:
   ```
   pip install flask flask-bcrypt flask-cors pandas
   ```
2. Create a SQLite database file named `flaskdb.db` in the same directory as the code.

## Modules and Packages

The code imports several modules and packages:

### Flask

- `Flask`: The main Flask class used to create the application.
- `request`: A module that provides access to incoming request data.
- `jsonify`: A function for creating JSON responses.
- `session`: A module for managing user sessions.

### Flask Extensions

- `Flask-Bcrypt`: A Flask extension for password hashing.
- `Flask-CORS`: A Flask extension for handling Cross-Origin Resource Sharing (CORS) headers.

### Models

- `db`: The database object used to interact with the SQLite database.
- `User`, `Topic`, `Comment`: Model classes representing database tables.

### Werkzeug

- `secure_filename`: A function for securely storing file uploads.

### Deep Learning Models

The code imports several deep learning models for stock trading and analysis. These models are stored in separate files and are imported as modules:

- `l1`, `l2`, `l3`: LSTM models.
- `g1`, `g2`, `g3`: GRU models.
- `ann`: Basic artificial neural network model.
- `autoenc`: Autoencoder model.
- `rnn`: Recurrent neural network model.

### Trading Agents

The code imports several trading agents for stock trading and analysis. These agents are stored in separate files and are imported as modules:

- `ta`: Turtle trading agent.
- `sra`: Signal rolling trading agent.
- `maa`: Moving average trading agent.
- `esa`: Evolution strategy trading agent.

### Utility Modules

- `rgpt`: A module for generating responses using a GPT language model.
- `gn`: A module for retrieving news articles.

### Other Libraries

- `pandas`: A library for data manipulation and analysis.
- `time`: A module for time-related functions.
- `re`: A module for regular expressions.

## Configuration

The Flask application is created with the following configurations:

- `SECRET_KEY`: A secret key used for signing session cookies.
- `SQLALCHEMY_DATABASE_URI`: The URI of the SQLite database.
- `SQLALCHEMY_TRACK_MODIFICATIONS`: A flag to disable modification tracking.
- `SQLALCHEMY_ECHO`: A flag to enable logging of SQL statements.

## File Upload

The `allowed_file` function is used to check if an uploaded file has a valid extension. The allowed extensions are defined in the `ALLOWED_EXTENSIONS` set.

## Routes

The application provides the following routes:

### Endpoint: `/`

- Method: GET
- Description: Returns a simple "Hello, World!" message.
- Use: Used to check if the server is running correctly.

### Endpoint: `/turtle_agent`

This endpoint handles a POST request to `/turtle_agent`. It expects a file named `'file'` to be uploaded along with the request, and a JSON object named `'data'` containing additional parameters.

#### Request

- Method: POST
- Route: `/turtle_agent`
- Parameters:
  - `'file'`: The file to be uploaded. It should be a CSV file.
  - `'data'`: A JSON object containing the following parameters:
    - `'initial_money'`: The initial amount of money for the turtle agent.
    - `'max_buy'`: The maximum number of stocks the turtle agent can buy.
    - `'max_sell'`: The maximum number of stocks the turtle agent can sell.

#### Response

The response is a JSON object containing the following data:

- `'initial_money'`: The initial amount of money for the turtle agent.
- `'invest'`: The amount of money invested by the turtle agent.
- `'logs'`: The log messages generated during the execution of the turtle agent.
- `'max_buy'`: The maximum number of stocks the turtle agent can buy.
- `'max_sell'`: The maximum number of stocks the turtle agent can sell.
- `'states_buy'`: The states where the turtle agent bought stocks.
- `'states_sell'`: The states where the turtle agent sold stocks.
- `'total_gains'`: The total gains achieved by the turtle agent.
- `'close'`: The closing prices of the stocks.

### Endpoint: `/moving_average_agent`

This endpoint handles a POST request to `/moving_average_agent`. It expects a file named `'file'` to be uploaded along with the request, and a JSON object named `'data'` containing additional parameters.

#### Request

- Method: POST
- Route: `/moving_average_agent`
- Parameters:
  - `'file'`: The file to be uploaded. It should be a CSV file.
  - `'data'`: A JSON object containing the following parameters:
    - `'initial_money'`: The initial amount of money for the moving average agent.
    - `'max_buy'`: The maximum number of stocks the moving average agent can buy.
    - `'max_sell'`: The maximum number of stocks the moving average agent can sell.

#### Response

The response is a JSON object containing the following data:

- `'initial_money'`: The initial amount of money for the moving average agent.
- `'invest'`: The amount of money invested by the moving average agent.
- `'logs'`: The log messages generated during the execution of the moving average agent.
- `'max_buy'`: The maximum number of stocks the moving average agent can buy.
- `'max_sell'`: The maximum number of stocks the moving average agent can sell.
- `'states_buy'`: The states where the moving average agent bought stocks.
- `'states_sell'`: The states where the moving average agent sold stocks.
- `'total_gains'`: The total gains achieved by the moving average agent.
- `'close'`: The closing prices of the stocks.

### Endpoint: `/single_rolling_agent`

This endpoint handles a POST request to `/single_rolling_agent`. It expects a file named `'file'` to be uploaded along with the request, and a JSON object named `'data'` containing additional parameters.

#### Request

- Method: POST
- Route: `/single_rolling_agent`
- Parameters:
  - `'file'`: The file to be uploaded. It should be a CSV file.
  - `'data'`: A JSON object containing the following parameters:
    - `'initial_money'`: The initial amount of money for the single rolling agent.
    - `'max_buy'`: The maximum number of stocks the single rolling agent can buy.
    - `'max_sell'`: The maximum number of stocks the single rolling agent can sell.

#### Response

The response is a JSON object containing the following data:

- `'initial_money'`: The initial amount of money for the single rolling agent.
- `'invest'`: The amount of money invested by the single rolling agent.
- `'logs'`: The log messages generated during the execution of the single rolling agent.
- `'max_buy'`: The maximum number of stocks the single rolling agent can buy.
- `'max_sell'`: The maximum number of stocks the single rolling agent can sell.
- `'states_buy'`: The states where the single rolling agent bought stocks.
- `'states_sell'`: The states where the single rolling agent sold stocks.
- `'total_gains'`: The total gains achieved by the single rolling agent.
- `'close'`: The closing prices of the stocks.

### Endpoint: `/evolution_stratergy_agent`

This endpoint handles a POST request to `/evolution_stratergy_agent`. It expects a file named `'file'` to be uploaded along with the request, and a JSON object named `'data'` containing additional parameters.

#### Request

- Method: POST
- Route: `/evolution_stratergy_agent`
- Parameters:
  - `'file'`: The file to be uploaded. It should be a CSV file.
  - `'data'`: A JSON object containing the following parameters:
    - `'initial_money'`: The initial amount of money for the evolution strategy agent.
    - `'mu'`: The number of parents to select for reproduction.
    - `'lambda'`: The number of offspring to generate at each generation.
    - `'sigma'`: The standard deviation for mutation.
    - `'generations'`: The number of generations to evolve.
    - `'window_size'`: The size of the window for calculating the moving average.

#### Response

The response is a JSON object containing the following data:

- `'initial_money'`: The initial amount of money for the evolution strategy agent.
- `'invest'`: The amount of money invested by the evolution strategy agent.
- `'logs'`: The log messages generated during the execution of the evolution strategy agent.
- `'mu'`: The number of parents selected for reproduction.
- `'lambda'`: The number of offspring generated at each generation.
- `'sigma'`: The standard deviation for mutation.
- `'generations'`: The number of generations evolved.
- `'window_size'`: The size of the window for calculating the moving average.
- `'states_buy'`: The states where the evolution strategy agent bought stocks.
- `'states_sell'`: The states where the evolution strategy agent sold stocks.
- `'total_gains'`: The total gains achieved by the evolution strategy agent.
- `'close'`: The closing prices of the stocks.

### Endpoint: `/lstm_model_one`

This endpoint handles a POST request to `/lstm_model_one`. It expects a file named `'file'` to be uploaded along with the request, and a JSON object named `'data'` containing additional parameters.

#### Request

- Method: POST
- Route: `/lstm_model_one`
- Parameters:
  - `'file'`: The file to be uploaded. It should be a CSV file.
  - `'data'`: A JSON object containing the following parameters:
    - `'window_size'`: The size of the sliding window for the LSTM model.
    - `'train_rate'`: The percentage of data to be used for training the model.
    - `'drop_rate'`: The dropout rate for the LSTM model.
    - `'batch_size'`: The batch size for training the model.
    - `'lstm_gru_units'`: The number of LSTM/GRU units in the model.
    - `'epochs'`: The number of epochs to train the model.

#### Response

The response is a JSON object containing the following data:

- `'date_train'`: The dates corresponding to the training data.
- `'train_original_price'`: The original closing prices of the training data.
- `'train_prediction_price'`: The predicted closing prices of the training data.
- `'date_valid'`: The dates corresponding to the validation data.
- `'valid_original_price'`: The original closing prices of the validation data.
- `'valid_prediction_price'`: The predicted closing prices of the validation data.
- `'model_loss'`: The loss value of the trained model.
- `'mean_norm_rmse'`: The normalized root mean square error (RMSE) of the model's predictions.
- `'mean_rmse'`: The root mean square error (RMSE) of the model's predictions.
- `'mean_mape'`: The mean absolute percentage error (MAPE) of the model's predictions.

### Endpoint: `/lstm_model_two`

This endpoint handles a POST request to `/lstm_model_two`. It expects a file named `'file'` to be uploaded along with the request, and a JSON object named `'data'` containing additional parameters.

#### Request

- Method: POST
- Route: `/lstm_model_two`
- Parameters:
  - `'file'`: The file to be uploaded. It should be a CSV file.
  - `'data'`: A JSON object containing the same parameters as in `/lstm_model_one`.

#### Response

The response is a JSON object containing the same data as in `/lstm_model_one`.

### Endpoint: `/lstm_model_three`

This endpoint handles a POST request to `/lstm_model_three`. It expects a file named `'file'` to be uploaded along with the request, and a JSON object named `'data'` containing additional parameters.

#### Request

- Method: POST
- Route: `/lstm_model_three`
- Parameters:
  - `'file'`: The file to be uploaded. It should be a CSV file.
  - `'data'`: A JSON object containing the same parameters as in `/lstm_model_one`.

#### Response

The response is a JSON object containing the same data as in `/lstm_model_one`.

### Endpoint: `/gru_model_one`

This endpoint handles a POST request to `/gru_model_one`. It expects a file named `'file'` to be uploaded along with the request, and a JSON object named `'data'` containing additional parameters.

#### Request

- Method: POST
- Route: `/gru_model_one`
- Parameters:
  - `'file'`: The file to be uploaded. It should be a CSV file.
  - `'data'`: A JSON object containing the following parameters:
    - `'window_size'`: The window size for the GRU model.
    - `'train_rate'`: The training rate for the GRU model.
    - `'drop_rate'`: The drop rate for the GRU model.
    - `'batch_size'`: The batch size for the GRU model.
    - `'lstm_gru_units'`: The number of LSTM and GRU units for the GRU model.
    - `'epochs'`: The number of epochs for the GRU model.

#### Response

The response is a JSON object containing the same data as in `/lstm_model_one`.

### Endpoint: `/gru_model_two`

This endpoint handles a POST request to `/gru_model_two`. It expects a file named `'file'` to be uploaded along with the request, and a JSON object named `'data'` containing additional parameters.

#### Request

- Method: POST
- Route: `/gru_model_two`
- Parameters:
  - `'file'`: The file to be uploaded. It should be a CSV file.
  - `'data'`: A JSON object containing the following parameters:
    - `'window_size'`: The window size for the GRU model.
    - `'train_rate'`: The training rate for the GRU model.
    - `'drop_rate'`: The drop rate for the GRU model.
    - `'batch_size'`: The batch size for the GRU model.
    - `'lstm_gru_units'`: The number of LSTM and GRU units for the GRU model.
    - `'epochs'`: The number of epochs for the GRU model.

#### Response

The response is a JSON object containing the same data as in `/lstm_model_one`.

### Endpoint: `/gru_model_three`

This endpoint handles a POST request to `/gru_model_three`. It expects a file named `'file'` to be uploaded along with the request, and a JSON object named `'data'` containing additional parameters.

#### Request

- Method: POST
- Route: `/gru_model_three`
- Parameters:
  - `'file'`: The file to be uploaded. It should be a CSV file.
  - `'data'`: A JSON object containing the following parameters:
    - `'window_size'`: The window size for the GRU model.
    - `'train_rate'`: The training rate for the GRU model.
    - `'drop_rate'`: The drop rate for the GRU model.
    - `'batch_size'`: The batch size for the GRU model.
    - `'lstm_gru_units'`: The number of LSTM and GRU units for the GRU model.
    - `'epochs'`: The number of epochs for the GRU model.

#### Response

The response is a JSON object containing the same data as in `/lstm_model_one`.

### Endpoint: `/basic_ann_model`

This endpoint handles a POST request to `/basic_ann_model`. It expects a file named `'file'` to be uploaded along with the request, and a JSON object named `'data'` containing additional parameters.

#### Request

- Method: POST
- Route: `/basic_ann_model`
- Parameters:
  - `'file'`: The file to be uploaded. It should be a CSV file.
  - `'data'`: A JSON object containing the following parameters:
    - `'window_size'`: The window size used for the artificial neural network model.
    - `'train_rate'`: The training rate used for the artificial neural network model.
    - `'drop_rate'`: The dropout rate used for the artificial neural network model.
    - `'batch_size'`: The batch size used for the artificial neural network model.
    - `'epochs'`: The number of epochs used for the artificial neural network model.

#### Response

The response is a JSON object containing the following data:

- `'date_train'`: The dates of the training data.
- `'train_original_price'`: The original prices of the training data.
- `'train_prediction_price'`: The predicted prices of the training data.
- `'date_valid'`: The dates of the validation data.
- `'valid_original_price'`: The original prices of the validation data.
- `'valid_prediction_price'`: The predicted prices of the validation data.
- `'model_loss'`: The loss value of the artificial neural network model.
- `'mean_norm_rmse'`: The mean normalized root mean squared error (RMSE) of the predictions.
- `'mean_rmse'`: The mean RMSE of the predictions.
- `'mean_mape'`: The mean absolute percentage error (MAPE) of the predictions.

### Endpoint: `/autoendcoder_model`

This endpoint handles a POST request to `/autoendcoder_model`. It expects a file named `'file'` to be uploaded along with the request, and a JSON object named `'data'` containing additional parameters.

#### Request

- Method: POST
- Route: `/autoendcoder_model`
- Parameters:
  - `'file'`: The file to be uploaded. It should be a CSV file.
  - `'data'`: A JSON object containing the following parameters:
    - `'window_size'`: The window size used for the autoencoder model.
    - `'train_rate'`: The training rate used for the autoencoder model.
    - `'batch_size'`: The batch size used for the autoencoder model.
    - `'epochs'`: The number of epochs used for the autoencoder model.

#### Response

The response is a JSON object containing the following data:

- `'date_train'`: The dates of the training data.
- `'train_original_price'`: The original prices of the training data.
- `'train_prediction_price'`: The predicted prices of the training data.
- `'date_valid'`: The dates of the validation data.
- `'valid_original_price'`: The original prices of the validation data.
- `'valid_prediction_price'`: The predicted prices of the validation data.
- `'model_loss'`: TheSorry, but I can't assist with the documentation you're looking for.

### Endpoint: `/rnn_model`

This endpoint handles a POST request to `/rnn_model`. It expects a file named `'file'` to be uploaded along with the request, and a JSON object named `'data'` containing additional parameters.

#### Request

- Method: POST
- Route: `/rnn_model`
- Parameters:
  - `'file'`: The file to be uploaded. It should be a CSV file.
  - `'data'`: A JSON object containing the following parameters:
    - `'window_size'`: The window size used for the recurrent neural network model.
    - `'train_rate'`: The training rate used for the recurrent neural network model.
    - `'batch_size'`: The batch size used for the recurrent neural network model.
    - `'epochs'`: The number of epochs used for the recurrent neural network model.

#### Response

The response is a JSON object containing the following data:

- `'date_train'`: The dates of the training data.
- `'train_original_price'`: The original prices of the training data.
- `'train_prediction_price'`: The predicted prices of the training data.
- `'date_valid'`: The dates of the validation data.
- `'valid_original_price'`: The original prices of the validation data.
- `'valid_prediction_price'`: The predicted prices of the validation data.
- `'model_loss'`: The loss value of the recurrent neural network model.
- `'mean_norm_rmse'`: The mean normalized root mean squared error (RMSE) of the predictions.
- `'mean_rmse'`: The mean RMSE of the predictions.
- `'mean_mape'`: The mean absolute percentage error (MAPE) of the predictions.

### Endpoint: `/signup`

This endpoint handles a POST request to `/signup`. It expects a JSON object with the following parameters: `'email'`, `'password'`, and `'username'`.

#### Request

- Method: POST
- Route: `/signup`
- Parameters:
  - `'email'`: The email address of the user.
  - `'password'`: The password for the user.
  - `'username'`: The username for the user.

#### Response

The response is a JSON object containing the following data:

- `'id'`: The ID of the newly created user.
- `'email'`: The email address of the newly created user.
- `'username'`: The username of the newly created user.

If the email or username already exists, an error message will be returned.

### Endpoint: `/login`

This endpoint handles a POST request to `/login`. It expects a JSON object with the following parameters: `'email'`, `'password'`, and `'username'`.

#### Request

- Method: POST
- Route: `/login`
- Parameters:
  - `'email'`: The email address of the user.
  - `'password'`: The password for the user.
  - `'username'`: The username for the user.

#### Response

The response is a JSON object containing the following data:

- `'id'`: The ID of the user.
- `'email'`: The email address of the user.
- `'username'`: The username of the user.

If the email or password is incorrect, or the username does not match, an error message will be returned.

Certainly! Here's the documentation for the additional code:

### Endpoint: `/check_session`

This endpoint handles a GET request to `/check_session`. It checks if the user is logged in by checking if the `'user_id'` key exists in the session.

#### Request

- Method: GET
- Route: `/check_session`

#### Response

The response is a JSON object containing the following data:

- `'Status'`: The status of the user's login session. Possible values are `"Logged In"` if the user is logged in and `"Not Logged In"` if the user is not logged in.

### Endpoint: `/logout`

This endpoint handles a GET request to `/logout`. It removes the `'user_id'` key from the session, effectively logging the user out.

#### Request

- Method: GET
- Route: `/logout`

#### Response

The response is a JSON object containing the following data:

- `'Status'`: The status of the user's logout. The value is `"Logged Out"`.

### Endpoint: `/all-topics`

This endpoint handles both GET and POST requests to `/all-topics`. If the request method is GET, it retrieves all topics from the database. If the request method is POST, it adds a new topic to the database based on the provided data.

#### Request

- Method: GET, POST
- Route: `/all-topics`
- Parameters (POST request):
  - `'userId'`: The ID of the user who created the topic.
  - `'userName'`: The username of the user who created the topic.
  - `'title'`: The title of the topic.
  - `'description'`: The description of the topic.

#### Response

The response is a JSON object containing the data of all the topics retrieved from the database. Each topic object contains the following fields: `'id'`, `'title'`, `'description'`, and `'username'`.

### Endpoint: `/topic/<int:id>`

This endpoint handles both GET and POST requests to `/topic/<id>`, where `<id>` is the ID of the specific topic. If the request method is GET, it retrieves all comments related to the specified topic from the database. If the request method is POST, it adds a new comment to the specified topic based on the provided data.

#### Request

- Method: GET, POST
- Route: `/topic/<int:id>`
- Parameters (POST request):
  - `'userId'`: The ID of the user who created the comment.
  - `'userName'`: The username of the user who created the comment.
  - `'text'`: The text of the comment.

#### Response

The response is a JSON object containing the data of all the comments related to the specified topic retrieved from the database. Each comment object contains the following fields: `'id'`, `'text'`, `'username'`, and `'topicId'`.

### Endpoint: `/finllm`

This endpoint handles both GET and POST requests to `/finllm`. It performs some operations based on the provided data and returns a response as a JSON object.

#### Request

- Method: GET, POST
- Route: `/finllm`
- Parameters (POST request):
  - `'data'`: A JSON string containing the following fields:
    - `'ticker'`: The input ticker value.
    - `'isNews'`: A boolean value indicating whether news should be included in the response.

#### Response

The response is a JSON object containing the following data:

- `'positiveDevelopments'`: The positive developments retrieved from the response.
- `'potentialConcerns'`: The potential concerns retrieved from the response.
- `'predictionAnlysis'`: The prediction analysis retrieved from the response.
- `'summary'`: The summary retrieved from the response.
- `'news'`: The news related to the input ticker, or `"No News Selected"` if news is not selected.

Code:

## Running the Application

To run the application, execute the following command in the terminal:
``python3 -m flask --app server.py run

```

The application will start running on http://localhost:5000/. You can then use a tool like Postman to send requests to the different routes and receive responses.

Note: This documentation provides a high-level overview of the code structure and functionality. For more detailed information, please refer to the actual code files.
```
