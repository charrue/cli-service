import pkg from "../package.json";
import { loadCliServiceConfig } from "./config";
import { globalPluginContext, globalPluginMap } from "./context";

const cwd = process.cwd();

const init = async () => {
  const { cli, logger } = globalPluginContext;
  const { config } = await loadCliServiceConfig(cwd);

  const pluginNames: string[] = [];
  if (Array.isArray(config?.plugins)) {
    config?.plugins.forEach((plugin) => {
      const { name, command, expose } = plugin;
      if (pluginNames.includes(name)) {
        logger.warn(`[charrue-cli-service] plugin:${plugin.name} has exist.`);
        return;
      }

      pluginNames.push(name);
      if (expose) {
        globalPluginMap.set(name, expose);
      }

      if (typeof command === "function") {
        try {
          command(globalPluginContext);
        } catch (e) {
          logger.error(`[charrue-cli-service] plugin:${name} error.`, e);
        }
      }
    });
  }

  cli.help();
  cli.version(pkg.version);
  cli.parse();
};

init().catch((e) => {
  console.error(e);
});
