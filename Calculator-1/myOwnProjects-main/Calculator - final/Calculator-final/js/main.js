import { RegistrationManager } from "./register.js";
import { _applyLabelEffect } from "./labelEffect.js";
import { LoginManager } from "./login.js";
import { CalculatorEventManager } from "./eventListeners.js";
import { HistoryManager } from "./history.js";
import { CalculatorApp } from "./calculatorModule.js";
import { Hours } from "./hours.js"; // Přidejte tento import

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



