var app =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["__extends"] = __extends;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (immutable) */ __webpack_exports__["__rest"] = __rest;
/* harmony export (immutable) */ __webpack_exports__["__decorate"] = __decorate;
/* harmony export (immutable) */ __webpack_exports__["__param"] = __param;
/* harmony export (immutable) */ __webpack_exports__["__metadata"] = __metadata;
/* harmony export (immutable) */ __webpack_exports__["__awaiter"] = __awaiter;
/* harmony export (immutable) */ __webpack_exports__["__generator"] = __generator;
/* harmony export (immutable) */ __webpack_exports__["__exportStar"] = __exportStar;
/* harmony export (immutable) */ __webpack_exports__["__values"] = __values;
/* harmony export (immutable) */ __webpack_exports__["__read"] = __read;
/* harmony export (immutable) */ __webpack_exports__["__spread"] = __spread;
/* harmony export (immutable) */ __webpack_exports__["__asyncGenerator"] = __asyncGenerator;
/* harmony export (immutable) */ __webpack_exports__["__asyncDelegator"] = __asyncDelegator;
/* harmony export (immutable) */ __webpack_exports__["__asyncValues"] = __asyncValues;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
};

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), q = [], c, i;
    return i = { next: verb("next"), "throw": verb("throw"), "return": verb("return") }, i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { return function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]), next(); }); }; }
    function next() { if (!c && q.length) resume((c = q.shift())[0], c[1]); }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(c[3], e); } }
    function step(r) { r.done ? settle(c[2], r) : r.value[0] === "yield" ? settle(c[2], { value: r.value[1], done: false }) : Promise.resolve(r.value[1]).then(r.value[0] === "delegate" ? delegate : fulfill, reject); }
    function delegate(r) { step(r.done ? r : { value: ["yield", r.value], done: false }); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { c = void 0, f(v), next(); }
};

