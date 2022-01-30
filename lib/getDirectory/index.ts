import { promptUntilSuccess } from "./prompt";
import { formatDirectory } from "./format";
const fs = require("fs");

export interface directory {
  paths: String[];
  checkForFiles: String[];
  promptOnFail?: boolean;
  promptOnFailMessage?: string;
  promptHelpMessage?: string;
}

export async function getHomeAssistantDir() {
  return await getDirectory({
    paths: ["/config", "~/.homeassistant"],
    checkForFiles: ["configuration.yaml"],
    promptOnFail: true,
    promptOnFailMessage:
      "Please enter a valid path to the Home Assistant config folder?",
    promptHelpMessage: "Usually the directory has a configuration.yaml file.",
  });
}

//@ts-ignore
export async function getDirectory(directory: directory) {
  for (const path of directory.paths) {
    if (fs.existsSync(path)) {
      for (const file of directory.checkForFiles) {
        const sanitizedPath = await formatDirectory(path);
        if (fs.existsSync(`${sanitizedPath}${file}`))
          return formatDirectory(`${sanitizedPath}`);
      }
    }
  }

  if (directory.promptOnFail) return await promptUntilSuccess(directory);
}
