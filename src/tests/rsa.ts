import { AlgorithmTest, TestCaseCollection, GenerateKeyCase, ExportKeyCase, SignCase, EncryptCase, WrapCase } from "../store/test";

const ALG_RSA_SSA = "RSASSA-PKCS1-v1_5";
const ALG_RSA_OAEP = "RSA-OAEP";
const ALG_RSA_PSS = "RSA-PSS";

function GenerateKey(name: string, keyUsages: string[]) {
    let cases: GenerateKeyCase[] = [];

    // modulusLength
    [1024, 2048, /*4096*/].forEach(modulusLength => {

        // publicExponent
        [new Uint8Array([3]), new Uint8Array([1, 0, 1])].forEach((publicExponent, index) => {

            // sha
            ["SHA-1", "SHA-256", "SHA-384", "SHA-512"].forEach(hash => {
                cases.push(
                    new GenerateKeyCase({
                        name: `generate ${name} exp:${index ? 65537 : 3} mod:${modulusLength} hash:${hash}`,
                        params: {
                            algorithm: {
                                name: name,
                                hash: {
                                    name: hash
                                },
                                publicExponent: publicExponent,
                                modulusLength: modulusLength
                            },
                            extractable: true,
                            keyUsages: keyUsages
                        }
                    })
                );
            });
        });

    });

    return cases;
}

function ExportKey(keys: TestCaseGeneratedKey[]) {
    let cases: ExportKeyCase[] = [];

    keys.forEach(item => {
        const pkey = item.key as CryptoKeyPair;
        for (let keyType in pkey) {
            let key = (pkey as any)[keyType];
            // format
            ["jwk", keyType === "publicKey" ? "spki" : "pkcs8"].forEach(format => {
                cases.push(
                    new ExportKeyCase({
                        name: `${key.algorithm.name} mod:${(item.algorithm as any).modulusLength} pubExp:${(key as any).algorithm.publicExponent.length === 1 ? 3 : 65537}  format:${format}`,
                        params: {
                            format: format,
                            key: key,
                            algorithm: item.algorithm,
                            extractable: true,
                            keyUsages: key.usages
                        }
                    })
                );
            });
        }
    });

    return cases;
}

export class RsaSSATest extends AlgorithmTest {

    constructor() {
        super(ALG_RSA_SSA);

        this.generateKey.addRange(GenerateKey(ALG_RSA_SSA, ["sign", "verify"]));
        this.on("generate", keys => {
            this.exportKey.addRange(ExportKey(keys));
            this.sign.addRange(RsaSSATest.Sign(ALG_RSA_SSA, keys));
            this.run();
        });

    }
    static Sign(alg: string, keys: TestCaseGeneratedKey[]) {
        return keys.map(item => {
            const pkey = item.key as CryptoKeyPair;
            const alg = pkey.publicKey.algorithm.name;
            const hash = (item.algorithm as any).hash.name || "unknown";
            const params = {
                name: `${alg} hash:${hash} pubExp:${(pkey.publicKey.algorithm as any).publicExponent.length === 1 ? 3 : 65537} modLen:${(item.algorithm as any).modulusLength}`,
                params: {
                    signKey: pkey.privateKey,
                    verifyKey: pkey.publicKey,
                    algorithm: item.algorithm
                }
            };
            return new SignCase(params);
        });
    }


}
export class RsaPSSTest extends AlgorithmTest {

    constructor() {
        super(ALG_RSA_PSS);

        this.generateKey.addRange(GenerateKey(ALG_RSA_PSS, ["sign", "verify"]));
        this.on("generate", keys => {
            this.exportKey.addRange(ExportKey(keys));
            this.sign.addRange(RsaPSSTest.Sign(ALG_RSA_PSS, keys));

            this.run();
        });
    }

    static Sign(alg: string, keys: TestCaseGeneratedKey[]) {
        const saltLength = 20;
        return keys.map(item => {
            const pkey = item.key as CryptoKeyPair;
            const params = {
                name: `${alg} hash:${(item.algorithm as any).hash.name} pubExp:${(item.algorithm as any).publicExponent.length === 1 ? 3 : 65537} modLen:${(item.algorithm as any).modulusLength}  saltLen:${saltLength}`,
                params: {
                    signKey: pkey.privateKey,
                    verifyKey: pkey.publicKey,
                    algorithm: {
                        name: alg,
                        hash: (item.algorithm as any).hash,
                        saltLength: 128
                    }
                }
            };
            return new SignCase(params);
        });
    }
}
export class RsaOAEPTest extends AlgorithmTest {

    constructor() {
        super(ALG_RSA_OAEP);

        this.generateKey.addRange(GenerateKey(ALG_RSA_OAEP, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        this.on("generate", (keys: TestCaseGeneratedKey[]) => {
            this.exportKey.addRange(ExportKey(keys));
            this.encrypt.addRange(RsaOAEPTest.Encrypt(ALG_RSA_OAEP, keys));
            RsaOAEPTest.Wrap(ALG_RSA_OAEP, keys, cases => {
                this.wrap.addRange(cases);
                this.run();
            });
        });
    }

    static Encrypt(alg: string, keys: TestCaseGeneratedKey[]) {
        let cases: EncryptCase[] = [];

        // label
        [null, new Uint8Array(5)].forEach(label => {
            keys.forEach(item => {
                const pkey = item.key as CryptoKeyPair;
                cases.push(new EncryptCase({
                    name: `${alg} hash:${(item.algorithm as any).hash.name} pubExp:${(item.algorithm as any).publicExponent.length === 1 ? 3 : 65537} modLen:${(item.algorithm as any).modulusLength} label:${label}`,
                    params: {
                        encryptKey: pkey.publicKey,
                        decryptKey: pkey.privateKey,
                        algorithm: label ? {
                            name: alg,
                            label: label
                        } : {
                                name: alg
                            }
                    }
                }));
            });
        });

        return cases;
    }

    static Wrap(alg: string, keys: TestCaseGeneratedKey[], cb: (cases: WrapCase[]) => void) {
        let cases: WrapCase[] = [];
        let ref = 0;

        function refCount() {
            if (!--ref)
                cb(cases);
        }

        // wrapKey
        ["AES-CBC", "AES-GCM"].forEach(aesKeyAlg => {

            try {
                ref++;
                Promise.resolve()
                    .then(() =>
                        crypto.subtle.generateKey({ name: aesKeyAlg, length: 128 } as any, true, ["encrypt"])
                    )
                    .then((aesKey: CryptoKey) => {
                        // format
                        ["jwk", "raw"].forEach(format => {
                            // label
                            [null, new Uint8Array(5)].forEach(label => {
                                keys.forEach(item => {
                                    const pkey = item.key as CryptoKeyPair;
                                    cases.push(new WrapCase({
                                        name: `wrap ${alg} hash:${(item.algorithm as any).hash.name} pubExp:${(item.algorithm as any).publicExponent.length === 1 ? 3 : 65537} modLen:${(item.algorithm as any).modulusLength} label:${label} wrapKey:${aesKeyAlg}`,
                                        params: {
                                            format,
                                            key: aesKey,
                                            wrappingKey: pkey.publicKey,
                                            unwrappingKey: pkey.privateKey,
                                            algorithm: label ? {
                                                name: alg,
                                                label: label
                                            } : {
                                                    name: alg
                                                }
                                        }
                                    }));
                                });
                            });
                        });
                        refCount();
                    })
                    .catch((e: Error) => {
                        refCount();
                        console.error(e);
                    });
            }
            catch (e) {
                console.error(e);
                refCount();
            }
        });
    }
}
