const csscolors = require("css-color-names");
const fs = require("fs");

import buttons from "./lib/buttons";
import getDirectory from "./lib/getDirectory";

main();

async function main() {
  const dir = await getDirectory(["/config", "~/.homeassistant"], true);

  fs.readdir(dir, (err, files) => {
    files.forEach((file) => {
      if (file.endsWith(".json") && file.startsWith("broadlink_remote")) {
        import(file).then((file) => {
          console.log(file);
        });
      }
    });
  });
}
