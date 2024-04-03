# Code Documentation

This documentation provides an overview of the functionality and usage of the data_preparation.py used for finLLM. The code is designed to retrieve historical stock data, calculate weekly returns, fetch news articles for a given stock symbol, and obtain basic financial information for the corresponding company. The code is written in Python and utilizes several libraries and APIs.

## Table of Contents

- [Requirements](#requirements)
- [Code Structure](#code-structure)
- [Functions](#functions)
  - [get_start_end_dates()](#get_start_end_dates)
  - [bin_mapping(ret)](#bin_mapping)
  - [get_returns(stock_symbol)](#get_returns)
  - [get_news(symbol, data)](#get_news)
  - [get_basics(symbol, data, always=False)](#get_basics)
  - [prepare_data_for_company(symbol, with_basics=True)](#prepare_data_for_company)

## Requirements<a name="requirements"></a>

The code requires the following libraries to be installed:

- `os`
- `re`
- `csv`
- `math`
- `time`
- `json`
- `random`
- `finnhub`
- `pandas`
- `yfinance`
- `datetime`
- `collections`

Additionally, an API key for the Finnhub API is required.

## Code Structure<a name="code-structure"></a>

The code is structured as follows:

1. Importing the required libraries and modules
2. Defining global variables and constants
3. Defining utility functions
4. Defining the main functions for retrieving and processing data
5. Executing the main function

## Functions<a name="functions"></a>

### `get_start_end_dates()`<a name="get_start_end_dates"></a>

This function returns the start and end dates for the data retrieval. The dates are defined based on the `time_delta` variable, which specifies the number of days in the past from the current date.

### `bin_mapping(ret)`<a name="bin_mapping"></a>

This function maps a given return value to a bin label based on predefined criteria. It determines whether the return is positive or negative and assigns a label based on the magnitude of the return.

### `get_returns(stock_symbol)`<a name="get_returns"></a>

This function retrieves historical stock data for a given stock symbol using the `yfinance` library. It calculates the weekly returns based on the adjusted closing prices and categorizes the returns into bins using the `bin_mapping()` function. The function returns a pandas DataFrame containing the weekly returns data.

### `get_news(symbol, data)`<a name="get_news"></a>

This function fetches news articles for a given stock symbol and time period using the Finnhub API. It iterates over the rows of the provided DataFrame `data` and retrieves the news articles for each corresponding time period. The function appends the news articles as JSON strings to a list and adds the list as a new column 'News' to the DataFrame. The modified DataFrame is returned.

### `get_basics(symbol, data, always=False)`<a name="get_basics"></a>

This function retrieves basic financial information for a given stock symbol using the Finnhub API. It iterates over the rows of the provided DataFrame `data` and retrieves the relevant financial information for each corresponding time period. The function appends the financial information as JSON strings to a list and adds the list as a new column 'Basics' to the DataFrame. The modified DataFrame is returned. The `always` parameter determines whether to include all available financial information or only the information for the periods between the start and end dates.

### `prepare_data_for_company(symbol, with_basics=True)`<a name="prepare_data_for_company"></a>

This function prepares the data for a specific company by calling the `get_returns()`, `get_news()`, and `get_basics()` functions. It accepts a stock symbol as input and retrieves the corresponding returns, news articles, and basic financial information. The function returns a DataFrame containing the combined data. If the `with_basics` parameter is set to `True`, the function also saves the data to a CSV file in the specified `DATA_DIR` directory.

Please note that this code is specifically designed to work with stock symbols from the Dow 30 index, as defined in the `DOW_30` list.
