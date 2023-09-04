export class RegistrationManager {
  constructor() {
    this._containerCalculator = document.querySelector(".container-calculator");
    this._containerLogin = document.querySelector(".container-login");
    this._containerRegister = document.querySelector(".container-register");
    this._navLogin = document.querySelector(".nav-login");
    this._navRegister = document.querySelector(".nav-register");
    this._labels2 = document.querySelectorAll(".form-control-register label");
    this._registerName = document.querySelector("#register-name");
    this._registerPassword = document.querySelector("#register-password");
    this._btnRegister = document.querySelector(".btn-register");
    this._historyContainer = document.querySelector(".history");
    this._clockContainer = document.querySelector(".container-clock")
    this._registrationInfo = [];

    this._showPasswordCheckbox = document.querySelector(
      "#show-password-register"
    );
    this._showPasswordCheckboxControl = document.querySelector(
      "#show-password-register-control"
    );
    this._passwordInput = document.querySelector("#register-password");
    this._registerPasswordControl = document.querySelector("#register-password-control");


    
    this._animationDuration = 500;

    this._navLogin.addEventListener("click", (e) => {
      e.preventDefault();
      this._historyContainer.style.transition = `opacity ${this._animationDuration}ms`;
      this._containerRegister.style.transition = `opacity ${this._animationDuration}ms`;
      this._containerLogin.style.transition = `opacity ${this._animationDuration}ms`;

      
      this._historyContainer.style.opacity = 0;
      this._containerRegister.style.opacity = 0;

      setTimeout(() => {
        this._historyContainer.style.display = "none";
        this._containerRegister.style.display = "none";
        this._containerLogin.style.display = "block";
        this._clockContainer.style.display = "block"

        
        setTimeout(() => {
          this._containerLogin.style.opacity = 1;
        }, 0);
      }, this._animationDuration);
    });

    this._navRegister.addEventListener("click", (e) => {
      e.preventDefault();
      this._historyContainer.style.transition = `opacity ${this._animationDuration}ms`;
      this._containerCalculator.style.transition = `opacity ${this._animationDuration}ms`;
      this._containerLogin.style.transition = `opacity ${this._animationDuration}ms`;
      this._containerRegister.style.transition = `opacity ${this._animationDuration}ms`;


      this._historyContainer.style.opacity = 0;
      this._containerCalculator.style.opacity = 0;
      this._containerLogin.style.opacity = 0;

      setTimeout(() => {
        this._historyContainer.style.display = "none";
        this._containerCalculator.style.display = "none";
        this._containerLogin.style.display = "none";
        this._containerRegister.style.display = "block";
        this._clockContainer.style.display = "none"
        

      
        setTimeout(() => {
          this._containerRegister.style.opacity = 1;
        }, 0);
      }, this._animationDuration);
    });

    this._labels2.forEach((label) => {
      label.innerHTML = label.textContent
        .split("")
        .map(
          (letter, index) =>
            `<span style="transition-delay:${index * 70}ms">${letter}</span>`
        )
        .join("");
    });

    
    this._showPasswordCheckbox.addEventListener("change", () => {
      
      this._showPasswordCheckbox.checked === this._passwordInput.type ? "text" : "password"
    });

    this._showPasswordCheckboxControl.addEventListener("change", () => {

      this._showPasswordCheckboxControl.checked === this._registerPasswordControl.type ? "text"  : "password"
    });
  }
}
