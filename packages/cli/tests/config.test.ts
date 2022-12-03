import { describe, expect, test } from "vitest";
import { resolve } from "path";
import { loadCliServiceConfig } from "../src/config";

const featureDir = resolve(__dirname, "./features");

describe("config", () => {
  test("load config file", async () => {
    const { config } = await loadCliServiceConfig(featureDir);

    expect(config).not.toBeUndefined();

    expect(config!.plugins!.length > 0).toBeTruthy();
  });
});
