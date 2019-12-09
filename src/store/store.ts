import { EventEmitter } from "events";

export const STORE_EVENT_CHANGE = "change";

export interface IStoreOptions {
    /**
     * Filter of attribute names from State
     *
     * @type {string[]}
     */
    filter?: string[];
}

/**
 * Decorator to bind BaseStore to React component
 */
export function Store(options: IStoreOptions = {}): ClassDecorator {
    return (target: any) => {
        target.prototype.__onModelChange = function __onModelChange(this: React.Component, state: any) {
            let mustUpdate = false;
            if (options.filter) {
                for (const key in state) {
                    if (options.filter.indexOf(key) > -1) {
                        mustUpdate = true;
                    }
                }
            } else {
                mustUpdate = true;
            }

            if (mustUpdate) {
                this.setState({});
            }
        };

        const oldCompDidMount = target.prototype.componentDidMount;
        target.prototype.componentDidMount = function componentDidMount() {
            this.__onModelChange = this.__onModelChange.bind(this);
            this.props.model.on(STORE_EVENT_CHANGE, this.__onModelChange);
            if (oldCompDidMount) {
                oldCompDidMount.call(this);
            }
        };

        const oldCompWillUnmount = target.prototype.componentWillUnmount;
        target.prototype.componentWillUnmount = function componentWillUnmount() {
            this.props.model.removeListener(STORE_EVENT_CHANGE, this.__onModelChange);
            if (oldCompWillUnmount) {
                oldCompWillUnmount.call(this);
            }
        };
    };
}

/**
 * Base class of store
 *
 * @export
 * @interface StoreProps
 * @template T
 */
export interface IStoreProps<T extends BaseStore<any>> {
    model: T;
}

export class BaseStore<T> extends EventEmitter {

    public state: T;

    constructor(state: T = {} as any) {
        super();
        this.state = state;
    }

    public on(event: "change", cb: (state: T) => void): this;
    public on(event: string | symbol, listener: (...args: any[]) => void): this;
    public on(event: string | symbol, listener: (...args: any[]) => void): this {
        return super.on(event, listener);
    }

    public once(event: "change", cb: (state: T) => void): this;
    public once(event: string | symbol, listener: (...args: any[]) => void): this;
    public once(event: string | symbol, listener: (...args: any[]) => void): this {
        return super.once(event, listener);
    }

    public setState(state: Partial<T> = {} as any, cb?: () => void) {
        const inState = state as any;
        const thisState = this.state as any;
        if (typeof state === "object") {
            // tslint:disable-next-line: forin
            for (const i in state) {
                thisState[i] = inState[i];
            }
            this.emit(STORE_EVENT_CHANGE, inState);
            cb?.();
        } else {
            throw new Error("Wrong type of 'state'. Must be Object");
        }
    }
}

export interface IBaseStoreCollectionState<T> {
    items: T[];
}

export class BaseStoreCollection<I, S extends IBaseStoreCollectionState<I>> extends BaseStore<S> {

    public get length() {
        return this.getIterator().length;
    }

    public static defaultState: IBaseStoreCollectionState<any> = {
        items: [],
    };

    constructor(state?: S) {
        const stateFilled = Object.assign({}, BaseStoreCollection.defaultState, state);
        super(stateFilled);
    }

    public items(index: number): I {
        return this.getIterator()[index];
    }

    public add(item: I) {
        this.getIterator().push(item);

        this.emit("change", this.state);
    }

    public addRange(items: I[] | BaseStoreCollection<I, S>) {
        const preparedItems = !Array.isArray(items) ? items.getIterator() : items;
        preparedItems.forEach((item) => this.getIterator().push(item));

        this.emit("change", this.state);
    }

    public indexOf(item: I) {
        return this.getIterator().indexOf(item);
    }

    public pop() {
        const res = this.getIterator().pop();

        if (res) {
            this.emit("change", this.state);
        }

        return res;
    }

    public removeAt(index: number) {
        this.state.items = this.getIterator().filter((item, i) => i !== index);

        this.emit("change", this.state);
    }

    public remove(item: I) {
        const index = this.indexOf(item);
        if (index > -1) {
            this.removeAt(index);
        }
    }

    public removeRange(range: number[]) {
        this
            .filter((item, index) => range.indexOf(index) > -1)
            .forEach((item) => this.state.items = this.getIterator().filter((o) => o !== item));

        this.emit("change", this.state);
    }

    public clear() {
        this.state.items = new Array();

        this.emit("change", this.state);
    }

    public getIterator(): I[] {
        return this.state.items!;
    }

    public forEach(cb: (item: I, index: number, array: I[]) => void, thisArg?: any) {
        this.getIterator().forEach(cb);
    }

    public map<U>(cb: (item: I, index: number, array: I[]) => U) {
        return this.getIterator().map<U>(cb);
    }

    public filter(cb: (item: I, index: number, array: I[]) => boolean) {
        const res = new (this.constructor as any)() as BaseStoreCollection<I, S>;
        const filtered = this.getIterator().filter(cb);
        res.state.items = filtered;
        return res;
    }

    public sort(cb: (a: I, b: I) => number) {
        const res = new (this.constructor as any)() as BaseStoreCollection<I, S>;
        const sorted = this.getIterator().sort(cb);
        res.state.items = sorted;
        return res;
    }

    public every(cb: (value: I, index: number, array: I[]) => boolean) {
        return this.getIterator().every(cb);
    }

    public some(cb: (value: I, index: number, array: I[]) => boolean) {
        return this.getIterator().some(cb);
    }

    public isEmpty() {
        return this.length === 0;
    }
}
