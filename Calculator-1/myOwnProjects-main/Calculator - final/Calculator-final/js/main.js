import { RegistrationManager } from "./register.js";
import { _applyLabelEffect } from "./labelEffect.js";
import { LoginManager } from "./login.js";
import { CalculatorEventManager } from "./eventListeners.js";
import { HistoryManager } from "./history.js";
import { CalculatorApp } from "./calculatorModule.js";

document.addEventListener("DOMContentLoaded", () => {
  const historyList = document.querySelector(".history-list");

  const writeNumber = document.querySelector(".input--text-1");
  const displayResult = document.querySelector(".result");

  const calculatorApp = new CalculatorApp();
  const loginManager = new LoginManager();
  const registrationManager = new RegistrationManager();
  const historyManager = new HistoryManager(historyList);
  const calculatorEventManager = new CalculatorEventManager(
    historyManager,
    writeNumber,
    displayResult
  );

  calculatorEventManager._attachEventListeners(
    historyManager,
    writeNumber,
    displayResult
  );

  _applyLabelEffect();
  calculatorApp.initialize();
});

const hourElement = document.querySelector(".hour");
const minuteElement = document.querySelector(".minute");
const secondElement = document.querySelector(".second");
const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const toggleElement = document.querySelector(".toggle");
const htmlDocument = document;
const circleElement = document.querySelector(".circle");
const centerPoint = document.querySelector(".center-point");
const point1 = document.querySelector(".center-point1");
console.log(point1);

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

toggleElement.addEventListener("click", () => {
  if (toggleElement.textContent === "Light mode") {
    applyLightMode();
  } else {
    applyDarkMode();
  }
});



const applyDarkMode = () => {
  htmlDocument.body.style.backgroundColor = "#222";
  toggleElement.style.backgroundColor = "white";
  toggleElement.textContent = "Light mode";
  toggleElement.style.color = "black";
  timeElement.style.color = "white";
  hourElement.style.backgroundColor = "white";
  minuteElement.style.backgroundColor = "white";
  circleElement.style.backgroundColor = "white";
  centerPoint.style.backgroundColor = "#e74c3c";
  point1.style.backgroundColor = "var(--secondary-color)";
  dateElement.style.color = "white"
};

const applyLightMode = () => {
  htmlDocument.body.style.backgroundColor = "steelblue";
  toggleElement.style.backgroundColor = "black";
  toggleElement.textContent = "Dark mode";
  toggleElement.style.color = "white";
  timeElement.style.color = "black";
  hourElement.style.backgroundColor = "black";
  minuteElement.style.backgroundColor = "black";
  circleElement.style.backgroundColor = "black";
  point1.style.backgroundColor = "var(--primary-color)";
  timeElement.style.color = "white"
  timeElement.style.backgroundColor = "black"
  //dateElement.style.color = "white"
};

const setTime = () => {
  const time = new Date();
  // console.log(time);
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours();
  const hourForClock = hours % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  // console.log(month, day, date, hours, minutes, seconds);
  const afternoonEvening = hours >= 12 ? "AM" : "PM";

  hourElement.style.transform = `translate(-50%, -100%) rotate(${scale(
    hourForClock,
    0,
    11,
    0,
    360
  )}deg)`;

  minuteElement.style.transform = `translate(-50%, -100%) rotate(${scale(
    minutes,
    0,
    59,
    0,
    360
  )}deg)`;
  secondElement.style.transform = `translate(-50%, -100%) rotate(${scale(
    seconds,
    0,
    59,
    0,
    360
  )}deg)`;

  timeElement.innerHTML = `${hourForClock}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${afternoonEvening}`;
  if (toggleElement.textContent === "Light mode") {
    dateElement.innerHTML = `${days[day]}, ${months[month]} <span class="circle" style="background-color: white; color: black; transition: background-color 1.2s ease-in-out, color 1s ease-in-out;">${date}</span>`;
  } else {
    dateElement.innerHTML = `${days[day]}, ${months[month]} <span class="circle" style="background-color: black; color: white; transition: background-color 1.2s ease-in-out, color 1s ease-in-out;">${date}</span>`;
  }
};

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

setTime();

setInterval(setTime, 1000);
