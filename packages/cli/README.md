# @charrue/cli-service

## 介绍

`@charrue/cli-service`是一个能够可插拔式地注册 cli 命令的工具。
初始状态下，`@charrue/cli-service`没有任何功能，如果要基于命令参数实现什么功能，那么需要去实现插件，然后在`charrue-cli.config.js`中注册使用。

```js
import { defineCliConfig } from "@charrue/cli-service";
import fooPlugin from "charrue-cli-plugin-foo";

export default defineCliConfig({
  plugins: [fooPlugin()],
});
```

## 实现一个插件

```ts
import type { CliServicePlugin } from "@charrue/cli-service";

type FooPluginOptions = {
  // 
}

const fooPlugin: CliServicePlugin = (options: FooPluginOptions) => {
  return {
    name: "foo",
    command({ cli }) {
      cli
        .command("lint [...files]", "Lint files")
        .action((files) => {
          console.log(files);
        });
    },
  };
};
```
