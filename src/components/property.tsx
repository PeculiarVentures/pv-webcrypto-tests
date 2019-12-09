import * as React from "react";

interface IPropertyViewProps { }

interface IPropertyViewState { }

export class PropertyView extends React.Component<IPropertyViewProps, IPropertyViewState> {

    constructor(props: IPropertyViewProps) {
        super(props);
        this.state = {};
    }

    public render() {
        return (
            <div className="property-view">
                {this.props.children}
            </div>
        );
    }

}

interface IPropertyViewItemProps {
    label: string;
    value: string;
}

interface IPropertyViewItemState { }

export class PropertyViewItem extends React.Component<IPropertyViewItemProps, IPropertyViewItemState> {

    constructor(props: IPropertyViewItemProps) {
        super(props);
        this.state = {};
    }

    public render() {
        return (
            <div className="item">
                <div className="label">{this.props.label}</div>
                <div className="value">{this.props.value}</div>
            </div>
        );
    }

}

interface IPropertyViewGroupProps {
    label: string;
}

interface IPropertyViewGroupState { }

export class PropertyViewGroup extends React.Component<IPropertyViewGroupProps, IPropertyViewGroupState> {

    constructor(props: IPropertyViewGroupProps) {
        super(props);
        this.state = {};
    }

    public render() {
        return (
            <div className="group">
                <div className="header">
                    <div className="label">{this.props.label}</div>
                </div>
                {this.props.children}
            </div>
        );
    }

}
