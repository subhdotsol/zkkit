import { run } from "../utils/exec.js";

export default async function witness(opts) {
  const input = opts.input;
  const name = opts.name;

  // Use snarkjs to generate witness instead of circom's generated JS files
  // This avoids CommonJS/ESM conflicts
  await run(`snarkjs wtns calculate outputs/schema_js/schema.wasm ${input} outputs/${name}`);

  console.log(`✔ Witness generated: outputs/${name}`);
}
