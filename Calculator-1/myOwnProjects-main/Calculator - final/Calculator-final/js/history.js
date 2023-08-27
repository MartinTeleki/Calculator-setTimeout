export class HistoryManager {
  constructor(historyListElement, maxResults = 50) {
    this._historyList = historyListElement;
    this._maxResults = maxResults;
    this._previousResults = [];
    this._resultCounter = 0;
  }

  _appendToHistory(result) {
    const writeNumber = document.querySelector(".input--text-1");
    const historyContainer = document.querySelector(".history");
    this._resultNumberElement = document.querySelector(".result-number");

    if (this._previousResults.length >= this._maxResults) {
      return;
    }

    this._previousResults.push(result);

    this._firstDisplay = true;
    const listItem = document.createElement("div");
    const resultNumber = this._previousResults.length;
    listItem.classList.add("history-div");

    listItem.textContent = `${resultNumber}. result: ${result}`;
    listItem.addEventListener("click", () => {
      writeNumber.value += result;
      writeNumber.focus();
    });

    setTimeout(() => {
    historyContainer.style.opacity = 1;
    historyContainer.style.display = "block";
    }, 1000)

    this._historyList.appendChild(listItem);

    this._delay = this._firstDisplay ? 700 : 350;
    this._firstDisplay = false;

    setTimeout(() => {
      listItem.style.opacity = 1;
    }, this._delay);
  }

  _clearHistory() {
    this._previousResults.splice(0, this._previousResults.length);
    this._historyList.textContent = "";
  }
}
