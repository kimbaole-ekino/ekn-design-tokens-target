const TOKEN_NAMES = [
  "--color-background",
  "--color-text",
  "--color-primary",
  "--color-surface",
  "--color-button-text",
];

const SCHEMES = [
  ["creative-black", "Creative / Black"],
  ["creative-white", "Creative / White"],
  ["cx-black", "CX / Black"],
  ["cx-white", "CX / White"],
  ["health-black", "Health / Black"],
  ["health-white", "Health / White"],
];

function updatePressedState(buttons, value) {
  buttons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.scheme === value));
  });
}

function updateInspector(source, inspector) {
  if (!source || !inspector) return;

  const styles = getComputedStyle(source);
  TOKEN_NAMES.forEach((name) => {
    const output = inspector.querySelector(`[data-token-value="${name}"]`);
    if (output) output.textContent = styles.getPropertyValue(name).trim() || "not emitted";
  });

  const scope = inspector.querySelector("[data-inspector-scope]");
  if (scope) {
    const scheme = source.dataset.colorScheme || document.documentElement.dataset.colorScheme || "none";
    scope.textContent = scheme;
  }
}

function initPageControls() {
  const buttons = Array.from(document.querySelectorAll("[data-page-scheme]"));
  if (!buttons.length) return;

  const inspector = document.querySelector("[data-token-inspector]");
  const apply = (value) => {
    document.documentElement.dataset.colorScheme = value;
    updatePressedState(buttons, value);
    updateInspector(document.documentElement, inspector);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => apply(button.dataset.scheme));
  });

  apply(document.documentElement.dataset.colorScheme || "creative-white");
}

function initBlockControls() {
  const inspector = document.querySelector("[data-token-inspector]");
  const hero = document.querySelector("[data-inspector-source]");

  document.querySelectorAll("[data-block-scheme-control]").forEach((control) => {
    const targetId = control.dataset.blockSchemeControl;
    const target = document.getElementById(targetId);
    if (!target) return;

    SCHEMES.forEach(([value, label]) => control.add(new Option(label, value)));

    control.value = target.dataset.colorScheme || "creative-white";
    control.addEventListener("change", () => {
      target.dataset.colorScheme = control.value;
      if (target === hero) updateInspector(hero, inspector);
    });
  });

  updateInspector(hero, inspector);
}

initPageControls();
initBlockControls();
