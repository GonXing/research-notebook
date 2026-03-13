#!/usr/bin/env python3
"""
fetch_market_data.py
Fetches latest price and change data for SPY, DIA, QQQ from Alpha Vantage.
Saves results to public/data/market_indices.json.

Usage:
    python fetch_market_data.py

Environment:
    Reads ALPHA_VANTAGE_API_KEY from .research_notebook_secrets.env (project root)
    or falls back to the environment variable of the same name.
"""

import json
import logging
import os
from datetime import datetime, timezone
from pathlib import Path
import requests
import time

from dotenv import load_dotenv

# ─── Config ────────────────────────────────────────────────────────────────
SCRIPTS_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPTS_DIR.parent

# Setup logging first so we can track the loading process
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger(__name__)

# Try to find the secrets file in multiple locations
possible_env_paths = [
    PROJECT_ROOT / ".research_notebook_secrets.env",
    PROJECT_ROOT.parent / ".research_notebook_secrets.env",
]

env_loaded = False
for p in possible_env_paths:
    if p.exists():
        load_dotenv(p)
        log.info("Loaded secrets from: %s", p)
        env_loaded = True
        break

if not env_loaded:
    log.warning("No .research_notebook_secrets.env found in %s. Using system environment variables.", [str(p) for p in possible_env_paths])

# Detect if we are in local dev (has public/) or production server (dist content at root)
if (PROJECT_ROOT / "public").is_dir():
    OUTPUT_FILE = PROJECT_ROOT / "public" / "data" / "market_indices.json"
else:
    OUTPUT_FILE = PROJECT_ROOT / "data" / "market_indices.json"

# ─── Helpers ───────────────────────────────────────────────────────────────

def fetch_av_quote(symbol, api_key):
    """Fetch global quote for a symbol from Alpha Vantage."""
    url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={api_key}"
    try:
        r = requests.get(url, timeout=15)
        data = r.json()
        if "Global Quote" in data and data["Global Quote"]:
            q = data["Global Quote"]
            price = float(q["05. price"])
            change = float(q["09. change"])
            change_pct_str = q["10. change percent"].replace("%", "")
            change_pct = float(change_pct_str)
            
            return {
                "symbol": symbol,
                "price": price,
                "change": change,
                "change_pct": change_pct,
                "direction": "up" if change >= 0 else "down"
            }
        elif "Note" in data:
            log.warning("Alpha Vantage API Note: %s", data["Note"])
        else:
            log.error("Invalid response for %s: %s", symbol, data)
    except Exception as e:
        log.error("Error fetching %s: %s", symbol, e)
    return None

def fetch_data():
    """Fetch market indices using Alpha Vantage API."""
    api_key = os.getenv("ALPHA_VANTAGE_API_KEY")
    if not api_key:
        log.error("ALPHA_VANTAGE_API_KEY is not set.")
        return None

    log.info("── Fetching market indices via Alpha Vantage ──")
    results = {}
    
    # Symbols supported by Alpha Vantage
    av_symbols = {
        "SPY": "S&P 500 (SPY)",
        "DIA": "Dow Jones (DIA)",
        "QQQ": "NASDAQ (QQQ)"
    }

    for symbol, label in av_symbols.items():
        log.info("Processing %s (%s) ...", symbol, label)
        quote = fetch_av_quote(symbol, api_key)
        if quote:
            results[symbol] = {
                "symbol": symbol,
                "label": label,
                "price": round(quote["price"], 2),
                "change": round(quote["change"], 2),
                "change_pct": round(quote["change_pct"], 2),
                "direction": quote["direction"]
            }
            log.info("  ✓ %s: $%.2f (%+.2f%%)", symbol, results[symbol]["price"], results[symbol]["change_pct"])
        
        # Free tier is 5 calls per minute, adding delay to be safe
        time.sleep(15)

    # Note: VIX is often not available via Alpha Vantage free tier
    # We add a placeholder or skip it to avoid breaking the UI
    log.info("Note: VIX Index is currently omitted (not supported by Alpha Vantage Free API)")
    
    return results

def main():
    data = fetch_data()
    if not data:
        log.error("No results fetched. Data file not updated.")
        return

    output = {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "indices": data
    }

    try:
        OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(output, f, indent=2)
        log.info("✅ Saved %d records → %s", len(data), OUTPUT_FILE)
    except Exception as e:
        log.error("Failed to save data: %s", e)

if __name__ == "__main__":
    main()
