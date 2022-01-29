const csscolors = require("css-color-names");
const fs = require("fs");

import buttons from "./lib/buttons";
import getDirectory from "./lib/getDirectory";

main();

async function main() {
  const dir = await getDirectory(["/config", "~/.homeassistant"], true);
  const devices: Object[] = [];

  const files = await fs.readdirSync(dir);
  for (const i in files) {
    const file = files[i];
    if (file.endsWith(".json") && file.startsWith("broadlink_remote")) {
      console.log(`Found ${dir}${file}`);
      const data = require(`${dir}${file}`);
      devices.push(data);
    }
  }

  let fileWrite;

  for (const device in devices) {
    const data = devices[device].data;
    for (const deviceId in data) {
      for (const command in data[deviceId]) {
        const id = `${deviceId.toLowerCase().replaceAll(" ", "_")}_${command
          .toLowerCase()
          .replaceAll(" ", "_")}`;
        const alias = `${deviceId} ${command}`;

        if (!fileWrite) fileWrite = toYAMLScript(id, alias, deviceId, command);
        else fileWrite += toYAMLScript(id, alias, deviceId, command);
      }
    }
  }

  fs.writeFile("scripts.yaml", fileWrite, function (err) {
    if (err) return console.log(err);
  });
}

function toYAMLScript(id, alias, deviceId, command) {
  return `${id}:
  alias: ${alias} +
  sequence:
  - service: remote.send_command
    target:
      entity_id: remote.broadlink_remote
    data:
      device: ${deviceId}
      command: ${command}
  mode: single
  icon: mdi:led-strip
`;
}
