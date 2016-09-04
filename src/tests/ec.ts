import {AlgorithmTest, TestCaseCollection, GenerateKeyCase, ExportKeyCase, SignCase, DeriveKeyCase, DeriveBitsCase} from "./store/test";

const ALG_EC_DSA = "ECDSA";
const ALG_EC_DH = "ECDH";

function GenerateKey(name: string, keyUsages: string[]) {
    let cases: GenerateKeyCase[] = [];

    // namedCurve
    ["P-256", "P-384", "P-521"].forEach(namedCurve => {
        cases.push(
            new GenerateKeyCase({
                name: `generate ${name} curve:${namedCurve}`,
                params: {
                    algorithm: {
                        name: name,
                        namedCurve: namedCurve
                    },
                    extractble: true,
                    keyUsages: keyUsages
                }
            })
        );

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
                        name: `${key.algorithm.name} curve:${(key as any).algorithm.namedCurve} format:${format}`,
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

export class EcDSATest extends AlgorithmTest {

    constructor() {
        super(ALG_EC_DSA);

        this.generateKey.push(GenerateKey(ALG_EC_DSA, ["sign", "verify"]));
        this.on("generate", (keys: CryptoKeyPair[]) => {
            this.exportKey.push(ExportKey(keys));
            this.sign.push(EcDSATest.Sign(ALG_EC_DSA, keys));

            this.run();
        });

    }
    static Sign(alg: string, keys: CryptoKeyPair[]) {
        let cases: SignCase[] = [];

        keys.forEach(keyPair => {
            // hash
            ["SHA-1", "SHA-256", "SHA-384", "SHA-512"]
                .forEach(hash => {
                    cases.push(new SignCase({
                        name: `${alg} curve:${(keyPair.publicKey.algorithm as any).namedCurve} hash:${hash}`,
                        params: {
                            signKey: keyPair.privateKey,
                            verifyKey: keyPair.publicKey,
                            algorithm: {
                                name: alg,
                                hash: {
                                    name: hash
                                }
                            }
                        }
                    }));
                });
        });
        return cases;
    }
}
export class EcDHTest extends AlgorithmTest {

    constructor() {
        super(ALG_EC_DH);
        this.generateKey.push(GenerateKey(ALG_EC_DH, ["deriveKey", "deriveBits"]));
        this.on("generate", (keys: CryptoKeyPair[]) => {
            this.exportKey.push(ExportKey(keys));
            this.deriveKey.push(EcDHTest.DeriveKey(ALG_EC_DH, keys));
            this.deriveBits.push(EcDHTest.DeriveBits(ALG_EC_DH, keys));

            this.run();
        });
    }

    static DeriveKey(alg: string, keys: CryptoKeyPair[]) {
        const cases: DeriveKeyCase[] = [];

        keys.forEach(keyPair => {

            // AES algs
            ["AES-CBC", "AES-CTR", "AES-GCM", "AES-CFB-8"].forEach(alg => {
                // AES alg length
                [128, 196, 256].forEach(algLen => {
                    const keyAlg: any = keyPair.privateKey.algorithm;
                    cases.push(new DeriveKeyCase({
                        name: `deriveKey ${keyAlg.name}-${keyAlg.namedCurve} ${alg}-${algLen}`,
                        params: {
                            algorithm: {
                                name: keyPair.privateKey.algorithm.name,
                                namedCurve: keyAlg.namedCurve,
                                public: keyPair.publicKey
                            },
                            derivedKeyAlg: {
                                name: alg,
                                length: algLen
                            },
                            key: keyPair.privateKey,
                            keyUsage: ["encrypt", "decrypt"]
                        }
                    }));
                });
            });
        });
        return cases;
    }

    static DeriveBits(alg: string, keys: CryptoKeyPair[]) {
        const cases: DeriveBitsCase[] = [];

        keys.forEach(keyPair => {

            // bitsLength
            [128, 196, 256].forEach(bitsLength => {
                const keyAlg: any = keyPair.privateKey.algorithm;
                cases.push(new DeriveBitsCase({
                    name: `deriveKey ${keyAlg.name}-${keyAlg.namedCurve} `,
                    params: {
                        algorithm: {
                            name: keyPair.privateKey.algorithm.name,
                            namedCurve: keyAlg.namedCurve,
                            public: keyPair.publicKey
                        },
                        key: keyPair.privateKey,
                        bitsLength: bitsLength
                    }
                }));
            });
        });

        return cases;
    }
}