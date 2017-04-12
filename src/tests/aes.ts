import { AlgorithmTest, TestCaseCollection, GenerateKeyCase, ExportKeyCase, SignCase, EncryptCase, WrapCase } from "../store/test";

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
                    extractable: true,
                    keyUsages: keyUsages
                }
            })
        );
    });

    return cases;
}

function ExportKey(keys: TestCaseGeneratedKey[]) {
    let cases: ExportKeyCase[] = [];

    keys.forEach(item => {
        // format
        const alg_length = (item.algorithm as any).length;
        ["raw", "jwk"].forEach(format => {
            cases.push(
                new ExportKeyCase({
                    name: `${item.algorithm.name} length:${alg_length} format:${format}`,
                    params: {
                        format: format,
                        key: item.key as CryptoKey,
                        algorithm: item.algorithm,
                        extractable: true,
                        keyUsages: (item.key as CryptoKey).usages
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

        this.generateKey.addRange(GenerateKey(ALG_AES_CBC, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        this.on("generate", (keys: TestCaseGeneratedKey[]) => {
            this.exportKey.addRange(ExportKey(keys));
            this.encrypt.addRange(AesCBCTest.Encrypt(ALG_AES_CBC, keys));
            this.wrap.addRange(AesCBCTest.Wrap(ALG_AES_CBC, keys));

            this.run();
        });
    }

    static Encrypt(alg: string, keys: TestCaseGeneratedKey[]) {
        return keys.map(item => {
            return new EncryptCase({
                name: `${alg} len:${(item.algorithm as any).length}`,
                params: {
                    encryptKey: item.key as CryptoKey,
                    decryptKey: item.key as CryptoKey,
                    algorithm: {
                        name: ALG_AES_CBC,
                        iv: new Uint8Array(16),
                    }
                }
            });
        });
    }

    static Wrap(alg: string, keys: TestCaseGeneratedKey[]) {
        const cases: WrapCase[] = [];
        keys.forEach(item => {
            let _alg: any = item.algorithm;
            // format
            ["jwk", "raw"].forEach(format => {
                cases.push(new WrapCase({
                    name: `wrap ${alg} len:${_alg.length}`,
                    params: {
                        format,
                        key: item.key as CryptoKey,
                        wrappingKey: item.key as CryptoKey,
                        unwrappingKey: item.key as CryptoKey,
                        algorithm: {
                            name: alg,
                            iv: new Uint8Array(16)
                        },
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
        this.generateKey.addRange(GenerateKey(ALG_AES_GCM, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        this.on("generate", (keys: TestCaseGeneratedKey[]) => {
            this.exportKey.addRange(ExportKey(keys));
            this.encrypt.addRange(AesGCMTest.Encrypt(keys));
            this.wrap.addRange(AesGCMTest.Wrap(ALG_AES_GCM, keys));

            this.run();
        });
    }

    static Encrypt(keys: TestCaseGeneratedKey[]) {
        let cases: EncryptCase[] = [];

        keys.forEach(item => {
            // tagLength
            [32, 64, 96, 104, 112, 120, 128]
                .forEach(tagLength => {
                    cases.push(new EncryptCase({
                        name: `${ALG_AES_GCM} len:${(item.algorithm as any).length} tagLen:${tagLength}`,
                        params: {
                            encryptKey: item.key as CryptoKey,
                            decryptKey: item.key as CryptoKey,
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

    static Wrap(alg: string, keys: TestCaseGeneratedKey[]) {
        const cases: WrapCase[] = [];
        keys.forEach(item => {
            let _alg: any = item.algorithm;
            // format
            ["jwk", "raw"].forEach(format => {
                // tagLength
                [32, 64, 96, 104, 112, 120, 128].forEach(tagLength => {
                    cases.push(new WrapCase({
                        name: `wrap ${alg} len:${_alg.length} tagLen:${tagLength}`,
                        params: {
                            format,
                            key: item.key as CryptoKey,
                            wrappingKey: item.key as CryptoKey,
                            unwrappingKey: item.key as CryptoKey,
                            algorithm: {
                                name: alg,
                                tagLength: tagLength,
                                iv: new Uint8Array(16)
                            },
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
        this.generateKey.addRange(GenerateKey(ALG_AES_CTR, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        this.on("generate", (keys: TestCaseGeneratedKey[]) => {
            this.exportKey.addRange(ExportKey(keys));
            this.encrypt.addRange(AesCTRTest.Encrypt(ALG_AES_CTR, keys));
            this.wrap.addRange(AesCTRTest.Wrap(ALG_AES_CTR, keys));

            this.run();
        });

    }
    static Encrypt(alg: string, keys: TestCaseGeneratedKey[]) {
        return keys.map(item => new EncryptCase({
            name: `${alg} len:${(item.algorithm as any).length}`,
            params: {
                encryptKey: item.key as CryptoKey,
                decryptKey: item.key as CryptoKey,
                algorithm: {
                    name: alg,
                    counter: new Uint8Array(16),
                    length: 128
                }
            }
        }));
    }

    static Wrap(alg: string, keys: TestCaseGeneratedKey[]) {
        const cases: WrapCase[] = [];
        keys.forEach(item => {
            let _alg: any = item.algorithm;
            // format
            ["jwk", "raw"].forEach(format => {
                cases.push(new WrapCase({
                    name: `wrap ${alg} len:${_alg.length}`,
                    params: {
                        format,
                        key: item.key as CryptoKey,
                        wrappingKey: item.key as CryptoKey,
                        unwrappingKey: item.key as CryptoKey,
                        algorithm: {
                            name: alg,
                            counter: new Uint8Array(16),
                            length: 128
                        },
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
        this.generateKey.addRange(GenerateKey(ALG_AES_CFB, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        this.on("generate", (keys: TestCaseGeneratedKey[]) => {
            this.exportKey.addRange(ExportKey(keys));
            this.encrypt.addRange(AesCBCTest.Encrypt(ALG_AES_CFB, keys));
        });
    }
}
export class AesCMACTest extends AlgorithmTest {
    constructor() {
        super(ALG_AES_CMAC);
        this.generateKey.addRange(GenerateKey(ALG_AES_CMAC, ["sign", "verify"]));
        this.on("generate", keys => {
            this.exportKey.addRange(ExportKey(keys));
            this.sign.addRange(AesCMACTest.Sign(ALG_AES_CMAC, keys));

            this.run();
        });
    }

    static Sign(alg: string, keys: TestCaseGeneratedKey[]) {
        return keys.map(item => new SignCase({
            name: `${alg} len:${(item.algorithm as any).length}`,
            params: {
                algorithm: item.algorithm,
                signKey: item.key as CryptoKey,
                verifyKey: item.key as CryptoKey,
            }
        }));
    }
}