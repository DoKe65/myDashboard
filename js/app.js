//===========================================
// Closing Elements
//===========================================

function closeButton(element) {
  element.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
      const parent = e.target.parentNode;
      const gdParent = parent.parentNode;
      gdParent.removeChild(parent);
    }
    let noteButton = notesDiv.getElementsByTagName("BUTTON");
    if (noteButton.length === 0) {
      notesDiv.setAttribute("style", "display: none;");
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
  // let closeAll = document.createElement("li");
  // closeAll.textContent = "Close all notifications";
  // notesDiv.appendChild(closeAll);
  // let close = document.createElement("button");
  // close.classList.add("close");
  // close.textContent = "x";
  // closeAll.appendChild(close);
}

noteList();


// Show Notifications and hide Notificaton Badge

const badge = document.querySelector(".header__bell--badge");

// header.addEventListener('click', (e) => {
//   if (e.target.tagName === "svg") {
//     badge.setAttribute("style", "visibility: hidden;");
//     notesDiv.setAttribute("style", "display: block;");
//   }
// });

header.addEventListener('click', (e) => {
  if (e.target.tagName === "svg") {
    badge.setAttribute("style", "visibility: hidden;");
    if (notesDiv.style.display === "none") {

      notesDiv.setAttribute("style", "display: block;");
    } else {

      notesDiv.setAttribute("style", "display: none;");
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
