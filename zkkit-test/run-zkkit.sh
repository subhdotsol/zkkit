#!/bin/bash

# Example bash script for running zkkit with custom parameters

# Configuration
CIRCUIT="circuits/schema.circom"
INPUT="inputs/inputs.json"
WITNESS="witness.wtns"
ENTROPY="my-super-secret-entropy-string"
VERIFICATION="verification_key.json"
PROOF="proof.json"
OUTPUT="public.json"

echo "🚀 Running zkkit workflow with custom parameters..."
echo ""

# Option 1: Run complete workflow
zkkit all \
  --circuit "$CIRCUIT" \
  --input "$INPUT" \
  --witness "$WITNESS" \
  --entropy "$ENTROPY" \
  --verification "$VERIFICATION" \
  --proof "$PROOF" \
  --output "$OUTPUT" \
  --skip-init

# Option 2: Run individual commands (commented out)
# zkkit init
# zkkit compile --circuit "$CIRCUIT"
# zkkit witness --input "$INPUT" --name "$WITNESS"
# zkkit setup:trusted --entropy "$ENTROPY"
# zkkit setup:groth --verification "$VERIFICATION"
# zkkit proof --witness "$WITNESS" --proof "$PROOF" --output "$OUTPUT"
# zkkit verify --verification "$VERIFICATION" --proof "$PROOF" --output "$OUTPUT"

echo ""
echo "✅ Workflow completed successfully!"
