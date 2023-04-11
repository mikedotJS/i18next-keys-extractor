import fs from "fs";
import path from "path";
import { globby } from "globby";
import babel from "@babel/core";
import _traverse from "@babel/traverse";
const traverse = _traverse.default;

function setNestedKey(obj, key, value) {
  const keys = key.split(".");
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (i === keys.length - 1) {
      if (!current[k]) {
        current[k] = value;
      }
    } else {
      if (!current.hasOwnProperty(k)) {
        current[k] = {};
      }
      current = current[k];
    }
  }
}

export default function generateLocales(options) {
  const { supportedExtensions, localesDir, locales, folder } = options;

  (async () => {
    const paths = await globby(
      `${folder}/**/*.{${supportedExtensions.join(",")}}`
    );

    const keys = new Set();

    paths.forEach((filePath) => {
      const code = fs.readFileSync(filePath, "utf-8");
      const ast = babel.parseSync(code, {
        filename: filePath,
        configFile: false,
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
        sourceType: "module",
      });

      traverse(ast, {
        CallExpression({ node }) {
          if (node.callee.type === "Identifier" && node.callee.name === "t") {
            const key = node.arguments[0];
            if (key && key.type === "StringLiteral") {
              keys.add(key.value);
            }
          }
        },
      });
    });

    if (!fs.existsSync(localesDir)) {
      fs.mkdirSync(localesDir);
    }

    locales.split(",").forEach((locale) => {
      const localePath = path.join(localesDir, `${locale}.json`);
      const localeFileExists = fs.existsSync(localePath);
      const localeData = localeFileExists
        ? JSON.parse(fs.readFileSync(localePath, "utf8"))
        : {};

      const translations = { ...localeData };

      keys.forEach((key) => {
        setNestedKey(translations, key, key);
      });

      fs.writeFileSync(localePath, JSON.stringify(translations, null, 2));
      console.log(`Generated locale file: ${localePath}`);
    });
  })();
}
