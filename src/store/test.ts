import {BaseStore} from "./store";

declare var Promise: PromiseConstructorLike;

export interface TestState {

}

export class Test extends BaseStore<TestState> {

    constructor() {
        super();
    }
}

export interface TestCaseParams {
    [key: string]: any;
}

export enum CaseStatus {
    error,
    success,
    warning,
    working,
}

export interface TestCaseState {
    name?: string;
    params?: TestCaseParams;
    status?: CaseStatus;
    duration?: number;
    message?: string;
    stack?: string;
}

export interface TestCaseCollectionState<T> {
    items?: T[];
    complited?: number;
}

export class TestCaseCollection<T extends BaseStore<any>> extends BaseStore<TestCaseCollectionState<T>> {

    constructor(cases: T[]) {
        super({
            items: cases,
            complited: 0
        });
        this.connectToCases(cases);
    }

    protected connectToCases(cases: T[]) {
        for (let item of cases) {
            item.on("change", this.onCaseChanged.bind(this, item));
        }
    }

    push(cases: T[]) {
        for (let i in cases) {
            this.state.items.push(cases[i]);
        }
        this.connectToCases(cases);
        this.setState({ items: this.state.items });
    }

    onCaseChanged(item: T) {
        if (item.state.status === CaseStatus.success || item.state.status === CaseStatus.error) {
            console.log(item.state.name);
            console.log(`  Status:${CaseStatus[item.state.status]}`);
            this.setState({
                complited: this.state.complited + 1
            });
            this.run();
        }
        else {
            this.setState();
        }
    }

    run() {
        const state = this.state;
        const items = state.items;
        if (items.length && state.complited !== items.length) {
            (items[state.complited] as any).run();
        }
        else {
            this.emit("end", this);
        }
    }
}

export interface AlgorithmTestState {
    name?: string;
}

export class AlgorithmTest extends BaseStore<AlgorithmTestState> {

    generateKey: TestCaseCollection<GenerateKeyCase>;
    exportKey: TestCaseCollection<ExportKeyCase>;
    sign: TestCaseCollection<SignCase>;
    encrypt: TestCaseCollection<EncryptCase>;
    digest: TestCaseCollection<DigestCase>;
    deriveKey: TestCaseCollection<DeriveKeyCase>;
    deriveBits: TestCaseCollection<DeriveBitsCase>;
    wrap: TestCaseCollection<WrapCase>;

    constructor(name: string) {
        super({
            name: name,
        });

        this.generateKey = new TestCaseCollection([]);
        this.exportKey = new TestCaseCollection([]);
        this.sign = new TestCaseCollection([]);
        this.encrypt = new TestCaseCollection([]);
        this.digest = new TestCaseCollection([]);
        this.deriveKey = new TestCaseCollection([]);
        this.deriveBits = new TestCaseCollection([]);
        this.wrap = new TestCaseCollection([]);

        this.onCaseChange = this.onCaseChange.bind(this);

        // connect to generate key
        if (this.generateKey) {
            this.generateKey.on("change", this.onCaseChange);
        }
    }

    getGanratedKeys() {
        let res: (CryptoKey | CryptoKeyPair)[] = [];
        for (let _case of this.generateKey.state.items) {
            let key = _case.state.key;
            if (key) {
                if ("privateKey" in key) {
                    res.push(key as CryptoKeyPair);
                }
                else {
                    res.push(key as CryptoKey);
                }
            }
        }
        return res;
    }

    onCaseChange(item: TestCaseCollectionState<any>) {
        if (this.generateKey) {
            let done = true;
            for (let i in this.generateKey) {
                let state = this.generateKey.state;
                if (state.complited !== state.items.length) {
                    done = false;
                    break;
                }
            }
            if (done) {
                const keys = this.getGanratedKeys();
                if (keys)
                    this.emit("generate", this.getGanratedKeys());
            }
        }
    }

    protected getAllTests() {
        let tests: TestCaseCollection<any>[] = [];
        tests.push(this.generateKey);
        tests.push(this.exportKey);
        tests.push(this.sign);
        tests.push(this.encrypt);
        tests.push(this.digest);
        tests.push(this.deriveKey);
        tests.push(this.deriveBits);
        tests.push(this.wrap);

        return tests;
    }

