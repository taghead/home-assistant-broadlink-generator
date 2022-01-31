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
  const devicesRegistry = JSON.parse(
    fs.readFileSync(`${storageDir}/core.entity_registry`, "utf-8")
  );

  // Push learned codes into devices array.
  const files = await fs.readdirSync(storageDir);
  for (const i in files) {
    const file = files[i];
    if (file.startsWith("broadlink_remote") && file.endsWith("codes")) {
      let data = JSON.parse(fs.readFileSync(`${storageDir}${file}`, "utf-8"));
      // Hook on entity_id onto device
      for (const entity of devicesRegistry.data.entities) {
        if (file.includes("_" + entity.unique_id + "_")) {
          data.entity_id = entity.entity_id;
        }
      }
      log(`FOUND ${file}`);
      devices.push(data);
    }
  }

  // Format and write codes into script.yaml
  let fileWrite;
  for (const device in devices) {
    log("\n" + devices[device].entity_id);
    const entityId = devices[device].entity_id;
    const data: any = devices[device].data;
    for (const deviceId in data) {
      log(`  ${deviceId}:`);
      for (const command in data[deviceId]) {
        fileWrite == undefined
          ? (fileWrite = toYAMLScript(deviceId, command, entityId))
          : (fileWrite += toYAMLScript(deviceId, command, entityId));

        log(`    - ${command}`);
      }
    }
  }

  fs.writeFile(`${scriptFile}`, fileWrite, (err: any) => {
    err ? log(err) : null;
  });
}

function toYAMLScript(deviceId: String, command: String, entityId: String) {
  const id = `${simpleSanitize(deviceId)}_${simpleSanitize(command)}`;
  const alias = `${deviceId} ${command}`;

  return `${id}:
  alias: ${alias}
  sequence:
  - service: remote.send_command
    target:
      entity_id: ${entityId}
    data:
      device: ${deviceId}
      command: "${command}"
  mode: single
  icon: mdi:led-strip
`;
}

function simpleSanitize(string: String) {
  return string.toLowerCase().replaceAll(" ", "_");
}

function log(msg: any) {
  logfile ? console.log(msg) : null;
  // do write to log file stuff
}
