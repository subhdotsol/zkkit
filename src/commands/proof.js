import { run } from "../utils/exec.js";

export default async function proof(opts = {}) {
  const {
    witness = "witness.wtns",
    proof = "proof.json",
    output = "public.json",
  } = opts;

  await run(
    `snarkjs groth16 prove circuit_0000.zkey outputs/${witness} ${proof} ${output}`
  );

  console.log("✔ Proof generated: proof.json, public.json");
}
