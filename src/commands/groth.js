import { run } from "../utils/exec.js";

export default async function groth(opts = {}) {
  const { verification = "verification_key.json" } = opts;

  await run(
    "snarkjs groth16 setup outputs/schema.r1cs pot12_final.ptau circuit_0000.zkey"
  );
  await run(
    `snarkjs zkey export verificationkey circuit_0000.zkey ${verification}`
  );

  console.log("✔ Groth16 setup completed");
}
