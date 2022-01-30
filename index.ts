const csscolors = require("css-color-names");
const fs = require("fs");

import buttons from "./lib/buttons";
import { getHomeAssistantDir } from "./lib/getDirectory";

main();

async function main() {
  const dir = await getHomeAssistantDir();
  const devices: Object[] = [];

  const files = await fs.readdirSync(dir);

  for (const i in files) {
    const file = files[i];
    if (file.startsWith("broadlink_remote") && file.endsWith(".json")) {
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

        fileWrite == undefined
          ? (fileWrite = toYAMLScript(id, alias, deviceId, command))
          : (fileWrite += toYAMLScript(id, alias, deviceId, command));

        console.log(`Created script for ... ${id}`);
      }
    }
  }

  fs.writeFile("scripts.yaml", fileWrite, (err: any) => {
    err ? console.log(err) : null;
  });
}

function toYAMLScript(
  id: String,
  alias: String,
  deviceId: String,
  command: String
) {
  return `${id}:
  alias: ${alias}
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
