const csscolors = require("css-color-names");
const fs = require("fs");

import buttons from "./lib/buttons";
import { getHomeAssistantDir } from "./lib/getDirectory";

const logfile = true;

main();

async function main() {
  const dir = await getHomeAssistantDir();
  const storageDir = `${dir}/.storage/`;
  const scriptFile = `${dir}/scripts.yaml`;
  const devices: any = [];

  const files = await fs.readdirSync(storageDir);

  for (const i in files) {
    const file = files[i];
    if (file.startsWith("broadlink_remote") && file.endsWith("codes")) {
      let data = JSON.parse(fs.readFileSync(`${storageDir}${file}`, "utf-8"));
      log(`FOUND ${file}`);
      devices.push(data);
    }
  }

  let fileWrite;

  for (const device in devices) {
    const data: any = devices[device].data;
    for (const deviceId in data) {
      log(`${deviceId}:`);
      for (const command in data[deviceId]) {
        fileWrite == undefined
          ? (fileWrite = toYAMLScript(deviceId, command))
          : (fileWrite += toYAMLScript(deviceId, command));

        log(`  - ${command}`);
      }
    }
  }

  fs.writeFile(`${scriptFile}`, fileWrite, (err: any) => {
    err ? log(err) : null;
  });
}

function toYAMLScript(deviceId: String, command: String) {
  return `${simpleSanitize(deviceId)}_${simpleSanitize(command)}:
  alias: ${deviceId} ${command}
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

function simpleSanitize(string: String) {
  string.toLowerCase();
  string.replaceAll(" ", "_");
  return string;
}

function log(msg: any) {
  logfile ? console.log(msg) : null;
  // do write to log file stuff
}
