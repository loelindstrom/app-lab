import alpineRuntime from "alpinejs/dist/cdn.js?raw";

const ALPINE_AUTO_START = `  window.Alpine = src_default;
  queueMicrotask(() => {
    src_default.start();
  });`;
const ALPINE_RUNTIME = alpineRuntime.replace(ALPINE_AUTO_START, "  window.Alpine = src_default;");

if (ALPINE_RUNTIME === alpineRuntime) {
  throw new Error("Could not remove Alpine auto-start from sandbox runtime.");
}

export type SandboxRuntimeMode = "alpine" | "vanilla";

export interface SandboxDocumentOptions {
  runtimeMode?: SandboxRuntimeMode;
}

function appCspForRuntime(runtimeMode: SandboxRuntimeMode): string {
  const scriptSrc = runtimeMode === "alpine" ? "script-src 'unsafe-inline' 'unsafe-eval'" : "script-src 'unsafe-inline'";
  return [
    "default-src 'none'",
    scriptSrc,
    "style-src 'unsafe-inline'",
    "img-src data: blob:",
    "font-src data:",
    "connect-src 'none'",
    "media-src data: blob:",
    "object-src 'none'",
    "frame-src 'none'",
    "worker-src 'none'",
    "form-action 'none'",
    "base-uri 'none'",
  ].join("; ");
}

