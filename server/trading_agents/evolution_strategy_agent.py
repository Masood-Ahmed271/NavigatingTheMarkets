import numpy as np
import pandas as pd
import time
import matplotlib.pyplot as plt
import seaborn as sns
import random
import pkg_resources
import types

class Deep_Evolution_Strategy:

    inputs = None

    def __init__(
        self, weights, reward_function, population_size, sigma, learning_rate
    ):
        self.weights = weights
        self.reward_function = reward_function
        self.population_size = population_size
        self.sigma = sigma
        self.learning_rate = learning_rate
        self.performance = []

    def _get_weight_from_population(self, weights, population):
        weights_population = []
        for index, i in enumerate(population):
            jittered = self.sigma * i
            weights_population.append(weights[index] + jittered)
        return weights_population

    def get_weights(self):
        return self.weights

    def train(self, epoch = 100, print_every = 1):
        lasttime = time.time()
        for i in range(epoch):
            population = []
            rewards = np.zeros(self.population_size)
            for k in range(self.population_size):
                x = []
                for w in self.weights:
                    x.append(np.random.randn(*w.shape))
                population.append(x)
            for k in range(self.population_size):
                weights_population = self._get_weight_from_population(
                    self.weights, population[k]
                )
                rewards[k] = self.reward_function(weights_population)
            rewards = (rewards - np.mean(rewards)) / np.std(rewards)
            for index, w in enumerate(self.weights):
                A = np.array([p[index] for p in population])
                self.weights[index] = (
                    w
                    + self.learning_rate
                    / (self.population_size * self.sigma)
                    * np.dot(A.T, rewards).T
                )
            if (i + 1) % print_every == 0:
                print(
                    'iter %d. reward: %f'
                    % (i + 1, self.reward_function(self.weights))
                )
                # self.performance.append((i+1, self.reward_function(self.weights)))
                self.performance.append({"epoch": i+1, "reward": self.reward_function(self.weights)})
        print('time taken to train:', time.time() - lasttime, 'seconds')
        return self.performance


class Model:
    def __init__(self, input_size, layer_size, output_size):
        self.weights = [
            np.random.randn(input_size, layer_size),
            np.random.randn(layer_size, output_size),
            np.random.randn(layer_size, 1),
            np.random.randn(1, layer_size),
        ]

    def predict(self, inputs):
        feed = np.dot(inputs, self.weights[0]) + self.weights[-1]
        decision = np.dot(feed, self.weights[1])
        buy = np.dot(feed, self.weights[2])
        return decision, buy

    def get_weights(self):
        return self.weights

    def set_weights(self, weights):
        self.weights = weights

