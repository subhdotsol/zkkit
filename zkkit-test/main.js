const {
  init,
  compileCircuit,
  generateWitness,
  generateTrustedSetup,
  generateGrothSetup,
  generateProof,
  verify
} = require("zkkit");

async function main() {
  console.log("🚀 Starting ZK workflow using zkkit...\n");

//   await init();  // better do this in terminal

  await compileCircuit({
    circuit: "circuits/schema.circom",
    out: "outputs"
  });

  await generateWitness({
    input: "inputs/inputs.json",
    name: "witness.wtns"
  });

  // Pass entropy here
  await generateTrustedSetup("super-secure-entropy-string");

  await generateGrothSetup();

  await generateProof();

  await verify();

  console.log("\n🎉 Workflow complete.");
}

main().catch((err) => {
  console.error("❌ Error:", err);
});
