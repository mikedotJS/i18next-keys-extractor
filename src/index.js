import path from "path";
import generateLocales from "./script.js";

export function extractKeys(options) {
  const defaultOptions = {
    supportedExtensions: ["js", "jsx", "ts", "tsx"],
    localesDir: path.join(process.cwd(), "locales"),
    locales: ["en"],
  };

  const finalOptions = Object.assign({}, defaultOptions, options);

  generateLocales(finalOptions);
}
