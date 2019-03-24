//===========================================
// Closing Elements
//===========================================

function closeButton(element) {
  element.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
      const parent = e.target.parentNode;
      const gdParent = parent.parentNode;
      gdParent.removeChild(parent);
      if (e.target.id === "closeAll") {
      gdParent.parentNode.removeChild(gdParent);
      }
    }
    let noteButton = notesDiv.getElementsByTagName("BUTTON");
    if (noteButton.length === 0) {
      notesDiv.style.display = "none";
    }
  });
}

//===========================================
// Notification
//===========================================

// Notifications

let notifications = [
  "Hey there! Don't forget the get-together this evening after work!",
  "Important meeting for the production staff at 2:30 pm on Friday - please be at time!",
  "Time to have a chat this afternoon? See you in the cafeteria, Berry"
]

const header = document.querySelector(".header__right");
const notesDiv = document.createElement("div");
notesDiv.classList.add("notes");
notesDiv.style.display = "none";
header.appendChild(notesDiv);

const notesUl = document.createElement("ul");
notesDiv.appendChild(notesUl);

function noteList() {
  for (let i = 0; i < notifications.length; i++) {
    let noteLi = document.createElement("li");
    let note = notifications[i];
    noteLi.textContent = note;
    notesUl.appendChild(noteLi);
    let close = document.createElement("button");
    close.classList.add("close");
    close.textContent = "x";
    noteLi.appendChild(close);
  }
  closeButton(notesDiv);
  let closeAll = document.createElement("li");
  closeAll.textContent = "Close all notifications";
  notesUl.appendChild(closeAll);
  let close = document.createElement("button");
  close.classList.add("close");
  close.setAttribute("id", "closeAll");
  close.textContent = "x";
  closeAll.appendChild(close);
}

noteList();


// Show Notifications and hide Notificaton Badge

const badge = document.querySelector(".header__bell--badge");

header.addEventListener('click', (e) => {
  if (e.target.tagName === "svg") {
    let noteButton = notesDiv.getElementsByTagName("BUTTON");
    badge.setAttribute("style", "visibility: hidden;");
    if (notesDiv.style.display === "none") {
      if (noteButton.length > 0) {
        notesDiv.style.display = "block";
      } else {
      notesDiv.style.display = "none";
      }
    } else if (notesDiv.style.display === "block") {
      notesDiv.style.display = "none";
    }
  }
});


//===========================================
// Alert
//===========================================

// Close the alert bar

const closeAlert = document.querySelector(".main__alert");
closeButton(closeAlert);

//===========================================
// Behavior of chart navigation
//===========================================
// set Navigation Items to active when clicked
const mainNavigation = document.getElementById("navigationbar");
const trafficNavigation = document.getElementById("trafficNavigation");

function setToActive(nav) {
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


//============================
// Charts
//============================

// Data for charts

let labelsTrafficHourly = [
  "8am", "9am", "10am", "11am", "12am", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm"
];
let dataTrafficHourly = [
  12, 28, 35, 21, 44, 61, 57, 29, 6, 8, 3
];
let labelsTrafficDaily = [
  25, 26, 27, 28, 29, 30, 31
];
let dataTrafficDaily = [
  89, 205, 453, 231, 396, 322, 302
];
let labelsTrafficWeekly = [
  "16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"
];
let dataTrafficWeekly = [
  750, 1240, 900, 1250, 1750, 1250, 1500, 1000, 1500, 2050, 1500, 2000
];
let labelsTrafficMonthly = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
let dataTrafficMonthly = [
  19170, 21320, 16530, 14320, 17430, 23720, 14910, 10260, 15870, 18180, 22420, 16800
];
let labelsDailyTraffic = [
  "S", "M", "T", "W", "T", "F", "S"
];
let labelsMobile = ["Phones", "Tablets", "Desktop"];
let dataMobile = [15, 15, 70];

// Line charts
let lineChart = null;

function createLineChart(destination, type, labels, data) {

  let ctx = document.getElementById(destination).getContext('2d');

  lineChart = new Chart(ctx, {
      type: type,
      data: {
          labels: labels,
          datasets: [{
              data: data,
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
          maintainAspectRatio: false,
          legend: {
            display: false
          }
      }
  });

}

// Updating Charts

const chartNavigationContainer = document.getElementById("trafficNavigation");
const chartNavigation = chartNavigationContainer.querySelector("ul");

// Create initial charts
createLineChart("traffic", "line", labelsTrafficWeekly, dataTrafficWeekly);

chartNavigation.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    let a = e.target;
    let id = a.parentNode.id;
    if (id === "hourly") {
      lineChart.data.labels = labelsTrafficHourly;
      lineChart.data.datasets[0].data = dataTrafficHourly;
      lineChart.update();
    } else if (id === "daily") {
      lineChart.data.labels = labelsTrafficDaily;
      lineChart.data.datasets[0].data = dataTrafficDaily;
      lineChart.update();
    } else if (id === "weekly") {
      lineChart.data.labels = labelsTrafficWeekly;
      lineChart.data.datasets[0].data = dataTrafficWeekly;
      lineChart.update();
    } else {
      lineChart.data.labels = labelsTrafficMonthly;
      lineChart.data.datasets[0].data = dataTrafficMonthly;
      lineChart.update();
    }
  }
});