function __asyncDelegator(o) {
    var i = { next: verb("next"), "throw": verb("throw", function (e) { throw e; }), "return": verb("return", function (v) { return { value: v, done: true }; }) };
    return o = __asyncValues(o), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { return function (v) { return { value: ["delegate", (o[n] || f).call(o, v)], done: false }; }; }
};

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var store_1 = __webpack_require__(3);
var TestCase = (function (_super) {
    tslib_1.__extends(TestCase, _super);
    function TestCase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TestCase;
}(store_1.BaseStore));
exports.TestCase = TestCase;
var CaseStatus;
(function (CaseStatus) {
    CaseStatus[CaseStatus["ready"] = 0] = "ready";
    CaseStatus[CaseStatus["error"] = 1] = "error";
    CaseStatus[CaseStatus["success"] = 2] = "success";
    CaseStatus[CaseStatus["warning"] = 3] = "warning";
    CaseStatus[CaseStatus["working"] = 4] = "working";
})(CaseStatus = exports.CaseStatus || (exports.CaseStatus = {}));
var TestCaseCollection = (function (_super) {
    tslib_1.__extends(TestCaseCollection, _super);
    function TestCaseCollection(cases) {
        var _this = this;
        var _state = Object.assign({}, TestCaseCollection.defaultState, { items: cases || [], completed: 0 });
        _this = _super.call(this, _state) || this;
        _this.connectToCases(_this.state.items);
        return _this;
    }
    TestCaseCollection.prototype.connectToCases = function (cases) {
        for (var _i = 0, cases_1 = cases; _i < cases_1.length; _i++) {
            var item = cases_1[_i];
            item.on("change", this.onCaseChanged.bind(this, item));
        }
    };
    TestCaseCollection.prototype.add = function (item) {
        _super.prototype.add.call(this, item);
        this.connectToCases([item]);
    };
    TestCaseCollection.prototype.addRange = function (items) {
        _super.prototype.addRange.call(this, items);
        this.connectToCases(items);
    };
    TestCaseCollection.prototype.onCaseChanged = function (item) {
        if (item.state.status === CaseStatus.success || item.state.status === CaseStatus.error) {
            console.log(item.state.name);
            console.log("  Status:" + CaseStatus[item.state.status]);
            this.setState({
                completed: this.state.completed + 1
            });
            this.run();
        }
        else
            this.setState();
    };
    TestCaseCollection.prototype.run = function () {
        var state = this.state;
        if (this.length && state.completed !== this.length) {
            var testCase = this.items(state.completed);
            testCase.run();
        }
        else {
            this.emit("end", this);
        }
    };
    return TestCaseCollection;
}(store_1.BaseStoreCollection));
TestCaseCollection.defaultState = {
    completed: 0
};
exports.TestCaseCollection = TestCaseCollection;
var AlgorithmTest = (function (_super) {
    tslib_1.__extends(AlgorithmTest, _super);
    function AlgorithmTest(name) {
        var _this = _super.call(this, {
            name: name,
            selected: true,
        }) || this;
        _this.generateKey = new TestCaseCollection([]);
        _this.exportKey = new TestCaseCollection([]);
        _this.sign = new TestCaseCollection([]);
        _this.encrypt = new TestCaseCollection([]);
        _this.digest = new TestCaseCollection([]);
        _this.deriveKey = new TestCaseCollection([]);
        _this.deriveBits = new TestCaseCollection([]);
        _this.wrap = new TestCaseCollection([]);
        _this.onCaseChange = _this.onCaseChange.bind(_this);
        // connect to generate key
        if (_this.generateKey) {
            _this.generateKey.on("change", _this.onCaseChange);
        }
        return _this;
    }
    AlgorithmTest.prototype.on = function (event, cb) {
        return _super.prototype.on.call(this, event, cb);
    };
    AlgorithmTest.prototype.once = function (event, cb) {
        return _super.prototype.once.call(this, event, cb);
    };
    AlgorithmTest.prototype.getGeneratedKeys = function () {
        return this.generateKey
            .filter(function (_case) { return !!_case.state.key; })
            .map(function (_case) {
            return {
                key: _case.state.key,
                algorithm: _case.state.params.algorithm
            };
        });
    };
    AlgorithmTest.prototype.onCaseChange = function (item) {
        if (this.generateKey) {
            var done = true;
            for (var i in this.generateKey) {
                var state = this.generateKey.state;
                if (state.completed !== state.items.length) {
                    done = false;
                    break;
                }
            }
            if (done) {
                var keys = this.getGeneratedKeys();
                if (keys)
                    this.emit("generate", keys);
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
    AlgorithmTest.prototype.countDuration = function (tests) {
        var res = 0;
        var durations = tests.map(function (item) { return item.state.duration; });
        if (durations.length)
            res = durations.reduce(function (prev, cur) { return prev += cur; });
        return res;
    };
    AlgorithmTest.prototype.countStatus = function (tests, status) {
        var res = tests.filter(function (item) { return item.state.status === status; }).length;
        return res;
    };
    AlgorithmTest.prototype.report = function () {
        var _this = this;
        // total duration
        var duration = this.getAllTests().map(function (test) { return _this.countDuration(test); }).reduce(function (p, c) { return p + c; });
        var success = this.getAllTests().map(function (test) { return _this.countStatus(test, CaseStatus.success); }).reduce(function (p, c) { return p + c; });
        var error = this.getAllTests().map(function (test) { return _this.countStatus(test, CaseStatus.error); }).reduce(function (p, c) { return p + c; });
        return { duration: duration, success: success, error: error };
    };
    AlgorithmTest.prototype.run = function () {
        this.getAllTests().forEach(function (test) { return test.run(); });
    };
    return AlgorithmTest;
}(TestCase));
exports.AlgorithmTest = AlgorithmTest;
var GenerateKeyCase = (function (_super) {
    tslib_1.__extends(GenerateKeyCase, _super);
    function GenerateKeyCase(state) {
        var _this = this;
        state.duration = 0;
        _this = _super.call(this, state) || this;
        return _this;
    }
    GenerateKeyCase.prototype.run = function () {
        var _this = this;
        var params = this.state.params;
        if (!params)
            throw new Error("Params of GenerateKeyCase are empty");
        var startAt = new Date().getTime();
        Promise.resolve()
            .then(function () {
            _this.setState({ status: CaseStatus.working });
            return crypto.subtle.generateKey(params.algorithm, params.extractable, params.keyUsages);
        })
            .then(function (key) {
            var endAt = new Date().getTime();
            _this.setState({
                status: CaseStatus.success,
                key: key,
                duration: endAt - startAt
            });
        })
            .catch(function (e) {
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
}(TestCase));
exports.GenerateKeyCase = GenerateKeyCase;
var ExportKeyCase = (function (_super) {
    tslib_1.__extends(ExportKeyCase, _super);
    function ExportKeyCase(state) {
        var _this = this;
        state.duration = 0;
        _this = _super.call(this, state) || this;
        return _this;
    }
    ExportKeyCase.prototype.run = function () {
        var _this = this;
        var params = this.state.params;
        var startAt = new Date().getTime();
        Promise.resolve()
            .then(function () {
            if (!params)
                throw new Error("Params of ExportKeyCase are empty");
            _this.setState({ status: CaseStatus.working });
            return crypto.subtle.exportKey(params.format, params.key);
        })
            .then(function (data) {
            return crypto.subtle.importKey(params.format, data, params.algorithm, params.extractable, params.keyUsages);
        })
            .then(function (key) {
            var endAt = new Date().getTime();
            _this.setState({
                status: CaseStatus.success,
                duration: endAt - startAt
            });
        })
            .catch(function (e) {
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
}(TestCase));
exports.ExportKeyCase = ExportKeyCase;
var SignCase = (function (_super) {
    tslib_1.__extends(SignCase, _super);
    function SignCase(state) {
        var _this = this;
        state.duration = 0;
        _this = _super.call(this, state) || this;
        return _this;
    }
    SignCase.prototype.run = function () {
        var _this = this;
        var params = this.state.params;
        var startAt = new Date().getTime();
        Promise.resolve()
            .then(function () {
            if (!params)
                throw new Error("Params of SignCase are empty");
            _this.setState({ status: CaseStatus.working });
            return crypto.subtle.sign(params.algorithm, params.signKey, new Uint8Array([1, 2, 3, 4, 5]));
        })
            .then(function (data) {
            return crypto.subtle.verify(params.algorithm, params.verifyKey, data, new Uint8Array([1, 2, 3, 4, 5]));
        })
            .then(function (key) {
            var endAt = new Date().getTime();
            _this.setState({
                status: CaseStatus.success,
                duration: endAt - startAt
            });
            return;
        })
            .catch(function (e) {
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
    tslib_1.__extends(EncryptCase, _super);
    function EncryptCase(state) {
        var _this = this;
        state.duration = 0;
        _this = _super.call(this, state) || this;
        return _this;
    }
    EncryptCase.prototype.run = function () {
        var _this = this;
        var params = this.state.params;
        var startAt = new Date().getTime();
        Promise.resolve()
            .then(function () {
            if (!params)
                throw new Error("Params of EncryptCase are empty");
            _this.setState({ status: CaseStatus.working });
            return crypto.subtle.encrypt(params.algorithm, params.encryptKey, new Uint8Array([1, 2, 3, 4, 5]));
        })
            .then(function (data) {
            return crypto.subtle.decrypt(params.algorithm, params.decryptKey, data);
        })
            .then(function (key) {
            var endAt = new Date().getTime();
            _this.setState({
                status: CaseStatus.success,
                duration: endAt - startAt
            });
        })
            .catch(function (e) {
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
    tslib_1.__extends(DigestCase, _super);
    function DigestCase(state) {
        var _this = this;
        state.duration = 0;
        _this = _super.call(this, state) || this;
        return _this;
    }
    DigestCase.prototype.run = function () {
        var _this = this;
        var params = this.state.params;
        var startAt = new Date().getTime();
        Promise.resolve()
            .then(function () {
            if (!params)
                throw new Error("Params of DigestCase are empty");
            _this.setState({ status: CaseStatus.working });
            return crypto.subtle.digest(params.algorithm, new Uint8Array([1, 2, 3, 4, 5]));
        })
            .then(function (data) {
            var endAt = new Date().getTime();
            if (!data.byteLength)
                throw new Error("Wrong type of digest function result");
            _this.setState({
                status: CaseStatus.success,
                duration: endAt - startAt
            });
        })
            .catch(function (e) {
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
    tslib_1.__extends(DeriveKeyCase, _super);
    function DeriveKeyCase(state) {
        var _this = this;
        state.duration = 0;
        _this = _super.call(this, state) || this;
        return _this;
    }
    DeriveKeyCase.prototype.run = function () {
        var _this = this;
        var params = this.state.params;
        var startAt = new Date().getTime();
        Promise.resolve()
            .then(function () {
            if (!params)
                throw new Error("Params of DeriveKeyCase are empty");
            _this.setState({ status: CaseStatus.working });
            return crypto.subtle.deriveKey(params.algorithm, params.key, params.derivedKeyAlg, true, params.keyUsage);
        })
            .then(function (data) {
            var endAt = new Date().getTime();
            _this.setState({
                status: CaseStatus.success,
                duration: endAt - startAt
            });
        })
            .catch(function (e) {
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
    tslib_1.__extends(DeriveBitsCase, _super);
    function DeriveBitsCase(state) {
        var _this = this;
        state.duration = 0;
        _this = _super.call(this, state) || this;
        return _this;
    }
    DeriveBitsCase.prototype.run = function () {
        var _this = this;
        var params = this.state.params;
        var startAt = new Date().getTime();
        Promise.resolve()
            .then(function () {
            if (!params)
                throw new Error("Params of DeriveBitsCase are empty");
            _this.setState({ status: CaseStatus.working });
            return crypto.subtle.deriveBits(params.algorithm, params.key, params.bitsLength);
        })
            .then(function (data) {
            var endAt = new Date().getTime();
            _this.setState({
                status: CaseStatus.success,
                duration: endAt - startAt
            });
        })
            .catch(function (e) {
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
    tslib_1.__extends(WrapCase, _super);
    function WrapCase(state) {
        var _this = this;
        state.duration = 0;
        _this = _super.call(this, state) || this;
        return _this;
    }
    WrapCase.prototype.run = function () {
        var _this = this;
        var params = this.state.params;
        var startAt = new Date().getTime();
        Promise.resolve()
            .then(function () {
            if (!params)
                throw new Error("Params of DeriveBitsCase are empty");
            _this.setState({ status: CaseStatus.working });
            return crypto.subtle.wrapKey(params.format, params.key, params.wrappingKey, params.algorithm);
        })
            .then(function (data) {
            return crypto.subtle.unwrapKey(params.format, new Uint8Array(data), params.unwrappingKey, params.algorithm, params.key.algorithm, true, params.key.usages);
        })
            .then(function (key) {
            var endAt = new Date().getTime();
            _this.setState({
                status: CaseStatus.success,
                duration: endAt - startAt
            });
        })
            .catch(function (e) {
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var events_1 = __webpack_require__(7);
exports.STORE_EVENT_CHANGE = "change";
/**
 * Decorator to bind BaseStore to React component
 */
function Store(options) {
    if (options === void 0) { options = {}; }
    return function (target) {
        target.prototype.__onModelChange = function __onModelChange(state) {
            var mustUpdate = false;
            if (options.filter) {
                for (var key in state) {
                    if (options.filter.indexOf(key) > -1) {
                        mustUpdate = true;
                    }
                }
            }
            else
                mustUpdate = true;
            mustUpdate && this.setState({});
        };
        var oldCompDidMount = target.prototype.componentDidMount;
        target.prototype.componentDidMount = function componentDidMount() {
            this.__onModelChange = this.__onModelChange.bind(this);
            this.props.model.on(exports.STORE_EVENT_CHANGE, this.__onModelChange);
            if (oldCompDidMount)
                oldCompDidMount.call(this);
        };
        var oldCompWillUnmount = target.prototype.componentWillUnmount;
        target.prototype.componentWillUnmount = function componentWillUnmount() {
            this.props.model.removeListener(exports.STORE_EVENT_CHANGE, this.__onModelChange);
            if (oldCompWillUnmount)
                oldCompWillUnmount.call(this);
        };
    };
}
exports.Store = Store;
;
var BaseStore = (function (_super) {
    tslib_1.__extends(BaseStore, _super);
    function BaseStore(state) {
        if (state === void 0) { state = {}; }
        var _this = _super.call(this) || this;
        _this.state = state;
        return _this;
    }
    BaseStore.prototype.on = function (event, listener) {
        return _super.prototype.on.apply(this, arguments);
    };
    BaseStore.prototype.once = function (event, listener) {
        return _super.prototype.once.apply(this, arguments);
    };
    BaseStore.prototype.setState = function (state, cb) {
        if (state === void 0) { state = {}; }
        var inState = state;
        var thisState = this.state;
        if (typeof state === "object") {
            for (var i in state) {
                thisState[i] = inState[i];
            }
            this.emit(exports.STORE_EVENT_CHANGE, inState);
            cb && cb();
        }
        else
            throw new Error("Wrong type of 'state'. Must be Object");
    };
    return BaseStore;
}(events_1.EventEmitter));
exports.BaseStore = BaseStore;
var BaseStoreCollection = (function (_super) {
    tslib_1.__extends(BaseStoreCollection, _super);
    function BaseStoreCollection(state) {
        var _this = this;
        var _state = Object.assign({}, BaseStoreCollection.defaultState, state);
        _this = _super.call(this, _state) || this;
        return _this;
    }
    Object.defineProperty(BaseStoreCollection.prototype, "length", {
        get: function () {
            return this.getIterator().length;
        },
        enumerable: true,
        configurable: true
    });
    BaseStoreCollection.prototype.items = function (index) {
        return this.getIterator()[index];
    };
    BaseStoreCollection.prototype.add = function (item) {
        this.getIterator().push(item);
        this.emit("change", this.state);
    };
    BaseStoreCollection.prototype.addRange = function (items) {
        var _this = this;
        var _items = !Array.isArray(items) ? items.getIterator() : items;
        _items.forEach(function (item) { return _this.getIterator().push(item); });
        this.emit("change", this.state);
    };
    BaseStoreCollection.prototype.indexOf = function (item) {
        return this.getIterator().indexOf(item);
    };
    BaseStoreCollection.prototype.pop = function () {
        var res = this.getIterator().pop();
        if (res)
            this.emit("change", this.state);
        return res;
    };
    BaseStoreCollection.prototype.removeAt = function (index) {
        this.state.items = this.getIterator().filter(function (item, _index) { return _index !== index; });
        this.emit("change", this.state);
    };
    BaseStoreCollection.prototype.remove = function (item) {
        var index = this.indexOf(item);
        if (index > -1)
            this.removeAt(index);
    };
    BaseStoreCollection.prototype.removeRange = function (range) {
        var _this = this;
        this
            .filter(function (item, index) { return range.indexOf(index) > -1; })
            .forEach(function (item) { return _this.state.items = _this.getIterator().filter(function (_item) { return _item !== item; }); });
        this.emit("change", this.state);
    };
    BaseStoreCollection.prototype.clear = function () {
        this.state.items = new Array();
        this.emit("change", this.state);
    };
    BaseStoreCollection.prototype.getIterator = function () {
        return this.state.items;
    };
    BaseStoreCollection.prototype.forEach = function (cb, thisArg) {
        this.getIterator().forEach(cb);
    };
    BaseStoreCollection.prototype.map = function (cb) {
        return this.getIterator().map(cb);
    };
    BaseStoreCollection.prototype.filter = function (cb) {
        var res = new this.constructor();
        var filtered = this.getIterator().filter(cb);
        res.state.items = filtered;
        return res;
    };
    BaseStoreCollection.prototype.sort = function (cb) {
        var res = new this.constructor();
        var sorted = this.getIterator().sort(cb);
        res.state.items = sorted;
        return res;
    };
    BaseStoreCollection.prototype.every = function (cb) {
        return this.getIterator().every(cb);
    };
    BaseStoreCollection.prototype.some = function (cb) {
        return this.getIterator().some(cb);
    };
    BaseStoreCollection.prototype.isEmpty = function () {
        return this.length === 0;
    };
    return BaseStoreCollection;
}(BaseStore));
BaseStoreCollection.defaultState = {
    items: [],
};
exports.BaseStoreCollection = BaseStoreCollection;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var React = __webpack_require__(1);
var PropertyView = (function (_super) {
    tslib_1.__extends(PropertyView, _super);
    function PropertyView(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    PropertyView.prototype.render = function () {
        return (React.createElement("div", { className: "property-view" }, this.props.children));
    };
    return PropertyView;
}(React.Component));
exports.PropertyView = PropertyView;
var PropertyViewItem = (function (_super) {
    tslib_1.__extends(PropertyViewItem, _super);
    function PropertyViewItem(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    PropertyViewItem.prototype.render = function () {
        return (React.createElement("div", { className: "item" },
            React.createElement("div", { className: "label" }, this.props.label),
            React.createElement("div", { className: "value" }, this.props.value)));
    };
    return PropertyViewItem;
}(React.Component));
exports.PropertyViewItem = PropertyViewItem;
var PropertyViewGroup = (function (_super) {
    tslib_1.__extends(PropertyViewGroup, _super);
    function PropertyViewGroup(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    PropertyViewGroup.prototype.render = function () {
        return (React.createElement("div", { className: "group" },
            React.createElement("div", { className: "header" },
                React.createElement("div", { className: "label" }, this.props.label)),
            this.props.children));
    };
    return PropertyViewGroup;
}(React.Component));
exports.PropertyViewGroup = PropertyViewGroup;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var React = __webpack_require__(1);
var test_1 = __webpack_require__(2);
var aes_1 = __webpack_require__(15);
var rsa_1 = __webpack_require__(17);
var sha_1 = __webpack_require__(18);
var ec_1 = __webpack_require__(16);
var test_table_1 = __webpack_require__(12);
var detail_1 = __webpack_require__(10);
var property_1 = __webpack_require__(4);
var helper = __webpack_require__(13);
var self = window;
var tests = [sha_1.ShaTest, aes_1.AesCBCTest, aes_1.AesGCMTest, rsa_1.RsaOAEPTest, rsa_1.RsaPSSTest, rsa_1.RsaSSATest, ec_1.EcDSATest, ec_1.EcDHTest];
function newTests() {
    return tests.map(function (Test) { return new Test(); });
}
var App = (function (_super) {
    tslib_1.__extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            tests: newTests(),
            selectedCrypto: "0"
        };
        self.crypto = cryptoEngines.native; // set default crypto -> Native
        _this.onCryptoChange = _this.onCryptoChange.bind(_this);
        _this.onTestCaseClick = _this.onTestCaseClick.bind(_this);
        return _this;
    }
    App.prototype.createTests = function () {
        var _this = this;
        this.setState({ tests: undefined }, function () {
            return _this.setState({
                tests: newTests(),
                selectedTest: undefined,
                report: undefined
            });
        });
    };
    App.prototype.componentDidMount = function () {
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
        var _this = this;
        var selectedCrypto = e.currentTarget.value;
        switch (selectedCrypto) {
            case "0":
                self.crypto = cryptoEngines.native;
                break;
            case "1":
                self.crypto = cryptoEngines.js;
                break;
            case "2":
                self.crypto = cryptoEngines.local;
                break;
            default:
                throw new Error("Unknown type of crypto module");
        }
        this.setState({ selectedCrypto: selectedCrypto }, function () { return _this.createTests(); });
    };
    App.prototype.onTestCaseClick = function (test) {
        var _this = this;
        if (this.state.selectedTest !== test)
            this.setState({ selectedTest: new test_1.TestCaseCollection([]) }, function () {
                _this.setState({ selectedTest: test });
            });
    };
    App.prototype.render = function () {
        var _this = this;
        var info = helper.BrowserInfo();
        var _a = this.state, report = _a.report, tests = _a.tests;
        return (React.createElement("div", { className: "container" },
            React.createElement("h3", null,
                info.name,
                " v",
                info.version),
            React.createElement("h4", null, "Select crypto module "),
            React.createElement("select", { ref: "crypto", name: "", value: this.state.selectedCrypto, onChange: this.onCryptoChange },
                React.createElement("option", { value: "0" }, "Native"),
                React.createElement("option", { value: "1" }, "JavaScript"),
                React.createElement("option", { value: "2" }, "WebCrypto Local")),
            React.createElement("hr", null),
            this.state.tests ?
                React.createElement("div", null,
                    React.createElement(test_table_1.TestTable, { model: tests, onCellClick: this.onTestCaseClick }),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "btn", onClick: function () { tests.filter(function (item) { return item.state.selected; }).forEach(function (item) { return item.run(); }); } }, "Run"),
                        React.createElement("div", { className: "btn", onClick: function () { _this.createTests(); } }, "Reset"),
                        React.createElement("div", { className: "btn", onClick: function () { _this.getReport(); } }, "Report")),
                    report ?
                        React.createElement("div", null,
                            React.createElement("hr", null),
                            React.createElement("h3", null,
                                "Report: ",
                                this.state.selectedCrypto === "0" ? "Native" : this.state.selectedCrypto === "1" ? "JavaScript" : "WebCrypto Local"),
                            React.createElement(property_1.PropertyView, null,
                                React.createElement(property_1.PropertyViewItem, { label: "Browser", value: info.name + " v" + info.version }),
                                React.createElement(property_1.PropertyViewItem, { label: "UserAgent", value: window.navigator.userAgent }),
                                React.createElement(property_1.PropertyViewItem, { label: "Created", value: report.created.toString() }),
                                React.createElement(property_1.PropertyViewItem, { label: "Test duration", value: report.duration / 1000 + "s" }),
                                React.createElement(property_1.PropertyViewItem, { label: "Test success", value: report.success }),
                                React.createElement(property_1.PropertyViewItem, { label: "Test error", value: report.error })))
                        :
                            null,
                    React.createElement("hr", null),
                    this.state.selectedTest ?
                        React.createElement(detail_1.TestDetail, { model: this.state.selectedTest })
                        :
                            null)
                :
                    null));
    };
    return App;
}(React.Component));
exports.App = App;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var React = __webpack_require__(1);
var CollapseButton = (function (_super) {
    tslib_1.__extends(CollapseButton, _super);
    function CollapseButton(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    CollapseButton.prototype.render = function () {
        var _a = this.props, collapsed = _a.collapsed, onClick = _a.onClick;
        return (React.createElement("div", { className: "btn-collapse ", onClick: onClick }, collapsed ? "+" : "-"));
    };
    return CollapseButton;
}(React.Component));
exports.CollapseButton = CollapseButton;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var React = __webpack_require__(1);
var store_1 = __webpack_require__(3);
var test_1 = __webpack_require__(2);
var property_1 = __webpack_require__(4);
var collapse_button_1 = __webpack_require__(9);
var TestDetail = (function (_super) {
    tslib_1.__extends(TestDetail, _super);
    function TestDetail(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    TestDetail.prototype.render = function () {
        return (React.createElement("table", { className: "detail" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("td", null),
                    React.createElement("td", null, "name"),
                    React.createElement("td", null, "time"),
                    React.createElement("td", null, "status"),
                    React.createElement("td", null, "message"))),
            this.props.model.map(function (item) { return (React.createElement(TestDetailItem, { test: item.state })); }),
            React.createElement("tbody", null)));
    };
    return TestDetail;
}(React.Component));
TestDetail = tslib_1.__decorate([
    store_1.Store()
], TestDetail);
exports.TestDetail = TestDetail;
var TestDetailItem = (function (_super) {
    tslib_1.__extends(TestDetailItem, _super);
    function TestDetailItem(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            collapsed: true
        };
        return _this;
    }
    TestDetailItem.prototype.render = function () {
        var _this = this;
        var test = this.props.test;
        var status = test.status || test_1.CaseStatus.ready;
        return (React.createElement("tbody", null,
            React.createElement("tr", null,
                React.createElement("td", null,
                    React.createElement(collapse_button_1.CollapseButton, { collapsed: this.state.collapsed, onClick: function (e) { return _this.setState({ collapsed: !_this.state.collapsed }); } })),
                React.createElement("td", null, test.name),
                React.createElement("td", null, test.duration / 1e3 + "s"),
                React.createElement("td", { className: "status " + test_1.CaseStatus[status] }, test_1.CaseStatus[status]),
                React.createElement("td", null, test.stack)),
            !this.state.collapsed ?
                React.createElement("tr", null,
                    React.createElement("td", null),
                    React.createElement("td", { colSpan: 3 },
                        React.createElement(DetailParamsView, { params: test.params })))
                :
                    null));
    };
    return TestDetailItem;
}(React.Component));
exports.TestDetailItem = TestDetailItem;
var DetailParamsView = (function (_super) {
    tslib_1.__extends(DetailParamsView, _super);
    function DetailParamsView(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    DetailParamsView.prototype.renderKey = function (key, groupName) {
        console.log("renderKey");
        return (React.createElement(property_1.PropertyViewGroup, { label: groupName },
            React.createElement(property_1.PropertyViewItem, { label: "type", value: key.type }),
            this.renderAlgorithm(key.algorithm, "Algorithm"),
            React.createElement(property_1.PropertyViewItem, { label: "extractable", value: key.extractable.toString() }),
            React.createElement(property_1.PropertyViewItem, { label: "usages", value: key.usages.join(", ") })));
    };
    DetailParamsView.prototype.renderItems = function (params) {
        var items = [];
        for (var key in params) {
            var value = params[key];
            if (key === "algorithm" || key === "derivedKeyAlg") {
                items.push(this.renderAlgorithm(params[key], key));
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
            items.push(React.createElement(property_1.PropertyViewItem, { label: key, value: value }));
        }
        return items;
    };
    DetailParamsView.prototype.renderAlgorithm = function (alg, groupName) {
        var items = [];
        for (var key in alg) {
            var value = alg[key];
            var text = void 0;
            if (key === "publicExponent")
                text = value[0] === 1 ? "65537" : "3";
            else if (ArrayBuffer.isView(value))
                text = "ArrayBuffer";
            else if (key === "hash")
                text = value.name;
            else
                text = value ? value.toString() : "null";
            items.push(React.createElement(property_1.PropertyViewItem, { label: key, value: text }));
        }
        return (React.createElement(property_1.PropertyViewGroup, { label: groupName }, items));
    };
    DetailParamsView.prototype.render = function () {
        return (React.createElement(property_1.PropertyView, null, this.renderItems(this.props.params)));
    };
    return DetailParamsView;
}(React.Component));
exports.DetailParamsView = DetailParamsView;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var React = __webpack_require__(1);
var PieChart = (function (_super) {
    tslib_1.__extends(PieChart, _super);
    function PieChart(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    PieChart.prototype.render = function () {
        return (React.createElement("figure", { className: "pie-chart" },
            React.createElement("svg", null, this.props.children.map(function (item) { return item.props.value ? item : null; }))));
    };
    return PieChart;
}(React.Component));
exports.PieChart = PieChart;
var Pie = (function (_super) {
    tslib_1.__extends(Pie, _super);
    function Pie(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Pie.prototype.render = function () {
        var _a = this.props, className = _a.className, value = _a.value, size = _a.size;
        var rotate = this.props.rotate || 0;
        return (React.createElement("circle", { className: "pie " + className, r: size || 0, cy: size || 0, cx: size || 0, style: { strokeDasharray: value + ", 158", transform: "rotate(" + rotate + "deg)" } }));
    };
    return Pie;
}(React.Component));
exports.Pie = Pie;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var React = __webpack_require__(1);
var store_1 = __webpack_require__(3);
var test_1 = __webpack_require__(2);
var pie_chart_1 = __webpack_require__(11);
var TestTable = (function (_super) {
    tslib_1.__extends(TestTable, _super);
    function TestTable(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    TestTable.prototype.render = function () {
        var _this = this;
        return (React.createElement("table", { className: "test-table" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("input", { type: "checkbox", onChange: function (e) { return _this.props.model.forEach(function (item) {
                                return item.setState({ selected: e.currentTarget.checked });
                            }); } })),
                    React.createElement("td", null, "Algorithm"),
                    React.createElement("td", null, "generateKey"),
                    React.createElement("td", null, "digest"),
                    React.createElement("td", null, "export/import "),
                    React.createElement("td", null, "sign/verify"),
                    React.createElement("td", null, "encrypt/decrypt"),
                    React.createElement("td", null, "derive key"),
                    React.createElement("td", null, "derive bits"),
                    React.createElement("td", null, "wrap/unwrap"))),
            React.createElement("tbody", null, this.props.model.map(function (item) { return React.createElement(TestTableItem, { model: item, onCellClick: _this.props.onCellClick }); }))));
    };
    return TestTable;
}(React.Component));
exports.TestTable = TestTable;
var TestTableItem = (function (_super) {
    tslib_1.__extends(TestTableItem, _super);
    function TestTableItem(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    TestTableItem.prototype.render = function () {
        var _this = this;
        var model = this.props.model;
        return (React.createElement("tr", null,
            React.createElement("td", null,
                React.createElement("input", { type: "checkbox", checked: this.props.model.state.selected, onChange: function (e) { return _this.props.model.setState({ selected: e.currentTarget.checked }); } })),
            React.createElement("td", null, model.state.name),
            React.createElement(TestTableItemCell, { model: model.generateKey, onCellClick: this.props.onCellClick }),
            React.createElement(TestTableItemCell, { model: model.digest, onCellClick: this.props.onCellClick }),
            React.createElement(TestTableItemCell, { model: model.exportKey, onCellClick: this.props.onCellClick }),
            React.createElement(TestTableItemCell, { model: model.sign, onCellClick: this.props.onCellClick }),
            React.createElement(TestTableItemCell, { model: model.encrypt, onCellClick: this.props.onCellClick }),
            React.createElement(TestTableItemCell, { model: model.deriveKey, onCellClick: this.props.onCellClick }),
            React.createElement(TestTableItemCell, { model: model.deriveBits, onCellClick: this.props.onCellClick }),
            React.createElement(TestTableItemCell, { model: model.wrap, onCellClick: this.props.onCellClick })));
    };
    return TestTableItem;
}(React.Component));
TestTableItem = tslib_1.__decorate([
    store_1.Store()
], TestTableItem);
exports.TestTableItem = TestTableItem;
var TestTableItemCell = (function (_super) {
    tslib_1.__extends(TestTableItemCell, _super);
    function TestTableItemCell(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    TestTableItemCell.prototype.render = function () {
        var _this = this;
        var model = this.props.model;
        if (!model)
            return React.createElement("td", null);
        var completed = model.state.completed;
        var success = 0, error = 0;
        model.forEach(function (item) {
            if (item.state.status === test_1.CaseStatus.success) {
                success++;
            }
            else if (item.state.status === test_1.CaseStatus.error) {
                error++;
            }
        });
        var length = model.length;
        return (React.createElement("td", { className: "test-cell" },
            React.createElement("div", { onClick: function (e) { return _this.props.onCellClick(model); } },
                React.createElement(TestChar, { success: success, error: error, length: length }))));
    };
    return TestTableItemCell;
}(React.Component));
TestTableItemCell = tslib_1.__decorate([
    store_1.Store()
], TestTableItemCell);
exports.TestTableItemCell = TestTableItemCell;
var TestChar = (function (_super) {
    tslib_1.__extends(TestChar, _super);
    function TestChar(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    TestChar.prototype.count = function (len, val) {
        return len ? (val / len) : 0;
    };
    TestChar.prototype.render = function () {
        var _a = this.props, success = _a.success, error = _a.error, length = _a.length;
        return (React.createElement("div", { className: "test-chart shadow-1" },
            React.createElement("div", { className: "value" }, Math.floor(this.count(length, success + error) * 100)),
            React.createElement(pie_chart_1.PieChart, null,
                React.createElement(pie_chart_1.Pie, { className: "error", value: 79 * this.count(length, error + success), size: 12.5 }),
                React.createElement(pie_chart_1.Pie, { className: "success", value: 79 * this.count(length, success), size: 12.5 }))));
    };
    return TestChar;
}(React.Component));
exports.TestChar = TestChar;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns info about browser
 */
function BrowserInfo() {
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
    else if (/Trident/i.test(userAgent)) {
        res.name = "Internet Explorer";
        res.version = /rv:([\d\.]+)/i.exec(userAgent)[1];
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
exports.BrowserInfo = BrowserInfo;
if (!Object.assign)
    Object.assign = function (target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        var res = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];
            for (var prop in obj) {
                res[prop] = obj[prop];
            }
        }
        return res;
    };


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(6);
var app_1 = __webpack_require__(5);
ReactDOM.render(React.createElement(app_1.App, null), document.getElementById("app"));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var test_1 = __webpack_require__(2);
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
                extractable: true,
                keyUsages: keyUsages
            }
        }));
    });
    return cases;
}
function ExportKey(keys) {
    var cases = [];
    keys.forEach(function (item) {
        // format
        var alg_length = item.algorithm.length;
        ["raw", "jwk"].forEach(function (format) {
            cases.push(new test_1.ExportKeyCase({
                name: item.algorithm.name + " length:" + alg_length + " format:" + format,
                params: {
                    format: format,
                    key: item.key,
                    algorithm: item.algorithm,
                    extractable: true,
                    keyUsages: item.key.usages
                }
            }));
        });
    });
    return cases;
}
var AesCBCTest = (function (_super) {
    tslib_1.__extends(AesCBCTest, _super);
    function AesCBCTest() {
        var _this = _super.call(this, ALG_AES_CBC) || this;
        _this.generateKey.addRange(GenerateKey(ALG_AES_CBC, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        _this.on("generate", function (keys) {
            _this.exportKey.addRange(ExportKey(keys));
            _this.encrypt.addRange(AesCBCTest.Encrypt(ALG_AES_CBC, keys));
            _this.wrap.addRange(AesCBCTest.Wrap(ALG_AES_CBC, keys));
            _this.run();
        });
        return _this;
    }
    AesCBCTest.Encrypt = function (alg, keys) {
        return keys.map(function (item) {
            return new test_1.EncryptCase({
                name: alg + " len:" + item.algorithm.length,
                params: {
                    encryptKey: item.key,
                    decryptKey: item.key,
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
        keys.forEach(function (item) {
            var _alg = item.algorithm;
            // format
            ["jwk", "raw"].forEach(function (format) {
                cases.push(new test_1.WrapCase({
                    name: "wrap " + alg + " len:" + _alg.length,
                    params: {
                        format: format,
                        key: item.key,
                        wrappingKey: item.key,
                        unwrappingKey: item.key,
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
    tslib_1.__extends(AesGCMTest, _super);
    function AesGCMTest() {
        var _this = _super.call(this, ALG_AES_GCM) || this;
        _this.generateKey.addRange(GenerateKey(ALG_AES_GCM, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        _this.on("generate", function (keys) {
            _this.exportKey.addRange(ExportKey(keys));
            _this.encrypt.addRange(AesGCMTest.Encrypt(keys));
            _this.wrap.addRange(AesGCMTest.Wrap(ALG_AES_GCM, keys));
            _this.run();
        });
        return _this;
    }
    AesGCMTest.Encrypt = function (keys) {
        var cases = [];
        keys.forEach(function (item) {
            // tagLength
            [32, 64, 96, 104, 112, 120, 128]
                .forEach(function (tagLength) {
                cases.push(new test_1.EncryptCase({
                    name: ALG_AES_GCM + " len:" + item.algorithm.length + " tagLen:" + tagLength,
                    params: {
                        encryptKey: item.key,
                        decryptKey: item.key,
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
        keys.forEach(function (item) {
            var _alg = item.algorithm;
            // format
            ["jwk", "raw"].forEach(function (format) {
                // tagLength
                [32, 64, 96, 104, 112, 120, 128].forEach(function (tagLength) {
                    cases.push(new test_1.WrapCase({
                        name: "wrap " + alg + " len:" + _alg.length + " tagLen:" + tagLength,
                        params: {
                            format: format,
                            key: item.key,
                            wrappingKey: item.key,
                            unwrappingKey: item.key,
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
    tslib_1.__extends(AesCTRTest, _super);
    function AesCTRTest() {
        var _this = _super.call(this, ALG_AES_CTR) || this;
        _this.generateKey.addRange(GenerateKey(ALG_AES_CTR, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        _this.on("generate", function (keys) {
            _this.exportKey.addRange(ExportKey(keys));
            _this.encrypt.addRange(AesCTRTest.Encrypt(ALG_AES_CTR, keys));
            _this.wrap.addRange(AesCTRTest.Wrap(ALG_AES_CTR, keys));
            _this.run();
        });
        return _this;
    }
    AesCTRTest.Encrypt = function (alg, keys) {
        return keys.map(function (item) { return new test_1.EncryptCase({
            name: alg + " len:" + item.algorithm.length,
            params: {
                encryptKey: item.key,
                decryptKey: item.key,
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
        keys.forEach(function (item) {
            var _alg = item.algorithm;
            // format
            ["jwk", "raw"].forEach(function (format) {
                cases.push(new test_1.WrapCase({
                    name: "wrap " + alg + " len:" + _alg.length,
                    params: {
                        format: format,
                        key: item.key,
                        wrappingKey: item.key,
                        unwrappingKey: item.key,
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
    tslib_1.__extends(AesCFBTest, _super);
    function AesCFBTest() {
        var _this = _super.call(this, ALG_AES_CFB) || this;
        _this.generateKey.addRange(GenerateKey(ALG_AES_CFB, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        _this.on("generate", function (keys) {
            _this.exportKey.addRange(ExportKey(keys));
            _this.encrypt.addRange(AesCBCTest.Encrypt(ALG_AES_CFB, keys));
        });
        return _this;
    }
    return AesCFBTest;
}(test_1.AlgorithmTest));
exports.AesCFBTest = AesCFBTest;
var AesCMACTest = (function (_super) {
    tslib_1.__extends(AesCMACTest, _super);
    function AesCMACTest() {
        var _this = _super.call(this, ALG_AES_CMAC) || this;
        _this.generateKey.addRange(GenerateKey(ALG_AES_CMAC, ["sign", "verify"]));
        _this.on("generate", function (keys) {
            _this.exportKey.addRange(ExportKey(keys));
            _this.sign.addRange(AesCMACTest.Sign(ALG_AES_CMAC, keys));
            _this.run();
        });
        return _this;
    }
    AesCMACTest.Sign = function (alg, keys) {
        return keys.map(function (item) { return new test_1.SignCase({
            name: alg + " len:" + item.algorithm.length,
            params: {
                algorithm: item.algorithm,
                signKey: item.key,
                verifyKey: item.key,
            }
        }); });
    };
    return AesCMACTest;
}(test_1.AlgorithmTest));
exports.AesCMACTest = AesCMACTest;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var test_1 = __webpack_require__(2);
var ALG_EC_DSA = "ECDSA";
var ALG_EC_DH = "ECDH";
function GenerateKey(name, keyUsages) {
    var cases = [];
    // namedCurve
    ["P-256", "P-384", "P-521"].forEach(function (namedCurve) {
        cases.push(new test_1.GenerateKeyCase({
            name: "generate " + name + " curve:" + namedCurve,
            params: {
                algorithm: {
                    name: name,
                    namedCurve: namedCurve
                },
                extractable: true,
                keyUsages: keyUsages
            }
        }));
    });
    return cases;
}
function ExportKey(keys) {
    var cases = [];
    keys.forEach(function (item) {
        ["publicKey", "privateKey"].forEach(function (keyType) {
            var key = item.key[keyType];
            // format
            ["jwk", keyType === "publicKey" ? "spki" : "pkcs8"].forEach(function (format) {
                cases.push(new test_1.ExportKeyCase({
                    name: key.algorithm.name + " curve:" + key.algorithm.namedCurve + " format:" + format,
                    params: {
                        format: format,
                        key: key,
                        algorithm: item.algorithm,
                        extractable: true,
                        keyUsages: key.usages
                    }
                }));
            });
        });
    });
    return cases;
}
var EcDSATest = (function (_super) {
    tslib_1.__extends(EcDSATest, _super);
    function EcDSATest() {
        var _this = _super.call(this, ALG_EC_DSA) || this;
        _this.generateKey.addRange(GenerateKey(ALG_EC_DSA, ["sign", "verify"]));
        _this.on("generate", function (keys) {
            _this.exportKey.addRange(ExportKey(keys));
            _this.sign.addRange(EcDSATest.Sign(ALG_EC_DSA, keys));
            _this.run();
        });
        return _this;
    }
    EcDSATest.Sign = function (alg, keys) {
        var cases = [];
        keys.forEach(function (item) {
            // hash
            ["SHA-1", "SHA-256", "SHA-384", "SHA-512"]
                .forEach(function (hash) {
                var pkey = item.key;
                cases.push(new test_1.SignCase({
                    name: alg + " curve:" + item.algorithm.namedCurve + " hash:" + hash,
                    params: {
                        signKey: pkey.privateKey,
                        verifyKey: pkey.publicKey,
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
}(test_1.AlgorithmTest));
exports.EcDSATest = EcDSATest;
var EcDHTest = (function (_super) {
    tslib_1.__extends(EcDHTest, _super);
    function EcDHTest() {
        var _this = _super.call(this, ALG_EC_DH) || this;
        _this.generateKey.addRange(GenerateKey(ALG_EC_DH, ["deriveKey", "deriveBits"]));
        _this.on("generate", function (keys) {
            _this.exportKey.addRange(ExportKey(keys));
            _this.deriveKey.addRange(EcDHTest.DeriveKey(ALG_EC_DH, keys));
            _this.deriveBits.addRange(EcDHTest.DeriveBits(ALG_EC_DH, keys));
            _this.run();
        });
        return _this;
    }
    EcDHTest.DeriveKey = function (alg, keys) {
        var cases = [];
        keys.forEach(function (item) {
            // AES algs
            ["AES-CBC", "AES-GCM"].forEach(function (alg) {
                // AES alg length
                [128, 192, 256].forEach(function (algLen) {
                    var pkey = item.key;
                    var keyAlg = item.algorithm;
                    cases.push(new test_1.DeriveKeyCase({
                        name: "deriveKey " + keyAlg.name + "-" + keyAlg.namedCurve + " " + alg + "-" + algLen,
                        params: {
                            algorithm: {
                                name: pkey.privateKey.algorithm.name,
                                namedCurve: keyAlg.namedCurve,
                                public: pkey.publicKey
                            },
                            derivedKeyAlg: {
                                name: alg,
                                length: algLen
                            },
                            key: pkey.privateKey,
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
        keys.forEach(function (item) {
            // bitsLength
            [128, 192, 256].forEach(function (bitsLength) {
                var pkey = item.key;
                var keyAlg = item.algorithm;
                cases.push(new test_1.DeriveBitsCase({
                    name: "deriveKey " + keyAlg.name + "-" + keyAlg.namedCurve + " ",
                    params: {
                        algorithm: {
                            name: pkey.privateKey.algorithm.name,
                            namedCurve: keyAlg.namedCurve,
                            public: pkey.publicKey
                        },
                        key: pkey.privateKey,
                        bitsLength: bitsLength
                    }
                }));
            });
        });
        return cases;
    };
    return EcDHTest;
}(test_1.AlgorithmTest));
exports.EcDHTest = EcDHTest;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var test_1 = __webpack_require__(2);
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
                cases.push(new test_1.GenerateKeyCase({
                    name: "generate " + name + " exp:" + (index ? 65537 : 3) + " mod:" + modulusLength + " hash:" + hash,
                    params: {
                        algorithm: {
                            name: name,
                            hash: {
                                name: hash
                            },
                            publicExponent: publicExponent,
                            modulusLength: modulusLength
                        },
                        extractable: true,
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
    keys.forEach(function (item) {
        var pkey = item.key;
        ["publicKey", "privateKey"].forEach(function (keyType) {
            var key = pkey[keyType];
            // format
            ["jwk", keyType === "publicKey" ? "spki" : "pkcs8"].forEach(function (format) {
                cases.push(new test_1.ExportKeyCase({
                    name: key.algorithm.name + " mod:" + item.algorithm.modulusLength + " pubExp:" + (key.algorithm.publicExponent.length === 1 ? 3 : 65537) + "  format:" + format,
                    params: {
                        format: format,
                        key: key,
                        algorithm: item.algorithm,
                        extractable: true,
                        keyUsages: key.usages
                    }
                }));
            });
        });
    });
    return cases;
}
var RsaSSATest = (function (_super) {
    tslib_1.__extends(RsaSSATest, _super);
    function RsaSSATest() {
        var _this = _super.call(this, ALG_RSA_SSA) || this;
        _this.generateKey.addRange(GenerateKey(ALG_RSA_SSA, ["sign", "verify"]));
        _this.on("generate", function (keys) {
            _this.exportKey.addRange(ExportKey(keys));
            _this.sign.addRange(RsaSSATest.Sign(ALG_RSA_SSA, keys));
            _this.run();
        });
        return _this;
    }
    RsaSSATest.Sign = function (alg, keys) {
        return keys.map(function (item) {
            var pkey = item.key;
            var alg = pkey.publicKey.algorithm.name;
            var hash = item.algorithm.hash.name || "unknown";
            var params = {
                name: alg + " hash:" + hash + " pubExp:" + (pkey.publicKey.algorithm.publicExponent.length === 1 ? 3 : 65537) + " modLen:" + item.algorithm.modulusLength,
                params: {
                    signKey: pkey.privateKey,
                    verifyKey: pkey.publicKey,
                    algorithm: item.algorithm
                }
            };
            return new test_1.SignCase(params);
        });
    };
    return RsaSSATest;
}(test_1.AlgorithmTest));
exports.RsaSSATest = RsaSSATest;
var RsaPSSTest = (function (_super) {
    tslib_1.__extends(RsaPSSTest, _super);
    function RsaPSSTest() {
        var _this = _super.call(this, ALG_RSA_PSS) || this;
        _this.generateKey.addRange(GenerateKey(ALG_RSA_PSS, ["sign", "verify"]));
        _this.on("generate", function (keys) {
            _this.exportKey.addRange(ExportKey(keys));
            _this.sign.addRange(RsaPSSTest.Sign(ALG_RSA_PSS, keys));
            _this.run();
        });
        return _this;
    }
    RsaPSSTest.Sign = function (alg, keys) {
        var saltLength = 20;
        return keys.map(function (item) {
            var pkey = item.key;
            var params = {
                name: alg + " hash:" + item.algorithm.hash.name + " pubExp:" + (item.algorithm.publicExponent.length === 1 ? 3 : 65537) + " modLen:" + item.algorithm.modulusLength + "  saltLen:" + saltLength,
                params: {
                    signKey: pkey.privateKey,
                    verifyKey: pkey.publicKey,
                    algorithm: {
                        name: alg,
                        hash: item.algorithm.hash,
                        saltLength: 128
                    }
                }
            };
            return new test_1.SignCase(params);
        });
    };
    return RsaPSSTest;
}(test_1.AlgorithmTest));
exports.RsaPSSTest = RsaPSSTest;
var RsaOAEPTest = (function (_super) {
    tslib_1.__extends(RsaOAEPTest, _super);
    function RsaOAEPTest() {
        var _this = _super.call(this, ALG_RSA_OAEP) || this;
        _this.generateKey.addRange(GenerateKey(ALG_RSA_OAEP, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]));
        _this.on("generate", function (keys) {
            _this.exportKey.addRange(ExportKey(keys));
            _this.encrypt.addRange(RsaOAEPTest.Encrypt(ALG_RSA_OAEP, keys));
            RsaOAEPTest.Wrap(ALG_RSA_OAEP, keys, function (cases) {
                _this.wrap.addRange(cases);
                _this.run();
            });
        });
        return _this;
    }
    RsaOAEPTest.Encrypt = function (alg, keys) {
        var cases = [];
        // label
        [null, new Uint8Array(5)].forEach(function (label) {
            keys.forEach(function (item) {
                var pkey = item.key;
                cases.push(new test_1.EncryptCase({
                    name: alg + " hash:" + item.algorithm.hash.name + " pubExp:" + (item.algorithm.publicExponent.length === 1 ? 3 : 65537) + " modLen:" + item.algorithm.modulusLength + " label:" + label,
                    params: {
                        encryptKey: pkey.publicKey,
                        decryptKey: pkey.privateKey,
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
                Promise.resolve()
                    .then(function () {
                    return crypto.subtle.generateKey({ name: aesKeyAlg, length: 128 }, true, ["encrypt"]);
                })
                    .then(function (aesKey) {
                    // format
                    ["jwk", "raw"].forEach(function (format) {
                        // label
                        [null, new Uint8Array(5)].forEach(function (label) {
                            keys.forEach(function (item) {
                                var pkey = item.key;
                                cases.push(new test_1.WrapCase({
                                    name: "wrap " + alg + " hash:" + item.algorithm.hash.name + " pubExp:" + (item.algorithm.publicExponent.length === 1 ? 3 : 65537) + " modLen:" + item.algorithm.modulusLength + " label:" + label + " wrapKey:" + aesKeyAlg,
                                    params: {
                                        format: format,
                                        key: aesKey,
                                        wrappingKey: pkey.publicKey,
                                        unwrappingKey: pkey.privateKey,
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
}(test_1.AlgorithmTest));
exports.RsaOAEPTest = RsaOAEPTest;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var test_1 = __webpack_require__(2);
var ShaTest = (function (_super) {
    tslib_1.__extends(ShaTest, _super);
    function ShaTest() {
        var _this = _super.call(this, "SHA") || this;
        _this.digest.addRange(["SHA-1", "SHA-256", "SHA-384", "SHA-512"].map(function (hash) {
            return new test_1.DigestCase({
                name: "digest " + hash,
                params: {
                    algorithm: {
                        name: hash
                    }
                }
            });
        }));
        return _this;
    }
    return ShaTest;
}(test_1.AlgorithmTest));
exports.ShaTest = ShaTest;


/***/ })
/******/ ]);