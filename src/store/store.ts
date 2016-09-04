import {EventEmitter} from "events";

export let Store = (action: string = "change") => {
    return (target: any) => {
        target.prototype.__onModelChange = function __onModelChange(state: any) {
            this.setState({});
        };
        let oldCompDidMount = target.prototype.componentDidMount;
        target.prototype.componentDidMount = function componentDidMount() {
            this.__onModelChange = this.__onModelChange.bind(this);
            this.props.model.on(action, this.__onModelChange);
            if (oldCompDidMount)
                oldCompDidMount.call(this);
        };

        let oldCompWillUnmount = target.prototype.componentDidMount;
        target.prototype.componentWillUnmount = function componentWillUnmount() {
            this.props.model.removeListener(action, this.__onModelChange);
            if (oldCompWillUnmount)
                oldCompWillUnmount.call(this);
        };
    };
}

export class BaseStore<T> extends EventEmitter {

    state: T;

    constructor(state: T = {} as any) {
        super();
        this.state = state;
    }

    setState(state: T = {} as any) {
        const inState = state as any;
        const thisState = this.state as any;
        for (let i in state) {
            thisState[i] = inState[i];
        }
        this.emit("change", inState);
    }
}