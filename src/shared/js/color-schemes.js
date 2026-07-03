const root = document.documentElement;
const component = document.querySelector("[data-component-preview]");

function setActive(buttons, value) {
  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.schemeValue === value);
  });
}

document.querySelectorAll("[data-scheme-controls]").forEach((group) => {
  const mode = group.dataset.schemeControls;
  const buttons = Array.from(group.querySelectorAll("[data-scheme-value]"));

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.schemeValue;

      if (mode === "page") {
        root.dataset.colorScheme = value;
      }

      if (mode === "component" && component) {
        component.dataset.colorScheme = value;
      }

      setActive(buttons, value);
    });
  });
});
