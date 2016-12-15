import * as React from "react";
import { AlgorithmTest, TestCaseCollection } from "./store/test";
import { AesCBCTest, AesCTRTest, AesGCMTest, AesCFBTest, AesCMACTest } from "./tests/aes";
import { RsaOAEPTest, RsaPSSTest, RsaSSATest } from "./tests/rsa";
import { ShaTest } from "./tests/sha";
import { EcDSATest, EcDHTest } from "./tests/ec";
import { TestTable } from "./components/test-table";
import { TestDetail } from "./components/detail";
import { PropertyView, PropertyViewItem } from "./components/property";
import * as helper from "./helper";

const self: { crypto: Crypto } = window as any;

const tests = [ShaTest, AesCBCTest, AesGCMTest, RsaOAEPTest, RsaPSSTest, RsaSSATest, EcDSATest, EcDHTest];

function newTests() {
    return tests.map(Test => new Test());
}

interface IAppProps {
}

interface IAppState {
    tests?: AlgorithmTest[];
    selectedTest?: TestCaseCollection<any>;
    selectedCrypto?: string;
    report?: any;
}


export class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            tests: newTests(),
            selectedCrypto: "0"
        };
        self.crypto = cryptoEngines.native; // set default crypto -> Native

        this.onCryptoChange = this.onCryptoChange.bind(this);
        this.onTestCaseClick = this.onTestCaseClick.bind(this);
    }

    protected createTests() {
        this.setState({ tests: undefined }, () =>
            this.setState({
                tests: newTests(),
                selectedTest: undefined,
                report: undefined
            }));
    }

    componentDidMount() {
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
        this.state.tests!.forEach(test => {
            let testReport = test.report();
            report.duration += testReport.duration;
            report.error += testReport.error;
            report.success += testReport.success;
        });
        this.setState({ report });
    }

    onCryptoChange(e: React.FormEvent<HTMLSelectElement>) {
        const selectedCrypto = e.currentTarget.value;
        switch (selectedCrypto) {
            case "0": // Native
                self.crypto = cryptoEngines.native;
                break;
            case "1": // JS
                self.crypto = cryptoEngines.js;
                break;
            default:
                throw new Error("Uknown type of crypto module");
        }
        this.setState({ selectedCrypto }, () => this.createTests());
    }

    onTestCaseClick(test: TestCaseCollection<any>) {
        if (this.state.selectedTest !== test)
            this.setState({ selectedTest: new TestCaseCollection<any>([]) }, () => {
                this.setState({ selectedTest: test });
            });
    }

    render() {
        const info = helper.BrawserInfo();
        const {report, tests} = this.state;
        return (
            <div className="container">
                <h3>{info.name} v{info.version}</h3>
                <h4>Select crypto module </h4>
                <select ref="crypto" name="" value={this.state.selectedCrypto} onChange={this.onCryptoChange}>
                    <option value="0">Native</option>
                    <option value="1">JavaScript</option>
                </select>
                <hr />
                {this.state.tests ?
                    <div>
                        <TestTable model={tests!} onCellClick={this.onTestCaseClick} />
                        <div className="row">
                            <div className="btn" onClick={() => { tests!.filter(item => item.state.selected).forEach(item => item.run()); } }>Run</div>
                            <div className="btn" onClick={() => { this.createTests(); } }>Reset</div>
                            <div className="btn" onClick={() => { this.getReport(); } }>Report</div>
                        </div>
                        {
                            report ?
                                <div>
                                    <hr />
                                    <h3>Report: {this.state.selectedCrypto === "0" ? "Native" : "JavaScript"}</h3>
                                    <PropertyView>
                                        <PropertyViewItem label="Browser" value={`${info.name} v${info.version}`} />
                                        <PropertyViewItem label="UserAgent" value={window.navigator.userAgent} />
                                        <PropertyViewItem label="Created" value={report.created.toString()} />
                                        <PropertyViewItem label="Test duration" value={`${report.duration / 1000}s`} />
                                        <PropertyViewItem label="Test success" value={report.success} />
                                        <PropertyViewItem label="Test error" value={report.error} />
                                    </PropertyView>
                                </div>
                                :
                                null
                        }
                        <hr />
                        {
                            this.state.selectedTest ?
                                <TestDetail model={this.state.selectedTest} />
                                :
                                null
                        }
                    </div>
                    :
                    null
                }
            </div>
        );
    }

}