// BarChart
let barChart = null;

function createBarsChart(destination, labels, data) {
  let ctx = document.getElementById(destination).getContext('2d');
  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
          data: data,
          backgroundColor: '#7477BF',
          borderColor: '#7477BF',
          borderWidth: 1
      }]
      },
      options: {
        scales: {
          yAxes: [{
            barPercentage: 0.9,
            barThickness: 0.8,
                gridLines: {
                offsetGridLines: true
            }
          }]
        },
        maintainAspectRatio: false,
        aspectRatio: 2,
        legend: {
          display: false,
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 30,
                bottom: 20
            }
        }
      }
  });
}
createBarsChart("dailyTraffic", labelsDailyTraffic, dataTrafficDaily);

// doughnut chart

let doughnutChart = null;

function createDoughnutChart(destination, labels, data) {
  let ctx = document.getElementById(destination).getContext('2d');
  doughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
          data: data,
          backgroundColor: ['#8dd490', "#2eb5b5", "#7477BF"],
          borderWidth: 0
      }]
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 1,
        legend: {
          display: true,
          position: "right",
          labels: {
            boxWidth: 20,
            padding: 15,
            fontSize: 16
          }
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 10,
                bottom: 0
            }
        }
      }
  });
}

createDoughnutChart("mobileUsers", labelsMobile, dataMobile);

// ===========
// Members
// ===========

// New Members Widget
const src = "../images/";
const members = [
  {
    name: "Victoria Chambers",
    mail: "victoria.chambers80@example.com",
    img: "../myDashboard/images/member-1.jpg",
    date: "03/24/19",
    message: " commented on YourApp's SEO Tips",
    time: "4 hours ago"
  },
  {
    name: "Dale Byrd",
    mail: "dale.byrd52@example.com",
    img: "../myDashboard/images/member-2.jpg",
    date: "03/22/19",
    message: " like the post Facebook's Changes for 2019",
    time: "5 hours ago"
  },
  {
    name: "Dawn Wood",
    mail: "dawn.wood16@example.com",
    img: "../myDashboard/images/member-3.jpg",
    date: "03/22/19",
    message: " commented on Facebook's Changes for 2019",
    time: "1 day ago"
  },
  {
    name: "Dan Oliver",
    mail: "dan.oliver82@example.com",
    img: "../myDashboard/images/member-4.jpg",
    date: "03/19/19",
    message: " posted YourApp's SEO Tips",
    time: "3 days ago"
  }
];

for (let i = 0; i < members.length; i++) {
  // NEW MEMBERS
  // add member div for each member
  const parentDiv = document.getElementById("members");
  let memberDiv = document.createElement("div");
  memberDiv.setAttribute("class", "member");
  parentDiv.appendChild(memberDiv);
  // add members info to members div
  // add photo
  let memberImg = document.createElement("img");
  memberImg.setAttribute("src", members[i].img);
  memberDiv.appendChild(memberImg);
  // add div for name and email
  let nameMail = document.createElement("div");
  nameMail.setAttribute("class", "nameMail");
  memberDiv.appendChild(nameMail);
  // add name and mail
  let memberName = document.createElement("p");
  memberName.setAttribute("class", "name");
  memberName.textContent = members[i].name;
  nameMail.appendChild(memberName);
  let memberMail = document.createElement("p");
  memberMail.setAttribute("class", "email");
  memberMail.textContent = members[i].mail;
  nameMail.appendChild(memberMail);
  // date of inscription
  let date = document.createElement("div");
  date.setAttribute("class", "date");
  date.textContent = members[i].date;
  memberDiv.appendChild(date);

  // RECENT ACTIVITY
  // add activity div
  let actParentDiv = document.getElementById("recent");
  let actDiv = document.createElement("div");
  actDiv.setAttribute("class", "member");
  actParentDiv.appendChild(actDiv);
  // add posts to activity div
  // add photo
  let actImg = document.createElement("img");
  actImg.setAttribute("src", members[i].img);
  actDiv.appendChild(actImg);
  // add div for post and time
  let postDiv = document.createElement("div");
  postDiv.setAttribute("class", "nameMail");
  actDiv.appendChild(postDiv);
  // add name and mail
  let post = document.createElement("p");
  post.setAttribute("class", "name");
  post.textContent = members[i].name + members[i].message;
  postDiv.appendChild(post);
  let time = document.createElement("p");
  time.setAttribute("class", "time");
  time.textContent = members[i].time;
  postDiv.appendChild(time);
  // add arrow
  // let arrowDiv = document.createElement("div");
  // arrowDiv.setAttribute("class", "arrow");
  let arrow = document.createElement("button");
  arrow.setAttribute("class", "arrow");
  arrow.textContent = ">";
  // arrowDiv.appendChild(arrow);
  actDiv.appendChild(arrow);
}

// document.getElementById("members").innerHTML = members[0].img;
