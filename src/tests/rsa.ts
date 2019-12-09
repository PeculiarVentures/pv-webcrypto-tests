import { AlgorithmTest, EncryptCase, ExportKeyCase, GenerateKeyCase, SignCase, WrapCase } from "../store/test";

const ALG_RSA_SSA = "RSASSA-PKCS1-v1_5";
const ALG_RSA_ES = "RSAES-PKCS1-v1_5";
const ALG_RSA_OAEP = "RSA-OAEP";
const ALG_RSA_PSS = "RSA-PSS";

function GenerateKey(name: string, keyUsages: string[], hashed: boolean) {
    const cases: GenerateKeyCase[] = [];

    // modulusLength
    [2048, 4096].forEach((modulusLength) => {

        // publicExponent
        [new Uint8Array([3]), new Uint8Array([1, 0, 1])].forEach((publicExponent, index) => {

            // sha
            (hashed
                ? ["SHA-1", "SHA-256", "SHA-384", "SHA-512"]
                : ["none"]).forEach((hash) => {
                    cases.push(
                        new GenerateKeyCase({
                            name: `generate ${name} exp:${index ? 65537 : 3} mod:${modulusLength} hash:${hash}`,
                            params: {
                                algorithm: {
                                    name,
                                    hash: {
                                        name: hash,
                                    },
                                    publicExponent,
                                    modulusLength,
                                },
                                extractable: true,
                                keyUsages,
                            },
                        }),
                    );
                });
        });

    });

    return cases;
}

function ExportKey(keys: TestCaseGeneratedKey[]) {
    const cases: ExportKeyCase[] = [];

    keys.forEach((item) => {
        const pkey = item.key as CryptoKeyPair;
        ["publicKey", "privateKey"].forEach((keyType) => {
            const key = (pkey as any)[keyType];
            // format
            ["jwk", keyType === "publicKey" ? "spki" : "pkcs8"].forEach((format) => {
                cases.push(
                    new ExportKeyCase({
                        name: `${key.algorithm.name} mod:${(item.algorithm as any).modulusLength} pubExp:${(key as any).algorithm.publicExponent.length === 1 ? 3 : 65537}  format:${format}`,
                        params: {
                            format,
                            key,
                            algorithm: item.algorithm,
                            extractable: true,
                            keyUsages: key.usages,
                        },
                    }),
                );
            });
        });
    });

    return cases;
}

export class RsaSSATest extends AlgorithmTest {
    public static Sign(alg: string, keys: TestCaseGeneratedKey[]) {
        return keys.map((o) => {
            const pkey = o.key as CryptoKeyPair;
            const pubKeyAlg = pkey.publicKey.algorithm.name;
            const hash = (o.algorithm as any).hash.name || "unknown";
            const params = {
                name: `${pubKeyAlg} hash:${hash} pubExp:${(pkey.publicKey.algorithm as any).publicExponent.length === 1 ? 3 : 65537} modLen:${(o.algorithm as any).modulusLength}`,
                params: {
                    signKey: pkey.privateKey,
                    verifyKey: pkey.publicKey,
                    algorithm: o.algorithm,
                },
            };
            return new SignCase(params);
        });
    }

    constructor() {
        super(ALG_RSA_SSA);

        this.generateKey.addRange(GenerateKey(ALG_RSA_SSA, ["sign", "verify"], true));
        this.on("generate", (keys) => {
            this.exportKey.addRange(ExportKey(keys));
            this.sign.addRange(RsaSSATest.Sign(ALG_RSA_SSA, keys));
            this.run();
        });

    }

}
export class RsaPSSTest extends AlgorithmTest {

    public static Sign(alg: string, keys: TestCaseGeneratedKey[]) {
        const saltLength = 20;
        return keys.map((item) => {
            const pkey = item.key as CryptoKeyPair;
            const params = {
                name: `${alg} hash:${(item.algorithm as any).hash.name} pubExp:${(item.algorithm as any).publicExponent.length === 1 ? 3 : 65537} modLen:${(item.algorithm as any).modulusLength}  saltLen:${saltLength}`,
                params: {
                    signKey: pkey.privateKey,
                    verifyKey: pkey.publicKey,
                    algorithm: {
                        name: alg,
                        hash: (item.algorithm as any).hash,
                        saltLength: 32,
                    },
                },
            };
            return new SignCase(params);
        });
    }

    constructor() {
        super(ALG_RSA_PSS);

        this.generateKey.addRange(GenerateKey(ALG_RSA_PSS, ["sign", "verify"], true));
        this.on("generate", (keys) => {
            this.exportKey.addRange(ExportKey(keys));
            this.sign.addRange(RsaPSSTest.Sign(ALG_RSA_PSS, keys));

            this.run();
        });
    }
}
export class RsaOAEPTest extends AlgorithmTest {

    public static Encrypt(alg: string, keys: TestCaseGeneratedKey[]) {
        const cases: EncryptCase[] = [];

        // label
        [null, new Uint8Array(5)].forEach((label) => {
            keys.forEach((item) => {
                const pkey = item.key as CryptoKeyPair;
                if (
                    (item.algorithm as any).hash.name === "SHA-512" &&
                    (item.algorithm as any).modulusLength === 1024
                ) {
                    // OpenSSL has got error in this case
                    return;
                }
                cases.push(new EncryptCase({
                    name: `${alg} hash:${(item.algorithm as any).hash.name} pubExp:${(item.algorithm as any).publicExponent.length === 1 ? 3 : 65537} modLen:${(item.algorithm as any).modulusLength} label:${label}`,
                    params: {
                        encryptKey: pkey.publicKey,
                        decryptKey: pkey.privateKey,
                        algorithm: label
                            ? {
                                name: alg,
                                label,
                            }
                            : {
                                name: alg,
                            },
                    },
                }));
            });
        });

        return cases;
    }

