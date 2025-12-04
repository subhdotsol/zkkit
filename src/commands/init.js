import fs from "fs-extra";

export default async function init() {
  await fs.ensureDir("circuits");
  await fs.ensureDir("inputs");
  await fs.ensureDir("outputs");

  await fs.writeJson("inputs/inputs.json", { a: 3, b: 11 });
  await fs.writeFile("circuits/schema.circom", `
// your circuit here

pragma circom 2.0.0;

template SumProduct(){

    // Inputs
    signal input a;
    signal input b;

    // Outputs
    signal output sum;
    signal output product;

    // Constraints 
    sum <== a + b;
    product <== a * b;
}

component main = SumProduct();
    `);
  
  console.log("✔ Project initialized with circuits/, inputs/, outputs/");
}
