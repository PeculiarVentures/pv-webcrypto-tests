import {AlgorithmTest, TestCaseCollection, DigestCase} from "./store/test";

export class ShaTest extends AlgorithmTest {

    constructor() {
        super("SHA");

        this.digest.push(
            ["SHA-1", "SHA-256", "SHA-384", "SHA-512"].map(hash => {
                return new DigestCase({
                    name: `digest ${hash}`,
                    params: {
                        algorithm: {
                            name: hash
                        }
                    }
                });
            })
        );
    }

}