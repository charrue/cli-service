import { defineCliPlugin } from "../../src/config";

export default defineCliPlugin((options) => {
  return {
    name: "foo",
    expose: options,
  };
});
