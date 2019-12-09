import { AlgorithmTest, EncryptCase, ExportKeyCase, GenerateKeyCase, SignCase, WrapCase } from "../store/test";

const ALG_AES_ECB = "AES-ECB";
const ALG_AES_CBC = "AES-CBC";
const ALG_AES_CTR = "AES-CTR";
const ALG_AES_GCM = "AES-GCM";
const ALG_AES_CFB = "AES-CFB-8";
const ALG_AES_CMAC = "AES-CMAC";

function GenerateKey(name: string, keyUsages: string[]) {
    const cases: GenerateKeyCase[] = [];

    // length
    [128, 192, 256].forEach((length) => {
        cases.push(
            new GenerateKeyCase({
                name: `generate ${name} length:${length}`,
                params: {
                    algorithm: {
                        name,
                        length,
                    },
                    extractable: true,
                    keyUsages,
                },
            }),
        );
    });

    return cases;
}

function ExportKey(keys: TestCaseGeneratedKey[]) {
    const cases: ExportKeyCase[] = [];

    keys.forEach((item) => {
        // format
        const algLength = (item.algorithm as any).length;
        ["raw", "jwk"].forEach((format) => {
            cases.push(
                new ExportKeyCase({
                    name: `${item.algorithm.name} length:${algLength} format:${format}`,
                    params: {
                        format,
                        key: item.key as CryptoKey,
                        algorithm: item.algorithm,
                        extractable: true,
                        keyUsages: (item.key as CryptoKey).usages,
                    },
                }),
            );
        });
    });

    return cases;
}

export class AesECBTest extends AlgorithmTest {

    public static Encrypt(alg: string, keys: TestCaseGeneratedKey[]) {
        return keys.map((item) => {
            return new EncryptCase({
                name: `${alg} len:${(item.algorithm as any).length}`,
                params: {
                    encryptKey: item.key as CryptoKey,
                    decryptKey: item.key as CryptoKey,
                    algorithm: {
                        name: ALG_AES_ECB,
                    },
                },
            });
        });
    }

