export class RegistrationManager {
  constructor() {
    this._container = document.querySelector(".container");
    this._container1 = document.querySelector(".container-1");
    this._container2 = document.querySelector(".container-2");
    this._navLogin = document.querySelector(".nav-login");
    this._navRegister = document.querySelector(".nav-register");
    this._labels2 = document.querySelectorAll(".form-control-2 label");
    this._registerName = document.querySelector("#register-name");
    this._registerPassword = document.querySelector("#register-password");
    this._btnRegister = document.querySelector(".btn-register");
    this._historyContainer = document.querySelector(".history");
    this._registrationInfo = [];

    this._showPasswordCheckbox = document.querySelector(
      "#show-password-register"
    );
    this._passwordInput = document.querySelector("#register-password");
    console.log(this._registrationInfo);

    this._navLogin.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("pes");


      setTimeout(()=> {
      this._historyContainer.style.display = "none";
      this._historyContainer.style.opacity = "0";

      this._container2.style.display = "none";
      this._container2.style.opacity = "0";
    }, 1000)


      setTimeout(() => {
      this._container1.style.display = "block";
      this._container1.style.opacity = "1";
      }, 1000)
    });

    this._navRegister.addEventListener("click", (e) => {
      e.preventDefault();
      
      setTimeout(() => {
      this._historyContainer.style.display = "none";
      this._historyContainer.style.opacity = "0";
      this._container.style.display = "none";
      this._container.style.opacity = "0";
      this._container1.style.display = "none";
      this._container1.style.opacity = "0";
      }, 1000)

      setTimeout(() => {
      this._container2.style.display = "block";
      this._container2.style.opacity = "1";

      },1000)
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
      console.log("pes");
      if (this._showPasswordCheckbox.checked) {
        this._passwordInput.type = "text";
      } else {
        this._passwordInput.type = "password";
      }
    });
  }
}
