declare var cryptoEngines: {
    native: Crypto;
    js: Crypto;
}

declare type TestCaseGeneratedKey = {
    key: CryptoKey | CryptoKeyPair;
    algorithm: Algorithm;
}