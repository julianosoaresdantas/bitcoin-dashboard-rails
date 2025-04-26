# bitcoin-dashboard-rails
Rails dashboard for real-time crypto prices (BTC, ETH, LTC, DOGE, ADA, SOL) &amp; historical Bitcoin charts (JS). UI with demo data implemented; API integration is the next step.


# Bitcoin Dashboard (Ruby on Rails)

[![Status](https://img.shields.io/badge/Status-In%20Development-yellow)](https://github.com/julianosoaresdantas/bitcoin-dashboard-rails)
[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)
[![Rails](https://img.shields.io/badge/Rails-7.x-brightgreen)](https://rubyonrails.org/)
[![Ruby](https://img.shields.io/badge/Ruby-3.x-red)](https://www.ruby-lang.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> A web dashboard built with Ruby on Rails to display real-time cryptocurrency prices and visualize Bitcoin's price history.

## Overview

This project aims to provide an intuitive interface for tracking the prices of major cryptocurrencies (Bitcoin, Ethereum, Litecoin, Dogecoin, Cardano, Solana) and visualizing Bitcoin's price history through interactive charts. Currently, the interface displays demonstration (fixed) data, and the next development phase will focus on integrating with real-time cryptocurrency data APIs.

## Features

* **Real-time Price Table (Simulated):** Displays the prices of Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Dogecoin (DOGE), Cardano (ADA), and Solana (SOL) in various fiat currencies (currently USD, EUR, BRL). The data is currently static for demonstration purposes.
* **Bitcoin Price History Chart (Simulated):** Presents an interactive line chart showing the evolution of Bitcoin's price over time (static data for demonstration).
* **Fiat Currency Selector:** Allows users to select their preferred fiat currency for viewing prices.

## Technologies Used

* Ruby on Rails: Backend web framework.
* JavaScript: For interactivity and DOM manipulation.
* Chart.js: JavaScript library for creating charts.
* HTML and CSS: For the structure and styling of the user interface.

## Project Status

[![Status](https://img.shields.io/badge/Status-In%20Development-yellow)](https://github.com/julianosoaresdantas/bitcoin-dashboard-rails)

This project is currently under development. The basic interface with demonstration data is implemented, and the next priority is integration with cryptocurrency data APIs to provide real-time information.

## Next Steps

* Integrate with cryptocurrency data APIs (CurrencyFreaks and CoinGecko) to obtain real-time prices and historical data.
* Implement automatic updates to the price table.
* Improve the visualization of the price history chart.
* Add charts for other cryptocurrencies.
* Enhance responsiveness and user experience.

## How to Run (For Developers)

Although API integration is still pending, you can run the interface with the demonstration data:

1. Clone the repository:
```bash
git clone [https://github.com/julianosoaresdantas/bitcoin-dashboard-rails.git](https://github.com/julianosoaresdantas/bitcoin-dashboard-rails.git)
cd bitcoin-dashboard-rails
