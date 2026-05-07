(function () {
  const STORAGE_KEY = "nezumi.unlocked";
  // btoa("nezunezunezunezu")
  const HASH = "bmV6dW5lenVuZXp1bmV6dQ==";

  function isUnlocked() {
    return localStorage.getItem(STORAGE_KEY) === "1";
  }

  function unlock() {
    localStorage.setItem(STORAGE_KEY, "1");
  }

  function check(input) {
    try {
      return btoa(input) === HASH;
    } catch (_) {
      return false;
    }
  }

  function init() {
    const gate = document.getElementById("auth-gate");
    const stage = document.getElementById("stage");
    if (!gate || !stage) return;

    if (isUnlocked()) {
      gate.remove();
      stage.removeAttribute("aria-hidden");
      stage.classList.add("revealed");
      document.dispatchEvent(new CustomEvent("nezumi:unlocked"));
      return;
    }

    const input = gate.querySelector("[data-auth-input]");
    const form = gate.querySelector("[data-auth-form]");
    const status = gate.querySelector("[data-auth-status]");

    function deny() {
      gate.classList.remove("granted");
      gate.classList.add("denied");
      if (status) {
        status.textContent = window.NezumiI18n
          ? window.NezumiI18n.t("auth.denied")
          : "ACCESS DENIED";
        status.classList.remove("ok");
        status.classList.add("err");
      }
      input.value = "";
      setTimeout(() => gate.classList.remove("denied"), 600);
    }

    function grant() {
      unlock();
      if (status) {
        status.textContent = window.NezumiI18n
          ? window.NezumiI18n.t("auth.granted")
          : "ACCESS GRANTED";
        status.classList.remove("err");
        status.classList.add("ok");
      }
      gate.classList.add("granted");
      setTimeout(() => {
        gate.classList.add("hidden");
        setTimeout(() => {
          gate.remove();
          stage.removeAttribute("aria-hidden");
          stage.classList.add("revealed");
          document.dispatchEvent(new CustomEvent("nezumi:unlocked"));
        }, 350);
      }, 500);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (check(input.value.trim())) grant();
      else deny();
    });

    setTimeout(() => input && input.focus(), 50);
  }

  window.NezumiAuth = { init, isUnlocked };
})();
