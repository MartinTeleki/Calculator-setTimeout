import { HistoryManager } from "./history.js";

export class LoginManager {
  constructor() {
    this._labels = document.querySelectorAll(".form-control-login label");
    this._loginButton = document.querySelector(".btn-login");
    this._nameInput = document.querySelector("#name");
    this._passwordInput = document.querySelector("#password");
    this._loginForm = document.querySelector(".form-control-login");
    this._containerCalculator = document.querySelector(".container-calculator");
    this._containerLogin = document.querySelector(".container-login");
    this._containerRegister = document.querySelector(".container-register");
    this._navLogin = document.querySelector(".nav-login");
    this._btnRegister = document.querySelector(".btn-register");
    this._registerName = document.querySelector("#register-name");
    this._registerPassword = document.querySelector("#register-password");
    this._btnLogout = document.querySelector(".btn--logout");
    this._historyContainer = document.querySelector(".history");
    this._welcomeText = document.querySelector(".welcome-message");
    this._showPasswordCheckbox = document.querySelector("#show-password-login");
    this._welcomeMessage = document.querySelector(".welcome-message");
    this._historyText = document.querySelector(".history-div");
    this._result = document.querySelector(".result");
    this._inputText = document.querySelector(".input--text-login");
    this._registerPasswordControl = document.querySelector(
      "#register-password-control"
    );
    this._clockContainer = document.querySelector(".container-clock");
    this._writeNumber = document.querySelector(".input--text-login");
    this._loginInfo = [];
    this._historyData = [];

    this._loadLoginInfoFromStorage();
    console.log(this._inputText);
    this._labels.forEach((label) => {
      label.innerHTML = label.textContent
        .split("")
        .map(
          (letter, index) =>
            `<span style="transition-delay:${index * 70}ms">${letter}</span>`
        )
        .join("");
    });
    console.log(this._historyData);
    this._containerLogin.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this._login.bind(this)();
      }
    });
    this._loginButton.addEventListener("click", this._login.bind(this));
    this._containerRegister.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this._register.bind(this)();
      }
    });
    this._btnRegister.addEventListener("click", this._register.bind(this));
    this._btnLogout.addEventListener("click", this._logout.bind(this));

    this._showPasswordCheckbox.addEventListener("change", () => {
      this._passwordInput.type = this._showPasswordCheckbox.checked
        ? "text"
        : "password";
    });

    this._historyManager = new HistoryManager(
      document.querySelector(".history-list")
    );
    console.log(this._historyManager);
  }

  _login() {
    const username = this._nameInput.value.toLowerCase();
    const password = this._passwordInput.value;
    const passwordControlData = this._registerPasswordControl.value;
    console.log(passwordControlData);

    const validLogin = this._loginInfo.some(
      (info) =>
        info.username === username &&
        info.password === password &&
        info.username !== "" &&
        info.password !== ""
    );

    this._animationDuration = 500;

    this._containerLogin.style.transition = `opacity ${this._animationDuration}ms`;
    this._containerRegister.style.transition = `opacity ${this._animationDuration}ms`;

    validLogin
      ? (() => {
          this._containerLogin.style.opacity = 0;

          setTimeout(() => {
            this._containerLogin.style.display = "none";
            this._containerRegister.style.display = "none";
            this._containerCalculator.style.display = "block";

            setTimeout(() => {
              this._containerCalculator.style.opacity = 1;
            }, 0);
          }, this._animationDuration);

          this._writeNumber.focus();
          this._welcomeMessage.style.display = "block";
          this._btnLogout.style.display = "block";
          this._welcomeText.innerHTML = `Welcome <br> ${username.toUpperCase()}`;
        })()
      : alert("Invalid username or password");
  }

  _register() {
    const usernameData = this._registerName.value.toLowerCase();
    const passwordData = this._registerPassword.value;
    const passwordControlData = this._registerPasswordControl.value;

    if (this._isUsernameTaken(usernameData)) {
      alert("This username is already taken.");
      return;
    }

    if (!usernameData || !passwordData || !passwordControlData) {
      alert("Please fill in all fields.");
      return;
    }

    if (
      usernameData.includes(" ") ||
      passwordData.includes(" ") ||
      (usernameData.includes(" ") && passwordData.includes(" "))
    ) {
      alert("No spaces allowed :).");
      return;
    }

    if (usernameData.length < 5 || usernameData.length > 12) {
      alert("Username must be between 5 and 12 characters.");
      return;
    }

    if (passwordData.length < 5 || passwordData.length > 12) {
      alert("Password must be between 5 and 12 characters.");
      return;
    }

    if (passwordData !== passwordControlData) {
      alert("Passwords do not match.");
      return;
    }

    const userData = { username: usernameData, password: passwordData };

    this._loginInfo.push(userData);

    this._animationDuration = 500;

    this._containerRegister.style.transition = `opacity ${this._animationDuration}ms`;
    this._containerLogin.style.transition = `opacity ${this._animationDuration}ms`;

    this._containerRegister.style.opacity = 0;

    setTimeout(() => {
      this._containerRegister.style.display = "none";
      this._containerCalculator.style.display = "none";
      this._historyContainer.style.display = "none";
      this._containerLogin.style.display = "block";
      this._clockContainer.style.display = "block";

      setTimeout(() => {
        this._containerLogin.style.opacity = 1;
      }, 0);
    }, this._animationDuration);

    this._registerName.value = "";
    this._registerPassword.value = "";
    this._registerPasswordControl.value = "";

    localStorage.setItem("loginInfo", JSON.stringify(this._loginInfo));
  }

  _loadLoginInfoFromStorage() {
    const storedLoginInfo = localStorage.getItem("loginInfo");

    if (storedLoginInfo) {
      this._loginInfo = JSON.parse(storedLoginInfo);
    }
  }

  _logout() {
    this._animationDuration = 500;

    this._containerCalculator.style.transition = `opacity ${this._animationDuration}ms`;
    this._historyContainer.style.transition = `opacity ${this._animationDuration}ms`;

    this._containerCalculator.style.opacity = 0;
    this._historyContainer.style.opacity = 0;

    setTimeout(() => {
      this._inputText.textContent = "";
      this._nameInput.value = "";
      this._passwordInput.value = "";
      this._welcomeText.textContent = "";
      this._result.textContent = "";
      this._containerRegister.style.display = "none";
      this._btnLogout.style.display = "none";

      this._containerLogin.style.opacity = 1;

      this._historyContainer.style.display = "none";

      this._containerLogin.style.display = "block";

      this._welcomeMessage.style.display = "none";
    }, this._animationDuration);
  }

  _isUsernameTaken(username) {
    return this._loginInfo.some((info) => info.username === username);
  }
}
