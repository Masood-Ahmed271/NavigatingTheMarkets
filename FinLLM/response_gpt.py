import os
import re
import csv
import math
import time
import json
import random
import finnhub
import pandas as pd
import yfinance as yf
import datetime
from collections import defaultdict
import data_preparation
import prompt_generation
from openai import OpenAI
# from .data_preparation import *
import data_preparation
# from .prompt_generation import *
import prompt_generation

# Get the directory path of the current script
current_dir = os.path.dirname(os.path.abspath(__file__))


def get_response(company):
    data_preparation.prepare_data_for_company(company, with_basics=True)
    user_prompt = str(prompt_generation.get_prompt(company))
    system_prompt = str(open('system_prompt.txt', 'r').read())
    print('User Prompt: \n\n', user_prompt)
    print('System Prompt: \n\n', system_prompt)

    client = OpenAI()

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )

    return completion.choices[0].message.content


# print(get_response('CRM')) #debugging
