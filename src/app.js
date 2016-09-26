var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("helper", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Returns info about browser
     */
    function BrawserInfo() {
        var res = {
            name: "",
            version: ""
        };
        var userAgent = window.navigator.userAgent;
        var reg;
        if (reg = /edge\/([\d\.]+)/i.exec(userAgent)) {
            res.name = "Edge";
            res.version = reg[1];
        }
        else if (/msie/i.test(userAgent)) {
            res.name = "Internet Explorer";
            res.version = /msie ([\d\.]+)/i.exec(userAgent)[1];
        }
        else if (/chrome/i.test(userAgent)) {
            res.name = "Chrome";
            res.version = /chrome\/([\d\.]+)/i.exec(userAgent)[1];
        }
        else if (/safari/i.test(userAgent)) {
            res.name = "Safari";
            res.version = /([\d\.]+) safari/i.exec(userAgent)[1];
        }
        else if (/firefox/i.test(userAgent)) {
            res.name = "Firefox";
            res.version = /firefox\/([\d\.]+)/i.exec(userAgent)[1];
        }
        return res;
    }
    exports.BrawserInfo = BrawserInfo;
});
define("store/store", ["require", "exports", "events"], function (require, exports, events_1) {
    "use strict";
    exports.Store = function (action) {
        if (action === void 0) { action = "change"; }
        return function (target) {
            target.prototype.__onModelChange = function __onModelChange(state) {
                this.setState({});
            };
            var oldCompDidMount = target.prototype.componentDidMount;
            target.prototype.componentDidMount = function componentDidMount() {
                this.__onModelChange = this.__onModelChange.bind(this);
                this.props.model.on(action, this.__onModelChange);
                if (oldCompDidMount)
                    oldCompDidMount.call(this);
            };
            var oldCompWillUnmount = target.prototype.componentWillUnmount;
            target.prototype.componentWillUnmount = function componentWillUnmount() {
                this.props.model.removeListener(action, this.__onModelChange);
                if (oldCompWillUnmount)
                    oldCompWillUnmount.call(this);
            };
        };
    };
    var BaseStore = (function (_super) {
        __extends(BaseStore, _super);
        function BaseStore(state) {
            if (state === void 0) { state = {}; }
            _super.call(this);
            this.state = state;
        }
        BaseStore.prototype.setState = function (state) {
            if (state === void 0) { state = {}; }
            var inState = state;
            var thisState = this.state;
            for (var i in state) {
                thisState[i] = inState[i];
            }
            this.emit("change", inState);
        };
        return BaseStore;
    }(events_1.EventEmitter));
    exports.BaseStore = BaseStore;
});
define("store/test", ["require", "exports", "store/store"], function (require, exports, store_1) {
    "use strict";
    var Test = (function (_super) {
        __extends(Test, _super);
        function Test() {
            _super.call(this);
        }
        return Test;
    }(store_1.BaseStore));
    exports.Test = Test;
    (function (CaseStatus) {
        CaseStatus[CaseStatus["error"] = 0] = "error";
        CaseStatus[CaseStatus["success"] = 1] = "success";
        CaseStatus[CaseStatus["warning"] = 2] = "warning";
        CaseStatus[CaseStatus["working"] = 3] = "working";
    })(exports.CaseStatus || (exports.CaseStatus = {}));
    var CaseStatus = exports.CaseStatus;
    var TestCaseCollection = (function (_super) {
        __extends(TestCaseCollection, _super);
        function TestCaseCollection(cases) {
            _super.call(this, {
                items: cases,
                complited: 0
            });
            this.connectToCases(cases);
        }
        TestCaseCollection.prototype.connectToCases = function (cases) {
            for (var _i = 0, cases_1 = cases; _i < cases_1.length; _i++) {
                var item = cases_1[_i];
                item.on("change", this.onCaseChanged.bind(this, item));
            }
        };
        TestCaseCollection.prototype.push = function (cases) {
            for (var i in cases) {
                this.state.items.push(cases[i]);
            }
            this.connectToCases(cases);
            this.setState({ items: this.state.items });
        };
        TestCaseCollection.prototype.onCaseChanged = function (item) {
            if (item.state.status === CaseStatus.success || item.state.status === CaseStatus.error) {
                console.log(item.state.name);
                console.log("  Status:" + CaseStatus[item.state.status]);
                this.setState({
                    complited: this.state.complited + 1
                });
                this.run();
            }
            else {
                this.setState();
            }
        };
        TestCaseCollection.prototype.run = function () {
            var state = this.state;
            var items = state.items;
            if (items.length && state.complited !== items.length) {
                items[state.complited].run();
            }
            else {
                this.emit("end", this);
            }
        };
        return TestCaseCollection;
    }(store_1.BaseStore));
    exports.TestCaseCollection = TestCaseCollection;
    var AlgorithmTest = (function (_super) {
        __extends(AlgorithmTest, _super);
        function AlgorithmTest(name) {
            _super.call(this, {
                name: name,
            });
            this.generateKey = new TestCaseCollection([]);
            this.exportKey = new TestCaseCollection([]);
            this.sign = new TestCaseCollection([]);
            this.encrypt = new TestCaseCollection([]);
            this.digest = new TestCaseCollection([]);
            this.deriveKey = new TestCaseCollection([]);
            this.deriveBits = new TestCaseCollection([]);
            this.wrap = new TestCaseCollection([]);
            this.onCaseChange = this.onCaseChange.bind(this);
            // connect to generate key
            if (this.generateKey) {
                this.generateKey.on("change", this.onCaseChange);
            }
        }
        AlgorithmTest.prototype.getGanratedKeys = function () {
            var res = [];
            for (var _i = 0, _a = this.generateKey.state.items; _i < _a.length; _i++) {
                var _case = _a[_i];
                var key = _case.state.key;
                if (key) {
                    if ("privateKey" in key) {
                        res.push(key);
                    }
                    else {
                        res.push(key);
                    }
                }
            }
            return res;
        };
        AlgorithmTest.prototype.onCaseChange = function (item) {
            if (this.generateKey) {
                var done = true;
                for (var i in this.generateKey) {
                    var state = this.generateKey.state;
                    if (state.complited !== state.items.length) {
                        done = false;
                        break;
                    }
                }
                if (done) {
                    var keys = this.getGanratedKeys();
                    if (keys)
                        this.emit("generate", this.getGanratedKeys());
                }
            }
        };
        AlgorithmTest.prototype.getAllTests = function () {
            var tests = [];
            tests.push(this.generateKey);
            tests.push(this.exportKey);
            tests.push(this.sign);
            tests.push(this.encrypt);
            tests.push(this.digest);
            tests.push(this.deriveKey);
            tests.push(this.deriveBits);
            tests.push(this.wrap);
            return tests;
        };
        AlgorithmTest.prototype.countDuaration = function (tests) {
            var res = 0;
            var durations = tests.state.items.map(function (item) { return item.state.duration; });
            if (durations.length)
                res = durations.reduce(function (prev, cur) { return prev += cur; });
            return res;
        };
        AlgorithmTest.prototype.countStatus = function (tests, status) {
            var res = tests.state.items.filter(function (item) { return item.state.status === status; }).length;
            return res;
        };
        AlgorithmTest.prototype.report = function () {
            var _this = this;
            // total duration
            var duration = this.getAllTests().map(function (test) { return _this.countDuaration(test); }).reduce(function (p, c) { return p + c; });
            var success = this.getAllTests().map(function (test) { return _this.countStatus(test, CaseStatus.success); }).reduce(function (p, c) { return p + c; });
            var error = this.getAllTests().map(function (test) { return _this.countStatus(test, CaseStatus.error); }).reduce(function (p, c) { return p + c; });
            return { duration: duration, success: success, error: error };
        };
        AlgorithmTest.prototype.run = function () {
            this.getAllTests().forEach(function (test) { return test.run(); });
        };
        return AlgorithmTest;
    }(store_1.BaseStore));
    exports.AlgorithmTest = AlgorithmTest;
    var GenerateKeyCase = (function (_super) {
        __extends(GenerateKeyCase, _super);
        function GenerateKeyCase(state) {
            state.duration = 0;
            _super.call(this, state);
        }
        GenerateKeyCase.prototype.run = function () {
            var _this = this;
            var params = this.state.params;
            var startAt = new Date().getTime();
            var promise = new Promise(function (resolve, reject) {
                _this.setState({ status: CaseStatus.working });
                crypto.subtle.generateKey(params.algorithm, params.extractble, params.keyUsages)
                    .then(function (key) {
                    var endAt = new Date().getTime();
                    _this.setState({
                        status: CaseStatus.success,
                        key: key,
                        duration: endAt - startAt
                    });
                    resolve();
                })
                    .catch(function (e) {
                    var endAt = new Date().getTime();
                    _this.setState({
                        status: CaseStatus.error,
                        message: e.message,
                        stack: e.stack,
                        duration: endAt - startAt
                    });
                    resolve();
                });
            });
            promise.catch(function (e) {
                var endAt = new Date().getTime();
                _this.setState({
                    status: CaseStatus.error,
                    message: e.message,
                    stack: e.stack,
                    duration: endAt - startAt
                });
            });
        };
        return GenerateKeyCase;
    }(store_1.BaseStore));
    exports.GenerateKeyCase = GenerateKeyCase;
    var ExportKeyCase = (function (_super) {
        __extends(ExportKeyCase, _super);
        function ExportKeyCase(state) {
            state.duration = 0;
            _super.call(this, state);
        }
        ExportKeyCase.prototype.run = function () {
            var _this = this;
            var params = this.state.params;
            var startAt = new Date().getTime();
            var promise = new Promise(function (resolve, reject) {
                _this.setState({ status: CaseStatus.working });
                crypto.subtle.exportKey(params.format, params.key)
                    .then(function (data) {
                    return crypto.subtle.importKey(params.format, data, params.algorithm, params.extractble, params.keyUsages);
                })
                    .then(function (key) {
                    var endAt = new Date().getTime();
                    _this.setState({
                        status: CaseStatus.success,
                        duration: endAt - startAt
                    });
                    resolve();
                })
                    .catch(function (e) {
                    var endAt = new Date().getTime();
                    _this.setState({
                        status: CaseStatus.error,
                        message: e.message,
                        stack: e.stack,
                        duration: endAt - startAt
                    });
                    resolve();
                });
            });
            promise.catch(function (e) {
                var endAt = new Date().getTime();
                _this.setState({
                    status: CaseStatus.error,
                    message: e.message,
                    stack: e.stack,
                    duration: endAt - startAt
                });
            });
        };
        return ExportKeyCase;
    }(store_1.BaseStore));
    exports.ExportKeyCase = ExportKeyCase;
    var SignCase = (function (_super) {
        __extends(SignCase, _super);
        function SignCase(state) {
            state.duration = 0;
            _super.call(this, state);
        }
        SignCase.prototype.run = function () {
            var _this = this;
            var params = this.state.params;
            var startAt = new Date().getTime();
            var promise = new Promise(function (resolve, reject) {
                _this.setState({ status: CaseStatus.working });
                crypto.subtle.sign(params.algorithm, params.signKey, new Uint8Array([1, 2, 3, 4, 5]))
                    .then(function (data) {
                    return crypto.subtle.verify(params.algorithm, params.verifyKey, data, new Uint8Array([1, 2, 3, 4, 5]));
                })
                    .then(function (key) {
                    var endAt = new Date().getTime();
                    _this.setState({
                        status: CaseStatus.success,
                        duration: endAt - startAt
                    });
                    resolve();
                })
                    .catch(function (e) {
                    var endAt = new Date().getTime();
                    _this.setState({
                        status: CaseStatus.error,
                        message: e.message,
                        stack: e.stack,
                        duration: endAt - startAt
                    });
                    resolve();
                });
            });
            promise.catch(function (e) {
                var endAt = new Date().getTime();
                _this.setState({
                    status: CaseStatus.error,
                    message: e.message,
                    stack: e.stack,
                    duration: endAt - startAt
                });
            });
        };
        return SignCase;
    }(store_1.BaseStore));
    exports.SignCase = SignCase;
    var EncryptCase = (function (_super) {
        __extends(EncryptCase, _super);
        function EncryptCase(state) {
            state.duration = 0;
            _super.call(this, state);
        }
        EncryptCase.prototype.run = function () {
            var _this = this;
            var params = this.state.params;
            var startAt = new Date().getTime();
            var promise = new Promise(function (resolve, reject) {
                _this.setState({ status: CaseStatus.working });
                crypto.subtle.encrypt(params.algorithm, params.encryptKey, new Uint8Array([1, 2, 3, 4, 5]))
                    .then(function (data) {
                    return crypto.subtle.decrypt(params.algorithm, params.decryptKey, data);
                })
                    .then(function (key) {
                    var endAt = new Date().getTime();
                    _this.setState({
                        status: CaseStatus.success,
                        duration: endAt - startAt
                    });
                    resolve();
                })
                    .catch(function (e) {
                    var endAt = new Date().getTime();
                    _this.setState({
                        status: CaseStatus.error,
                        message: e.message,
                        stack: e.stack,
                        duration: endAt - startAt
                    });
                    resolve();
                });
            });
            promise.catch(function (e) {
                var endAt = new Date().getTime();
                _this.setState({
                    status: CaseStatus.error,
                    message: e.message,
                    stack: e.stack,
                    duration: endAt - startAt
                });
            });
        };
        return EncryptCase;
    }(store_1.BaseStore));
    exports.EncryptCase = EncryptCase;
    var DigestCase = (function (_super) {
        __extends(DigestCase, _super);
        function DigestCase(state) {
            state.duration = 0;
            _super.call(this, state);
        }
        DigestCase.prototype.run = function () {
            var _this = this;
            var params = this.state.params;
            var startAt = new Date().getTime();
            var promise = new Promise(function (resolve, reject) {
                _this.setState({ status: CaseStatus.working });
                crypto.subtle.digest(params.algorithm, new Uint8Array([1, 2, 3, 4, 5]))
                    .then(function (data) {
                    var endAt = new Date().getTime();
                    _this.setState({
                        status: CaseStatus.success,
                        duration: endAt - startAt
                    });
                    resolve();
                })
                    .catch(function (e) {
                    var endAt = new Date().getTime();
                    _this.setState({
                        status: CaseStatus.error,
                        message: e.message,
                        stack: e.stack,
                        duration: endAt - startAt
                    });
                    resolve();
                });
            });
            promise.catch(function (e) {
                var endAt = new Date().getTime();
                _this.setState({
                    status: CaseStatus.error,
                    message: e.message,
                    stack: e.stack,
                    duration: endAt - startAt
                });
            });
        };
        return DigestCase;
    }(store_1.BaseStore));
    exports.DigestCase = DigestCase;
    var DeriveKeyCase = (function (_super) {
        __extends(DeriveKeyCase, _super);
        function DeriveKeyCase(state) {
            state.duration = 0;
            _super.call(this, state);
        }
        DeriveKeyCase.prototype.run = function () {
            var _this = this;
            var params = this.state.params;
            var startAt = new Date().getTime();
            var promise = new Promise(function (resolve, reject) {
                _this.setState({ status: CaseStatus.working });
                crypto.subtle.deriveKey(params.algorithm, params.key, params.derivedKeyAlg, true, params.keyUsage)
                    .then(function (data) {
                    var endAt = new Date().getTime();
                    _this.setState({
                        status: CaseStatus.success,
                        duration: endAt - startAt
                    });
                    resolve();
                })
                    .catch(function (e) {
                    var endAt = new Date().getTime();
                    _this.setState({
                        status: CaseStatus.error,
                        message: e.message,
                        stack: e.stack,
                        duration: endAt - startAt
                    });
                    resolve();
                });
            });
            promise.catch(function (e) {
                var endAt = new Date().getTime();
                _this.setState({
                    status: CaseStatus.error,
                    message: e.message,
                    stack: e.stack,
                    duration: endAt - startAt
                });
            });
        };
        return DeriveKeyCase;
    }(store_1.BaseStore));
    exports.DeriveKeyCase = DeriveKeyCase;
    var DeriveBitsCase = (function (_super) {
        __extends(DeriveBitsCase, _super);
        function DeriveBitsCase(state) {
            state.duration = 0;
            _super.call(this, state);
        }
        DeriveBitsCase.prototype.run = function () {
            var _this = this;
            var params = this.state.params;
            var startAt = new Date().getTime();
            var promise = new Promise(function (resolve, reject) {
                _this.setState({ status: CaseStatus.working });
                crypto.subtle.deriveBits(params.algorithm, params.key, params.bitsLength)
                    .then(function (data) {
                    var endAt = new Date().getTime();
                    _this.setState({
                        status: CaseStatus.success,
                        duration: endAt - startAt
                    });
                    resolve();
                })
                    .catch(function (e) {
                    var endAt = new Date().getTime();
                    _this.setState({
                        status: CaseStatus.error,
                        message: e.message,
                        stack: e.stack,
                        duration: endAt - startAt
                    });
                    resolve();
                });
            });
            promise.catch(function (e) {
                var endAt = new Date().getTime();
                _this.setState({
                    status: CaseStatus.error,
                    message: e.message,
                    stack: e.stack,
                    duration: endAt - startAt
                });
            });
        };
        return DeriveBitsCase;
    }(store_1.BaseStore));
    exports.DeriveBitsCase = DeriveBitsCase;
    var WrapCase = (function (_super) {
        __extends(WrapCase, _super);
        function WrapCase(state) {
            state.duration = 0;
            _super.call(this, state);
        }
        WrapCase.prototype.run = function () {
            var _this = this;
            var params = this.state.params;
            var startAt = new Date().getTime();
            var promise = new Promise(function (resolve, reject) {
                _this.setState({ status: CaseStatus.working });
                crypto.subtle.wrapKey(params.format, params.key, params.wrappingKey, params.algorithm)
                    .then(function (data) {
                    return crypto.subtle.unwrapKey(params.format, new Uint8Array(data), params.unwrappingKey, params.algorithm, params.key.algorithm, true, params.key.usages);
                })
                    .then(function (key) {
                    var endAt = new Date().getTime();
                    _this.setState({
                        status: CaseStatus.success,
                        duration: endAt - startAt
                    });
                    resolve();
                })
                    .catch(function (e) {
                    var endAt = new Date().getTime();
                    _this.setState({
                        status: CaseStatus.error,
                        message: e.message,
                        stack: e.stack,
                        duration: endAt - startAt
                    });
                    resolve();
                });
            });
            promise.catch(function (e) {
                var endAt = new Date().getTime();
                _this.setState({
                    status: CaseStatus.error,
                    message: e.message,
                    stack: e.stack,
                    duration: endAt - startAt
                });
            });
        };
        return WrapCase;
    }(store_1.BaseStore));
    exports.WrapCase = WrapCase;
});
define("tests/aes", ["require", "exports", "store/test"], function (require, exports, test_1) {
    "use strict";
    var ALG_AES_CBC = "AES-CBC";
    var ALG_AES_CTR = "AES-CTR";
    var ALG_AES_GCM = "AES-GCM";
    var ALG_AES_CFB = "AES-CFB-8";
    var ALG_AES_CMAC = "AES-CMAC";
    function GenerateKey(name, keyUsages) {
        var cases = [];
        // length
        [128, 192, 256].forEach(function (length) {
            cases.push(new test_1.GenerateKeyCase({
                name: "generate " + name + " length:" + length,
                params: {
                    algorithm: {
                        name: name,
                        length: length
                    },
                    extractble: true,
                    keyUsages: keyUsages
                }
            }));
        });
        return cases;
    }
    function ExportKey(keys) {
        var cases = [];
        keys.forEach(function (key) {
            // format
            var alg_length = key.algorithm.length;
            ["raw", "jwk"].forEach(function (format) {
                cases.push(new test_1.ExportKeyCase({
                    name: key.algorithm.name + " length:" + alg_length + " format:" + format,
                    params: {
                        format: format,
                        key: key,
                        algorithm: key.algorithm,
                        extractble: true,
                        keyUsages: key.usages
                    }
                }));
            });
        });
        return cases;
    }
    var AesCBCTest = (function (_super) {
        __extends(AesCBCTest, _super);
        function AesCBCTest() {
            var _this = this;
            _super.call(this, ALG_AES_CBC);
            this.generateKey.push(GenerateKey(ALG_AES_CBC, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
            this.on("generate", function (keys) {
                _this.exportKey.push(ExportKey(keys));
                _this.encrypt.push(AesCBCTest.Encrypt(ALG_AES_CBC, keys));
                _this.wrap.push(AesCBCTest.Wrap(ALG_AES_CBC, keys));
                _this.run();
            });
        }
        AesCBCTest.Encrypt = function (alg, keys) {
            return keys.map(function (key) {
                return new test_1.EncryptCase({
                    name: alg + " len:" + key.algorithm.length,
                    params: {
                        encryptKey: key,
                        decryptKey: key,
                        algorithm: {
                            name: ALG_AES_CBC,
                            iv: new Uint8Array(16),
                        }
                    }
                });
            });
        };
        AesCBCTest.Wrap = function (alg, keys) {
            var cases = [];
            keys.forEach(function (key) {
                var _alg = key.algorithm;
                // format
                ["jwk", "raw"].forEach(function (format) {
                    cases.push(new test_1.WrapCase({
                        name: "wrap " + alg + " len:" + _alg.length,
                        params: {
                            format: format,
                            key: key,
                            wrappingKey: key,
                            unwrappingKey: key,
                            algorithm: {
                                name: alg,
                                iv: new Uint8Array(16)
                            },
                        }
                    }));
                });
            });
            return cases;
        };
        return AesCBCTest;
    }(test_1.AlgorithmTest));
    exports.AesCBCTest = AesCBCTest;
    var AesGCMTest = (function (_super) {
        __extends(AesGCMTest, _super);
        function AesGCMTest() {
            var _this = this;
            _super.call(this, ALG_AES_GCM);
            this.generateKey.push(GenerateKey(ALG_AES_GCM, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
            this.on("generate", function (keys) {
                _this.exportKey.push(ExportKey(keys));
                _this.encrypt.push(AesGCMTest.Encrypt(keys));
                _this.wrap.push(AesGCMTest.Wrap(ALG_AES_GCM, keys));
                _this.run();
            });
        }
        AesGCMTest.Encrypt = function (keys) {
            var cases = [];
            keys.forEach(function (key) {
                // tagLength
                [32, 64, 96, 104, 112, 120, 128]
                    .forEach(function (tagLength) {
                    cases.push(new test_1.EncryptCase({
                        name: ALG_AES_GCM + " len:" + key.algorithm.length + " tagLen:" + tagLength,
                        params: {
                            encryptKey: key,
                            decryptKey: key,
                            algorithm: {
                                name: ALG_AES_GCM,
                                iv: new Uint8Array(12),
                                additionalData: new Uint8Array(3),
                                tagLength: tagLength
                            }
                        }
                    }));
                });
            });
            return cases;
        };
        AesGCMTest.Wrap = function (alg, keys) {
            var cases = [];
            keys.forEach(function (key) {
                var _alg = key.algorithm;
                // format
                ["jwk", "raw"].forEach(function (format) {
                    // tagLength
                    [32, 64, 96, 104, 112, 120, 128].forEach(function (tagLength) {
                        cases.push(new test_1.WrapCase({
                            name: "wrap " + alg + " len:" + _alg.length + " tagLen:" + tagLength,
                            params: {
                                format: format,
                                key: key,
                                wrappingKey: key,
                                unwrappingKey: key,
                                algorithm: {
                                    name: alg,
                                    tagLength: tagLength,
                                    iv: new Uint8Array(16)
                                },
                            }
                        }));
                    });
                });
            });
            return cases;
        };
        return AesGCMTest;
    }(test_1.AlgorithmTest));
    exports.AesGCMTest = AesGCMTest;
    var AesCTRTest = (function (_super) {
        __extends(AesCTRTest, _super);
        function AesCTRTest() {
            var _this = this;
            _super.call(this, ALG_AES_CTR);
            this.generateKey.push(GenerateKey(ALG_AES_CTR, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
            this.on("generate", function (keys) {
                _this.exportKey.push(ExportKey(keys));
                _this.encrypt.push(AesCTRTest.Encrypt(ALG_AES_CTR, keys));
                _this.wrap.push(AesCTRTest.Wrap(ALG_AES_CTR, keys));
                _this.run();
            });
        }
        AesCTRTest.Encrypt = function (alg, keys) {
            return keys.map(function (key) { return new test_1.EncryptCase({
                name: alg + " len:" + key.algorithm.length,
                params: {
                    encryptKey: key,
                    decryptKey: key,
                    algorithm: {
                        name: alg,
                        counter: new Uint8Array(16),
                        length: 128
                    }
                }
            }); });
        };
        AesCTRTest.Wrap = function (alg, keys) {
            var cases = [];
            keys.forEach(function (key) {
                var _alg = key.algorithm;
                // format
                ["jwk", "raw"].forEach(function (format) {
                    cases.push(new test_1.WrapCase({
                        name: "wrap " + alg + " len:" + _alg.length,
                        params: {
                            format: format,
                            key: key,
                            wrappingKey: key,
                            unwrappingKey: key,
                            algorithm: {
                                name: alg,
                                counter: new Uint8Array(16),
                                length: 128
                            },
                        }
                    }));
                });
            });
            return cases;
        };
        return AesCTRTest;
    }(test_1.AlgorithmTest));
    exports.AesCTRTest = AesCTRTest;
    var AesCFBTest = (function (_super) {
        __extends(AesCFBTest, _super);
        function AesCFBTest() {
            var _this = this;
            _super.call(this, ALG_AES_CFB);
            this.generateKey.push(GenerateKey(ALG_AES_CFB, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
            this.on("generate", function (keys) {
                _this.exportKey.push(ExportKey(keys));
                _this.encrypt.push(AesCBCTest.Encrypt(ALG_AES_CFB, keys));
            });
        }
        return AesCFBTest;
    }(test_1.AlgorithmTest));
    exports.AesCFBTest = AesCFBTest;
    var AesCMACTest = (function (_super) {
        __extends(AesCMACTest, _super);
        function AesCMACTest() {
            var _this = this;
            _super.call(this, ALG_AES_CMAC);
            this.generateKey.push(GenerateKey(ALG_AES_CMAC, ["sign", "verify"]));
            this.on("generate", function (keys) {
                _this.exportKey.push(ExportKey(keys));
                _this.sign.push(AesCMACTest.Sign(ALG_AES_CMAC, keys));
                _this.run();
            });
        }
        AesCMACTest.Sign = function (alg, keys) {
            return keys.map(function (key) { return new test_1.SignCase({
                name: alg + " len:" + key.algorithm.length,
                params: {
                    algorithm: key.algorithm,
                    signKey: key,
                    verifyKey: key
                }
            }); });
        };
        return AesCMACTest;
    }(test_1.AlgorithmTest));
    exports.AesCMACTest = AesCMACTest;
});
define("tests/ec", ["require", "exports", "store/test"], function (require, exports, test_2) {
    "use strict";
    var ALG_EC_DSA = "ECDSA";
    var ALG_EC_DH = "ECDH";
    function GenerateKey(name, keyUsages) {
        var cases = [];
        // namedCurve
        ["P-256", "P-384", "P-521"].forEach(function (namedCurve) {
            cases.push(new test_2.GenerateKeyCase({
                name: "generate " + name + " curve:" + namedCurve,
                params: {
                    algorithm: {
                        name: name,
                        namedCurve: namedCurve
                    },
                    extractble: true,
                    keyUsages: keyUsages
                }
            }));
        });
        return cases;
    }
    function ExportKey(keys) {
        var cases = [];
        keys.forEach(function (keyPair) {
            var _loop_1 = function(keyType) {
                var key = keyPair[keyType];
                // format
                ["jwk", keyType === "publicKey" ? "spki" : "pkcs8"].forEach(function (format) {
                    cases.push(new test_2.ExportKeyCase({
                        name: key.algorithm.name + " curve:" + key.algorithm.namedCurve + " format:" + format,
                        params: {
                            format: format,
                            key: key,
                            algorithm: key.algorithm,
                            extractble: true,
                            keyUsages: key.usages
                        }
                    }));
                });
            };
            for (var keyType in keyPair) {
                _loop_1(keyType);
            }
        });
        return cases;
    }
    var EcDSATest = (function (_super) {
        __extends(EcDSATest, _super);
        function EcDSATest() {
            var _this = this;
            _super.call(this, ALG_EC_DSA);
            this.generateKey.push(GenerateKey(ALG_EC_DSA, ["sign", "verify"]));
            this.on("generate", function (keys) {
                _this.exportKey.push(ExportKey(keys));
                _this.sign.push(EcDSATest.Sign(ALG_EC_DSA, keys));
                _this.run();
            });
        }
        EcDSATest.Sign = function (alg, keys) {
            var cases = [];
            keys.forEach(function (keyPair) {
                // hash
                ["SHA-1", "SHA-256", "SHA-384", "SHA-512"]
                    .forEach(function (hash) {
                    cases.push(new test_2.SignCase({
                        name: alg + " curve:" + keyPair.publicKey.algorithm.namedCurve + " hash:" + hash,
                        params: {
                            signKey: keyPair.privateKey,
                            verifyKey: keyPair.publicKey,
                            algorithm: {
                                name: alg,
                                hash: {
                                    name: hash
                                }
                            }
                        }
                    }));
                });
            });
            return cases;
        };
        return EcDSATest;
    }(test_2.AlgorithmTest));
    exports.EcDSATest = EcDSATest;
    var EcDHTest = (function (_super) {
        __extends(EcDHTest, _super);
        function EcDHTest() {
            var _this = this;
            _super.call(this, ALG_EC_DH);
            this.generateKey.push(GenerateKey(ALG_EC_DH, ["deriveKey", "deriveBits"]));
            this.on("generate", function (keys) {
                _this.exportKey.push(ExportKey(keys));
                _this.deriveKey.push(EcDHTest.DeriveKey(ALG_EC_DH, keys));
                _this.deriveBits.push(EcDHTest.DeriveBits(ALG_EC_DH, keys));
                _this.run();
            });
        }
        EcDHTest.DeriveKey = function (alg, keys) {
            var cases = [];
            keys.forEach(function (keyPair) {
                // AES algs
                ["AES-CBC", "AES-GCM"].forEach(function (alg) {
                    // AES alg length
                    [128, 192, 256].forEach(function (algLen) {
                        var keyAlg = keyPair.privateKey.algorithm;
                        cases.push(new test_2.DeriveKeyCase({
                            name: "deriveKey " + keyAlg.name + "-" + keyAlg.namedCurve + " " + alg + "-" + algLen,
                            params: {
                                algorithm: {
                                    name: keyPair.privateKey.algorithm.name,
                                    namedCurve: keyAlg.namedCurve,
                                    public: keyPair.publicKey
                                },
                                derivedKeyAlg: {
                                    name: alg,
                                    length: algLen
                                },
                                key: keyPair.privateKey,
                                keyUsage: ["encrypt", "decrypt"]
                            }
                        }));
                    });
                });
            });
            return cases;
        };
        EcDHTest.DeriveBits = function (alg, keys) {
            var cases = [];
            keys.forEach(function (keyPair) {
                // bitsLength
                [128, 192, 256].forEach(function (bitsLength) {
                    var keyAlg = keyPair.privateKey.algorithm;
                    cases.push(new test_2.DeriveBitsCase({
                        name: "deriveKey " + keyAlg.name + "-" + keyAlg.namedCurve + " ",
                        params: {
                            algorithm: {
                                name: keyPair.privateKey.algorithm.name,
                                namedCurve: keyAlg.namedCurve,
                                public: keyPair.publicKey
                            },
                            key: keyPair.privateKey,
                            bitsLength: bitsLength
                        }
                    }));
                });
            });
            return cases;
        };
        return EcDHTest;
    }(test_2.AlgorithmTest));
    exports.EcDHTest = EcDHTest;
});
define("tests/rsa", ["require", "exports", "store/test"], function (require, exports, test_3) {
    "use strict";
    var ALG_RSA_SSA = "RSASSA-PKCS1-v1_5";
    var ALG_RSA_OAEP = "RSA-OAEP";
    var ALG_RSA_PSS = "RSA-PSS";
    function GenerateKey(name, keyUsages) {
        var cases = [];
        // modulusLength
        [1024, 2048,].forEach(function (modulusLength) {
            // publicExponent
            [new Uint8Array([3]), new Uint8Array([1, 0, 1])].forEach(function (publicExponent, index) {
                // sha
                ["SHA-1", "SHA-256", "SHA-384", "SHA-512"].forEach(function (hash) {
                    cases.push(new test_3.GenerateKeyCase({
                        name: "generate " + name + " exp:" + index + " mod:" + modulusLength + " hash:" + hash,
                        params: {
                            algorithm: {
                                name: name,
                                hash: {
                                    name: hash
                                },
                                publicExponent: publicExponent,
                                modulusLength: modulusLength
                            },
                            extractble: true,
                            keyUsages: keyUsages
                        }
                    }));
                });
            });
        });
        return cases;
    }
    function ExportKey(keys) {
        var cases = [];
        keys.forEach(function (keyPair) {
            var _loop_2 = function(keyType) {
                var key = keyPair[keyType];
                // format
                ["jwk", keyType === "publicKey" ? "spki" : "pkcs8"].forEach(function (format) {
                    cases.push(new test_3.ExportKeyCase({
                        name: key.algorithm.name + " mod:" + key.algorithm.modulusLength + " format:" + format,
                        params: {
                            format: format,
                            key: key,
                            algorithm: key.algorithm,
                            extractble: true,
                            keyUsages: key.usages
                        }
                    }));
                });
            };
            for (var keyType in keyPair) {
                _loop_2(keyType);
            }
        });
        return cases;
    }
    var RsaSSATest = (function (_super) {
        __extends(RsaSSATest, _super);
        function RsaSSATest() {
            var _this = this;
            _super.call(this, ALG_RSA_SSA);
            this.generateKey.push(GenerateKey(ALG_RSA_SSA, ["sign", "verify"]));
            this.on("generate", function (keys) {
                _this.exportKey.push(ExportKey(keys));
                _this.sign.push(RsaSSATest.Sign(ALG_RSA_SSA, keys));
                _this.run();
            });
        }
        RsaSSATest.Sign = function (alg, keys) {
            return keys.map(function (keyPair) { return new test_3.SignCase({
                name: alg + " hash:" + keyPair.publicKey.algorithm.hash.name + " pubExp:" + (keyPair.publicKey.algorithm.publicExponent.length === 1 ? 0 : 1) + " modLen:" + keyPair.publicKey.algorithm.modulusLength,
                params: {
                    signKey: keyPair.privateKey,
                    verifyKey: keyPair.publicKey,
                    algorithm: {
                        name: alg
                    }
                }
            }); });
        };
        return RsaSSATest;
    }(test_3.AlgorithmTest));
    exports.RsaSSATest = RsaSSATest;
    var RsaPSSTest = (function (_super) {
        __extends(RsaPSSTest, _super);
        function RsaPSSTest() {
            var _this = this;
            _super.call(this, ALG_RSA_PSS);
            this.generateKey.push(GenerateKey(ALG_RSA_PSS, ["sign", "verify"]));
            this.on("generate", function (keys) {
                _this.exportKey.push(ExportKey(keys));
                _this.sign.push(RsaPSSTest.Sign(ALG_RSA_PSS, keys));
                _this.run();
            });
        }
        RsaPSSTest.Sign = function (alg, keys) {
            var saltLength = 20;
            return keys.map(function (keyPair) { return new test_3.SignCase({
                name: alg + " hash:" + keyPair.publicKey.algorithm.hash.name + " pubExp:" + (keyPair.publicKey.algorithm.publicExponent.length === 1 ? 0 : 1) + " modLen:" + keyPair.publicKey.algorithm.modulusLength + "  saltLen:" + saltLength,
                params: {
                    signKey: keyPair.privateKey,
                    verifyKey: keyPair.publicKey,
                    algorithm: {
                        name: alg,
                        saltLength: 128
                    }
                }
            }); });
        };
        return RsaPSSTest;
    }(test_3.AlgorithmTest));
    exports.RsaPSSTest = RsaPSSTest;
    var RsaOAEPTest = (function (_super) {
        __extends(RsaOAEPTest, _super);
        function RsaOAEPTest() {
            var _this = this;
            _super.call(this, ALG_RSA_OAEP);
            this.generateKey.push(GenerateKey(ALG_RSA_OAEP, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
            this.on("generate", function (keys) {
                _this.exportKey.push(ExportKey(keys));
                _this.encrypt.push(RsaOAEPTest.Encrypt(ALG_RSA_OAEP, keys));
                RsaOAEPTest.Wrap(ALG_RSA_OAEP, keys, function (cases) {
                    _this.wrap.push(cases);
                    _this.run();
                });
            });
        }
        RsaOAEPTest.Encrypt = function (alg, keys) {
            var cases = [];
            // label
            [null, new Uint8Array(5)].forEach(function (label) {
                keys.forEach(function (keyPair) {
                    cases.push(new test_3.EncryptCase({
                        name: alg + " hash:" + keyPair.publicKey.algorithm.hash.name + " pubExp:" + (keyPair.publicKey.algorithm.publicExponent.length === 1 ? 0 : 1) + " modLen:" + keyPair.publicKey.algorithm.modulusLength + " label:" + label,
                        params: {
                            encryptKey: keyPair.publicKey,
                            decryptKey: keyPair.privateKey,
                            algorithm: label ? {
                                name: alg,
                                label: label
                            } : {
                                name: alg
                            }
                        }
                    }));
                });
            });
            return cases;
        };
        RsaOAEPTest.Wrap = function (alg, keys, cb) {
            var cases = [];
            var ref = 0;
            function refCount() {
                if (!--ref)
                    cb(cases);
            }
            // wrapKey
            ["AES-CBC", "AES-GCM"].forEach(function (aesKeyAlg) {
                try {
                    ref++;
                    crypto.subtle.generateKey({ name: aesKeyAlg, length: 128 }, true, ["encrypt"])
                        .then(function (aesKey) {
                        // format
                        ["jwk", "raw"].forEach(function (format) {
                            // label
                            [null, new Uint8Array(5)].forEach(function (label) {
                                keys.forEach(function (keyPair) {
                                    cases.push(new test_3.WrapCase({
                                        name: "wrap " + alg + " hash:" + keyPair.publicKey.algorithm.hash.name + " pubExp:" + (keyPair.publicKey.algorithm.publicExponent.length === 1 ? 0 : 1) + " modLen:" + keyPair.publicKey.algorithm.modulusLength + " label:" + label + " wrapKey:" + aesKeyAlg,
                                        params: {
                                            format: format,
                                            key: aesKey,
                                            wrappingKey: keyPair.publicKey,
                                            unwrappingKey: keyPair.privateKey,
                                            algorithm: label ? {
                                                name: alg,
                                                label: label
                                            } : {
                                                name: alg
                                            }
                                        }
                                    }));
                                });
                            });
                        });
                        refCount();
                    })
                        .catch(function (e) {
                        refCount();
                        console.error(e);
                    });
                }
                catch (e) {
                    console.error(e);
                    refCount();
                }
            });
        };
        return RsaOAEPTest;
    }(test_3.AlgorithmTest));
    exports.RsaOAEPTest = RsaOAEPTest;
});
define("tests/sha", ["require", "exports", "store/test"], function (require, exports, test_4) {
    "use strict";
    var ShaTest = (function (_super) {
        __extends(ShaTest, _super);
        function ShaTest() {
            _super.call(this, "SHA");
            this.digest.push(["SHA-1", "SHA-256", "SHA-384", "SHA-512"].map(function (hash) {
                return new test_4.DigestCase({
                    name: "digest " + hash,
                    params: {
                        algorithm: {
                            name: hash
                        }
                    }
                });
            }));
        }
        return ShaTest;
    }(test_4.AlgorithmTest));
    exports.ShaTest = ShaTest;
});
define("components/pie-chart", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    var PieChart = (function (_super) {
        __extends(PieChart, _super);
        function PieChart(props) {
            _super.call(this, props);
            this.state = {};
        }
        PieChart.prototype.render = function () {
            return (React.createElement("figure", {className: "pie-chart"}, React.createElement("svg", null, this.props.children.map(function (item) { return item.props.value ? item : null; }))));
        };
        return PieChart;
    }(React.Component));
    exports.PieChart = PieChart;
    var Pie = (function (_super) {
        __extends(Pie, _super);
        function Pie(props) {
            _super.call(this, props);
            this.state = {};
        }
        Pie.prototype.render = function () {
            var _a = this.props, className = _a.className, value = _a.value, size = _a.size;
            var rotate = this.props.rotate || 0;
            return (React.createElement("circle", {className: "pie " + className, r: size || 0, cy: size || 0, cx: size || 0, style: { strokeDasharray: value + ", 158", transform: "rotate(" + rotate + "deg)" }}));
        };
        return Pie;
    }(React.Component));
    exports.Pie = Pie;
});
define("components/test-table", ["require", "exports", "react", "store/store", "store/test", "components/pie-chart"], function (require, exports, React, store_2, test_5, pie_chart_1) {
    "use strict";
    var TestTable = (function (_super) {
        __extends(TestTable, _super);
        function TestTable(props) {
            _super.call(this, props);
            this.state = {};
        }
        TestTable.prototype.render = function () {
            var _this = this;
            return (React.createElement("table", {className: "test-table"}, React.createElement("thead", null, React.createElement("tr", null, React.createElement("td", null, "Allgorithm"), React.createElement("td", null, "generateKey"), React.createElement("td", null, "digest"), React.createElement("td", null, "export/import "), React.createElement("td", null, "sign/verify"), React.createElement("td", null, "encrypt/decrypt"), React.createElement("td", null, "derive key"), React.createElement("td", null, "derive bits"), React.createElement("td", null, "wrap/unwrap"))), React.createElement("tbody", null, this.props.model.map(function (item) { return React.createElement(TestTableItem, {model: item, onCellClick: _this.props.onCellClick}); }))));
        };
        return TestTable;
    }(React.Component));
    exports.TestTable = TestTable;
    var TestTableItem = (function (_super) {
        __extends(TestTableItem, _super);
        function TestTableItem(props) {
            _super.call(this, props);
            this.state = {};
        }
        TestTableItem.prototype.render = function () {
            var model = this.props.model;
            return (React.createElement("tr", null, React.createElement("td", null, model.state.name), React.createElement(TestTableItemCell, {model: model.generateKey, onCellClick: this.props.onCellClick}), React.createElement(TestTableItemCell, {model: model.digest, onCellClick: this.props.onCellClick}), React.createElement(TestTableItemCell, {model: model.exportKey, onCellClick: this.props.onCellClick}), React.createElement(TestTableItemCell, {model: model.sign, onCellClick: this.props.onCellClick}), React.createElement(TestTableItemCell, {model: model.encrypt, onCellClick: this.props.onCellClick}), React.createElement(TestTableItemCell, {model: model.deriveKey, onCellClick: this.props.onCellClick}), React.createElement(TestTableItemCell, {model: model.deriveBits, onCellClick: this.props.onCellClick}), React.createElement(TestTableItemCell, {model: model.wrap, onCellClick: this.props.onCellClick})));
        };
        TestTableItem = __decorate([
            store_2.Store()
        ], TestTableItem);
        return TestTableItem;
    }(React.Component));
    exports.TestTableItem = TestTableItem;
    var TestTableItemCell = (function (_super) {
        __extends(TestTableItemCell, _super);
        function TestTableItemCell(props) {
            _super.call(this, props);
            this.state = {};
        }
        TestTableItemCell.prototype.render = function () {
            var _this = this;
            var model = this.props.model;
            if (!model)
                return React.createElement("td", null);
            var items = model.state.items;
            var complited = model.state.complited;
            var success = 0, error = 0;
            items.forEach(function (item) {
                if (item.state.status === test_5.CaseStatus.success) {
                    success++;
                }
                else if (item.state.status === test_5.CaseStatus.error) {
                    error++;
                }
            });
            var length = items.length;
            return (React.createElement("td", {className: "test-cell"}, React.createElement("div", {onClick: function (e) { return _this.props.onCellClick(model); }}, React.createElement(TestChar, {success: success, error: error, length: length}))));
        };
        TestTableItemCell = __decorate([
            store_2.Store()
        ], TestTableItemCell);
        return TestTableItemCell;
    }(React.Component));
    exports.TestTableItemCell = TestTableItemCell;
    var TestChar = (function (_super) {
        __extends(TestChar, _super);
        function TestChar(props) {
            _super.call(this, props);
            this.state = {};
        }
        TestChar.prototype.count = function (len, val) {
            return len ? (val / len) : 0;
        };
        TestChar.prototype.render = function () {
            var _a = this.props, success = _a.success, error = _a.error, length = _a.length;
            return (React.createElement("div", {className: "test-chart shadow-1"}, React.createElement("div", {className: "value"}, Math.floor(this.count(length, success + error) * 100)), React.createElement(pie_chart_1.PieChart, null, React.createElement(pie_chart_1.Pie, {className: "error", value: 79 * this.count(length, error + success), size: 12.5}), React.createElement(pie_chart_1.Pie, {className: "success", value: 79 * this.count(length, success), size: 12.5}))));
        };
        return TestChar;
    }(React.Component));
    exports.TestChar = TestChar;
});
define("components/property", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    var PropertyView = (function (_super) {
        __extends(PropertyView, _super);
        function PropertyView(props) {
            _super.call(this, props);
            this.state = {};
        }
        PropertyView.prototype.render = function () {
            return (React.createElement("div", {className: "property-view"}, this.props.children));
        };
        return PropertyView;
    }(React.Component));
    exports.PropertyView = PropertyView;
    var PropertyViewItem = (function (_super) {
        __extends(PropertyViewItem, _super);
        function PropertyViewItem(props) {
            _super.call(this, props);
            this.state = {};
        }
        PropertyViewItem.prototype.render = function () {
            return (React.createElement("div", {className: "item"}, React.createElement("div", {className: "label"}, this.props.label), React.createElement("div", {className: "value"}, this.props.value)));
        };
        return PropertyViewItem;
    }(React.Component));
    exports.PropertyViewItem = PropertyViewItem;
    var PropertyViewGroup = (function (_super) {
        __extends(PropertyViewGroup, _super);
        function PropertyViewGroup(props) {
            _super.call(this, props);
            this.state = {};
        }
        PropertyViewGroup.prototype.render = function () {
            return (React.createElement("div", {className: "group"}, React.createElement("div", {className: "header"}, React.createElement("div", {className: "label"}, this.props.label)), this.props.children));
        };
        return PropertyViewGroup;
    }(React.Component));
    exports.PropertyViewGroup = PropertyViewGroup;
});
define("components/collapse-button", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    var CollapseButton = (function (_super) {
        __extends(CollapseButton, _super);
        function CollapseButton(props) {
            _super.call(this, props);
            this.state = {};
        }
        CollapseButton.prototype.render = function () {
            var _a = this.props, collapsed = _a.collapsed, onClick = _a.onClick;
            return (React.createElement("div", {className: "btn-collapse ", onClick: onClick}, collapsed ? "+" : "-"));
        };
        return CollapseButton;
    }(React.Component));
    exports.CollapseButton = CollapseButton;
});
define("components/detail", ["require", "exports", "react", "store/store", "store/test", "components/property", "components/collapse-button"], function (require, exports, React, store_3, test_6, property_1, collapse_button_1) {
    "use strict";
    var TestDetail = (function (_super) {
        __extends(TestDetail, _super);
        function TestDetail(props) {
            _super.call(this, props);
            this.state = {};
        }
        TestDetail.prototype.render = function () {
            return (React.createElement("table", {className: "detail"}, React.createElement("thead", null, React.createElement("tr", null, React.createElement("td", null), React.createElement("td", null, "name"), React.createElement("td", null, "time"), React.createElement("td", null, "status"), React.createElement("td", null, "message"))), this.props.model.state.items.map(function (item) { return (React.createElement(TestDetailItem, {test: item.state})); }), React.createElement("tbody", null)));
        };
        TestDetail = __decorate([
            store_3.Store()
        ], TestDetail);
        return TestDetail;
    }(React.Component));
    exports.TestDetail = TestDetail;
    var TestDetailItem = (function (_super) {
        __extends(TestDetailItem, _super);
        function TestDetailItem(props) {
            _super.call(this, props);
            this.state = {
                collapsed: true
            };
        }
        TestDetailItem.prototype.render = function () {
            var _this = this;
            var test = this.props.test;
            return (React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, React.createElement(collapse_button_1.CollapseButton, {collapsed: this.state.collapsed, onClick: function (e) { return _this.setState({ collapsed: !_this.state.collapsed }); }})), React.createElement("td", null, test.name), React.createElement("td", null, test.duration / 1000 + "s"), React.createElement("td", {className: "status " + test_6.CaseStatus[test.status]}, test_6.CaseStatus[test.status] || "not started"), React.createElement("td", null, test.stack)), React.createElement("tr", {hidden: this.state.collapsed}, React.createElement("td", null), React.createElement("td", {colSpan: 3}, React.createElement(DetailParamsView, {params: test.params})))));
        };
        return TestDetailItem;
    }(React.Component));
    exports.TestDetailItem = TestDetailItem;
    var DetailParamsView = (function (_super) {
        __extends(DetailParamsView, _super);
        function DetailParamsView(props) {
            _super.call(this, props);
            this.state = {};
        }
        DetailParamsView.prototype.renderKey = function (key, groupName) {
            console.log("renderKey");
            return (React.createElement(property_1.PropertyViewGroup, {label: groupName}, React.createElement(property_1.PropertyViewItem, {label: "type", value: key.type}), this.renderAlgrithm(key.algorithm, "Algorithm"), React.createElement(property_1.PropertyViewItem, {label: "extractable", value: key.extractable.toString()}), React.createElement(property_1.PropertyViewItem, {label: "usages", value: key.usages.join(", ")})));
        };
        DetailParamsView.prototype.renderItems = function (params) {
            var items = [];
            for (var key in params) {
                var value = params[key];
                if (key === "algorithm" || key === "derivedKeyAlg") {
                    items.push(this.renderAlgrithm(params[key], key));
                    continue;
                }
                else if (key === "keyUsages") {
                    value = params[key].join(", ");
                }
                else if (params[key].__proto__.constructor.name === "CryptoKey") {
                    items.push(this.renderKey(params[key], key));
                    continue;
                }
                else {
                    value = value.toString();
                }
                items.push(React.createElement(property_1.PropertyViewItem, {label: key, value: value}));
            }
            return items;
        };
        DetailParamsView.prototype.renderAlgrithm = function (alg, groupName) {
            var items = [];
            for (var key in alg) {
                var value = alg[key];
                var text = void 0;
                if (key === "publicExponent")
                    text = "[" + value.toString() + "]";
                else if (ArrayBuffer.isView(value))
                    text = "ArrayBuffer";
                else if (key === "hash")
                    text = value.name;
                else
                    text = value ? value.toString() : "null";
                items.push(React.createElement(property_1.PropertyViewItem, {label: key, value: text}));
            }
            return (React.createElement(property_1.PropertyViewGroup, {label: groupName}, items));
        };
        DetailParamsView.prototype.render = function () {
            return (React.createElement(property_1.PropertyView, null, this.renderItems(this.props.params)));
        };
        return DetailParamsView;
    }(React.Component));
    exports.DetailParamsView = DetailParamsView;
});
define("app", ["require", "exports", "react", "store/test", "tests/aes", "tests/rsa", "tests/sha", "tests/ec", "components/test-table", "components/detail", "components/property", "helper"], function (require, exports, React, test_7, aes_1, rsa_1, sha_1, ec_1, test_table_1, detail_1, property_2, helper) {
    "use strict";
    var tests = [
        new sha_1.ShaTest(),
        new aes_1.AesCBCTest(),
        // new AesCTRTest(),
        new aes_1.AesGCMTest(),
    ];
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props);
            this.state = {
                tests: [],
                selectedCrypto: "Native"
            };
            this.onCryptoChange = this.onCryptoChange.bind(this);
            this.onTestCaseClick = this.onTestCaseClick.bind(this);
        }
        App.prototype.createTests = function () {
            var _this = this;
            this.setState({
                tests: [],
                selectedTest: null,
                report: null
            }, function () {
                _this.setState({
                    tests: [
                        new sha_1.ShaTest(),
                        new aes_1.AesCBCTest(),
                        // new AesCTRTest(),
                        new aes_1.AesGCMTest(),
                        // new AesCFBTest(),
                        // new AesCMACTest(),
                        new rsa_1.RsaOAEPTest(),
                        new rsa_1.RsaPSSTest(),
                        // new RsaSSATest(),
                        new ec_1.EcDSATest(),
                        new ec_1.EcDHTest(),
                    ]
                });
            });
        };
        App.prototype.componentDidMount = function () {
            this.createTests();
            window.crypto = cryptoEngines.native; // set default crypto -> Native
        };
        App.prototype.getTotalTestTime = function () {
        };
        App.prototype.getReport = function () {
            var report = {
                created: new Date(),
                userAgent: window.navigator.userAgent,
                duration: 0,
                error: 0,
                success: 0
            };
            this.state.tests.forEach(function (test) {
                var testReport = test.report();
                report.duration += testReport.duration;
                report.error += testReport.error;
                report.success += testReport.success;
            });
            this.setState({ report: report });
        };
        App.prototype.onCryptoChange = function (e) {
            var selectedCrypto = e.target.value;
            switch (selectedCrypto) {
                case "0":
                    window.crypto = cryptoEngines.native;
                    this.setState({ selectedCrypto: "Native" });
                    break;
                case "1":
                    window.crypto = cryptoEngines.js;
                    this.setState({ selectedCrypto: "Java Script" });
                    break;
                default:
                    throw new Error("Uknown type of crypto module");
            }
            this.createTests();
        };
        App.prototype.onTestCaseClick = function (test) {
            var _this = this;
            if (this.state.selectedTest !== test)
                this.setState({ selectedTest: new test_7.TestCaseCollection([]) }, function () {
                    _this.setState({ selectedTest: test });
                });
        };
        App.prototype.render = function () {
            var _this = this;
            var info = helper.BrawserInfo();
            var _a = this.state, report = _a.report, tests = _a.tests;
            return (React.createElement("div", {className: "container"}, React.createElement("h3", null, info.name, " v", info.version), React.createElement("h4", null, "Select crypto module "), React.createElement("select", {ref: "crypto", name: "", defaultValue: "0", onChange: this.onCryptoChange}, React.createElement("option", {value: "0"}, "Native"), React.createElement("option", {value: "1"}, "JavaScript")), React.createElement("hr", null), React.createElement(test_table_1.TestTable, {model: tests, onCellClick: this.onTestCaseClick}), React.createElement("div", {className: "row"}, React.createElement("div", {className: "btn", onClick: function () { tests.forEach(function (item) { return item.run(); }); }}, "Run"), React.createElement("div", {className: "btn", onClick: function () { _this.createTests(); }}, "Reset"), React.createElement("div", {className: "btn", onClick: function () { _this.getReport(); }}, "Report")), report ?
                React.createElement("div", null, React.createElement("hr", null), React.createElement("h3", null, "Report: ", this.state.selectedCrypto), React.createElement(property_2.PropertyView, null, React.createElement(property_2.PropertyViewItem, {label: "Browser", value: info.name + " v" + info.version}), React.createElement(property_2.PropertyViewItem, {label: "UserAgent", value: window.navigator.userAgent}), React.createElement(property_2.PropertyViewItem, {label: "Created", value: report.created.toString()}), React.createElement(property_2.PropertyViewItem, {label: "Test duration", value: report.duration / 1000 + "s"}), React.createElement(property_2.PropertyViewItem, {label: "Test success", value: report.success}), React.createElement(property_2.PropertyViewItem, {label: "Test error", value: report.error})))
                :
                    null, React.createElement("hr", null), this.state.selectedTest ?
                React.createElement(detail_1.TestDetail, {model: this.state.selectedTest})
                :
                    null));
        };
        return App;
    }(React.Component));
    exports.App = App;
});
define("main", ["require", "exports", "react", "react-dom", "app"], function (require, exports, React, ReactDOM, app_1) {
    "use strict";
    ReactDOM.render(React.createElement(app_1.App, null), document.getElementById("app"));
});
