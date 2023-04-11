#!/usr/bin/env node

import path from "path";
import { extractKeys } from "./index.js";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).argv;

const supportedExtensions = argv.extensions
  ? argv.extensions.split(",")
  : ["js", "jsx", "ts", "tsx"];
const localesDir = argv.localesDir
  ? path.resolve(argv.localesDir)
  : path.join(process.cwd(), "locales");
const locales = argv.locales || ["en"];
const folder = argv.folder || "./";

extractKeys({
  supportedExtensions,
  localesDir,
  locales,
  folder,
});
