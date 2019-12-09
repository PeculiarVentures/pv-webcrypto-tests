import * as React from "react";

interface IPieChartProps { }

interface IPieChartState { }

export class PieChart extends React.Component<IPieChartProps, IPieChartState> {

    constructor(props: IPieChartProps) {
        super(props);
        this.state = {};
    }

    public render() {
        return (
            <figure className="pie-chart">
                <svg >
                    {(this.props.children as Array<React.ReactElement<IPieProps>>).map((item) => item.props.value ? item : null)}
                </svg>
            </figure>
        );
    }

}

interface IPieProps {
    className: string;
    value: number;
    rotate?: number;
    size?: number;
}

interface IPieState { }

export class Pie extends React.Component<IPieProps, IPieState> {

    constructor(props: IPieProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const {className, value, size} = this.props;
        const rotate = this.props.rotate || 0;

        return (
            <circle className={`pie ${className}`} r={size || 0} cy={size || 0} cx={size || 0}  style={{ strokeDasharray: `${value}, 158`, transform: `rotate(${rotate}deg)`}}/>
        );
    }

}
