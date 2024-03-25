# Cryptocurrency current price display

The project was done by using html, css, Javascript for frontend and node js(express.js) was used for backend.

The main section, labeled as the "table-container," is reserved for displaying cryptocurrency data. Within this section, a table named "cryptoTable" is defined. The table is structured with headers for "ID," "NAME," "LAST," "BUY," "SELL," "VOLUME," and "BASE_UNIT," which represent key data points for tracking cryptocurrencies. The table body is initially empty, indicating that cryptocurrency data will be loaded dynamically using JavaScript.

Initialization:(script.js)
The code is set to execute when the webpage loads. It does the following:
Immediately calls fetchDataAndUpdateTable to retrieve and display cryptocurrency data when the page first loads.
Sets up an interval using setInterval to call fetchDataAndUpdateTable every 60 seconds. This ensures that the cryptocurrency data stays current, providing users with real-time information.

Depencies like express, node-fetch, pg were installed.

Data Retrieval:(index.js)
The code starts by making an asynchronous HTTP GET request to the WazirX API's endpoint, https://api.wazirx.com/api/v2/tickers. This API provides information about various cryptocurrencies. The fetch function is used to obtain data from the API, and await is used to ensure that the response is fully received before proceeding.

Data Processing:
Once the data is received, it's parsed into JSON format. The code then processes this data by extracting the top 10 cryptocurrency entries. These entries, which represent the most recent data, are placed into an array named top10. A Database is created with postgresql with the name crypto_data.

Database Interaction:
The core functionality of the code is to persist this cryptocurrency data. For each of the top 10 entries, a database query is executed to insert the data into a PostgreSQL table crypto_data. This table has columns such as name, last, buy, sell, volume, and base_unit. These columns correspond to key attributes of each cryptocurrency, such as its name, last traded price, buy price, sell price, trading volume, and base unit.

Data Retrieval and Response:
After inserting the data into the database, the code performs a second database query to retrieve all rows from the crypto_data table. The selected data is then sent as a JSON response back to the frontend, allowing it to be displayed in a user-friendly manner.

Server Initialization:
The code concludes by starting an Express server on a specified port, facilitating communication between the frontend and the backend. This server continuously listens for incoming requests, enabling real-time updates of cryptocurrency data.

In summary, this code establishes a crucial data pipeline in a web application. It retrieves, processes, and stores cryptocurrency data from an external API, making it available for display on the frontend.
