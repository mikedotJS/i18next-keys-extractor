# i18next-keys-extractor

`i18next-keys-extractor` is a library to help you automatically extract and generate locale files for your i18n translations. It searches for translation keys in your project's source code and generates locale JSON files for the specified languages.

## Features

- Support for JavaScript, TypeScript, React, and JSX files
- Customizable locales and output directory
- Easy integration with your build process
- Simple CLI interface

## Installation

```bash
npm install i18next-keys-extractor
```

## Usage

### CLI

To use the CLI, simply run:

```bash
i18next-keys-extractor --locales en,es,fr --folder src
```

### Programmatically

You can also use the library programmatically in your Node.js application:

```javascript
import { extractKeys } from "i18next-keys-extractor";

extractKeys({
  supportedExtensions: ["js", "jsx", "ts", "tsx"],
  localesDir: "./locales",
  locales: ["en", "es", "fr"],
  folder: "./src",
});
```

## Options

- `supportedExtensions` (Array): List of supported file extensions. Default: `["js", "jsx", "ts", "tsx"]`
- `localesDir` (String): The output directory for the generated locale files. Default: `./locales`
- `locales` (Array): List of locales to generate. Default: `["en"]`
- `folder` (String): The root folder to search for translation keys. Default: `./`

## License

This project is licensed under the MIT License.