    public static Wrap(alg: string, keys: TestCaseGeneratedKey[], cb: (cases: WrapCase[]) => void) {
        const cases: WrapCase[] = [];
        let ref = 0;

        function refCount() {
            if (!--ref) {
                cb(cases);
            }
        }

        // wrapKey
        const wKeyAlgs = ["AES-CBC", "AES-GCM"];
        for (const aesKeyAlg of wKeyAlgs) {
            (async () => {
                ref++;
                const wKey = await crypto.subtle.generateKey(
                    { name: aesKeyAlg, length: 128 } as AesKeyGenParams,
                    true,
                    ["encrypt"]);
                // format
                ["jwk", "raw"].forEach((format) => {
                    // label
                    [null, new Uint8Array(5)].forEach((label) => {
                        keys.forEach((item) => {
                            const pkey = item.key as CryptoKeyPair;
                            cases.push(new WrapCase({
                                name: `wrap ${alg} hash:${(item.algorithm as any).hash.name} pubExp:${(item.algorithm as any).publicExponent.length === 1 ? 3 : 65537} modLen:${(item.algorithm as any).modulusLength} label:${label} wrapKey:${aesKeyAlg}`,
                                params: {
                                    format,
                                    key: wKey,
                                    wrappingKey: pkey.publicKey,
                                    unwrappingKey: pkey.privateKey,
                                    algorithm: label
                                        ? {
                                            name: alg,
                                            label,
                                        }
                                        : {
                                            name: alg,
                                        },
                                },
                            }));
                        });
                    });
                });
            })().then(
                () => refCount(),
                (e) => {
                    refCount();
                    console.error(e);
                },
            );
        }
    }

    constructor() {
        super(ALG_RSA_OAEP);

        this.generateKey.addRange(GenerateKey(ALG_RSA_OAEP, ["encrypt", "decrypt", "wrapKey", "unwrapKey"], true));
        this.on("generate", (keys: TestCaseGeneratedKey[]) => {
            this.exportKey.addRange(ExportKey(keys));
            this.encrypt.addRange(RsaOAEPTest.Encrypt(ALG_RSA_OAEP, keys));
            RsaOAEPTest.Wrap(ALG_RSA_OAEP, keys, (cases) => {
                this.wrap.addRange(cases);
                this.run();
            });
        });
    }
}

export class RsaESTest extends AlgorithmTest {

    public static Encrypt(alg: string, keys: TestCaseGeneratedKey[]) {
        const cases: EncryptCase[] = [];

        // label
        [null, new Uint8Array(5)].forEach((label) => {
            keys.forEach((item) => {
                const pkey = item.key as CryptoKeyPair;
                cases.push(new EncryptCase({
                    name: `${alg} pubExp:${(item.algorithm as any).publicExponent.length === 1 ? 3 : 65537} modLen:${(item.algorithm as any).modulusLength} label:${label}`,
                    params: {
                        encryptKey: pkey.publicKey,
                        decryptKey: pkey.privateKey,
                        algorithm: ALG_RSA_ES,
                    },
                }));
            });
        });

        return cases;
    }

    public static Wrap(alg: string, keys: TestCaseGeneratedKey[], cb: (cases: WrapCase[]) => void) {
        const cases: WrapCase[] = [];
        let ref = 0;

        function refCount() {
            if (!--ref) {
                cb(cases);
            }
        }

        // wrapKey
        const wKeyAlgs = ["AES-CBC", "AES-GCM"];
        for (const aesKeyAlg of wKeyAlgs) {
            (async () => {
                ref++;
                const wKey = await crypto.subtle.generateKey(
                    { name: aesKeyAlg, length: 128 } as AesKeyGenParams,
                    true,
                    ["encrypt"]);
                // format
                ["jwk", "raw"].forEach((format) => {
                    // label
                    [null, new Uint8Array(5)].forEach((label) => {
                        keys.forEach((item) => {
                            const pkey = item.key as CryptoKeyPair;
                            cases.push(new WrapCase({
                                name: `wrap ${alg} pubExp:${(item.algorithm as any).publicExponent.length === 1 ? 3 : 65537} modLen:${(item.algorithm as any).modulusLength} label:${label} wrapKey:${aesKeyAlg}`,
                                params: {
                                    format,
                                    key: wKey,
                                    wrappingKey: pkey.publicKey,
                                    unwrappingKey: pkey.privateKey,
                                    algorithm: ALG_RSA_ES,
                                },
                            }));
                        });
                    });
                });
            })().then(
                () => refCount(),
                (e) => {
                    refCount();
                    console.error(e);
                },
            );
        }
    }

    constructor() {
        super(ALG_RSA_ES);

        this.generateKey.addRange(GenerateKey(ALG_RSA_ES, ["encrypt", "decrypt", "wrapKey", "unwrapKey"], false));
        this.on("generate", (keys: TestCaseGeneratedKey[]) => {
            this.exportKey.addRange(ExportKey(keys));
            this.encrypt.addRange(RsaOAEPTest.Encrypt(ALG_RSA_ES, keys));
            RsaOAEPTest.Wrap(ALG_RSA_ES, keys, (cases) => {
                this.wrap.addRange(cases);
                this.run();
            });
        });
    }
}
