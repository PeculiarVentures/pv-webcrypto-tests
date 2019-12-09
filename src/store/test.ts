import { BaseStore, BaseStoreCollection, IBaseStoreCollectionState } from "./store";

export interface ITestCaseState {
    name?: string;
    params?: ITestCaseParams;
    status?: CaseStatus;
    duration?: number;
    message?: string;
    stack?: string;
}

export abstract class TestCase<T extends ITestCaseState> extends BaseStore<T>  {
    public abstract run(): void;
}

export interface ITestCaseParams {
    [key: string]: any;
}

export enum CaseStatus {
    ready,
    error,
    success,
    warning,
    working,
}

export interface ITestCaseCollectionState<I extends TestCase<any>> extends IBaseStoreCollectionState<I> {
    completed: number;
}

export class TestCaseCollection<I extends TestCase<any>> extends BaseStoreCollection<I, ITestCaseCollectionState<I>> {

    public static defaultState = {
        ...BaseStoreCollection.defaultState,
        completed: 0,
    };

    constructor(cases: I[]) {
        const state = Object.assign({}, TestCaseCollection.defaultState, { items: cases || [], completed: 0 });
        super(state);
        this.connectToCases(this.state.items!);
    }

    public add(item: I) {
        super.add(item);
        this.connectToCases([item]);
    }
    public addRange(items: I[]) {
        super.addRange(items);
        this.connectToCases(items);
    }

    public onCaseChanged(item: I) {
        if (item.state.status === CaseStatus.success || item.state.status === CaseStatus.error) {
            // console.log(item.state.name);
            // console.log(`  Status:${CaseStatus[item.state.status]}`);
            this.setState({
                completed: this.state.completed + 1,
            });
            this.run();
        } else {
            this.setState();
        }
    }

    public run() {
        const state = this.state;
        if (this.length && state.completed !== this.length) {
            const testCase = this.items(state.completed);
            testCase.run();
        } else {
            this.emit("end", this);
        }
    }

    protected connectToCases(cases: I[]) {
        for (const item of cases) {
            item.on("change", this.onCaseChanged.bind(this, item));
        }
    }
}

interface IAlgorithmTestState extends ITestCaseState {
    selected: boolean;
}

function assertArg<T>(obj: T | undefined | null, message: string): asserts obj is T {
    if (!obj) {
        throw new Error(message);
    }
}

function assertParams<T>(obj: T | undefined | null, name: string): asserts obj is T {
    assertArg(obj, `Params of ${name} are empty`);
}

export class AlgorithmTest extends TestCase<IAlgorithmTestState> {

    public generateKey: TestCaseCollection<GenerateKeyCase>;
    public exportKey: TestCaseCollection<ExportKeyCase>;
    public sign: TestCaseCollection<SignCase>;
    public encrypt: TestCaseCollection<EncryptCase>;
    public digest: TestCaseCollection<DigestCase>;
    public deriveKey: TestCaseCollection<DeriveKeyCase>;
    public deriveBits: TestCaseCollection<DeriveBitsCase>;
    public wrap: TestCaseCollection<WrapCase>;

