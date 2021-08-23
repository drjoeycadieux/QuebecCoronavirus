const chart = document.getElementById("chart-async-data-example");
const chartInstance = new mdb.Chart(chart, { type: "bar" });
fetch("https://api.covid19api.com/summary")
  .then((data) => data.json())
  .then((data) => {
    const dataset = data.map((obj) => obj["Cases"]);
    const labels = data.map((obj) => obj["Date"].substr(0, 10));
    chartInstance.update({
      labels,
      datasets: [
        {
          color: "#FFCDD2",
          data: dataset,
          label: "Number of cases",
          pointRadius: 0,
          borderColor: dataset.color
        }
      ]
    });
  });
