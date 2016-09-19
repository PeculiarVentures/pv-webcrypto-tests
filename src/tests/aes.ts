import {AlgorithmTest, TestCaseCollection, GenerateKeyCase, ExportKeyCase, SignCase, EncryptCase, WrapCase} from "./store/test";

const ALG_AES_CBC = "AES-CBC";
const ALG_AES_CTR = "AES-CTR";
const ALG_AES_GCM = "AES-GCM";
const ALG_AES_CFB = "AES-CFB-8";
const ALG_AES_CMAC = "AES-CMAC";

function GenerateKey(name: string, keyUsages: string[]) {
    let cases: GenerateKeyCase[] = [];

    // length
    [128, 192, 256].forEach(length => {
        cases.push(
            new GenerateKeyCase({
                name: `generate ${name} length:${length}`,
                params: {
                    algorithm: {
                        name: name,
                        length: length
                    },
                    extractble: true,
                    keyUsages: keyUsages
                }
            })
        );
    });

    return cases;
}

function ExportKey(keys: CryptoKey[]) {
    let cases: ExportKeyCase[] = [];

    keys.forEach(key => {
        // format
        const alg_length = (key.algorithm as any).length;
        ["raw", "jwk"].forEach(format => {
            cases.push(
                new ExportKeyCase({
                    name: `${key.algorithm.name} length:${alg_length} format:${format}`,
                    params: {
                        format: format,
                        key: key,
                        algorithm: key.algorithm,
                        extractble: true,
                        keyUsages: key.usages
                    }
                })
            );
        });
    });

    return cases;
}

