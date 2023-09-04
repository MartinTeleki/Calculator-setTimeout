import { HistoryManager } from "./history.js";

export class CalculatorApp {
  constructor() {
    this._historyContainer = document.querySelector(".history");
    this._historyList = document.querySelector(".history-list");
    this._writeNumber = document.querySelector(".input--text-login");
    this._calculateResult = document.querySelector(".btn--result");
    this._displayResult = document.querySelector(".result");
    this._historyItems = this._historyList.querySelectorAll(".history-div");
    this._equals = document.querySelector(".btn--equals");
    this._inputText = document.querySelector(".input--text-login");
    this._backNumber = document.querySelector(".btn--back");
    this._deleteNumber = document.querySelector(".btn--delete");
    this._closeButton = document.querySelector(".btn--close");

    this._historyManager = new HistoryManager(this._historyList);

    this._buttons = [];
  }

  initialize() {
    this._setupEventListeners();
  }

  _setupEventListeners() {
    this._closeButton.addEventListener("click", () => {
      setTimeout(() => {
        this._historyContainer.style.opacity = 0;
        this._historyContainer.style.display = "none";
      }, 1000);
    });

    this._calculateResult.addEventListener("click", () => {
      this._historyManager._clearHistory();
      this._performanceCalculation();
      this._writeNumber.focus();
    });

    this._displayResult.addEventListener("keydown", (e) => {
      e.preventDefault();
      this._handleEnterKey(e);
    });

    this._backNumber.addEventListener("click", () => {
      this._handleBackNumber();
    });

    this._deleteNumber.addEventListener("click", () => {
      this._handleDeleteNumber();
    });

    this._historyItems.forEach((item) => {
      item.addEventListener("click", () => {
        const historyText = item.textContent;
        this._writeNumber.value = historyText;
        this._writeNumber.focus();
        this._updateEventListeners();
      });
    });

    this._equals.addEventListener("click", () => {
      this._historyContainer.style.display = "block";

      this._historyContainer.style.opacity = 0;

      setTimeout(() => {
        this._historyContainer.style.opacity = 1;
      }, 0);
      this._historyContainer.style.transition = "opacity 1s ease-in-out";
    });

    this._updateEventListeners();
  }

  _performanceCalculation() {
    try {
      const expression = this._writeNumber.value;
      if (expression.trim() === "") {
        return;
      }
      const vyhodnoť = new Function("return " + expression);
      const result = vyhodnoť();
      if (isNaN(result)) {
        throw new Error("Bad result");
      }
      const roundedResult = result.toFixed(2);
      this._displayResult.style.color = "black";
      this._displayResult.textContent = roundedResult;
      this._writeNumber.value = "";
      this._historyManager._appendToHistory(roundedResult);
      this._displayResult.textContent = "";
    } catch (error) {
      this._writeNumber.value = "";
      this._displayResult.style.color = "red";
      this._displayResult.textContent = "Error";
      console.log("Mistake in expression", error);
    }
  }

  _handleEnterKey(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this._performanceCalculation();
    }
  }

  _handleBackNumber() {
    this._writeNumber.value = this._writeNumber.value.slice(0, -1);
    this._writeNumber.focus();
  }

  _handleDeleteNumber() {
    this._writeNumber.value = "";
    this._writeNumber.focus();
  }

  _updateEventListeners() {
    this._buttons.forEach(({ element }) => {
      element.removeEventListener("click", this._buttonClickHandler);
    });
  }
}

const calculatorApp = new CalculatorApp();
