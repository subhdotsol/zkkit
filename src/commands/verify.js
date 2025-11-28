import { run } from "../utils/exec.js";

export default async function verify() {
  const result = await run("snarkjs groth16 verify verification_key.json public.json proof.json");
  
  console.log(result.includes("OK") ? "✔ Proof verified" : "✘ Verification failed");
}
