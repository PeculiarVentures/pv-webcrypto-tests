import { BaseStore, BaseStoreCollection, BaseStoreCollectionState } from "./store";

export interface TestCaseState {
    name?: string;
    params?: TestCaseParams;
    status?: CaseStatus;
    duration?: number;
    message?: string;
    stack?: string;
}

export abstract class TestCase<T extends TestCaseState> extends BaseStore<T>  {

    abstract run(): void;

}

export interface TestCaseParams {
    [key: string]: any;
}

export enum CaseStatus {
    ready,
    error,
    success,
    warning,
    working,
}

export interface TestCaseCollectionState<I extends TestCase<any>> extends BaseStoreCollectionState<I> {
    complited?: number;
}

export class TestCaseCollection<I extends TestCase<any>> extends BaseStoreCollection<I, TestCaseCollectionState<I>> {

    static defaultState = {
        complitetd: 0
    };

    constructor(cases: I[]) {
        const _state = Object.assign({}, TestCaseCollection.defaultState, { items: cases || [], complited: 0 });
        super(_state);
        this.connectToCases(this.state.items!);
    }

    protected connectToCases(cases: I[]) {
        for (let item of cases) {
            item.on("change", this.onCaseChanged.bind(this, item));
        }
    }

    add(item: I) {
        super.add(item);
        this.connectToCases([item]);
    }
    addRange(items: I[]) {
        super.addRange(items);
        this.connectToCases(items);
    }

    onCaseChanged(item: I) {
        if (item.state.status === CaseStatus.success || item.state.status === CaseStatus.error) {
            console.log(item.state.name);
            console.log(`  Status:${CaseStatus[item.state.status]}`);
            this.setState({
                complited: this.state.complited + 1
            });
            this.run();
        }
        else
            this.setState();
    }

    run() {
        const state = this.state;
        if (this.length && state.complited !== this.length) {
            const testCase = this.items(state.complited!);
            testCase.run();
        }
        else {
            this.emit("end", this);
        }
    }
}

interface AlgorithmTestState extends TestCaseState {
}

export class AlgorithmTest extends TestCase<AlgorithmTestState> {

    generateKey: TestCaseCollection<GenerateKeyCase>;
    exportKey: TestCaseCollection<ExportKeyCase>;
    sign: TestCaseCollection<SignCase>;
    encrypt: TestCaseCollection<EncryptCase>;
    digest: TestCaseCollection<DigestCase>;
    deriveKey: TestCaseCollection<DeriveKeyCase>;
    deriveBits: TestCaseCollection<DeriveBitsCase>;
    wrap: TestCaseCollection<WrapCase>;

    on(event: "change", cb: (state: AlgorithmTestState) => void): this;
    on(event: "generate", cb: (keys: TestCaseGeneratedKey[]) => void): this;
    on(event: string, cb: Function): this;
    on(event: string, cb: Function) {
        return super.on(event, cb);
    }

