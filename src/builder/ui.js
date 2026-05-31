import { MENU_APP_ID } from "../platform.js";

export function createBuilderUi({ dom, getActiveApp, getActiveAppId }) {
  // Section: Builder UI state
  const state = {
    appId: null,
    messages: [],
    activity: [],
    busy: false,
  };
  let runAgent = async () => {};
  let mobileFocusGuardTimer = null;

  function setAgentRunner(runner) {
    runAgent = runner;
  }

  // Section: App switching lifecycle
  function handleAppLoaded(app) {
    dom.builderTitle.textContent = app.name;

    if (state.appId !== app.appId) {
      resetBuilderSession(app.appId);
    }
  }

  function resetBuilderSession(appId) {
    state.appId = appId;
    state.messages = [];
    state.busy = false;
    renderBuilderMessages();
  }

  // Section: Builder drawer controls
  function openBuilder({ focusInput = true } = {}) {
    const restoreMobileFocusGuard = focusInput ? null : disableBuilderInputForMobileOpen();
    dom.builderPanel.hidden = false;
    dom.hostShell.classList.add("builder-open");
    dom.toggleBuilderButton.hidden = true;
    dom.mobileBuilderToggle.hidden = getActiveAppId() === MENU_APP_ID;
    updateBuilderToggleLabel();
    if (focusInput) {
      dom.builderInput.focus();
    } else {
      preventMobileInputAutofocus(restoreMobileFocusGuard);
    }
  }

  function disableBuilderInputForMobileOpen() {
    window.clearTimeout(mobileFocusGuardTimer);
    const previousDisabled = dom.builderInput.disabled;
    const previousReadOnly = dom.builderInput.readOnly;
    const previousTabIndex = dom.builderInput.getAttribute("tabindex");

    dom.builderInput.disabled = true;
    dom.builderInput.readOnly = true;
    dom.builderInput.setAttribute("tabindex", "-1");

    return () => {
      dom.builderInput.disabled = state.busy || previousDisabled;
      dom.builderInput.readOnly = previousReadOnly;
      if (previousTabIndex === null) {
        dom.builderInput.removeAttribute("tabindex");
      } else {
        dom.builderInput.setAttribute("tabindex", previousTabIndex);
      }
    };
  }

  function preventMobileInputAutofocus(restoreMobileFocusGuard) {
    dom.builderInput.readOnly = true;
    focusBuilderPanel();

    requestAnimationFrame(() => {
      blurBuilderInput();
      focusBuilderPanel();
    });

    mobileFocusGuardTimer = window.setTimeout(() => {
      blurBuilderInput();
      focusBuilderPanel();
      restoreMobileFocusGuard?.();
    }, 360);
  }

  function blurBuilderInput() {
    if (document.activeElement === dom.builderInput) {
      dom.builderInput.blur();
    }
  }

  function focusBuilderPanel() {
    dom.builderPanel.focus({ preventScroll: true });
  }

  function closeBuilder() {
    dom.builderPanel.hidden = true;
    dom.hostShell.classList.remove("builder-open");
    dom.toggleBuilderButton.hidden = getActiveAppId() === MENU_APP_ID;
    dom.mobileBuilderToggle.hidden = getActiveAppId() === MENU_APP_ID;
    updateBuilderToggleLabel();
  }

  function toggleBuilder(options = {}) {
    if (dom.builderPanel.hidden) {
      openBuilder(options);
    } else {
      closeBuilder();
    }
  }

  function updateBuilderToggleLabel() {
    dom.toggleBuilderButton.textContent = "BuilderAI";
    dom.mobileBuilderToggle.textContent = dom.builderPanel.hidden ? "BuilderAI ↑" : "BuilderAI ↓";
  }

  // Section: Chat message rendering
  function addBuilderMessage(role, content, persist = false) {
    if (persist) {
      state.messages.push({ role, content });
    }

    const item = document.createElement("li");
    item.className = "builder-message";
    item.dataset.role = role;
    item.textContent = content;

    const progressItem = dom.builderMessages.querySelector(".builder-progress");
    if (progressItem) {
      dom.builderMessages.insertBefore(item, progressItem);
    } else {
      dom.builderMessages.append(item);
    }

    scrollBuilderMessages();
    return item;
  }

  function renderBuilderMessages() {
    dom.builderMessages.replaceChildren();

    const activeApp = getActiveApp();
    if (!activeApp) return;

    addBuilderMessage(
      "system",
      `Builder session for ${activeApp.name}. Chat history resets when you switch apps or reload.`,
    );

    for (const message of state.messages) {
      addBuilderMessage(message.role, message.content);
    }
  }

  // Section: Busy/progress display
  function setBuilderBusy(isBusy) {
    state.busy = isBusy;
    dom.builderSend.disabled = isBusy;
    dom.builderInput.disabled = isBusy;

    if (isBusy) {
      state.activity = [];
      updateBuilderActivity("Thinking...");
    } else {
      clearBuilderProgress();
    }
  }

  function scrollBuilderMessages() {
    dom.builderMessages.scrollTop = dom.builderMessages.scrollHeight;
  }

  function updateBuilderActivity(message) {
    if (!state.busy || !message) return;

    if (state.activity.at(-1) !== message) {
      state.activity.push(message);
    }

    renderBuilderProgress();
  }

  function renderBuilderProgress() {
    clearBuilderProgress(false);

    if (!state.busy) return;

    const item = document.createElement("li");
    item.className = "builder-progress";
    item.setAttribute("aria-live", "polite");

    const lines = document.createElement("div");
    lines.className = "builder-progress-lines";

    for (const message of state.activity.slice(-4)) {
      const line = document.createElement("p");
      line.textContent = message;
      lines.append(line);
    }

    const loader = document.createElement("div");
    loader.className = "builder-loader";
    loader.innerHTML = '<span></span><span></span><span></span><strong>Working</strong>';

    item.append(lines, loader);
    dom.builderMessages.append(item);
    scrollBuilderMessages();
  }

  function clearBuilderProgress(resetActivity = true) {
    for (const item of dom.builderMessages.querySelectorAll(".builder-progress")) {
      item.remove();
    }

    if (resetActivity) {
      state.activity = [];
    }
  }

  // Section: Builder form submission
  async function submitBuilderMessage(event) {
    event.preventDefault();
    const userMessage = dom.builderInput.value.trim();

    if (!userMessage || state.busy) return;

    dom.builderInput.value = "";
    addBuilderMessage("user", userMessage, true);
    setBuilderBusy(true);

    try {
      await runAgent();
    } catch (error) {
      console.error(error);
      addBuilderMessage("system", error?.message || "Builder request failed.");
    } finally {
      setBuilderBusy(false);
      dom.builderInput.focus();
    }
  }

  return {
    addBuilderMessage,
    closeBuilder,
    handleAppLoaded,
    openBuilder,
    scrollBuilderMessages,
    setAgentRunner,
    setBuilderBusy,
    state,
    submitBuilderMessage,
    toggleBuilder,
    updateBuilderActivity,
    updateBuilderToggleLabel,
  };
}
