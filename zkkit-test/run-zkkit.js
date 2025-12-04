#!/usr/bin/env node

/**
 * Example script showing how to use zkkit CLI with custom parameters
 * Run with: node run-zkkit.js
 */

import { execSync } from "child_process";

// Configuration
const config = {
  circuit: "circuits/schema.circom",
  input: "inputs/inputs.json",
  witness: "witness.wtns",
  entropy: "my-super-secret-entropy-string",
  verification: "verification_key.json",
  proof: "proof.json",
  output: "public.json",
};

console.log("🚀 Running zkkit workflow with custom parameters...\n");
console.log("Configuration:", config, "\n");

try {
  // Option 1: Run complete workflow with all command
  const command = `zkkit all \
    --circuit ${config.circuit} \
    --input ${config.input} \
    --witness ${config.witness} \
    --entropy "${config.entropy}" \
    --verification ${config.verification} \
    --proof ${config.proof} \
    --output ${config.output} \
    --skip-init`;

  console.log("Executing:", command, "\n");
  execSync(command, { stdio: "inherit" });

  // Option 2: Run individual commands (commented out)
  /*
  execSync("zkkit init", { stdio: "inherit" });
  execSync(`zkkit compile --circuit ${config.circuit}`, { stdio: "inherit" });
  execSync(`zkkit witness --input ${config.input} --name ${config.witness}`, { stdio: "inherit" });
  execSync(`zkkit setup:trusted --entropy "${config.entropy}"`, { stdio: "inherit" });
  execSync(`zkkit setup:groth --verification ${config.verification}`, { stdio: "inherit" });
  execSync(`zkkit proof --witness ${config.witness} --proof ${config.proof} --output ${config.output}`, { stdio: "inherit" });
  execSync(`zkkit verify --verification ${config.verification} --proof ${config.proof} --output ${config.output}`, { stdio: "inherit" });
  */

  console.log("\n✅ Workflow completed successfully!");
} catch (error) {
  console.error("\n❌ Error running zkkit:", error.message);
  process.exit(1);
}