    once(event: "change", cb: (state: AlgorithmTestState) => void): this;
    once(event: "generate", cb: (keys: TestCaseGeneratedKey[]) => void): this;
    once(event: string, cb: Function): this;
    once(event: string, cb: Function) {
        return super.once(event, cb);
    }

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
        return this.generateKey
            .filter(_case => !!_case.state.key)
            .map(_case => {
                return {
                    key: _case.state.key!,
                    algorithm: _case.state.params!.algorithm
                };
            });
    }

    onCaseChange(item: TestCaseCollectionState<any>) {
        if (this.generateKey) {
            let done = true;
            for (let i in this.generateKey) {
                let state = this.generateKey.state;
                if (state.complited !== state.items!.length) {
                    done = false;
                    break;
                }
            }
            if (done) {
                const keys = this.getGanratedKeys();
                if (keys)
                    this.emit("generate", keys);
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
        const durations = tests.map(item => item.state.duration);
        if (durations.length)
            res = durations.reduce((prev, cur) => prev += cur);
        return res;
    }

    protected countStatus(tests: TestCaseCollection<any>, status: CaseStatus) {
        let res = tests.filter(item => item.state.status === status).length;
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
export class GenerateKeyCase extends TestCase<GenerateKeyCaseState> {
    constructor(state: GenerateKeyCaseState) {
        state.duration = 0;
        super(state);
    }

    run() {
        const params = this.state.params;
        if (!params) throw new Error("Params of GenerateKeyCase are empty");
        const startAt = new Date().getTime();
        Promise.resolve()
            .then(() => {
                this.setState({ status: CaseStatus.working });
                return crypto.subtle.generateKey(params.algorithm, params.extractble, params.keyUsages);
            })
            .then((key: CryptoKey | CryptoKeyPair) => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.success,
                    key: key,
                    duration: endAt - startAt
                });
            })
            .catch(e => {
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
export class ExportKeyCase extends TestCase<ExportKeyCaseState> {
    constructor(state: ExportKeyCaseState) {
        state.duration = 0;
        super(state);
    }

    run() {
        const params = this.state.params;
        const startAt = new Date().getTime();
        Promise.resolve()
            .then(() => {
                if (!params) throw new Error("Params of ExportKeyCase are empty");
                this.setState({ status: CaseStatus.working });
                return crypto.subtle.exportKey(params.format, params.key);
            })
            .then((data: any) => {
                return crypto.subtle.importKey(params!.format, data, params!.algorithm, params!.extractble, params!.keyUsages);
            })
            .then((key: CryptoKey) => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.success,
                    duration: endAt - startAt
                });
            })
            .catch(e => {
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
        Promise.resolve()
            .then(() => {
                if (!params) throw new Error("Params of SignCase are empty");
                this.setState({ status: CaseStatus.working });
                return crypto.subtle.sign(params.algorithm, params.signKey, new Uint8Array([1, 2, 3, 4, 5]));
            })
            .then(data => {
                return crypto.subtle.verify(params!.algorithm, params!.verifyKey, data, new Uint8Array([1, 2, 3, 4, 5]));
            })
            .then(key => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.success,
                    duration: endAt - startAt
                });
                return;
            })
            .catch(e => {
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
        Promise.resolve()
            .then(() => {
                if (!params) throw new Error("Params of EncryptCase are empty");
                this.setState({ status: CaseStatus.working });
                return crypto.subtle.encrypt(params.algorithm, params.encryptKey, new Uint8Array([1, 2, 3, 4, 5]));
            })
            .then(data => {
                return crypto.subtle.decrypt(params!.algorithm, params!.decryptKey, data);
            })
            .then(key => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.success,
                    duration: endAt - startAt
                });
            })
            .catch(e => {
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
        Promise.resolve()
            .then(() => {
                if (!params) throw new Error("Params of DigestCase are empty");
                this.setState({ status: CaseStatus.working });
                return crypto.subtle.digest(params.algorithm, new Uint8Array([1, 2, 3, 4, 5]));
            })
            .then(data => {
                const endAt = new Date().getTime();
                if (!data.byteLength)
                    throw new Error("Wrong type of digest function result");
                this.setState({
                    status: CaseStatus.success,
                    duration: endAt - startAt
                });
            })
            .catch(e => {
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
        Promise.resolve()
            .then(() => {
                if (!params) throw new Error("Params of DeriveKeyCase are empty");
                this.setState({ status: CaseStatus.working });
                return crypto.subtle.deriveKey(params.algorithm, params.key, params.derivedKeyAlg, true, params.keyUsage);
            })
            .then(data => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.success,
                    duration: endAt - startAt
                });
            })
            .catch(e => {
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
        Promise.resolve()
            .then(() => {
                if (!params) throw new Error("Params of DeriveBitsCase are empty");
                this.setState({ status: CaseStatus.working });
                return crypto.subtle.deriveBits(params.algorithm, params.key, params.bitsLength);
            })
            .then(data => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.success,
                    duration: endAt - startAt
                });
            })
            .catch(e => {
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
        unwrappingKey: CryptoKey;
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
        Promise.resolve()
            .then(() => {
                if (!params) throw new Error("Params of DeriveBitsCase are empty");
                this.setState({ status: CaseStatus.working });
                return crypto.subtle.wrapKey(params.format, params.key, params.wrappingKey, params.algorithm);
            })
            .then(data => {
                return crypto.subtle.unwrapKey(params!.format, new Uint8Array(data), params!.unwrappingKey, params!.algorithm, params!.key.algorithm as any, true, params!.key.usages);
            })
            .then(key => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.success,
                    duration: endAt - startAt
                });
            })
            .catch(e => {
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