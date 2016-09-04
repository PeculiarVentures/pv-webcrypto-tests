import * as React from "react";

interface IPropertyViewProps { }

interface IPropertyViewState { }

export class PropertyView extends React.Component<IPropertyViewProps, IPropertyViewState> {

    constructor(props: IPropertyViewProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <table className="property-view">{this.props.children}</table>
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

    render() {
        return (
            <tr className="item">
                <td className="label">{this.props.label}</td>
                <td className="value">{this.props.value}</td>
            </tr>
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

    render() {
        return (
            <tbody className="group">
                <tr className="header">
                    <td className="label" colSpan={2}>{this.props.label}</td>
                </tr>
                {this.props.children}
            </tbody>
        );
    }

}