# zkkit 🔐

A comprehensive command-line toolkit for building, testing, and deploying zero-knowledge proofs using the **Groth16** proving system. zkkit streamlines the entire workflow from circuit compilation to proof generation and verification.

## Overview

zkkit abstracts the complexity of zero-knowledge proof development by providing a clean, intuitive API and CLI interface. Whether you're building privacy-preserving applications, credentials systems, or cryptographic protocols, zkkit handles the heavy lifting of zk-SNARK operations.

### Key Features

- 🚀 **Simple CLI & Programmatic API** - Use as command-line tool or import functions in your code
- 🔧 **Complete Workflow** - From circuit compilation to proof verification
- 🛡️ **Secure Setup** - Built-in trusted setup ceremony with entropy support
- ⚡ **Efficient** - Leverages snarkjs and circom for optimal performance
- 📦 **Zero Dependencies Hell** - Minimal, well-maintained dependencies
- 🔌 **Composable** - Mix and match functions for custom workflows

## Installation

### Prerequisites (Required)

Before installing zkkit, you **must** have the following installed on your system:

#### 1. **Node.js** (v14 or higher)
Required for running zkkit and npm packages.

**macOS:**
```bash
brew install node
```

**Ubuntu/Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify installation:**
```bash
node --version
npm --version
```

---

#### 2. **Rust** (Latest stable)
Required for circom compilation and cryptographic operations.

**macOS & Linux:**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

**Verify installation:**
```bash
rustc --version
cargo --version
```

---

#### 3. **Circom** (v2.0 or higher)
The circuit compiler for zero-knowledge proofs.

**macOS:**
```bash
brew install circom
```

**Linux (from source):**
```bash
git clone https://github.com/iden3/circom.git
cd circom
cargo build --release
sudo cp target/release/circom /usr/local/bin/
```

**Verify installation:**
```bash
circom --version
```

---

#### 4. **snarkjs** (Global installation recommended)
The SNARK toolkit for proof generation and verification.

```bash
npm install -g snarkjs
```

**Verify installation:**
```bash
snarkjs --version
```

---

### Via npm

Once all prerequisites are installed:

```bash
npm install zkkit
```

### Via npm link (Development)

```bash
git clone <repository-url>
cd zkkit
npm install
npm link
```

Then in your project:
```bash
npm link zkkit
```

## Quick Start

### Using the CLI

```bash
# Initialize a new zkSNARK project
zkkit init

# Compile your circuit
zkkit compile --circuit circuits/schema.circom --out outputs

# Generate witness
zkkit witness --input inputs/inputs.json --name witness.wtns

# Perform trusted setup
zkkit setup:trusted "your-entropy-string"

# Setup Groth16 proving system
zkkit setup:groth

# Generate proof
zkkit proof

# Verify proof
zkkit verify
```

### Using Programmatically

```javascript
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
  // Initialize project structure
  await init();

  // Compile Circom circuit
  await compileCircuit({
    circuit: "circuits/schema.circom",
    out: "outputs"
  });

  // Generate witness from inputs
  await generateWitness({
    input: "inputs/inputs.json",
    name: "witness.wtns"
  });

  // Perform trusted setup (Powers of Tau)
  await generateTrustedSetup("your-entropy-string");

  // Setup Groth16 proving system
  await generateGrothSetup();

  // Generate zero-knowledge proof
  await generateProof();

  // Verify the proof
  await verify();

  console.log("✅ Proof generated and verified successfully!");
}

main().catch(console.error);
```

## API Reference

### `init()`

Initializes a new zkSNARK project with the required directory structure.

**Creates:**
- `circuits/` - Directory for Circom circuit files
- `inputs/` - Directory for input JSON files
- `outputs/` - Directory for compiled outputs

**Example:**
```javascript
await init();
```

---

### `compileCircuit(options)`

Compiles a Circom circuit to R1CS and WebAssembly formats.

**Parameters:**
- `options.circuit` (string) - Path to the `.circom` file
- `options.out` (string) - Output directory for compiled files

**Output Files:**
- `{out}/schema.r1cs` - R1CS constraint system
- `{out}/schema_js/schema.wasm` - WebAssembly binary
- `{out}/schema_js/generate_witness.js` - Witness generator

**Example:**
```javascript
await compileCircuit({
  circuit: "circuits/schema.circom",
  out: "outputs"
});
```

---

### `generateWitness(options)`

Generates a witness from circuit inputs.

**Parameters:**
- `options.input` (string) - Path to input JSON file
- `options.name` (string) - Name of the output witness file

**Input JSON Format:**
```json
{
  "a": 3,
  "b": 11
}
```

**Example:**
```javascript
await generateWitness({
  input: "inputs/inputs.json",
  name: "witness.wtns"
});
```

---

### `generateTrustedSetup(entropy)`

Performs the **Powers of Tau** ceremony - the first phase of the trusted setup. This generates the public parameters needed for the proving system.

⚠️ **Important:** The entropy parameter is crucial for security. It should be a high-entropy string that you keep secret.

**Parameters:**
- `entropy` (string) - Random entropy string for the ceremony

**Generated Files:**
- `pot12_0000.ptau` → `pot12_0001.ptau` - Powers of Tau intermediate
- `pot12_final.ptau` - Final Powers of Tau parameters