export function prepareSandboxDocument(
  sourceCode: string,
  capability: string,
  compiledCss?: string,
  options: SandboxDocumentOptions = {},
): string {
  const runtimeMode = options.runtimeMode ?? "alpine";
  const document = new DOMParser().parseFromString(sourceCode, "text/html");

  for (const meta of document.querySelectorAll("meta[http-equiv]")) {
    if (meta.getAttribute("http-equiv")?.toLowerCase() === "content-security-policy") {
      meta.remove();
    }
  }

  const csp = document.createElement("meta");
  csp.setAttribute("http-equiv", "Content-Security-Policy");
  csp.setAttribute("content", appCspForRuntime(runtimeMode));

  const compiledStyle = document.createElement("style");
  compiledStyle.dataset.appLabRuntime = "compiled-css";
  compiledStyle.textContent = compiledCss ?? "";

  const capabilityScript = document.createElement("script");
  capabilityScript.textContent = `Object.defineProperty(window, "__APP_LAB_CAPABILITY__", {
  value: ${JSON.stringify(capability)},
  configurable: false,
  enumerable: false,
  writable: false
});`;

  const appLabScript = document.createElement("script");
  appLabScript.textContent = `(function () {
  const appLabCapability = window.__APP_LAB_CAPABILITY__;
  const pending = new Map();
  const errorHandlers = new Set();
  const dataChangeHandlers = new Set();
  const originalConsole = {
    debug: console.debug.bind(console),
    error: console.error.bind(console),
    info: console.info.bind(console),
    log: console.log.bind(console),
    warn: console.warn.bind(console)
  };

  function createRequestId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return "req-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function notifyError(error) {
    const message = error instanceof Error ? error.message : String(error);
    for (const handler of errorHandlers) {
      try {
        handler(message, error);
      } catch (_) {}
    }
  }

  function formatConsoleArg(value) {
    if (value instanceof Error) {
      return value.stack || value.message;
    }
    if (typeof value === "string") {
      return value;
    }
    try {
      const json = JSON.stringify(value);
      return json === undefined ? String(value) : json;
    } catch (_) {
      return String(value);
    }
  }

  function postConsole(level, args) {
    window.parent.postMessage({
      type: "APP_LAB_CONSOLE",
      appLabCapability,
      payload: {
        level,
        args: Array.from(args).map(formatConsoleArg),
        timestamp: new Date().toISOString()
      }
    }, "*");
  }

  for (const level of ["debug", "error", "info", "log", "warn"]) {
    console[level] = function () {
      originalConsole[level](...arguments);
      postConsole(level, arguments);
    };
  }

  function request(type, payload) {
    return new Promise((resolve, reject) => {
      const requestId = createRequestId();
      pending.set(requestId, { type, resolve, reject });
      try {
        window.parent.postMessage({ type, requestId, appLabCapability, payload: payload || {} }, "*");
      } catch (error) {
        pending.delete(requestId);
        reject(error);
        notifyError(error);
      }
    });
  }

  function toJsonValue(value) {
    if (value === undefined) return null;
    const json = JSON.stringify(value);
    if (json === undefined) return null;
    return JSON.parse(json);
  }

  window.addEventListener("message", (event) => {
    const message = event.data;
    if (!message || typeof message !== "object") return;

    if (message.type === "APP_LAB_DATA_CHANGED") {
      const data = message.payload ? message.payload.data : null;
      const info = message.payload ? message.payload.info || {} : {};
      for (const handler of dataChangeHandlers) {
        try {
          handler(data, info);
        } catch (error) {
          console.error(error);
          notifyError(error);
        }
      }
    }

    const pendingRequest = pending.get(message.requestId);
    if (!pendingRequest) return;

    if (message.type === "MY_DATA" && pendingRequest.type === "GET_MY_DATA") {
      pending.delete(message.requestId);
      pendingRequest.resolve(message.payload ? message.payload.data : null);
      return;
    }

    if (message.type === "MY_DATA_SAVED" && pendingRequest.type === "SAVE_MY_DATA") {
      pending.delete(message.requestId);
      pendingRequest.resolve(true);
      return;
    }

    if (message.type === "MY_DATA_SAVE_FAILED" && pendingRequest.type === "SAVE_MY_DATA") {
      pending.delete(message.requestId);
      const error = new Error((message.payload && message.payload.error) || "Could not save app data.");
      pendingRequest.reject(error);
      notifyError(error);
    }
  });

  window.addEventListener("error", (event) => {
    postConsole("error", [event.error || event.message]);
    notifyError(event.error || event.message);
  });
  window.addEventListener("unhandledrejection", (event) => {
    postConsole("error", [event.reason]);
    notifyError(event.reason);
  });

  Object.defineProperty(window, "AppLab", {
    value: Object.freeze({
      getData: function (fallback) {
        return request("GET_MY_DATA").then((data) => data == null && arguments.length ? fallback : data);
      },
      saveData: function (data) {
        try {
          return request("SAVE_MY_DATA", { data: toJsonValue(data) });
        } catch (error) {
          notifyError(error);
          return Promise.reject(error);
        }
      },
      onDataChange: function (handler) {
        if (typeof handler !== "function") return function () {};
        dataChangeHandlers.add(handler);
        window.parent.postMessage({
          type: "APP_LAB_DATA_HANDLER_STATUS",
          appLabCapability,
          payload: { registered: dataChangeHandlers.size > 0 }
        }, "*");
        return function () {
          dataChangeHandlers.delete(handler);
          window.parent.postMessage({
            type: "APP_LAB_DATA_HANDLER_STATUS",
            appLabCapability,
            payload: { registered: dataChangeHandlers.size > 0 }
          }, "*");
        };
      },
      onError: function (handler) {
        if (typeof handler !== "function") return function () {};
        errorHandlers.add(handler);
        return function () {
          errorHandlers.delete(handler);
        };
      }
    }),
    configurable: false,
    enumerable: false,
    writable: false
  });
})();`;

  const runtimeScripts: HTMLScriptElement[] = [];

  if (runtimeMode === "alpine") {
    const alpineScript = document.createElement("script");
    alpineScript.dataset.appLabRuntime = "alpine";
    alpineScript.textContent = ALPINE_RUNTIME;
    runtimeScripts.push(alpineScript);
  }

  const unloadScript = document.createElement("script");
  unloadScript.textContent = `(function () {
  const appLabCapability = window.__APP_LAB_CAPABILITY__;
  function notifyHost() {
    window.parent.postMessage({ type: "APP_LAB_UNLOADING", appLabCapability }, "*");
  }
  window.addEventListener("pagehide", notifyHost);
  window.addEventListener("beforeunload", notifyHost);
})();`;

  const alpineStartScript = document.createElement("script");
  alpineStartScript.dataset.appLabRuntime = "alpine-start";
  alpineStartScript.textContent = `queueMicrotask(() => {
  if (window.Alpine && !window.__APP_LAB_ALPINE_STARTED__) {
    Object.defineProperty(window, "__APP_LAB_ALPINE_STARTED__", {
      value: true,
      configurable: false,
      enumerable: false,
      writable: false
    });
    window.Alpine.start();
  }
});`;

  const headScripts = compiledCss
    ? [csp, compiledStyle, capabilityScript, appLabScript, ...runtimeScripts, unloadScript]
    : [csp, capabilityScript, appLabScript, ...runtimeScripts, unloadScript];
  document.head.prepend(...headScripts);
  if (runtimeMode === "alpine") {
    document.body.append(alpineStartScript);
  }
  return `<!doctype html>\n${document.documentElement.outerHTML}`;
}
