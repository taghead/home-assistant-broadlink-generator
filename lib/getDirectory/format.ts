export async function formatDirectory(path: String) {
  if (path.startsWith(".") || path.startsWith("./") || path.startsWith("/")) {
    if (!path.endsWith("/")) path += "/";
    return path;
  }
}
