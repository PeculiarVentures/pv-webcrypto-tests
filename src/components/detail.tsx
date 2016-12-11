import * as React from "react";
import { Store } from "../store/store";
import { TestCaseParams, TestCaseState } from "../store/test";
import { TestCaseCollection, CaseStatus } from "../store/test";
import { PropertyView, PropertyViewItem, PropertyViewGroup } from "./property";
import { CollapseButton } from "./collapse-button";

interface ITestDetailProps {
    model: TestCaseCollection<any>;
}

interface ITestDetailState { }

@Store()
export class TestDetail extends React.Component<ITestDetailProps, ITestDetailState> {

    constructor(props: ITestDetailProps) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <table className="detail">
                <thead>
                    <tr>
                        <td></td>
                        <td>name</td>
                        <td>time</td>
                        <td>status</td>
                        <td>message</td>
                    </tr>
                </thead>
                {this.props.model.map(item => (
                    <TestDetailItem test={item.state} />
                ))}
                <tbody>
                </tbody>
            </table>
        );
    }

}

interface ITestDetailItemProps {
    test: TestCaseState;
}

interface ITestDetailItemState {
    collapsed?: boolean;
}

export class TestDetailItem extends React.Component<ITestDetailItemProps, ITestDetailItemState> {

    constructor(props: ITestDetailItemProps) {
        super(props);
        this.state = {
            collapsed: true
        };
    }

    render() {
        const test = this.props.test;
        const status = test.status || CaseStatus.ready;
        return (
            <tbody>
                <tr>
                    <td>
                        <CollapseButton collapsed={this.state.collapsed!} onClick={e => this.setState({ collapsed: !this.state.collapsed })} />
                    </td>
                    <td>{test.name}</td>
                    <td>{`${test.duration / 1e3}s`}</td>
                    <td className={`status ${CaseStatus[status]}`}>{CaseStatus[status]}</td>
                    <td>{test.stack}</td>
                </tr>
                {
                    !this.state.collapsed ?
                        <tr>
                            <td></td>
                            <td colSpan={3}>
                                <DetailParamsView params={test.params!} />
                            </td>
                        </tr>
                        :
                        null
                }
            </tbody>
        );
    }

}

interface IDetailParamsViewProps {
    params: TestCaseParams;
}

interface IDetailParamsViewState { }

export class DetailParamsView extends React.Component<IDetailParamsViewProps, IDetailParamsViewState> {

    constructor(props: IDetailParamsViewProps) {
        super(props);
        this.state = {};
    }

    renderKey(key: CryptoKey, groupName: string) {
        console.log("renderKey");
        return (
            <PropertyViewGroup label={groupName}>
                <PropertyViewItem label="type" value={key.type} />
                {this.renderAlgrithm(key.algorithm, "Algorithm")}
                <PropertyViewItem label="extractable" value={key.extractable.toString()} />
                <PropertyViewItem label="usages" value={key.usages.join(", ")} />
            </PropertyViewGroup>
        );
    }

    renderItems(params: TestCaseParams) {
        let items: JSX.Element[] = [];
        for (let key in params) {
            let value: string = params[key];
            if (key === "algorithm" || key === "derivedKeyAlg") {
                items.push(this.renderAlgrithm(params[key], key));
                continue;
            }
            else if (key === "keyUsages") {
                value = params[key] ? params[key].join(", ") : "null";
            }
            else if (params[key].constructor.name === "CryptoKey") {
                items.push(this.renderKey(params[key], key));
                continue;
            }
            else {
                value = value.toString();
            }
            items.push(<PropertyViewItem label={key} value={value} />);

        }
        return items;
    }

    renderAlgrithm(alg: { [key: string]: any }, groupName: string) {
        let items: JSX.Element[] = [];
        for (let key in alg) {
            let value = alg[key];
            let text: string;
            if (key === "publicExponent")
                text = value[0] === 1 ? "65537" : "3";
            else if (ArrayBuffer.isView(value))
                text = "ArrayBuffer";
            else if (key === "hash")
                text = value.name;
            else
                text = value ? value.toString() : "null";
            items.push(<PropertyViewItem label={key} value={text} />);
        }
        return (
            <PropertyViewGroup label={groupName}>
                {items}
            </PropertyViewGroup>
        );
    }

    render() {
        return (
            <PropertyView>
                {this.renderItems(this.props.params)}
            </PropertyView>
        );
    }

}