const prompts = require("prompts");
const fs = require("fs");

/**
 * Returns the first existing directory in an array.
 * @example
 * If lib folder exists recursive.
 * getDirectory(['./lib']);
 * @returns {String} ./lib
 * @example
 * If no folders exist
 * getDirectory(['/lid','./node']);
 * @returns {boolean} false
 * @example
 * If no folders exist and prompt true. It will prompt until success.
 * getDirectory(['/lid','./node'], true);
 * @returns {string} false
 */
async function getDirectory(checkPaths: String[], prompt: boolean = false) {
  for (const path in checkPaths) {
    if (fs.existsSync(checkPaths[path])) {
      let result = checkPaths[path];
      if (
        result.startsWith(".") ||
        result.startsWith("./") ||
        result.startsWith("/")
      ) {
        if (!result.endsWith("/")) result += "/";
        return result;
      }
    }
  }
  if (prompt) {
    const response = await prompts({
      type: "text",
      name: "path",
      message:
        "Please enter a valid path to the Home Assistant config folder (type exit to quit)?",
    });

    if (response.path === "exit") {
      process.exit();
    }

    return getDirectory([response.path], true);
  }
  return false;
}

export default getDirectory;
