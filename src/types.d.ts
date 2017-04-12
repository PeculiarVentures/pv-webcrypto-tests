declare var cryptoEngines: {
    native: Crypto;
    js: Crypto;
    local: Crypto;
}

declare type TestCaseGeneratedKey = {
    key: CryptoKey | CryptoKeyPair;
    algorithm: Algorithm;
}