    constructor(name: string) {
        super({
            name,
            selected: true,
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

    public on(event: "change", cb: (state: IAlgorithmTestState) => void): this;
    public on(event: "generate", cb: (keys: TestCaseGeneratedKey[]) => void): this;
    public on(event: string, cb: (...args: any[]) => void): this;
    public on(event: string, cb: (...args: any[]) => void) {
        return super.on(event, cb);
    }

    public once(event: "change", cb: (state: IAlgorithmTestState) => void): this;
    public once(event: "generate", cb: (keys: TestCaseGeneratedKey[]) => void): this;
    public once(event: string, cb: (...args: any[]) => void): this;
    public once(event: string, cb: (...args: any[]) => void) {
        return super.once(event, cb);
    }

    public getGeneratedKeys() {
        return this.generateKey
            .filter((o) => !!o.state.key)
            .map((o) => {
                assertArg(o.state.params, "'params' in state is empty");
                return {
                    key: o.state.key,
                    algorithm: o.state.params.algorithm,
                };
            });
    }

    public onCaseChange(item: ITestCaseCollectionState<any>) {
        if (this.generateKey) {
            let done = true;
            const state = this.generateKey.state;
            if (state.completed !== state.items.length) {
                done = false;
            }
            if (done) {
                const keys = this.getGeneratedKeys();
                if (keys) {
                    this.emit("generate", keys);
                }
            }
        }
    }

    public report() {
        // total duration
        const duration = this.getAllTests()
            .map((test) => this.countDuration(test))
            .reduce((p, c) => p + c);
        const success = this.getAllTests()
            .map((test) => this.countStatus(test, CaseStatus.success))
            .reduce((p, c) => p + c);
        const error = this.getAllTests()
            .map((test) => this.countStatus(test, CaseStatus.error))
            .reduce((p, c) => p + c);

        return { duration, success, error };
    }

    public run() {
        this.getAllTests().forEach((test) => test.run());
    }

    protected getAllTests() {
        const tests: Array<TestCaseCollection<any>> = [];
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

    protected countDuration(tests: TestCaseCollection<any>) {
        let res = 0;
        const durations = tests.map((item) => item.state.duration);
        if (durations.length) {
            res = durations.reduce((prev, cur) => prev += cur);
        }
        return res;
    }

    protected countStatus(tests: TestCaseCollection<any>, status: CaseStatus) {
        const res = tests.filter((item) => item.state.status === status).length;
        return res;
    }

}

export interface IGenerateKeyCaseState extends ITestCaseState {
    params?: {
        algorithm: any;
        extractable: boolean;
        keyUsages: string[];
    };
    key?: CryptoKey | CryptoKeyPair;
}
export class GenerateKeyCase extends TestCase<IGenerateKeyCaseState> {
    constructor(state: IGenerateKeyCaseState) {
        state.duration = 0;
        super(state);
    }

    public run() {
        const params = this.state.params;
        const startAt = new Date().getTime();

        (async () => {
            assertParams(params, "GenerateKeyCase");
            this.setState({ status: CaseStatus.working });
            const keys = crypto.subtle.generateKey(params.algorithm, params.extractable, params.keyUsages);
            return keys;
        })()
            .then((key: CryptoKey | CryptoKeyPair) => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.success,
                    key,
                    duration: endAt - startAt,
                });
            })
            .catch((e) => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.error,
                    message: e.message,
                    stack: e.stack,
                    duration: endAt - startAt,
                });
            });
    }
}

export interface IExportKeyCaseState extends ITestCaseState {
    params?: {
        key: CryptoKey,
        format: string;
        algorithm: any;
        extractable: boolean;
        keyUsages: string[];
    };
    key?: CryptoKey | CryptoKeyPair;
}
export class ExportKeyCase extends TestCase<IExportKeyCaseState> {
    constructor(state: IExportKeyCaseState) {
        state.duration = 0;
        super(state);
    }

    public run() {
        const params = this.state.params;
        const startAt = new Date().getTime();
        (async () => {
            assertParams(params, "ExportKeyCase");
            this.setState({ status: CaseStatus.working });
            const data = await crypto.subtle.exportKey(params.format, params.key);
            await crypto.subtle.importKey(params.format, data, params.algorithm, params.extractable, params.keyUsages);
        })()
            .then(() => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.success,
                    duration: endAt - startAt,
                });
            })
            .catch((e) => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.error,
                    message: e.message,
                    stack: e.stack,
                    duration: endAt - startAt,
                });
            });
    }
}

export interface ISignCaseState extends ITestCaseState {
    params?: {
        signKey: CryptoKey,
        verifyKey: CryptoKey,
        algorithm: any;
    };
}
export class SignCase extends BaseStore<ISignCaseState> {
    constructor(state: ISignCaseState) {
        state.duration = 0;
        super(state);
    }

    public run() {
        const params = this.state.params;
        const startAt = new Date().getTime();

        (async () => {
            assertParams(params, "SignCase");
            this.setState({ status: CaseStatus.working });
            const signature = await crypto.subtle.sign(
                params.algorithm,
                params.signKey,
                new Uint8Array([1, 2, 3, 4, 5]));

            const ok = await crypto.subtle.verify(
                params.algorithm,
                params.verifyKey,
                signature,
                new Uint8Array([1, 2, 3, 4, 5]));

            if (!ok) {
                throw new Error("Signature is invalid");
            }
        })()
            .then((key) => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.success,
                    duration: endAt - startAt,
                });
                return;
            })
            .catch((e) => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.error,
                    message: e.message,
                    stack: e.stack,
                    duration: endAt - startAt,
                });
            });

    }
}

export interface IEncryptCaseState extends ITestCaseState {
    params?: {
        encryptKey: CryptoKey,
        decryptKey: CryptoKey,
        algorithm: any;
    };
}
export class EncryptCase extends BaseStore<IEncryptCaseState> {
    constructor(state: IEncryptCaseState) {
        state.duration = 0;
        super(state);
    }

