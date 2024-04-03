import matplotlib.pyplot as plt

def buy_stock(
    df, 
    debug,
    real_movement,
    delay = 5,
    initial_state = 1,
    initial_money = 10000,
    max_buy = 1,
    max_sell = 1,
):
    """
    real_movement = actual movement in the real world
    delay = how much interval you want to delay to change our decision from buy to sell, vice versa
    initial_state = 1 is buy, 0 is sell
    initial_money = 1000, ignore what kind of currency
    max_buy = max quantity for share to buy
    max_sell = max quantity for share to sell
    """
    starting_money = initial_money
    delay_change_decision = delay
    current_decision = 0
    state = initial_state
    current_val = real_movement[0]
    states_sell = []
    states_buy = []
    current_inventory = 0
    logs = []

    def print_log(message): 
        for key, value in message.items(): 
            if key in ["balance", "current_unit_price", "current_action_price", "investment"]:
                print(f"{key}: {round(value, 2)} | ",end = "")
                continue
            print(f"{key}: {value} | ",end = "")
        print()

    def buy(i, initial_money, current_inventory):
        shares = initial_money // real_movement[i]
        if shares < 1:
            message = {}
            message["date"] = df['Date'][i]
            message["day"] = i
            message["balance"] = initial_money
            message["inventory"] = current_inventory
            message["action"] = "none"
            message["units"] = 0
            message["message"] = "not enough money to buy"
            message["current_unit_price"] = real_movement[i]
            message["current_action_price"] = 0

            logs.append(message)

            if debug: print_log(message)
        else:
            if shares > max_buy:
                buy_units = max_buy
            else:
                buy_units = shares
            initial_money -= buy_units * real_movement[i]
            current_inventory += buy_units
            message = {}
            message["date"] = df['Date'][i]
            message["day"] = i
            message["balance"] = initial_money
            message["inventory"] = current_inventory
            message["action"] = "buy"
            message["units"] = buy_units
            message["current_unit_price"] = real_movement[i]
            message["current_action_price"] = buy_units * real_movement[i]
            logs.append(message)

            if debug: print_log(message)

            states_buy.append(0)
        return initial_money, current_inventory

    if state == 1:
        initial_money, current_inventory = buy(
            0, initial_money, current_inventory
        )

    for i in range(1, real_movement.shape[0], 1):
        if real_movement[i] < current_val and state == 0:
            if current_decision < delay_change_decision:
                current_decision += 1
            else:
                state = 1
                initial_money, current_inventory = buy(
                    i, initial_money, current_inventory
                )
                current_decision = 0
                states_buy.append(i)
        if real_movement[i] > current_val and state == 1:
            if current_decision < delay_change_decision:
                current_decision += 1
            else:
                state = 0

                if current_inventory == 0:
                    message = {}
                    message["date"] = df['Date'][i]
                    message["day"] = i
                    message["balance"] = initial_money
                    message["inventory"] = current_inventory
                    message["action"] = "none"
                    message["units"] = 0
                    message["current_unit_price"] = real_movement[i]
                    message["current_action_price"] = 0

                    logs.append(message)

                else:
                    if current_inventory > max_sell:
                        sell_units = max_sell
                    else:
                        sell_units = current_inventory
                    current_inventory -= sell_units
                    total_sell = sell_units * real_movement[i]
                    initial_money += total_sell
                    try:
                        invest = (
                            (real_movement[i] - real_movement[states_buy[-1]])
                            / real_movement[states_buy[-1]]
                        ) * 100
                    except:
                        invest = 0
                    message = {}
                    message["date"] = df['Date'][i]
                    message["day"] = i
                    message["balance"] = initial_money
                    message["inventory"] = current_inventory
                    message["action"] = "sell"
                    message["units"] = sell_units
                    # message["note"] = "not enough money to buy"
                    message["current_unit_price"] = real_movement[i]
                    message["current_action_price"] = total_sell
                    message["investment"] = invest
                    logs.append(message)

                    if debug: print_log(message)

                current_decision = 0
                states_sell.append(i)
        current_val = real_movement[i]
    invest = ((initial_money - starting_money) / starting_money) * 100
    total_gains = initial_money - starting_money
    return logs, states_buy, states_sell, total_gains, invest

def roll(debug, show_graph, df, initial_money, max_buy, max_sell): 
    # if debug: print(df.head(5))
    print("\n\ninside function running single rolling agent\n\n")
    logs, states_buy, states_sell, total_gains, invest = buy_stock(df=df, debug=debug, real_movement=df.Close, initial_state=1, delay=4, initial_money=initial_money, max_buy=max_buy, max_sell=max_sell)
    close = df['Close']
    if show_graph:    
        fig = plt.figure(figsize = (15,5))
        plt.plot(close, color='r', lw=2.)
        plt.plot(close, '^', markersize=10, color='m', label = 'buying signal', markevery = states_buy)
        plt.plot(close, 'v', markersize=10, color='k', label = 'selling signal', markevery = states_sell)
        plt.title('total gains %f, total investment %f%%'%(total_gains, invest))
        plt.legend()
        plt.show()
    return states_buy, states_sell, total_gains, invest, logs, close.tolist()
    
    
# if __name__ == '__main__':
#     df_path = "../dataset/GOOG-year.csv"
#     main(debug=True, show_graph=True, df_path=df_path)