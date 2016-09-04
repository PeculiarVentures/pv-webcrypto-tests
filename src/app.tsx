import * as React from "react";
import {AlgorithmTest, TestCaseCollection} from "./store/test";
import {AesCBCTest, AesCTRTest, AesGCMTest, AesCFBTest, AesCMACTest} from "./tests/aes";
import {RsaOAEPTest, RsaPSSTest, RsaSSATest} from "./tests/rsa";
import {ShaTest} from "./tests/sha";
import {EcDSATest, EcDHTest} from "./tests/ec";
import {TestTable} from "./components/test-table";
import {TestDetail} from "./components/detail";
import {PropertyView, PropertyViewItem} from "./components/property";
import * as helper from "./helper";

const tests = [
    new ShaTest(),
    new AesCBCTest(),
    new AesCTRTest(),
    new AesGCMTest(),
    new AesCFBTest(),
    new AesCMACTest(),
    new RsaOAEPTest(),
    new RsaPSSTest(),
    new RsaSSATest(),
    new EcDSATest(),
    new EcDHTest(),
];

interface IAppProps {
}

interface IAppState {
    selectedTest?: TestCaseCollection<any>;
    report?: any;
}

export class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.state = {
        };
    }

    getTotalTestTime() {

    }

    getReport() {
        let report = {
            created: new Date(),
            userAgent: window.navigator.userAgent,
            duration: 0,
            error: 0,
            success: 0
        };
        tests.forEach(test => {
            let testReport = test.report();
            report.duration += testReport.duration;
            report.error += testReport.error;
            report.success += testReport.success;
        });
        this.setState({report});
    }

    render() {
        const info = helper.BrawserInfo();
        const {report} = this.state;
        return (
            <div className="container">
                <h3>{info.name} v{info.version}</h3>
                <TestTable model={tests} onCellClick={test => this.setState({ selectedTest: test }) }/>
                <div className="row">
                    <div className="btn" onClick={() => { tests.forEach(item => item.run()); } }>Run</div>
                    <div className="btn" onClick={() => { this.getReport(); } }>Report</div>
                </div>
                {
                    report ?
                        <div>
                            <hr/>
                            <h3>Report</h3>
                            <PropertyView>
                                <PropertyViewItem label="Browser" value={`${info.name} v${info.version}`}/>
                                <PropertyViewItem label="UserAgent" value={window.navigator.userAgent}/>
                                <PropertyViewItem label="Created" value={report.created.toString() }/>
                                <PropertyViewItem label="Test duration" value={`${report.duration / 1000}s`}/>
                                <PropertyViewItem label="Test success" value={report.success}/>
                                <PropertyViewItem label="Test error" value={report.error}/>
                            </PropertyView>
                        </div>
                        :
                        null
                }
                <hr/>
                {
                    this.state.selectedTest ?
                        <TestDetail model={this.state.selectedTest}/>
                        :
                        null
                }
            </div>
        );
    }

}