**Example:**
```javascript
await generateTrustedSetup("super-secure-entropy-string-12345");
```

---

### `generateGrothSetup()`

Performs the **Phase 2** setup specific to your circuit. Creates the proving and verification keys for the Groth16 protocol.

**Prerequisites:**
- Circuit must be compiled (R1CS file exists)
- Trusted setup must be completed (pot12_final.ptau exists)

**Generated Files:**
- `circuit_0000.zkey` - Proving key
- `verification_key.json` - Verification key

**Example:**
```javascript
await generateGrothSetup();
```

---

### `generateProof()`

Generates a zero-knowledge proof using the witness and proving key.

**Prerequisites:**
- Witness generated
- Groth16 setup completed

**Generated Files:**
- `proof.json` - The zero-knowledge proof
- `public.json` - Public inputs/outputs

**Example:**
```javascript
await generateProof();
```

---

### `verify()`

Verifies a proof using the verification key.

**Prerequisites:**
- Proof generated
- Verification key exists

**Returns:** Console output indicating success or failure

**Example:**
```javascript
await verify();
```

---

## Project Structure

```
your-project/
├── circuits/
│   └── schema.circom          # Your circuit definitions
├── inputs/
│   └── inputs.json            # Circuit input values
├── outputs/
│   ├── schema.r1cs            # Compiled R1CS
│   └── schema_js/
│       ├── schema.wasm        # WebAssembly binary
│       └── generate_witness.js
├── proof.json                 # Generated proof
├── public.json                # Public outputs
├── verification_key.json      # Verification key
├── circuit_0000.zkey          # Proving key
├── pot12_final.ptau           # Powers of Tau
└── main.js                    # Your script
```

## Understanding the Workflow

### 1. **Circuit Definition** 📝
You write constraints in Circom language defining what you want to prove.

### 2. **Compilation** 🔨
The circuit is compiled to R1CS (Rank-1 Constraint System) and WebAssembly.

### 3. **Trusted Setup** 🔐
Powers of Tau ceremony generates common parameters. This is a one-time setup per circuit.

### 4. **Groth16 Setup** 🛠️
Creates proving and verification keys specific to your circuit.

### 5. **Witness Generation** 📊
Evaluates the circuit with your private inputs to generate a witness.

### 6. **Proof Generation** ⚡
Uses the witness and proving key to create a succinct proof.

### 7. **Verification** ✅
Anyone can verify the proof using only public inputs and the verification key.

## Common Use Cases

- **Privacy-Preserving Authentication** - Prove identity without revealing sensitive data
- **Credentials** - Issue and verify credentials without shared databases
- **Confidential Transactions** - Prove transaction validity privately
- **Scalability Solutions** - Bundle multiple transactions into one proof
- **Compliance** - Prove regulatory compliance without exposing details

## Requirements

⚠️ **IMPORTANT:** All of these must be installed and working before using zkkit:

- **Node.js** >= 14.0.0
- **Rust** - Latest stable version
- **circom** >= 2.0 - Circuit compiler
- **snarkjs** >= 0.4.0 - SNARK toolkit

**See [Installation Prerequisites](#prerequisites-required) section above for detailed installation instructions for each dependency.**

If any of these are missing, zkkit will not work. Please complete the prerequisite installation before proceeding.

## Environment Setup

See the [Prerequisites (Required)](#prerequisites-required) section above for complete setup instructions for macOS and Linux.

## Tips & Best Practices

### Security

1. **Entropy** - Use cryptographically secure entropy for trusted setup
2. **Key Management** - Keep your proving keys (`circuit_0000.zkey`) private
3. **Verification** - Always verify proofs before trusting computations
4. **Audits** - Have trusted setup audited before production use

### Performance

1. **Circuit Optimization** - Keep circuits simple to reduce proving time
2. **Batch Operations** - Generate multiple proofs in parallel
3. **Incremental Setup** - Reuse Powers of Tau across multiple circuits

### Development

1. **Start Small** - Begin with simple circuits to understand the workflow
2. **Test Locally** - Run full workflow locally before production
3. **Version Control** - Track your circuits and inputs in git
4. **Documentation** - Document your circuit logic and assumptions

## Troubleshooting

### "Cannot find package zkkit"
```bash
# Ensure npm link is set up correctly
npm link zkkit

# Or reinstall
npm install zkkit
```

### "Command failed: circom"
```bash
# Verify circom is installed
circom --version

# If not, install it
brew install circom  # macOS
```

### "Proof verification failed"
- Check that `proof.json` and `public.json` were generated correctly
- Verify the verification key matches the circuit
- Ensure witness was generated with correct inputs

### "ReferenceError: require is not defined"
- Ensure your `package.json` does NOT have `"type": "module"`
- Or use ES6 import syntax throughout your project

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

## License

ISC - See LICENSE file for details

## Resources

- **Circom Documentation** - https://docs.circom.io/
- **snarkjs** - https://github.com/iden3/snarkjs
- **Zero-Knowledge Proofs** - https://zkp.science/
- **Groth16 Protocol** - https://eprint.iacr.org/2016/260.pdf

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review circuit examples

---

**Happy Proving! 🚀**

Built with ❤️ for the zero-knowledge community.
