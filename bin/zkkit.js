#!/usr/bin/env node

import { Command } from "commander";
import init from "../src/commands/init.js";
import compile from "../src/commands/compile.js";
import witness from "../src/commands/witness.js";
import trustedSetup from "../src/commands/trustedSetup.js";
import groth from "../src/commands/groth.js";
import proof from "../src/commands/proof.js";
import verify from "../src/commands/verify.js";

const program = new Command();

program
  .name("zkkit")
  .description("Zero-knowledge proof workflow toolkit")
  .version("0.0.1");

program
  .command("init")
  .description("Scaffold circuit + inputs + outputs folders")
  .action(init);

program
  .command("compile")
  .option("-c, --circuit <path>", "Circuit file path", "circuits/schema.circom")
  // .option("-o, --out <path>", "Output folder", "outputs")
  .action(compile);

program
  .command("witness")
  .option("-i, --input <json>", "Input JSON", "inputs/inputs.json")
  .option("-n, --name <string>", "Witness file name", "witness.wtns")
  .action(witness);

program.command("setup:trusted").action(trustedSetup);

program.command("setup:groth").option("-v, --verification <string>", "Verification key file name", "verification_key.json").action(groth);

program.command("proof")
.option("-w, --witness <string>", "Witness file name", "witness.wtns")
.option("-p, --proof <string>", "Proof file name", "proof.json")
.option("-o, --output <string>", "Output file name", "public.json")
.action(proof);

program.command("verify")
.option("-v, --verification <string>", "Verification key file name", "verification_key.json")
.option("-p, --proof <string>", "Proof file name", "proof.json")
.option("-o, --output <string>", "Output file name", "public.json")
.action(verify);

program.parse(process.argv);
