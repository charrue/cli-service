import { describe, expect, test } from "vitest";

import { loadCliServiceConfig } from "../src/config";

const featureDir = new URL("./features", import.meta.url);

describe("config", () => {
  test("load config file", async () => {
    const { config } = await loadCliServiceConfig(featureDir.toString());

    expect(config).not.toBeUndefined();

    expect(config!.plugins!.length > 0).toBeTruthy();
  });
});
