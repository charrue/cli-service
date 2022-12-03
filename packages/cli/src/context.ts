import consola from "consola";
import { cac } from "cac";
import { loadConfig } from "unconfig";

export const globalPluginMap = new Map<string, any>();

const createCliServiceContext = () => {
  const cli = cac("charrue-cli-service");

  const defaultExts = ["ts", "mts", "cts", "js", "mjs", "cjs", "json", ""];

  return {
    cli,
    logger: consola,
    loadConfig(filename: string, cwd?: string) {
      return loadConfig({
        sources: [
          {
            files: filename,
            extensions: defaultExts,
          },
        ],
        cwd,
      });
    },
    getPlugin: (name: string) => globalPluginMap.get(name),
  };
};

export const globalPluginContext = createCliServiceContext();

export type CliServiceContext = typeof globalPluginContext;
