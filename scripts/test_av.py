import os
import requests
from dotenv import load_dotenv
from pathlib import Path

SCRIPTS_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPTS_DIR.parent
ENV_FILE = PROJECT_ROOT.parent / ".research_notebook_secrets.env"
load_dotenv(ENV_FILE)

API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")

def test_symbol(symbol):
    url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={API_KEY}"
    r = requests.get(url)
    print(f"--- {symbol} ---")
    print(r.json())

test_symbol("SPY")
test_symbol("VIX")
test_symbol("^VIX")
