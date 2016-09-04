import {AlgorithmTest, TestCaseCollection, GenerateKeyCase, ExportKeyCase, SignCase, EncryptCase, WrapCase} from "./store/test";

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
                        name: `generate ${name} exp:${index} mod:${modulusLength} hash:${hash}`,
                        params: {
                            algorithm: {
                                name: name,
                                hash: {
                                    name: hash
                                },
                                publicExponent: publicExponent,
                                modulusLength: modulusLength
                            },
                            extractble: true,
                            keyUsages: keyUsages
                        }
                    })
                );
            });
        });

    });

    return cases;
}

function ExportKey(keys: CryptoKeyPair[]) {
    let cases: ExportKeyCase[] = [];

    keys.forEach(keyPair => {
        for (let keyType in keyPair) {
            let key = (keyPair as any)[keyType];
            // format
            ["jwk", keyType === "publicKey" ? "spki" : "pkcs8"].forEach(format => {
                cases.push(
                    new ExportKeyCase({
                        name: `${key.algorithm.name} mod:${(key as any).algorithm.modulusLength} format:${format}`,
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
        }
    });

    return cases;
}

export class RsaSSATest extends AlgorithmTest {

    constructor() {
        super(ALG_RSA_SSA);

        this.generateKey.push(GenerateKey(ALG_RSA_SSA, ["sign", "verify"]));
        this.on("generate", (keys: CryptoKeyPair[]) => {
            this.exportKey.push(ExportKey(keys));
            this.sign.push(RsaSSATest.Sign(ALG_RSA_SSA, keys));

            this.run();
        });

    }
    static Sign(alg: string, keys: CryptoKeyPair[]) {
        return keys.map(keyPair => new SignCase({
            name: `${alg} hash:${(keyPair.publicKey.algorithm as any).hash.name} pubExp:${(keyPair.publicKey.algorithm as any).publicExponent.length === 1 ? 0 : 1} modLen:${(keyPair.publicKey.algorithm as any).modulusLength}`,
            params: {
                signKey: keyPair.privateKey,
                verifyKey: keyPair.publicKey,
                algorithm: {
                    name: alg
                }
            }
        }));
    }


}
export class RsaPSSTest extends AlgorithmTest {

    constructor() {
        super(ALG_RSA_PSS);

        this.generateKey.push(GenerateKey(ALG_RSA_PSS, ["sign", "verify"]));
        this.on("generate", (keys: CryptoKeyPair[]) => {
            this.exportKey.push(ExportKey(keys));
            this.sign.push(RsaPSSTest.Sign(ALG_RSA_PSS, keys));

            this.run();
        });
    }

    static Sign(alg: string, keys: CryptoKeyPair[]) {
        const saltLength = 20;
        return keys.map(keyPair => new SignCase({
            name: `${alg} hash:${(keyPair.publicKey.algorithm as any).hash.name} pubExp:${(keyPair.publicKey.algorithm as any).publicExponent.length === 1 ? 0 : 1} modLen:${(keyPair.publicKey.algorithm as any).modulusLength}  saltLen:${saltLength}`,
            params: {
                signKey: keyPair.privateKey,
                verifyKey: keyPair.publicKey,
                algorithm: {
                    name: alg,
                    saltLength: 128
                }
            }
        }));
    }
}
export class RsaOAEPTest extends AlgorithmTest {

    constructor() {
        super(ALG_RSA_OAEP);

        this.generateKey.push(GenerateKey(ALG_RSA_OAEP, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        this.on("generate", (keys: CryptoKeyPair[]) => {
            this.exportKey.push(ExportKey(keys));
            this.encrypt.push(RsaOAEPTest.Encrypt(ALG_RSA_OAEP, keys));
            this.wrap.push(RsaOAEPTest.Wrap(ALG_RSA_OAEP, keys));

            this.run();
        });
    }

    static Encrypt(alg: string, keys: CryptoKeyPair[]) {
        let cases: EncryptCase[] = [];

        // label
        [null, new Uint8Array(5)].forEach(label => {
            keys.forEach(keyPair => {
                cases.push(new EncryptCase({
                    name: `${alg} hash:${(keyPair.publicKey.algorithm as any).hash.name} pubExp:${(keyPair.publicKey.algorithm as any).publicExponent.length === 1 ? 0 : 1} modLen:${(keyPair.publicKey.algorithm as any).modulusLength} lable:${label}`,
                    params: {
                        encryptKey: keyPair.publicKey,
                        decryptKey: keyPair.privateKey,
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

    static Wrap(alg: string, keys: CryptoKeyPair[]) {
        let cases: WrapCase[] = [];

        // format
        ["jwk", "spki"].forEach(format => {
            // label
            [null, new Uint8Array(5)].forEach(label => {
                keys.forEach(keyPair => {
                    cases.push(new WrapCase({
                        name: `wrap ${alg} hash:${(keyPair.publicKey.algorithm as any).hash.name} pubExp:${(keyPair.publicKey.algorithm as any).publicExponent.length === 1 ? 0 : 1} modLen:${(keyPair.publicKey.algorithm as any).modulusLength} lable:${label}`,
                        params: {
                            format,
                            key: keyPair.publicKey,
                            wrappingKey: keyPair.publicKey,
                            unwrappingKey: keyPair.privateKey,
                            algorithm: label ? {
                                name: alg,
                                label: label
                            } : {
                                    name: alg
                                },
                            unwrappedAlgorithm: keyPair.publicKey.algorithm,
                            keyUsage: keyPair.publicKey.usages
                        }
                    }));
                });
            });
        });

        return cases;
    }
}
