import { run } from "../utils/exec.js";

export default async function compile(opts = {}) {
  const { circuit = "circuits/schema.circom" } = opts;
  // const out = opts.out;

  await run(`circom ${circuit} --r1cs --wasm -o outputs`);
  // await run(`circom ${circuit} --r1cs --wasm -o ${out}`);
  console.log("✔ Circuit compiled");
}
