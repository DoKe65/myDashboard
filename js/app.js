// set Navigation Items to active when clicked
const mainNavigation = document.getElementById("navigationbar");
const trafficNavigation = document.getElementById("trafficNavigation");

function setToActive(nav) {
  // const navigation = document.getElementById(nav);
  const navItems = nav.getElementsByTagName("li");
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", function() {
      let current = nav.getElementsByClassName("active");
      if (current.length > 0) {
        current[0].classList.remove("active");
      }
      this.classList += "active";
    });
  }
}

setToActive(mainNavigation);
setToActive(trafficNavigation);

// Charts

let ctx = document.getElementById("traffic").getContext('2d');

// Hide labels per default
Chart.defaults.global.legend.display = false;

let weeklyChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
        datasets: [{
            label: 'TRAFFIC',
            data: [750, 1240, 900, 1250, 1750, 1250, 1500, 1000, 1500, 2050, 1500, 2000],
            backgroundColor: 'rgba(116, 119, 191, 0.2)',
            borderColor: '#7477BF',
            borderWidth: 1,
            lineTension: 0,
            pointRadius: 6,
            pointHoverBorderColor: '#436678',
            pointBackgroundColor: '#fff'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        maintainAspectRatio: false
    }
});
