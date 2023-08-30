export class Hours {
    constructor() {
      this.hourElement = document.querySelector(".hour");
      this.minuteElement = document.querySelector(".minute");
      this.secondElement = document.querySelector(".second");
      this.timeElement = document.querySelector(".time");
      this.dateElement = document.querySelector(".date");
      this.toggleElement = document.querySelector(".toggle");
      this.htmlDocument = document;
      this.circleElement = document.querySelector(".circle");
      this.centerPoint = document.querySelector(".center-point");
      this.point1 = document.querySelector(".center-point1");
  
      this.days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      this.months = [
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
  
      this.toggleElement.addEventListener("click", () => {
        if (this.toggleElement.textContent === "Light mode") {
          this.applyLightMode();
        } else {
          this.applyDarkMode();
        }
      });
  
      this.setInitialMode();
      this.setIntervalForTimeUpdate();
    }
  
    setInitialMode() {
      const isDarkMode = localStorage.getItem("darkMode") === "true";
      if (isDarkMode) {
        this.applyDarkMode();
      } else {
        this.applyLightMode();
      }
    }
  
    applyDarkMode() {
      this.htmlDocument.body.style.backgroundColor = "#222";
      this.toggleElement.style.backgroundColor = "white";
      this.toggleElement.textContent = "Light mode";
      this.toggleElement.style.color = "black";
      this.timeElement.style.color = "white";
      this.hourElement.style.backgroundColor = "white";
      this.minuteElement.style.backgroundColor = "white";
      this.circleElement.style.backgroundColor = "white";
      this.centerPoint.style.backgroundColor = "#e74c3c";
      this.point1.style.backgroundColor = "var(--secondary-color)";
      this.dateElement.style.color = "white";
      localStorage.setItem("darkMode", "true");
    }
  
    applyLightMode() {
      this.htmlDocument.body.style.backgroundColor = "steelblue";
      this.toggleElement.style.backgroundColor = "black";
      this.toggleElement.textContent = "Dark mode";
      this.toggleElement.style.color = "white";
      this.timeElement.style.color = "black";
      this.hourElement.style.backgroundColor = "black";
      this.minuteElement.style.backgroundColor = "black";
      this.circleElement.style.backgroundColor = "black";
      this.point1.style.backgroundColor = "var(--primary-color)";
      this.timeElement.style.color = "white";
      this.timeElement.style.backgroundColor = "black";
      this.dateElement.style.color = "white";
      localStorage.setItem("darkMode", "false");
    }
  
    setTime() {
      const time = new Date();
      const month = time.getMonth();
      const day = time.getDay();
      const date = time.getDate();
      const hours = time.getHours();
      const hourForClock = hours % 12;
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();
      const afternoonEvening = hours >= 12 ? "PM" : "AM";
  
      this.hourElement.style.transform = `translate(-50%, -100%) rotate(${this.scale(
        hourForClock,
        0,
        11,
        0,
        360
      )}deg)`;
  
      this.minuteElement.style.transform = `translate(-50%, -100%) rotate(${this.scale(
        minutes,
        0,
        59,
        0,
        360
      )}deg)`;
  
      this.secondElement.style.transform = `translate(-50%, -100%) rotate(${this.scale(
        seconds,
        0,
        59,
        0,
        360
      )}deg)`;
  
      this.timeElement.innerHTML = `${hourForClock}:${
        minutes < 10 ? `0${minutes}` : minutes
      } ${afternoonEvening}`;
  
      if (this.toggleElement.textContent === "Light mode") {
        this.dateElement.innerHTML = `${this.days[day]}, ${this.months[month]} <span class="circle" style="background-color: white; color: black; transition: background-color 1.2s ease-in-out, color 1s ease-in-out;">${date}</span>`;
      } else {
        this.dateElement.innerHTML = `${this.days[day]}, ${this.months[month]} <span class="circle" style="background-color: black; color: white; transition: background-color 1.2s ease-in-out, color 1s ease-in-out;">${date}</span>`;
      }
    }
  
    scale(num, in_min, in_max, out_min, out_max) {
      return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    }
  
    setIntervalForTimeUpdate() {
      this.setTime();
      setInterval(() => {
        this.setTime();
      }, 1000);
    }
  }
  
  const hours = new Hours();
  