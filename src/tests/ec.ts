import {AlgorithmTest, TestCaseCollection, GenerateKeyCase, ExportKeyCase, SignCase, DeriveKeyCase, DeriveBitsCase} from "../store/test";

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
        for (let keyType in item.key) {
            let key = (item.key as any)[keyType];
            // format
            ["jwk", keyType === "publicKey" ? "spki" : "pkcs8"].forEach(format => {
                cases.push(
                    new ExportKeyCase({
                        name: `${key.algorithm.name} curve:${(key as any).algorithm.namedCurve} format:${format}`,
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

export class EcDSATest extends AlgorithmTest {

    constructor() {
        super(ALG_EC_DSA);

        this.generateKey.addRange(GenerateKey(ALG_EC_DSA, ["sign", "verify"]));
        this.on("generate", keys  => {
            this.exportKey.addRange(ExportKey(keys));
            this.sign.addRange(EcDSATest.Sign(ALG_EC_DSA, keys));

            this.run();
        });

    }
    static Sign(alg: string, keys: TestCaseGeneratedKey[]) {
        let cases: SignCase[] = [];

        keys.forEach(item => {
            // hash
            ["SHA-1", "SHA-256", "SHA-384", "SHA-512"]
                .forEach(hash => {
                    const pkey = item.key as CryptoKeyPair;
                    cases.push(new SignCase({
                        name: `${alg} curve:${(item.algorithm as any).namedCurve} hash:${hash}`,
                        params: {
                            signKey: pkey.privateKey,
                            verifyKey: pkey.publicKey,
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
        this.generateKey.addRange(GenerateKey(ALG_EC_DH, ["deriveKey", "deriveBits"]));
        this.on("generate", keys => {
            this.exportKey.addRange(ExportKey(keys));
            this.deriveKey.addRange(EcDHTest.DeriveKey(ALG_EC_DH, keys));
            this.deriveBits.addRange(EcDHTest.DeriveBits(ALG_EC_DH, keys));

            this.run();
        });
    }

    static DeriveKey(alg: string, keys: TestCaseGeneratedKey[]) {
        const cases: DeriveKeyCase[] = [];

        keys.forEach(item => {

            // AES algs
            ["AES-CBC", "AES-GCM"].forEach(alg => {
                // AES alg length
                [128, 192, 256].forEach(algLen => {
                    const pkey = item.key as CryptoKeyPair;
                    const keyAlg: any = item.algorithm;
                    cases.push(new DeriveKeyCase({
                        name: `deriveKey ${keyAlg.name}-${keyAlg.namedCurve} ${alg}-${algLen}`,
                        params: {
                            algorithm: {
                                name: pkey.privateKey.algorithm.name,
                                namedCurve: keyAlg.namedCurve,
                                public: pkey.publicKey
                            },
                            derivedKeyAlg: {
                                name: alg,
                                length: algLen
                            },
                            key: pkey.privateKey,
                            keyUsage: ["encrypt", "decrypt"]
                        }
                    }));
                });
            });
        });
        return cases;
    }

    static DeriveBits(alg: string, keys: TestCaseGeneratedKey[]) {
        const cases: DeriveBitsCase[] = [];

        keys.forEach(item => {

            // bitsLength
            [128, 192, 256].forEach(bitsLength => {
                const pkey = item.key as CryptoKeyPair;
                const keyAlg: any = item.algorithm;
                cases.push(new DeriveBitsCase({
                    name: `deriveKey ${keyAlg.name}-${keyAlg.namedCurve} `,
                    params: {
                        algorithm: {
                            name: pkey.privateKey.algorithm.name,
                            namedCurve: keyAlg.namedCurve,
                            public: pkey.publicKey
                        },
                        key: pkey.privateKey,
                        bitsLength: bitsLength
                    }
                }));
            });
        });

        return cases;
    }
}