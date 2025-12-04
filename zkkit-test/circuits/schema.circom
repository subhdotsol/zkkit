
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
    