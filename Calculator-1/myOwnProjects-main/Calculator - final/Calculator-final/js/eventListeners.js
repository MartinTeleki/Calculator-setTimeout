export class CalculatorEventManager {
  constructor(historyManager, writeNumber, displayResult) {
    this._historyManager = historyManager;
    this._writeNumber = writeNumber;
    this._displayResult = displayResult;

    this._historyContainer = document.querySelector(".history");
    this._containerCalculator = document.querySelector(".container-calculator");
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

    this._buttons = [
      { element: document.querySelector(".btn--plus"), symbol: "+" },
      { element: document.querySelector(".btn--minus"), symbol: "-" },
      { element: document.querySelector(".btn--times"), symbol: "*" },
      { element: document.querySelector(".btn--divided"), symbol: "/" },
      { element: document.querySelector(".btn--openBracket"), symbol: "(" },
      { element: document.querySelector(".btn--closeBracket"), symbol: ")" },
      { element: document.querySelector(".btn--percent"), symbol: "%" },
      { element: document.querySelector(".btn--dot"), symbol: "." },
      { element: document.querySelector(".btn--equals"), symbol: "=" },
      { element: document.querySelector(".btn--zero"), symbol: "0" },
      { element: document.querySelector(".btn--one"), symbol: "1" },
      { element: document.querySelector(".btn--two"), symbol: "2" },
      { element: document.querySelector(".btn--three"), symbol: "3" },
      { element: document.querySelector(".btn--four"), symbol: "4" },
      { element: document.querySelector(".btn--five"), symbol: "5" },
      { element: document.querySelector(".btn--six"), symbol: "6" },
      { element: document.querySelector(".btn--seven"), symbol: "7" },
      { element: document.querySelector(".btn--eight"), symbol: "8" },
      { element: document.querySelector(".btn--nine"), symbol: "9" },
    ];
  }

  _attachEventListeners() {
    this._buttons.forEach(({ element, symbol }) => {
      element.addEventListener("click", () => {
        symbol === "="
          ? this._performCalculation()
          : this._appendSymbol(symbol);
      });
    });

    this._containerCalculator.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this._performCalculation();
      }
    });
  }

  _appendSymbol(symbol) {
    this._writeNumber.value += symbol;
    this._writeNumber.focus();
  }

  _performCalculation() {
    try {
      let expression = this._writeNumber.value;
      expression = expression.replace(/([0-9.]+)%/g, "($1*0.01)");

      const result = eval(expression);
      const roundedResult = result.toFixed(2);
      this._displayResult.style.color = "black";
      this._displayResult.textContent = roundedResult;
      this._writeNumber.value = "";
      this._historyManager._appendToHistory(roundedResult);
    } catch (error) {
      this._writeNumber.value = "";
      this._displayResult.style.color = "red";
      this._displayResult.textContent = "Error";
      //console.log("Chyba při vyhodnocování výrazu:", error);
    }
  }
}
