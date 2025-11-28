import fs from "fs-extra";

export default async function init() {
  await fs.ensureDir("circuits");
  await fs.ensureDir("inputs");
  await fs.ensureDir("outputs");

  await fs.writeJson("inputs/inputs.json", { a: 3, b: 11 });
  await fs.writeFile("circuits/schema.circom", "// your circuit here");
  
  console.log("✔ Project initialized with circuits/, inputs/, outputs/");
}
