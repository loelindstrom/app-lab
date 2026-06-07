import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
export default defineConfig(function (_a) {
    var command = _a.command;
    return ({
        base: command === "build" ? "/app-lab/" : "/",
        plugins: [react()],
        test: {
            environment: "jsdom",
        },
    });
});
