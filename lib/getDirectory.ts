const prompts = require("prompts");
const fs = require("fs");

interface directory {
  paths: String[];
  checkForFiles: String[];
  promptOnFail?: boolean;
  promptOnFailMessage?: string;
}

export async function getHomeAssistantDir() {
  return await getDirectory({
    paths: ["/config", "~/.homeassistant"],
    checkForFiles: ["configuration.yaml"],
    promptOnFail: true,
    promptOnFailMessage:
      "Please enter a valid path to the Home Assistant config folder?",
  });
}

export async function getDirectory(directory: directory) {
  for (const path of directory.paths) {
    if (fs.existsSync(path)) return formatPath(path);
  }

  if (directory.promptOnFail) return await promptUntilSuccess(directory);
}

async function formatPath(path: String) {
  if (path.startsWith(".") || path.startsWith("./") || path.startsWith("/")) {
    if (!path.endsWith("/")) path += "/";
    return path;
  }
}

async function promptUntilSuccess(directory: directory) {
  const response = await prompts({
    type: "text",
    name: "path",
    message: directory.promptOnFailMessage + "\n>",
  });

  if (
    response.path === "exit" ||
    response.path === "quit" ||
    response.path === "stop"
  ) {
    console.log("Goodbye. 👋");
    process.exit();
  }

  directory.paths = [`${response.path}`];

  return await getDirectory(directory);
}
