import { run } from "../utils/exec.js";

export default async function compile(opts) {
  const circuit = opts.circuit;
  // const out = opts.out;

  await run(`circom ${circuit} --r1cs --wasm -o outputs`);
  // await run(`circom ${circuit} --r1cs --wasm -o ${out}`);
  console.log("✔ Circuit compiled");
}
