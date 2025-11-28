import { run } from "../utils/exec.js";

export default async function proof() {
  await run("snarkjs groth16 prove circuit_0000.zkey outputs/witness.wtns proof.json public.json");

  console.log("✔ Proof generated: proof.json, public.json");
}
