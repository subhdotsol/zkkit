# zkkit CLI Usage Examples

## Quick Start

Run the complete workflow with default values:

```bash
zkkit all
```

Run with custom parameters:

```bash
zkkit all \
  --circuit circuits/schema.circom \
  --input inputs/inputs.json \
  --witness witness.wtns \
  --entropy "my-secure-entropy" \
  --verification verification_key.json \
  --proof proof.json \
  --output public.json
```

Skip initialization if already done:

```bash
zkkit all --skip-init
```

## Individual Commands

### Initialize Project

```bash
zkkit init
```

### Compile Circuit

```bash
zkkit compile --circuit circuits/schema.circom
```

### Generate Witness

```bash
zkkit witness --input inputs/inputs.json --name witness.wtns
```

### Trusted Setup

```bash
zkkit setup:trusted --entropy "your-entropy-string"
```

### Groth16 Setup

```bash
zkkit setup:groth --verification verification_key.json
```

### Generate Proof

```bash
zkkit proof \
  --witness witness.wtns \
  --proof proof.json \
  --output public.json
```

### Verify Proof

```bash
zkkit verify \
  --verification verification_key.json \
  --proof proof.json \
  --output public.json
```

## Using Scripts

### Node.js Script

```bash
node run-zkkit.js
```

### Bash Script

```bash
./run-zkkit.sh
```

## Default Values

All parameters have sensible defaults:

- **circuit**: `circuits/schema.circom`
- **input**: `inputs/inputs.json`
- **witness**: `witness.wtns`
- **entropy**: `default-entropy-string`
- **verification**: `verification_key.json`
- **proof**: `proof.json`
- **output**: `public.json`

## Help

Get help for any command:

```bash
zkkit --help
zkkit all --help
zkkit compile --help
```
