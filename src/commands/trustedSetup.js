import { run } from "../utils/exec.js";

export default async function trustedSetup(entropy) {
  if (!entropy) {
    throw new Error("❌ trustedSetup(entropy) requires an entropy string.");
  }

  console.log("running trusted setup");

  await run("snarkjs powersoftau new bn128 12 pot12_0000.ptau");

  await run(
    "snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau",
    entropy + "\n" // <- SENT TO STDIN
  );

  await run("snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau");
  await run("snarkjs powersoftau verify pot12_final.ptau");

  console.log("✔ Trusted setup completed");
}