    public static Wrap(alg: string, keys: TestCaseGeneratedKey[]) {
        const cases: WrapCase[] = [];
        keys.forEach((item) => {
            const itemAlg: any = item.algorithm;
            // format
            ["jwk", "raw"].forEach((format) => {
                cases.push(new WrapCase({
                    name: `wrap ${alg} len:${itemAlg.length}`,
                    params: {
                        format,
                        key: item.key as CryptoKey,
                        wrappingKey: item.key as CryptoKey,
                        unwrappingKey: item.key as CryptoKey,
                        algorithm: {
                            name: alg,
                            iv: new Uint8Array(16),
                        },
                    },
                }));
            });
        });
        return cases;
    }
    constructor() {
        super(ALG_AES_ECB);

        this.generateKey.addRange(GenerateKey(ALG_AES_ECB, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        this.on("generate", (keys: TestCaseGeneratedKey[]) => {
            this.exportKey.addRange(ExportKey(keys));
            this.encrypt.addRange(AesECBTest.Encrypt(ALG_AES_ECB, keys));
            this.wrap.addRange(AesECBTest.Wrap(ALG_AES_ECB, keys));

            this.run();
        });
    }
}

export class AesCBCTest extends AlgorithmTest {

    public static Encrypt(alg: string, keys: TestCaseGeneratedKey[]) {
        return keys.map((item) => {
            return new EncryptCase({
                name: `${alg} len:${(item.algorithm as any).length}`,
                params: {
                    encryptKey: item.key as CryptoKey,
                    decryptKey: item.key as CryptoKey,
                    algorithm: {
                        name: ALG_AES_CBC,
                        iv: new Uint8Array(16),
                    },
                },
            });
        });
    }

    public static Wrap(alg: string, keys: TestCaseGeneratedKey[]) {
        const cases: WrapCase[] = [];
        keys.forEach((item) => {
            const itemAlg: any = item.algorithm;
            // format
            ["jwk", "raw"].forEach((format) => {
                cases.push(new WrapCase({
                    name: `wrap ${alg} len:${itemAlg.length}`,
                    params: {
                        format,
                        key: item.key as CryptoKey,
                        wrappingKey: item.key as CryptoKey,
                        unwrappingKey: item.key as CryptoKey,
                        algorithm: {
                            name: alg,
                            iv: new Uint8Array(16),
                        },
                    },
                }));
            });
        });
        return cases;
    }
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
}
export class AesGCMTest extends AlgorithmTest {

    public static Encrypt(keys: TestCaseGeneratedKey[]) {
        const cases: EncryptCase[] = [];

        keys.forEach((item) => {
            // tagLength
            [32, 64, 96, 104, 112, 120, 128]
                .forEach((tagLength) => {
                    cases.push(new EncryptCase({
                        name: `${ALG_AES_GCM} len:${(item.algorithm as any).length} tagLen:${tagLength}`,
                        params: {
                            encryptKey: item.key as CryptoKey,
                            decryptKey: item.key as CryptoKey,
                            algorithm: {
                                name: ALG_AES_GCM,
                                iv: new Uint8Array(12),
                                additionalData: new Uint8Array(3),
                                tagLength,
                            },
                        },
                    }));
                });
        });

        return cases;
    }

    public static Wrap(alg: string, keys: TestCaseGeneratedKey[]) {
        const cases: WrapCase[] = [];
        keys.forEach((item) => {
            const itemAlg: any = item.algorithm;
            // format
            ["jwk", "raw"].forEach((format) => {
                // tagLength
                [32, 64, 96, 104, 112, 120, 128].forEach((tagLength) => {
                    cases.push(new WrapCase({
                        name: `wrap ${alg} len:${itemAlg.length} tagLen:${tagLength}`,
                        params: {
                            format,
                            key: item.key as CryptoKey,
                            wrappingKey: item.key as CryptoKey,
                            unwrappingKey: item.key as CryptoKey,
                            algorithm: {
                                name: alg,
                                tagLength,
                                iv: new Uint8Array(16),
                            },
                        },
                    }));
                });
            });
        });
        return cases;
    }
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
}
export class AesCTRTest extends AlgorithmTest {
    public static Encrypt(alg: string, keys: TestCaseGeneratedKey[]) {
        return keys.map((item) => new EncryptCase({
            name: `${alg} len:${(item.algorithm as any).length}`,
            params: {
                encryptKey: item.key as CryptoKey,
                decryptKey: item.key as CryptoKey,
                algorithm: {
                    name: alg,
                    counter: new Uint8Array(16),
                    length: 128,
                },
            },
        }));
    }

    public static Wrap(alg: string, keys: TestCaseGeneratedKey[]) {
        const cases: WrapCase[] = [];
        keys.forEach((item) => {
            const itemAlg: any = item.algorithm;
            // format
            ["jwk", "raw"].forEach((format) => {
                cases.push(new WrapCase({
                    name: `wrap ${alg} len:${itemAlg.length}`,
                    params: {
                        format,
                        key: item.key as CryptoKey,
                        wrappingKey: item.key as CryptoKey,
                        unwrappingKey: item.key as CryptoKey,
                        algorithm: {
                            name: alg,
                            counter: new Uint8Array(16),
                            length: 128,
                        },
                    },
                }));
            });
        });
        return cases;
    }
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

    public static Sign(alg: string, keys: TestCaseGeneratedKey[]) {
        return keys.map((item) => new SignCase({
            name: `${alg} len:${(item.algorithm as any).length}`,
            params: {
                algorithm: item.algorithm,
                signKey: item.key as CryptoKey,
                verifyKey: item.key as CryptoKey,
            },
        }));
    }
    constructor() {
        super(ALG_AES_CMAC);
        this.generateKey.addRange(GenerateKey(ALG_AES_CMAC, ["sign", "verify"]));
        this.on("generate", (keys) => {
            this.exportKey.addRange(ExportKey(keys));
            this.sign.addRange(AesCMACTest.Sign(ALG_AES_CMAC, keys));

            this.run();
        });
    }
}