    public run() {
        const params = this.state.params;
        const startAt = new Date().getTime();

        (async () => {
            assertParams(params, "EncryptCase");
            this.setState({ status: CaseStatus.working });
            const enc = await crypto.subtle.encrypt(
                params.algorithm,
                params.encryptKey,
                new Uint8Array([1, 2, 3, 4, 5]));

            const dec = await crypto.subtle.decrypt(
                params.algorithm,
                params.decryptKey,
                enc);
        })()
            .then(() => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.success,
                    duration: endAt - startAt,
                });
            })
            .catch((e) => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.error,
                    message: e.message,
                    stack: e.stack,
                    duration: endAt - startAt,
                });
            });

    }
}

export interface IDigestCaseState extends ITestCaseState {
    params?: {
        algorithm: any;
    };
}
export class DigestCase extends BaseStore<IDigestCaseState> {
    constructor(state: IDigestCaseState) {
        state.duration = 0;
        super(state);
    }

    public run() {
        const params = this.state.params;
        const startAt = new Date().getTime();

        (async () => {
            assertParams(params, "DigestCase");
            this.setState({ status: CaseStatus.working });
            const data = await crypto.subtle.digest(params.algorithm, new Uint8Array([1, 2, 3, 4, 5]));
            if (!data.byteLength) {
                throw new Error("Wrong type of digest function result");
            }
        })()
            .then(() => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.success,
                    duration: endAt - startAt,
                });
            })
            .catch((e) => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.error,
                    message: e.message,
                    stack: e.stack,
                    duration: endAt - startAt,
                });
            });

    }
}

export interface IDeriveKeyCaseState extends ITestCaseState {
    params?: {
        algorithm: any;
        key: CryptoKey;
        derivedKeyAlg: any;
        keyUsage: string[];
    };
}
export class DeriveKeyCase extends BaseStore<IDeriveKeyCaseState> {
    constructor(state: IDeriveKeyCaseState) {
        state.duration = 0;
        super(state);
    }

    public run() {
        const params = this.state.params;
        const startAt = new Date().getTime();
        (async () => {
            assertParams(params, "DeriveKeyCase");
            this.setState({ status: CaseStatus.working });
            const data = await crypto.subtle.deriveKey(
                params.algorithm,
                params.key,
                params.derivedKeyAlg,
                true,
                params.keyUsage);
        })()
            .then(() => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.success,
                    duration: endAt - startAt,
                });
            })
            .catch((e) => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.error,
                    message: e.message,
                    stack: e.stack,
                    duration: endAt - startAt,
                });
            });

    }
}

export interface IDeriveBitsCaseState extends ITestCaseState {
    params?: {
        algorithm: any;
        key: CryptoKey;
        bitsLength: number
    };
}
export class DeriveBitsCase extends BaseStore<IDeriveBitsCaseState> {
    constructor(state: IDeriveBitsCaseState) {
        state.duration = 0;
        super(state);
    }

    public run() {
        const params = this.state.params;
        const startAt = new Date().getTime();
        (async () => {
            assertParams(params, "DeriveBitsCase");
            this.setState({ status: CaseStatus.working });
            const data = await crypto.subtle.deriveBits(params.algorithm, params.key, params.bitsLength);
        })()
            .then(() => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.success,
                    duration: endAt - startAt,
                });
            })
            .catch((e) => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.error,
                    message: e.message,
                    stack: e.stack,
                    duration: endAt - startAt,
                });
            });
    }
}

export interface IWrapCaseState extends ITestCaseState {
    params?: {
        format: string;
        algorithm: any;
        key: CryptoKey;
        wrappingKey: CryptoKey;
        unwrappingKey: CryptoKey;
    };
}
export class WrapCase extends BaseStore<IWrapCaseState> {
    constructor(state: IWrapCaseState) {
        state.duration = 0;
        super(state);
    }

    public run() {
        const params = this.state.params;
        const startAt = new Date().getTime();
        (async () => {
            assertParams(params, "WrapCase");
            this.setState({ status: CaseStatus.working });
            const data = await crypto.subtle.wrapKey(params.format, params.key, params.wrappingKey, params.algorithm);

            await crypto.subtle.unwrapKey(
                params.format,
                new Uint8Array(data),
                params.unwrappingKey,
                params.algorithm,
                params.key.algorithm as any,
                true,
                params.key.usages);
        })()
            .then(() => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.success,
                    duration: endAt - startAt,
                });
            })
            .catch((e) => {
                const endAt = new Date().getTime();
                this.setState({
                    status: CaseStatus.error,
                    message: e.message,
                    stack: e.stack,
                    duration: endAt - startAt,
                });
            });

    }
}
