# Documentation for Moving Average Agent

This module provides functions for working with stock price data and simulating buying and selling stocks based on moving averages.

## Functions

### `get_df(df_path)`

Reads a CSV file containing stock price data and returns a DataFrame.

**Parameters:**

- `df_path` (str): The path to the CSV file.

**Returns:**

- `df` (DataFrame): The DataFrame containing the stock price data.

### `get_signals(df)`

Calculates the buy and sell signals based on the moving averages of the stock price.

**Parameters:**

- `df` (DataFrame): The input DataFrame containing the stock price data.

**Returns:**

- `signals` (DataFrame): The DataFrame containing the buy and sell signals.

### `buy_stock(df, real_movement, debug, signal, initial_money=10000, max_buy=1, max_sell=1)`

Simulates buying and selling stocks based on the given stock price data and signals.

**Parameters:**

- `df` (DataFrame): The input DataFrame containing the stock price data.
- `real_movement` (array-like): The actual movement in the real world as an array.
- `debug` (bool): Flag indicating whether to print debug information.
- `signal` (Series): The buy and sell signals as a Series.
- `initial_money` (float, optional): The initial amount of money for buying stocks. Defaults to 10000.
- `max_buy` (int, optional): The maximum quantity of shares to buy. Defaults to 1.
- `max_sell` (int, optional): The maximum quantity of shares to sell. Defaults to 1.

**Returns:**

- `logs` (list): A list of dictionaries representing the simulation logs.
- `states_buy` (list): A list of indices indicating the buy signals.
- `states_sell` (list): A list of indices indicating the sell signals.
- `total_gains` (float): The total gains (profit or loss) from the simulation.
- `invest` (float): The percentage return on investment from the simulation.

### `move(debug, show_graph, df, initial_money, max_buy, max_sell)`

Runs a single moving average agent using the `buy_stock` function.

**Parameters:**

- `debug` (bool): Flag indicating whether to print debug information.
- `show_graph` (bool): Flag indicating whether to display a graph of the stock price movement and buy/sell signals.
- `df` (DataFrame): The input DataFrame containing the stock price data.
- `initial_money` (float): The initial amount of money for buying stocks.
- `max_buy` (int): The maximum quantity of shares to buy.
- `max_sell` (int): The maximum quantity of shares to sell.

**Returns:**

- `states_buy` (list): A list of indices indicating the buy signals.
- `states_sell` (list): A list of indices indicating the sell signals.
- `total_gains` (float): The total gains (profit or loss) from the simulation.
- `invest` (float): The percentage return on investment from the simulation.
- `logs` (list): A list of dictionaries representing the simulation logs.
- `close` (list): The closing prices of the stock as a list.
