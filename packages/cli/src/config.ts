import { fileURLToPath } from "url";

import { CliServiceContext, globalPluginContext } from "./context";

export type CliServicePlugin<O = any> = (options: O) => {
  name: string;
  command?: (context: CliServiceContext) => void;
  expose?: any;
};

export interface CliServiceConfig {
  plugins?: Array<ReturnType<CliServicePlugin>>;
}

export function defineCliConfig(options: CliServiceConfig) {
  return options;
}

export async function loadCliServiceConfig(cwd?: string): Promise<{
  config?: CliServiceConfig;
  sources?: string[];
}> {
  if (cwd) {
    cwd = cwd.startsWith("file:///") ? fileURLToPath(cwd) : cwd;
  }

  try {
    const { config, sources } = await globalPluginContext.loadConfig("charrue-cli.config", cwd);
    return {
      config: config as CliServiceConfig,
      sources,
    };
  } catch (e) {
    console.error(e);
    return {};
  }
}
