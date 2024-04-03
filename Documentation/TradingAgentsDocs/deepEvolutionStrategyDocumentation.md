# Documentation for Deep Evolution Strategy

The `Deep_Evolution_Strategy` class is an implementation of the Deep Evolution Strategy algorithm. It is used to optimize the weights of a neural network model by maximizing a reward function. The algorithm works by maintaining a population of weight vectors and iteratively updating them based on their performance on the reward function.

## Class Definition

```python
class Deep_Evolution_Strategy:
```

### Constructor

```python
def __init__(self, weights, reward_function, population_size, sigma, learning_rate):
```

- `weights`: A list of numpy arrays representing the initial weights of the model.
- `reward_function`: A function that takes the weights as input and returns a scalar value indicating the performance of the model.
- `population_size`: The number of weight vectors in the population.
- `sigma`: The standard deviation of the Gaussian distribution used to generate random perturbations of the weights.
- `learning_rate`: The learning rate used to update the weights.

### Methods

#### `_get_weight_from_population(self, weights, population)`

This method takes the current weights and a population of perturbations and returns a list of weight vectors obtained by adding the perturbations to the current weights.

- `weights`: The current weights of the model.
- `population`: A list of perturbations generated from the current weights.

Returns:

- `weights_population`: A list of weight vectors obtained by adding perturbations to the current weights.

#### `get_weights(self)`

This method returns the current weights of the model.

Returns:

- `weights`: The current weights of the model.

#### `train(self, epoch=100, print_every=1)`

This method trains the model using the Deep Evolution Strategy algorithm.

- `epoch`: The number of training epochs.
- `print_every`: The frequency at which to print the training progress.

Returns:

- `performance`: A list containing the performance of the model at each epoch.

## Class Definition

```python
class Model:
```

### Constructor

```python
def __init__(self, input_size, layer_size, output_size):
```

- `input_size`: The size of the input layer of the neural network.
- `layer_size`: The size of the hidden layer of the neural network.
- `output_size`: The size of the output layer of the neural network.

### Methods

#### `predict(self, inputs)`

This method takes an input sequence and returns the predictions of the model.

- `inputs`: An input sequence.

Returns:

- `decision`: The decision prediction of the model.
- `buy`: The buy prediction of the model.

#### `get_weights(self)`

This method returns the current weights of the model.

Returns:

- `weights`: The current weights of the model.

#### `set_weights(self, weights)`

This method sets the weights of the model.

- `weights`: The weights to be set for the model.

## Class Definition

```python
class Agent:
```

### Properties

- `POPULATION_SIZE`: The population size used in the Deep Evolution Strategy algorithm.
- `SIGMA`: The standard deviation used in the Deep Evolution Strategy algorithm.
- `LEARNING_RATE`: The learning rate used in the Deep Evolution Strategy algorithm.

### Constructor

```python
def __init__(self, model, money, max_buy, max_sell, window_size, close, skip, length, show_graph, debug):
```

- `model`: An instance of the `Model` class representing the neural network model.
- `money`: The initial amount of money available for trading.
- `max_buy`: The maximum number of units that can be bought in a single transaction.
- `max_sell`: The maximum number of units that can be sold in a single transaction.
- `window_size`: The size of the window used for input sequences.
- `close`: A list of closing prices for the trading data.
- `skip`: The number of time steps to skip between two consecutive input sequences.
- `length`: The length of the trading data.
- `show_graph`: A boolean indicating whether to show a graph of the trading results.
- `debug`: A boolean indicating whether to print debug messages.

### Methods

#### `act(self, sequence)`

This method takes an input sequence and returns the action to be taken by the agent.

- `sequence`: An input sequence.

Returns:

- `action`: The action to be taken by the agent.
- `buy`: The number of units to be bought.

#### `get_reward(self, weights)`

This method calculates the reward for a given set of weights.

- `weights`: The weights to be used for the model.

Returns:

- `reward`: The reward obtained using the given weights.

#### `fit(self, iterations, checkpoint)`

This method trains the agent for a specified number of iterations using the Deep Evolution Strategy algorithm.

- `iterations`: The number of iterations to train the agent.
- `checkpoint`: The frequency at which to printthe training progress and save the model weights.

#### `buy(self, units)`

This method performs a buy action, updating the agent's money and portfolio.

- `units`: The number of units to be bought.

#### `sell(self, units)`

This method performs a sell action, updating the agent's money and portfolio.

- `units`: The number of units to be sold.

#### `reset(self)`

This method resets the agent's money and portfolio to their initial values.

#### `portfolio_value(self)`

This method calculates the current value of the agent's portfolio.

Returns:

- `value`: The current value of the agent's portfolio.
