# Navigating The Markets - FYP Project for HKU Computer Science (Group fyp23070)

_Link To Video Demo:_ <a href=""> Will Upload Soon </a> <br>

<p>
  </a>
  <!-- Web -->
  <a href="https://docs.expo.dev/workflow/web/">
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
  </a>
</p>

## Contributors

---

Author: Masood Ahmed <br>
Email: 'masood20@connect.hku.hk'<br>

Author: Aryan Agarwal <br>
Email: 'u3581237@connect.hku.hk'<br>

Author: Arnav Rajiv <br>
Email: 'u3570905@connect.hku.hk'<br>

---

# Technologies Used

<table>
  <tr>
    <td>Javascript</td>
    <td>React Js</td>
     <td>Tensorflow (Python)</td>
     <td>PyTorch (Python)</td>
     <td>Flask (Python)</td>
     <td>FinRL</td>
     <td>SQLAlchemy</td>
     <td>LLaMA-2</td>
  </tr>
  <tr>
    <td>  <!-- Java Script -->
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
    <img alt="Java Script" longdesc="Java Script" src="https://raw.github.com/voodootikigod/logo.js/master/js.png" width=80 height=80 />
    </a></td>
    <td>  <!-- React JS -->
  <a href="https://legacy.reactjs.org/">
    <img alt="React JS" longdesc="React JS" src="https://cdn.worldvectorlogo.com/logos/react-2.svg" width=80 height=60 />
    </a></td>
    <td>  <!-- Tensorflow Python -->
  <a href="https://www.tensorflow.org/">
    <img alt="Tensorflow" longdesc="Tensorflow" src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg" width=80 height=80 />
    </a></td>
    <td>  <!--  (Python) PyTorch -->
  <a href="https://pytorch.org/">
    <img alt="PyTorch" longdesc="PyTorch" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Pytorch_logo.png" width=130 height=60 />
    </a></td>
    <td>  <!--  (Python) Flask -->
  <a href="https://flask.palletsprojects.com/en/3.0.x/">
    <img alt="Flask" longdesc="Flask" src="https://flask.palletsprojects.com/en/3.0.x/_images/flask-horizontal.png" width=130 height=60 />
    </a></td>
    <td>  <!--  FinRL -->
  <a href="https://finrl.readthedocs.io/en/latest/">
    <img alt="FinRL" longdesc="FinRL" src="https://finrl.readthedocs.io/en/latest/_images/logo_transparent_background.png" width=130 height=80 />
    </a></td>
    <td>  <!--  SQLAlchemy -->
  <a href="https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/">
    <img alt="SQLAlchemy" longdesc="SQLAlchemy" src="https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/_static/flask-sqlalchemy-logo.png" width=80 height=80 />
    </a></td>
    <td>  <!--  LLAMA -->
  <a href="https://huggingface.co/meta-llama">
    <img alt="LLAMA" longdesc="LLAMA" src="https://aeiljuispo.cloudimg.io/v7/https://cdn-uploads.huggingface.co/production/uploads/646cf8084eefb026fb8fd8bc/oCTqufkdTkjyGodsx1vo1.png?w=200&h=200&f=face" width=80 height=80 />
    </a></td>
  </tr>
 </table>

## 🚀 How to use

**Note: Node and Python should be installed in your machine before proceeding!**

### Method 1:

- Step 1: Navigate to client-v1 and run the following commands:

```bash
cd client-v1
npm install
npm start
```

- Step 2: Navigate to stock-forecasting-server and run the following commands:

```bash
cd ../stock-forecasting-server
npm install -g serve
serve -l 8000
```

- Step 3: Export API keys your respective OS

      On Windows:

      - Open the Start menu and search for "Environment Variables".
      - Select "Edit the system environment variables".
      - Click on the "Environment Variables" button.
      - In the "System Variables" section, click on "New" to add a new environment variable.
      - Enter the name of the variable (i.e.., OPENAI_API_KEY, and FINNHUB_API_KEY) and its corresponding value (e.g., your API key).
      - Click "OK" to save the changes.

      On macOS or Linux:

      - Open a terminal window.
      - Type export OPENAI_API_KEY="your_api_key" and press Enter
      - Type export FINNHUB_API_KEY="your_api_key" and press Enter
      - Replace "your_api_key" with your actual API key.

- Step 4: Navigate to server and run the following commands:

```bash
cd server
pip install -r requirements. txt
python3 -m flask --app server.py run
```

### Method 2:

**Note: This method only works if you have setup the project before .i.e. have followed method 1 atleast once.**

- Step 1: Stay in the root folder

```bash
chmod +x run.sh (You need to do this once)
./run.sh
```

## Documentation

- [API Endpoints Documentation](Documentation/backendServerDocumentation.md)
- [Deep Learning Models Documentation](Documentation/DeepLearningDocs)
- [Trading Agnets Documentation](Documentation/TradingAgentsDocs)
- [FinLLM Documentation](Documentation/FINLLM)

## Features

- Registration Page and Login Page (allows users to register using their username, email address, and password and login with email address + password + username.)
- Can interact with other users on the discussion forum and talk about the financial market and strategies.
- Can look and run deep learning agents with different parameters on the choosen stock data (OHLCV). Here is a sample data:
  [Google](test/GOOG-year.csv). This will allow them see how each deep learning algorithm works on stocks by showing them Epoch Loss Curve and Price Prediction Graphs.
- Trading Agents: Multiple different trading agents are available to the user to choose from which can be used by the user to make predictions on the choosen stock data and find buy and sell points.
- FinLLM: A Large Language Model trained on financial data to provide positive developments, potential concerns, summary, prediction & anlysis and news related to the choosen stock. (**NOTE:** In order to use this feature, you need to have a valid API key for the OpenAI API. You can get one for free [here](https://platform.openai.com/account/api-keys). You also need to have a valid Finnhub API Key as well.The API key is used to authenticate and access the Finnhub API. You can sign up and obtain an API key from the Finnhub website.) A traditional LLAMA model is also available to the user to provide detailed analysis of the chosen stock, however, the performance of GPT4 was much better. Therefore, current version of the application makes use of GPT4.

## Feedback

Pull requests are welcome. For feedback and suggestions, please reach out to Group fyp23070.

## License

COMP4801 Group fyp23070 2024 © The University of Hong Kong

### _Stay Happy and Keep Smiling :)_
