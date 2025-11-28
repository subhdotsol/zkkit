import { run } from "../utils/exec.js";

export default async function witness(opts) {
  const input = opts.input;
  const name = opts.name;

  await run(`node outputs/schema_js/generate_witness.js outputs/schema_js/schema.wasm ${input} outputs/${name}`);

  console.log(`✔ Witness generated: outputs/${name}`);
}
