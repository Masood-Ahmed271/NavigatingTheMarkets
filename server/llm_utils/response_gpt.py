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
from .prompt_generation import *
from openai import OpenAI
from .data_preparation import *

# Get the directory path of the current script
current_dir = os.path.dirname(os.path.abspath(__file__))


def get_response(company):
    prepare_data_for_company(company, with_basics=True)
    user_prompt = str(get_prompt(company))
    file_path = os.path.join(current_dir, 'system_prompt.txt')
    system_prompt = str(open(file_path, 'r').read())
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
