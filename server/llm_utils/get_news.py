# import prompt_generation
from .prompt_generation import *
import os
import finnhub
from .data_preparation import *
# import data_preparation
import random

finnhub_client = finnhub.Client(
    api_key=os.environ["FINNHUB_API_KEY"])

START_DATE, END_DATE = get_start_end_dates()


def get_introduction(symbol):
    return get_company_prompt(symbol)


def get_news(symbol):
    news = finnhub_client.company_news(
        symbol, _from=START_DATE, to=END_DATE)

    company_name = finnhub_client.company_profile2(symbol=symbol)['name']
    # Get top 3 headlines containing the company name
    headlines = []
    for n in news:
        if company_name in n['headline']:
            headlines.append(n['headline'])

    # Return any 3 headlines randomly
    return random.sample(headlines, 3)


# Testing
# print(get_introduction('AAPL'))
# print(get_news('CRM'))