    protected countDuaration(tests: TestCaseCollection<any>) {
        let res = 0;
        const durations = tests.state.items.map(item => item.state.duration);
        if (durations.length)
            res = durations.reduce((prev, cur) => prev += cur);
        return res;
    }

    protected countStatus(tests: TestCaseCollection<any>, status: CaseStatus) {
        let res = tests.state.items.filter(item => item.state.status === status).length;
        return res;
    }

    report() {
        // total duration
        let duration = this.getAllTests().map(test => this.countDuaration(test)).reduce((p, c) => p + c);
        let success = this.getAllTests().map(test => this.countStatus(test, CaseStatus.success)).reduce((p, c) => p + c);
        let error = this.getAllTests().map(test => this.countStatus(test, CaseStatus.error)).reduce((p, c) => p + c);

        return { duration, success, error };
    }
    run() {
        this.getAllTests().forEach(test => test.run());
    }

}

export interface GenerateKeyCaseState extends TestCaseState {
    params?: {
        algorithm: any;
        extractble: boolean;
        keyUsages: string[];
    };
    key?: CryptoKey | CryptoKeyPair;
}
export class GenerateKeyCase extends BaseStore<GenerateKeyCaseState> {
    constructor(state: GenerateKeyCaseState) {
        state.duration = 0;
        super(state);
    }

    run() {
        const params = this.state.params;
        const startAt = new Date().getTime();
        let promise = new Promise((resolve, reject) => {
            this.setState({ status: CaseStatus.working });
            crypto.subtle.generateKey(params.algorithm, params.extractble, params.keyUsages)
                .then((key: CryptoKey | CryptoKeyPair) => {
                    const endAt = new Date().getTime();
                    this.setState({
                        status: CaseStatus.success,
                        key: key,
                        duration: endAt - startAt
                    });
                    resolve();
                })
                .catch((e: Error) => {
                    const endAt = new Date().getTime();
                    this.setState({
                        status: CaseStatus.error,
                        message: e.message,
                        stack: e.stack,
                        duration: endAt - startAt
                    });
                    resolve();
                });
        });
        (promise as any).catch((e: Error) => {
            const endAt = new Date().getTime();
            this.setState({
                status: CaseStatus.error,
                message: e.message,
                stack: e.stack,
                duration: endAt - startAt
            });
        });
    }
}

export interface ExportKeyCaseState extends TestCaseState {
    params?: {
        key: CryptoKey,
        format: string;
        algorithm: any;
        extractble: boolean;
        keyUsages: string[];
    };
    key?: CryptoKey | CryptoKeyPair;
}
export class ExportKeyCase extends BaseStore<ExportKeyCaseState> {
    constructor(state: ExportKeyCaseState) {
        state.duration = 0;
        super(state);
    }

    run() {
        const params = this.state.params;
        const startAt = new Date().getTime();
        let promise = new Promise((resolve, reject) => {
            this.setState({ status: CaseStatus.working });
            crypto.subtle.exportKey(params.format, params.key)
                .then((data: any) => {
                    return crypto.subtle.importKey(params.format, data, params.algorithm, params.extractble, params.keyUsages);
                })
                .then((key: CryptoKey) => {
                    const endAt = new Date().getTime();
                    this.setState({
                        status: CaseStatus.success,
                        duration: endAt - startAt
                    });
                    resolve();
                })
                .catch((e: Error) => {
                    const endAt = new Date().getTime();
                    this.setState({
                        status: CaseStatus.error,
                        message: e.message,
                        stack: e.stack,
                        duration: endAt - startAt
                    });
                    resolve();
                });
        });
        (promise as any).catch((e: Error) => {
            const endAt = new Date().getTime();
            this.setState({
                status: CaseStatus.error,
                message: e.message,
                stack: e.stack,
                duration: endAt - startAt
            });
        });
    }
}

export interface SignCaseState extends TestCaseState {
    params?: {
        signKey: CryptoKey,
        verifyKey: CryptoKey,
        algorithm: any;
    };
}
export class SignCase extends BaseStore<SignCaseState> {
    constructor(state: SignCaseState) {
        state.duration = 0;
        super(state);
    }

