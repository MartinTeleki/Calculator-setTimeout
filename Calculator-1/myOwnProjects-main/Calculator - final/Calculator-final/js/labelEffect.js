export function _applyLabelEffect() {
  const labels = document.querySelectorAll(".form-control-login label");

  labels.forEach((label) => {
    label.innerHTML = label.textContent
      .split("")
      .map(
        (letter, index) =>
          `<span style="transition-delay:${index * 70}ms">${letter}</span>`
      )
      .join("");
  });
}
