import { EventEmitter } from "events";

export const STORE_EVENT_CHANGE = "change";

export type StoreOptions = {
    /**
     * Fillter of attribute names from State 
     * 
     * @type {string[]}
     */
    filter?: string[];
}

/**
 * Decorator to bind BaseStore to React component 
 */
export function Store(options: StoreOptions = {}): ClassDecorator {
    return (target: any) => {
        target.prototype.__onModelChange = function __onModelChange(state: any) {
            let mustUpdate = false;
            if (options.filter) {
                for (let key in state) {
                    if (options.filter.indexOf(key) > -1) {
                        mustUpdate = true;
                    }
                }
            }
            else
                mustUpdate = true;

            mustUpdate && this.setState({});
        };

        let oldCompDidMount = target.prototype.componentDidMount;
        target.prototype.componentDidMount = function componentDidMount() {
            this.__onModelChange = this.__onModelChange.bind(this);
            this.props.model.on(STORE_EVENT_CHANGE, this.__onModelChange);
            if (oldCompDidMount)
                oldCompDidMount.call(this);
        };

        let oldCompWillUnmount = target.prototype.componentWillUnmount;
        target.prototype.componentWillUnmount = function componentWillUnmount() {
            this.props.model.removeListener(STORE_EVENT_CHANGE, this.__onModelChange);
            if (oldCompWillUnmount)
                oldCompWillUnmount.call(this);
        };
    };
};

/**
 * Base class of store
 * 
 * @export
 * @interface StoreProps
 * @template T
 */
export interface StoreProps<T extends BaseStore<any>> {
    model: T;
}

export class BaseStore<T> extends EventEmitter {

    state: T;

    constructor(state: T = {} as any) {
        super();
        this.state = state;
    }

    on(event: "change", cb: (state: T) => void): this;
    on(event: string | symbol, listener: Function): this;
    on(event: string | symbol, listener: Function): this {
        return super.on.apply(this, arguments);
    }

    once(event: "change", cb: (state: T) => void): this;
    once(event: string | symbol, listener: Function): this;
    once(event: string | symbol, listener: Function): this {
        return super.once.apply(this, arguments);
    }

    setState(state: T = {} as any, cb?: Function) {
        const inState = state as any;
        const thisState = this.state as any;
        if (typeof state === "object") {
            for (let i in state) {
                thisState[i] = inState[i];
            }
            this.emit(STORE_EVENT_CHANGE, inState);
            cb && cb();
        }
        else
            throw new Error("Wrong type of 'state'. Must be Object");
    }
}


export interface BaseStoreCollectionState<T> {
    items?: T[];
}

export class BaseStoreCollection<I, S extends BaseStoreCollectionState<I>> extends BaseStore<S> {

    constructor(state?: S) {
        const _state = Object.assign({}, BaseStoreCollection.defaultState, state);
        super(_state);
    }

    static defaultState: BaseStoreCollectionState<any> = {
        items: [],
    };

    public get length() {
        return this.getIterator().length;
    }

    public items(index: number): I {
        return this.getIterator()[index];
    }

    public add(item: I) {
        this.getIterator().push(item);

        this.emit("change", this.state);
    }

    public addRange(items: I[] | BaseStoreCollection<I, S>) {
        let _items = !Array.isArray(items) ? items.getIterator() : items;
        _items.forEach(item => this.getIterator().push(item));

        this.emit("change", this.state);
    }

    public indexOf(item: I) {
        return this.getIterator().indexOf(item);
    }

    public pop() {
        let res = this.getIterator().pop();

        if (res)
            this.emit("change", this.state);

        return res;
    }

    public removeAt(index: number) {
        this.state.items = this.getIterator().filter((item, _index) => _index !== index);

        this.emit("change", this.state);
    }

    public remove(item: I) {
        let index = this.indexOf(item);
        if (index > -1)
            this.removeAt(index);
    }

    public removeRange(range: number[]) {
        this
            .filter((item, index) => range.indexOf(index) > -1)
            .forEach(item => this.state.items = this.getIterator().filter(_item => _item !== item));

        this.emit("change", this.state);
    }

    public clear() {
        this.state.items = new Array();

        this.emit("change", this.state);
    }

    public getIterator(): I[] {
        return this.state.items!;
    }

    public forEach(cb: (item: I, index: number, array: Array<I>) => void, thisArg?: any) {
        this.getIterator().forEach(cb);
    }

    public map<U>(cb: (item: I, index: number, array: Array<I>) => U) {
        return this.getIterator().map<U>(cb);
    }

    public filter(cb: (item: I, index: number, array: Array<I>) => boolean) {
        let res = new (this.constructor as any)() as BaseStoreCollection<I, S>;
        let filtered = this.getIterator().filter(cb);
        res.state.items = filtered;
        return res;
    }

    public sort(cb: (a: I, b: I) => number) {
        let res = new (this.constructor as any)() as BaseStoreCollection<I, S>;
        let sorted = this.getIterator().sort(cb);
        res.state.items = sorted;
        return res;
    }

    public every(cb: (value: I, index: number, array: I[]) => boolean) {
        return this.getIterator().every(cb);
    }

    public some(cb: (value: I, index: number, array: I[]) => boolean) {
        return this.getIterator().some(cb);
    }

    isEmpty() {
        return this.length === 0;
    }
}