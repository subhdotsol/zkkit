import { run } from "../utils/exec.js";

export default async function verify(opts) {
  const {verification , output , proof} = opts;
  
  const result = await run(`snarkjs groth16 verify ${verification} ${output} ${proof}`);
  
  console.log(result.includes("OK") ? "✔ Proof verified" : "✘ Verification failed");
}
