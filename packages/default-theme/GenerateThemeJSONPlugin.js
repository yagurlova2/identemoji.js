const fs = require("fs");
const vm = require("vm");

/**
 * A simple plugin to create JSON files from the object generated by compiled script.
 */
class GenerateThemeJSONPlugin {
  apply(compiler) {
    compiler.hooks.afterCompile.tap(
      "GenerateThemeJSONPlugin",
      (compilation) => {
        // Extract the object from the compiled JS file
        const defaultThemeSrc = compilation.assets["output.js"]._value;
        const themeObject = vm.runInNewContext(
          `${defaultThemeSrc}; defaultTheme.default`
        );

        // Ensure the dist directory exists
        if (!fs.existsSync("dist")) {
          fs.mkdirSync("dist");
        }

        // Save the object as JSON files
        fs.writeFile(
          "dist/default-theme.min.json",
          JSON.stringify(themeObject),
          { encoding: "utf8" },
          () => {}
        );

        fs.writeFile(
          "dist/default-theme.json",
          JSON.stringify(themeObject, null, 2),
          { encoding: "utf8" },
          () => {}
        );

        // Discard the compiled JS file. We no longer need it.
        delete compilation.assets["output.js"];
      }
    );
  }
}

module.exports = GenerateThemeJSONPlugin;
