export class LoginManager {
  constructor() {
    this._labels = document.querySelectorAll(".form-control-1 label");
    this._loginButton = document.querySelector(".btn-login");
    this._nameInput = document.querySelector("#name");
    this._passwordInput = document.querySelector("#password");
    this._loginForm = document.querySelector(".form-control-1");
    this._container = document.querySelector(".container");
    this._container1 = document.querySelector(".container-1");
    this._container2 = document.querySelector(".container-2");
    this._navLogin = document.querySelector(".nav-login");
    this._btnRegister = document.querySelector(".btn-register");
    this._registerName = document.querySelector("#register-name");
    this._registerPassword = document.querySelector("#register-password");
    this._inputText = document.querySelector(".input--text-1");
    this._btnLogout = document.querySelector(".btn--logout");
    this._historyContainer = document.querySelector(".history");
    this._welcomeText = document.querySelector(".welcome-message");
    this._showPasswordCheckbox = document.querySelector("#show-password-login");
    this._welcomeMessage = document.querySelector(".welcome-message");
    this._historyText = document.querySelector(".history-div");
    this._result = document.querySelector(".result");
    this.inputText = document.querySelector(".input-text");
    this._loginInfo = [];
    this._loadLoginInfoFromStorage();

    this._labels.forEach((label) => {
      label.innerHTML = label.textContent
        .split("")
        .map(
          (letter, index) =>
            `<span style="transition-delay:${index * 70}ms">${letter}</span>`
        )
        .join("");
    });

    this._loginButton.addEventListener("click", this._login.bind(this));
    this._btnRegister.addEventListener("click", this._register.bind(this));
    this._btnLogout.addEventListener("click", this._logout.bind(this));

    this._showPasswordCheckbox.addEventListener("change", () => {
      if (this._showPasswordCheckbox.checked) {
        this._passwordInput.type = "text";
      } else {
        this._passwordInput.type = "password";
      }
    });
  }

  _login(e) {
    e.preventDefault();
    const username = this._nameInput.value.toLowerCase();
    const password = this._passwordInput.value;
  
    const validLogin = this._loginInfo.some(
      (info) =>
        info.username === username &&
        info.password === password &&
        info.username !== "" &&
        info.password !== ""
    );
  
    this._animationDuration = 500;
  
    // Apply transition styles
    this._container1.style.transition = `opacity ${this._animationDuration}ms`;
    this._container2.style.transition = `opacity ${this._animationDuration}ms`;
  
    if (validLogin) {
      // Fade out the login container (container1)
      this._container1.style.opacity = 0;
  
      // After a delay, hide the login container and show the main container (container2)
      setTimeout(() => {
        this._container1.style.display = "none";
        this._container2.style.display = "none";
        this._container.style.display = "block"
  
        // Use a small delay before starting fade in to ensure the display block is applied
        setTimeout(() => {
          this._container.style.opacity = 1;
        }, 0);
      }, this._animationDuration);
  
      this._welcomeMessage.style.display = "block";
      this._btnLogout.style.display = "block";
      this._welcomeText.innerHTML = `Welcome <br> ${username.toUpperCase()}`;
    } else {
      alert("Invalid username or password");
    }
  }
  

  _register(e) {
    e.preventDefault();
  
    const usernameData = this._registerName.value.toLowerCase();
    const passwordData = this._registerPassword.value;
  
    if (this._isUsernameTaken(usernameData)) {
      alert("This username is already taken.");
      return;
    }
  
    const userData = { username: usernameData, password: passwordData };
  
    if (!usernameData || !passwordData) {
      alert("Please fill in both username and password.");
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
  
    this._loginInfo.push(userData);
  
    this._animationDuration = 500;
  
    // Apply transition styles
    this._container2.style.transition = `opacity ${this._animationDuration}ms`;
    this._container1.style.transition = `opacity ${this._animationDuration}ms`;
  
    // Fade out the registration container (container2)
    this._container2.style.opacity = 0;
  
    // After a delay, hide the registration container and show the login container (container1)
    setTimeout(() => {
      this._container2.style.display = "none";
      this._container.style.display = "none";
      this._historyContainer.style.display = "none";
      this._container1.style.display = "block";
  
      // Use a small delay before starting fade in to ensure the display block is applied
      setTimeout(() => {
        this._container1.style.opacity = 1;
      }, 0);
    }, this._animationDuration);
  
    this._registerName.value = "";
    this._registerPassword.value = "";
  
    localStorage.setItem("loginInfo", JSON.stringify(this._loginInfo));
  }
  

  _loadLoginInfoFromStorage() {
    const storedLoginInfo = localStorage.getItem("loginInfo");
    if (storedLoginInfo) {
      this._loginInfo = JSON.parse(storedLoginInfo);
    }
  }

  _logout() {

    this._container.style.transition = `opacity ${this._animationDuration}ms`;

    this._animationDuration = 500
    this._container.style.opacity = 0


    setTimeout(() => {
    this._inputText.textContent = "";
    this._nameInput.value = "";
    this._passwordInput.value = "";
    this._welcomeText.textContent = "";
    this._result.textContent = "";
    this._container2.style.display = "none";
    this._container.style.display = "none";
    this._btnLogout.style.display = "none";
    this._historyContainer.style.display = "none";
    this._container1.style.display = "block";
    this._container1.style.opacity = "1";
    this._welcomeMessage.style.display = "none";
    // this._historyText.style.display = "none";
    }, this._animationDuration)
  }

  _isUsernameTaken(username) {
    return this._loginInfo.some((info) => info.username === username);
  }
}
