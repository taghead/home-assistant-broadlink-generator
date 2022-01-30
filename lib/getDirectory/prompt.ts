const prompts = require("prompts");
import { getDirectory, directory } from ".";

export async function promptUntilSuccess(directory: directory) {
  const response = await prompts({
    type: "text",
    name: "path",
    message: directory.promptOnFailMessage + " (type help) \n>",
  });

  if (
    response.path === "exit" ||
    response.path === "quit" ||
    response.path === "stop"
  ) {
    console.log("Goodbye. 👋");
    process.exit();
  } else if (response.path === "help") {
    console.log(`
      Already checked: 
        ${directory.paths}
        
      The directory contains the following files:
        ${directory.checkForFiles}

      Help message: 
        ${directory.promptHelpMessage}
    `);
  }

  directory.paths.push(response.path);

  const result: any = await getDirectory(directory);
  return result;
}
