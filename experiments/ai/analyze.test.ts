import { describe, expect, it } from "vitest";
import { analyzeGeneratedApp } from "./analyze";

describe("AI experiment generated-app analysis", () => {
  it("detects required behavior and App Lab compatibility problems", () => {
    const analysis = analyzeGeneratedApp(`<!doctype html>
      <html><head><title>Timer</title></head><body>
        <header>Stopwatch</header>
        <form><button type="submit">Finish &amp; Save</button></form>
        <button>Start</button><button type="button">Finished times tab</button>
        <script>localStorage.setItem("bad", "1"); AppLab.getData({}); AppLab.saveData({});</script>
      </body></html>`);

    expect(analysis).toMatchObject({
      buttonWithoutTypeCount: 1,
      completeDocument: true,
      formCount: 1,
      hasSavedTimesSignal: true,
      hasSaveTimeSignal: true,
      hasStartSignal: true,
      hasStopwatchSignal: true,
      prohibitedBrowserStorageCount: 1,
      submitControlCount: 1,
      topHeaderCount: 1,
      usesAppLabLoad: true,
      usesAppLabSave: true,
    });
  });

  it("reports duplicate ids and invalid inline JavaScript", () => {
    const analysis = analyzeGeneratedApp(`<!doctype html><html><body>
      <p id="same">One</p><p id="same">Two</p><script>const = broken;</script>
    </body></html>`);

    expect(analysis.duplicateIds).toEqual(["same"]);
    expect(analysis.scriptSyntaxErrors).toHaveLength(1);
  });
});
