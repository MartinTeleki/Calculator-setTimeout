
export class Hours {
    constructor() {
      this._hourElement = document.querySelector(".hour");
      this._minuteElement = document.querySelector(".minute");
      this._secondElement = document.querySelector(".second");
      this._timeElement = document.querySelector(".time");
      this._dateElement = document.querySelector(".date");
      this._toggleElement = document.querySelector(".toggle");
      this._htmlDocument = document;
      this._circleElement = document.querySelector(".circle");
      this._centerPoint = document.querySelector(".center-point");
      this._point1 = document.querySelector(".center-point1");
  
      this._days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      this._months = [
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
  
      this._toggleElement.addEventListener("click", () => {
        if (this._toggleElement.textContent === "Light mode") {
          this._applyLightMode();
        } else {
          this._applyDarkMode();
        }
      });
  
      this._setInitialMode();
      this._setIntervalForTimeUpdate();
    }
  
    _setInitialMode() {
      const isDarkMode = localStorage.getItem("darkMode") === "true";
      if (isDarkMode) {
        this._applyDarkMode();
      } else {
        this._applyLightMode();
      }
    }
  
    _applyDarkMode() {
      this._htmlDocument.body.style.backgroundColor = "#222";
      this._toggleElement.style.backgroundColor = "white";
      this._toggleElement.textContent = "Light mode";
      this._toggleElement.style.color = "black";
      this._timeElement.style.color = "white";
      this._hourElement.style.backgroundColor = "grey";
      this._minuteElement.style.backgroundColor = "grey";
      this._circleElement.style.backgroundColor = "white";
      this._centerPoint.style.backgroundColor = "#e74c3c";
      this._point1.style.backgroundColor = "var(--secondary-color)";
      this._dateElement.style.color = "white";
      localStorage.setItem("darkMode", "true");
    }
  
    _applyLightMode() {
      this._htmlDocument.body.style.backgroundColor = "steelblue";
      this._toggleElement.style.backgroundColor = "black";
      this._toggleElement.textContent = "Dark mode";
      this._toggleElement.style.color = "white";
      this._timeElement.style.color = "black";
      this._hourElement.style.backgroundColor = "black";
      this._minuteElement.style.backgroundColor = "black";
      this._circleElement.style.backgroundColor = "black";
      this._point1.style.backgroundColor = "var(--primary-color)";
      this._timeElement.style.color = "white";
      this._timeElement.style.backgroundColor = "black";
      this._dateElement.style.color = "white";
      localStorage.setItem("darkMode", "false");
    }
  
    _setTime() {
      const time = new Date();
      const month = time.getMonth();
      const day = time.getDay();
      const date = time.getDate();
      const hours = time.getHours();
      const hourForClock = hours % 12;
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();
      const afternoonEvening = hours >= 12 ? "PM" : "AM";
  
      this._hourElement.style.transform = `translate(-50%, -100%) rotate(${this._scale(
        hourForClock,
        0,
        11,
        0,
        360
      )}deg)`;
  
      this._minuteElement.style.transform = `translate(-50%, -100%) rotate(${this._scale(
        minutes,
        0,
        59,
        0,
        360
      )}deg)`;
  
      this._secondElement.style.transform = `translate(-50%, -100%) rotate(${this._scale(
        seconds,
        0,
        59,
        0,
        360
      )}deg)`;
  
      this._timeElement.innerHTML = `${hourForClock}:${
        minutes < 10 ? `0${minutes}` : minutes
      } ${afternoonEvening}`;
  
      if (this._toggleElement.textContent === "Light mode") {
        this._dateElement.innerHTML = `${this._days[day]}, ${this._months[month]} <span class="circle" style="background-color: white; color: black; transition: background-color 1.2s ease-in-out, color 1s ease-in-out;">${date}</span>`;
      } else {
        this._dateElement.innerHTML = `${this._days[day]}, ${this._months[month]} <span class="circle" style="background-color: black; color: white; transition: background-color 1.2s ease-in-out, color 1s ease-in-out;">${date}</span>`;
      }
    }
  
    _scale(num, in_min, in_max, out_min, out_max) {
      return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    }
  
    _setIntervalForTimeUpdate() {
      this._setTime();
      setInterval(() => {
        this._setTime();
      }, 1000);
    }
  }
  
  const hours = new Hours();
  