    run() {
        const params = this.state.params;
        const startAt = new Date().getTime();
        let promise = new Promise((resolve, reject) => {
            this.setState({ status: CaseStatus.working });
            crypto.subtle.sign(params.algorithm, params.signKey, new Uint8Array([1, 2, 3, 4, 5]))
                .then((data: any) => {
                    return crypto.subtle.verify(params.algorithm, params.verifyKey, data, new Uint8Array([1, 2, 3, 4, 5]));
                })
                .then((key: CryptoKey) => {
                    const endAt = new Date().getTime();
                    this.setState({
                        status: CaseStatus.success,
                        duration: endAt - startAt
                    });
                    resolve();
                })
                .catch((e: Error) => {
                    const endAt = new Date().getTime();
                    this.setState({
                        status: CaseStatus.error,
                        message: e.message,
                        stack: e.stack,
                        duration: endAt - startAt
                    });
                    resolve();
                });
        });
        (promise as any).catch((e: Error) => {
            const endAt = new Date().getTime();
            this.setState({
                status: CaseStatus.error,
                message: e.message,
                stack: e.stack,
                duration: endAt - startAt
            });
        });
    }
}

export interface EncryptCaseState extends TestCaseState {
    params?: {
        encryptKey: CryptoKey,
        decryptKey: CryptoKey,
        algorithm: any;
    };
}
export class EncryptCase extends BaseStore<EncryptCaseState> {
    constructor(state: EncryptCaseState) {
        state.duration = 0;
        super(state);
    }

    run() {
        const params = this.state.params;
        const startAt = new Date().getTime();
        let promise = new Promise((resolve, reject) => {
            this.setState({ status: CaseStatus.working });
            crypto.subtle.encrypt(params.algorithm, params.encryptKey, new Uint8Array([1, 2, 3, 4, 5]))
                .then((data: any) => {
                    return crypto.subtle.decrypt(params.algorithm, params.decryptKey, data);
                })
                .then((key: CryptoKey) => {
                    const endAt = new Date().getTime();
                    this.setState({
                        status: CaseStatus.success,
                        duration: endAt - startAt
                    });
                    resolve();
                })
                .catch((e: Error) => {
                    const endAt = new Date().getTime();
                    this.setState({
                        status: CaseStatus.error,
                        message: e.message,
                        stack: e.stack,
                        duration: endAt - startAt
                    });
                    resolve();
                });
        });
        (promise as any).catch((e: Error) => {
            const endAt = new Date().getTime();
            this.setState({
                status: CaseStatus.error,
                message: e.message,
                stack: e.stack,
                duration: endAt - startAt
            });
        });
    }
}

export interface DigestCaseState extends TestCaseState {
    params?: {
        algorithm: any;
    };
}
export class DigestCase extends BaseStore<DigestCaseState> {
    constructor(state: DigestCaseState) {
        state.duration = 0;
        super(state);
    }

    run() {
        const params = this.state.params;
        const startAt = new Date().getTime();
        let promise = new Promise((resolve, reject) => {
            this.setState({ status: CaseStatus.working });
            crypto.subtle.digest(params.algorithm, new Uint8Array([1, 2, 3, 4, 5]))
                .then((data: ArrayBuffer) => {
                    const endAt = new Date().getTime();
                    this.setState({
                        status: CaseStatus.success,
                        duration: endAt - startAt
                    });
                    resolve();
                })
                .catch((e: Error) => {
                    const endAt = new Date().getTime();
                    this.setState({
                        status: CaseStatus.error,
                        message: e.message,
                        stack: e.stack,
                        duration: endAt - startAt
                    });
                    resolve();
                });
        });
        (promise as any).catch((e: Error) => {
            const endAt = new Date().getTime();
            this.setState({
                status: CaseStatus.error,
                message: e.message,
                stack: e.stack,
                duration: endAt - startAt
            });
        });
    }
}

export interface DeriveKeyCaseState extends TestCaseState {
    params?: {
        algorithm: any;
        key: CryptoKey;
        derivedKeyAlg: any;
        keyUsage: string[];
    };
}
export class DeriveKeyCase extends BaseStore<DeriveKeyCaseState> {
    constructor(state: DeriveKeyCaseState) {
        state.duration = 0;
        super(state);
    }

