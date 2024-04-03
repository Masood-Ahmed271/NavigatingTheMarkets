# Documentation for Single Rolling Agent

This module provides a function `buy_stock` that simulates buying and selling stocks based on a given price movement. It also includes a function `roll` that runs a single rolling agent using the `buy_stock` function.

## Functions

### `buy_stock(df, debug, real_movement, delay=5, initial_state=1, initial_money=10000, max_buy=1, max_sell=1)`

Simulates buying and selling stocks based on a given price movement.

**Parameters:**

- `df` (DataFrame): The input DataFrame containing the stock price data.
- `debug` (bool): Flag indicating whether to print debug information.
- `real_movement` (array-like): The actual movement in the real world as an array.
- `delay` (int, optional): The interval to delay changing the decision from buy to sell or vice versa. Defaults to 5.
- `initial_state` (int, optional): The initial state of the simulation (1 for buy, 0 for sell). Defaults to 1.
- `initial_money` (float, optional): The initial amount of money for buying stocks. Defaults to 10000.
- `max_buy` (int, optional): The maximum quantity of shares to buy. Defaults to 1.
- `max_sell` (int, optional): The maximum quantity of shares to sell. Defaults to 1.

**Returns:**

- `logs` (list): A list of dictionaries representing the simulation logs.
- `states_buy` (list): A list of indices indicating the buy signals.
- `states_sell` (list): A list of indices indicating the sell signals.
- `total_gains` (float): The total gains (profit or loss) from the simulation.
- `invest` (float): The percentage return on investment from the simulation.

### `roll(debug, show_graph, df, initial_money, max_buy, max_sell)`

Runs a single rolling agent using the `buy_stock` function.

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
