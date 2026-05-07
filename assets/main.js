(function () {
  const cfg = window.NEZUMI_CONFIG || {};
  let countdownTimer = null;
  let typingTimers = [];

  function pad(n) {
    return String(Math.max(0, n)).padStart(2, "0");
  }

  function parseTarget(str) {
    if (!str) return null;
    const iso = str.replace(" ", "T");
    const d = new Date(iso);
    return isNaN(d.getTime()) ? null : d;
  }

  function formatTargetDisplay(d, lang) {
    const y = d.getFullYear();
    const m = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hh = pad(d.getHours());
    const mm = pad(d.getMinutes());
    if (lang === "ja") return `${y}年${m}月${day}日 ${hh}:${mm}`;
    return `${y}-${m}-${day} ${hh}:${mm}`;
  }

  function setSegments(d, h, m, s) {
    const ids = [
      ["seg-days", d],
      ["seg-hrs", h],
      ["seg-min", m],
      ["seg-sec", s],
    ];
    ids.forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    });
  }

  function renderCountdown() {
    const target = parseTarget(cfg.nextMeeting);
    const targetEl = document.getElementById("target-date");
    const completeEl = document.getElementById("complete-banner");
    const ddayLabel = document.getElementById("dday-label");
    const lang = window.NezumiI18n ? window.NezumiI18n.getLang() : "ja";

    if (!target) {
      setSegments("--", "--", "--", "--");
      if (targetEl) {
        targetEl.textContent = window.NezumiI18n
          ? window.NezumiI18n.t("home.target.classified")
          : "CLASSIFIED";
      }
      if (completeEl) completeEl.classList.add("hidden");
      if (ddayLabel) {
        ddayLabel.textContent = window.NezumiI18n
          ? window.NezumiI18n.t("home.tbd")
          : "DATE CLASSIFIED";
      }
      return;
    }

    if (targetEl) targetEl.textContent = formatTargetDisplay(target, lang);

    const tick = () => {
      const now = new Date();
      let diff = Math.floor((target.getTime() - now.getTime()) / 1000);
      if (diff <= 0) {
        const past = Math.abs(diff);
        const days = Math.floor(past / 86400);
        setSegments(pad(days), "00", "00", "00");
        if (completeEl) completeEl.classList.remove("hidden");
        if (ddayLabel) {
          ddayLabel.textContent = days === 0 ? "D-DAY" : `D+${days}`;
        }
        return;
      }
      const days = Math.floor(diff / 86400);
      diff -= days * 86400;
      const hrs = Math.floor(diff / 3600);
      diff -= hrs * 3600;
      const min = Math.floor(diff / 60);
      const sec = diff - min * 60;
      setSegments(pad(days), pad(hrs), pad(min), pad(sec));
      if (completeEl) completeEl.classList.add("hidden");
      if (ddayLabel) ddayLabel.textContent = `D-${days}`;
    };

    tick();
    if (countdownTimer) clearInterval(countdownTimer);
    countdownTimer = setInterval(tick, 1000);
  }

  function clearTyping() {
    typingTimers.forEach((id) => clearTimeout(id));
    typingTimers = [];
  }

  function runTyping() {
    clearTyping();
    document.querySelectorAll("[data-typing]").forEach((el) => {
      const full = el.textContent;
      el.textContent = "";
      el.classList.add("typing");
      const total = Math.min(full.length, 80);
      const stepMs = total > 0 ? Math.max(20, Math.floor(600 / total)) : 0;
      [...full].forEach((ch, i) => {
        const id = setTimeout(() => {
          el.textContent += ch;
          if (i === full.length - 1) el.classList.remove("typing");
        }, i * stepMs);
        typingTimers.push(id);
      });
    });
  }

  function setOperationCode() {
    const el = document.getElementById("operation-code");
    if (el) el.textContent = cfg.operationCode || "OP-NEZUMI";
  }

  function setupTickerDuplicate() {
    document.querySelectorAll(".ticker-track").forEach((track) => {
      const orig = track.querySelector(".ticker-text");
      if (!orig) return;
      const clone = orig.cloneNode(true);
      clone.removeAttribute("data-i18n");
      clone.setAttribute("aria-hidden", "true");
      clone.dataset.tickerClone = "1";
      track.appendChild(clone);
      const sync = () => {
        const src = track.querySelector('.ticker-text:not([data-ticker-clone])');
        const dst = track.querySelector('[data-ticker-clone]');
        if (src && dst) dst.textContent = src.textContent;
      };
      document.addEventListener("nezumi:langchange", sync);
    });
  }

  function start() {
    if (window.NezumiI18n) window.NezumiI18n.init();
    setOperationCode();
    renderCountdown();
    runTyping();
    setupTickerDuplicate();

    document.addEventListener("nezumi:langchange", () => {
      renderCountdown();
      runTyping();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (window.NezumiAuth) {
      window.NezumiAuth.init();
      if (window.NezumiI18n) window.NezumiI18n.init();
      if (window.NezumiAuth.isUnlocked()) {
        start();
      } else {
        document.addEventListener("nezumi:unlocked", start, { once: true });
      }
    } else {
      start();
    }
  });
})();
