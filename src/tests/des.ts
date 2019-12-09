import { AlgorithmTest, EncryptCase, ExportKeyCase, GenerateKeyCase, SignCase, WrapCase } from "../store/test";

export enum DesAlgorithms {
    DES_CBC = "DES-CBC",
    DES_EDE3_CBC = "DES-EDE3-CBC",
}

function GenerateKey(name: DesAlgorithms, keyUsages: string[]) {
    const cases: GenerateKeyCase[] = [];

    const length = name === DesAlgorithms.DES_CBC
        ? 64
        : 192;
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

    return cases;
}

function ExportKey(keys: TestCaseGeneratedKey[]) {
    const cases: ExportKeyCase[] = [];

    keys.forEach((item) => {
        // format
        const algLength = (item.algorithm as AesKeyAlgorithm).length;
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

export class DesCbcTest extends AlgorithmTest {

    public static Encrypt(alg: string, keys: TestCaseGeneratedKey[]) {
        return keys.map((item) => {
            const key = item.key as CryptoKey;
            return new EncryptCase({
                name: `${alg} len:${(item.algorithm as any).length}`,
                params: {
                    encryptKey: key,
                    decryptKey: key,
                    algorithm: {
                        name: DesAlgorithms.DES_CBC,
                        iv: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
                    },
                },
            });
        });
    }

    public static Wrap(alg: string, keys: TestCaseGeneratedKey[]) {
        const cases: WrapCase[] = [];
        keys.forEach((item) => {
            const itemAlg = item.algorithm as AesKeyAlgorithm;
            const key = item.key as CryptoKey;
            // format
            ["jwk", "raw"].forEach((format) => {
                cases.push(new WrapCase({
                    name: `wrap ${alg} len:${itemAlg.length}`,
                    params: {
                        format,
                        key,
                        wrappingKey: key,
                        unwrappingKey: key,
                        algorithm: {
                            name: alg,
                            iv: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
                        },
                    },
                }));
            });
        });
        return cases;
    }
    constructor() {
        super(DesAlgorithms.DES_CBC);

        this.generateKey.addRange(GenerateKey(DesAlgorithms.DES_CBC, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        this.on("generate", (keys: TestCaseGeneratedKey[]) => {
            this.exportKey.addRange(ExportKey(keys));
            this.encrypt.addRange(DesCbcTest.Encrypt(DesAlgorithms.DES_CBC, keys));
            this.wrap.addRange(DesCbcTest.Wrap(DesAlgorithms.DES_CBC, keys));

            this.run();
        });
    }
}

export class DesEde3CbcTest extends AlgorithmTest {

    public static Encrypt(alg: string, keys: TestCaseGeneratedKey[]) {
        return keys.map((item) => {
            const key = item.key as CryptoKey;
            return new EncryptCase({
                name: `${alg} len:${(item.algorithm as any).length}`,
                params: {
                    encryptKey: key,
                    decryptKey: key,
                    algorithm: {
                        name: DesAlgorithms.DES_EDE3_CBC,
                        iv: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
                    },
                },
            });
        });
    }

    public static Wrap(alg: string, keys: TestCaseGeneratedKey[]) {
        const cases: WrapCase[] = [];
        keys.forEach((item) => {
            const itemAlg = item.algorithm as AesKeyAlgorithm;
            const key = item.key as CryptoKey;
            // format
            ["jwk", "raw"].forEach((format) => {
                cases.push(new WrapCase({
                    name: `wrap ${alg} len:${itemAlg.length}`,
                    params: {
                        format,
                        key,
                        wrappingKey: key,
                        unwrappingKey: key,
                        algorithm: {
                            name: alg,
                            iv: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
                        },
                    },
                }));
            });
        });
        return cases;
    }
    constructor() {
        super(DesAlgorithms.DES_EDE3_CBC);

        this.generateKey
            .addRange(GenerateKey(DesAlgorithms.DES_EDE3_CBC, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        this.on("generate", (keys: TestCaseGeneratedKey[]) => {
            this.exportKey.addRange(ExportKey(keys));
            this.encrypt.addRange(DesEde3CbcTest.Encrypt(DesAlgorithms.DES_EDE3_CBC, keys));
            this.wrap.addRange(DesEde3CbcTest.Wrap(DesAlgorithms.DES_EDE3_CBC, keys));

            this.run();
        });
    }
}
