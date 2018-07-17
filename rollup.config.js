import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import uglifyEs from "uglify-es";

const prod = process.env.NODE_ENV === "production";

const globalName = "reducedUtils";

export default {
  input: "src/index.js",
  output: [
    {
      file: `lib/reduced-utils.cjs.${prod ? "min.js" : "js"}`,
      format: "cjs"
    },
    {
      file: `lib/reduced-utils.es.${prod ? "min.js" : "js"}`,
      format: "es"
    },
    {
      file: `lib/reduced-utils.iife.${prod ? "min.js" : "js"}`,
      format: "iife",
      name: globalName,
      footer: `window.${globalName} = ${globalName};`
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**" // only transpile our source code
    }),
    prod && uglify({}, uglifyEs.minify)
  ]
};
