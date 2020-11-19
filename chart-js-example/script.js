
const key = "demo";
const functionName = "TIME_SERIES_DAILY";
const symbolName = "MSFT";
const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbolName}&apikey=${key}`;

axios
    .get(apiUrl)
    .then(response => {
        console.log(response.data);
        printChartData(response.data);
    })
    .catch(err => {
        console.log(err);
    })

const printChartData = stockData => {
    const dailyData = stockData['Time Series (Daily)'];
    console.log('daily data: ', dailyData);
    // this is the data for the x axis
    const stockDates = Object.keys(dailyData);
    console.log(stockDates);
    // this is the data for the y axis
    const stockPrices = stockDates.map(date => {
        return dailyData[date]['4. close'];
    });
    console.log('stockPrices: ', stockPrices);
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockDates,
            datasets: [
                {
                    label: 'Stock Chart',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: "rgb(255, 99, 132)",
                    data: stockPrices
                }
            ]
        }
    })
}