class Agent:

    POPULATION_SIZE = 15
    SIGMA = 0.1
    LEARNING_RATE = 0.03

    def __init__(self, model, money, max_buy, max_sell, window_size, close, skip, length, show_graph, debug):
        self.model = model
        self.initial_money = money
        self.window_size = window_size
        self.close = close
        self.debug = debug
        self.show_graph = show_graph
        self.length = length
        self.skip = skip
        self.max_buy = max_buy
        self.max_sell = max_sell
        self.es = Deep_Evolution_Strategy(
            self.model.get_weights(),
            self.get_reward,
            self.POPULATION_SIZE,
            self.SIGMA,
            self.LEARNING_RATE,
        )

    def act(self, sequence):
        decision, buy = self.model.predict(np.array(sequence))
        return np.argmax(decision[0]), int(buy[0])

    def get_reward(self, weights):
        initial_money = self.initial_money
        starting_money = initial_money
        self.model.weights = weights
        state = get_state(self.close, 0, self.window_size + 1)
        inventory = []
        quantity = 0
        for t in range(0, self.length, self.skip):
            action, buy = self.act(state)
            next_state = get_state(self.close, t + 1, self.window_size + 1)
            if action == 1 and initial_money >= self.close[t]:
                if buy < 0:
                    buy = 1
                if buy > self.max_buy:
                    buy_units = self.max_buy
                else:
                    buy_units = buy
                total_buy = buy_units * self.close[t]
                initial_money -= total_buy
                inventory.append(total_buy)
                quantity += buy_units
            elif action == 2 and len(inventory) > 0:
                if quantity > self.max_sell:
                    sell_units = self.max_sell
                else:
                    sell_units = quantity
                quantity -= sell_units
                total_sell = sell_units * self.close[t]
                initial_money += total_sell

            state = next_state
        return ((initial_money - starting_money) / starting_money) * 100

    def fit(self, iterations, checkpoint):
        self.performance = self.es.train(iterations, print_every = checkpoint)

    def buy(self):
        self.logs = []
        initial_money = self.initial_money
        state = get_state(self.close, 0, self.window_size + 1)
        starting_money = initial_money
        states_sell = []
        states_buy = []
        inventory = []
        quantity = 0
        for t in range(0, self.length, self.skip):
            action, buy = self.act(state)
            next_state = get_state(self.close, t + 1, self.window_size + 1)
            if action == 1 and initial_money >= self.close[t]:
                if buy < 0:
                    buy = 1
                if buy > self.max_buy:
                    buy_units = self.max_buy
                else:
                    buy_units = buy
                total_buy = buy_units * self.close[t]
                initial_money -= total_buy
                inventory.append(total_buy)
                quantity += buy_units
                states_buy.append(t)
                message = {"day": t+1, "action": "buy", "units": buy_units, "units": total_buy, "balance": initial_money}
                self.logs.append(message)
                if self.debug: print(message)
                # print(
                #     'day %d: buy %d units at price %f, total balance %f'
                #     % (t, buy_units, total_buy, initial_money)
                # )
            elif action == 2 and len(inventory) > 0:
                bought_price = inventory.pop(0)
                if quantity > self.max_sell:
                    sell_units = self.max_sell
                else:
                    sell_units = quantity
                if sell_units < 1:
                    continue
                quantity -= sell_units
                total_sell = sell_units * self.close[t]
                initial_money += total_sell
                states_sell.append(t)
                try:
                    invest = ((total_sell - bought_price) / bought_price) * 100
                except:
                    invest = 0

                message = {"day": t+1, "action": "sell", "units": sell_units, "total units": total_sell, "balance": initial_money, "invest": invest}
                
                self.logs.append(message)
                if self.debug: print(message)
                # print(
                #     'day %d, sell %d units at price %f, investment %f %%, total balance %f,'
                #     % (t, sell_units, total_sell, invest, initial_money)
                # )
            state = next_state

        invest = ((initial_money - starting_money) / starting_money) * 100
        # message = f"\ntotal gained {initial_money - starting_money}, total investment {invest} %%"
        message = {"day": t+1, "total_gained": initial_money - starting_money, "total_investment": invest}
        self.logs.append(message)
        if self.debug: print(message)
        # print(
        #     '\ntotal gained %f, total investment %f %%'
        #     % (initial_money - starting_money, invest)
        # )
        if self.show_graph: 
            self.show_plot(states_buy, states_sell)

        return self.logs, states_buy, states_sell, self.performance

    def show_plot(self, states_buy, states_sell):
        plt.figure(figsize = (20, 10))
        plt.plot(self.close, label = 'true close', c = 'g')
        plt.plot(
            self.close, 'X', label = 'predict buy', markevery = states_buy, c = 'b'
        )
        plt.plot(
            self.close, 'o', label = 'predict sell', markevery = states_sell, c = 'r'
        )
        plt.legend()
        plt.show()

def get_state(data, t, n):
    d = t - n + 1
    block = data[d : t + 1] if d >= 0 else -d * [data[0]] + data[0 : t + 1]
    res = []
    for i in range(n - 1):
        res.append(block[i + 1] - block[i])
    return np.array([res])


def evolve(df, iterations=500, checkpoint=10):
    close = df.Close.values.tolist()
    window_size, skip = 30, 1
    length = len(close) - 1

    model = Model(window_size, 500, 3)
    agent = Agent(model, 10000, 5, 5, window_size, close, skip, length, show_graph=False, debug=False)
    agent.fit(iterations, checkpoint)
    

    print("\n\ninside function evolution stratergy agent\n\n")
    
    logs, states_buy, states_sell, performance = agent.buy()
    return states_buy, states_sell, logs, performance, close