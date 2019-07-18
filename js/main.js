// DOM Elements
const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  name = document.getElementById("name"),
  focus = document.getElementById("focus"),
  title = document.querySelector("title");

//DOM Weather App Elements
let weatherIcon = document.getElementById("skycon");
let weatherDegrees = document.getElementById("temperature-degrees");
let weatherType = document.getElementById("temperature-type");
let weatherSummary = document.getElementById("weather-summary");
let weatherLocation = document.getElementById("weather-location");

// Options
const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? "PM" : "AM";

  // 12hr Format
  hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ""}`;

  setTimeout(showTime, 1000);
}
// Add Zeros to time
function addZero(number) {
  return (parseInt(number, 10) < 10 ? "0" : "") + number;
}

// Set Background and Greeting
function setBackGroundGreeting() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage = "url('../img/morning.jpg')";
    greeting.textContent = "Good Morning,";
    title.textContent = "Good Morning!";

    //Weather Styling
    weatherDegrees.style.color = "white";
    weatherType.style.color = "white";
    weatherSummary.style.color = "white";
    weatherLocation.style.color = "white";
  } else if (hour < 17) {
    // Afternoon
    document.body.style.backgroundImage = "url('../img/afternoon.jpg')";
    greeting.textContent = "Good Afternoon,";
    title.textContent = "Good Afternoon!";
  } else if (hour < 19) {
    // Evening
    document.body.style.backgroundImage = "url('../img/evening.jpg')";
    greeting.textContent = "Good Evening,";
    title.textContent = "Good Evening!";

    document.body.style.color = "white";
  } else {
    // Night
    document.body.style.backgroundImage = "url('../img/night.jpg')";
    greeting.textContent = "Good Night,";
    title.textContent = "Good Night!";
    document.body.style.color = "white";
  }
}

// Get Name
function getName() {
  if (
    localStorage.getItem("name") === null ||
    localStorage.getItem("name") === ""
  ) {
    name.textContent = "[Enter Name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

// Set Name
function setName(event) {
  if (event.type === "keypress") {
    // Make sure enter is pressed
    if (event.which == 13 || event.keyCode == 13) {
      localStorage.setItem("name", event.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem("name", event.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (
    localStorage.getItem("focus") === null ||
    localStorage.getItem("focus") === ""
  ) {
    focus.textContent = "[Enter Focus]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

// Set Focus
function setFocus(event) {
  if (event.type === "keypress") {
    // Make sure enter is pressed
    if (event.which == 13 || event.keyCode == 13) {
      localStorage.setItem("focus", event.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem("focus", event.target.innerText);
  }
}

name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);

// Run
showTime();
setBackGroundGreeting();
getName();
getFocus();
