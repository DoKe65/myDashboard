chartNavigation.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    let a = e.target;
    let id = a.parentNode.id;

    let canvas = document.querySelector("canvas");
    let chartMonitor = canvas.parentNode;
    let trafficContainer = canvas.parentNode.parentNode;
    chartMonitor.removeChild(canvas);
    // trafficContainer.removeChild(chartMonitor);
    console.log(trafficContainer);
    let newCanvas = document.createElement("canvas");
    newCanvas.setAttribute("id", "traffic");
    trafficContainer.appendChild(newCanvas);

    if (id === "hourly") {

      createChart("traffic", "line", labelsTrafficHourly, "TRAFFIC", dataTrafficHourly);
    } else if (id === "daily") {
      createChart("traffic", "line", labelsTrafficDaily, "TRAFFIC", dataTrafficDaily);
    } else if (id === "weekly") {
      createChart("traffic", "line", labelsTrafficWeekly, "TRAFFIC", dataTrafficWeekly);
    } else {
      createChart("traffic", "line", labelsTrafficMonthly, "TRAFFIC", dataTrafficMonthly);
    }
  }
});