    run() {
        const params = this.state.params;
        const startAt = new Date().getTime();
        let promise = new Promise((resolve, reject) => {
            this.setState({ status: CaseStatus.working });
            crypto.subtle.deriveKey(params.algorithm, params.key, params.derivedKeyAlg, true, params.keyUsage)
                .then((data: ArrayBuffer) => {
                    const endAt = new Date().getTime();
                    this.setState({
                        status: CaseStatus.success,
                        duration: endAt - startAt
                    });
                    resolve();
                })
                .catch((e: Error) => {
                    const endAt = new Date().getTime();
                    this.setState({
                        status: CaseStatus.error,
                        message: e.message,
                        stack: e.stack,
                        duration: endAt - startAt
                    });
                    resolve();
                });
        });
        (promise as any).catch((e: Error) => {
            const endAt = new Date().getTime();
            this.setState({
                status: CaseStatus.error,
                message: e.message,
                stack: e.stack,
                duration: endAt - startAt
            });
        });
    }
}

export interface DeriveBitsCaseState extends TestCaseState {
    params?: {
        algorithm: any;
        key: CryptoKey;
        bitsLength: number
    };
}
export class DeriveBitsCase extends BaseStore<DeriveBitsCaseState> {
    constructor(state: DeriveBitsCaseState) {
        state.duration = 0;
        super(state);
    }

    run() {
        const params = this.state.params;
        const startAt = new Date().getTime();
        let promise = new Promise((resolve, reject) => {
            this.setState({ status: CaseStatus.working });
            crypto.subtle.deriveBits(params.algorithm, params.key, params.bitsLength)
                .then((data: ArrayBuffer) => {
                    const endAt = new Date().getTime();
                    this.setState({
                        status: CaseStatus.success,
                        duration: endAt - startAt
                    });
                    resolve();
                })
                .catch((e: Error) => {
                    const endAt = new Date().getTime();
                    this.setState({
                        status: CaseStatus.error,
                        message: e.message,
                        stack: e.stack,
                        duration: endAt - startAt
                    });
                    resolve();
                });
        });
        (promise as any).catch((e: Error) => {
            const endAt = new Date().getTime();
            this.setState({
                status: CaseStatus.error,
                message: e.message,
                stack: e.stack,
                duration: endAt - startAt
            });
        });
    }
}

export interface WrapCaseState extends TestCaseState {
    params?: {
        format: string;
        algorithm: any;
        key: CryptoKey;
        wrappingKey: CryptoKey;
        unwrappedAlgorithm: any;
        unwrappingKey: CryptoKey;
        keyUsage: string[];
    };
}
export class WrapCase extends BaseStore<WrapCaseState> {
    constructor(state: WrapCaseState) {
        state.duration = 0;
        super(state);
    }

    run() {
        const params = this.state.params;
        const startAt = new Date().getTime();
        let promise = new Promise((resolve, reject) => {
            this.setState({ status: CaseStatus.working });
            crypto.subtle.wrapKey(params.format, params.key, params.wrappingKey, params.algorithm)
                .then((data: ArrayBuffer) => {
                    return crypto.subtle.unwrapKey(params.format, new Uint8Array(data), params.unwrappingKey, params.algorithm, params.unwrappedAlgorithm, true, params.keyUsage);
                })
                .then((key: CryptoKey) => {
                    const endAt = new Date().getTime();
                    this.setState({
                        status: CaseStatus.success,
                        duration: endAt - startAt
                    });
                    resolve();
                })
                .catch((e: Error) => {
                    const endAt = new Date().getTime();
                    this.setState({
                        status: CaseStatus.error,
                        message: e.message,
                        stack: e.stack,
                        duration: endAt - startAt
                    });
                    resolve();
                });
        });
        (promise as any).catch((e: Error) => {
            const endAt = new Date().getTime();
            this.setState({
                status: CaseStatus.error,
                message: e.message,
                stack: e.stack,
                duration: endAt - startAt
            });
        });
    }
}