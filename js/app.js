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
    let box = notesDiv;
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
const members = [
  {
    name: "Victoria Chambers",
    mail: "victoria.chambers80@example.com",
    img: "images/member-1.jpg",
    date: "03/24/19",
    message: " commented on YourApp's SEO Tips",
    time: "4 hours ago"
  },
  {
    name: "Dale Byrd",
    mail: "dale.byrd52@example.com",
    img: "images/member-2.jpg",
    date: "03/22/19",
    message: " like the post Facebook's Changes for 2019",
    time: "5 hours ago"
  },
  {
    name: "Dawn Wood",
    mail: "dawn.wood16@example.com",
    img: "images/member-3.jpg",
    date: "03/22/19",
    message: " commented on Facebook's Changes for 2019",
    time: "1 day ago"
  },
  {
    name: "Dan Oliver",
    mail: "dan.oliver82@example.com",
    img: "images/member-4.jpg",
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
  let arrow = document.createElement("button");
  arrow.setAttribute("class", "arrow");
  arrow.textContent = ">";
  actDiv.appendChild(arrow);
}

// ======================
// Member Messaging
// ======================

// Search function

// gatter input
let search = document.querySelector("#main__messages--search");
search.setAttribute("autocomplete", "off");

let names = [];
for (let i = 0; i < members.length; i++) {
  names.push(members[i].name);
}

function suggestions(input, array) {
  let current;

  input.addEventListener("input", function(e) {
    let val = this.value;
    closeAll();
    if (!val) { return false;}
    current = -1;
    let itemsDiv = document.createElement("div");
    itemsDiv.setAttribute("id", this.id + "searchSuggestions--list");
    itemsDiv.setAttribute("class", "searchSuggestions");
    this.parentNode.appendChild(itemsDiv);
    for (let i = 0; i < array.length; i++) {
      let filter = array[i].toUpperCase();
      if (filter.includes(val.toUpperCase())) {
        let suggestionItem = document.createElement("div");
        suggestionItem.setAttribute("class", "searchSuggestions--items")
        suggestionItem.innerHTML += "<input value='" + array[i] + "'>";
        suggestionItem.addEventListener("click", function(e) {
          input.value = this.getElementsByTagName("input")[0].value;
          closeAll();
        });
        itemsDiv.appendChild(suggestionItem);
      }
    }
  });
  input.addEventListener("keydown", function(e) {
    let x = document.getElementById(this.id + "searchSuggestions--list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      current++;
      addActive(x);
    } else if (e.keyCode == 38) {
        current--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (current > -1) {
          if (x) x[current].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (current >= x.length) current = 0;
    if (current < 0) current = (x.length - 1);
    x[current].classList.add("active");
  }
  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("active");
    }
  }
  function closeAll(element) {

    let x = document.getElementsByClassName("searchSuggestions");
    for (let i = 0; i < x.length; i++) {
      if (element != x[i] && element != input) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAll(e.target);
  });
}

suggestions(document.getElementById("main__messages--search"), names);

//clear input fields when pressing send

const messageDiv = document.querySelector(".main__messages");
let searchField = document.querySelector("#main__messages--search");
let message = document.querySelector(".main__messages--message");

function clearInput(element) {
  element.addEventListener('click', (e) => {
    let name = searchField.value;
    let currentMessage = message.value;
    if (e.target.tagName === "BUTTON") {
      if (name === "") {
        alert("You have to enter a name.");
      } else if (currentMessage === "") {
        alert("You have to enter a message.");
      } else {
        searchField.value = "";
        message.value = "";
        alert("Message to " + name + " suggessfully sent!");
      }

      }
    });
}

clearInput(messageDiv);

// =================
// Settings
// =================

const emailCheck = document.getElementById("emailCheckbox");
const publicCheck = document.getElementById("publicCheckbox");
const timezone = document.getElementById("timezone");
const save = document.getElementById("saveSettings");
const reset = document.getElementById("resetSettings");

function supportsLocalStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
    } catch(e) {
      return false;
    }
  }

function saveSettings() {
  localStorage.setItem('emailCheck', emailCheck.checked);
  localStorage.setItem('publicCheck', publicCheck.checked);
  localStorage.setItem('timezone', timezone[timezone.selectedIndex].value);
}

function loadSettings() {
  let checkedEmail = JSON.parse(localStorage.getItem('emailCheck'));
  emailCheck.checked = checkedEmail;
  let checkedPublic = JSON.parse(localStorage.getItem('publicCheck'));
  publicCheck.checked = checkedPublic;
  let selectedTimezone = localStorage.getItem('timezone');
  timezone.value = selectedTimezone;
}

function resetSettings() {
  location.reload();
  localStorage.clear();
  localStorage.setItem('timezone', timezone.value = "Select your timezone");
}

save.addEventListener('click', (e) => {
  if(e.target.tagName === "BUTTON") {
    saveSettings();
  }
});

reset.addEventListener('click', (e) => {
  if(e.target.tagName === "BUTTON") {
    resetSettings();
  }
});

loadSettings();
