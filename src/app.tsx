import * as React from "react";
import { TestDetail } from "./components/detail";
import { PropertyView, PropertyViewItem } from "./components/property";
import { TestTable } from "./components/test-table";
import * as helper from "./helper";
import { AlgorithmTest, TestCaseCollection } from "./store/test";
import { AesCBCTest, AesCFBTest, AesCMACTest, AesCTRTest, AesECBTest, AesGCMTest } from "./tests/aes";
import { DesCbcTest, DesEde3CbcTest } from "./tests/des";
import { EcDHTest, EcDSATest } from "./tests/ec";
import { RsaESTest, RsaOAEPTest, RsaPSSTest, RsaSSATest } from "./tests/rsa";
import { ShaTest } from "./tests/sha";

const self: { crypto: Crypto } = window as any;

const testList = [
    ShaTest,
    AesECBTest,
    AesCBCTest,
    AesGCMTest,
    DesCbcTest,
    DesEde3CbcTest,
    RsaESTest,
    RsaOAEPTest,
    RsaPSSTest,
    RsaSSATest,
    EcDSATest,
    EcDHTest,
];

function newTests() {
    return testList.map((o) => new o());
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
            selectedCrypto: "0",
        };
        self.crypto = cryptoEngines.native; // set default crypto -> Native

        this.onCryptoChange = this.onCryptoChange.bind(this);
        this.onTestCaseClick = this.onTestCaseClick.bind(this);
    }

    public componentDidMount() {
        // nothing
    }

    public getTotalTestTime() {
        // nothing
    }

    public getReport() {
        const report = {
            created: new Date(),
            userAgent: window.navigator.userAgent,
            duration: 0,
            error: 0,
            success: 0,
        };
        this.state.tests!.forEach((test) => {
            const testReport = test.report();
            report.duration += testReport.duration;
            report.error += testReport.error;
            report.success += testReport.success;
        });
        this.setState({ report });
    }

    public onCryptoChange(e: React.FormEvent<HTMLSelectElement>) {
        const selectedCrypto = e.currentTarget.value;
        switch (selectedCrypto) {
            case "0": // Native
                self.crypto = cryptoEngines.native;
                break;
            case "1": // JS
                self.crypto = cryptoEngines.js;
                break;
            case "2": // Local
                self.crypto = cryptoEngines.local;
                break;
            default:
                throw new Error("Unknown type of crypto module");
        }
        this.setState({ selectedCrypto }, () => this.createTests());
    }

    public onTestCaseClick(test: TestCaseCollection<any>) {
        if (this.state.selectedTest !== test) {
            this.setState({ selectedTest: new TestCaseCollection<any>([]) }, () => {
                this.setState({ selectedTest: test });
            });
        }
    }

    public render() {
        const info = helper.BrowserInfo();
        const { report, tests } = this.state;
        if (!tests) {
            throw new Error("'tests' in state is empty");
        }
        return (
            <div className="container">
                <h3>{info.name} v{info.version}</h3>
                <h4>Select crypto module </h4>
                <select ref="crypto" name="" value={this.state.selectedCrypto} onChange={this.onCryptoChange}>
                    <option value="0">Native</option>
                    <option value="1">JavaScript</option>
                    <option value="2">WebCrypto Local</option>
                </select>
                <hr />
                {this.state.tests ?
                    <div>
                        <TestTable model={tests} onCellClick={this.onTestCaseClick} />
                        <div className="row">
                            <div className="btn" onClick={() => { tests.filter((item) => item.state.selected).forEach((item) => item.run()); }}>Run</div>
                            <div className="btn" onClick={() => { this.createTests(); }}>Reset</div>
                            <div className="btn" onClick={() => { this.getReport(); }}>Report</div>
                        </div>
                        {
                            report ?
                                <div>
                                    <hr />
                                    <h3>Report: {this.state.selectedCrypto === "0" ? "Native" : this.state.selectedCrypto === "1" ? "JavaScript" : "WebCrypto Local"}</h3>
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

    protected createTests() {
        this.setState({ tests: undefined }, () =>
            this.setState({
                tests: newTests(),
                selectedTest: undefined,
                report: undefined,
            }));
    }

}
