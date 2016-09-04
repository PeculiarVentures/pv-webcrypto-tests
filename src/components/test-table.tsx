import * as React from "react";
import {Store} from "../store/store";
import {AlgorithmTest, TestCaseCollection, TestCaseState, CaseStatus} from "../store/test";
import {Pie, PieChart} from "./pie-chart";

export type TestTableCellClickHandle = (item: TestCaseCollection<any>) => void;

interface ITestTableProps {
    model: AlgorithmTest[];
    onCellClick: TestTableCellClickHandle;
}

interface ITestTableState { }

export class TestTable extends React.Component<ITestTableProps, ITestTableState> {

    constructor(props: ITestTableProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <table className="test-table">
                <thead>
                    <tr>
                        <td>Allgorithm</td>
                        <td>generateKey</td>
                        <td>digest</td>
                        <td>export/import </td>
                        <td>sign/verify</td>
                        <td>encrypt/decrypt</td>
                        <td>derive key</td>
                        <td>derive bits</td>
                        <td>wrap/unwrap</td>
                    </tr>
                </thead>
                <tbody>
                    {this.props.model.map(item => <TestTableItem model={item} onCellClick={this.props.onCellClick} />) }
                </tbody>
            </table>
        );
    }

}

interface ITestTableItemProps {
    model: AlgorithmTest;
    onCellClick: TestTableCellClickHandle;
}

interface ITestTableItemState { }

@Store()
export class TestTableItem extends React.Component<ITestTableItemProps, ITestTableItemState> {

    constructor(props: ITestTableItemProps) {
        super(props);
        this.state = {};
    }

    render() {
        const model = this.props.model;
        return (
            <tr>
                <td>{model.state.name}</td>
                <TestTableItemCell model={model.generateKey} onCellClick={this.props.onCellClick}/>
                <TestTableItemCell model={model.digest} onCellClick={this.props.onCellClick}/>
                <TestTableItemCell model={model.exportKey} onCellClick={this.props.onCellClick}/>
                <TestTableItemCell model={model.sign} onCellClick={this.props.onCellClick}/>
                <TestTableItemCell model={model.encrypt} onCellClick={this.props.onCellClick}/>
                <TestTableItemCell model={model.deriveKey} onCellClick={this.props.onCellClick}/>
                <TestTableItemCell model={model.deriveBits} onCellClick={this.props.onCellClick}/>
                <TestTableItemCell model={model.wrap} onCellClick={this.props.onCellClick}/>
            </tr>
        );
    }

}

interface ITestTableItemCellProps {
    model: TestCaseCollection<any>;
    onCellClick: TestTableCellClickHandle;
}

interface ITestTableItemCellState { }

@Store()
export class TestTableItemCell extends React.Component<ITestTableItemCellProps, ITestTableItemCellState> {

    constructor(props: ITestTableItemCellProps) {
        super(props);
        this.state = {};
    }

    render() {
        const model = this.props.model;
        if (!model)
            return <td></td>;
        const items = model.state.items;
        const complited = model.state.complited;
        let success: number = 0, error: number = 0;
        items.forEach(item => {
            if (item.state.status === CaseStatus.success) {
                success++;
            }
            else if (item.state.status === CaseStatus.error) {
                error++;
            }
        });
        const length = items.length;
        return (
            <td className="test-cell">
                <div onClick={ e => this.props.onCellClick(model) }>
                    <TestChar success={success} error={error} length={length}/>
                </div>
            </td>
        );
    }

}

interface ITestCharProps {
    success: number;
    error: number;
    length: number;
}

interface ITestCharState { }

export class TestChar extends React.Component<ITestCharProps, ITestCharState> {

    constructor(props: ITestCharProps) {
        super(props);
        this.state = {};
    }

    count(len: number, val: number) {
        return len ? (val / len) : 0;
    }

    render() {
        const {success, error, length} = this.props;
        return (
            <div className={"test-chart shadow-1"}>
                <div className="value">{Math.floor(this.count(length, success + error) * 100) }</div>
                <PieChart>
                    <Pie className="error" value={79 * this.count(length, error + success) } size={12.5}/>
                    <Pie className="success" value={79 * this.count(length, success) } size={12.5}/>
                </PieChart>
            </div>
        );
    }

}