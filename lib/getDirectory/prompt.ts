const prompts = require("prompts");
import { getDirectory, directory } from ".";

export async function promptUntilSuccess(directory: directory) {
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
