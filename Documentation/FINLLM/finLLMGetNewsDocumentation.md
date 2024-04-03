# Code Documentation

This documentation provides an overview of the functionality and usage of the get_news.py in finLLM.

## Table of Contents

- [Requirements](#requirements)
- [Code Structure](#code-structure)
- [Functions](#functions)
  - [get_introduction(symbol)](#get_introduction)
  - [get_news(symbol)](#get_news)

## Requirements<a name="requirements"></a>

The code requires the following libraries to be installed:

- `os`
- `finnhub`
- `random`
- `prompt_generation`

Additionally, an API key for the Finnhub API is required.

## Code Structure<a name="code-structure"></a>

The code is structured as follows:

1. Importing the required libraries and modules
2. Defining global variables and constants
3. Defining utility functions
4. Executing the main function for testing purposes

## Functions<a name="functions"></a>

### `get_introduction(symbol)`<a name="get_introduction"></a>

This function retrieves the introduction prompt for a given stock symbol. It calls the `get_company_prompt()` function from the `prompt_generation` module and returns the generated prompt.

### `get_news(symbol)`<a name="get_news"></a>

This function retrieves news headlines for a given stock symbol. It uses the Finnhub API to fetch company news for the specified symbol within the defined start and end dates. The function extracts the company name from the API response and filters the news headlines to include only those containing the company name. It then randomly selects three headlines from the filtered list and returns them as a result.