export class AesCBCTest extends AlgorithmTest {
    constructor() {
        super(ALG_AES_CBC);

        this.generateKey.push(GenerateKey(ALG_AES_CBC, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        this.on("generate", (keys: CryptoKey[]) => {
            this.exportKey.push(ExportKey(keys));
            this.encrypt.push(AesCBCTest.Encrypt(ALG_AES_CBC, keys));
            this.wrap.push(AesCBCTest.Wrap(ALG_AES_CBC, keys));

            this.run();
        });
    }

    static Encrypt(alg: string, keys: CryptoKey[]) {
        return keys.map(key => {
            return new EncryptCase({
                name: `${alg} len:${(key.algorithm as any).length}`,
                params: {
                    encryptKey: key,
                    decryptKey: key,
                    algorithm: {
                        name: ALG_AES_CBC,
                        iv: new Uint8Array(16),
                    }
                }
            });
        });
    }

    static Wrap(alg: string, keys: CryptoKey[]) {
        const cases: WrapCase[] = [];
        keys.forEach(key => {
            let _alg: any = key.algorithm;
            // format
            ["jwk", "raw"].forEach(format => {
                cases.push(new WrapCase({
                    name: `wrap ${alg} len:${_alg.length}`,
                    params: {
                        format,
                        key,
                        wrappingKey: key,
                        unwrappingKey: key,
                        algorithm: {
                            name: alg,
                            iv: new Uint8Array(16)
                        },
                        unwrappedAlgorithm: key.algorithm,
                        keyUsage: key.usages
                    }
                }));
            });
        });
        return cases;
    }
}
export class AesGCMTest extends AlgorithmTest {
    constructor() {
        super(ALG_AES_GCM);
        this.generateKey.push(GenerateKey(ALG_AES_GCM, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        this.on("generate", (keys: CryptoKey[]) => {
            this.exportKey.push(ExportKey(keys));
            this.encrypt.push(AesGCMTest.Encrypt(keys));
            this.wrap.push(AesGCMTest.Wrap(ALG_AES_GCM, keys));

            this.run();
        });
    }

    static Encrypt(keys: CryptoKey[]) {
        let cases: EncryptCase[] = [];

        keys.forEach(key => {
            // tagLength
            [32, 64, 96, 104, 112, 120, 128]
                .forEach(tagLength => {
                    cases.push(new EncryptCase({
                        name: `${ALG_AES_GCM} len:${(key.algorithm as any).length} tagLen:${tagLength}`,
                        params: {
                            encryptKey: key,
                            decryptKey: key,
                            algorithm: {
                                name: ALG_AES_GCM,
                                iv: new Uint8Array(12),
                                additionalData: new Uint8Array(3),
                                tagLength: tagLength
                            }
                        }
                    }));
                });
        });

        return cases;
    }

    static Wrap(alg: string, keys: CryptoKey[]) {
        const cases: WrapCase[] = [];
        keys.forEach(key => {
            let _alg: any = key.algorithm;
            // format
            ["jwk", "raw"].forEach(format => {
                // tagLength
                [32, 64, 96, 104, 112, 120, 128].forEach(tagLength => {
                    cases.push(new WrapCase({
                        name: `wrap ${alg} len:${_alg.length} tagLen:${tagLength}`,
                        params: {
                            format,
                            key,
                            wrappingKey: key,
                            unwrappingKey: key,
                            algorithm: {
                                name: alg,
                                tagLength: tagLength,
                                iv: new Uint8Array(16)
                            },
                            unwrappedAlgorithm: key.algorithm,
                            keyUsage: key.usages
                        }
                    }));
                });
            });
        });
        return cases;
    }
}
export class AesCTRTest extends AlgorithmTest {
    constructor() {
        super(ALG_AES_CTR);
        this.generateKey.push(GenerateKey(ALG_AES_CTR, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        this.on("generate", (keys: CryptoKey[]) => {
            this.exportKey.push(ExportKey(keys));
            this.encrypt.push(AesCTRTest.Encrypt(ALG_AES_CTR, keys));
            this.wrap.push(AesCTRTest.Wrap(ALG_AES_CTR, keys));

            this.run();
        });

    }
    static Encrypt(alg: string, keys: CryptoKey[]) {
        return keys.map(key => new EncryptCase({
            name: `${alg} len:${(key.algorithm as any).length}`,
            params: {
                encryptKey: key,
                decryptKey: key,
                algorithm: {
                    name: alg,
                    counter: new Uint8Array(16),
                    length: 128
                }
            }
        }));
    }

    static Wrap(alg: string, keys: CryptoKey[]) {
        const cases: WrapCase[] = [];
        keys.forEach(key => {
            let _alg: any = key.algorithm;
            // format
            ["jwk", "raw"].forEach(format => {
                cases.push(new WrapCase({
                    name: `wrap ${alg} len:${_alg.length}`,
                    params: {
                        format,
                        key,
                        wrappingKey: key,
                        unwrappingKey: key,
                        algorithm: {
                            name: alg,
                            counter: new Uint8Array(16),
                            length: 128
                        },
                        unwrappedAlgorithm: key.algorithm,
                        keyUsage: key.usages
                    }
                }));
            });
        });
        return cases;
    }
}
export class AesCFBTest extends AlgorithmTest {
    constructor() {
        super(ALG_AES_CFB);
        this.generateKey.push(GenerateKey(ALG_AES_CFB, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        this.on("generate", (keys: CryptoKey[]) => {
            this.exportKey.push(ExportKey(keys));
            this.encrypt.push(AesCBCTest.Encrypt(ALG_AES_CFB, keys));
        });
    }
}
export class AesCMACTest extends AlgorithmTest {
    constructor() {
        super(ALG_AES_CMAC);
        this.generateKey.push(GenerateKey(ALG_AES_CMAC, ["sign", "verify"]));
        this.on("generate", (keys: CryptoKey[]) => {
            this.exportKey.push(ExportKey(keys));
            this.sign.push(AesCMACTest.Sign(ALG_AES_CMAC, keys));

            this.run();
        });
    }

    static Sign(alg: string, keys: CryptoKey[]) {
        return keys.map(key => new SignCase({
            name: `${alg} len:${(key.algorithm as any).length}`,
            params: {
                algorithm: key.algorithm,
                signKey: key,
                verifyKey: key
            }
        }));
    }
}