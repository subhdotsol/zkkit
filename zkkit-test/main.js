import {
  init,
  compileCircuit,
  generateWitness,
  generateTrustedSetup,
  generateGrothSetup,
  generateProof,
  verify,
} from "zkkit";

async function main() {
  console.log("🚀 Starting ZK workflow using zkkit...\n");

  // Option 1: Use default values (no parameters needed)
  await init();
  await compileCircuit();
  await generateWitness();
  await generateTrustedSetup();
  await generateGrothSetup();
  await generateProof();
  await verify();

  // Option 2: Customize with your own parameters
  // await compileCircuit({ circuit: "circuits/schema.circom", out: "outputs" });
  // await generateWitness({ input: "inputs/inputs.json", name: "witness.wtns" });
  // await generateTrustedSetup("your-custom-entropy-string");
  // await generateGrothSetup({ verification: "verification_key.json" });
  // await generateProof({ witness: "witness.wtns", proof: "proof.json", output: "public.json" });
  // await verify({ verification: "verification_key.json", output: "public.json", proof: "proof.json" });

  console.log("\n🎉 Workflow complete!");
}

main()
  .then(() => {
    console.log("✅ Process finished successfully.");
  })
  .catch((err) => {
    console.error("❌ Error:", err);
  });
