const currencyBtn = document.getElementById("currencyBtn");
const inrOption = document.getElementById("inrOption");
const cryptoBtn = document.getElementById("cryptoBtn");
const btcOption = document.getElementById("btcOption");

inrOption.addEventListener("click", () => {
  currencyBtn.textContent = "INR";
});
btcOption.addEventListener("click", () => {
  cryptoBtn.textContent = "BTC";
});
//
let countdown = 60;

function updateCountdown() {
  document.getElementById("countdown").textContent = countdown;
  countdown--;

  if (countdown < 0) {
    countdown = 60;
  }
}

setInterval(updateCountdown, 1000);

window.onload = function () {
  // Function to fetch data and update table
  function fetchDataAndUpdateTable() {
    fetch("http://localhost:3000/api/data")
      .then((response) => response.json())
      .then((data) => {
        const table = document.getElementById("cryptoTable");

        // Clearing existing rows for updating with latest
        while (table.rows.length > 1) {
          table.deleteRow(1);
        }

        // Getting the last 10 items
        const latestData = data.slice(-10);

        latestData.forEach((item, index) => {
          const row = table.insertRow(-1);

          // Add a new cell at the beginning of each row for the number in the id column
          const numberCell = row.insertCell(0);
          numberCell.textContent = index + 1;

          ["name", "last", "buy", "sell", "volume", "base_unit"].forEach(
            (key) => {
              const cell = row.insertCell(-1);
              if (["last", "buy", "sell"].includes(key)) {
                cell.textContent = "₹" + item[key];
              } else {
                cell.textContent = item[key];
              }
            }
          );
        });
      });
  }

  // Fetches data and updates table immediately when the page loads
  fetchDataAndUpdateTable();

  // fetching data and updating table every 60 seconds
  setInterval(fetchDataAndUpdateTable, 60000);
};
