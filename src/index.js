/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(1));
	__export(__webpack_require__(2));


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var _w = self;
	exports.nativeCrypto = _w.msCrypto || _w.crypto;
	exports.nativeSubtle = exports.nativeCrypto.subtle || exports.nativeCrypto.webkitSubtle;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var helper_1 = __webpack_require__(3);
	var crypto_1 = __webpack_require__(5);
	var init_1 = __webpack_require__(1);
	var _w = self;
	exports.browser = helper_1.BrowserInfo();
	function WrapFunction(subtle, name) {
	    var fn = subtle[name];
	    subtle[name] = function () {
	        var _args = arguments;
	        return new Promise(function (resolve, reject) {
	            var op = fn.apply(subtle, _args);
	            op.oncomplete = function (e) {
	                console.log("Complited");
	                resolve(e.target.result);
	            };
	            op.onerror = function (e) {
	                console.log("Error");
	                reject("Error on running '" + name + "' function");
	            };
	        });
	    };
	}
	if (_w.msCrypto) {
	    if (!_w.Promise)
	        throw new crypto_1.LinerError(crypto_1.LinerError.MODULE_NOT_FOUND, "Promise", "https://www.promisejs.org");
	    WrapFunction(init_1.nativeSubtle, "generateKey");
	    WrapFunction(init_1.nativeSubtle, "digest");
	    WrapFunction(init_1.nativeSubtle, "sign");
	    WrapFunction(init_1.nativeSubtle, "verify");
	    WrapFunction(init_1.nativeSubtle, "encrypt");
	    WrapFunction(init_1.nativeSubtle, "decrypt");
	    WrapFunction(init_1.nativeSubtle, "importKey");
	    WrapFunction(init_1.nativeSubtle, "exportKey");
	    WrapFunction(init_1.nativeSubtle, "wrapKey");
	    WrapFunction(init_1.nativeSubtle, "unwrapKey");
	    WrapFunction(init_1.nativeSubtle, "deriveKey");
	    WrapFunction(init_1.nativeSubtle, "deriveBits");
	}
	delete self.crypto;
	_w.crypto = new crypto_1.Crypto();


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	exports.Browser = {
	    IE: "Internet Explorer",
	    Safari: "Safari",
	    Edge: "Edge",
	    Chrome: "Chrome",
	    Firefox: "Firefox Mozilla",
	};
	/**
	 * Returns info about browser
	 */
	function BrowserInfo() {
	    var res = {
	        name: "",
	        version: ""
	    };
	    if (typeof window !== "object" && typeof self !== void "object")
	        return {
	            name: "NodeJS",
	            version: process.version
	        };
	    var userAgent = self.navigator.userAgent;
	    var reg;
	    if (reg = /edge\/([\d\.]+)/i.exec(userAgent)) {
	        res.name = exports.Browser.Edge;
	        res.version = reg[1];
	    }
	    else if (/msie/i.test(userAgent)) {
	        res.name = exports.Browser.IE;
	        res.version = /msie ([\d\.]+)/i.exec(userAgent)[1];
	    }
	    else if (/chrome/i.test(userAgent)) {
	        res.name = exports.Browser.Chrome;
	        res.version = /chrome\/([\d\.]+)/i.exec(userAgent)[1];
	    }
	    else if (/safari/i.test(userAgent)) {
	        res.name = exports.Browser.Safari;
	        res.version = /([\d\.]+) safari/i.exec(userAgent)[1];
	    }
	    else if (/firefox/i.test(userAgent)) {
	        res.name = exports.Browser.Firefox;
	        res.version = /firefox\/([\d\.]+)/i.exec(userAgent)[1];
	    }
	    return res;
	}
	exports.BrowserInfo = BrowserInfo;
	function string2buffer(binaryString) {
	    var res = new Uint8Array(binaryString.length);
	    for (var i = 0; i < binaryString.length; i++)
	        res[i] = binaryString.charCodeAt(i);
	    return res;
	}
	exports.string2buffer = string2buffer;
	function buffer2string(buffer) {
	    var res = "";
	    for (var i = 0; i < buffer.length; i++)
	        res += String.fromCharCode(buffer[i]);
	    return res;
	}
	exports.buffer2string = buffer2string;
	function concat() {
	    var buf = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        buf[_i - 0] = arguments[_i];
	    }
	    var res = new Uint8Array(buf.map(function (item) { return item.length; }).reduce(function (prev, cur) { return prev + cur; }));
	    var offset = 0;
	    buf.forEach(function (item, index) {
	        for (var i = 0; i < item.length; i++)
	            res[offset + i] = item[i];
	        offset += item.length;
	    });
	    return res;
	}
	exports.concat = concat;
	function assign(target) {
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
	}
	exports.assign = assign;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var webcrypto_core_1 = __webpack_require__(6);
	var subtle_1 = __webpack_require__(17);
	var init_1 = __webpack_require__(1);
	var LinerError = (function (_super) {
	    __extends(LinerError, _super);
	    function LinerError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 10;
	        return _this;
	    }
	    return LinerError;
	}(webcrypto_core_1.WebCryptoError));
	exports.LinerError = LinerError;
	LinerError.MODULE_NOT_FOUND = "Module '%1' is not found. Download it from %2.\nOnly hash algorithms supported by the user agent will be supported.";
	LinerError.UNSUPPORTED_ALGORITHM = "Unsupported algorithm '%1'";
	var Crypto = (function () {
	    function Crypto() {
	        this.subtle = new subtle_1.SubtleCrypto();
	    }
	    Crypto.prototype.getRandomValues = function (array) {
	        return init_1.nativeCrypto.getRandomValues(array);
	    };
	    return Crypto;
	}());
	exports.Crypto = Crypto;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(7));
	__export(__webpack_require__(8));
	__export(__webpack_require__(9));
	__export(__webpack_require__(10));
	__export(__webpack_require__(11));
	__export(__webpack_require__(14));
	__export(__webpack_require__(13));
	__export(__webpack_require__(15));
	__export(__webpack_require__(12));


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	function printf(text) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    var msg = text;
	    var regFind = /[^%](%\d+)/g;
	    var match;
	    var matches = [];
	    while (match = regFind.exec(msg)) {
	        matches.push({ arg: match[1], index: match.index });
	    }
	    // replace matches
	    for (var i = matches.length - 1; i >= 0; i--) {
	        var item = matches[i];
	        var arg = item.arg.substring(1);
	        var index = item.index + 1;
	        msg = msg.substring(0, index) + arguments[+arg] + msg.substring(index + 1 + arg.length);
	    }
	    // convert %% -> %
	    msg = msg.replace("%%", "%");
	    return msg;
	}
	var WebCryptoError = (function (_super) {
	    __extends(WebCryptoError, _super);
	    function WebCryptoError(template) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        var _this = _super.call(this) || this;
	        _this.code = 0;
	        _this.message = printf.apply(void 0, [template].concat(args));
	        var error = new Error(_this.message);
	        error.name = _this["constructor"].name;
	        _this.stack = error.stack;
	        return _this;
	    }
	    return WebCryptoError;
	}(Error));
	exports.WebCryptoError = WebCryptoError;
	WebCryptoError.NOT_SUPPORTED = "Method is not supported";
	var AlgorithmError = (function (_super) {
	    __extends(AlgorithmError, _super);
	    function AlgorithmError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 1;
	        return _this;
	    }
	    return AlgorithmError;
	}(WebCryptoError));
	exports.AlgorithmError = AlgorithmError;
	AlgorithmError.PARAM_REQUIRED = "Algorithm hasn't got required paramter '%1'";
	AlgorithmError.PARAM_WRONG_TYPE = "Algorithm has got wrong type for paramter '%1'. Must be %2";
	AlgorithmError.PARAM_WRONG_VALUE = "Algorithm has got wrong value for paramter '%1'. Must be %2";
	AlgorithmError.WRONG_ALG_NAME = "Algorithm has got wrong name '%1'. Must be '%2'";
	AlgorithmError.UNSUPPORTED_ALGORITHM = "Algorithm '%1' is not supported";
	var CryptoKeyError = (function (_super) {
	    __extends(CryptoKeyError, _super);
	    function CryptoKeyError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 3;
	        return _this;
	    }
	    return CryptoKeyError;
	}(WebCryptoError));
	exports.CryptoKeyError = CryptoKeyError;
	CryptoKeyError.EMPTY_KEY = "CryptoKey is empty";
	CryptoKeyError.WRONG_KEY_ALG = "CryptoKey has wrong algorithm '%1'. Must be '%2'";
	CryptoKeyError.WRONG_KEY_TYPE = "CryptoKey has wrong type '%1'. Must be '%2'";
	CryptoKeyError.WRONG_KEY_USAGE = "CryptoKey has wrong key usage. Must be '%1'";
	CryptoKeyError.NOT_EXTRACTABLE = "CryptoKey is not extractable";
	CryptoKeyError.WRONG_FORMAT = "CryptoKey has '%1' type. It can be used with '%2' format";
	CryptoKeyError.UNKNOWN_FORMAT = "Uknown format in use '%1'. Must be one of 'raw', 'pkcs8', 'spki'  or 'jwk'";
	CryptoKeyError.ALLOWED_FORMAT = "Wrong format value '%1'. Must be %2";


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var error_1 = __webpack_require__(7);
	function PrepareAlgorithm(alg) {
	    var res;
	    if (typeof alg === "string")
	        res = { name: alg };
	    else
	        res = alg;
	    BaseCrypto.checkAlgorithm(res);
	    var hashedAlg = alg;
	    if (hashedAlg.hash) {
	        hashedAlg.hash = PrepareAlgorithm(hashedAlg.hash);
	    }
	    return res;
	}
	exports.PrepareAlgorithm = PrepareAlgorithm;
	function PrepareData(data, paramName) {
	    if (!data)
	        throw new error_1.WebCryptoError("Parameter '" + paramName + "' is required and cant be empty");
	    if (ArrayBuffer.isView(data))
	        return new Uint8Array(data.buffer);
	    if (data instanceof ArrayBuffer)
	        return new Uint8Array(data);
	    throw new error_1.WebCryptoError("Incoming parameter '" + paramName + "' has wrong data type. Must be ArrayBufferView or ArrayBuffer");
	}
	exports.PrepareData = PrepareData;
	var BaseCrypto = (function () {
	    function BaseCrypto() {
	    }
	    BaseCrypto.checkAlgorithm = function (alg) {
	        if (typeof alg !== "object")
	            throw new TypeError("Wrong algorithm data type. Must be Object");
	        if (!("name" in alg))
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.PARAM_REQUIRED, "name");
	    };
	    BaseCrypto.checkAlgorithmParams = function (alg) {
	        this.checkAlgorithm(alg);
	    };
	    BaseCrypto.checkKey = function (key, alg, type, usage) {
	        if (type === void 0) { type = null; }
	        if (usage === void 0) { usage = null; }
	        // check key empty
	        if (!key)
	            throw new error_1.CryptoKeyError(error_1.CryptoKeyError.EMPTY_KEY);
	        // check alg
	        var keyAlg = key.algorithm;
	        this.checkAlgorithm(keyAlg);
	        if (alg && (keyAlg.name.toUpperCase() !== alg.toUpperCase()))
	            throw new error_1.CryptoKeyError(error_1.CryptoKeyError.WRONG_KEY_ALG, keyAlg.name, alg);
	        // check type
	        if (type && (!key.type || key.type.toUpperCase() !== type.toUpperCase()))
	            throw new error_1.CryptoKeyError(error_1.CryptoKeyError.WRONG_KEY_TYPE, key.type, type);
	        // check usage
	        if (usage) {
	            if (!key.usages.some(function (keyUsage) { return usage.toUpperCase() === keyUsage.toUpperCase(); }))
	                throw new error_1.CryptoKeyError(error_1.CryptoKeyError.WRONG_KEY_USAGE, usage);
	        }
	    };
	    BaseCrypto.checkWrappedKey = function (key) {
	        if (!key.extractable)
	            throw new error_1.CryptoKeyError(error_1.CryptoKeyError.NOT_EXTRACTABLE);
	    };
	    BaseCrypto.checkKeyUsages = function (keyUsages) {
	        if (!keyUsages || !keyUsages.length)
	            throw new error_1.WebCryptoError("Parameter 'keyUsages' cannot be empty.");
	    };
	    BaseCrypto.checkFormat = function (format, type) {
	        switch (format.toLowerCase()) {
	            case "raw":
	                if (type && type.toLowerCase() !== "secret")
	                    throw new error_1.CryptoKeyError(error_1.CryptoKeyError.WRONG_FORMAT, type, "raw");
	                break;
	            case "pkcs8":
	                if (type && type.toLowerCase() !== "private")
	                    throw new error_1.CryptoKeyError(error_1.CryptoKeyError.WRONG_FORMAT, type, "pkcs8");
	                break;
	            case "spki":
	                if (type && type.toLowerCase() !== "public")
	                    throw new error_1.CryptoKeyError(error_1.CryptoKeyError.WRONG_FORMAT, type, "spki");
	                break;
	            case "jwk":
	                break;
	            default:
	                throw new error_1.CryptoKeyError(error_1.CryptoKeyError.UNKNOWN_FORMAT, format);
	        }
	    };
	    BaseCrypto.generateKey = function (algorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.digest = function (algorithm, data) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.sign = function (algorithm, key, data) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.verify = function (algorithm, key, signature, data) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.encrypt = function (algorithm, key, data) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.decrypt = function (algorithm, key, data) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.deriveBits = function (algorithm, baseKey, length) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.deriveKey = function (algorithm, baseKey, derivedKeyType, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.exportKey = function (format, key) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.wrapKey = function (format, key, wrappingKey, wrapAlgorithm) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.unwrapKey = function (format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    return BaseCrypto;
	}());
	exports.BaseCrypto = BaseCrypto;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	exports.AlgorithmNames = {
	    RsaSSA: "RSASSA-PKCS1-v1_5",
	    RsaPSS: "RSA-PSS",
	    RsaOAEP: "RSA-OAEP",
	    AesCTR: "AES-CTR",
	    AesCMAC: "AES-CMAC",
	    AesGCM: "AES-GCM",
	    AesCBC: "AES-CBC",
	    Sha1: "SHA-1",
	    Sha256: "SHA-256",
	    Sha384: "SHA-384",
	    Sha512: "SHA-512",
	    EcDSA: "ECDSA",
	    EcDH: "ECDH",
	    Hmac: "HMAC",
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	// Fix btoa and atob for NodeJS
	if (typeof self === "undefined") {
	    var _global = global;
	    _global.btoa = function (data) { return new Buffer(data, "binary").toString("base64"); };
	    _global.atob = function (data) { return new Buffer(data, "base64").toString("binary"); };
	}
	var Base64Url = (function () {
	    function Base64Url() {
	    }
	    Base64Url.buffer2string = function (buffer) {
	        var res = "";
	        for (var i = 0; i < buffer.length; i++)
	            res += String.fromCharCode(buffer[i]);
	        return res;
	    };
	    Base64Url.string2buffer = function (binaryString) {
	        var res = new Uint8Array(binaryString.length);
	        for (var i = 0; i < binaryString.length; i++)
	            res[i] = binaryString.charCodeAt(i);
	        return res;
	    };
	    Base64Url.encode = function (value) {
	        var str = this.buffer2string(value);
	        var res = btoa(str)
	            .replace(/=/g, "")
	            .replace(/\+/g, "-")
	            .replace(/\//g, "_");
	        return res;
	    };
	    Base64Url.decode = function (base64url) {
	        while (base64url.length % 4) {
	            base64url += "=";
	        }
	        var base64 = base64url
	            .replace(/\-/g, "+")
	            .replace(/_/g, "/");
	        return this.string2buffer(atob(base64));
	    };
	    return Base64Url;
	}());
	exports.Base64Url = Base64Url;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var error_1 = __webpack_require__(7);
	var base_1 = __webpack_require__(8);
	var alg_1 = __webpack_require__(9);
	var crypto_1 = __webpack_require__(12);
	var crypto_2 = __webpack_require__(13);
	var crypto_3 = __webpack_require__(14);
	var crypto_4 = __webpack_require__(15);
	var crypto_5 = __webpack_require__(16);
	var SubtleCrypto = (function () {
	    function SubtleCrypto() {
	    }
	    SubtleCrypto.prototype.generateKey = function (algorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaSSA.toUpperCase():
	                    Class = crypto_2.RsaSSA;
	                    break;
	                case alg_1.AlgorithmNames.RsaOAEP.toUpperCase():
	                    Class = crypto_2.RsaOAEP;
	                    break;
	                case alg_1.AlgorithmNames.RsaPSS.toUpperCase():
	                    Class = crypto_2.RsaPSS;
	                    break;
	                case alg_1.AlgorithmNames.AesCBC.toUpperCase():
	                    Class = crypto_3.AesCBC;
	                    break;
	                case alg_1.AlgorithmNames.AesCTR.toUpperCase():
	                    Class = crypto_3.AesCTR;
	                    break;
	                case alg_1.AlgorithmNames.AesGCM.toUpperCase():
	                    Class = crypto_3.AesGCM;
	                    break;
	                case alg_1.AlgorithmNames.EcDSA.toUpperCase():
	                    Class = crypto_4.EcDSA;
	                    break;
	                case alg_1.AlgorithmNames.EcDH.toUpperCase():
	                    Class = crypto_4.EcDH;
	                    break;
	                case alg_1.AlgorithmNames.Hmac.toUpperCase():
	                    Class = crypto_5.Hmac;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.generateKey(alg, extractable, keyUsages).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.digest = function (algorithm, data) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var buf = base_1.PrepareData(data, "data");
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.Sha1.toUpperCase():
	                case alg_1.AlgorithmNames.Sha256.toUpperCase():
	                case alg_1.AlgorithmNames.Sha384.toUpperCase():
	                case alg_1.AlgorithmNames.Sha512.toUpperCase():
	                    Class = crypto_1.Sha;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.digest(alg, buf).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.sign = function (algorithm, key, data) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var buf = base_1.PrepareData(data, "data");
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaSSA.toUpperCase():
	                    Class = crypto_2.RsaSSA;
	                    break;
	                case alg_1.AlgorithmNames.RsaPSS.toUpperCase():
	                    Class = crypto_2.RsaPSS;
	                    break;
	                case alg_1.AlgorithmNames.EcDSA.toUpperCase():
	                    Class = crypto_4.EcDSA;
	                    break;
	                case alg_1.AlgorithmNames.Hmac.toUpperCase():
	                    Class = crypto_5.Hmac;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.sign(alg, key, buf).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.verify = function (algorithm, key, signature, data) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var sigBuf = base_1.PrepareData(data, "signature");
	            var buf = base_1.PrepareData(data, "data");
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaSSA.toUpperCase():
	                    Class = crypto_2.RsaSSA;
	                    break;
	                case alg_1.AlgorithmNames.RsaPSS.toUpperCase():
	                    Class = crypto_2.RsaPSS;
	                    break;
	                case alg_1.AlgorithmNames.EcDSA.toUpperCase():
	                    Class = crypto_4.EcDSA;
	                    break;
	                case alg_1.AlgorithmNames.Hmac.toUpperCase():
	                    Class = crypto_5.Hmac;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.verify(alg, key, sigBuf, buf).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.encrypt = function (algorithm, key, data) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var buf = base_1.PrepareData(data, "data");
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaOAEP.toUpperCase():
	                    Class = crypto_2.RsaOAEP;
	                    break;
	                case alg_1.AlgorithmNames.AesCBC.toUpperCase():
	                    Class = crypto_3.AesCBC;
	                    break;
	                case alg_1.AlgorithmNames.AesCTR.toUpperCase():
	                    Class = crypto_3.AesCTR;
	                    break;
	                case alg_1.AlgorithmNames.AesGCM.toUpperCase():
	                    Class = crypto_3.AesGCM;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.encrypt(alg, key, buf).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.decrypt = function (algorithm, key, data) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var buf = base_1.PrepareData(data, "data");
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaOAEP.toUpperCase():
	                    Class = crypto_2.RsaOAEP;
	                    break;
	                case alg_1.AlgorithmNames.AesCBC.toUpperCase():
	                    Class = crypto_3.AesCBC;
	                    break;
	                case alg_1.AlgorithmNames.AesCTR.toUpperCase():
	                    Class = crypto_3.AesCTR;
	                    break;
	                case alg_1.AlgorithmNames.AesGCM.toUpperCase():
	                    Class = crypto_3.AesGCM;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.decrypt(alg, key, buf).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.deriveBits = function (algorithm, baseKey, length) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.EcDH.toUpperCase():
	                    Class = crypto_4.EcDH;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.deriveBits(alg, baseKey, length).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.deriveKey = function (algorithm, baseKey, derivedKeyType, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var derivedAlg = base_1.PrepareAlgorithm(derivedKeyType);
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.EcDH.toUpperCase():
	                    Class = crypto_4.EcDH;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.deriveKey(alg, baseKey, derivedAlg, extractable, keyUsages).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.exportKey = function (format, key) {
	        return new Promise(function (resolve, reject) {
	            base_1.BaseCrypto.checkKey(key);
	            if (!key.extractable)
	                throw new error_1.CryptoKeyError(error_1.CryptoKeyError.NOT_EXTRACTABLE);
	            var Class = base_1.BaseCrypto;
	            switch (key.algorithm.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaSSA.toUpperCase():
	                    Class = crypto_2.RsaSSA;
	                    break;
	                case alg_1.AlgorithmNames.RsaPSS.toUpperCase():
	                    Class = crypto_2.RsaPSS;
	                    break;
	                case alg_1.AlgorithmNames.RsaOAEP.toUpperCase():
	                    Class = crypto_2.RsaOAEP;
	                    break;
	                case alg_1.AlgorithmNames.AesCBC.toUpperCase():
	                    Class = crypto_3.AesCBC;
	                    break;
	                case alg_1.AlgorithmNames.AesCTR.toUpperCase():
	                    Class = crypto_3.AesCTR;
	                    break;
	                case alg_1.AlgorithmNames.AesGCM.toUpperCase():
	                    Class = crypto_3.AesGCM;
	                    break;
	                case alg_1.AlgorithmNames.EcDSA.toUpperCase():
	                    Class = crypto_4.EcDSA;
	                    break;
	                case alg_1.AlgorithmNames.EcDH.toUpperCase():
	                    Class = crypto_4.EcDH;
	                    break;
	                case alg_1.AlgorithmNames.Hmac.toUpperCase():
	                    Class = crypto_5.Hmac;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, key.algorithm.name);
	            }
	            Class.exportKey(format, key).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var Class = base_1.BaseCrypto;
	            // TODO prepare keyData
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaSSA.toUpperCase():
	                    Class = crypto_2.RsaSSA;
	                    break;
	                case alg_1.AlgorithmNames.RsaPSS.toUpperCase():
	                    Class = crypto_2.RsaPSS;
	                    break;
	                case alg_1.AlgorithmNames.RsaOAEP.toUpperCase():
	                    Class = crypto_2.RsaOAEP;
	                    break;
	                case alg_1.AlgorithmNames.AesCBC.toUpperCase():
	                    Class = crypto_3.AesCBC;
	                    break;
	                case alg_1.AlgorithmNames.AesCTR.toUpperCase():
	                    Class = crypto_3.AesCTR;
	                    break;
	                case alg_1.AlgorithmNames.AesGCM.toUpperCase():
	                    Class = crypto_3.AesGCM;
	                    break;
	                case alg_1.AlgorithmNames.EcDSA.toUpperCase():
	                    Class = crypto_4.EcDSA;
	                    break;
	                case alg_1.AlgorithmNames.EcDH.toUpperCase():
	                    Class = crypto_4.EcDH;
	                    break;
	                case alg_1.AlgorithmNames.Hmac.toUpperCase():
	                    Class = crypto_5.Hmac;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.importKey(format, keyData, alg, extractable, keyUsages).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.wrapKey = function (format, key, wrappingKey, wrapAlgorithm) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(wrapAlgorithm);
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaOAEP.toUpperCase():
	                    Class = crypto_2.RsaOAEP;
	                    break;
	                case alg_1.AlgorithmNames.AesCBC.toUpperCase():
	                    Class = crypto_3.AesCBC;
	                    break;
	                case alg_1.AlgorithmNames.AesCTR.toUpperCase():
	                    Class = crypto_3.AesCTR;
	                    break;
	                case alg_1.AlgorithmNames.AesGCM.toUpperCase():
	                    Class = crypto_3.AesGCM;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.wrapKey(format, key, wrappingKey, alg).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.unwrapKey = function (format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            var unwrapAlg = base_1.PrepareAlgorithm(unwrapAlgorithm);
	            var unwrappedAlg = base_1.PrepareAlgorithm(unwrappedKeyAlgorithm);
	            var buf = base_1.PrepareData(wrappedKey, "wrappedKey");
	            var Class = base_1.BaseCrypto;
	            switch (unwrapAlg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaOAEP.toUpperCase():
	                    Class = crypto_2.RsaOAEP;
	                    break;
	                case alg_1.AlgorithmNames.AesCBC.toUpperCase():
	                    Class = crypto_3.AesCBC;
	                    break;
	                case alg_1.AlgorithmNames.AesCTR.toUpperCase():
	                    Class = crypto_3.AesCTR;
	                    break;
	                case alg_1.AlgorithmNames.AesGCM.toUpperCase():
	                    Class = crypto_3.AesGCM;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, unwrapAlg.name);
	            }
	            Class.unwrapKey(format, buf, unwrappingKey, unwrapAlg, unwrappedAlg, extractable, keyUsages).then(resolve, reject);
	        });
	    };
	    return SubtleCrypto;
	}());
	exports.SubtleCrypto = SubtleCrypto;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var alg_1 = __webpack_require__(9);
	var base_1 = __webpack_require__(8);
	var error_1 = __webpack_require__(7);
	exports.ShaAlgorithms = [alg_1.AlgorithmNames.Sha1, alg_1.AlgorithmNames.Sha256, alg_1.AlgorithmNames.Sha384, alg_1.AlgorithmNames.Sha512].join(" | ");
	var Sha = (function (_super) {
	    __extends(Sha, _super);
	    function Sha() {
	        return _super.apply(this, arguments) || this;
	    }
	    Sha.checkAlgorithm = function (alg) {
	        var _alg;
	        if (typeof alg === "string")
	            _alg = { name: alg };
	        else
	            _alg = alg;
	        _super.checkAlgorithm.call(this, alg);
	        switch (_alg.name.toUpperCase()) {
	            case alg_1.AlgorithmNames.Sha1:
	            case alg_1.AlgorithmNames.Sha256:
	            case alg_1.AlgorithmNames.Sha384:
	            case alg_1.AlgorithmNames.Sha512:
	                break;
	            default:
	                throw new error_1.AlgorithmError(error_1.AlgorithmError.WRONG_ALG_NAME, _alg.name, exports.ShaAlgorithms);
	        }
	    };
	    Sha.digest = function (algorithm, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithm(algorithm);
	            resolve(undefined);
	        });
	    };
	    return Sha;
	}(base_1.BaseCrypto));
	exports.Sha = Sha;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var error_1 = __webpack_require__(7);
	var base_1 = __webpack_require__(8);
	var alg_1 = __webpack_require__(9);
	var crypto_1 = __webpack_require__(12);
	var RsaKeyGenParamsError = (function (_super) {
	    __extends(RsaKeyGenParamsError, _super);
	    function RsaKeyGenParamsError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 2;
	        return _this;
	    }
	    return RsaKeyGenParamsError;
	}(error_1.AlgorithmError));
	exports.RsaKeyGenParamsError = RsaKeyGenParamsError;
	var RsaHashedImportParamsError = (function (_super) {
	    __extends(RsaHashedImportParamsError, _super);
	    function RsaHashedImportParamsError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 6;
	        return _this;
	    }
	    return RsaHashedImportParamsError;
	}(error_1.AlgorithmError));
	exports.RsaHashedImportParamsError = RsaHashedImportParamsError;
	var Rsa = (function (_super) {
	    __extends(Rsa, _super);
	    function Rsa() {
	        return _super.apply(this, arguments) || this;
	    }
	    Rsa.checkAlgorithm = function (alg) {
	        if (alg.name.toUpperCase() !== this.ALG_NAME.toUpperCase())
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.WRONG_ALG_NAME, alg.name, this.ALG_NAME);
	    };
	    Rsa.checkImportAlgorithm = function (alg) {
	        /**
	         * Check alg name. Use the same way as Chrome uses.
	         * It throws error if algorithm doesn't have a `name` paramter
	         * But it's not a equal to W3 specification
	         * https://www.w3.org/TR/WebCryptoAPI/#dfn-RsaHashedImportParams
	         *
	         */
	        this.checkAlgorithm(alg);
	        if (!alg.hash)
	            throw new RsaHashedImportParamsError(RsaHashedImportParamsError.PARAM_REQUIRED, "hash");
	        crypto_1.Sha.checkAlgorithm(alg.hash);
	    };
	    Rsa.checkKeyGenParams = function (alg) {
	        // modulusLength
	        switch (alg.modulusLength) {
	            case 1024:
	            case 2048:
	            case 4096:
	                break;
	            default:
	                throw new RsaKeyGenParamsError(RsaKeyGenParamsError.PARAM_WRONG_VALUE, "modulusLength", "1024, 2048 or 4096");
	        }
	        // publicExponent
	        var pubExp = alg.publicExponent;
	        if (!pubExp)
	            throw new RsaKeyGenParamsError(RsaKeyGenParamsError.PARAM_REQUIRED, "publicExponent");
	        if (!ArrayBuffer.isView(pubExp))
	            throw new RsaKeyGenParamsError(RsaKeyGenParamsError.PARAM_WRONG_TYPE, "publicExponent", "ArrayBufferView");
	        if (!(pubExp[0] === 3 || (pubExp[0] === 1 && pubExp[1] === 0 && pubExp[2] === 1)))
	            throw new RsaKeyGenParamsError(RsaKeyGenParamsError.PARAM_WRONG_VALUE, "publicExponent", "Uint8Array([3]) | Uint8Array([1, 0, 1])");
	        // hash
	        if (!alg.hash)
	            throw new RsaKeyGenParamsError(RsaKeyGenParamsError.PARAM_REQUIRED, "hash", crypto_1.ShaAlgorithms);
	        crypto_1.Sha.checkAlgorithm(alg.hash);
	    };
	    Rsa.checkKeyGenUsages = function (keyUsages) {
	        var _this = this;
	        this.checkKeyUsages(keyUsages);
	        keyUsages.forEach(function (usage) {
	            var i = 0;
	            for (i; i < _this.KEY_USAGES.length; i++)
	                if (_this.KEY_USAGES[i].toLowerCase() === usage.toLowerCase()) {
	                    break;
	                }
	            if (i === _this.KEY_USAGES.length)
	                throw new error_1.WebCryptoError("Unsuported key usage '" + usage + "'. Should be one of [" + _this.KEY_USAGES.join(", ") + "]");
	        });
	    };
	    Rsa.generateKey = function (algorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithm(algorithm);
	            _this.checkKeyGenParams(algorithm);
	            _this.checkKeyGenUsages(keyUsages);
	            resolve(undefined);
	        });
	    };
	    Rsa.exportKey = function (format, key) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkKey(key, _this.ALG_NAME);
	            _this.checkFormat(format, key.type);
	            resolve(undefined);
	        });
	    };
	    Rsa.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkImportAlgorithm(algorithm);
	            _this.checkFormat(format);
	            if (format.toLowerCase() === "raw")
	                throw new error_1.CryptoKeyError(error_1.CryptoKeyError.ALLOWED_FORMAT, format, "'JsonWebKey', 'pkcs8' or 'spki'");
	            _this.checkKeyGenUsages(keyUsages);
	            resolve(undefined);
	        });
	    };
	    return Rsa;
	}(base_1.BaseCrypto));
	exports.Rsa = Rsa;
	Rsa.ALG_NAME = "";
	Rsa.KEY_USAGES = [];
	var RsaSSA = (function (_super) {
	    __extends(RsaSSA, _super);
	    function RsaSSA() {
	        return _super.apply(this, arguments) || this;
	    }
	    RsaSSA.sign = function (algorithm, key, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "private", "sign");
	            resolve(undefined);
	        });
	    };
	    RsaSSA.verify = function (algorithm, key, signature, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "public", "verify");
	            resolve(undefined);
	        });
	    };
	    return RsaSSA;
	}(Rsa));
	exports.RsaSSA = RsaSSA;
	RsaSSA.ALG_NAME = alg_1.AlgorithmNames.RsaSSA;
	RsaSSA.KEY_USAGES = ["sign", "verify"];
	var RsaPSSParamsError = (function (_super) {
	    __extends(RsaPSSParamsError, _super);
	    function RsaPSSParamsError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 4;
	        return _this;
	    }
	    return RsaPSSParamsError;
	}(error_1.AlgorithmError));
	exports.RsaPSSParamsError = RsaPSSParamsError;
	var RsaPSS = (function (_super) {
	    __extends(RsaPSS, _super);
	    function RsaPSS() {
	        return _super.apply(this, arguments) || this;
	    }
	    RsaPSS.checkRsaPssParams = function (alg) {
	        /**
	         * TODO: Check alg verification in browser
	         */
	        _super.checkAlgorithmParams.call(this, alg);
	        if (!alg.saltLength)
	            return new RsaPSSParamsError(RsaPSSParamsError.PARAM_REQUIRED, "saltLength");
	        if (alg.saltLength % 8)
	            return new RsaPSSParamsError("Parameter 'saltLength' should be a multiple of 8");
	    };
	    return RsaPSS;
	}(RsaSSA));
	exports.RsaPSS = RsaPSS;
	RsaPSS.ALG_NAME = alg_1.AlgorithmNames.RsaPSS;
	RsaPSS.KEY_USAGES = ["sign", "verify"];
	var RsaOAEPParamsError = (function (_super) {
	    __extends(RsaOAEPParamsError, _super);
	    function RsaOAEPParamsError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 5;
	        return _this;
	    }
	    return RsaOAEPParamsError;
	}(error_1.AlgorithmError));
	exports.RsaOAEPParamsError = RsaOAEPParamsError;
	var RsaOAEP = (function (_super) {
	    __extends(RsaOAEP, _super);
	    function RsaOAEP() {
	        return _super.apply(this, arguments) || this;
	    }
	    RsaOAEP.checkAlgorithmParams = function (alg) {
	        if (alg.label) {
	            if (!ArrayBuffer.isView(alg.label))
	                return new RsaOAEPParamsError(RsaOAEPParamsError.PARAM_WRONG_TYPE, "label", "ArrayBufferView");
	        }
	    };
	    RsaOAEP.encrypt = function (algorithm, key, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "public", "encrypt");
	            resolve(undefined);
	        });
	    };
	    RsaOAEP.decrypt = function (algorithm, key, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "private", "decrypt");
	            resolve(undefined);
	        });
	    };
	    RsaOAEP.wrapKey = function (format, key, wrappingKey, wrapAlgorithm) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(wrapAlgorithm);
	            _this.checkKey(wrappingKey, _this.ALG_NAME, "public", "wrapKey");
	            _this.checkWrappedKey(key);
	            _this.checkFormat(format, key.type);
	            resolve(undefined);
	        });
	    };
	    RsaOAEP.unwrapKey = function (format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(unwrapAlgorithm);
	            _this.checkKey(unwrappingKey, _this.ALG_NAME, "private", "unwrapKey");
	            _this.checkFormat(format);
	            // TODO check unwrappedKeyAlgorithm
	            // TODO check keyUSages
	            resolve(undefined);
	        });
	    };
	    return RsaOAEP;
	}(Rsa));
	exports.RsaOAEP = RsaOAEP;
	RsaOAEP.ALG_NAME = alg_1.AlgorithmNames.RsaOAEP;
	RsaOAEP.KEY_USAGES = ["encrypt", "decrypt", "wrapKey", "unwrapKey"];


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var error_1 = __webpack_require__(7);
	var base_1 = __webpack_require__(8);
	var alg_1 = __webpack_require__(9);
	var AesKeyGenParamsError = (function (_super) {
	    __extends(AesKeyGenParamsError, _super);
	    function AesKeyGenParamsError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 7;
	        return _this;
	    }
	    return AesKeyGenParamsError;
	}(error_1.AlgorithmError));
	var Aes = (function (_super) {
	    __extends(Aes, _super);
	    function Aes() {
	        return _super.apply(this, arguments) || this;
	    }
	    Aes.checkAlgorithm = function (alg) {
	        if (alg.name.toUpperCase() !== this.ALG_NAME.toUpperCase())
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.WRONG_ALG_NAME, alg.name, this.ALG_NAME);
	    };
	    Aes.checkKeyGenParams = function (alg) {
	        switch (alg.length) {
	            case 128:
	            case 192:
	            case 256:
	                break;
	            default:
	                throw new AesKeyGenParamsError(AesKeyGenParamsError.PARAM_WRONG_VALUE, "length", "128, 192 or 256");
	        }
	    };
	    Aes.checkKeyGenUsages = function (keyUsages) {
	        var _this = this;
	        this.checkKeyUsages(keyUsages);
	        keyUsages.forEach(function (usage) {
	            var i = 0;
	            for (i; i < _this.KEY_USAGES.length; i++)
	                if (_this.KEY_USAGES[i].toLowerCase() === usage.toLowerCase()) {
	                    break;
	                }
	            if (i === _this.KEY_USAGES.length)
	                throw new error_1.WebCryptoError("Unsuported key usage '" + usage + "'. Should be one of [" + _this.KEY_USAGES.join(", ") + "]");
	        });
	    };
	    Aes.generateKey = function (algorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithm(algorithm);
	            _this.checkKeyGenParams(algorithm);
	            _this.checkKeyGenUsages(keyUsages);
	            resolve(undefined);
	        });
	    };
	    Aes.exportKey = function (format, key) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkKey(key, _this.ALG_NAME);
	            _this.checkFormat(format, key.type);
	            resolve(undefined);
	        });
	    };
	    Aes.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithm(algorithm);
	            _this.checkFormat(format);
	            if (!(format.toLowerCase() === "raw" || format.toLowerCase() === "jwk"))
	                throw new error_1.CryptoKeyError(error_1.CryptoKeyError.ALLOWED_FORMAT, format, "'jwk' or 'raw'");
	            _this.checkKeyGenUsages(keyUsages);
	            resolve(undefined);
	        });
	    };
	    return Aes;
	}(base_1.BaseCrypto));
	exports.Aes = Aes;
	Aes.ALG_NAME = "";
	Aes.KEY_USAGES = [];
	var AesAlgorithmError = (function (_super) {
	    __extends(AesAlgorithmError, _super);
	    function AesAlgorithmError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 8;
	        return _this;
	    }
	    return AesAlgorithmError;
	}(error_1.AlgorithmError));
	exports.AesAlgorithmError = AesAlgorithmError;
	var AesEncrypt = (function (_super) {
	    __extends(AesEncrypt, _super);
	    function AesEncrypt() {
	        return _super.apply(this, arguments) || this;
	    }
	    AesEncrypt.encrypt = function (algorithm, key, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "secret", "encrypt");
	            resolve(undefined);
	        });
	    };
	    AesEncrypt.decrypt = function (algorithm, key, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "secret", "decrypt");
	            resolve(undefined);
	        });
	    };
	    AesEncrypt.wrapKey = function (format, key, wrappingKey, wrapAlgorithm) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(wrapAlgorithm);
	            _this.checkKey(wrappingKey, _this.ALG_NAME, "secret", "wrapKey");
	            _this.checkWrappedKey(key);
	            _this.checkFormat(format, key.type);
	            resolve(undefined);
	        });
	    };
	    AesEncrypt.unwrapKey = function (format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(unwrapAlgorithm);
	            _this.checkKey(unwrappingKey, _this.ALG_NAME, "secret", "unwrapKey");
	            _this.checkFormat(format);
	            // TODO check unwrappedKeyAlgorithm
	            // TODO check keyUSages
	            resolve(undefined);
	        });
	    };
	    return AesEncrypt;
	}(Aes));
	exports.AesEncrypt = AesEncrypt;
	AesEncrypt.KEY_USAGES = ["encrypt", "decrypt", "wrapKey", "unwrapKey"];
	var AesCBC = (function (_super) {
	    __extends(AesCBC, _super);
	    function AesCBC() {
	        return _super.apply(this, arguments) || this;
	    }
	    AesCBC.checkAlgorithmParams = function (alg) {
	        this.checkAlgorithm(alg);
	        if (!alg.iv)
	            throw new AesAlgorithmError(AesAlgorithmError.PARAM_REQUIRED, "iv");
	        if (!ArrayBuffer.isView(alg.iv))
	            throw new AesAlgorithmError(AesAlgorithmError.PARAM_WRONG_TYPE, "iv", "ArrayBufferView");
	        if (alg.iv.byteLength !== 16)
	            throw new AesAlgorithmError(AesAlgorithmError.PARAM_WRONG_VALUE, "iv", "ArrayBufferView with size 16");
	    };
	    return AesCBC;
	}(AesEncrypt));
	exports.AesCBC = AesCBC;
	AesCBC.ALG_NAME = alg_1.AlgorithmNames.AesCBC;
	var AesCTR = (function (_super) {
	    __extends(AesCTR, _super);
	    function AesCTR() {
	        return _super.apply(this, arguments) || this;
	    }
	    AesCTR.checkAlgorithmParams = function (alg) {
	        this.checkAlgorithm(alg);
	        if (!(alg.counter && ArrayBuffer.isView(alg.counter)))
	            throw new AesAlgorithmError(AesAlgorithmError.PARAM_WRONG_TYPE, "counter", "ArrayBufferView");
	        if (alg.counter.byteLength !== 16)
	            throw new AesAlgorithmError(AesAlgorithmError.PARAM_WRONG_VALUE, "counter", "ArrayBufferView with size 16");
	        if (!(alg.length > 0 && alg.length <= 128))
	            throw new AesAlgorithmError(AesAlgorithmError.PARAM_WRONG_VALUE, "length", "number [1-128]");
	    };
	    return AesCTR;
	}(AesEncrypt));
	exports.AesCTR = AesCTR;
	AesCTR.ALG_NAME = alg_1.AlgorithmNames.AesCTR;
	var AesGCM = (function (_super) {
	    __extends(AesGCM, _super);
	    function AesGCM() {
	        return _super.apply(this, arguments) || this;
	    }
	    AesGCM.checkAlgorithmParams = function (alg) {
	        this.checkAlgorithm(alg);
	        if (alg.additionalData)
	            if (!ArrayBuffer.isView(alg.additionalData))
	                throw new AesAlgorithmError(AesAlgorithmError.PARAM_WRONG_TYPE, "additionalData", "ArrayBufferView");
	        if (!alg.iv)
	            throw new AesAlgorithmError(AesAlgorithmError.PARAM_REQUIRED, "iv");
	        if (!ArrayBuffer.isView(alg.iv))
	            throw new AesAlgorithmError(AesAlgorithmError.PARAM_WRONG_TYPE, "iv", "ArrayBufferView");
	        if (alg.tagLength)
	            if (!(alg.tagLength >= 0 && alg.tagLength <= 128))
	                throw new AesAlgorithmError(AesAlgorithmError.PARAM_WRONG_VALUE, "tagLength", "number [0-128]");
	    };
	    return AesGCM;
	}(AesEncrypt));
	exports.AesGCM = AesGCM;
	AesGCM.ALG_NAME = alg_1.AlgorithmNames.AesGCM;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var crypto_1 = __webpack_require__(14);
	var crypto_2 = __webpack_require__(12);
	var error_1 = __webpack_require__(7);
	var base_1 = __webpack_require__(8);
	var alg_1 = __webpack_require__(9);
	var EcKeyGenParamsError = (function (_super) {
	    __extends(EcKeyGenParamsError, _super);
	    function EcKeyGenParamsError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 9;
	        return _this;
	    }
	    return EcKeyGenParamsError;
	}(error_1.AlgorithmError));
	exports.EcKeyGenParamsError = EcKeyGenParamsError;
	var Ec = (function (_super) {
	    __extends(Ec, _super);
	    function Ec() {
	        return _super.apply(this, arguments) || this;
	    }
	    Ec.checkAlgorithm = function (alg) {
	        if (alg.name.toUpperCase() !== this.ALG_NAME.toUpperCase())
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.WRONG_ALG_NAME, alg.name, this.ALG_NAME);
	    };
	    Ec.checkKeyGenParams = function (alg) {
	        var param_namedCurve = "namedCurve";
	        if (!alg.namedCurve)
	            throw new EcKeyGenParamsError(EcKeyGenParamsError.PARAM_REQUIRED, param_namedCurve);
	        if (!(typeof alg.namedCurve === "string"))
	            throw new EcKeyGenParamsError(EcKeyGenParamsError.PARAM_WRONG_TYPE, param_namedCurve, "string");
	        switch (alg.namedCurve.toUpperCase()) {
	            case "P-256":
	            case "P-384":
	            case "P-521":
	                break;
	            default:
	                throw new EcKeyGenParamsError(EcKeyGenParamsError.PARAM_WRONG_VALUE, param_namedCurve, "P-256, P-384 or P-521");
	        }
	    };
	    Ec.checkKeyGenUsages = function (keyUsages) {
	        var _this = this;
	        keyUsages.forEach(function (usage) {
	            var i = 0;
	            for (i; i < _this.KEY_USAGES.length; i++)
	                if (_this.KEY_USAGES[i].toLowerCase() === usage.toLowerCase()) {
	                    break;
	                }
	            if (i === _this.KEY_USAGES.length)
	                throw new error_1.WebCryptoError("Unsuported key usage '" + usage + "'. Should be one of [" + _this.KEY_USAGES.join(", ") + "]");
	        });
	    };
	    Ec.generateKey = function (algorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithm(algorithm);
	            _this.checkKeyGenParams(algorithm);
	            _this.checkKeyGenUsages(keyUsages);
	            resolve(undefined);
	        });
	    };
	    Ec.exportKey = function (format, key) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkKey(key, _this.ALG_NAME);
	            _this.checkFormat(format, key.type);
	            resolve(undefined);
	        });
	    };
	    Ec.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkKeyGenParams(algorithm);
	            _this.checkFormat(format);
	            if (format.toLowerCase() === "raw")
	                throw new error_1.CryptoKeyError(error_1.CryptoKeyError.ALLOWED_FORMAT, format, "'JsonWebKey', 'pkcs8' or 'spki'");
	            _this.checkKeyGenUsages(keyUsages);
	            resolve(undefined);
	        });
	    };
	    return Ec;
	}(base_1.BaseCrypto));
	exports.Ec = Ec;
	Ec.ALG_NAME = "";
	Ec.KEY_USAGES = [];
	var EcAlgorithmError = (function (_super) {
	    __extends(EcAlgorithmError, _super);
	    function EcAlgorithmError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 10;
	        return _this;
	    }
	    return EcAlgorithmError;
	}(error_1.AlgorithmError));
	exports.EcAlgorithmError = EcAlgorithmError;
	var EcDSA = (function (_super) {
	    __extends(EcDSA, _super);
	    function EcDSA() {
	        return _super.apply(this, arguments) || this;
	    }
	    EcDSA.checkAlgorithmParams = function (alg) {
	        this.checkAlgorithm(alg);
	        crypto_2.Sha.checkAlgorithm(alg.hash);
	    };
	    EcDSA.sign = function (algorithm, key, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "private", "sign");
	            resolve(undefined);
	        });
	    };
	    EcDSA.verify = function (algorithm, key, signature, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "public", "verify");
	            resolve(undefined);
	        });
	    };
	    return EcDSA;
	}(Ec));
	exports.EcDSA = EcDSA;
	EcDSA.ALG_NAME = alg_1.AlgorithmNames.EcDSA;
	EcDSA.KEY_USAGES = ["sign", "verify", "deriveKey", "deriveBits"];
	var EcDH = (function (_super) {
	    __extends(EcDH, _super);
	    function EcDH() {
	        return _super.apply(this, arguments) || this;
	    }
	    EcDH.checkDeriveParams = function (algorithm) {
	        var param_public = "public";
	        this.checkAlgorithm(algorithm);
	        if (!algorithm.public)
	            throw new EcAlgorithmError(EcAlgorithmError.PARAM_REQUIRED, param_public);
	        this.checkKey(algorithm.public, this.ALG_NAME, "public");
	    };
	    EcDH.deriveBits = function (algorithm, baseKey, length) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkDeriveParams(algorithm);
	            _this.checkKey(baseKey, _this.ALG_NAME, "private", "deriveBits");
	            resolve(undefined);
	        });
	    };
	    EcDH.deriveKey = function (algorithm, baseKey, derivedKeyType, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkDeriveParams(algorithm);
	            _this.checkKey(baseKey, _this.ALG_NAME, "private", "deriveKey");
	            base_1.BaseCrypto.checkAlgorithm(derivedKeyType);
	            switch (derivedKeyType.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.AesCBC:
	                    crypto_1.AesCBC.checkKeyGenParams(derivedKeyType);
	                    break;
	                case alg_1.AlgorithmNames.AesCTR:
	                    crypto_1.AesCTR.checkKeyGenParams(derivedKeyType);
	                    break;
	                case alg_1.AlgorithmNames.AesGCM:
	                    crypto_1.AesGCM.checkKeyGenParams(derivedKeyType);
	                    break;
	                default:
	                    throw new EcAlgorithmError("Unsupported name '" + derivedKeyType.name + "' for algoritm in param 'derivedKeyType'");
	            }
	            resolve(undefined);
	        });
	    };
	    return EcDH;
	}(Ec));
	exports.EcDH = EcDH;
	EcDH.ALG_NAME = alg_1.AlgorithmNames.EcDH;
	EcDH.KEY_USAGES = ["deriveKey", "deriveBits"];


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var error_1 = __webpack_require__(7);
	var base_1 = __webpack_require__(8);
	var alg_1 = __webpack_require__(9);
	var Hmac = (function (_super) {
	    __extends(Hmac, _super);
	    function Hmac() {
	        return _super.apply(this, arguments) || this;
	    }
	    Hmac.checkAlgorithm = function (alg) {
	        if (alg.name.toUpperCase() !== this.ALG_NAME.toUpperCase())
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.WRONG_ALG_NAME, alg.name, this.ALG_NAME);
	    };
	    Hmac.checkKeyGenParams = function (alg) {
	        // length is optional
	        if ("length" in alg && !(alg.length > 0 && alg.length <= 512)) {
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.PARAM_WRONG_VALUE, "length", "more 0 and less than 512");
	        }
	    };
	    Hmac.checkKeyGenUsages = function (keyUsages) {
	        var _this = this;
	        this.checkKeyUsages(keyUsages);
	        keyUsages.forEach(function (usage) {
	            var i = 0;
	            for (i; i < _this.KEY_USAGES.length; i++)
	                if (_this.KEY_USAGES[i].toLowerCase() === usage.toLowerCase()) {
	                    break;
	                }
	            if (i === _this.KEY_USAGES.length)
	                throw new error_1.WebCryptoError("Unsuported key usage '" + usage + "'. Should be one of [" + _this.KEY_USAGES.join(", ") + "]");
	        });
	    };
	    Hmac.generateKey = function (algorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithm(algorithm);
	            _this.checkKeyGenParams(algorithm);
	            _this.checkKeyGenUsages(keyUsages);
	            resolve(undefined);
	        });
	    };
	    Hmac.exportKey = function (format, key) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkKey(key, _this.ALG_NAME);
	            _this.checkFormat(format, key.type);
	            resolve(undefined);
	        });
	    };
	    Hmac.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithm(algorithm);
	            _this.checkFormat(format);
	            if (!(format.toLowerCase() === "raw" || format.toLowerCase() === "jwk"))
	                throw new error_1.CryptoKeyError(error_1.CryptoKeyError.ALLOWED_FORMAT, format, "'jwk' or 'raw'");
	            _this.checkKeyGenUsages(keyUsages);
	            resolve(undefined);
	        });
	    };
	    Hmac.sign = function (algorithm, key, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "secret", "sign");
	            resolve(undefined);
	        });
	    };
	    Hmac.verify = function (algorithm, key, signature, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "secret", "verify");
	            resolve(undefined);
	        });
	    };
	    return Hmac;
	}(base_1.BaseCrypto));
	exports.Hmac = Hmac;
	Hmac.ALG_NAME = alg_1.AlgorithmNames.Hmac;
	Hmac.KEY_USAGES = ["sign", "verify"];


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	// Core
	var webcrypto_core_1 = __webpack_require__(6);
	var core = __webpack_require__(6);
	var webcrypto_core_2 = __webpack_require__(6);
	// Base
	var init_1 = __webpack_require__(1);
	var crypto_1 = __webpack_require__(5);
	var helper_1 = __webpack_require__(3);
	// Crypto
	var crypto_2 = __webpack_require__(18);
	var crypto_3 = __webpack_require__(21);
	var crypto_4 = __webpack_require__(22);
	var crypto_5 = __webpack_require__(23);
	function PrepareKey(key, subtle) {
	    var promise = Promise.resolve(key);
	    if (!key.key)
	        if (!key.extractable) {
	            throw new crypto_1.LinerError("'key' is Native CryptoKey. It can't be converted to JS CryptoKey");
	        }
	        else {
	            promise = promise.then(function () {
	                return self.crypto.subtle.exportKey("jwk", key);
	            })
	                .then(function (jwk) {
	                return subtle.importKey("jwk", jwk, key.algorithm, true, key.usages);
	            });
	        }
	    return promise;
	}
	var SubtleCrypto = (function (_super) {
	    __extends(SubtleCrypto, _super);
	    function SubtleCrypto() {
	        return _super.apply(this, arguments) || this;
	    }
	    SubtleCrypto.prototype.generateKey = function (algorithm, extractable, keyUsages) {
	        var args = arguments;
	        var _alg;
	        return _super.prototype.generateKey.apply(this, args)
	            .then(function (d) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            try {
	                return init_1.nativeSubtle.generateKey.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native generateKey for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native generateKey for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (keys) {
	            if (keys) {
	                if ("keyUsage" in keys || (keys.privateKey && "keyUsage" in keys)) {
	                    var _keys = keys;
	                    if (!_keys.privateKey)
	                        _keys.usages = keyUsages;
	                }
	                return new Promise(function (resolve) { return resolve(keys); });
	            }
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.AesGCM.toLowerCase():
	                    Class = crypto_2.AesCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.EcDSA.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.EcDH.toLowerCase():
	                    Class = crypto_5.EcCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.RsaPSS.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new crypto_1.LinerError(crypto_1.LinerError.NOT_SUPPORTED, "generateKey");
	            }
	            return Class.generateKey(_alg, extractable, keyUsages);
	        });
	    };
	    SubtleCrypto.prototype.digest = function (algorithm, data) {
	        var args = arguments;
	        var _alg;
	        var _data;
	        return _super.prototype.digest.apply(this, args)
	            .then(function (d) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            _data = webcrypto_core_2.PrepareData(data, "data");
	            try {
	                return init_1.nativeSubtle.digest.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native digest for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native digest for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (digest) {
	            if (digest)
	                return new Promise(function (resolve) { return resolve(digest); });
	            return crypto_3.ShaCrypto.digest(_alg, _data);
	        });
	    };
	    SubtleCrypto.prototype.sign = function (algorithm, key, data) {
	        var args = arguments;
	        var _alg;
	        var _data;
	        return _super.prototype.sign.apply(this, args)
	            .then(function (d) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            _data = webcrypto_core_2.PrepareData(data, "data");
	            try {
	                return init_1.nativeSubtle.sign.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native sign for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native sign for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (signature) {
	            if (signature)
	                return new Promise(function (resolve) { return resolve(signature); });
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.EcDSA.toLowerCase():
	                    Class = crypto_5.EcCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaPSS.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new crypto_1.LinerError(crypto_1.LinerError.NOT_SUPPORTED, "sign");
	            }
	            return PrepareKey(key, Class)
	                .then(function (key) { return Class.sign(_alg, key, _data); });
	        });
	    };
	    SubtleCrypto.prototype.verify = function (algorithm, key, signature, data) {
	        var args = arguments;
	        var _alg;
	        var _signature;
	        var _data;
	        return _super.prototype.verify.apply(this, args)
	            .then(function (d) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            _signature = webcrypto_core_2.PrepareData(signature, "data");
	            _data = webcrypto_core_2.PrepareData(data, "data");
	            try {
	                return init_1.nativeSubtle.verify.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native verify for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native verify for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (result) {
	            if (typeof result === "boolean")
	                return new Promise(function (resolve) { return resolve(result); });
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.EcDSA.toLowerCase():
	                    Class = crypto_5.EcCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaPSS.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new crypto_1.LinerError(crypto_1.LinerError.NOT_SUPPORTED, "sign");
	            }
	            return PrepareKey(key, Class)
	                .then(function (key) { return Class.verify(_alg, key, _signature, _data); });
	        });
	    };
	    SubtleCrypto.prototype.deriveBits = function (algorithm, baseKey, length) {
	        var args = arguments;
	        var _alg;
	        return _super.prototype.deriveBits.apply(this, args)
	            .then(function (bits) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            try {
	                return init_1.nativeSubtle.deriveBits.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native deriveBits for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                // Edge throws error. Don't know Why.
	                console.warn("WebCrypto: native deriveBits for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (bits) {
	            if (bits)
	                return new Promise(function (resolve) { return resolve(bits); });
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.EcDH.toLowerCase():
	                    Class = crypto_5.EcCrypto;
	                    break;
	                default:
	                    throw new crypto_1.LinerError(crypto_1.LinerError.NOT_SUPPORTED, "deriveBits");
	            }
	            return Class.deriveBits(_alg, baseKey, length);
	        });
	    };
	    SubtleCrypto.prototype.deriveKey = function (algorithm, baseKey, derivedKeyType, extractable, keyUsages) {
	        var args = arguments;
	        var _alg;
	        var _algDerivedKey;
	        return _super.prototype.deriveKey.apply(this, args)
	            .then(function (bits) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            _algDerivedKey = webcrypto_core_2.PrepareAlgorithm(derivedKeyType);
	            try {
	                return init_1.nativeSubtle.deriveKey.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native deriveKey for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                // Edge doesn't go to catch of Promise
	                console.warn("WebCrypto: native deriveKey for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (key) {
	            if (key)
	                return new Promise(function (resolve) { return resolve(key); });
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.EcDH.toLowerCase():
	                    Class = crypto_5.EcCrypto;
	                    break;
	                default:
	                    throw new crypto_1.LinerError(crypto_1.LinerError.NOT_SUPPORTED, "deriveBits");
	            }
	            return Class.deriveKey(_alg, baseKey, _algDerivedKey, extractable, keyUsages);
	        });
	    };
	    SubtleCrypto.prototype.encrypt = function (algorithm, key, data) {
	        var args = arguments;
	        var _alg;
	        var _data;
	        return _super.prototype.encrypt.apply(this, args)
	            .then(function (bits) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            _data = webcrypto_core_2.PrepareData(data, "data");
	            try {
	                return init_1.nativeSubtle.encrypt.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native 'encrypt' for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native 'encrypt' for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (msg) {
	            if (msg)
	                return new Promise(function (resolve) { return resolve(msg); });
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.AesGCM.toLowerCase():
	                    Class = crypto_2.AesCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new crypto_1.LinerError(crypto_1.LinerError.NOT_SUPPORTED, "encrypt");
	            }
	            return PrepareKey(key, Class)
	                .then(function (key) { return Class.encrypt(_alg, key, _data); });
	        });
	    };
	    SubtleCrypto.prototype.decrypt = function (algorithm, key, data) {
	        var args = arguments;
	        var _alg;
	        var _data;
	        return _super.prototype.decrypt.apply(this, args)
	            .then(function (bits) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            _data = webcrypto_core_2.PrepareData(data, "data");
	            try {
	                return init_1.nativeSubtle.decrypt.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native 'decrypt' for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native 'decrypt' for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (msg) {
	            if (msg)
	                return new Promise(function (resolve) { return resolve(msg); });
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.AesGCM.toLowerCase():
	                    Class = crypto_2.AesCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new crypto_1.LinerError(crypto_1.LinerError.NOT_SUPPORTED, "encrypt");
	            }
	            return PrepareKey(key, Class)
	                .then(function (key) { return Class.decrypt(_alg, key, _data); });
	        });
	    };
	    SubtleCrypto.prototype.wrapKey = function (format, key, wrappingKey, wrapAlgorithm) {
	        var args = arguments;
	        var _alg;
	        return _super.prototype.wrapKey.apply(this, args)
	            .then(function (bits) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(wrapAlgorithm);
	            try {
	                return init_1.nativeSubtle.wrapKey.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native 'wrapKey' for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native 'wrapKey' for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (msg) {
	            if (msg)
	                return new Promise(function (resolve) { return resolve(msg); });
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.AesGCM.toLowerCase():
	                    Class = crypto_2.AesCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new crypto_1.LinerError(crypto_1.LinerError.NOT_SUPPORTED, "wrapKey");
	            }
	            return Class.wrapKey(format, key, wrappingKey, _alg);
	        });
	    };
	    SubtleCrypto.prototype.unwrapKey = function (format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) {
	        var args = arguments;
	        var _alg;
	        var _algKey;
	        var _data;
	        return _super.prototype.unwrapKey.apply(this, args)
	            .then(function (bits) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(unwrapAlgorithm);
	            _algKey = webcrypto_core_2.PrepareAlgorithm(unwrappedKeyAlgorithm);
	            _data = webcrypto_core_2.PrepareData(wrappedKey, "wrappedKey");
	            try {
	                return init_1.nativeSubtle.unwrapKey.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native 'unwrapKey' for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native 'unwrapKey' for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (msg) {
	            if (msg)
	                return new Promise(function (resolve) { return resolve(msg); });
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.AesGCM.toLowerCase():
	                    Class = crypto_2.AesCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new crypto_1.LinerError(crypto_1.LinerError.NOT_SUPPORTED, "unwrapKey");
	            }
	            return Class.unwrapKey(format, _data, unwrappingKey, _alg, _algKey, extractable, keyUsages);
	        });
	    };
	    SubtleCrypto.prototype.exportKey = function (format, key) {
	        var args = arguments;
	        return _super.prototype.exportKey.apply(this, args)
	            .then(function () {
	            try {
	                return init_1.nativeSubtle.exportKey.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native 'exportKey' for " + key.algorithm.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native 'exportKey' for " + key.algorithm.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (msg) {
	            if (msg) {
	                if (format === "jwk" && msg instanceof ArrayBuffer) {
	                    msg = helper_1.buffer2string(new Uint8Array(msg));
	                    msg = JSON.parse(msg);
	                }
	                return Promise.resolve(msg);
	            }
	            if (!key.key)
	                throw new crypto_1.LinerError("Cannot export native CryptoKey from JS implementation");
	            var Class;
	            switch (key.algorithm.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.AesGCM.toLowerCase():
	                    Class = crypto_2.AesCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.EcDH.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.EcDSA.toLowerCase():
	                    Class = crypto_5.EcCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaPSS.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new crypto_1.LinerError(crypto_1.LinerError.NOT_SUPPORTED, "exportKey");
	            }
	            return Class.exportKey(format, key);
	        });
	    };
	    SubtleCrypto.prototype.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        var args = arguments;
	        var _alg;
	        var _data;
	        return _super.prototype.importKey.apply(this, args)
	            .then(function (bits) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            _data = keyData;
	            // Fix: Safari
	            if (helper_1.BrowserInfo().name === helper_1.Browser.Safari) {
	                // Converts JWK to ArrayBuffer
	                args[1] = helper_1.string2buffer(JSON.stringify(keyData)).buffer;
	            }
	            // End: Fix
	            if (ArrayBuffer.isView(keyData)) {
	                _data = webcrypto_core_2.PrepareData(keyData, "keyData");
	            }
	            try {
	                return init_1.nativeSubtle.importKey.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native 'importKey' for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native 'importKey' for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (msg) {
	            if (msg)
	                return new Promise(function (resolve) { return resolve(msg); });
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.AesGCM.toLowerCase():
	                    Class = crypto_2.AesCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.EcDH.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.EcDSA.toLowerCase():
	                    Class = crypto_5.EcCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaPSS.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new crypto_1.LinerError(crypto_1.LinerError.NOT_SUPPORTED, "importKey");
	            }
	            return Class.importKey(format, _data, _alg, extractable, keyUsages);
	        });
	    };
	    return SubtleCrypto;
	}(core.SubtleCrypto));
	exports.SubtleCrypto = SubtleCrypto;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var webcrypto_core_1 = __webpack_require__(6);
	var crypto_1 = __webpack_require__(5);
	var key_1 = __webpack_require__(19);
	var helper_1 = __webpack_require__(3);
	var asmCrypto = __webpack_require__(20);
	var init_1 = __webpack_require__(1);
	var AesCrypto = (function (_super) {
	    __extends(AesCrypto, _super);
	    function AesCrypto() {
	        return _super.apply(this, arguments) || this;
	    }
	    AesCrypto.checkModule = function () {
	        if (typeof asmCrypto === "undefined")
	            throw new crypto_1.LinerError(crypto_1.LinerError.MODULE_NOT_FOUND, "asmCrypto", "https://github.com/vibornoff/asmcrypto.js");
	    };
	    AesCrypto.generateKey = function (alg, extractable, keyUsage) {
	        var _this = this;
	        return new Promise(function (resolve) {
	            _this.checkModule();
	            // gat random bytes for key
	            var key = init_1.nativeCrypto.getRandomValues(new Uint8Array(alg.length / 8));
	            // set key params
	            var aesKey = new key_1.CryptoKey();
	            aesKey.key = key;
	            aesKey.algorithm = alg;
	            aesKey.extractable = extractable;
	            aesKey.type = "secret";
	            aesKey.usages = keyUsage;
	            resolve(aesKey);
	        });
	    };
	    AesCrypto.encrypt = function (algorithm, key, data) {
	        return new Promise(function (resolve) {
	            var res;
	            switch (algorithm.name.toUpperCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC:
	                    var algCBC = algorithm;
	                    res = asmCrypto.AES_CBC.encrypt(data, key.key, undefined, algCBC.iv);
	                    break;
	                case webcrypto_core_1.AlgorithmNames.AesGCM:
	                    var algGCM = algorithm;
	                    algGCM.tagLength = algGCM.tagLength || 128;
	                    res = asmCrypto.AES_GCM.encrypt(data, key.key, algGCM.iv, algGCM.additionalData, algGCM.tagLength / 8);
	                    break;
	                default:
	                    throw new crypto_1.LinerError(webcrypto_core_1.AlgorithmError.UNSUPPORTED_ALGORITHM, algorithm.name);
	            }
	            resolve(res.buffer);
	        });
	    };
	    AesCrypto.decrypt = function (algorithm, key, data) {
	        return new Promise(function (resolve) {
	            var res;
	            switch (algorithm.name.toUpperCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC:
	                    var algCBC = algorithm;
	                    res = asmCrypto.AES_CBC.decrypt(data, key.key, undefined, algCBC.iv);
	                    break;
	                case webcrypto_core_1.AlgorithmNames.AesGCM:
	                    var algGCM = algorithm;
	                    algGCM.tagLength = algGCM.tagLength || 128;
	                    res = asmCrypto.AES_GCM.decrypt(data, key.key, algGCM.iv, algGCM.additionalData, algGCM.tagLength / 8);
	                    break;
	                default:
	                    throw new crypto_1.LinerError(webcrypto_core_1.AlgorithmError.UNSUPPORTED_ALGORITHM, algorithm.name);
	            }
	            resolve(res.buffer);
	        });
	    };
	    AesCrypto.wrapKey = function (format, key, wrappingKey, wrapAlgorithm) {
	        return new Promise(function (resolve, reject) {
	            self.crypto.subtle.exportKey(format, key)
	                .then(function (data) {
	                var raw;
	                if (!(data instanceof ArrayBuffer)) {
	                    // JWK
	                    raw = helper_1.string2buffer(JSON.stringify(data));
	                }
	                else {
	                    // ArrayBuffer
	                    raw = new Uint8Array(data);
	                }
	                return self.crypto.subtle.encrypt(wrapAlgorithm, wrappingKey, raw);
	            })
	                .then(resolve, reject);
	        });
	    };
	    AesCrypto.unwrapKey = function (format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            self.crypto.subtle.decrypt(unwrapAlgorithm, unwrappingKey, wrappedKey)
	                .then(function (data) {
	                var _data;
	                if (format.toLowerCase() === "jwk")
	                    _data = JSON.parse(helper_1.buffer2string(new Uint8Array(data)));
	                else
	                    _data = new Uint8Array(data);
	                return self.crypto.subtle.importKey(format, _data, unwrappedKeyAlgorithm, extractable, keyUsages);
	            })
	                .then(resolve, reject);
	        });
	    };
	    AesCrypto.exportKey = function (format, key) {
	        return new Promise(function (resolve, reject) {
	            var raw = key.key;
	            if (format.toLowerCase() === "jwk") {
	                var jwk = {
	                    alg: "A" + key.algorithm.length + /-(\w+)/i.exec(key.algorithm.name.toUpperCase())[1],
	                    ext: key.extractable,
	                    k: webcrypto_core_1.Base64Url.encode(raw),
	                    key_ops: key.usages,
	                    kty: "oct"
	                };
	                resolve(jwk);
	            }
	            else {
	                resolve(raw.buffer);
	            }
	        });
	    };
	    AesCrypto.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            var raw;
	            if (format.toLowerCase() === "jwk") {
	                var jwk = keyData;
	                raw = webcrypto_core_1.Base64Url.decode(jwk.k);
	            }
	            else
	                raw = new Uint8Array(keyData);
	            var key = new key_1.CryptoKey();
	            key.algorithm = algorithm;
	            key.type = "secret";
	            key.usages = keyUsages;
	            key.key = raw;
	            resolve(key);
	        });
	    };
	    return AesCrypto;
	}(webcrypto_core_1.BaseCrypto));
	exports.AesCrypto = AesCrypto;


/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	var CryptoKey = (function () {
	    function CryptoKey() {
	    }
	    return CryptoKey;
	}());
	exports.CryptoKey = CryptoKey;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! asmCrypto v0.0.11, (c) 2013 Artem S Vybornov, opensource.org/licenses/MIT */
	!function(a,b){function c(){var a=Error.apply(this,arguments);this.message=a.message,this.stack=a.stack}function d(){var a=Error.apply(this,arguments);this.message=a.message,this.stack=a.stack}function e(){var a=Error.apply(this,arguments);this.message=a.message,this.stack=a.stack}function f(a,b){b=!!b;for(var c=a.length,d=new Uint8Array(b?4*c:c),e=0,f=0;c>e;e++){var g=a.charCodeAt(e);if(b&&g>=55296&&56319>=g){if(++e>=c)throw new Error("Malformed string, low surrogate expected at position "+e);g=(55296^g)<<10|65536|56320^a.charCodeAt(e)}else if(!b&&g>>>8)throw new Error("Wide characters are not allowed.");!b||127>=g?d[f++]=g:2047>=g?(d[f++]=192|g>>6,d[f++]=128|63&g):65535>=g?(d[f++]=224|g>>12,d[f++]=128|g>>6&63,d[f++]=128|63&g):(d[f++]=240|g>>18,d[f++]=128|g>>12&63,d[f++]=128|g>>6&63,d[f++]=128|63&g)}return d.subarray(0,f)}function g(a){var b=a.length;1&b&&(a="0"+a,b++);for(var c=new Uint8Array(b>>1),d=0;b>d;d+=2)c[d>>1]=parseInt(a.substr(d,2),16);return c}function h(a){return f(atob(a))}function i(a,b){b=!!b;for(var c=a.length,d=new Array(c),e=0,f=0;c>e;e++){var g=a[e];if(!b||128>g)d[f++]=g;else if(g>=192&&224>g&&c>e+1)d[f++]=(31&g)<<6|63&a[++e];else if(g>=224&&240>g&&c>e+2)d[f++]=(15&g)<<12|(63&a[++e])<<6|63&a[++e];else{if(!(g>=240&&248>g&&c>e+3))throw new Error("Malformed UTF8 character at byte offset "+e);var h=(7&g)<<18|(63&a[++e])<<12|(63&a[++e])<<6|63&a[++e];65535>=h?d[f++]=h:(h^=65536,d[f++]=55296|h>>10,d[f++]=56320|1023&h)}}for(var i="",j=16384,e=0;f>e;e+=j)i+=String.fromCharCode.apply(String,d.slice(e,f>=e+j?e+j:f));return i}function j(a){for(var b="",c=0;c<a.length;c++){var d=(255&a[c]).toString(16);d.length<2&&(b+="0"),b+=d}return b}function k(a){return btoa(i(a))}function l(a){return a-=1,a|=a>>>1,a|=a>>>2,a|=a>>>4,a|=a>>>8,a|=a>>>16,a+=1}function m(a){return"number"==typeof a}function n(a){return"string"==typeof a}function o(a){return a instanceof ArrayBuffer}function p(a){return a instanceof Uint8Array}function q(a){return a instanceof Int8Array||a instanceof Uint8Array||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array}function r(a,b){var c=b.heap,d=c?c.byteLength:b.heapSize||65536;if(4095&d||0>=d)throw new Error("heap size must be a positive integer and a multiple of 4096");return c=c||new a(new ArrayBuffer(d))}function s(a,b,c,d,e){var f=a.length-b,g=e>f?f:e;return a.set(c.subarray(d,d+g),b),g}function t(a){a=a||{},this.heap=r(Uint8Array,a).subarray(Xb.HEAP_DATA),this.asm=a.asm||Xb(b,null,this.heap.buffer),this.mode=null,this.key=null,this.reset(a)}function u(a){if(void 0!==a){if(o(a)||p(a))a=new Uint8Array(a);else{if(!n(a))throw new TypeError("unexpected key type");a=f(a)}var b=a.length;if(16!==b&&24!==b&&32!==b)throw new d("illegal key size");var c=new DataView(a.buffer,a.byteOffset,a.byteLength);this.asm.set_key(b>>2,c.getUint32(0),c.getUint32(4),c.getUint32(8),c.getUint32(12),b>16?c.getUint32(16):0,b>16?c.getUint32(20):0,b>24?c.getUint32(24):0,b>24?c.getUint32(28):0),this.key=a}else if(!this.key)throw new Error("key is required")}function v(a){if(void 0!==a){if(o(a)||p(a))a=new Uint8Array(a);else{if(!n(a))throw new TypeError("unexpected iv type");a=f(a)}if(16!==a.length)throw new d("illegal iv size");var b=new DataView(a.buffer,a.byteOffset,a.byteLength);this.iv=a,this.asm.set_iv(b.getUint32(0),b.getUint32(4),b.getUint32(8),b.getUint32(12))}else this.iv=null,this.asm.set_iv(0,0,0,0)}function w(a){void 0!==a?this.padding=!!a:this.padding=!0}function x(a){return a=a||{},this.result=null,this.pos=0,this.len=0,u.call(this,a.key),this.hasOwnProperty("iv")&&v.call(this,a.iv),this.hasOwnProperty("padding")&&w.call(this,a.padding),this}function y(a){if(n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a)),!p(a))throw new TypeError("data isn't of expected type");for(var b=this.asm,c=this.heap,d=Xb.ENC[this.mode],e=Xb.HEAP_DATA,g=this.pos,h=this.len,i=0,j=a.length||0,k=0,l=h+j&-16,m=0,q=new Uint8Array(l);j>0;)m=s(c,g+h,a,i,j),h+=m,i+=m,j-=m,m=b.cipher(d,e+g,h),m&&q.set(c.subarray(g,g+m),k),k+=m,h>m?(g+=m,h-=m):(g=0,h=0);return this.result=q,this.pos=g,this.len=h,this}function z(a){var b=null,c=0;void 0!==a&&(b=y.call(this,a).result,c=b.length);var e=this.asm,f=this.heap,g=Xb.ENC[this.mode],h=Xb.HEAP_DATA,i=this.pos,j=this.len,k=16-j%16,l=j;if(this.hasOwnProperty("padding")){if(this.padding){for(var m=0;k>m;++m)f[i+j+m]=k;j+=k,l=j}else if(j%16)throw new d("data length must be a multiple of the block size")}else j+=k;var n=new Uint8Array(c+l);return c&&n.set(b),j&&e.cipher(g,h+i,j),l&&n.set(f.subarray(i,i+l),c),this.result=n,this.pos=0,this.len=0,this}function A(a){if(n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a)),!p(a))throw new TypeError("data isn't of expected type");var b=this.asm,c=this.heap,d=Xb.DEC[this.mode],e=Xb.HEAP_DATA,g=this.pos,h=this.len,i=0,j=a.length||0,k=0,l=h+j&-16,m=0,q=0;this.hasOwnProperty("padding")&&this.padding&&(m=h+j-l||16,l-=m);for(var r=new Uint8Array(l);j>0;)q=s(c,g+h,a,i,j),h+=q,i+=q,j-=q,q=b.cipher(d,e+g,h-(j?0:m)),q&&r.set(c.subarray(g,g+q),k),k+=q,h>q?(g+=q,h-=q):(g=0,h=0);return this.result=r,this.pos=g,this.len=h,this}function B(a){var b=null,c=0;void 0!==a&&(b=A.call(this,a).result,c=b.length);var f=this.asm,g=this.heap,h=Xb.DEC[this.mode],i=Xb.HEAP_DATA,j=this.pos,k=this.len,l=k;if(k>0){if(k%16){if(this.hasOwnProperty("padding"))throw new d("data length must be a multiple of the block size");k+=16-k%16}if(f.cipher(h,i+j,k),this.hasOwnProperty("padding")&&this.padding){var m=g[j+l-1];if(1>m||m>16||m>l)throw new e("bad padding");for(var n=0,o=m;o>1;o--)n|=m^g[j+l-o];if(n)throw new e("bad padding");l-=m}}var p=new Uint8Array(c+l);return c>0&&p.set(b),l>0&&p.set(g.subarray(j,j+l),c),this.result=p,this.pos=0,this.len=0,this}function C(a){this.padding=!0,this.iv=null,t.call(this,a),this.mode="CBC"}function D(a){C.call(this,a)}function E(a){C.call(this,a)}function F(a){this.nonce=null,this.counter=0,this.counterSize=0,t.call(this,a),this.mode="CTR"}function G(a){F.call(this,a)}function H(a,b,c){if(void 0!==c){if(8>c||c>48)throw new d("illegal counter size");this.counterSize=c;var e=Math.pow(2,c)-1;this.asm.set_mask(0,0,e/4294967296|0,0|e)}else this.counterSize=c=48,this.asm.set_mask(0,0,65535,4294967295);if(void 0===a)throw new Error("nonce is required");if(o(a)||p(a))a=new Uint8Array(a);else{if(!n(a))throw new TypeError("unexpected nonce type");a=f(a)}var g=a.length;if(!g||g>16)throw new d("illegal nonce size");this.nonce=a;var h=new DataView(new ArrayBuffer(16));if(new Uint8Array(h.buffer).set(a),this.asm.set_nonce(h.getUint32(0),h.getUint32(4),h.getUint32(8),h.getUint32(12)),void 0!==b){if(!m(b))throw new TypeError("unexpected counter type");if(0>b||b>=Math.pow(2,c))throw new d("illegal counter value");this.counter=b,this.asm.set_counter(0,0,b/4294967296|0,0|b)}else this.counter=b=0}function I(a){return a=a||{},x.call(this,a),H.call(this,a.nonce,a.counter,a.counterSize),this}function J(a){for(var b=this.heap,c=this.asm,d=0,e=a.length||0,f=0;e>0;){for(f=s(b,0,a,d,e),d+=f,e-=f;15&f;)b[f++]=0;c.mac(Xb.MAC.GCM,Xb.HEAP_DATA,f)}}function K(a){this.nonce=null,this.adata=null,this.iv=null,this.counter=1,this.tagSize=16,t.call(this,a),this.mode="GCM"}function L(a){K.call(this,a)}function M(a){K.call(this,a)}function N(a){a=a||{},x.call(this,a);var b=this.asm,c=this.heap;b.gcm_init();var e=a.tagSize;if(void 0!==e){if(!m(e))throw new TypeError("tagSize must be a number");if(4>e||e>16)throw new d("illegal tagSize value");this.tagSize=e}else this.tagSize=16;var g=a.nonce;if(void 0===g)throw new Error("nonce is required");if(p(g)||o(g))g=new Uint8Array(g);else{if(!n(g))throw new TypeError("unexpected nonce type");g=f(g)}this.nonce=g;var h=g.length||0,i=new Uint8Array(16);12!==h?(J.call(this,g),c[0]=c[1]=c[2]=c[3]=c[4]=c[5]=c[6]=c[7]=c[8]=c[9]=c[10]=0,c[11]=h>>>29,c[12]=h>>>21&255,c[13]=h>>>13&255,c[14]=h>>>5&255,c[15]=h<<3&255,b.mac(Xb.MAC.GCM,Xb.HEAP_DATA,16),b.get_iv(Xb.HEAP_DATA),b.set_iv(),i.set(c.subarray(0,16))):(i.set(g),i[15]=1);var j=new DataView(i.buffer);this.gamma0=j.getUint32(12),b.set_nonce(j.getUint32(0),j.getUint32(4),j.getUint32(8),0),b.set_mask(0,0,0,4294967295);var k=a.adata;if(void 0!==k&&null!==k){if(p(k)||o(k))k=new Uint8Array(k);else{if(!n(k))throw new TypeError("unexpected adata type");k=f(k)}if(k.length>bc)throw new d("illegal adata length");k.length?(this.adata=k,J.call(this,k)):this.adata=null}else this.adata=null;var l=a.counter;if(void 0!==l){if(!m(l))throw new TypeError("counter must be a number");if(1>l||l>4294967295)throw new RangeError("counter must be a positive 32-bit integer");this.counter=l,b.set_counter(0,0,0,this.gamma0+l|0)}else this.counter=1,b.set_counter(0,0,0,this.gamma0+1|0);var q=a.iv;if(void 0!==q){if(!m(l))throw new TypeError("counter must be a number");this.iv=q,v.call(this,q)}return this}function O(a){if(n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a)),!p(a))throw new TypeError("data isn't of expected type");var b=0,c=a.length||0,d=this.asm,e=this.heap,g=this.counter,h=this.pos,i=this.len,j=0,k=i+c&-16,l=0;if((g-1<<4)+i+c>bc)throw new RangeError("counter overflow");for(var m=new Uint8Array(k);c>0;)l=s(e,h+i,a,b,c),i+=l,b+=l,c-=l,l=d.cipher(Xb.ENC.CTR,Xb.HEAP_DATA+h,i),l=d.mac(Xb.MAC.GCM,Xb.HEAP_DATA+h,l),l&&m.set(e.subarray(h,h+l),j),g+=l>>>4,j+=l,i>l?(h+=l,i-=l):(h=0,i=0);return this.result=m,this.counter=g,this.pos=h,this.len=i,this}function P(){var a=this.asm,b=this.heap,c=this.counter,d=this.tagSize,e=this.adata,f=this.pos,g=this.len,h=new Uint8Array(g+d);a.cipher(Xb.ENC.CTR,Xb.HEAP_DATA+f,g+15&-16),g&&h.set(b.subarray(f,f+g));for(var i=g;15&i;i++)b[f+i]=0;a.mac(Xb.MAC.GCM,Xb.HEAP_DATA+f,i);var j=null!==e?e.length:0,k=(c-1<<4)+g;return b[0]=b[1]=b[2]=0,b[3]=j>>>29,b[4]=j>>>21,b[5]=j>>>13&255,b[6]=j>>>5&255,b[7]=j<<3&255,b[8]=b[9]=b[10]=0,b[11]=k>>>29,b[12]=k>>>21&255,b[13]=k>>>13&255,b[14]=k>>>5&255,b[15]=k<<3&255,a.mac(Xb.MAC.GCM,Xb.HEAP_DATA,16),a.get_iv(Xb.HEAP_DATA),a.set_counter(0,0,0,this.gamma0),a.cipher(Xb.ENC.CTR,Xb.HEAP_DATA,16),h.set(b.subarray(0,d),g),this.result=h,this.counter=1,this.pos=0,this.len=0,this}function Q(a){var b=O.call(this,a).result,c=P.call(this).result,d=new Uint8Array(b.length+c.length);return b.length&&d.set(b),c.length&&d.set(c,b.length),this.result=d,this}function R(a){if(n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a)),!p(a))throw new TypeError("data isn't of expected type");var b=0,c=a.length||0,d=this.asm,e=this.heap,g=this.counter,h=this.tagSize,i=this.pos,j=this.len,k=0,l=j+c>h?j+c-h&-16:0,m=j+c-l,q=0;if((g-1<<4)+j+c>bc)throw new RangeError("counter overflow");for(var r=new Uint8Array(l);c>m;)q=s(e,i+j,a,b,c-m),j+=q,b+=q,c-=q,q=d.mac(Xb.MAC.GCM,Xb.HEAP_DATA+i,q),q=d.cipher(Xb.DEC.CTR,Xb.HEAP_DATA+i,q),q&&r.set(e.subarray(i,i+q),k),g+=q>>>4,k+=q,i=0,j=0;return c>0&&(j+=s(e,0,a,b,c)),this.result=r,this.counter=g,this.pos=i,this.len=j,this}function S(){var a=this.asm,b=this.heap,d=this.tagSize,f=this.adata,g=this.counter,h=this.pos,i=this.len,j=i-d,k=0;if(d>i)throw new c("authentication tag not found");for(var l=new Uint8Array(j),m=new Uint8Array(b.subarray(h+j,h+i)),n=j;15&n;n++)b[h+n]=0;k=a.mac(Xb.MAC.GCM,Xb.HEAP_DATA+h,n),k=a.cipher(Xb.DEC.CTR,Xb.HEAP_DATA+h,n),j&&l.set(b.subarray(h,h+j));var o=null!==f?f.length:0,p=(g-1<<4)+i-d;b[0]=b[1]=b[2]=0,b[3]=o>>>29,b[4]=o>>>21,b[5]=o>>>13&255,b[6]=o>>>5&255,b[7]=o<<3&255,b[8]=b[9]=b[10]=0,b[11]=p>>>29,b[12]=p>>>21&255,b[13]=p>>>13&255,b[14]=p>>>5&255,b[15]=p<<3&255,a.mac(Xb.MAC.GCM,Xb.HEAP_DATA,16),a.get_iv(Xb.HEAP_DATA),a.set_counter(0,0,0,this.gamma0),a.cipher(Xb.ENC.CTR,Xb.HEAP_DATA,16);for(var q=0,n=0;d>n;++n)q|=m[n]^b[n];if(q)throw new e("data integrity check failed");return this.result=l,this.counter=1,this.pos=0,this.len=0,this}function T(a){var b=R.call(this,a).result,c=S.call(this).result,d=new Uint8Array(b.length+c.length);return b.length&&d.set(b),c.length&&d.set(c,b.length),this.result=d,this}function U(a,b,c,d){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");return new C({heap:fc,asm:gc,key:b,padding:c,iv:d}).encrypt(a).result}function V(a,b,c,d){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");return new C({heap:fc,asm:gc,key:b,padding:c,iv:d}).decrypt(a).result}function W(a,b,c,d,e){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");if(void 0===c)throw new SyntaxError("nonce required");return new K({heap:fc,asm:gc,key:b,nonce:c,adata:d,tagSize:e}).encrypt(a).result}function X(a,b,c,d,e){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");if(void 0===c)throw new SyntaxError("nonce required");return new K({heap:fc,asm:gc,key:b,nonce:c,adata:d,tagSize:e}).decrypt(a).result}function Y(){return this.result=null,this.pos=0,this.len=0,this.asm.reset(),this}function Z(a){if(null!==this.result)throw new c("state must be reset before processing new data");if(n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a)),!p(a))throw new TypeError("data isn't of expected type");for(var b=this.asm,d=this.heap,e=this.pos,g=this.len,h=0,i=a.length,j=0;i>0;)j=s(d,e+g,a,h,i),g+=j,h+=j,i-=j,j=b.process(e,g),e+=j,g-=j,g||(e=0);return this.pos=e,this.len=g,this}function $(){if(null!==this.result)throw new c("state must be reset before processing new data");return this.asm.finish(this.pos,this.len,0),this.result=new Uint8Array(this.HASH_SIZE),this.result.set(this.heap.subarray(0,this.HASH_SIZE)),this.pos=0,this.len=0,this}function _(a,b,c){"use asm";var d=0,e=0,f=0,g=0,h=0,i=0,j=0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;var u=new a.Uint8Array(c);function v(a,b,c,i,j,k,l,m,n,o,p,q,r,s,t,u){a=a|0;b=b|0;c=c|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;q=q|0;r=r|0;s=s|0;t=t|0;u=u|0;var v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,$=0,_=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0;v=d;w=e;x=f;y=g;z=h;B=a+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;B=b+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;B=c+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;B=i+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;B=j+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;B=k+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;B=l+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;B=m+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;B=n+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;B=o+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;B=p+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;B=q+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;B=r+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;B=s+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;B=t+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;B=u+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=s^n^c^a;C=A<<1|A>>>31;B=C+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=t^o^i^b;D=A<<1|A>>>31;B=D+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=u^p^j^c;E=A<<1|A>>>31;B=E+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=C^q^k^i;F=A<<1|A>>>31;B=F+(v<<5|v>>>27)+z+(w&x|~w&y)+1518500249|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=D^r^l^j;G=A<<1|A>>>31;B=G+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=E^s^m^k;H=A<<1|A>>>31;B=H+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=F^t^n^l;I=A<<1|A>>>31;B=I+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=G^u^o^m;J=A<<1|A>>>31;B=J+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=H^C^p^n;K=A<<1|A>>>31;B=K+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=I^D^q^o;L=A<<1|A>>>31;B=L+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=J^E^r^p;M=A<<1|A>>>31;B=M+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=K^F^s^q;N=A<<1|A>>>31;B=N+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=L^G^t^r;O=A<<1|A>>>31;B=O+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=M^H^u^s;P=A<<1|A>>>31;B=P+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=N^I^C^t;Q=A<<1|A>>>31;B=Q+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=O^J^D^u;R=A<<1|A>>>31;B=R+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=P^K^E^C;S=A<<1|A>>>31;B=S+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=Q^L^F^D;T=A<<1|A>>>31;B=T+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=R^M^G^E;U=A<<1|A>>>31;B=U+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=S^N^H^F;V=A<<1|A>>>31;B=V+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=T^O^I^G;W=A<<1|A>>>31;B=W+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=U^P^J^H;X=A<<1|A>>>31;B=X+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=V^Q^K^I;Y=A<<1|A>>>31;B=Y+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=W^R^L^J;Z=A<<1|A>>>31;B=Z+(v<<5|v>>>27)+z+(w^x^y)+1859775393|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=X^S^M^K;$=A<<1|A>>>31;B=$+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=Y^T^N^L;_=A<<1|A>>>31;B=_+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=Z^U^O^M;aa=A<<1|A>>>31;B=aa+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=$^V^P^N;ba=A<<1|A>>>31;B=ba+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=_^W^Q^O;ca=A<<1|A>>>31;B=ca+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=aa^X^R^P;da=A<<1|A>>>31;B=da+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=ba^Y^S^Q;ea=A<<1|A>>>31;B=ea+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=ca^Z^T^R;fa=A<<1|A>>>31;B=fa+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=da^$^U^S;ga=A<<1|A>>>31;B=ga+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=ea^_^V^T;ha=A<<1|A>>>31;B=ha+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=fa^aa^W^U;ia=A<<1|A>>>31;B=ia+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=ga^ba^X^V;ja=A<<1|A>>>31;B=ja+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=ha^ca^Y^W;ka=A<<1|A>>>31;B=ka+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=ia^da^Z^X;la=A<<1|A>>>31;B=la+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=ja^ea^$^Y;ma=A<<1|A>>>31;B=ma+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=ka^fa^_^Z;na=A<<1|A>>>31;B=na+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=la^ga^aa^$;oa=A<<1|A>>>31;B=oa+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=ma^ha^ba^_;pa=A<<1|A>>>31;B=pa+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=na^ia^ca^aa;qa=A<<1|A>>>31;B=qa+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=oa^ja^da^ba;ra=A<<1|A>>>31;B=ra+(v<<5|v>>>27)+z+(w&x|w&y|x&y)-1894007588|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=pa^ka^ea^ca;sa=A<<1|A>>>31;B=sa+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=qa^la^fa^da;ta=A<<1|A>>>31;B=ta+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=ra^ma^ga^ea;ua=A<<1|A>>>31;B=ua+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=sa^na^ha^fa;va=A<<1|A>>>31;B=va+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=ta^oa^ia^ga;wa=A<<1|A>>>31;B=wa+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=ua^pa^ja^ha;xa=A<<1|A>>>31;B=xa+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=va^qa^ka^ia;ya=A<<1|A>>>31;B=ya+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=wa^ra^la^ja;za=A<<1|A>>>31;B=za+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=xa^sa^ma^ka;Aa=A<<1|A>>>31;B=Aa+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=ya^ta^na^la;Ba=A<<1|A>>>31;B=Ba+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=za^ua^oa^ma;Ca=A<<1|A>>>31;B=Ca+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=Aa^va^pa^na;Da=A<<1|A>>>31;B=Da+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=Ba^wa^qa^oa;Ea=A<<1|A>>>31;B=Ea+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=Ca^xa^ra^pa;Fa=A<<1|A>>>31;B=Fa+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=Da^ya^sa^qa;Ga=A<<1|A>>>31;B=Ga+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=Ea^za^ta^ra;Ha=A<<1|A>>>31;B=Ha+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=Fa^Aa^ua^sa;Ia=A<<1|A>>>31;B=Ia+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=Ga^Ba^va^ta;Ja=A<<1|A>>>31;B=Ja+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=Ha^Ca^wa^ua;Ka=A<<1|A>>>31;B=Ka+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;A=Ia^Da^xa^va;La=A<<1|A>>>31;B=La+(v<<5|v>>>27)+z+(w^x^y)-899497514|0;z=y;y=x;x=w<<30|w>>>2;w=v;v=B;d=d+v|0;e=e+w|0;f=f+x|0;g=g+y|0;h=h+z|0}function w(a){a=a|0;v(u[a|0]<<24|u[a|1]<<16|u[a|2]<<8|u[a|3],u[a|4]<<24|u[a|5]<<16|u[a|6]<<8|u[a|7],u[a|8]<<24|u[a|9]<<16|u[a|10]<<8|u[a|11],u[a|12]<<24|u[a|13]<<16|u[a|14]<<8|u[a|15],u[a|16]<<24|u[a|17]<<16|u[a|18]<<8|u[a|19],u[a|20]<<24|u[a|21]<<16|u[a|22]<<8|u[a|23],u[a|24]<<24|u[a|25]<<16|u[a|26]<<8|u[a|27],u[a|28]<<24|u[a|29]<<16|u[a|30]<<8|u[a|31],u[a|32]<<24|u[a|33]<<16|u[a|34]<<8|u[a|35],u[a|36]<<24|u[a|37]<<16|u[a|38]<<8|u[a|39],u[a|40]<<24|u[a|41]<<16|u[a|42]<<8|u[a|43],u[a|44]<<24|u[a|45]<<16|u[a|46]<<8|u[a|47],u[a|48]<<24|u[a|49]<<16|u[a|50]<<8|u[a|51],u[a|52]<<24|u[a|53]<<16|u[a|54]<<8|u[a|55],u[a|56]<<24|u[a|57]<<16|u[a|58]<<8|u[a|59],u[a|60]<<24|u[a|61]<<16|u[a|62]<<8|u[a|63])}function x(a){a=a|0;u[a|0]=d>>>24;u[a|1]=d>>>16&255;u[a|2]=d>>>8&255;u[a|3]=d&255;u[a|4]=e>>>24;u[a|5]=e>>>16&255;u[a|6]=e>>>8&255;u[a|7]=e&255;u[a|8]=f>>>24;u[a|9]=f>>>16&255;u[a|10]=f>>>8&255;u[a|11]=f&255;u[a|12]=g>>>24;u[a|13]=g>>>16&255;u[a|14]=g>>>8&255;u[a|15]=g&255;u[a|16]=h>>>24;u[a|17]=h>>>16&255;u[a|18]=h>>>8&255;u[a|19]=h&255}function y(){d=1732584193;e=4023233417;f=2562383102;g=271733878;h=3285377520;i=j=0}function z(a,b,c,k,l,m,n){a=a|0;b=b|0;c=c|0;k=k|0;l=l|0;m=m|0;n=n|0;d=a;e=b;f=c;g=k;h=l;i=m;j=n}function A(a,b){a=a|0;b=b|0;var c=0;if(a&63)return-1;while((b|0)>=64){w(a);a=a+64|0;b=b-64|0;c=c+64|0}i=i+c|0;if(i>>>0<c>>>0)j=j+1|0;return c|0}function B(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;if(a&63)return-1;if(~c)if(c&31)return-1;if((b|0)>=64){d=A(a,b)|0;if((d|0)==-1)return-1;a=a+d|0;b=b-d|0}d=d+b|0;i=i+b|0;if(i>>>0<b>>>0)j=j+1|0;u[a|b]=128;if((b|0)>=56){for(e=b+1|0;(e|0)<64;e=e+1|0)u[a|e]=0;w(a);b=0;u[a|0]=0}for(e=b+1|0;(e|0)<59;e=e+1|0)u[a|e]=0;u[a|56]=j>>>21&255;u[a|57]=j>>>13&255;u[a|58]=j>>>5&255;u[a|59]=j<<3&255|i>>>29;u[a|60]=i>>>21&255;u[a|61]=i>>>13&255;u[a|62]=i>>>5&255;u[a|63]=i<<3&255;w(a);if(~c)x(c);return d|0}function C(){d=k;e=l;f=m;g=n;h=o;i=64;j=0}function D(){d=p;e=q;f=r;g=s;h=t;i=64;j=0}function E(a,b,c,u,w,x,z,A,B,C,D,E,F,G,H,I){a=a|0;b=b|0;c=c|0;u=u|0;w=w|0;x=x|0;z=z|0;A=A|0;B=B|0;C=C|0;D=D|0;E=E|0;F=F|0;G=G|0;H=H|0;I=I|0;y();v(a^1549556828,b^1549556828,c^1549556828,u^1549556828,w^1549556828,x^1549556828,z^1549556828,A^1549556828,B^1549556828,C^1549556828,D^1549556828,E^1549556828,F^1549556828,G^1549556828,H^1549556828,I^1549556828);p=d;q=e;r=f;s=g;t=h;y();v(a^909522486,b^909522486,c^909522486,u^909522486,w^909522486,x^909522486,z^909522486,A^909522486,B^909522486,C^909522486,D^909522486,E^909522486,F^909522486,G^909522486,H^909522486,I^909522486);k=d;l=e;m=f;n=g;o=h;i=64;j=0}function F(a,b,c){a=a|0;b=b|0;c=c|0;var i=0,j=0,k=0,l=0,m=0,n=0;if(a&63)return-1;if(~c)if(c&31)return-1;n=B(a,b,-1)|0;i=d,j=e,k=f,l=g,m=h;D();v(i,j,k,l,m,2147483648,0,0,0,0,0,0,0,0,0,672);if(~c)x(c);return n|0}function G(a,b,c,i,j){a=a|0;b=b|0;c=c|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;if(a&63)return-1;if(~j)if(j&31)return-1;u[a+b|0]=c>>>24;u[a+b+1|0]=c>>>16&255;u[a+b+2|0]=c>>>8&255;u[a+b+3|0]=c&255;F(a,b+4|0,-1)|0;k=p=d,l=q=e,m=r=f,n=s=g,o=t=h;i=i-1|0;while((i|0)>0){C();v(p,q,r,s,t,2147483648,0,0,0,0,0,0,0,0,0,672);p=d,q=e,r=f,s=g,t=h;D();v(p,q,r,s,t,2147483648,0,0,0,0,0,0,0,0,0,672);p=d,q=e,r=f,s=g,t=h;k=k^d;l=l^e;m=m^f;n=n^g;o=o^h;i=i-1|0}d=k;e=l;f=m;g=n;h=o;if(~j)x(j);return 0}return{reset:y,init:z,process:A,finish:B,hmac_reset:C,hmac_init:E,hmac_finish:F,pbkdf2_generate_block:G}}function aa(a){a=a||{},this.heap=r(Uint8Array,a),this.asm=a.asm||_(b,null,this.heap.buffer),this.BLOCK_SIZE=hc,this.HASH_SIZE=ic,this.reset()}function ba(){return null===kc&&(kc=new aa({heapSize:1048576})),kc}function ca(a){if(void 0===a)throw new SyntaxError("data required");return ba().reset().process(a).finish().result}function da(a){var b=ca(a);return j(b)}function ea(a){var b=ca(a);return k(b)}function fa(a,b,c){"use asm";var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;var D=new a.Uint8Array(c);function E(a,b,c,l,m,n,o,p,q,r,s,t,u,v,w,x){a=a|0;b=b|0;c=c|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;q=q|0;r=r|0;s=s|0;t=t|0;u=u|0;v=v|0;w=w|0;x=x|0;var y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;y=d;z=e;A=f;B=g;C=h;D=i;E=j;F=k;G=a+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+1116352408|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;G=b+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+1899447441|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;G=c+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+3049323471|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;G=l+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+3921009573|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;G=m+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+961987163|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;G=n+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+1508970993|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;G=o+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+2453635748|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;G=p+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+2870763221|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;G=q+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+3624381080|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;G=r+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+310598401|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;G=s+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+607225278|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;G=t+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+1426881987|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;G=u+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+1925078388|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;G=v+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+2162078206|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;G=w+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+2614888103|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;G=x+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+3248222580|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;a=G=(b>>>7^b>>>18^b>>>3^b<<25^b<<14)+(w>>>17^w>>>19^w>>>10^w<<15^w<<13)+a+r|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+3835390401|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;b=G=(c>>>7^c>>>18^c>>>3^c<<25^c<<14)+(x>>>17^x>>>19^x>>>10^x<<15^x<<13)+b+s|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+4022224774|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;c=G=(l>>>7^l>>>18^l>>>3^l<<25^l<<14)+(a>>>17^a>>>19^a>>>10^a<<15^a<<13)+c+t|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+264347078|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;l=G=(m>>>7^m>>>18^m>>>3^m<<25^m<<14)+(b>>>17^b>>>19^b>>>10^b<<15^b<<13)+l+u|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+604807628|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;m=G=(n>>>7^n>>>18^n>>>3^n<<25^n<<14)+(c>>>17^c>>>19^c>>>10^c<<15^c<<13)+m+v|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+770255983|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;n=G=(o>>>7^o>>>18^o>>>3^o<<25^o<<14)+(l>>>17^l>>>19^l>>>10^l<<15^l<<13)+n+w|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+1249150122|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;o=G=(p>>>7^p>>>18^p>>>3^p<<25^p<<14)+(m>>>17^m>>>19^m>>>10^m<<15^m<<13)+o+x|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+1555081692|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;p=G=(q>>>7^q>>>18^q>>>3^q<<25^q<<14)+(n>>>17^n>>>19^n>>>10^n<<15^n<<13)+p+a|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+1996064986|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;q=G=(r>>>7^r>>>18^r>>>3^r<<25^r<<14)+(o>>>17^o>>>19^o>>>10^o<<15^o<<13)+q+b|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+2554220882|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;r=G=(s>>>7^s>>>18^s>>>3^s<<25^s<<14)+(p>>>17^p>>>19^p>>>10^p<<15^p<<13)+r+c|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+2821834349|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;s=G=(t>>>7^t>>>18^t>>>3^t<<25^t<<14)+(q>>>17^q>>>19^q>>>10^q<<15^q<<13)+s+l|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+2952996808|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;t=G=(u>>>7^u>>>18^u>>>3^u<<25^u<<14)+(r>>>17^r>>>19^r>>>10^r<<15^r<<13)+t+m|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+3210313671|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;u=G=(v>>>7^v>>>18^v>>>3^v<<25^v<<14)+(s>>>17^s>>>19^s>>>10^s<<15^s<<13)+u+n|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+3336571891|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;v=G=(w>>>7^w>>>18^w>>>3^w<<25^w<<14)+(t>>>17^t>>>19^t>>>10^t<<15^t<<13)+v+o|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+3584528711|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;w=G=(x>>>7^x>>>18^x>>>3^x<<25^x<<14)+(u>>>17^u>>>19^u>>>10^u<<15^u<<13)+w+p|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+113926993|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;
	x=G=(a>>>7^a>>>18^a>>>3^a<<25^a<<14)+(v>>>17^v>>>19^v>>>10^v<<15^v<<13)+x+q|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+338241895|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;a=G=(b>>>7^b>>>18^b>>>3^b<<25^b<<14)+(w>>>17^w>>>19^w>>>10^w<<15^w<<13)+a+r|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+666307205|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;b=G=(c>>>7^c>>>18^c>>>3^c<<25^c<<14)+(x>>>17^x>>>19^x>>>10^x<<15^x<<13)+b+s|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+773529912|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;c=G=(l>>>7^l>>>18^l>>>3^l<<25^l<<14)+(a>>>17^a>>>19^a>>>10^a<<15^a<<13)+c+t|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+1294757372|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;l=G=(m>>>7^m>>>18^m>>>3^m<<25^m<<14)+(b>>>17^b>>>19^b>>>10^b<<15^b<<13)+l+u|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+1396182291|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;m=G=(n>>>7^n>>>18^n>>>3^n<<25^n<<14)+(c>>>17^c>>>19^c>>>10^c<<15^c<<13)+m+v|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+1695183700|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;n=G=(o>>>7^o>>>18^o>>>3^o<<25^o<<14)+(l>>>17^l>>>19^l>>>10^l<<15^l<<13)+n+w|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+1986661051|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;o=G=(p>>>7^p>>>18^p>>>3^p<<25^p<<14)+(m>>>17^m>>>19^m>>>10^m<<15^m<<13)+o+x|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+2177026350|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;p=G=(q>>>7^q>>>18^q>>>3^q<<25^q<<14)+(n>>>17^n>>>19^n>>>10^n<<15^n<<13)+p+a|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+2456956037|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;q=G=(r>>>7^r>>>18^r>>>3^r<<25^r<<14)+(o>>>17^o>>>19^o>>>10^o<<15^o<<13)+q+b|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+2730485921|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;r=G=(s>>>7^s>>>18^s>>>3^s<<25^s<<14)+(p>>>17^p>>>19^p>>>10^p<<15^p<<13)+r+c|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+2820302411|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;s=G=(t>>>7^t>>>18^t>>>3^t<<25^t<<14)+(q>>>17^q>>>19^q>>>10^q<<15^q<<13)+s+l|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+3259730800|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;t=G=(u>>>7^u>>>18^u>>>3^u<<25^u<<14)+(r>>>17^r>>>19^r>>>10^r<<15^r<<13)+t+m|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+3345764771|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;u=G=(v>>>7^v>>>18^v>>>3^v<<25^v<<14)+(s>>>17^s>>>19^s>>>10^s<<15^s<<13)+u+n|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+3516065817|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;v=G=(w>>>7^w>>>18^w>>>3^w<<25^w<<14)+(t>>>17^t>>>19^t>>>10^t<<15^t<<13)+v+o|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+3600352804|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;w=G=(x>>>7^x>>>18^x>>>3^x<<25^x<<14)+(u>>>17^u>>>19^u>>>10^u<<15^u<<13)+w+p|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+4094571909|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;x=G=(a>>>7^a>>>18^a>>>3^a<<25^a<<14)+(v>>>17^v>>>19^v>>>10^v<<15^v<<13)+x+q|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+275423344|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;a=G=(b>>>7^b>>>18^b>>>3^b<<25^b<<14)+(w>>>17^w>>>19^w>>>10^w<<15^w<<13)+a+r|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+430227734|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;b=G=(c>>>7^c>>>18^c>>>3^c<<25^c<<14)+(x>>>17^x>>>19^x>>>10^x<<15^x<<13)+b+s|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+506948616|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;c=G=(l>>>7^l>>>18^l>>>3^l<<25^l<<14)+(a>>>17^a>>>19^a>>>10^a<<15^a<<13)+c+t|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+659060556|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;l=G=(m>>>7^m>>>18^m>>>3^m<<25^m<<14)+(b>>>17^b>>>19^b>>>10^b<<15^b<<13)+l+u|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+883997877|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;m=G=(n>>>7^n>>>18^n>>>3^n<<25^n<<14)+(c>>>17^c>>>19^c>>>10^c<<15^c<<13)+m+v|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+958139571|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;n=G=(o>>>7^o>>>18^o>>>3^o<<25^o<<14)+(l>>>17^l>>>19^l>>>10^l<<15^l<<13)+n+w|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+1322822218|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;o=G=(p>>>7^p>>>18^p>>>3^p<<25^p<<14)+(m>>>17^m>>>19^m>>>10^m<<15^m<<13)+o+x|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+1537002063|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;p=G=(q>>>7^q>>>18^q>>>3^q<<25^q<<14)+(n>>>17^n>>>19^n>>>10^n<<15^n<<13)+p+a|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+1747873779|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;q=G=(r>>>7^r>>>18^r>>>3^r<<25^r<<14)+(o>>>17^o>>>19^o>>>10^o<<15^o<<13)+q+b|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+1955562222|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;r=G=(s>>>7^s>>>18^s>>>3^s<<25^s<<14)+(p>>>17^p>>>19^p>>>10^p<<15^p<<13)+r+c|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+2024104815|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;s=G=(t>>>7^t>>>18^t>>>3^t<<25^t<<14)+(q>>>17^q>>>19^q>>>10^q<<15^q<<13)+s+l|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+2227730452|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;t=G=(u>>>7^u>>>18^u>>>3^u<<25^u<<14)+(r>>>17^r>>>19^r>>>10^r<<15^r<<13)+t+m|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+2361852424|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;u=G=(v>>>7^v>>>18^v>>>3^v<<25^v<<14)+(s>>>17^s>>>19^s>>>10^s<<15^s<<13)+u+n|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+2428436474|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;v=G=(w>>>7^w>>>18^w>>>3^w<<25^w<<14)+(t>>>17^t>>>19^t>>>10^t<<15^t<<13)+v+o|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+2756734187|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;w=G=(x>>>7^x>>>18^x>>>3^x<<25^x<<14)+(u>>>17^u>>>19^u>>>10^u<<15^u<<13)+w+p|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+3204031479|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;x=G=(a>>>7^a>>>18^a>>>3^a<<25^a<<14)+(v>>>17^v>>>19^v>>>10^v<<15^v<<13)+x+q|0;G=G+F+(C>>>6^C>>>11^C>>>25^C<<26^C<<21^C<<7)+(E^C&(D^E))+3329325298|0;F=E;E=D;D=C;C=B+G|0;B=A;A=z;z=y;y=G+(z&A^B&(z^A))+(z>>>2^z>>>13^z>>>22^z<<30^z<<19^z<<10)|0;d=d+y|0;e=e+z|0;f=f+A|0;g=g+B|0;h=h+C|0;i=i+D|0;j=j+E|0;k=k+F|0}function F(a){a=a|0;E(D[a|0]<<24|D[a|1]<<16|D[a|2]<<8|D[a|3],D[a|4]<<24|D[a|5]<<16|D[a|6]<<8|D[a|7],D[a|8]<<24|D[a|9]<<16|D[a|10]<<8|D[a|11],D[a|12]<<24|D[a|13]<<16|D[a|14]<<8|D[a|15],D[a|16]<<24|D[a|17]<<16|D[a|18]<<8|D[a|19],D[a|20]<<24|D[a|21]<<16|D[a|22]<<8|D[a|23],D[a|24]<<24|D[a|25]<<16|D[a|26]<<8|D[a|27],D[a|28]<<24|D[a|29]<<16|D[a|30]<<8|D[a|31],D[a|32]<<24|D[a|33]<<16|D[a|34]<<8|D[a|35],D[a|36]<<24|D[a|37]<<16|D[a|38]<<8|D[a|39],D[a|40]<<24|D[a|41]<<16|D[a|42]<<8|D[a|43],D[a|44]<<24|D[a|45]<<16|D[a|46]<<8|D[a|47],D[a|48]<<24|D[a|49]<<16|D[a|50]<<8|D[a|51],D[a|52]<<24|D[a|53]<<16|D[a|54]<<8|D[a|55],D[a|56]<<24|D[a|57]<<16|D[a|58]<<8|D[a|59],D[a|60]<<24|D[a|61]<<16|D[a|62]<<8|D[a|63])}function G(a){a=a|0;D[a|0]=d>>>24;D[a|1]=d>>>16&255;D[a|2]=d>>>8&255;D[a|3]=d&255;D[a|4]=e>>>24;D[a|5]=e>>>16&255;D[a|6]=e>>>8&255;D[a|7]=e&255;D[a|8]=f>>>24;D[a|9]=f>>>16&255;D[a|10]=f>>>8&255;D[a|11]=f&255;D[a|12]=g>>>24;D[a|13]=g>>>16&255;D[a|14]=g>>>8&255;D[a|15]=g&255;D[a|16]=h>>>24;D[a|17]=h>>>16&255;D[a|18]=h>>>8&255;D[a|19]=h&255;D[a|20]=i>>>24;D[a|21]=i>>>16&255;D[a|22]=i>>>8&255;D[a|23]=i&255;D[a|24]=j>>>24;D[a|25]=j>>>16&255;D[a|26]=j>>>8&255;D[a|27]=j&255;D[a|28]=k>>>24;D[a|29]=k>>>16&255;D[a|30]=k>>>8&255;D[a|31]=k&255}function H(){d=1779033703;e=3144134277;f=1013904242;g=2773480762;h=1359893119;i=2600822924;j=528734635;k=1541459225;l=m=0}function I(a,b,c,n,o,p,q,r,s,t){a=a|0;b=b|0;c=c|0;n=n|0;o=o|0;p=p|0;q=q|0;r=r|0;s=s|0;t=t|0;d=a;e=b;f=c;g=n;h=o;i=p;j=q;k=r;l=s;m=t}function J(a,b){a=a|0;b=b|0;var c=0;if(a&63)return-1;while((b|0)>=64){F(a);a=a+64|0;b=b-64|0;c=c+64|0}l=l+c|0;if(l>>>0<c>>>0)m=m+1|0;return c|0}function K(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;if(a&63)return-1;if(~c)if(c&31)return-1;if((b|0)>=64){d=J(a,b)|0;if((d|0)==-1)return-1;a=a+d|0;b=b-d|0}d=d+b|0;l=l+b|0;if(l>>>0<b>>>0)m=m+1|0;D[a|b]=128;if((b|0)>=56){for(e=b+1|0;(e|0)<64;e=e+1|0)D[a|e]=0;F(a);b=0;D[a|0]=0}for(e=b+1|0;(e|0)<59;e=e+1|0)D[a|e]=0;D[a|56]=m>>>21&255;D[a|57]=m>>>13&255;D[a|58]=m>>>5&255;D[a|59]=m<<3&255|l>>>29;D[a|60]=l>>>21&255;D[a|61]=l>>>13&255;D[a|62]=l>>>5&255;D[a|63]=l<<3&255;F(a);if(~c)G(c);return d|0}function L(){d=n;e=o;f=p;g=q;h=r;i=s;j=t;k=u;l=64;m=0}function M(){d=v;e=w;f=x;g=y;h=z;i=A;j=B;k=C;l=64;m=0}function N(a,b,c,D,F,G,I,J,K,L,M,N,O,P,Q,R){a=a|0;b=b|0;c=c|0;D=D|0;F=F|0;G=G|0;I=I|0;J=J|0;K=K|0;L=L|0;M=M|0;N=N|0;O=O|0;P=P|0;Q=Q|0;R=R|0;H();E(a^1549556828,b^1549556828,c^1549556828,D^1549556828,F^1549556828,G^1549556828,I^1549556828,J^1549556828,K^1549556828,L^1549556828,M^1549556828,N^1549556828,O^1549556828,P^1549556828,Q^1549556828,R^1549556828);v=d;w=e;x=f;y=g;z=h;A=i;B=j;C=k;H();E(a^909522486,b^909522486,c^909522486,D^909522486,F^909522486,G^909522486,I^909522486,J^909522486,K^909522486,L^909522486,M^909522486,N^909522486,O^909522486,P^909522486,Q^909522486,R^909522486);n=d;o=e;p=f;q=g;r=h;s=i;t=j;u=k;l=64;m=0}function O(a,b,c){a=a|0;b=b|0;c=c|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;if(a&63)return-1;if(~c)if(c&31)return-1;t=K(a,b,-1)|0;l=d,m=e,n=f,o=g,p=h,q=i,r=j,s=k;M();E(l,m,n,o,p,q,r,s,2147483648,0,0,0,0,0,0,768);if(~c)G(c);return t|0}function P(a,b,c,l,m){a=a|0;b=b|0;c=c|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;if(a&63)return-1;if(~m)if(m&31)return-1;D[a+b|0]=c>>>24;D[a+b+1|0]=c>>>16&255;D[a+b+2|0]=c>>>8&255;D[a+b+3|0]=c&255;O(a,b+4|0,-1)|0;n=v=d,o=w=e,p=x=f,q=y=g,r=z=h,s=A=i,t=B=j,u=C=k;l=l-1|0;while((l|0)>0){L();E(v,w,x,y,z,A,B,C,2147483648,0,0,0,0,0,0,768);v=d,w=e,x=f,y=g,z=h,A=i,B=j,C=k;M();E(v,w,x,y,z,A,B,C,2147483648,0,0,0,0,0,0,768);v=d,w=e,x=f,y=g,z=h,A=i,B=j,C=k;n=n^d;o=o^e;p=p^f;q=q^g;r=r^h;s=s^i;t=t^j;u=u^k;l=l-1|0}d=n;e=o;f=p;g=q;h=r;i=s;j=t;k=u;if(~m)G(m);return 0}return{reset:H,init:I,process:J,finish:K,hmac_reset:L,hmac_init:N,hmac_finish:O,pbkdf2_generate_block:P}}function ga(a){a=a||{},this.heap=r(Uint8Array,a),this.asm=a.asm||fa(b,null,this.heap.buffer),this.BLOCK_SIZE=lc,this.HASH_SIZE=mc,this.reset()}function ha(){return null===oc&&(oc=new ga({heapSize:1048576})),oc}function ia(a){if(void 0===a)throw new SyntaxError("data required");return ha().reset().process(a).finish().result}function ja(a){var b=ia(a);return j(b)}function ka(a){var b=ia(a);return k(b)}function la(a){if(a=a||{},!a.hash)throw new SyntaxError("option 'hash' is required");if(!a.hash.HASH_SIZE)throw new SyntaxError("option 'hash' supplied doesn't seem to be a valid hash function");return this.hash=a.hash,this.BLOCK_SIZE=this.hash.BLOCK_SIZE,this.HMAC_SIZE=this.hash.HASH_SIZE,this.key=null,this.verify=null,this.result=null,(void 0!==a.password||void 0!==a.verify)&&this.reset(a),this}function ma(a,b){if(o(b)&&(b=new Uint8Array(b)),n(b)&&(b=f(b)),!p(b))throw new TypeError("password isn't of expected type");var c=new Uint8Array(a.BLOCK_SIZE);return b.length>a.BLOCK_SIZE?c.set(a.reset().process(b).finish().result):c.set(b),c}function na(a){if(o(a)||p(a))a=new Uint8Array(a);else{if(!n(a))throw new TypeError("verify tag isn't of expected type");a=f(a)}if(a.length!==this.HMAC_SIZE)throw new d("illegal verification tag size");this.verify=a}function oa(a){a=a||{};var b=a.password;if(null===this.key&&!n(b)&&!b)throw new c("no key is associated with the instance");this.result=null,this.hash.reset(),(b||n(b))&&(this.key=ma(this.hash,b));for(var d=new Uint8Array(this.key),e=0;e<d.length;++e)d[e]^=54;this.hash.process(d);var f=a.verify;return void 0!==f?na.call(this,f):this.verify=null,this}function pa(a){if(null===this.key)throw new c("no key is associated with the instance");if(null!==this.result)throw new c("state must be reset before processing new data");return this.hash.process(a),this}function qa(){if(null===this.key)throw new c("no key is associated with the instance");if(null!==this.result)throw new c("state must be reset before processing new data");for(var a=this.hash.finish().result,b=new Uint8Array(this.key),d=0;d<b.length;++d)b[d]^=92;var e=this.verify,f=this.hash.reset().process(b).process(a).finish().result;if(e)if(e.length===f.length){for(var g=0,d=0;d<e.length;d++)g|=e[d]^f[d];this.result=!g}else this.result=!1;else this.result=f;return this}function ra(a){return a=a||{},a.hash instanceof aa||(a.hash=ba()),la.call(this,a),this}function sa(a){a=a||{},this.result=null,this.hash.reset();var b=a.password;if(void 0!==b){n(b)&&(b=f(b));var c=this.key=ma(this.hash,b);this.hash.reset().asm.hmac_init(c[0]<<24|c[1]<<16|c[2]<<8|c[3],c[4]<<24|c[5]<<16|c[6]<<8|c[7],c[8]<<24|c[9]<<16|c[10]<<8|c[11],c[12]<<24|c[13]<<16|c[14]<<8|c[15],c[16]<<24|c[17]<<16|c[18]<<8|c[19],c[20]<<24|c[21]<<16|c[22]<<8|c[23],c[24]<<24|c[25]<<16|c[26]<<8|c[27],c[28]<<24|c[29]<<16|c[30]<<8|c[31],c[32]<<24|c[33]<<16|c[34]<<8|c[35],c[36]<<24|c[37]<<16|c[38]<<8|c[39],c[40]<<24|c[41]<<16|c[42]<<8|c[43],c[44]<<24|c[45]<<16|c[46]<<8|c[47],c[48]<<24|c[49]<<16|c[50]<<8|c[51],c[52]<<24|c[53]<<16|c[54]<<8|c[55],c[56]<<24|c[57]<<16|c[58]<<8|c[59],c[60]<<24|c[61]<<16|c[62]<<8|c[63])}else this.hash.asm.hmac_reset();var d=a.verify;return void 0!==d?na.call(this,d):this.verify=null,this}function ta(){if(null===this.key)throw new c("no key is associated with the instance");if(null!==this.result)throw new c("state must be reset before processing new data");var a=this.hash,b=this.hash.asm,d=this.hash.heap;b.hmac_finish(a.pos,a.len,0);var e=this.verify,f=new Uint8Array(ic);if(f.set(d.subarray(0,ic)),e)if(e.length===f.length){for(var g=0,h=0;h<e.length;h++)g|=e[h]^f[h];this.result=!g}else this.result=!1;else this.result=f;return this}function ua(){return null===rc&&(rc=new ra),rc}function va(a){return a=a||{},a.hash instanceof ga||(a.hash=ha()),la.call(this,a),this}function wa(a){a=a||{},this.result=null,this.hash.reset();var b=a.password;if(void 0!==b){n(b)&&(b=f(b));var c=this.key=ma(this.hash,b);this.hash.reset().asm.hmac_init(c[0]<<24|c[1]<<16|c[2]<<8|c[3],c[4]<<24|c[5]<<16|c[6]<<8|c[7],c[8]<<24|c[9]<<16|c[10]<<8|c[11],c[12]<<24|c[13]<<16|c[14]<<8|c[15],c[16]<<24|c[17]<<16|c[18]<<8|c[19],c[20]<<24|c[21]<<16|c[22]<<8|c[23],c[24]<<24|c[25]<<16|c[26]<<8|c[27],c[28]<<24|c[29]<<16|c[30]<<8|c[31],c[32]<<24|c[33]<<16|c[34]<<8|c[35],c[36]<<24|c[37]<<16|c[38]<<8|c[39],c[40]<<24|c[41]<<16|c[42]<<8|c[43],c[44]<<24|c[45]<<16|c[46]<<8|c[47],c[48]<<24|c[49]<<16|c[50]<<8|c[51],c[52]<<24|c[53]<<16|c[54]<<8|c[55],c[56]<<24|c[57]<<16|c[58]<<8|c[59],c[60]<<24|c[61]<<16|c[62]<<8|c[63])}else this.hash.asm.hmac_reset();var d=a.verify;return void 0!==d?na.call(this,d):this.verify=null,this}function xa(){if(null===this.key)throw new c("no key is associated with the instance");if(null!==this.result)throw new c("state must be reset before processing new data");var a=this.hash,b=this.hash.asm,d=this.hash.heap;b.hmac_finish(a.pos,a.len,0);var e=this.verify,f=new Uint8Array(mc);if(f.set(d.subarray(0,mc)),e)if(e.length===f.length){for(var g=0,h=0;h<e.length;h++)g|=e[h]^f[h];this.result=!g}else this.result=!1;else this.result=f;return this}function ya(){return null===tc&&(tc=new va),tc}function za(a,b){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("password required");return ua().reset({password:b}).process(a).finish().result}function Aa(a,b){var c=za(a,b);return j(c)}function Ba(a,b){var c=za(a,b);return k(c)}function Ca(a,b){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("password required");return ya().reset({password:b}).process(a).finish().result}function Da(a,b){var c=Ca(a,b);return j(c)}function Ea(a,b){var c=Ca(a,b);return k(c)}function Fa(a){if(a=a||{},!a.hmac)throw new SyntaxError("option 'hmac' is required");if(!a.hmac.HMAC_SIZE)throw new SyntaxError("option 'hmac' supplied doesn't seem to be a valid HMAC function");this.hmac=a.hmac,this.count=a.count||4096,this.length=a.length||this.hmac.HMAC_SIZE,this.result=null;var b=a.password;return(b||n(b))&&this.reset(a),this}function Ga(a){return this.result=null,this.hmac.reset(a),this}function Ha(a,b,e){if(null!==this.result)throw new c("state must be reset before processing new data");if(!a&&!n(a))throw new d("bad 'salt' value");b=b||this.count,e=e||this.length,this.result=new Uint8Array(e);for(var f=Math.ceil(e/this.hmac.HMAC_SIZE),g=1;f>=g;++g){var h=(g-1)*this.hmac.HMAC_SIZE,i=(f>g?0:e%this.hmac.HMAC_SIZE)||this.hmac.HMAC_SIZE,j=new Uint8Array(this.hmac.reset().process(a).process(new Uint8Array([g>>>24&255,g>>>16&255,g>>>8&255,255&g])).finish().result);this.result.set(j.subarray(0,i),h);for(var k=1;b>k;++k){j=new Uint8Array(this.hmac.reset().process(j).finish().result);for(var l=0;i>l;++l)this.result[h+l]^=j[l]}}return this}function Ia(a){return a=a||{},a.hmac instanceof ra||(a.hmac=ua()),Fa.call(this,a),this}function Ja(a,b,e){if(null!==this.result)throw new c("state must be reset before processing new data");if(!a&&!n(a))throw new d("bad 'salt' value");b=b||this.count,e=e||this.length,this.result=new Uint8Array(e);for(var f=Math.ceil(e/this.hmac.HMAC_SIZE),g=1;f>=g;++g){var h=(g-1)*this.hmac.HMAC_SIZE,i=(f>g?0:e%this.hmac.HMAC_SIZE)||this.hmac.HMAC_SIZE;this.hmac.reset().process(a),this.hmac.hash.asm.pbkdf2_generate_block(this.hmac.hash.pos,this.hmac.hash.len,g,b,0),this.result.set(this.hmac.hash.heap.subarray(0,i),h)}return this}function Ka(){return null===wc&&(wc=new Ia),wc}function La(a){return a=a||{},a.hmac instanceof va||(a.hmac=ya()),Fa.call(this,a),this}function Ma(a,b,e){if(null!==this.result)throw new c("state must be reset before processing new data");if(!a&&!n(a))throw new d("bad 'salt' value");b=b||this.count,e=e||this.length,this.result=new Uint8Array(e);for(var f=Math.ceil(e/this.hmac.HMAC_SIZE),g=1;f>=g;++g){var h=(g-1)*this.hmac.HMAC_SIZE,i=(f>g?0:e%this.hmac.HMAC_SIZE)||this.hmac.HMAC_SIZE;this.hmac.reset().process(a),this.hmac.hash.asm.pbkdf2_generate_block(this.hmac.hash.pos,this.hmac.hash.len,g,b,0),this.result.set(this.hmac.hash.heap.subarray(0,i),h)}return this}function Na(){return null===yc&&(yc=new La),yc}function Oa(a,b,c,d){if(void 0===a)throw new SyntaxError("password required");if(void 0===b)throw new SyntaxError("salt required");return Ka().reset({password:a}).generate(b,c,d).result}function Pa(a,b,c,d){var e=Oa(a,b,c,d);return j(e)}function Qa(a,b,c,d){var e=Oa(a,b,c,d);return k(e)}function Ra(a,b,c,d){if(void 0===a)throw new SyntaxError("password required");if(void 0===b)throw new SyntaxError("salt required");return Na().reset({password:a}).generate(b,c,d).result}function Sa(a,b,c,d){var e=Ra(a,b,c,d);return j(e)}function Ta(a,b,c,d){var e=Ra(a,b,c,d);return k(e)}function Ua(){if(void 0!==Ec)d=new Uint8Array(32),zc.call(Ec,d),Hc(d);else{var a,c,d=new Ub(3);d[0]=Cc(),d[1]=Bc(),d[2]=Fc(),d=new Uint8Array(d.buffer);var e=Na();for(a=0;100>a;a++)d=e.reset({password:d}).generate(b.location.href,1e3,32).result,c=Fc(),d[0]^=c>>>24,d[1]^=c>>>16,d[2]^=c>>>8,d[3]^=c;Hc(d)}Ic=0,Jc=!0}function Va(a){if(!o(a)&&!q(a))throw new TypeError("bad seed type");var b=a.byteOffest||0,c=a.byteLength||a.length,d=new Uint8Array(a.buffer||a,b,c);Hc(d),Ic=0;for(var e=0,f=0;f<d.length;f++)e|=d[f],d[f]=0;return 0!==e&&(Lc+=4*c),Kc=Lc>=Mc}function Wa(a){if(Jc||Ua(),!Kc&&void 0===Ec){if(!Nc)throw new e("No strong PRNGs available. Use asmCrypto.random.seed().");void 0!==Vb&&Vb.error("No strong PRNGs available; your security is greatly lowered. Use asmCrypto.random.seed().")}if(!Oc&&!Kc&&void 0!==Ec&&void 0!==Vb){var b=(new Error).stack;Pc[b]|=0,Pc[b]++||Vb.warn("asmCrypto PRNG not seeded; your security relies on your system PRNG. If this is not acceptable, use asmCrypto.random.seed().")}if(!o(a)&&!q(a))throw new TypeError("unexpected buffer type");var c,d,f=a.byteOffset||0,g=a.byteLength||a.length,h=new Uint8Array(a.buffer||a,f,g);for(void 0!==Ec&&zc.call(Ec,h),c=0;g>c;c++)0===(3&c)&&(Ic>=1099511627776&&Ua(),d=Gc(),Ic++),h[c]^=d,d>>>=8;return a}function Xa(){(!Jc||Ic>=1099511627776)&&Ua();var a=(1048576*Gc()+(Gc()>>>12))/4503599627370496;return Ic+=2,a}function Ya(a,b){return a*b|0}function Za(a,b,c){"use asm";var d=0;var e=new a.Uint32Array(c);var f=a.Math.imul;function g(a){a=a|0;d=a=a+31&-32;return a|0}function h(a){a=a|0;var b=0;b=d;d=b+(a+31&-32)|0;return b|0}function i(a){a=a|0;d=d-(a+31&-32)|0}function j(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;if((b|0)>(c|0)){for(;(d|0)<(a|0);d=d+4|0){e[c+d>>2]=e[b+d>>2]}}else{for(d=a-4|0;(d|0)>=0;d=d-4|0){e[c+d>>2]=e[b+d>>2]}}}function k(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;for(;(d|0)<(a|0);d=d+4|0){e[c+d>>2]=b}}function l(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var f=0,g=0,h=0,i=0,j=0;if((d|0)<=0)d=b;if((d|0)<(b|0))b=d;g=1;for(;(j|0)<(b|0);j=j+4|0){f=~e[a+j>>2];h=(f&65535)+g|0;i=(f>>>16)+(h>>>16)|0;e[c+j>>2]=i<<16|h&65535;g=i>>>16}for(;(j|0)<(d|0);j=j+4|0){e[c+j>>2]=g-1|0}return g|0}function m(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var f=0,g=0,h=0;if((b|0)>(d|0)){for(h=b-4|0;(h|0)>=(d|0);h=h-4|0){if(e[a+h>>2]|0)return 1}}else{for(h=d-4|0;(h|0)>=(b|0);h=h-4|0){if(e[c+h>>2]|0)return-1}}for(;(h|0)>=0;h=h-4|0){f=e[a+h>>2]|0,g=e[c+h>>2]|0;if(f>>>0<g>>>0)return-1;if(f>>>0>g>>>0)return 1}return 0}function n(a,b){a=a|0;b=b|0;var c=0;for(c=b-4|0;(c|0)>=0;c=c-4|0){if(e[a+c>>2]|0)return c+4|0}return 0}function o(a,b,c,d,f,g){a=a|0;b=b|0;c=c|0;d=d|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0;if((b|0)<(d|0)){k=a,a=c,c=k;k=b,b=d,d=k}if((g|0)<=0)g=b+4|0;if((g|0)<(d|0))b=d=g;for(;(m|0)<(d|0);m=m+4|0){h=e[a+m>>2]|0;i=e[c+m>>2]|0;k=((h&65535)+(i&65535)|0)+j|0;l=((h>>>16)+(i>>>16)|0)+(k>>>16)|0;e[f+m>>2]=k&65535|l<<16;j=l>>>16}for(;(m|0)<(b|0);m=m+4|0){h=e[a+m>>2]|0;k=(h&65535)+j|0;l=(h>>>16)+(k>>>16)|0;e[f+m>>2]=k&65535|l<<16;j=l>>>16}for(;(m|0)<(g|0);m=m+4|0){e[f+m>>2]=j|0;j=0}return j|0}function p(a,b,c,d,f,g){a=a|0;b=b|0;c=c|0;d=d|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0;if((g|0)<=0)g=(b|0)>(d|0)?b+4|0:d+4|0;if((g|0)<(b|0))b=g;if((g|0)<(d|0))d=g;if((b|0)<(d|0)){for(;(m|0)<(b|0);m=m+4|0){h=e[a+m>>2]|0;i=e[c+m>>2]|0;k=((h&65535)-(i&65535)|0)+j|0;l=((h>>>16)-(i>>>16)|0)+(k>>16)|0;e[f+m>>2]=k&65535|l<<16;j=l>>16}for(;(m|0)<(d|0);m=m+4|0){i=e[c+m>>2]|0;k=j-(i&65535)|0;l=(k>>16)-(i>>>16)|0;e[f+m>>2]=k&65535|l<<16;j=l>>16}}else{for(;(m|0)<(d|0);m=m+4|0){h=e[a+m>>2]|0;i=e[c+m>>2]|0;k=((h&65535)-(i&65535)|0)+j|0;l=((h>>>16)-(i>>>16)|0)+(k>>16)|0;e[f+m>>2]=k&65535|l<<16;j=l>>16}for(;(m|0)<(b|0);m=m+4|0){h=e[a+m>>2]|0;k=(h&65535)+j|0;l=(h>>>16)+(k>>16)|0;e[f+m>>2]=k&65535|l<<16;j=l>>16}}for(;(m|0)<(g|0);m=m+4|0){e[f+m>>2]=j|0}return j|0}function q(a,b,c,d,g,h){a=a|0;b=b|0;c=c|0;d=d|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,$=0,_=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0;if((b|0)>(d|0)){ca=a,da=b;a=c,b=d;c=ca,d=da}fa=b+d|0;if((h|0)>(fa|0)|(h|0)<=0)h=fa;if((h|0)<(b|0))b=h;if((h|0)<(d|0))d=h;for(;(ga|0)<(b|0);ga=ga+32|0){ha=a+ga|0;q=e[(ha|0)>>2]|0,r=e[(ha|4)>>2]|0,s=e[(ha|8)>>2]|0,t=e[(ha|12)>>2]|0,u=e[(ha|16)>>2]|0,v=e[(ha|20)>>2]|0,w=e[(ha|24)>>2]|0,x=e[(ha|28)>>2]|0,i=q&65535,j=r&65535,k=s&65535,l=t&65535,m=u&65535,n=v&65535,o=w&65535,p=x&65535,q=q>>>16,r=r>>>16,s=s>>>16,t=t>>>16,u=u>>>16,v=v>>>16,w=w>>>16,x=x>>>16;W=X=Y=Z=$=_=aa=ba=0;for(ia=0;(ia|0)<(d|0);ia=ia+32|0){ja=c+ia|0;ka=g+(ga+ia|0)|0;G=e[(ja|0)>>2]|0,H=e[(ja|4)>>2]|0,I=e[(ja|8)>>2]|0,J=e[(ja|12)>>2]|0,K=e[(ja|16)>>2]|0,L=e[(ja|20)>>2]|0,M=e[(ja|24)>>2]|0,N=e[(ja|28)>>2]|0,y=G&65535,z=H&65535,A=I&65535,B=J&65535,C=K&65535,D=L&65535,E=M&65535,F=N&65535,G=G>>>16,H=H>>>16,I=I>>>16,J=J>>>16,K=K>>>16,L=L>>>16,M=M>>>16,N=N>>>16;O=e[(ka|0)>>2]|0,P=e[(ka|4)>>2]|0,Q=e[(ka|8)>>2]|0,R=e[(ka|12)>>2]|0,S=e[(ka|16)>>2]|0,T=e[(ka|20)>>2]|0,U=e[(ka|24)>>2]|0,V=e[(ka|28)>>2]|0;ca=((f(i,y)|0)+(W&65535)|0)+(O&65535)|0;da=((f(q,y)|0)+(W>>>16)|0)+(O>>>16)|0;ea=((f(i,G)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(q,G)|0)+(da>>>16)|0)+(ea>>>16)|0;O=ea<<16|ca&65535;ca=((f(i,z)|0)+(fa&65535)|0)+(P&65535)|0;da=((f(q,z)|0)+(fa>>>16)|0)+(P>>>16)|0;ea=((f(i,H)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(q,H)|0)+(da>>>16)|0)+(ea>>>16)|0;P=ea<<16|ca&65535;ca=((f(i,A)|0)+(fa&65535)|0)+(Q&65535)|0;da=((f(q,A)|0)+(fa>>>16)|0)+(Q>>>16)|0;ea=((f(i,I)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(q,I)|0)+(da>>>16)|0)+(ea>>>16)|0;Q=ea<<16|ca&65535;ca=((f(i,B)|0)+(fa&65535)|0)+(R&65535)|0;da=((f(q,B)|0)+(fa>>>16)|0)+(R>>>16)|0;ea=((f(i,J)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(q,J)|0)+(da>>>16)|0)+(ea>>>16)|0;R=ea<<16|ca&65535;ca=((f(i,C)|0)+(fa&65535)|0)+(S&65535)|0;da=((f(q,C)|0)+(fa>>>16)|0)+(S>>>16)|0;ea=((f(i,K)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(q,K)|0)+(da>>>16)|0)+(ea>>>16)|0;S=ea<<16|ca&65535;ca=((f(i,D)|0)+(fa&65535)|0)+(T&65535)|0;da=((f(q,D)|0)+(fa>>>16)|0)+(T>>>16)|0;ea=((f(i,L)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(q,L)|0)+(da>>>16)|0)+(ea>>>16)|0;T=ea<<16|ca&65535;ca=((f(i,E)|0)+(fa&65535)|0)+(U&65535)|0;da=((f(q,E)|0)+(fa>>>16)|0)+(U>>>16)|0;ea=((f(i,M)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(q,M)|0)+(da>>>16)|0)+(ea>>>16)|0;U=ea<<16|ca&65535;ca=((f(i,F)|0)+(fa&65535)|0)+(V&65535)|0;da=((f(q,F)|0)+(fa>>>16)|0)+(V>>>16)|0;ea=((f(i,N)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(q,N)|0)+(da>>>16)|0)+(ea>>>16)|0;V=ea<<16|ca&65535;W=fa;ca=((f(j,y)|0)+(X&65535)|0)+(P&65535)|0;da=((f(r,y)|0)+(X>>>16)|0)+(P>>>16)|0;ea=((f(j,G)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(r,G)|0)+(da>>>16)|0)+(ea>>>16)|0;P=ea<<16|ca&65535;ca=((f(j,z)|0)+(fa&65535)|0)+(Q&65535)|0;da=((f(r,z)|0)+(fa>>>16)|0)+(Q>>>16)|0;ea=((f(j,H)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(r,H)|0)+(da>>>16)|0)+(ea>>>16)|0;Q=ea<<16|ca&65535;ca=((f(j,A)|0)+(fa&65535)|0)+(R&65535)|0;da=((f(r,A)|0)+(fa>>>16)|0)+(R>>>16)|0;ea=((f(j,I)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(r,I)|0)+(da>>>16)|0)+(ea>>>16)|0;R=ea<<16|ca&65535;ca=((f(j,B)|0)+(fa&65535)|0)+(S&65535)|0;da=((f(r,B)|0)+(fa>>>16)|0)+(S>>>16)|0;ea=((f(j,J)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(r,J)|0)+(da>>>16)|0)+(ea>>>16)|0;S=ea<<16|ca&65535;ca=((f(j,C)|0)+(fa&65535)|0)+(T&65535)|0;da=((f(r,C)|0)+(fa>>>16)|0)+(T>>>16)|0;ea=((f(j,K)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(r,K)|0)+(da>>>16)|0)+(ea>>>16)|0;T=ea<<16|ca&65535;ca=((f(j,D)|0)+(fa&65535)|0)+(U&65535)|0;da=((f(r,D)|0)+(fa>>>16)|0)+(U>>>16)|0;ea=((f(j,L)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(r,L)|0)+(da>>>16)|0)+(ea>>>16)|0;U=ea<<16|ca&65535;ca=((f(j,E)|0)+(fa&65535)|0)+(V&65535)|0;da=((f(r,E)|0)+(fa>>>16)|0)+(V>>>16)|0;ea=((f(j,M)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(r,M)|0)+(da>>>16)|0)+(ea>>>16)|0;V=ea<<16|ca&65535;ca=((f(j,F)|0)+(fa&65535)|0)+(W&65535)|0;da=((f(r,F)|0)+(fa>>>16)|0)+(W>>>16)|0;ea=((f(j,N)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(r,N)|0)+(da>>>16)|0)+(ea>>>16)|0;W=ea<<16|ca&65535;X=fa;ca=((f(k,y)|0)+(Y&65535)|0)+(Q&65535)|0;da=((f(s,y)|0)+(Y>>>16)|0)+(Q>>>16)|0;ea=((f(k,G)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(s,G)|0)+(da>>>16)|0)+(ea>>>16)|0;Q=ea<<16|ca&65535;ca=((f(k,z)|0)+(fa&65535)|0)+(R&65535)|0;da=((f(s,z)|0)+(fa>>>16)|0)+(R>>>16)|0;ea=((f(k,H)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(s,H)|0)+(da>>>16)|0)+(ea>>>16)|0;R=ea<<16|ca&65535;ca=((f(k,A)|0)+(fa&65535)|0)+(S&65535)|0;da=((f(s,A)|0)+(fa>>>16)|0)+(S>>>16)|0;ea=((f(k,I)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(s,I)|0)+(da>>>16)|0)+(ea>>>16)|0;S=ea<<16|ca&65535;ca=((f(k,B)|0)+(fa&65535)|0)+(T&65535)|0;da=((f(s,B)|0)+(fa>>>16)|0)+(T>>>16)|0;ea=((f(k,J)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(s,J)|0)+(da>>>16)|0)+(ea>>>16)|0;T=ea<<16|ca&65535;ca=((f(k,C)|0)+(fa&65535)|0)+(U&65535)|0;da=((f(s,C)|0)+(fa>>>16)|0)+(U>>>16)|0;ea=((f(k,K)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(s,K)|0)+(da>>>16)|0)+(ea>>>16)|0;U=ea<<16|ca&65535;ca=((f(k,D)|0)+(fa&65535)|0)+(V&65535)|0;da=((f(s,D)|0)+(fa>>>16)|0)+(V>>>16)|0;ea=((f(k,L)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(s,L)|0)+(da>>>16)|0)+(ea>>>16)|0;V=ea<<16|ca&65535;ca=((f(k,E)|0)+(fa&65535)|0)+(W&65535)|0;da=((f(s,E)|0)+(fa>>>16)|0)+(W>>>16)|0;ea=((f(k,M)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(s,M)|0)+(da>>>16)|0)+(ea>>>16)|0;W=ea<<16|ca&65535;ca=((f(k,F)|0)+(fa&65535)|0)+(X&65535)|0;da=((f(s,F)|0)+(fa>>>16)|0)+(X>>>16)|0;ea=((f(k,N)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(s,N)|0)+(da>>>16)|0)+(ea>>>16)|0;X=ea<<16|ca&65535;Y=fa;ca=((f(l,y)|0)+(Z&65535)|0)+(R&65535)|0;da=((f(t,y)|0)+(Z>>>16)|0)+(R>>>16)|0;ea=((f(l,G)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(t,G)|0)+(da>>>16)|0)+(ea>>>16)|0;R=ea<<16|ca&65535;ca=((f(l,z)|0)+(fa&65535)|0)+(S&65535)|0;da=((f(t,z)|0)+(fa>>>16)|0)+(S>>>16)|0;ea=((f(l,H)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(t,H)|0)+(da>>>16)|0)+(ea>>>16)|0;S=ea<<16|ca&65535;ca=((f(l,A)|0)+(fa&65535)|0)+(T&65535)|0;da=((f(t,A)|0)+(fa>>>16)|0)+(T>>>16)|0;ea=((f(l,I)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(t,I)|0)+(da>>>16)|0)+(ea>>>16)|0;T=ea<<16|ca&65535;ca=((f(l,B)|0)+(fa&65535)|0)+(U&65535)|0;da=((f(t,B)|0)+(fa>>>16)|0)+(U>>>16)|0;ea=((f(l,J)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(t,J)|0)+(da>>>16)|0)+(ea>>>16)|0;U=ea<<16|ca&65535;ca=((f(l,C)|0)+(fa&65535)|0)+(V&65535)|0;da=((f(t,C)|0)+(fa>>>16)|0)+(V>>>16)|0;ea=((f(l,K)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(t,K)|0)+(da>>>16)|0)+(ea>>>16)|0;V=ea<<16|ca&65535;ca=((f(l,D)|0)+(fa&65535)|0)+(W&65535)|0;da=((f(t,D)|0)+(fa>>>16)|0)+(W>>>16)|0;ea=((f(l,L)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(t,L)|0)+(da>>>16)|0)+(ea>>>16)|0;W=ea<<16|ca&65535;ca=((f(l,E)|0)+(fa&65535)|0)+(X&65535)|0;da=((f(t,E)|0)+(fa>>>16)|0)+(X>>>16)|0;ea=((f(l,M)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(t,M)|0)+(da>>>16)|0)+(ea>>>16)|0;X=ea<<16|ca&65535;ca=((f(l,F)|0)+(fa&65535)|0)+(Y&65535)|0;da=((f(t,F)|0)+(fa>>>16)|0)+(Y>>>16)|0;ea=((f(l,N)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(t,N)|0)+(da>>>16)|0)+(ea>>>16)|0;Y=ea<<16|ca&65535;Z=fa;ca=((f(m,y)|0)+($&65535)|0)+(S&65535)|0;da=((f(u,y)|0)+($>>>16)|0)+(S>>>16)|0;ea=((f(m,G)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(u,G)|0)+(da>>>16)|0)+(ea>>>16)|0;S=ea<<16|ca&65535;ca=((f(m,z)|0)+(fa&65535)|0)+(T&65535)|0;da=((f(u,z)|0)+(fa>>>16)|0)+(T>>>16)|0;ea=((f(m,H)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(u,H)|0)+(da>>>16)|0)+(ea>>>16)|0;T=ea<<16|ca&65535;ca=((f(m,A)|0)+(fa&65535)|0)+(U&65535)|0;da=((f(u,A)|0)+(fa>>>16)|0)+(U>>>16)|0;ea=((f(m,I)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(u,I)|0)+(da>>>16)|0)+(ea>>>16)|0;U=ea<<16|ca&65535;ca=((f(m,B)|0)+(fa&65535)|0)+(V&65535)|0;da=((f(u,B)|0)+(fa>>>16)|0)+(V>>>16)|0;ea=((f(m,J)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(u,J)|0)+(da>>>16)|0)+(ea>>>16)|0;V=ea<<16|ca&65535;ca=((f(m,C)|0)+(fa&65535)|0)+(W&65535)|0;da=((f(u,C)|0)+(fa>>>16)|0)+(W>>>16)|0;
	ea=((f(m,K)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(u,K)|0)+(da>>>16)|0)+(ea>>>16)|0;W=ea<<16|ca&65535;ca=((f(m,D)|0)+(fa&65535)|0)+(X&65535)|0;da=((f(u,D)|0)+(fa>>>16)|0)+(X>>>16)|0;ea=((f(m,L)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(u,L)|0)+(da>>>16)|0)+(ea>>>16)|0;X=ea<<16|ca&65535;ca=((f(m,E)|0)+(fa&65535)|0)+(Y&65535)|0;da=((f(u,E)|0)+(fa>>>16)|0)+(Y>>>16)|0;ea=((f(m,M)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(u,M)|0)+(da>>>16)|0)+(ea>>>16)|0;Y=ea<<16|ca&65535;ca=((f(m,F)|0)+(fa&65535)|0)+(Z&65535)|0;da=((f(u,F)|0)+(fa>>>16)|0)+(Z>>>16)|0;ea=((f(m,N)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(u,N)|0)+(da>>>16)|0)+(ea>>>16)|0;Z=ea<<16|ca&65535;$=fa;ca=((f(n,y)|0)+(_&65535)|0)+(T&65535)|0;da=((f(v,y)|0)+(_>>>16)|0)+(T>>>16)|0;ea=((f(n,G)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(v,G)|0)+(da>>>16)|0)+(ea>>>16)|0;T=ea<<16|ca&65535;ca=((f(n,z)|0)+(fa&65535)|0)+(U&65535)|0;da=((f(v,z)|0)+(fa>>>16)|0)+(U>>>16)|0;ea=((f(n,H)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(v,H)|0)+(da>>>16)|0)+(ea>>>16)|0;U=ea<<16|ca&65535;ca=((f(n,A)|0)+(fa&65535)|0)+(V&65535)|0;da=((f(v,A)|0)+(fa>>>16)|0)+(V>>>16)|0;ea=((f(n,I)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(v,I)|0)+(da>>>16)|0)+(ea>>>16)|0;V=ea<<16|ca&65535;ca=((f(n,B)|0)+(fa&65535)|0)+(W&65535)|0;da=((f(v,B)|0)+(fa>>>16)|0)+(W>>>16)|0;ea=((f(n,J)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(v,J)|0)+(da>>>16)|0)+(ea>>>16)|0;W=ea<<16|ca&65535;ca=((f(n,C)|0)+(fa&65535)|0)+(X&65535)|0;da=((f(v,C)|0)+(fa>>>16)|0)+(X>>>16)|0;ea=((f(n,K)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(v,K)|0)+(da>>>16)|0)+(ea>>>16)|0;X=ea<<16|ca&65535;ca=((f(n,D)|0)+(fa&65535)|0)+(Y&65535)|0;da=((f(v,D)|0)+(fa>>>16)|0)+(Y>>>16)|0;ea=((f(n,L)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(v,L)|0)+(da>>>16)|0)+(ea>>>16)|0;Y=ea<<16|ca&65535;ca=((f(n,E)|0)+(fa&65535)|0)+(Z&65535)|0;da=((f(v,E)|0)+(fa>>>16)|0)+(Z>>>16)|0;ea=((f(n,M)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(v,M)|0)+(da>>>16)|0)+(ea>>>16)|0;Z=ea<<16|ca&65535;ca=((f(n,F)|0)+(fa&65535)|0)+($&65535)|0;da=((f(v,F)|0)+(fa>>>16)|0)+($>>>16)|0;ea=((f(n,N)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(v,N)|0)+(da>>>16)|0)+(ea>>>16)|0;$=ea<<16|ca&65535;_=fa;ca=((f(o,y)|0)+(aa&65535)|0)+(U&65535)|0;da=((f(w,y)|0)+(aa>>>16)|0)+(U>>>16)|0;ea=((f(o,G)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(w,G)|0)+(da>>>16)|0)+(ea>>>16)|0;U=ea<<16|ca&65535;ca=((f(o,z)|0)+(fa&65535)|0)+(V&65535)|0;da=((f(w,z)|0)+(fa>>>16)|0)+(V>>>16)|0;ea=((f(o,H)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(w,H)|0)+(da>>>16)|0)+(ea>>>16)|0;V=ea<<16|ca&65535;ca=((f(o,A)|0)+(fa&65535)|0)+(W&65535)|0;da=((f(w,A)|0)+(fa>>>16)|0)+(W>>>16)|0;ea=((f(o,I)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(w,I)|0)+(da>>>16)|0)+(ea>>>16)|0;W=ea<<16|ca&65535;ca=((f(o,B)|0)+(fa&65535)|0)+(X&65535)|0;da=((f(w,B)|0)+(fa>>>16)|0)+(X>>>16)|0;ea=((f(o,J)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(w,J)|0)+(da>>>16)|0)+(ea>>>16)|0;X=ea<<16|ca&65535;ca=((f(o,C)|0)+(fa&65535)|0)+(Y&65535)|0;da=((f(w,C)|0)+(fa>>>16)|0)+(Y>>>16)|0;ea=((f(o,K)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(w,K)|0)+(da>>>16)|0)+(ea>>>16)|0;Y=ea<<16|ca&65535;ca=((f(o,D)|0)+(fa&65535)|0)+(Z&65535)|0;da=((f(w,D)|0)+(fa>>>16)|0)+(Z>>>16)|0;ea=((f(o,L)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(w,L)|0)+(da>>>16)|0)+(ea>>>16)|0;Z=ea<<16|ca&65535;ca=((f(o,E)|0)+(fa&65535)|0)+($&65535)|0;da=((f(w,E)|0)+(fa>>>16)|0)+($>>>16)|0;ea=((f(o,M)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(w,M)|0)+(da>>>16)|0)+(ea>>>16)|0;$=ea<<16|ca&65535;ca=((f(o,F)|0)+(fa&65535)|0)+(_&65535)|0;da=((f(w,F)|0)+(fa>>>16)|0)+(_>>>16)|0;ea=((f(o,N)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(w,N)|0)+(da>>>16)|0)+(ea>>>16)|0;_=ea<<16|ca&65535;aa=fa;ca=((f(p,y)|0)+(ba&65535)|0)+(V&65535)|0;da=((f(x,y)|0)+(ba>>>16)|0)+(V>>>16)|0;ea=((f(p,G)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(x,G)|0)+(da>>>16)|0)+(ea>>>16)|0;V=ea<<16|ca&65535;ca=((f(p,z)|0)+(fa&65535)|0)+(W&65535)|0;da=((f(x,z)|0)+(fa>>>16)|0)+(W>>>16)|0;ea=((f(p,H)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(x,H)|0)+(da>>>16)|0)+(ea>>>16)|0;W=ea<<16|ca&65535;ca=((f(p,A)|0)+(fa&65535)|0)+(X&65535)|0;da=((f(x,A)|0)+(fa>>>16)|0)+(X>>>16)|0;ea=((f(p,I)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(x,I)|0)+(da>>>16)|0)+(ea>>>16)|0;X=ea<<16|ca&65535;ca=((f(p,B)|0)+(fa&65535)|0)+(Y&65535)|0;da=((f(x,B)|0)+(fa>>>16)|0)+(Y>>>16)|0;ea=((f(p,J)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(x,J)|0)+(da>>>16)|0)+(ea>>>16)|0;Y=ea<<16|ca&65535;ca=((f(p,C)|0)+(fa&65535)|0)+(Z&65535)|0;da=((f(x,C)|0)+(fa>>>16)|0)+(Z>>>16)|0;ea=((f(p,K)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(x,K)|0)+(da>>>16)|0)+(ea>>>16)|0;Z=ea<<16|ca&65535;ca=((f(p,D)|0)+(fa&65535)|0)+($&65535)|0;da=((f(x,D)|0)+(fa>>>16)|0)+($>>>16)|0;ea=((f(p,L)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(x,L)|0)+(da>>>16)|0)+(ea>>>16)|0;$=ea<<16|ca&65535;ca=((f(p,E)|0)+(fa&65535)|0)+(_&65535)|0;da=((f(x,E)|0)+(fa>>>16)|0)+(_>>>16)|0;ea=((f(p,M)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(x,M)|0)+(da>>>16)|0)+(ea>>>16)|0;_=ea<<16|ca&65535;ca=((f(p,F)|0)+(fa&65535)|0)+(aa&65535)|0;da=((f(x,F)|0)+(fa>>>16)|0)+(aa>>>16)|0;ea=((f(p,N)|0)+(da&65535)|0)+(ca>>>16)|0;fa=((f(x,N)|0)+(da>>>16)|0)+(ea>>>16)|0;aa=ea<<16|ca&65535;ba=fa;e[(ka|0)>>2]=O,e[(ka|4)>>2]=P,e[(ka|8)>>2]=Q,e[(ka|12)>>2]=R,e[(ka|16)>>2]=S,e[(ka|20)>>2]=T,e[(ka|24)>>2]=U,e[(ka|28)>>2]=V}ka=g+(ga+ia|0)|0;e[(ka|0)>>2]=W,e[(ka|4)>>2]=X,e[(ka|8)>>2]=Y,e[(ka|12)>>2]=Z,e[(ka|16)>>2]=$,e[(ka|20)>>2]=_,e[(ka|24)>>2]=aa,e[(ka|28)>>2]=ba}}function r(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,$=0,_=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0;for(;(ja|0)<(b|0);ja=ja+4|0){oa=c+(ja<<1)|0;n=e[a+ja>>2]|0,d=n&65535,n=n>>>16;_=f(d,d)|0;aa=(f(d,n)|0)+(_>>>17)|0;ba=(f(n,n)|0)+(aa>>>15)|0;e[oa>>2]=aa<<17|_&131071;e[(oa|4)>>2]=ba}for(ia=0;(ia|0)<(b|0);ia=ia+8|0){ma=a+ia|0,oa=c+(ia<<1)|0;n=e[ma>>2]|0,d=n&65535,n=n>>>16;D=e[(ma|4)>>2]|0,v=D&65535,D=D>>>16;_=f(d,v)|0;aa=(f(d,D)|0)+(_>>>16)|0;ba=(f(n,v)|0)+(aa&65535)|0;ea=((f(n,D)|0)+(aa>>>16)|0)+(ba>>>16)|0;fa=e[(oa|4)>>2]|0;_=(fa&65535)+((_&65535)<<1)|0;ba=((fa>>>16)+((ba&65535)<<1)|0)+(_>>>16)|0;e[(oa|4)>>2]=ba<<16|_&65535;ca=ba>>>16;fa=e[(oa|8)>>2]|0;_=((fa&65535)+((ea&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(ea>>>16<<1)|0)+(_>>>16)|0;e[(oa|8)>>2]=ba<<16|_&65535;ca=ba>>>16;if(ca){fa=e[(oa|12)>>2]|0;_=(fa&65535)+ca|0;ba=(fa>>>16)+(_>>>16)|0;e[(oa|12)>>2]=ba<<16|_&65535}}for(ia=0;(ia|0)<(b|0);ia=ia+16|0){ma=a+ia|0,oa=c+(ia<<1)|0;n=e[ma>>2]|0,d=n&65535,n=n>>>16,o=e[(ma|4)>>2]|0,g=o&65535,o=o>>>16;D=e[(ma|8)>>2]|0,v=D&65535,D=D>>>16,E=e[(ma|12)>>2]|0,w=E&65535,E=E>>>16;_=f(d,v)|0;aa=f(n,v)|0;ba=((f(d,D)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(n,D)|0)+(aa>>>16)|0)+(ba>>>16)|0;L=ba<<16|_&65535;_=(f(d,w)|0)+(ea&65535)|0;aa=(f(n,w)|0)+(ea>>>16)|0;ba=((f(d,E)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(n,E)|0)+(aa>>>16)|0)+(ba>>>16)|0;M=ba<<16|_&65535;N=ea;_=(f(g,v)|0)+(M&65535)|0;aa=(f(o,v)|0)+(M>>>16)|0;ba=((f(g,D)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(o,D)|0)+(aa>>>16)|0)+(ba>>>16)|0;M=ba<<16|_&65535;_=((f(g,w)|0)+(N&65535)|0)+(ea&65535)|0;aa=((f(o,w)|0)+(N>>>16)|0)+(ea>>>16)|0;ba=((f(g,E)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(o,E)|0)+(aa>>>16)|0)+(ba>>>16)|0;N=ba<<16|_&65535;O=ea;fa=e[(oa|8)>>2]|0;_=(fa&65535)+((L&65535)<<1)|0;ba=((fa>>>16)+(L>>>16<<1)|0)+(_>>>16)|0;e[(oa|8)>>2]=ba<<16|_&65535;ca=ba>>>16;fa=e[(oa|12)>>2]|0;_=((fa&65535)+((M&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(M>>>16<<1)|0)+(_>>>16)|0;e[(oa|12)>>2]=ba<<16|_&65535;ca=ba>>>16;fa=e[(oa|16)>>2]|0;_=((fa&65535)+((N&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(N>>>16<<1)|0)+(_>>>16)|0;e[(oa|16)>>2]=ba<<16|_&65535;ca=ba>>>16;fa=e[(oa|20)>>2]|0;_=((fa&65535)+((O&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(O>>>16<<1)|0)+(_>>>16)|0;e[(oa|20)>>2]=ba<<16|_&65535;ca=ba>>>16;for(la=24;!!ca&(la|0)<32;la=la+4|0){fa=e[(oa|la)>>2]|0;_=(fa&65535)+ca|0;ba=(fa>>>16)+(_>>>16)|0;e[(oa|la)>>2]=ba<<16|_&65535;ca=ba>>>16}}for(ia=0;(ia|0)<(b|0);ia=ia+32|0){ma=a+ia|0,oa=c+(ia<<1)|0;n=e[ma>>2]|0,d=n&65535,n=n>>>16,o=e[(ma|4)>>2]|0,g=o&65535,o=o>>>16,p=e[(ma|8)>>2]|0,h=p&65535,p=p>>>16,q=e[(ma|12)>>2]|0,i=q&65535,q=q>>>16;D=e[(ma|16)>>2]|0,v=D&65535,D=D>>>16,E=e[(ma|20)>>2]|0,w=E&65535,E=E>>>16,F=e[(ma|24)>>2]|0,x=F&65535,F=F>>>16,G=e[(ma|28)>>2]|0,y=G&65535,G=G>>>16;_=f(d,v)|0;aa=f(n,v)|0;ba=((f(d,D)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(n,D)|0)+(aa>>>16)|0)+(ba>>>16)|0;L=ba<<16|_&65535;_=(f(d,w)|0)+(ea&65535)|0;aa=(f(n,w)|0)+(ea>>>16)|0;ba=((f(d,E)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(n,E)|0)+(aa>>>16)|0)+(ba>>>16)|0;M=ba<<16|_&65535;_=(f(d,x)|0)+(ea&65535)|0;aa=(f(n,x)|0)+(ea>>>16)|0;ba=((f(d,F)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(n,F)|0)+(aa>>>16)|0)+(ba>>>16)|0;N=ba<<16|_&65535;_=(f(d,y)|0)+(ea&65535)|0;aa=(f(n,y)|0)+(ea>>>16)|0;ba=((f(d,G)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(n,G)|0)+(aa>>>16)|0)+(ba>>>16)|0;O=ba<<16|_&65535;P=ea;_=(f(g,v)|0)+(M&65535)|0;aa=(f(o,v)|0)+(M>>>16)|0;ba=((f(g,D)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(o,D)|0)+(aa>>>16)|0)+(ba>>>16)|0;M=ba<<16|_&65535;_=((f(g,w)|0)+(N&65535)|0)+(ea&65535)|0;aa=((f(o,w)|0)+(N>>>16)|0)+(ea>>>16)|0;ba=((f(g,E)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(o,E)|0)+(aa>>>16)|0)+(ba>>>16)|0;N=ba<<16|_&65535;_=((f(g,x)|0)+(O&65535)|0)+(ea&65535)|0;aa=((f(o,x)|0)+(O>>>16)|0)+(ea>>>16)|0;ba=((f(g,F)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(o,F)|0)+(aa>>>16)|0)+(ba>>>16)|0;O=ba<<16|_&65535;_=((f(g,y)|0)+(P&65535)|0)+(ea&65535)|0;aa=((f(o,y)|0)+(P>>>16)|0)+(ea>>>16)|0;ba=((f(g,G)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(o,G)|0)+(aa>>>16)|0)+(ba>>>16)|0;P=ba<<16|_&65535;Q=ea;_=(f(h,v)|0)+(N&65535)|0;aa=(f(p,v)|0)+(N>>>16)|0;ba=((f(h,D)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(p,D)|0)+(aa>>>16)|0)+(ba>>>16)|0;N=ba<<16|_&65535;_=((f(h,w)|0)+(O&65535)|0)+(ea&65535)|0;aa=((f(p,w)|0)+(O>>>16)|0)+(ea>>>16)|0;ba=((f(h,E)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(p,E)|0)+(aa>>>16)|0)+(ba>>>16)|0;O=ba<<16|_&65535;_=((f(h,x)|0)+(P&65535)|0)+(ea&65535)|0;aa=((f(p,x)|0)+(P>>>16)|0)+(ea>>>16)|0;ba=((f(h,F)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(p,F)|0)+(aa>>>16)|0)+(ba>>>16)|0;P=ba<<16|_&65535;_=((f(h,y)|0)+(Q&65535)|0)+(ea&65535)|0;aa=((f(p,y)|0)+(Q>>>16)|0)+(ea>>>16)|0;ba=((f(h,G)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(p,G)|0)+(aa>>>16)|0)+(ba>>>16)|0;Q=ba<<16|_&65535;R=ea;_=(f(i,v)|0)+(O&65535)|0;aa=(f(q,v)|0)+(O>>>16)|0;ba=((f(i,D)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(q,D)|0)+(aa>>>16)|0)+(ba>>>16)|0;O=ba<<16|_&65535;_=((f(i,w)|0)+(P&65535)|0)+(ea&65535)|0;aa=((f(q,w)|0)+(P>>>16)|0)+(ea>>>16)|0;ba=((f(i,E)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(q,E)|0)+(aa>>>16)|0)+(ba>>>16)|0;P=ba<<16|_&65535;_=((f(i,x)|0)+(Q&65535)|0)+(ea&65535)|0;aa=((f(q,x)|0)+(Q>>>16)|0)+(ea>>>16)|0;ba=((f(i,F)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(q,F)|0)+(aa>>>16)|0)+(ba>>>16)|0;Q=ba<<16|_&65535;_=((f(i,y)|0)+(R&65535)|0)+(ea&65535)|0;aa=((f(q,y)|0)+(R>>>16)|0)+(ea>>>16)|0;ba=((f(i,G)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(q,G)|0)+(aa>>>16)|0)+(ba>>>16)|0;R=ba<<16|_&65535;S=ea;fa=e[(oa|16)>>2]|0;_=(fa&65535)+((L&65535)<<1)|0;ba=((fa>>>16)+(L>>>16<<1)|0)+(_>>>16)|0;e[(oa|16)>>2]=ba<<16|_&65535;ca=ba>>>16;fa=e[(oa|20)>>2]|0;_=((fa&65535)+((M&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(M>>>16<<1)|0)+(_>>>16)|0;e[(oa|20)>>2]=ba<<16|_&65535;ca=ba>>>16;fa=e[(oa|24)>>2]|0;_=((fa&65535)+((N&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(N>>>16<<1)|0)+(_>>>16)|0;e[(oa|24)>>2]=ba<<16|_&65535;ca=ba>>>16;fa=e[(oa|28)>>2]|0;_=((fa&65535)+((O&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(O>>>16<<1)|0)+(_>>>16)|0;e[(oa|28)>>2]=ba<<16|_&65535;ca=ba>>>16;fa=e[oa+32>>2]|0;_=((fa&65535)+((P&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(P>>>16<<1)|0)+(_>>>16)|0;e[oa+32>>2]=ba<<16|_&65535;ca=ba>>>16;fa=e[oa+36>>2]|0;_=((fa&65535)+((Q&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(Q>>>16<<1)|0)+(_>>>16)|0;e[oa+36>>2]=ba<<16|_&65535;ca=ba>>>16;fa=e[oa+40>>2]|0;_=((fa&65535)+((R&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(R>>>16<<1)|0)+(_>>>16)|0;e[oa+40>>2]=ba<<16|_&65535;ca=ba>>>16;fa=e[oa+44>>2]|0;_=((fa&65535)+((S&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(S>>>16<<1)|0)+(_>>>16)|0;e[oa+44>>2]=ba<<16|_&65535;ca=ba>>>16;for(la=48;!!ca&(la|0)<64;la=la+4|0){fa=e[oa+la>>2]|0;_=(fa&65535)+ca|0;ba=(fa>>>16)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;ca=ba>>>16}}for(ga=32;(ga|0)<(b|0);ga=ga<<1){ha=ga<<1;for(ia=0;(ia|0)<(b|0);ia=ia+ha|0){oa=c+(ia<<1)|0;da=0;for(ja=0;(ja|0)<(ga|0);ja=ja+32|0){ma=(a+ia|0)+ja|0;n=e[ma>>2]|0,d=n&65535,n=n>>>16,o=e[(ma|4)>>2]|0,g=o&65535,o=o>>>16,p=e[(ma|8)>>2]|0,h=p&65535,p=p>>>16,q=e[(ma|12)>>2]|0,i=q&65535,q=q>>>16,r=e[(ma|16)>>2]|0,j=r&65535,r=r>>>16,s=e[(ma|20)>>2]|0,k=s&65535,s=s>>>16,t=e[(ma|24)>>2]|0,l=t&65535,t=t>>>16,u=e[(ma|28)>>2]|0,m=u&65535,u=u>>>16;T=U=V=W=X=Y=Z=$=ca=0;for(ka=0;(ka|0)<(ga|0);ka=ka+32|0){na=((a+ia|0)+ga|0)+ka|0;D=e[na>>2]|0,v=D&65535,D=D>>>16,E=e[(na|4)>>2]|0,w=E&65535,E=E>>>16,F=e[(na|8)>>2]|0,x=F&65535,F=F>>>16,G=e[(na|12)>>2]|0,y=G&65535,G=G>>>16,H=e[(na|16)>>2]|0,z=H&65535,H=H>>>16,I=e[(na|20)>>2]|0,A=I&65535,I=I>>>16,J=e[(na|24)>>2]|0,B=J&65535,J=J>>>16,K=e[(na|28)>>2]|0,C=K&65535,K=K>>>16;L=M=N=O=P=Q=R=S=0;_=((f(d,v)|0)+(L&65535)|0)+(T&65535)|0;aa=((f(n,v)|0)+(L>>>16)|0)+(T>>>16)|0;ba=((f(d,D)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(n,D)|0)+(aa>>>16)|0)+(ba>>>16)|0;L=ba<<16|_&65535;_=((f(d,w)|0)+(M&65535)|0)+(ea&65535)|0;aa=((f(n,w)|0)+(M>>>16)|0)+(ea>>>16)|0;ba=((f(d,E)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(n,E)|0)+(aa>>>16)|0)+(ba>>>16)|0;M=ba<<16|_&65535;_=((f(d,x)|0)+(N&65535)|0)+(ea&65535)|0;aa=((f(n,x)|0)+(N>>>16)|0)+(ea>>>16)|0;ba=((f(d,F)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(n,F)|0)+(aa>>>16)|0)+(ba>>>16)|0;N=ba<<16|_&65535;_=((f(d,y)|0)+(O&65535)|0)+(ea&65535)|0;aa=((f(n,y)|0)+(O>>>16)|0)+(ea>>>16)|0;ba=((f(d,G)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(n,G)|0)+(aa>>>16)|0)+(ba>>>16)|0;O=ba<<16|_&65535;_=((f(d,z)|0)+(P&65535)|0)+(ea&65535)|0;aa=((f(n,z)|0)+(P>>>16)|0)+(ea>>>16)|0;ba=((f(d,H)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(n,H)|0)+(aa>>>16)|0)+(ba>>>16)|0;P=ba<<16|_&65535;_=((f(d,A)|0)+(Q&65535)|0)+(ea&65535)|0;aa=((f(n,A)|0)+(Q>>>16)|0)+(ea>>>16)|0;ba=((f(d,I)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(n,I)|0)+(aa>>>16)|0)+(ba>>>16)|0;Q=ba<<16|_&65535;_=((f(d,B)|0)+(R&65535)|0)+(ea&65535)|0;aa=((f(n,B)|0)+(R>>>16)|0)+(ea>>>16)|0;ba=((f(d,J)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(n,J)|0)+(aa>>>16)|0)+(ba>>>16)|0;R=ba<<16|_&65535;_=((f(d,C)|0)+(S&65535)|0)+(ea&65535)|0;aa=((f(n,C)|0)+(S>>>16)|0)+(ea>>>16)|0;ba=((f(d,K)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(n,K)|0)+(aa>>>16)|0)+(ba>>>16)|0;S=ba<<16|_&65535;T=ea;_=((f(g,v)|0)+(M&65535)|0)+(U&65535)|0;aa=((f(o,v)|0)+(M>>>16)|0)+(U>>>16)|0;ba=((f(g,D)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(o,D)|0)+(aa>>>16)|0)+(ba>>>16)|0;M=ba<<16|_&65535;_=((f(g,w)|0)+(N&65535)|0)+(ea&65535)|0;aa=((f(o,w)|0)+(N>>>16)|0)+(ea>>>16)|0;ba=((f(g,E)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(o,E)|0)+(aa>>>16)|0)+(ba>>>16)|0;N=ba<<16|_&65535;_=((f(g,x)|0)+(O&65535)|0)+(ea&65535)|0;aa=((f(o,x)|0)+(O>>>16)|0)+(ea>>>16)|0;ba=((f(g,F)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(o,F)|0)+(aa>>>16)|0)+(ba>>>16)|0;O=ba<<16|_&65535;_=((f(g,y)|0)+(P&65535)|0)+(ea&65535)|0;aa=((f(o,y)|0)+(P>>>16)|0)+(ea>>>16)|0;ba=((f(g,G)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(o,G)|0)+(aa>>>16)|0)+(ba>>>16)|0;P=ba<<16|_&65535;_=((f(g,z)|0)+(Q&65535)|0)+(ea&65535)|0;aa=((f(o,z)|0)+(Q>>>16)|0)+(ea>>>16)|0;ba=((f(g,H)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(o,H)|0)+(aa>>>16)|0)+(ba>>>16)|0;Q=ba<<16|_&65535;_=((f(g,A)|0)+(R&65535)|0)+(ea&65535)|0;aa=((f(o,A)|0)+(R>>>16)|0)+(ea>>>16)|0;ba=((f(g,I)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(o,I)|0)+(aa>>>16)|0)+(ba>>>16)|0;R=ba<<16|_&65535;_=((f(g,B)|0)+(S&65535)|0)+(ea&65535)|0;aa=((f(o,B)|0)+(S>>>16)|0)+(ea>>>16)|0;ba=((f(g,J)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(o,J)|0)+(aa>>>16)|0)+(ba>>>16)|0;S=ba<<16|_&65535;_=((f(g,C)|0)+(T&65535)|0)+(ea&65535)|0;aa=((f(o,C)|0)+(T>>>16)|0)+(ea>>>16)|0;ba=((f(g,K)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(o,K)|0)+(aa>>>16)|0)+(ba>>>16)|0;T=ba<<16|_&65535;U=ea;_=((f(h,v)|0)+(N&65535)|0)+(V&65535)|0;aa=((f(p,v)|0)+(N>>>16)|0)+(V>>>16)|0;ba=((f(h,D)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(p,D)|0)+(aa>>>16)|0)+(ba>>>16)|0;N=ba<<16|_&65535;_=((f(h,w)|0)+(O&65535)|0)+(ea&65535)|0;aa=((f(p,w)|0)+(O>>>16)|0)+(ea>>>16)|0;ba=((f(h,E)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(p,E)|0)+(aa>>>16)|0)+(ba>>>16)|0;O=ba<<16|_&65535;_=((f(h,x)|0)+(P&65535)|0)+(ea&65535)|0;aa=((f(p,x)|0)+(P>>>16)|0)+(ea>>>16)|0;ba=((f(h,F)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(p,F)|0)+(aa>>>16)|0)+(ba>>>16)|0;P=ba<<16|_&65535;_=((f(h,y)|0)+(Q&65535)|0)+(ea&65535)|0;aa=((f(p,y)|0)+(Q>>>16)|0)+(ea>>>16)|0;ba=((f(h,G)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(p,G)|0)+(aa>>>16)|0)+(ba>>>16)|0;Q=ba<<16|_&65535;_=((f(h,z)|0)+(R&65535)|0)+(ea&65535)|0;aa=((f(p,z)|0)+(R>>>16)|0)+(ea>>>16)|0;ba=((f(h,H)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(p,H)|0)+(aa>>>16)|0)+(ba>>>16)|0;R=ba<<16|_&65535;_=((f(h,A)|0)+(S&65535)|0)+(ea&65535)|0;aa=((f(p,A)|0)+(S>>>16)|0)+(ea>>>16)|0;ba=((f(h,I)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(p,I)|0)+(aa>>>16)|0)+(ba>>>16)|0;S=ba<<16|_&65535;_=((f(h,B)|0)+(T&65535)|0)+(ea&65535)|0;aa=((f(p,B)|0)+(T>>>16)|0)+(ea>>>16)|0;ba=((f(h,J)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(p,J)|0)+(aa>>>16)|0)+(ba>>>16)|0;T=ba<<16|_&65535;_=((f(h,C)|0)+(U&65535)|0)+(ea&65535)|0;aa=((f(p,C)|0)+(U>>>16)|0)+(ea>>>16)|0;ba=((f(h,K)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(p,K)|0)+(aa>>>16)|0)+(ba>>>16)|0;U=ba<<16|_&65535;V=ea;_=((f(i,v)|0)+(O&65535)|0)+(W&65535)|0;aa=((f(q,v)|0)+(O>>>16)|0)+(W>>>16)|0;ba=((f(i,D)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(q,D)|0)+(aa>>>16)|0)+(ba>>>16)|0;O=ba<<16|_&65535;_=((f(i,w)|0)+(P&65535)|0)+(ea&65535)|0;aa=((f(q,w)|0)+(P>>>16)|0)+(ea>>>16)|0;ba=((f(i,E)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(q,E)|0)+(aa>>>16)|0)+(ba>>>16)|0;P=ba<<16|_&65535;_=((f(i,x)|0)+(Q&65535)|0)+(ea&65535)|0;aa=((f(q,x)|0)+(Q>>>16)|0)+(ea>>>16)|0;ba=((f(i,F)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(q,F)|0)+(aa>>>16)|0)+(ba>>>16)|0;Q=ba<<16|_&65535;_=((f(i,y)|0)+(R&65535)|0)+(ea&65535)|0;aa=((f(q,y)|0)+(R>>>16)|0)+(ea>>>16)|0;ba=((f(i,G)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(q,G)|0)+(aa>>>16)|0)+(ba>>>16)|0;R=ba<<16|_&65535;_=((f(i,z)|0)+(S&65535)|0)+(ea&65535)|0;aa=((f(q,z)|0)+(S>>>16)|0)+(ea>>>16)|0;ba=((f(i,H)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(q,H)|0)+(aa>>>16)|0)+(ba>>>16)|0;S=ba<<16|_&65535;_=((f(i,A)|0)+(T&65535)|0)+(ea&65535)|0;aa=((f(q,A)|0)+(T>>>16)|0)+(ea>>>16)|0;ba=((f(i,I)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(q,I)|0)+(aa>>>16)|0)+(ba>>>16)|0;T=ba<<16|_&65535;_=((f(i,B)|0)+(U&65535)|0)+(ea&65535)|0;aa=((f(q,B)|0)+(U>>>16)|0)+(ea>>>16)|0;ba=((f(i,J)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(q,J)|0)+(aa>>>16)|0)+(ba>>>16)|0;U=ba<<16|_&65535;_=((f(i,C)|0)+(V&65535)|0)+(ea&65535)|0;aa=((f(q,C)|0)+(V>>>16)|0)+(ea>>>16)|0;ba=((f(i,K)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(q,K)|0)+(aa>>>16)|0)+(ba>>>16)|0;V=ba<<16|_&65535;W=ea;_=((f(j,v)|0)+(P&65535)|0)+(X&65535)|0;aa=((f(r,v)|0)+(P>>>16)|0)+(X>>>16)|0;ba=((f(j,D)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(r,D)|0)+(aa>>>16)|0)+(ba>>>16)|0;P=ba<<16|_&65535;_=((f(j,w)|0)+(Q&65535)|0)+(ea&65535)|0;aa=((f(r,w)|0)+(Q>>>16)|0)+(ea>>>16)|0;ba=((f(j,E)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(r,E)|0)+(aa>>>16)|0)+(ba>>>16)|0;Q=ba<<16|_&65535;_=((f(j,x)|0)+(R&65535)|0)+(ea&65535)|0;aa=((f(r,x)|0)+(R>>>16)|0)+(ea>>>16)|0;ba=((f(j,F)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(r,F)|0)+(aa>>>16)|0)+(ba>>>16)|0;R=ba<<16|_&65535;_=((f(j,y)|0)+(S&65535)|0)+(ea&65535)|0;aa=((f(r,y)|0)+(S>>>16)|0)+(ea>>>16)|0;ba=((f(j,G)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(r,G)|0)+(aa>>>16)|0)+(ba>>>16)|0;S=ba<<16|_&65535;_=((f(j,z)|0)+(T&65535)|0)+(ea&65535)|0;aa=((f(r,z)|0)+(T>>>16)|0)+(ea>>>16)|0;ba=((f(j,H)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(r,H)|0)+(aa>>>16)|0)+(ba>>>16)|0;T=ba<<16|_&65535;_=((f(j,A)|0)+(U&65535)|0)+(ea&65535)|0;aa=((f(r,A)|0)+(U>>>16)|0)+(ea>>>16)|0;ba=((f(j,I)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(r,I)|0)+(aa>>>16)|0)+(ba>>>16)|0;U=ba<<16|_&65535;_=((f(j,B)|0)+(V&65535)|0)+(ea&65535)|0;aa=((f(r,B)|0)+(V>>>16)|0)+(ea>>>16)|0;ba=((f(j,J)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(r,J)|0)+(aa>>>16)|0)+(ba>>>16)|0;V=ba<<16|_&65535;_=((f(j,C)|0)+(W&65535)|0)+(ea&65535)|0;aa=((f(r,C)|0)+(W>>>16)|0)+(ea>>>16)|0;ba=((f(j,K)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(r,K)|0)+(aa>>>16)|0)+(ba>>>16)|0;W=ba<<16|_&65535;X=ea;_=((f(k,v)|0)+(Q&65535)|0)+(Y&65535)|0;aa=((f(s,v)|0)+(Q>>>16)|0)+(Y>>>16)|0;ba=((f(k,D)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(s,D)|0)+(aa>>>16)|0)+(ba>>>16)|0;Q=ba<<16|_&65535;_=((f(k,w)|0)+(R&65535)|0)+(ea&65535)|0;aa=((f(s,w)|0)+(R>>>16)|0)+(ea>>>16)|0;ba=((f(k,E)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(s,E)|0)+(aa>>>16)|0)+(ba>>>16)|0;R=ba<<16|_&65535;_=((f(k,x)|0)+(S&65535)|0)+(ea&65535)|0;aa=((f(s,x)|0)+(S>>>16)|0)+(ea>>>16)|0;ba=((f(k,F)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(s,F)|0)+(aa>>>16)|0)+(ba>>>16)|0;S=ba<<16|_&65535;_=((f(k,y)|0)+(T&65535)|0)+(ea&65535)|0;aa=((f(s,y)|0)+(T>>>16)|0)+(ea>>>16)|0;ba=((f(k,G)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(s,G)|0)+(aa>>>16)|0)+(ba>>>16)|0;T=ba<<16|_&65535;_=((f(k,z)|0)+(U&65535)|0)+(ea&65535)|0;aa=((f(s,z)|0)+(U>>>16)|0)+(ea>>>16)|0;ba=((f(k,H)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(s,H)|0)+(aa>>>16)|0)+(ba>>>16)|0;U=ba<<16|_&65535;_=((f(k,A)|0)+(V&65535)|0)+(ea&65535)|0;aa=((f(s,A)|0)+(V>>>16)|0)+(ea>>>16)|0;ba=((f(k,I)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(s,I)|0)+(aa>>>16)|0)+(ba>>>16)|0;V=ba<<16|_&65535;_=((f(k,B)|0)+(W&65535)|0)+(ea&65535)|0;aa=((f(s,B)|0)+(W>>>16)|0)+(ea>>>16)|0;ba=((f(k,J)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(s,J)|0)+(aa>>>16)|0)+(ba>>>16)|0;W=ba<<16|_&65535;_=((f(k,C)|0)+(X&65535)|0)+(ea&65535)|0;aa=((f(s,C)|0)+(X>>>16)|0)+(ea>>>16)|0;ba=((f(k,K)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(s,K)|0)+(aa>>>16)|0)+(ba>>>16)|0;X=ba<<16|_&65535;Y=ea;_=((f(l,v)|0)+(R&65535)|0)+(Z&65535)|0;aa=((f(t,v)|0)+(R>>>16)|0)+(Z>>>16)|0;ba=((f(l,D)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(t,D)|0)+(aa>>>16)|0)+(ba>>>16)|0;R=ba<<16|_&65535;_=((f(l,w)|0)+(S&65535)|0)+(ea&65535)|0;aa=((f(t,w)|0)+(S>>>16)|0)+(ea>>>16)|0;ba=((f(l,E)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(t,E)|0)+(aa>>>16)|0)+(ba>>>16)|0;S=ba<<16|_&65535;_=((f(l,x)|0)+(T&65535)|0)+(ea&65535)|0;aa=((f(t,x)|0)+(T>>>16)|0)+(ea>>>16)|0;ba=((f(l,F)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(t,F)|0)+(aa>>>16)|0)+(ba>>>16)|0;T=ba<<16|_&65535;_=((f(l,y)|0)+(U&65535)|0)+(ea&65535)|0;aa=((f(t,y)|0)+(U>>>16)|0)+(ea>>>16)|0;ba=((f(l,G)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(t,G)|0)+(aa>>>16)|0)+(ba>>>16)|0;U=ba<<16|_&65535;_=((f(l,z)|0)+(V&65535)|0)+(ea&65535)|0;aa=((f(t,z)|0)+(V>>>16)|0)+(ea>>>16)|0;ba=((f(l,H)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(t,H)|0)+(aa>>>16)|0)+(ba>>>16)|0;V=ba<<16|_&65535;_=((f(l,A)|0)+(W&65535)|0)+(ea&65535)|0;aa=((f(t,A)|0)+(W>>>16)|0)+(ea>>>16)|0;ba=((f(l,I)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(t,I)|0)+(aa>>>16)|0)+(ba>>>16)|0;W=ba<<16|_&65535;_=((f(l,B)|0)+(X&65535)|0)+(ea&65535)|0;aa=((f(t,B)|0)+(X>>>16)|0)+(ea>>>16)|0;ba=((f(l,J)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(t,J)|0)+(aa>>>16)|0)+(ba>>>16)|0;X=ba<<16|_&65535;_=((f(l,C)|0)+(Y&65535)|0)+(ea&65535)|0;aa=((f(t,C)|0)+(Y>>>16)|0)+(ea>>>16)|0;ba=((f(l,K)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(t,K)|0)+(aa>>>16)|0)+(ba>>>16)|0;Y=ba<<16|_&65535;Z=ea;_=((f(m,v)|0)+(S&65535)|0)+($&65535)|0;aa=((f(u,v)|0)+(S>>>16)|0)+($>>>16)|0;ba=((f(m,D)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(u,D)|0)+(aa>>>16)|0)+(ba>>>16)|0;S=ba<<16|_&65535;_=((f(m,w)|0)+(T&65535)|0)+(ea&65535)|0;aa=((f(u,w)|0)+(T>>>16)|0)+(ea>>>16)|0;ba=((f(m,E)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(u,E)|0)+(aa>>>16)|0)+(ba>>>16)|0;T=ba<<16|_&65535;_=((f(m,x)|0)+(U&65535)|0)+(ea&65535)|0;aa=((f(u,x)|0)+(U>>>16)|0)+(ea>>>16)|0;ba=((f(m,F)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(u,F)|0)+(aa>>>16)|0)+(ba>>>16)|0;U=ba<<16|_&65535;_=((f(m,y)|0)+(V&65535)|0)+(ea&65535)|0;aa=((f(u,y)|0)+(V>>>16)|0)+(ea>>>16)|0;ba=((f(m,G)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(u,G)|0)+(aa>>>16)|0)+(ba>>>16)|0;V=ba<<16|_&65535;_=((f(m,z)|0)+(W&65535)|0)+(ea&65535)|0;aa=((f(u,z)|0)+(W>>>16)|0)+(ea>>>16)|0;ba=((f(m,H)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(u,H)|0)+(aa>>>16)|0)+(ba>>>16)|0;W=ba<<16|_&65535;_=((f(m,A)|0)+(X&65535)|0)+(ea&65535)|0;aa=((f(u,A)|0)+(X>>>16)|0)+(ea>>>16)|0;ba=((f(m,I)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(u,I)|0)+(aa>>>16)|0)+(ba>>>16)|0;X=ba<<16|_&65535;_=((f(m,B)|0)+(Y&65535)|0)+(ea&65535)|0;aa=((f(u,B)|0)+(Y>>>16)|0)+(ea>>>16)|0;ba=((f(m,J)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(u,J)|0)+(aa>>>16)|0)+(ba>>>16)|0;Y=ba<<16|_&65535;_=((f(m,C)|0)+(Z&65535)|0)+(ea&65535)|0;aa=((f(u,C)|0)+(Z>>>16)|0)+(ea>>>16)|0;ba=((f(m,K)|0)+(aa&65535)|0)+(_>>>16)|0;ea=((f(u,K)|0)+(aa>>>16)|0)+(ba>>>16)|0;Z=ba<<16|_&65535;$=ea;la=ga+(ja+ka|0)|0;fa=e[oa+la>>2]|0;_=((fa&65535)+((L&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(L>>>16<<1)|0)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;ca=ba>>>16;la=la+4|0;fa=e[oa+la>>2]|0;_=((fa&65535)+((M&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(M>>>16<<1)|0)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;ca=ba>>>16;la=la+4|0;fa=e[oa+la>>2]|0;_=((fa&65535)+((N&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(N>>>16<<1)|0)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;ca=ba>>>16;la=la+4|0;fa=e[oa+la>>2]|0;_=((fa&65535)+((O&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(O>>>16<<1)|0)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;ca=ba>>>16;la=la+4|0;fa=e[oa+la>>2]|0;_=((fa&65535)+((P&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(P>>>16<<1)|0)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;ca=ba>>>16;la=la+4|0;fa=e[oa+la>>2]|0;_=((fa&65535)+((Q&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(Q>>>16<<1)|0)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;ca=ba>>>16;la=la+4|0;fa=e[oa+la>>2]|0;_=((fa&65535)+((R&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(R>>>16<<1)|0)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;ca=ba>>>16;la=la+4|0;fa=e[oa+la>>2]|0;_=((fa&65535)+((S&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(S>>>16<<1)|0)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;ca=ba>>>16}la=ga+(ja+ka|0)|0;fa=e[oa+la>>2]|0;_=(((fa&65535)+((T&65535)<<1)|0)+ca|0)+da|0;ba=((fa>>>16)+(T>>>16<<1)|0)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;ca=ba>>>16;la=la+4|0;fa=e[oa+la>>2]|0;_=((fa&65535)+((U&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(U>>>16<<1)|0)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;ca=ba>>>16;la=la+4|0;fa=e[oa+la>>2]|0;_=((fa&65535)+((V&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(V>>>16<<1)|0)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;ca=ba>>>16;la=la+4|0;fa=e[oa+la>>2]|0;_=((fa&65535)+((W&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(W>>>16<<1)|0)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;ca=ba>>>16;la=la+4|0;fa=e[oa+la>>2]|0;_=((fa&65535)+((X&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(X>>>16<<1)|0)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;ca=ba>>>16;la=la+4|0;fa=e[oa+la>>2]|0;_=((fa&65535)+((Y&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(Y>>>16<<1)|0)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;ca=ba>>>16;la=la+4|0;fa=e[oa+la>>2]|0;_=((fa&65535)+((Z&65535)<<1)|0)+ca|0;ba=((fa>>>16)+(Z>>>16<<1)|0)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;ca=ba>>>16;la=la+4|0;fa=e[oa+la>>2]|0;_=((fa&65535)+(($&65535)<<1)|0)+ca|0;ba=((fa>>>16)+($>>>16<<1)|0)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;da=ba>>>16}for(la=la+4|0;!!da&(la|0)<ha<<1;la=la+4|0){fa=e[oa+la>>2]|0;_=(fa&65535)+da|0;ba=(fa>>>16)+(_>>>16)|0;e[oa+la>>2]=ba<<16|_&65535;da=ba>>>16}}}}function s(a,b,c,d,g){a=a|0;b=b|0;c=c|0;d=d|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;for(x=b-1&-4;(x|0)>=0;x=x-4|0){h=e[a+x>>2]|0;if(h){b=x;break}}for(x=d-1&-4;(x|0)>=0;x=x-4|0){i=e[c+x>>2]|0;if(i){d=x;break}}while((i&2147483648)==0){i=i<<1;j=j+1|0}l=e[a+b>>2]|0;if(j){k=l>>>(32-j|0);for(x=b-4|0;(x|0)>=0;x=x-4|0){h=e[a+x>>2]|0;e[a+x+4>>2]=l<<j|(j?h>>>(32-j|0):0);l=h}e[a>>2]=l<<j}if(j){m=e[c+d>>2]|0;for(x=d-4|0;(x|0)>=0;x=x-4|0){i=e[c+x>>2]|0;e[c+x+4>>2]=m<<j|i>>>(32-j|0);m=i}e[c>>2]=m<<j}m=e[c+d>>2]|0;n=m>>>16,o=m&65535;for(x=b;(x|0)>=(d|0);x=x-4|0){y=x-d|0;l=e[a+x>>2]|0;p=(k>>>0)/(n>>>0)|0,r=(k>>>0)%(n>>>0)|0,t=f(p,o)|0;while((p|0)==65536|t>>>0>(r<<16|l>>>16)>>>0){p=p-1|0,r=r+n|0,t=t-o|0;if((r|0)>=65536)break}v=0,w=0;for(z=0;(z|0)<=(d|0);z=z+4|0){i=e[c+z>>2]|0;t=(f(p,i&65535)|0)+(v>>>16)|0;u=(f(p,i>>>16)|0)+(t>>>16)|0;i=v&65535|t<<16;v=u;h=e[a+y+z>>2]|0;t=((h&65535)-(i&65535)|0)+w|0;u=((h>>>16)-(i>>>16)|0)+(t>>16)|0;e[a+y+z>>2]=u<<16|t&65535;w=u>>16}t=((k&65535)-(v&65535)|0)+w|0;u=((k>>>16)-(v>>>16)|0)+(t>>16)|0;k=u<<16|t&65535;w=u>>16;if(w){p=p-1|0;w=0;for(z=0;(z|0)<=(d|0);z=z+4|0){i=e[c+z>>2]|0;h=e[a+y+z>>2]|0;t=(h&65535)+w|0;u=(h>>>16)+i+(t>>>16)|0;e[a+y+z>>2]=u<<16|t&65535;w=u>>>16}k=k+w|0}l=e[a+x>>2]|0;h=k<<16|l>>>16;q=(h>>>0)/(n>>>0)|0,s=(h>>>0)%(n>>>0)|0,t=f(q,o)|0;while((q|0)==65536|t>>>0>(s<<16|l&65535)>>>0){q=q-1|0,s=s+n|0,t=t-o|0;if((s|0)>=65536)break}v=0,w=0;for(z=0;(z|0)<=(d|0);z=z+4|0){i=e[c+z>>2]|0;t=(f(q,i&65535)|0)+(v&65535)|0;u=((f(q,i>>>16)|0)+(t>>>16)|0)+(v>>>16)|0;i=t&65535|u<<16;v=u>>>16;h=e[a+y+z>>2]|0;t=((h&65535)-(i&65535)|0)+w|0;u=((h>>>16)-(i>>>16)|0)+(t>>16)|0;w=u>>16;e[a+y+z>>2]=u<<16|t&65535}t=((k&65535)-(v&65535)|0)+w|0;u=((k>>>16)-(v>>>16)|0)+(t>>16)|0;w=u>>16;if(w){q=q-1|0;w=0;for(z=0;(z|0)<=(d|0);z=z+4|0){i=e[c+z>>2]|0;h=e[a+y+z>>2]|0;t=((h&65535)+(i&65535)|0)+w|0;u=((h>>>16)+(i>>>16)|0)+(t>>>16)|0;w=u>>>16;e[a+y+z>>2]=t&65535|u<<16}}e[g+y>>2]=p<<16|q;k=e[a+x>>2]|0}if(j){l=e[a>>2]|0;for(x=4;(x|0)<=(d|0);x=x+4|0){h=e[a+x>>2]|0;e[a+x-4>>2]=h<<(32-j|0)|l>>>j;l=h}e[a+d>>2]=l>>>j}}function t(a,b,c,d,g,l){a=a|0;b=b|0;c=c|0;d=d|0;g=g|0;l=l|0;var n=0,o=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0;n=h(d<<1)|0;k(d<<1,0,n);j(b,a,n);for(z=0;(z|0)<(d|0);z=z+4|0){q=e[n+z>>2]|0,r=q&65535,q=q>>>16;t=g>>>16,s=g&65535;u=f(r,s)|0,v=((f(r,t)|0)+(f(q,s)|0)|0)+(u>>>16)|0;r=u&65535,q=v&65535;y=0;for(A=0;(A|0)<(d|0);A=A+4|0){B=z+A|0;t=e[c+A>>2]|0,s=t&65535,t=t>>>16;x=e[n+B>>2]|0;u=((f(r,s)|0)+(y&65535)|0)+(x&65535)|0;v=((f(r,t)|0)+(y>>>16)|0)+(x>>>16)|0;w=((f(q,s)|0)+(v&65535)|0)+(u>>>16)|0;y=((f(q,t)|0)+(w>>>16)|0)+(v>>>16)|0;x=w<<16|u&65535;e[n+B>>2]=x}B=z+A|0;x=e[n+B>>2]|0;u=((x&65535)+(y&65535)|0)+o|0;v=((x>>>16)+(y>>>16)|0)+(u>>>16)|0;e[n+B>>2]=v<<16|u&65535;o=v>>>16}j(d,n+d|0,l);i(d<<1);if(o|(m(c,d,l,d)|0)<=0){p(l,d,c,d,l,d)|0}}return{sreset:g,salloc:h,sfree:i,z:k,tst:n,neg:l,cmp:m,add:o,sub:p,mul:q,sqr:r,div:s,mredc:t}}function $a(a){return a instanceof _a}function _a(a){var b=Tc,c=0,d=0;if(n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a)),void 0===a);else if(m(a)){var e=Math.abs(a);e>4294967295?(b=new Uint32Array(2),b[0]=0|e,b[1]=e/4294967296|0,c=52):e>0?(b=new Uint32Array(1),b[0]=e,c=32):(b=Tc,c=0),d=0>a?-1:1}else if(p(a)){if(c=8*a.length,!c)return Vc;b=new Uint32Array(c+31>>5);for(var g=a.length-4;g>=0;g-=4)b[a.length-4-g>>2]=a[g]<<24|a[g+1]<<16|a[g+2]<<8|a[g+3];-3===g?b[b.length-1]=a[0]:-2===g?b[b.length-1]=a[0]<<8|a[1]:-1===g&&(b[b.length-1]=a[0]<<16|a[1]<<8|a[2]),d=1}else{if("object"!=typeof a||null===a)throw new TypeError("number is of unexpected type");b=new Uint32Array(a.limbs),c=a.bitLength,d=a.sign}this.limbs=b,this.bitLength=c,this.sign=d}function ab(a){a=a||16;var b=this.limbs,c=this.bitLength,e="";if(16!==a)throw new d("bad radix");for(var f=(c+31>>5)-1;f>=0;f--){var g=b[f].toString(16);e+="00000000".substr(g.length),e+=g}return e=e.replace(/^0+/,""),e.length||(e="0"),this.sign<0&&(e="-"+e),e}function bb(){var a=this.bitLength,b=this.limbs;if(0===a)return new Uint8Array(0);for(var c=a+7>>3,d=new Uint8Array(c),e=0;c>e;e++){var f=c-e-1;d[e]=b[f>>2]>>((3&f)<<3)}return d}function cb(){var a=this.limbs,b=this.bitLength,c=this.sign;if(!c)return 0;if(32>=b)return c*(a[0]>>>0);if(52>=b)return c*(4294967296*(a[1]>>>0)+(a[0]>>>0));var d,e,f=0;for(d=a.length-1;d>=0;d--)if(0!==(e=a[d])){for(;0===(e<<f&2147483648);)f++;break}return 0===d?c*(a[0]>>>0):c*(1048576*((a[d]<<f|(f?a[d-1]>>>32-f:0))>>>0)+((a[d-1]<<f|(f&&d>1?a[d-2]>>>32-f:0))>>>12))*Math.pow(2,32*d-f-52)}function db(a){var b=this.limbs,c=this.bitLength;if(a>=c)return this;var d=new _a,e=a+31>>5,f=a%32;return d.limbs=new Uint32Array(b.subarray(0,e)),d.bitLength=a,d.sign=this.sign,f&&(d.limbs[e-1]&=-1>>>32-f),d}function eb(a,b){if(!m(a))throw new TypeError("TODO");if(void 0!==b&&!m(b))throw new TypeError("TODO");var c=this.limbs,d=this.bitLength;if(0>a)throw new RangeError("TODO");if(a>=d)return Vc;(void 0===b||b>d-a)&&(b=d-a);var e,f=new _a,g=a>>5,h=a+b+31>>5,i=b+31>>5,j=a%32,k=b%32;if(e=new Uint32Array(i),j){for(var l=0;h-g-1>l;l++)e[l]=c[g+l]>>>j|c[g+l+1]<<32-j;e[l]=c[g+l]>>>j}else e.set(c.subarray(g,h));return k&&(e[i-1]&=-1>>>32-k),f.limbs=e,f.bitLength=b,f.sign=this.sign,f}function fb(){var a=new _a;return a.limbs=this.limbs,a.bitLength=this.bitLength,a.sign=-1*this.sign,a}function gb(a){$a(a)||(a=new _a(a));var b=this.limbs,c=b.length,d=a.limbs,e=d.length,f=0;return this.sign<a.sign?-1:this.sign>a.sign?1:(Sc.set(b,0),Sc.set(d,c),f=Za.cmp(0,c<<2,c<<2,e<<2),f*this.sign)}function hb(a){
	if($a(a)||(a=new _a(a)),!this.sign)return a;if(!a.sign)return this;var b,c,d,e,f=this.bitLength,g=this.limbs,h=g.length,i=this.sign,j=a.bitLength,k=a.limbs,l=k.length,m=a.sign,n=new _a;b=(f>j?f:j)+(i*m>0?1:0),c=b+31>>5,Za.sreset();var o=Za.salloc(h<<2),p=Za.salloc(l<<2),q=Za.salloc(c<<2);return Za.z(q-o+(c<<2),0,o),Sc.set(g,o>>2),Sc.set(k,p>>2),i*m>0?(Za.add(o,h<<2,p,l<<2,q,c<<2),d=i):i>m?(e=Za.sub(o,h<<2,p,l<<2,q,c<<2),d=e?m:i):(e=Za.sub(p,l<<2,o,h<<2,q,c<<2),d=e?i:m),e&&Za.neg(q,c<<2,q,c<<2),0===Za.tst(q,c<<2)?Vc:(n.limbs=new Uint32Array(Sc.subarray(q>>2,(q>>2)+c)),n.bitLength=b,n.sign=d,n)}function ib(a){return $a(a)||(a=new _a(a)),this.add(a.negate())}function jb(a){if($a(a)||(a=new _a(a)),!this.sign||!a.sign)return Vc;var b,c,d=this.bitLength,e=this.limbs,f=e.length,g=a.bitLength,h=a.limbs,i=h.length,j=new _a;b=d+g,c=b+31>>5,Za.sreset();var k=Za.salloc(f<<2),l=Za.salloc(i<<2),m=Za.salloc(c<<2);return Za.z(m-k+(c<<2),0,k),Sc.set(e,k>>2),Sc.set(h,l>>2),Za.mul(k,f<<2,l,i<<2,m,c<<2),j.limbs=new Uint32Array(Sc.subarray(m>>2,(m>>2)+c)),j.sign=this.sign*a.sign,j.bitLength=b,j}function kb(){if(!this.sign)return Vc;var a,b,c=this.bitLength,d=this.limbs,e=d.length,f=new _a;a=c<<1,b=a+31>>5,Za.sreset();var g=Za.salloc(e<<2),h=Za.salloc(b<<2);return Za.z(h-g+(b<<2),0,g),Sc.set(d,g>>2),Za.sqr(g,e<<2,h),f.limbs=new Uint32Array(Sc.subarray(h>>2,(h>>2)+b)),f.bitLength=a,f.sign=1,f}function lb(a){$a(a)||(a=new _a(a));var b,c,d=this.bitLength,e=this.limbs,f=e.length,g=a.bitLength,h=a.limbs,i=h.length,j=Vc,k=Vc;Za.sreset();var l=Za.salloc(f<<2),m=Za.salloc(i<<2),n=Za.salloc(f<<2);return Za.z(n-l+(f<<2),0,l),Sc.set(e,l>>2),Sc.set(h,m>>2),Za.div(l,f<<2,m,i<<2,n),b=Za.tst(n,f<<2)>>2,b&&(j=new _a,j.limbs=new Uint32Array(Sc.subarray(n>>2,(n>>2)+b)),j.bitLength=b<<5>d?d:b<<5,j.sign=this.sign*a.sign),c=Za.tst(l,i<<2)>>2,c&&(k=new _a,k.limbs=new Uint32Array(Sc.subarray(l>>2,(l>>2)+c)),k.bitLength=c<<5>g?g:c<<5,k.sign=this.sign),{quotient:j,remainder:k}}function mb(a,b){var c,d,e,f,g=0>a?-1:1,h=0>b?-1:1,i=1,j=0,k=0,l=1;for(a*=g,b*=h,f=b>a,f&&(e=a,a=b,b=e,e=g,g=h,h=e),d=Math.floor(a/b),c=a-d*b;c;)e=i-d*j,i=j,j=e,e=k-d*l,k=l,l=e,a=b,b=c,d=Math.floor(a/b),c=a-d*b;return j*=g,l*=h,f&&(e=j,j=l,l=e),{gcd:b,x:j,y:l}}function nb(a,b){$a(a)||(a=new _a(a)),$a(b)||(b=new _a(b));var c=a.sign,d=b.sign;0>c&&(a=a.negate()),0>d&&(b=b.negate());var e=a.compare(b);if(0>e){var f=a;a=b,b=f,f=c,c=d,d=f}var g,h,i,j=Wc,k=Vc,l=b.bitLength,m=Vc,n=Wc,o=a.bitLength;for(g=a.divide(b);(h=g.remainder)!==Vc;)i=g.quotient,g=j.subtract(i.multiply(k).clamp(l)).clamp(l),j=k,k=g,g=m.subtract(i.multiply(n).clamp(o)).clamp(o),m=n,n=g,a=b,b=h,g=a.divide(b);if(0>c&&(k=k.negate()),0>d&&(n=n.negate()),0>e){var f=k;k=n,n=f}return{gcd:b,x:k,y:n}}function ob(){if(_a.apply(this,arguments),this.valueOf()<1)throw new RangeError;if(!(this.bitLength<=32)){var a;if(1&this.limbs[0]){var b=(this.bitLength+31&-32)+1,c=new Uint32Array(b+31>>5);c[c.length-1]=1,a=new _a,a.sign=1,a.bitLength=b,a.limbs=c;var d=mb(4294967296,this.limbs[0]).y;this.coefficient=0>d?-d:4294967296-d,this.comodulus=a,this.comodulusRemainder=a.divide(this).remainder,this.comodulusRemainderSquare=a.square().divide(this).remainder}}}function pb(a){return $a(a)||(a=new _a(a)),a.bitLength<=32&&this.bitLength<=32?new _a(a.valueOf()%this.valueOf()):a.compare(this)<0?a:a.divide(this).remainder}function qb(a){a=this.reduce(a);var b=nb(this,a);return 1!==b.gcd.valueOf()?null:(b=b.y,b.sign<0&&(b=b.add(this).clamp(this.bitLength)),b)}function rb(a,b){$a(a)||(a=new _a(a)),$a(b)||(b=new _a(b));for(var c=0,d=0;d<b.limbs.length;d++)for(var e=b.limbs[d];e;)1&e&&c++,e>>>=1;var f=8;b.bitLength<=4536&&(f=7),b.bitLength<=1736&&(f=6),b.bitLength<=630&&(f=5),b.bitLength<=210&&(f=4),b.bitLength<=60&&(f=3),b.bitLength<=12&&(f=2),1<<f-1>=c&&(f=1),a=sb(this.reduce(a).multiply(this.comodulusRemainderSquare),this);var g=sb(a.square(),this),h=new Array(1<<f-1);h[0]=a,h[1]=sb(a.multiply(g),this);for(var d=2;1<<f-1>d;d++)h[d]=sb(h[d-1].multiply(g),this);for(var i=this.comodulusRemainder,j=i,d=b.limbs.length-1;d>=0;d--)for(var e=b.limbs[d],k=32;k>0;)if(2147483648&e){for(var l=e>>>32-f,m=f;0===(1&l);)l>>>=1,m--;for(var n=h[l>>>1];l;)l>>>=1,j!==i&&(j=sb(j.square(),this));j=j!==i?sb(j.multiply(n),this):n,e<<=m,k-=m}else j!==i&&(j=sb(j.square(),this)),e<<=1,k--;return j=sb(j,this)}function sb(a,b){var c=a.limbs,d=c.length,e=b.limbs,f=e.length,g=b.coefficient;Za.sreset();var h=Za.salloc(d<<2),i=Za.salloc(f<<2),j=Za.salloc(f<<2);Za.z(j-h+(f<<2),0,h),Sc.set(c,h>>2),Sc.set(e,i>>2),Za.mredc(h,d<<2,i,f<<2,g,j);var k=new _a;return k.limbs=new Uint32Array(Sc.subarray(j>>2,(j>>2)+f)),k.bitLength=b.bitLength,k.sign=1,k}function tb(a){var b=new _a(this),c=0;for(b.limbs[0]-=1;0===b.limbs[c>>5];)c+=32;for(;0===(b.limbs[c>>5]>>(31&c)&1);)c++;b=b.slice(c);for(var d=new ob(this),e=this.subtract(Wc),f=new _a(this),g=this.limbs.length-1;0===f.limbs[g];)g--;for(;--a>=0;){for(Wa(f.limbs),f.limbs[0]<2&&(f.limbs[0]+=2);f.compare(e)>=0;)f.limbs[g]>>>=1;var h=d.power(f,b);if(0!==h.compare(Wc)&&0!==h.compare(e)){for(var i=c;--i>0;){if(h=h.square().divide(d).remainder,0===h.compare(Wc))return!1;if(0===h.compare(e))break}if(0===i)return!1}}return!0}function ub(a){a=a||80;var b=this.limbs,c=0;if(0===(1&b[0]))return!1;if(1>=a)return!0;var d=0,e=0,f=0;for(c=0;c<b.length;c++){for(var g=b[c];g;)d+=3&g,g>>>=2;for(var h=b[c];h;)e+=3&h,h>>>=2,e-=3&h,h>>>=2;for(var i=b[c];i;)f+=15&i,i>>>=4,f-=15&i,i>>>=4}return d%3&&e%5&&f%17?2>=a?!0:tb.call(this,a>>>1):!1}function vb(a){if(Yc.length>=a)return Yc.slice(0,a);for(var b=Yc[Yc.length-1]+2;Yc.length<a;b+=2){for(var c=0,d=Yc[c];b>=d*d&&b%d!=0;d=Yc[++c]);d*d>b&&Yc.push(b)}return Yc}function wb(a,c){var d=a+31>>5,e=new _a({sign:1,bitLength:a,limbs:d}),f=e.limbs,g=1e4;512>=a&&(g=2200),256>=a&&(g=600);var h=vb(g),i=new Uint32Array(g),j=a*b.Math.LN2|0,k=27;for(a>=250&&(k=12),a>=450&&(k=6),a>=850&&(k=3),a>=1300&&(k=2);;){Wa(f),f[0]|=1,f[d-1]|=1<<(a-1&31),31&a&&(f[d-1]&=l(a+1&31)-1),i[0]=1;for(var m=1;g>m;m++)i[m]=e.divide(h[m]).remainder.valueOf();a:for(var n=0;j>n;n+=2,f[0]+=2){for(var m=1;g>m;m++)if((i[m]+n)%h[m]===0)continue a;if(("function"!=typeof c||c(e))&&tb.call(e,k))return e}}}function xb(a){a=a||{},this.key=null,this.result=null,this.reset(a)}function yb(a){a=a||{},this.result=null;var b=a.key;if(void 0!==b){if(!(b instanceof Array))throw new TypeError("unexpected key type");var c=b.length;if(2!==c&&3!==c&&8!==c)throw new SyntaxError("unexpected key type");var d=[];d[0]=new ob(b[0]),d[1]=new _a(b[1]),c>2&&(d[2]=new _a(b[2])),c>3&&(d[3]=new ob(b[3]),d[4]=new ob(b[4]),d[5]=new _a(b[5]),d[6]=new _a(b[6]),d[7]=new _a(b[7])),this.key=d}return this}function zb(a){if(!this.key)throw new c("no key is associated with the instance");n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a));var b;if(p(a))b=new _a(a);else{if(!$a(a))throw new TypeError("unexpected data type");b=a}if(this.key[0].compare(b)<=0)throw new RangeError("data too large");var d=this.key[0],e=this.key[1],g=d.power(b,e).toBytes(),h=d.bitLength+7>>3;if(g.length<h){var i=new Uint8Array(h);i.set(g,h-g.length),g=i}return this.result=g,this}function Ab(a){if(!this.key)throw new c("no key is associated with the instance");if(this.key.length<3)throw new c("key isn't suitable for decription");n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a));var b;if(p(a))b=new _a(a);else{if(!$a(a))throw new TypeError("unexpected data type");b=a}if(this.key[0].compare(b)<=0)throw new RangeError("data too large");var d;if(this.key.length>3){for(var e=this.key[0],g=this.key[3],h=this.key[4],i=this.key[5],j=this.key[6],k=this.key[7],l=g.power(b,i),m=h.power(b,j),q=l.subtract(m);q.sign<0;)q=q.add(g);var r=g.reduce(k.multiply(q));d=r.multiply(h).add(m).clamp(e.bitLength).toBytes()}else{var e=this.key[0],s=this.key[2];d=e.power(b,s).toBytes()}var t=e.bitLength+7>>3;if(d.length<t){var u=new Uint8Array(t);u.set(d,t-d.length),d=u}return this.result=d,this}function Bb(a,b){if(a=a||2048,b=b||65537,512>a)throw new d("bit length is too small");if(n(b)&&(b=f(b)),o(b)&&(b=new Uint8Array(b)),!(p(b)||m(b)||$a(b)))throw new TypeError("unexpected exponent type");if(b=new _a(b),0===(1&b.limbs[0]))throw new d("exponent must be an odd number");var c,b,e,g,h,i,j,k,l,q;g=wb(a>>1,function(a){return i=new _a(a),i.limbs[0]-=1,1==nb(i,b).gcd.valueOf()}),h=wb(a-(a>>1),function(d){return c=new ob(g.multiply(d)),c.limbs[(a+31>>5)-1]>>>(a-1&31)?(j=new _a(d),j.limbs[0]-=1,1==nb(j,b).gcd.valueOf()):!1}),e=new ob(i.multiply(j)).inverse(b),k=e.divide(i).remainder,l=e.divide(j).remainder,g=new ob(g),h=new ob(h);var q=g.inverse(h);return[c,b,e,g,h,k,l,q]}function Cb(a){if(a=a||{},!a.hash)throw new SyntaxError("option 'hash' is required");if(!a.hash.HASH_SIZE)throw new SyntaxError("option 'hash' supplied doesn't seem to be a valid hash function");this.hash=a.hash,this.label=null,this.reset(a)}function Db(a){a=a||{};var b=a.label;if(void 0!==b){if(o(b)||p(b))b=new Uint8Array(b);else{if(!n(b))throw new TypeError("unexpected label type");b=f(b)}this.label=b.length>0?b:null}else this.label=null;yb.call(this,a)}function Eb(a){if(!this.key)throw new c("no key is associated with the instance");var b=Math.ceil(this.key[0].bitLength/8),e=this.hash.HASH_SIZE,g=a.byteLength||a.length||0,h=b-g-2*e-2;if(g>b-2*this.hash.HASH_SIZE-2)throw new d("data too large");var i=new Uint8Array(b),j=i.subarray(1,e+1),k=i.subarray(e+1);if(p(a))k.set(a,e+h+1);else if(o(a))k.set(new Uint8Array(a),e+h+1);else{if(!n(a))throw new TypeError("unexpected data type");k.set(f(a),e+h+1)}k.set(this.hash.reset().process(this.label||"").finish().result,0),k[e+h]=1,Wa(j);for(var l=Gb.call(this,j,k.length),m=0;m<k.length;m++)k[m]^=l[m];for(var q=Gb.call(this,k,j.length),m=0;m<j.length;m++)j[m]^=q[m];return zb.call(this,i),this}function Fb(a){if(!this.key)throw new c("no key is associated with the instance");var b=Math.ceil(this.key[0].bitLength/8),f=this.hash.HASH_SIZE,g=a.byteLength||a.length||0;if(g!==b)throw new d("bad data");Ab.call(this,a);var h=this.result[0],i=this.result.subarray(1,f+1),j=this.result.subarray(f+1);if(0!==h)throw new e("decryption failed");for(var k=Gb.call(this,j,i.length),l=0;l<i.length;l++)i[l]^=k[l];for(var m=Gb.call(this,i,j.length),l=0;l<j.length;l++)j[l]^=m[l];for(var n=this.hash.reset().process(this.label||"").finish().result,l=0;f>l;l++)if(n[l]!==j[l])throw new e("decryption failed");for(var o=f;o<j.length;o++){var p=j[o];if(1===p)break;if(0!==p)throw new e("decryption failed")}if(o===j.length)throw new e("decryption failed");return this.result=j.subarray(o+1),this}function Gb(a,b){a=a||"",b=b||0;for(var c=this.hash.HASH_SIZE,d=new Uint8Array(b),e=new Uint8Array(4),f=Math.ceil(b/c),g=0;f>g;g++){e[0]=g>>>24,e[1]=g>>>16&255,e[2]=g>>>8&255,e[3]=255&g;var h=d.subarray(g*c),i=this.hash.reset().process(a).process(e).finish().result;i.length>h.length&&(i=i.subarray(0,h.length)),h.set(i)}return d}function Hb(a){if(a=a||{},!a.hash)throw new SyntaxError("option 'hash' is required");if(!a.hash.HASH_SIZE)throw new SyntaxError("option 'hash' supplied doesn't seem to be a valid hash function");this.hash=a.hash,this.saltLength=4,this.reset(a)}function Ib(a){a=a||{},yb.call(this,a);var b=a.saltLength;if(void 0!==b){if(!m(b)||0>b)throw new TypeError("saltLength should be a non-negative number");if(null!==this.key&&Math.ceil((this.key[0].bitLength-1)/8)<this.hash.HASH_SIZE+b+2)throw new SyntaxError("saltLength is too large");this.saltLength=b}else this.saltLength=4}function Jb(a){if(!this.key)throw new c("no key is associated with the instance");var b=this.key[0].bitLength,d=this.hash.HASH_SIZE,e=Math.ceil((b-1)/8),f=this.saltLength,g=e-f-d-2,h=new Uint8Array(e),i=h.subarray(e-d-1,e-1),j=h.subarray(0,e-d-1),k=j.subarray(g+1),l=new Uint8Array(8+d+f),m=l.subarray(8,8+d),n=l.subarray(8+d);m.set(this.hash.reset().process(a).finish().result),f>0&&Wa(n),j[g]=1,k.set(n),i.set(this.hash.reset().process(l).finish().result);for(var o=Gb.call(this,i,j.length),p=0;p<j.length;p++)j[p]^=o[p];h[e-1]=188;var q=8*e-b+1;return q%8&&(h[0]&=255>>>q),Ab.call(this,h),this}function Kb(a,b){if(!this.key)throw new c("no key is associated with the instance");var d=this.key[0].bitLength,f=this.hash.HASH_SIZE,g=Math.ceil((d-1)/8),h=this.saltLength,i=g-h-f-2;zb.call(this,a);var j=this.result;if(188!==j[g-1])throw new e("bad signature");var k=j.subarray(g-f-1,g-1),l=j.subarray(0,g-f-1),m=l.subarray(i+1),n=8*g-d+1;if(n%8&&j[0]>>>8-n)throw new e("bad signature");for(var o=Gb.call(this,k,l.length),p=0;p<l.length;p++)l[p]^=o[p];n%8&&(j[0]&=255>>>n);for(var p=0;i>p;p++)if(0!==l[p])throw new e("bad signature");if(1!==l[i])throw new e("bad signature");var q=new Uint8Array(8+f+h),r=q.subarray(8,8+f),s=q.subarray(8+f);r.set(this.hash.reset().process(b).finish().result),s.set(m);for(var t=this.hash.reset().process(q).finish().result,p=0;f>p;p++)if(k[p]!==t[p])throw new e("bad signature");return this}function Lb(a,b){if(void 0===a)throw new SyntaxError("bitlen required");if(void 0===b)throw new SyntaxError("e required");for(var c=Bb(a,b),d=0;d<c.length;d++)$a(c[d])&&(c[d]=c[d].toBytes());return c}function Mb(a,b,c){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");return new Cb({hash:ba(),key:b,label:c}).encrypt(a).result}function Nb(a,b,c){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");return new Cb({hash:ba(),key:b,label:c}).decrypt(a).result}function Ob(a,b,c){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");return new Cb({hash:ha(),key:b,label:c}).encrypt(a).result}function Pb(a,b,c){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");return new Cb({hash:ha(),key:b,label:c}).decrypt(a).result}function Qb(a,b,c){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");return new Hb({hash:ba(),key:b,saltLength:c}).sign(a).result}function Rb(a,b,c,d){if(void 0===a)throw new SyntaxError("signature required");if(void 0===b)throw new SyntaxError("data required");if(void 0===c)throw new SyntaxError("key required");try{return new Hb({hash:ba(),key:c,saltLength:d}).verify(a,b),!0}catch(a){if(!(a instanceof e))throw a}return!1}function Sb(a,b,c){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");return new Hb({hash:ha(),key:b,saltLength:c}).sign(a).result}function Tb(a,b,c,d){if(void 0===a)throw new SyntaxError("signature required");if(void 0===b)throw new SyntaxError("data required");if(void 0===c)throw new SyntaxError("key required");try{return new Hb({hash:ha(),key:c,saltLength:d}).verify(a,b),!0}catch(a){if(!(a instanceof e))throw a}return!1}c.prototype=Object.create(Error.prototype,{name:{value:"IllegalStateError"}}),d.prototype=Object.create(Error.prototype,{name:{value:"IllegalArgumentError"}}),e.prototype=Object.create(Error.prototype,{name:{value:"SecurityError"}});var Ub=b.Float64Array||b.Float32Array,Vb=b.console,Wb=!b.location.protocol.search(/https:|file:|chrome:|chrome-extension:/);Wb||void 0===Vb||Vb.warn("asmCrypto seems to be load from an insecure origin; this may cause to MitM-attack vulnerability. Consider using secure transport protocol."),a.string_to_bytes=f,a.hex_to_bytes=g,a.base64_to_bytes=h,a.bytes_to_string=i,a.bytes_to_hex=j,a.bytes_to_base64=k,b.IllegalStateError=c,b.IllegalArgumentError=d,b.SecurityError=e;var Xb=function(){"use strict";function a(){e=[],f=[];var a,b,c=1;for(a=0;255>a;a++)e[a]=c,b=128&c,c<<=1,c&=255,128===b&&(c^=27),c^=e[a],f[e[a]]=a;e[255]=e[0],f[0]=0,k=!0}function b(a,b){var c=e[(f[a]+f[b])%255];return(0===a||0===b)&&(c=0),c}function c(a){var b=e[255-f[a]];return 0===a&&(b=0),b}function d(){function d(a){var b,d,e;for(d=e=c(a),b=0;4>b;b++)d=255&(d<<1|d>>>7),e^=d;return e^=99}k||a(),g=[],h=[],i=[[],[],[],[]],j=[[],[],[],[]];for(var e=0;256>e;e++){var f=d(e);g[e]=f,h[f]=e,i[0][e]=b(2,f)<<24|f<<16|f<<8|b(3,f),j[0][f]=b(14,e)<<24|b(9,e)<<16|b(13,e)<<8|b(11,e);for(var l=1;4>l;l++)i[l][e]=i[l-1][e]>>>8|i[l-1][e]<<24,j[l][f]=j[l-1][f]>>>8|j[l-1][f]<<24}}var e,f,g,h,i,j,k=!1,l=!1,m=function(a,b,c){function e(a,b,c,d,e,h,i,k,l){var n=f.subarray(0,60),o=f.subarray(256,316);n.set([b,c,d,e,h,i,k,l]);for(var p=a,q=1;4*a+28>p;p++){var r=n[p-1];(p%a===0||8===a&&p%a===4)&&(r=g[r>>>24]<<24^g[r>>>16&255]<<16^g[r>>>8&255]<<8^g[255&r]),p%a===0&&(r=r<<8^r>>>24^q<<24,q=q<<1^(128&q?27:0)),n[p]=n[p-a]^r}for(var s=0;p>s;s+=4)for(var t=0;4>t;t++){var r=n[p-(4+s)+(4-t)%4];4>s||s>=p-4?o[s+t]=r:o[s+t]=j[0][g[r>>>24]]^j[1][g[r>>>16&255]]^j[2][g[r>>>8&255]]^j[3][g[255&r]]}m.set_rounds(a+5)}l||d();var f=new Uint32Array(c);f.set(g,512),f.set(h,768);for(var k=0;4>k;k++)f.set(i[k],4096+1024*k>>2),f.set(j[k],8192+1024*k>>2);var m=function(a,b,c){"use asm";var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;var y=new a.Uint32Array(c),z=new a.Uint8Array(c);function A(a,b,c,h,i,j,k,l){a=a|0;b=b|0;c=c|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;m=c|1024,n=c|2048,o=c|3072;i=i^y[(a|0)>>2],j=j^y[(a|4)>>2],k=k^y[(a|8)>>2],l=l^y[(a|12)>>2];for(t=16;(t|0)<=h<<4;t=t+16|0){p=y[(c|i>>22&1020)>>2]^y[(m|j>>14&1020)>>2]^y[(n|k>>6&1020)>>2]^y[(o|l<<2&1020)>>2]^y[(a|t|0)>>2],q=y[(c|j>>22&1020)>>2]^y[(m|k>>14&1020)>>2]^y[(n|l>>6&1020)>>2]^y[(o|i<<2&1020)>>2]^y[(a|t|4)>>2],r=y[(c|k>>22&1020)>>2]^y[(m|l>>14&1020)>>2]^y[(n|i>>6&1020)>>2]^y[(o|j<<2&1020)>>2]^y[(a|t|8)>>2],s=y[(c|l>>22&1020)>>2]^y[(m|i>>14&1020)>>2]^y[(n|j>>6&1020)>>2]^y[(o|k<<2&1020)>>2]^y[(a|t|12)>>2];i=p,j=q,k=r,l=s}d=y[(b|i>>22&1020)>>2]<<24^y[(b|j>>14&1020)>>2]<<16^y[(b|k>>6&1020)>>2]<<8^y[(b|l<<2&1020)>>2]^y[(a|t|0)>>2],e=y[(b|j>>22&1020)>>2]<<24^y[(b|k>>14&1020)>>2]<<16^y[(b|l>>6&1020)>>2]<<8^y[(b|i<<2&1020)>>2]^y[(a|t|4)>>2],f=y[(b|k>>22&1020)>>2]<<24^y[(b|l>>14&1020)>>2]<<16^y[(b|i>>6&1020)>>2]<<8^y[(b|j<<2&1020)>>2]^y[(a|t|8)>>2],g=y[(b|l>>22&1020)>>2]<<24^y[(b|i>>14&1020)>>2]<<16^y[(b|j>>6&1020)>>2]<<8^y[(b|k<<2&1020)>>2]^y[(a|t|12)>>2]}function B(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;A(0,2048,4096,x,a,b,c,d)}function C(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var f=0;A(1024,3072,8192,x,a,d,c,b);f=e,e=g,g=f}function D(a,b,c,l){a=a|0;b=b|0;c=c|0;l=l|0;A(0,2048,4096,x,h^a,i^b,j^c,k^l);h=d,i=e,j=f,k=g}function E(a,b,c,l){a=a|0;b=b|0;c=c|0;l=l|0;var m=0;A(1024,3072,8192,x,a,l,c,b);m=e,e=g,g=m;d=d^h,e=e^i,f=f^j,g=g^k;h=a,i=b,j=c,k=l}function F(a,b,c,l){a=a|0;b=b|0;c=c|0;l=l|0;A(0,2048,4096,x,h,i,j,k);h=d=d^a,i=e=e^b,j=f=f^c,k=g=g^l}function G(a,b,c,l){a=a|0;b=b|0;c=c|0;l=l|0;A(0,2048,4096,x,h,i,j,k);d=d^a,e=e^b,f=f^c,g=g^l;h=a,i=b,j=c,k=l}function H(a,b,c,l){a=a|0;b=b|0;c=c|0;l=l|0;A(0,2048,4096,x,h,i,j,k);h=d,i=e,j=f,k=g;d=d^a,e=e^b,f=f^c,g=g^l}function I(a,b,c,h){a=a|0;b=b|0;c=c|0;h=h|0;A(0,2048,4096,x,l,m,n,o);o=~s&o|s&o+1,n=~r&n|r&n+((o|0)==0),m=~q&m|q&m+((n|0)==0),l=~p&l|p&l+((m|0)==0);d=d^a,e=e^b,f=f^c,g=g^h}function J(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;a=a^h,b=b^i,c=c^j,d=d^k;e=t|0,f=u|0,g=v|0,l=w|0;for(;(q|0)<128;q=q+1|0){if(e>>>31){m=m^a,n=n^b,o=o^c,p=p^d}e=e<<1|f>>>31,f=f<<1|g>>>31,g=g<<1|l>>>31,l=l<<1;r=d&1;d=d>>>1|c<<31,c=c>>>1|b<<31,b=b>>>1|a<<31,a=a>>>1;if(r)a=a^3774873600}h=m,i=n,j=o,k=p}function K(a){a=a|0;x=a}function L(a,b,c,h){a=a|0;b=b|0;c=c|0;h=h|0;d=a,e=b,f=c,g=h}function M(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;h=a,i=b,j=c,k=d}function N(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;l=a,m=b,n=c,o=d}function O(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;p=a,q=b,r=c,s=d}function P(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;o=~s&o|s&d,n=~r&n|r&c,m=~q&m|q&b,l=~p&l|p&a}function Q(a){a=a|0;if(a&15)return-1;z[a|0]=d>>>24,z[a|1]=d>>>16&255,z[a|2]=d>>>8&255,z[a|3]=d&255,z[a|4]=e>>>24,z[a|5]=e>>>16&255,z[a|6]=e>>>8&255,z[a|7]=e&255,z[a|8]=f>>>24,z[a|9]=f>>>16&255,z[a|10]=f>>>8&255,z[a|11]=f&255,z[a|12]=g>>>24,z[a|13]=g>>>16&255,z[a|14]=g>>>8&255,z[a|15]=g&255;return 16}function R(a){a=a|0;if(a&15)return-1;z[a|0]=h>>>24,z[a|1]=h>>>16&255,z[a|2]=h>>>8&255,z[a|3]=h&255,z[a|4]=i>>>24,z[a|5]=i>>>16&255,z[a|6]=i>>>8&255,z[a|7]=i&255,z[a|8]=j>>>24,z[a|9]=j>>>16&255,z[a|10]=j>>>8&255,z[a|11]=j&255,z[a|12]=k>>>24,z[a|13]=k>>>16&255,z[a|14]=k>>>8&255,z[a|15]=k&255;return 16}function S(){B(0,0,0,0);t=d,u=e,v=f,w=g}function T(a,b,c){a=a|0;b=b|0;c=c|0;var h=0;if(b&15)return-1;while((c|0)>=16){V[a&7](z[b|0]<<24|z[b|1]<<16|z[b|2]<<8|z[b|3],z[b|4]<<24|z[b|5]<<16|z[b|6]<<8|z[b|7],z[b|8]<<24|z[b|9]<<16|z[b|10]<<8|z[b|11],z[b|12]<<24|z[b|13]<<16|z[b|14]<<8|z[b|15]);z[b|0]=d>>>24,z[b|1]=d>>>16&255,z[b|2]=d>>>8&255,z[b|3]=d&255,z[b|4]=e>>>24,z[b|5]=e>>>16&255,z[b|6]=e>>>8&255,z[b|7]=e&255,z[b|8]=f>>>24,z[b|9]=f>>>16&255,z[b|10]=f>>>8&255,z[b|11]=f&255,z[b|12]=g>>>24,z[b|13]=g>>>16&255,z[b|14]=g>>>8&255,z[b|15]=g&255;h=h+16|0,b=b+16|0,c=c-16|0}return h|0}function U(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;if(b&15)return-1;while((c|0)>=16){W[a&1](z[b|0]<<24|z[b|1]<<16|z[b|2]<<8|z[b|3],z[b|4]<<24|z[b|5]<<16|z[b|6]<<8|z[b|7],z[b|8]<<24|z[b|9]<<16|z[b|10]<<8|z[b|11],z[b|12]<<24|z[b|13]<<16|z[b|14]<<8|z[b|15]);d=d+16|0,b=b+16|0,c=c-16|0}return d|0}var V=[B,C,D,E,F,G,H,I];var W=[D,J];return{set_rounds:K,set_state:L,set_iv:M,set_nonce:N,set_mask:O,set_counter:P,get_state:Q,get_iv:R,gcm_init:S,cipher:T,mac:U}}(a,b,c);return m.set_key=e,m};return m.ENC={ECB:0,CBC:2,CFB:4,OFB:6,CTR:7},m.DEC={ECB:1,CBC:3,CFB:5,OFB:6,CTR:7},m.MAC={CBC:0,GCM:1},m.HEAP_DATA=16384,m}(),Yb=C.prototype;Yb.BLOCK_SIZE=16,Yb.reset=x,Yb.encrypt=z,Yb.decrypt=B;var Zb=D.prototype;Zb.BLOCK_SIZE=16,Zb.reset=x,Zb.process=y,Zb.finish=z;var $b=E.prototype;$b.BLOCK_SIZE=16,$b.reset=x,$b.process=A,$b.finish=B;var _b=F.prototype;_b.BLOCK_SIZE=16,_b.reset=I,_b.encrypt=z,_b.decrypt=z;var ac=G.prototype;ac.BLOCK_SIZE=16,ac.reset=I,ac.process=y,ac.finish=z;var bc=68719476704,cc=K.prototype;cc.BLOCK_SIZE=16,cc.reset=N,cc.encrypt=Q,cc.decrypt=T;var dc=L.prototype;dc.BLOCK_SIZE=16,dc.reset=N,dc.process=O,dc.finish=P;var ec=M.prototype;ec.BLOCK_SIZE=16,ec.reset=N,ec.process=R,ec.finish=S;var fc=new Uint8Array(1048576),gc=Xb(b,null,fc.buffer);a.AES_CBC=C,a.AES_CBC.encrypt=U,a.AES_CBC.decrypt=V,a.AES_CBC.Encrypt=D,a.AES_CBC.Decrypt=E,a.AES_GCM=K,a.AES_GCM.encrypt=W,a.AES_GCM.decrypt=X,a.AES_GCM.Encrypt=L,a.AES_GCM.Decrypt=M;var hc=64,ic=20;aa.BLOCK_SIZE=hc,aa.HASH_SIZE=ic;var jc=aa.prototype;jc.reset=Y,jc.process=Z,jc.finish=$;var kc=null;aa.bytes=ca,aa.hex=da,aa.base64=ea,a.SHA1=aa;var lc=64,mc=32;ga.BLOCK_SIZE=lc,ga.HASH_SIZE=mc;var nc=ga.prototype;nc.reset=Y,nc.process=Z,nc.finish=$;var oc=null;ga.bytes=ia,ga.hex=ja,ga.base64=ka,a.SHA256=ga;var pc=la.prototype;pc.reset=oa,pc.process=pa,pc.finish=qa,ra.BLOCK_SIZE=aa.BLOCK_SIZE,ra.HMAC_SIZE=aa.HASH_SIZE;var qc=ra.prototype;qc.reset=sa,qc.process=pa,qc.finish=ta;var rc=null;va.BLOCK_SIZE=ga.BLOCK_SIZE,va.HMAC_SIZE=ga.HASH_SIZE;var sc=va.prototype;sc.reset=wa,sc.process=pa,sc.finish=xa;var tc=null;a.HMAC=la,ra.bytes=za,ra.hex=Aa,ra.base64=Ba,a.HMAC_SHA1=ra,va.bytes=Ca,va.hex=Da,va.base64=Ea,a.HMAC_SHA256=va;var uc=Fa.prototype;uc.reset=Ga,uc.generate=Ha;var vc=Ia.prototype;vc.reset=Ga,vc.generate=Ja;var wc=null,xc=La.prototype;xc.reset=Ga,xc.generate=Ma;var yc=null;a.PBKDF2=a.PBKDF2_HMAC_SHA1={bytes:Oa,hex:Pa,base64:Qa},a.PBKDF2_HMAC_SHA256={bytes:Ra,hex:Sa,base64:Ta};var zc,Ac=function(){function a(){function a(){b^=d<<11,l=l+b|0,d=d+f|0,d^=f>>>2,m=m+d|0,f=f+l|0,f^=l<<8,n=n+f|0,l=l+m|0,l^=m>>>16,o=o+l|0,m=m+n|0,m^=n<<10,p=p+m|0,n=n+o|0,n^=o>>>4,b=b+n|0,o=o+p|0,o^=p<<8,d=d+o|0,p=p+b|0,p^=b>>>9,f=f+p|0,b=b+d|0}var b,d,f,l,m,n,o,p;h=i=j=0,b=d=f=l=m=n=o=p=2654435769;for(var q=0;4>q;q++)a();for(var q=0;256>q;q+=8)b=b+g[0|q]|0,d=d+g[1|q]|0,f=f+g[2|q]|0,l=l+g[3|q]|0,m=m+g[4|q]|0,n=n+g[5|q]|0,o=o+g[6|q]|0,p=p+g[7|q]|0,a(),e.set([b,d,f,l,m,n,o,p],q);for(var q=0;256>q;q+=8)b=b+e[0|q]|0,d=d+e[1|q]|0,f=f+e[2|q]|0,l=l+e[3|q]|0,m=m+e[4|q]|0,n=n+e[5|q]|0,o=o+e[6|q]|0,p=p+e[7|q]|0,a(),e.set([b,d,f,l,m,n,o,p],q);c(1),k=256}function b(b){var c,d,e,h,i;if(q(b))b=new Uint8Array(b.buffer);else if(m(b))h=new Ub(1),h[0]=b,b=new Uint8Array(h.buffer);else if(n(b))b=f(b);else{if(!o(b))throw new TypeError("bad seed type");b=new Uint8Array(b)}for(i=b.length,d=0;i>d;d+=1024){for(e=d,c=0;1024>c&&i>e;e=d|++c)g[c>>2]^=b[e]<<((3&c)<<3);a()}}function c(a){a=a||1;for(var b,c,d;a--;)for(j=j+1|0,i=i+j|0,b=0;256>b;b+=4)h^=h<<13,h=e[b+128&255]+h|0,c=e[0|b],e[0|b]=d=e[c>>>2&255]+(h+i|0)|0,g[0|b]=i=e[d>>>10&255]+c|0,h^=h>>>6,h=e[b+129&255]+h|0,c=e[1|b],e[1|b]=d=e[c>>>2&255]+(h+i|0)|0,g[1|b]=i=e[d>>>10&255]+c|0,h^=h<<2,h=e[b+130&255]+h|0,c=e[2|b],e[2|b]=d=e[c>>>2&255]+(h+i|0)|0,g[2|b]=i=e[d>>>10&255]+c|0,h^=h>>>16,h=e[b+131&255]+h|0,c=e[3|b],e[3|b]=d=e[c>>>2&255]+(h+i|0)|0,g[3|b]=i=e[d>>>10&255]+c|0}function d(){return k--||(c(1),k=255),g[k]}var e=new Uint32Array(256),g=new Uint32Array(256),h=0,i=0,j=0,k=0;return{seed:b,prng:c,rand:d}}(),Vb=b.console,Bc=b.Date.now,Cc=b.Math.random,Dc=b.performance,Ec=b.crypto||b.msCrypto;void 0!==Ec&&(zc=Ec.getRandomValues);var Fc,Gc=Ac.rand,Hc=Ac.seed,Ic=0,Jc=!1,Kc=!1,Lc=0,Mc=256,Nc=!1,Oc=!1,Pc={};if(void 0!==Dc)Fc=function(){return 1e3*Dc.now()|0};else{var Qc=1e3*Bc()|0;Fc=function(){return 1e3*Bc()-Qc|0}}a.random=Xa,a.random.seed=Va,Object.defineProperty(Xa,"allowWeak",{get:function(){return Nc},set:function(a){Nc=a}}),Object.defineProperty(Xa,"skipSystemRNGWarning",{get:function(){return Oc},set:function(a){Oc=a}}),a.getRandomValues=Wa,a.getRandomValues.seed=Va,Object.defineProperty(Wa,"allowWeak",{get:function(){return Nc},set:function(a){Nc=a}}),Object.defineProperty(Wa,"skipSystemRNGWarning",{get:function(){return Oc},set:function(a){Oc=a}}),b.Math.random=Xa,void 0===b.crypto&&(b.crypto={}),b.crypto.getRandomValues=Wa;var Rc;Rc=void 0===b.Math.imul?function(a,c,d){b.Math.imul=Ya;var e=Za(a,c,d);return delete b.Math.imul,e}:Za;var Sc=new Uint32Array(1048576),Za=Rc(b,null,Sc.buffer),Tc=new Uint32Array(0),Uc=_a.prototype=new Number;Uc.toString=ab,Uc.toBytes=bb,Uc.valueOf=cb,Uc.clamp=db,Uc.slice=eb,Uc.negate=fb,Uc.compare=gb,Uc.add=hb,Uc.subtract=ib,Uc.multiply=jb,Uc.square=kb,Uc.divide=lb;var Vc=new _a(0),Wc=new _a(1);Object.freeze(Vc),Object.freeze(Wc);var Xc=ob.prototype=new _a;Xc.reduce=pb,Xc.inverse=qb,Xc.power=rb;var Yc=[2,3];Uc.isProbablePrime=ub,_a.randomProbablePrime=wb,_a.ZERO=Vc,_a.ONE=Wc,_a.extGCD=nb,a.BigNumber=_a,a.Modulus=ob;var Zc=xb.prototype;Zc.reset=yb,Zc.encrypt=zb,Zc.decrypt=Ab,xb.generateKey=Bb;var $c=Cb.prototype;$c.reset=Db,$c.encrypt=Eb,$c.decrypt=Fb;var _c=Hb.prototype;return _c.reset=Ib,_c.sign=Jb,_c.verify=Kb,a.RSA={generateKey:Lb},a.RSA_OAEP=Cb,a.RSA_OAEP_SHA1={encrypt:Mb,decrypt:Nb},a.RSA_OAEP=Cb,a.RSA_OAEP_SHA256={encrypt:Ob,decrypt:Pb},a.RSA_PSS=Hb,a.RSA_PSS_SHA1={sign:Qb,verify:Rb},a.RSA_PSS=Hb,a.RSA_PSS_SHA256={sign:Sb,verify:Tb}, true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return a}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof module&&module.exports?module.exports=a:b.asmCrypto=a,a}({},function(){return this}());
	//# sourceMappingURL=asmcrypto.js.map

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var webcrypto_core_1 = __webpack_require__(6);
	var crypto_1 = __webpack_require__(5);
	var asmCrypto = __webpack_require__(20);
	var ShaCrypto = (function (_super) {
	    __extends(ShaCrypto, _super);
	    function ShaCrypto() {
	        return _super.apply(this, arguments) || this;
	    }
	    ShaCrypto.digest = function (alg, message) {
	        return new Promise(function (resolve) {
	            if (typeof asmCrypto === "undefined")
	                throw new crypto_1.LinerError(crypto_1.LinerError.MODULE_NOT_FOUND, "asmCrypto", "https://github.com/vibornoff/asmcrypto.js");
	            switch (alg.name.toUpperCase()) {
	                case webcrypto_core_1.AlgorithmNames.Sha1:
	                    resolve(asmCrypto.SHA1.bytes(message).buffer);
	                    break;
	                case webcrypto_core_1.AlgorithmNames.Sha256:
	                    resolve(asmCrypto.SHA256.bytes(message).buffer);
	                    break;
	                default:
	                    throw new crypto_1.LinerError("Not supported algorithm '" + alg.name + "'");
	            }
	        });
	    };
	    return ShaCrypto;
	}(webcrypto_core_1.BaseCrypto));
	exports.ShaCrypto = ShaCrypto;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var webcrypto_core_1 = __webpack_require__(6);
	var crypto_1 = __webpack_require__(5);
	var key_1 = __webpack_require__(19);
	var helper_1 = __webpack_require__(3);
	var asmCrypto = __webpack_require__(20);
	function removeLeadingZero(buf) {
	    var first = true;
	    return buf.filter(function (v) {
	        if (first && v === 0)
	            return false;
	        else {
	            first = false;
	            return true;
	        }
	    });
	}
	var RsaCrypto = (function (_super) {
	    __extends(RsaCrypto, _super);
	    function RsaCrypto() {
	        return _super.apply(this, arguments) || this;
	    }
	    RsaCrypto.checkModule = function () {
	        if (typeof asmCrypto === "undefined")
	            throw new crypto_1.LinerError(crypto_1.LinerError.MODULE_NOT_FOUND, "asmCrypto", "https://github.com/vibornoff/asmcrypto.js");
	    };
	    RsaCrypto.filterUsages = function (supported, given) {
	        return supported.filter(function (item1) { return !!given.filter(function (item2) { return item1 === item2; }).length; });
	    };
	    RsaCrypto.generateKey = function (alg, extractable, keyUsage) {
	        var _this = this;
	        return new Promise(function (resolve) {
	            _this.checkModule();
	            var pubExp = alg.publicExponent[0] === 3 ? 3 : 65537;
	            var rsaKey = asmCrypto.RSA.generateKey(alg.modulusLength, pubExp);
	            var privateKey = new key_1.CryptoKey();
	            var publicKey = new key_1.CryptoKey();
	            privateKey.key = publicKey.key = rsaKey;
	            privateKey.algorithm = publicKey.algorithm = alg;
	            privateKey.extractable = extractable;
	            publicKey.extractable = true;
	            privateKey.type = "private";
	            publicKey.type = "public";
	            switch (alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    privateKey.usages = _this.filterUsages(["decrypt", "unwrapKey"], keyUsage);
	                    publicKey.usages = _this.filterUsages(["encrypt", "wrapKey"], keyUsage);
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaPSS.toLowerCase():
	                    privateKey.usages = _this.filterUsages(["sign"], keyUsage);
	                    publicKey.usages = _this.filterUsages(["verify"], keyUsage);
	                    break;
	                default:
	                    throw new crypto_1.LinerError(crypto_1.LinerError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            resolve({ privateKey: privateKey, publicKey: publicKey });
	        });
	    };
	    RsaCrypto.sign = function (algorithm, key, data) {
	        return new Promise(function (resolve, reject) {
	            switch (algorithm.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.RsaPSS.toLowerCase():
	                    var keyAlg = key.algorithm;
	                    var _alg = algorithm;
	                    var sign = void 0;
	                    switch (keyAlg.hash.name.toUpperCase()) {
	                        case webcrypto_core_1.AlgorithmNames.Sha1:
	                            sign = asmCrypto.RSA_PSS_SHA1.sign;
	                            break;
	                        case webcrypto_core_1.AlgorithmNames.Sha256:
	                            sign = asmCrypto.RSA_PSS_SHA256.sign;
	                            break;
	                        default:
	                            throw new crypto_1.LinerError(crypto_1.LinerError.UNSUPPORTED_ALGORITHM, key.algorithm.name);
	                    }
	                    resolve(sign(data, key.key, _alg.saltLength).buffer);
	                    break;
	                default:
	                    throw new crypto_1.LinerError(crypto_1.LinerError.UNSUPPORTED_ALGORITHM, algorithm.name);
	            }
	        });
	    };
	    RsaCrypto.verify = function (algorithm, key, signature, data) {
	        return new Promise(function (resolve, reject) {
	            switch (algorithm.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.RsaPSS.toLowerCase():
	                    var keyAlg = key.algorithm;
	                    var _alg = algorithm;
	                    var verify = void 0;
	                    switch (keyAlg.hash.name.toUpperCase()) {
	                        case webcrypto_core_1.AlgorithmNames.Sha1:
	                            verify = asmCrypto.RSA_PSS_SHA1.verify;
	                            break;
	                        case webcrypto_core_1.AlgorithmNames.Sha256:
	                            verify = asmCrypto.RSA_PSS_SHA256.verify;
	                            break;
	                        default:
	                            throw new crypto_1.LinerError(crypto_1.LinerError.UNSUPPORTED_ALGORITHM, key.algorithm.name);
	                    }
	                    resolve(verify(signature, data, key.key, _alg.saltLength));
	                    break;
	                default:
	                    throw new crypto_1.LinerError(crypto_1.LinerError.UNSUPPORTED_ALGORITHM, algorithm.name);
	            }
	        });
	    };
	    RsaCrypto.encrypt = function (algorithm, key, data) {
	        return new Promise(function (resolve, reject) {
	            switch (algorithm.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    var keyAlg = key.algorithm;
	                    var _alg = algorithm;
	                    var encrypt = void 0;
	                    switch (keyAlg.hash.name.toUpperCase()) {
	                        case webcrypto_core_1.AlgorithmNames.Sha1:
	                            encrypt = asmCrypto.RSA_OAEP_SHA1.encrypt;
	                            break;
	                        case webcrypto_core_1.AlgorithmNames.Sha256:
	                            encrypt = asmCrypto.RSA_OAEP_SHA256.encrypt;
	                            break;
	                        default:
	                            throw new crypto_1.LinerError(crypto_1.LinerError.UNSUPPORTED_ALGORITHM, keyAlg.name + " " + keyAlg.hash.name);
	                    }
	                    resolve(encrypt(data, key.key, _alg.label));
	                    break;
	                default:
	                    throw new crypto_1.LinerError(crypto_1.LinerError.UNSUPPORTED_ALGORITHM, algorithm.name);
	            }
	        });
	    };
	    RsaCrypto.decrypt = function (algorithm, key, data) {
	        return new Promise(function (resolve, reject) {
	            switch (algorithm.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    var keyAlg = key.algorithm;
	                    var _alg = algorithm;
	                    var decrypt = void 0;
	                    switch (keyAlg.hash.name.toUpperCase()) {
	                        case webcrypto_core_1.AlgorithmNames.Sha1:
	                            decrypt = asmCrypto.RSA_OAEP_SHA1.decrypt;
	                            break;
	                        case webcrypto_core_1.AlgorithmNames.Sha256:
	                            decrypt = asmCrypto.RSA_OAEP_SHA256.decrypt;
	                            break;
	                        default:
	                            throw new crypto_1.LinerError(crypto_1.LinerError.UNSUPPORTED_ALGORITHM, keyAlg.name + " " + keyAlg.hash.name);
	                    }
	                    resolve(decrypt(data, key.key, _alg.label));
	                    break;
	                default:
	                    throw new crypto_1.LinerError(crypto_1.LinerError.UNSUPPORTED_ALGORITHM, algorithm.name);
	            }
	        });
	    };
	    RsaCrypto.wrapKey = function (format, key, wrappingKey, wrapAlgorithm) {
	        return new Promise(function (resolve, reject) {
	            self.crypto.subtle.exportKey(format, key)
	                .then(function (data) {
	                var raw;
	                if (!(data instanceof ArrayBuffer)) {
	                    // JWK
	                    raw = helper_1.string2buffer(JSON.stringify(data));
	                }
	                else {
	                    // ArrayBuffer
	                    raw = new Uint8Array(data);
	                }
	                return self.crypto.subtle.encrypt(wrapAlgorithm, wrappingKey, raw);
	            })
	                .then(resolve, reject);
	        });
	    };
	    RsaCrypto.unwrapKey = function (format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            self.crypto.subtle.decrypt(unwrapAlgorithm, unwrappingKey, wrappedKey)
	                .then(function (data) {
	                var _data;
	                if (format.toLowerCase() === "jwk")
	                    _data = JSON.parse(helper_1.buffer2string(new Uint8Array(data)));
	                else
	                    _data = new Uint8Array(data);
	                return self.crypto.subtle.importKey(format, _data, unwrappedKeyAlgorithm, extractable, keyUsages);
	            })
	                .then(resolve, reject);
	        });
	    };
	    RsaCrypto.exportKey = function (format, key) {
	        return new Promise(function (resolve, reject) {
	            if (format.toLowerCase() === "jwk") {
	                var jwk = {
	                    kty: "RSA",
	                    ext: true,
	                    key_ops: key.usages
	                };
	                var hash = key.algorithm.hash;
	                var hashSize = /(\d+)/.exec(hash.name)[1];
	                switch (key.algorithm.name.toUpperCase()) {
	                    case webcrypto_core_1.AlgorithmNames.RsaOAEP.toUpperCase():
	                        jwk.alg = "RSA-OAEP" + (hashSize === "1" ? "" : "-" + hashSize);
	                        break;
	                    case webcrypto_core_1.AlgorithmNames.RsaPSS.toUpperCase():
	                        jwk.alg = "PS" + hashSize;
	                        break;
	                    case webcrypto_core_1.AlgorithmNames.RsaSSA.toUpperCase():
	                        jwk.alg = "RS" + hashSize;
	                        break;
	                    default:
	                        throw new webcrypto_core_1.AlgorithmError(webcrypto_core_1.AlgorithmError.UNSUPPORTED_ALGORITHM, key.algorithm.name);
	                }
	                jwk.n = webcrypto_core_1.Base64Url.encode(removeLeadingZero(key.key[0]));
	                jwk.e = webcrypto_core_1.Base64Url.encode(removeLeadingZero(key.key[1]));
	                if (key.type === "private") {
	                    jwk.d = webcrypto_core_1.Base64Url.encode(removeLeadingZero(key.key[2]));
	                    jwk.p = webcrypto_core_1.Base64Url.encode(removeLeadingZero(key.key[3]));
	                    jwk.q = webcrypto_core_1.Base64Url.encode(removeLeadingZero(key.key[4]));
	                    jwk.dp = webcrypto_core_1.Base64Url.encode(removeLeadingZero(key.key[5]));
	                    jwk.dq = webcrypto_core_1.Base64Url.encode(removeLeadingZero(key.key[6]));
	                    jwk.qi = webcrypto_core_1.Base64Url.encode(removeLeadingZero(key.key[7]));
	                }
	                resolve(jwk);
	            }
	            else {
	                throw new crypto_1.LinerError(crypto_1.LinerError.NOT_SUPPORTED);
	            }
	        });
	    };
	    RsaCrypto.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            var raw;
	            var jwk;
	            var key = new key_1.CryptoKey();
	            key.algorithm = algorithm;
	            key.usages = keyUsages;
	            key.key = [];
	            if (format.toLowerCase() === "jwk") {
	                jwk = keyData;
	                key.key[0] = webcrypto_core_1.Base64Url.decode(jwk.n);
	                key.key[1] = webcrypto_core_1.Base64Url.decode(jwk.e)[0] === 3 ? new Uint8Array([0, 0, 0, 3]) : new Uint8Array([0, 1, 0, 1]);
	                if (jwk.d) {
	                    key.type = "private";
	                    key.key[2] = webcrypto_core_1.Base64Url.decode(jwk.d);
	                    key.key[3] = webcrypto_core_1.Base64Url.decode(jwk.p);
	                    key.key[4] = webcrypto_core_1.Base64Url.decode(jwk.q);
	                    key.key[5] = webcrypto_core_1.Base64Url.decode(jwk.dp);
	                    key.key[6] = webcrypto_core_1.Base64Url.decode(jwk.dq);
	                    key.key[7] = webcrypto_core_1.Base64Url.decode(jwk.qi);
	                }
	                else
	                    key.type = "public";
	                resolve(key);
	            }
	            else
	                throw new crypto_1.LinerError(crypto_1.LinerError.NOT_SUPPORTED);
	            resolve(key);
	        });
	    };
	    return RsaCrypto;
	}(webcrypto_core_1.BaseCrypto));
	exports.RsaCrypto = RsaCrypto;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var webcrypto_core_1 = __webpack_require__(6);
	var crypto_1 = __webpack_require__(5);
	var key_1 = __webpack_require__(19);
	var helper_1 = __webpack_require__(3);
	var elliptic = __webpack_require__(24);
	// Helper
	function b2a(buffer) {
	    var buf = new Uint8Array(buffer);
	    var res = [];
	    for (var i = 0; i < buf.length; i++)
	        res.push(buf[i]);
	    return res;
	}
	function hex2buffer(hexString, padded) {
	    if (hexString.length % 2) {
	        hexString = "0" + hexString;
	    }
	    var res = new Uint8Array(hexString.length / 2);
	    for (var i = 0; i < hexString.length; i++) {
	        var c = hexString.slice(i, ++i + 1);
	        res[(i - 1) / 2] = parseInt(c, 16);
	    }
	    // BN padding
	    if (padded) {
	        var len = res.length;
	        len = len > 32 ? len > 48 ? 66 : 48 : 32;
	        if (res.length < len)
	            res = helper_1.concat(new Uint8Array(len - res.length), res);
	    }
	    return res;
	}
	function buffer2hex(buffer, padded) {
	    var res = "";
	    for (var i = 0; i < buffer.length; i++) {
	        var char = buffer[i].toString(16);
	        res += char.length % 2 ? "0" + char : char;
	    }
	    // BN padding
	    if (padded) {
	        var len = buffer.length;
	        len = len > 32 ? len > 48 ? 66 : 48 : 32;
	        if ((res.length / 2) < len)
	            res = new Array(len * 2 - res.length + 1).join("0") + res;
	    }
	    return res;
	}
	var EcCrypto = (function (_super) {
	    __extends(EcCrypto, _super);
	    function EcCrypto() {
	        return _super.apply(this, arguments) || this;
	    }
	    EcCrypto.checkModule = function () {
	        if (typeof elliptic === "undefined")
	            throw new crypto_1.LinerError(crypto_1.LinerError.MODULE_NOT_FOUND, "elliptic", "https://github.com/indutny/elliptic");
	    };
	    EcCrypto.generateKey = function (alg, extractable, keyUsage) {
	        var _this = this;
	        return new Promise(function (resolve) {
	            _this.checkModule();
	            var _alg = alg;
	            var key = new elliptic.ec(_alg.namedCurve.replace("-", "").toLowerCase()); // converts name to 'p192', ...
	            // set key params
	            var prvKey = new key_1.CryptoKey();
	            var pubKey = new key_1.CryptoKey();
	            prvKey.key = pubKey.key = key.genKeyPair();
	            prvKey.algorithm = pubKey.algorithm = _alg;
	            prvKey.extractable = extractable;
	            pubKey.extractable = true;
	            prvKey.type = "private";
	            pubKey.type = "public";
	            if (alg.name === webcrypto_core_1.AlgorithmNames.EcDSA) {
	                prvKey.usages = ["sign"];
	                pubKey.usages = ["verify"];
	            }
	            else if (alg.name === webcrypto_core_1.AlgorithmNames.EcDH) {
	                prvKey.usages = pubKey.usages = ["deriveKey", "deriveBits"];
	            }
	            resolve({
	                privateKey: prvKey,
	                publicKey: pubKey
	            });
	        });
	    };
	    EcCrypto.sign = function (algorithm, key, data) {
	        return new Promise(function (resolve, reject) {
	            var _alg = algorithm;
	            // get digest
	            self.crypto.subtle.digest(_alg.hash, data)
	                .then(function (hash) {
	                var array = b2a(hash);
	                var signature = key.key.sign(array);
	                var hexSignature = buffer2hex(signature.r.toArray(), true) + buffer2hex(signature.s.toArray(), true);
	                resolve(hex2buffer(hexSignature).buffer);
	            })
	                .catch(reject);
	        });
	    };
	    EcCrypto.verify = function (algorithm, key, signature, data) {
	        return new Promise(function (resolve, reject) {
	            var _alg = algorithm;
	            var sig = {
	                r: signature.slice(0, signature.byteLength / 2),
	                s: signature.slice(signature.byteLength / 2)
	            };
	            // get digest
	            self.crypto.subtle.digest(_alg.hash, data)
	                .then(function (hash) {
	                var array = b2a(hash);
	                resolve(key.key.verify(array, sig));
	            })
	                .catch(reject);
	        });
	    };
	    EcCrypto.deriveKey = function (algorithm, baseKey, derivedKeyType, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.deriveBits(algorithm, baseKey, derivedKeyType.length)
	                .then(function (bits) {
	                return self.crypto.subtle.importKey("raw", new Uint8Array(bits), derivedKeyType, extractable, keyUsages);
	            })
	                .then(resolve, reject);
	        });
	    };
	    EcCrypto.deriveBits = function (algorithm, baseKey, length) {
	        return new Promise(function (resolve, reject) {
	            var promise = Promise.resolve(null);
	            var shared = baseKey.key.derive(algorithm.public.key.getPublic());
	            var array = new Uint8Array(shared.toArray());
	            // Padding
	            var len = array.length;
	            len = len > 32 ? len > 48 ? 66 : 48 : 32;
	            if (array.length < len)
	                array = helper_1.concat(new Uint8Array(len - array.length), array);
	            var buf = array.slice(0, length / 8).buffer;
	            resolve(buf);
	        });
	    };
	    EcCrypto.exportKey = function (format, key) {
	        return new Promise(function (resolve, reject) {
	            var ecKey = key.key;
	            if (format.toLowerCase() === "jwk") {
	                var hexPub = ecKey.getPublic("hex").slice(2); // ignore first '04'
	                var hexX = hexPub.slice(0, hexPub.length / 2);
	                var hexY = hexPub.slice(hexPub.length / 2, hexPub.length);
	                if (key.type === "public") {
	                    // public
	                    var jwk = {
	                        crv: key.algorithm.namedCurve,
	                        ext: key.extractable,
	                        x: webcrypto_core_1.Base64Url.encode(hex2buffer(hexX, true)),
	                        y: webcrypto_core_1.Base64Url.encode(hex2buffer(hexY, true)),
	                        key_ops: [],
	                        kty: "EC"
	                    };
	                    resolve(jwk);
	                }
	                else {
	                    // private
	                    var jwk = {
	                        crv: key.algorithm.namedCurve,
	                        ext: key.extractable,
	                        d: webcrypto_core_1.Base64Url.encode(hex2buffer(ecKey.getPrivate("hex"), true)),
	                        x: webcrypto_core_1.Base64Url.encode(hex2buffer(hexX, true)),
	                        y: webcrypto_core_1.Base64Url.encode(hex2buffer(hexY, true)),
	                        key_ops: key.usages,
	                        kty: "EC"
	                    };
	                    resolve(jwk);
	                }
	            }
	            else {
	                throw new crypto_1.LinerError("Format '" + format + "' is not implemented");
	            }
	        });
	    };
	    EcCrypto.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            var key = new key_1.CryptoKey();
	            key.algorithm = algorithm;
	            if (format.toLowerCase() === "jwk") {
	                var ecKey = new elliptic.ec(keyData.crv.replace("-", "").toLowerCase());
	                if (keyData.d) {
	                    // Private key
	                    key.key = ecKey.keyFromPrivate(webcrypto_core_1.Base64Url.decode(keyData.d));
	                    key.type = "private";
	                }
	                else {
	                    // Public key
	                    var bufferPubKey = helper_1.concat(new Uint8Array([4]), webcrypto_core_1.Base64Url.decode(keyData.x), webcrypto_core_1.Base64Url.decode(keyData.y));
	                    var hexPubKey = buffer2hex(bufferPubKey);
	                    key.key = ecKey.keyFromPublic(hexPubKey, "hex");
	                    key.type = "public";
	                }
	            }
	            else
	                throw new crypto_1.LinerError("Format '" + format + "' is not implemented");
	            key.extractable = extractable;
	            key.usages = keyUsages;
	            resolve(key);
	        });
	    };
	    return EcCrypto;
	}(webcrypto_core_1.BaseCrypto));
	exports.EcCrypto = EcCrypto;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var elliptic = exports;

	elliptic.version = "";
	elliptic.utils = __webpack_require__(25);
	elliptic.rand = __webpack_require__(32);
	elliptic.hmacDRBG = __webpack_require__(34);
	elliptic.curve = __webpack_require__(42);
	elliptic.curves = __webpack_require__(47);

	// Protocols
	elliptic.ec = __webpack_require__(49);
	elliptic.eddsa = __webpack_require__(52);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = exports;
	var BN = __webpack_require__(26);

	utils.assert = function assert(val, msg) {
	  if (!val)
	    throw new Error(msg || 'Assertion failed');
	};

	function toArray(msg, enc) {
	  if (Array.isArray(msg))
	    return msg.slice();
	  if (!msg)
	    return [];
	  var res = [];
	  if (typeof msg !== 'string') {
	    for (var i = 0; i < msg.length; i++)
	      res[i] = msg[i] | 0;
	    return res;
	  }
	  if (!enc) {
	    for (var i = 0; i < msg.length; i++) {
	      var c = msg.charCodeAt(i);
	      var hi = c >> 8;
	      var lo = c & 0xff;
	      if (hi)
	        res.push(hi, lo);
	      else
	        res.push(lo);
	    }
	  } else if (enc === 'hex') {
	    msg = msg.replace(/[^a-z0-9]+/ig, '');
	    if (msg.length % 2 !== 0)
	      msg = '0' + msg;
	    for (var i = 0; i < msg.length; i += 2)
	      res.push(parseInt(msg[i] + msg[i + 1], 16));
	  }
	  return res;
	}
	utils.toArray = toArray;

	function zero2(word) {
	  if (word.length === 1)
	    return '0' + word;
	  else
	    return word;
	}
	utils.zero2 = zero2;

	function toHex(msg) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++)
	    res += zero2(msg[i].toString(16));
	  return res;
	}
	utils.toHex = toHex;

	utils.encode = function encode(arr, enc) {
	  if (enc === 'hex')
	    return toHex(arr);
	  else
	    return arr;
	};

	// Represent num in a w-NAF form
	function getNAF(num, w) {
	  var naf = [];
	  var ws = 1 << (w + 1);
	  var k = num.clone();
	  while (k.cmpn(1) >= 0) {
	    var z;
	    if (k.isOdd()) {
	      var mod = k.andln(ws - 1);
	      if (mod > (ws >> 1) - 1)
	        z = (ws >> 1) - mod;
	      else
	        z = mod;
	      k.isubn(z);
	    } else {
	      z = 0;
	    }
	    naf.push(z);

	    // Optimization, shift by word if possible
	    var shift = (k.cmpn(0) !== 0 && k.andln(ws - 1) === 0) ? (w + 1) : 1;
	    for (var i = 1; i < shift; i++)
	      naf.push(0);
	    k.iushrn(shift);
	  }

	  return naf;
	}
	utils.getNAF = getNAF;

	// Represent k1, k2 in a Joint Sparse Form
	function getJSF(k1, k2) {
	  var jsf = [
	    [],
	    []
	  ];

	  k1 = k1.clone();
	  k2 = k2.clone();
	  var d1 = 0;
	  var d2 = 0;
	  while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {

	    // First phase
	    var m14 = (k1.andln(3) + d1) & 3;
	    var m24 = (k2.andln(3) + d2) & 3;
	    if (m14 === 3)
	      m14 = -1;
	    if (m24 === 3)
	      m24 = -1;
	    var u1;
	    if ((m14 & 1) === 0) {
	      u1 = 0;
	    } else {
	      var m8 = (k1.andln(7) + d1) & 7;
	      if ((m8 === 3 || m8 === 5) && m24 === 2)
	        u1 = -m14;
	      else
	        u1 = m14;
	    }
	    jsf[0].push(u1);

	    var u2;
	    if ((m24 & 1) === 0) {
	      u2 = 0;
	    } else {
	      var m8 = (k2.andln(7) + d2) & 7;
	      if ((m8 === 3 || m8 === 5) && m14 === 2)
	        u2 = -m24;
	      else
	        u2 = m24;
	    }
	    jsf[1].push(u2);

	    // Second phase
	    if (2 * d1 === u1 + 1)
	      d1 = 1 - d1;
	    if (2 * d2 === u2 + 1)
	      d2 = 1 - d2;
	    k1.iushrn(1);
	    k2.iushrn(1);
	  }

	  return jsf;
	}
	utils.getJSF = getJSF;

	function cachedProperty(obj, name, computer) {
	  var key = '_' + name;
	  obj.prototype[name] = function cachedProperty() {
	    return this[key] !== undefined ? this[key] :
	           this[key] = computer.call(this);
	  };
	}
	utils.cachedProperty = cachedProperty;

	function parseBytes(bytes) {
	  return typeof bytes === 'string' ? utils.toArray(bytes, 'hex') :
	                                     bytes;
	}
	utils.parseBytes = parseBytes;

	function intFromLE(bytes) {
	  return new BN(bytes, 'hex', 'le');
	}
	utils.intFromLE = intFromLE;



/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {(function (module, exports) {
	  'use strict';

	  // Utils
	  function assert (val, msg) {
	    if (!val) throw new Error(msg || 'Assertion failed');
	  }

	  // Could use `inherits` module, but don't want to move from single file
	  // architecture yet.
	  function inherits (ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  }

	  // BN

	  function BN (number, base, endian) {
	    if (BN.isBN(number)) {
	      return number;
	    }

	    this.negative = 0;
	    this.words = null;
	    this.length = 0;

	    // Reduction context
	    this.red = null;

	    if (number !== null) {
	      if (base === 'le' || base === 'be') {
	        endian = base;
	        base = 10;
	      }

	      this._init(number || 0, base || 10, endian || 'be');
	    }
	  }
	  if (typeof module === 'object') {
	    module.exports = BN;
	  } else {
	    exports.BN = BN;
	  }

	  BN.BN = BN;
	  BN.wordSize = 26;

	  var Buffer;
	  try {
	    Buffer = __webpack_require__(28).Buffer;
	  } catch (e) {
	  }

	  BN.isBN = function isBN (num) {
	    if (num instanceof BN) {
	      return true;
	    }

	    return num !== null && typeof num === 'object' &&
	      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
	  };

	  BN.max = function max (left, right) {
	    if (left.cmp(right) > 0) return left;
	    return right;
	  };

	  BN.min = function min (left, right) {
	    if (left.cmp(right) < 0) return left;
	    return right;
	  };

	  BN.prototype._init = function init (number, base, endian) {
	    if (typeof number === 'number') {
	      return this._initNumber(number, base, endian);
	    }

	    if (typeof number === 'object') {
	      return this._initArray(number, base, endian);
	    }

	    if (base === 'hex') {
	      base = 16;
	    }
	    assert(base === (base | 0) && base >= 2 && base <= 36);

	    number = number.toString().replace(/\s+/g, '');
	    var start = 0;
	    if (number[0] === '-') {
	      start++;
	    }

	    if (base === 16) {
	      this._parseHex(number, start);
	    } else {
	      this._parseBase(number, base, start);
	    }

	    if (number[0] === '-') {
	      this.negative = 1;
	    }

	    this.strip();

	    if (endian !== 'le') return;

	    this._initArray(this.toArray(), base, endian);
	  };

	  BN.prototype._initNumber = function _initNumber (number, base, endian) {
	    if (number < 0) {
	      this.negative = 1;
	      number = -number;
	    }
	    if (number < 0x4000000) {
	      this.words = [ number & 0x3ffffff ];
	      this.length = 1;
	    } else if (number < 0x10000000000000) {
	      this.words = [
	        number & 0x3ffffff,
	        (number / 0x4000000) & 0x3ffffff
	      ];
	      this.length = 2;
	    } else {
	      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
	      this.words = [
	        number & 0x3ffffff,
	        (number / 0x4000000) & 0x3ffffff,
	        1
	      ];
	      this.length = 3;
	    }

	    if (endian !== 'le') return;

	    // Reverse the bytes
	    this._initArray(this.toArray(), base, endian);
	  };

	  BN.prototype._initArray = function _initArray (number, base, endian) {
	    // Perhaps a Uint8Array
	    assert(typeof number.length === 'number');
	    if (number.length <= 0) {
	      this.words = [ 0 ];
	      this.length = 1;
	      return this;
	    }

	    this.length = Math.ceil(number.length / 3);
	    this.words = new Array(this.length);
	    for (var i = 0; i < this.length; i++) {
	      this.words[i] = 0;
	    }

	    var j, w;
	    var off = 0;
	    if (endian === 'be') {
	      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
	        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
	        this.words[j] |= (w << off) & 0x3ffffff;
	        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
	        off += 24;
	        if (off >= 26) {
	          off -= 26;
	          j++;
	        }
	      }
	    } else if (endian === 'le') {
	      for (i = 0, j = 0; i < number.length; i += 3) {
	        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
	        this.words[j] |= (w << off) & 0x3ffffff;
	        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
	        off += 24;
	        if (off >= 26) {
	          off -= 26;
	          j++;
	        }
	      }
	    }
	    return this.strip();
	  };

	  function parseHex (str, start, end) {
	    var r = 0;
	    var len = Math.min(str.length, end);
	    for (var i = start; i < len; i++) {
	      var c = str.charCodeAt(i) - 48;

	      r <<= 4;

	      // 'a' - 'f'
	      if (c >= 49 && c <= 54) {
	        r |= c - 49 + 0xa;

	      // 'A' - 'F'
	      } else if (c >= 17 && c <= 22) {
	        r |= c - 17 + 0xa;

	      // '0' - '9'
	      } else {
	        r |= c & 0xf;
	      }
	    }
	    return r;
	  }

	  BN.prototype._parseHex = function _parseHex (number, start) {
	    // Create possibly bigger array to ensure that it fits the number
	    this.length = Math.ceil((number.length - start) / 6);
	    this.words = new Array(this.length);
	    for (var i = 0; i < this.length; i++) {
	      this.words[i] = 0;
	    }

	    var j, w;
	    // Scan 24-bit chunks and add them to the number
	    var off = 0;
	    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
	      w = parseHex(number, i, i + 6);
	      this.words[j] |= (w << off) & 0x3ffffff;
	      // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
	      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
	      off += 24;
	      if (off >= 26) {
	        off -= 26;
	        j++;
	      }
	    }
	    if (i + 6 !== start) {
	      w = parseHex(number, start, i + 6);
	      this.words[j] |= (w << off) & 0x3ffffff;
	      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
	    }
	    this.strip();
	  };

	  function parseBase (str, start, end, mul) {
	    var r = 0;
	    var len = Math.min(str.length, end);
	    for (var i = start; i < len; i++) {
	      var c = str.charCodeAt(i) - 48;

	      r *= mul;

	      // 'a'
	      if (c >= 49) {
	        r += c - 49 + 0xa;

	      // 'A'
	      } else if (c >= 17) {
	        r += c - 17 + 0xa;

	      // '0' - '9'
	      } else {
	        r += c;
	      }
	    }
	    return r;
	  }

	  BN.prototype._parseBase = function _parseBase (number, base, start) {
	    // Initialize as zero
	    this.words = [ 0 ];
	    this.length = 1;

	    // Find length of limb in base
	    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
	      limbLen++;
	    }
	    limbLen--;
	    limbPow = (limbPow / base) | 0;

	    var total = number.length - start;
	    var mod = total % limbLen;
	    var end = Math.min(total, total - mod) + start;

	    var word = 0;
	    for (var i = start; i < end; i += limbLen) {
	      word = parseBase(number, i, i + limbLen, base);

	      this.imuln(limbPow);
	      if (this.words[0] + word < 0x4000000) {
	        this.words[0] += word;
	      } else {
	        this._iaddn(word);
	      }
	    }

	    if (mod !== 0) {
	      var pow = 1;
	      word = parseBase(number, i, number.length, base);

	      for (i = 0; i < mod; i++) {
	        pow *= base;
	      }

	      this.imuln(pow);
	      if (this.words[0] + word < 0x4000000) {
	        this.words[0] += word;
	      } else {
	        this._iaddn(word);
	      }
	    }
	  };

	  BN.prototype.copy = function copy (dest) {
	    dest.words = new Array(this.length);
	    for (var i = 0; i < this.length; i++) {
	      dest.words[i] = this.words[i];
	    }
	    dest.length = this.length;
	    dest.negative = this.negative;
	    dest.red = this.red;
	  };

	  BN.prototype.clone = function clone () {
	    var r = new BN(null);
	    this.copy(r);
	    return r;
	  };

	  BN.prototype._expand = function _expand (size) {
	    while (this.length < size) {
	      this.words[this.length++] = 0;
	    }
	    return this;
	  };

	  // Remove leading `0` from `this`
	  BN.prototype.strip = function strip () {
	    while (this.length > 1 && this.words[this.length - 1] === 0) {
	      this.length--;
	    }
	    return this._normSign();
	  };

	  BN.prototype._normSign = function _normSign () {
	    // -0 = 0
	    if (this.length === 1 && this.words[0] === 0) {
	      this.negative = 0;
	    }
	    return this;
	  };

	  BN.prototype.inspect = function inspect () {
	    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
	  };

	  /*

	  var zeros = [];
	  var groupSizes = [];
	  var groupBases = [];

	  var s = '';
	  var i = -1;
	  while (++i < BN.wordSize) {
	    zeros[i] = s;
	    s += '0';
	  }
	  groupSizes[0] = 0;
	  groupSizes[1] = 0;
	  groupBases[0] = 0;
	  groupBases[1] = 0;
	  var base = 2 - 1;
	  while (++base < 36 + 1) {
	    var groupSize = 0;
	    var groupBase = 1;
	    while (groupBase < (1 << BN.wordSize) / base) {
	      groupBase *= base;
	      groupSize += 1;
	    }
	    groupSizes[base] = groupSize;
	    groupBases[base] = groupBase;
	  }

	  */

	  var zeros = [
	    '',
	    '0',
	    '00',
	    '000',
	    '0000',
	    '00000',
	    '000000',
	    '0000000',
	    '00000000',
	    '000000000',
	    '0000000000',
	    '00000000000',
	    '000000000000',
	    '0000000000000',
	    '00000000000000',
	    '000000000000000',
	    '0000000000000000',
	    '00000000000000000',
	    '000000000000000000',
	    '0000000000000000000',
	    '00000000000000000000',
	    '000000000000000000000',
	    '0000000000000000000000',
	    '00000000000000000000000',
	    '000000000000000000000000',
	    '0000000000000000000000000'
	  ];

	  var groupSizes = [
	    0, 0,
	    25, 16, 12, 11, 10, 9, 8,
	    8, 7, 7, 7, 7, 6, 6,
	    6, 6, 6, 6, 6, 5, 5,
	    5, 5, 5, 5, 5, 5, 5,
	    5, 5, 5, 5, 5, 5, 5
	  ];

	  var groupBases = [
	    0, 0,
	    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
	    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
	    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
	    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
	    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
	  ];

	  BN.prototype.toString = function toString (base, padding) {
	    base = base || 10;
	    padding = padding | 0 || 1;

	    var out;
	    if (base === 16 || base === 'hex') {
	      out = '';
	      var off = 0;
	      var carry = 0;
	      for (var i = 0; i < this.length; i++) {
	        var w = this.words[i];
	        var word = (((w << off) | carry) & 0xffffff).toString(16);
	        carry = (w >>> (24 - off)) & 0xffffff;
	        if (carry !== 0 || i !== this.length - 1) {
	          out = zeros[6 - word.length] + word + out;
	        } else {
	          out = word + out;
	        }
	        off += 2;
	        if (off >= 26) {
	          off -= 26;
	          i--;
	        }
	      }
	      if (carry !== 0) {
	        out = carry.toString(16) + out;
	      }
	      while (out.length % padding !== 0) {
	        out = '0' + out;
	      }
	      if (this.negative !== 0) {
	        out = '-' + out;
	      }
	      return out;
	    }

	    if (base === (base | 0) && base >= 2 && base <= 36) {
	      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
	      var groupSize = groupSizes[base];
	      // var groupBase = Math.pow(base, groupSize);
	      var groupBase = groupBases[base];
	      out = '';
	      var c = this.clone();
	      c.negative = 0;
	      while (!c.isZero()) {
	        var r = c.modn(groupBase).toString(base);
	        c = c.idivn(groupBase);

	        if (!c.isZero()) {
	          out = zeros[groupSize - r.length] + r + out;
	        } else {
	          out = r + out;
	        }
	      }
	      if (this.isZero()) {
	        out = '0' + out;
	      }
	      while (out.length % padding !== 0) {
	        out = '0' + out;
	      }
	      if (this.negative !== 0) {
	        out = '-' + out;
	      }
	      return out;
	    }

	    assert(false, 'Base should be between 2 and 36');
	  };

	  BN.prototype.toNumber = function toNumber () {
	    var ret = this.words[0];
	    if (this.length === 2) {
	      ret += this.words[1] * 0x4000000;
	    } else if (this.length === 3 && this.words[2] === 0x01) {
	      // NOTE: at this stage it is known that the top bit is set
	      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
	    } else if (this.length > 2) {
	      assert(false, 'Number can only safely store up to 53 bits');
	    }
	    return (this.negative !== 0) ? -ret : ret;
	  };

	  BN.prototype.toJSON = function toJSON () {
	    return this.toString(16);
	  };

	  BN.prototype.toBuffer = function toBuffer (endian, length) {
	    assert(typeof Buffer !== 'undefined');
	    return this.toArrayLike(Buffer, endian, length);
	  };

	  BN.prototype.toArray = function toArray (endian, length) {
	    return this.toArrayLike(Array, endian, length);
	  };

	  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
	    var byteLength = this.byteLength();
	    var reqLength = length || Math.max(1, byteLength);
	    assert(byteLength <= reqLength, 'byte array longer than desired length');
	    assert(reqLength > 0, 'Requested array length <= 0');

	    this.strip();
	    var littleEndian = endian === 'le';
	    var res = new ArrayType(reqLength);

	    var b, i;
	    var q = this.clone();
	    if (!littleEndian) {
	      // Assume big-endian
	      for (i = 0; i < reqLength - byteLength; i++) {
	        res[i] = 0;
	      }

	      for (i = 0; !q.isZero(); i++) {
	        b = q.andln(0xff);
	        q.iushrn(8);

	        res[reqLength - i - 1] = b;
	      }
	    } else {
	      for (i = 0; !q.isZero(); i++) {
	        b = q.andln(0xff);
	        q.iushrn(8);

	        res[i] = b;
	      }

	      for (; i < reqLength; i++) {
	        res[i] = 0;
	      }
	    }

	    return res;
	  };

	  if (Math.clz32) {
	    BN.prototype._countBits = function _countBits (w) {
	      return 32 - Math.clz32(w);
	    };
	  } else {
	    BN.prototype._countBits = function _countBits (w) {
	      var t = w;
	      var r = 0;
	      if (t >= 0x1000) {
	        r += 13;
	        t >>>= 13;
	      }
	      if (t >= 0x40) {
	        r += 7;
	        t >>>= 7;
	      }
	      if (t >= 0x8) {
	        r += 4;
	        t >>>= 4;
	      }
	      if (t >= 0x02) {
	        r += 2;
	        t >>>= 2;
	      }
	      return r + t;
	    };
	  }

	  BN.prototype._zeroBits = function _zeroBits (w) {
	    // Short-cut
	    if (w === 0) return 26;

	    var t = w;
	    var r = 0;
	    if ((t & 0x1fff) === 0) {
	      r += 13;
	      t >>>= 13;
	    }
	    if ((t & 0x7f) === 0) {
	      r += 7;
	      t >>>= 7;
	    }
	    if ((t & 0xf) === 0) {
	      r += 4;
	      t >>>= 4;
	    }
	    if ((t & 0x3) === 0) {
	      r += 2;
	      t >>>= 2;
	    }
	    if ((t & 0x1) === 0) {
	      r++;
	    }
	    return r;
	  };

	  // Return number of used bits in a BN
	  BN.prototype.bitLength = function bitLength () {
	    var w = this.words[this.length - 1];
	    var hi = this._countBits(w);
	    return (this.length - 1) * 26 + hi;
	  };

	  function toBitArray (num) {
	    var w = new Array(num.bitLength());

	    for (var bit = 0; bit < w.length; bit++) {
	      var off = (bit / 26) | 0;
	      var wbit = bit % 26;

	      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
	    }

	    return w;
	  }

	  // Number of trailing zero bits
	  BN.prototype.zeroBits = function zeroBits () {
	    if (this.isZero()) return 0;

	    var r = 0;
	    for (var i = 0; i < this.length; i++) {
	      var b = this._zeroBits(this.words[i]);
	      r += b;
	      if (b !== 26) break;
	    }
	    return r;
	  };

	  BN.prototype.byteLength = function byteLength () {
	    return Math.ceil(this.bitLength() / 8);
	  };

	  BN.prototype.toTwos = function toTwos (width) {
	    if (this.negative !== 0) {
	      return this.abs().inotn(width).iaddn(1);
	    }
	    return this.clone();
	  };

	  BN.prototype.fromTwos = function fromTwos (width) {
	    if (this.testn(width - 1)) {
	      return this.notn(width).iaddn(1).ineg();
	    }
	    return this.clone();
	  };

	  BN.prototype.isNeg = function isNeg () {
	    return this.negative !== 0;
	  };

	  // Return negative clone of `this`
	  BN.prototype.neg = function neg () {
	    return this.clone().ineg();
	  };

	  BN.prototype.ineg = function ineg () {
	    if (!this.isZero()) {
	      this.negative ^= 1;
	    }

	    return this;
	  };

	  // Or `num` with `this` in-place
	  BN.prototype.iuor = function iuor (num) {
	    while (this.length < num.length) {
	      this.words[this.length++] = 0;
	    }

	    for (var i = 0; i < num.length; i++) {
	      this.words[i] = this.words[i] | num.words[i];
	    }

	    return this.strip();
	  };

	  BN.prototype.ior = function ior (num) {
	    assert((this.negative | num.negative) === 0);
	    return this.iuor(num);
	  };

	  // Or `num` with `this`
	  BN.prototype.or = function or (num) {
	    if (this.length > num.length) return this.clone().ior(num);
	    return num.clone().ior(this);
	  };

	  BN.prototype.uor = function uor (num) {
	    if (this.length > num.length) return this.clone().iuor(num);
	    return num.clone().iuor(this);
	  };

	  // And `num` with `this` in-place
	  BN.prototype.iuand = function iuand (num) {
	    // b = min-length(num, this)
	    var b;
	    if (this.length > num.length) {
	      b = num;
	    } else {
	      b = this;
	    }

	    for (var i = 0; i < b.length; i++) {
	      this.words[i] = this.words[i] & num.words[i];
	    }

	    this.length = b.length;

	    return this.strip();
	  };

	  BN.prototype.iand = function iand (num) {
	    assert((this.negative | num.negative) === 0);
	    return this.iuand(num);
	  };

	  // And `num` with `this`
	  BN.prototype.and = function and (num) {
	    if (this.length > num.length) return this.clone().iand(num);
	    return num.clone().iand(this);
	  };

	  BN.prototype.uand = function uand (num) {
	    if (this.length > num.length) return this.clone().iuand(num);
	    return num.clone().iuand(this);
	  };

	  // Xor `num` with `this` in-place
	  BN.prototype.iuxor = function iuxor (num) {
	    // a.length > b.length
	    var a;
	    var b;
	    if (this.length > num.length) {
	      a = this;
	      b = num;
	    } else {
	      a = num;
	      b = this;
	    }

	    for (var i = 0; i < b.length; i++) {
	      this.words[i] = a.words[i] ^ b.words[i];
	    }

	    if (this !== a) {
	      for (; i < a.length; i++) {
	        this.words[i] = a.words[i];
	      }
	    }

	    this.length = a.length;

	    return this.strip();
	  };

	  BN.prototype.ixor = function ixor (num) {
	    assert((this.negative | num.negative) === 0);
	    return this.iuxor(num);
	  };

	  // Xor `num` with `this`
	  BN.prototype.xor = function xor (num) {
	    if (this.length > num.length) return this.clone().ixor(num);
	    return num.clone().ixor(this);
	  };

	  BN.prototype.uxor = function uxor (num) {
	    if (this.length > num.length) return this.clone().iuxor(num);
	    return num.clone().iuxor(this);
	  };

	  // Not ``this`` with ``width`` bitwidth
	  BN.prototype.inotn = function inotn (width) {
	    assert(typeof width === 'number' && width >= 0);

	    var bytesNeeded = Math.ceil(width / 26) | 0;
	    var bitsLeft = width % 26;

	    // Extend the buffer with leading zeroes
	    this._expand(bytesNeeded);

	    if (bitsLeft > 0) {
	      bytesNeeded--;
	    }

	    // Handle complete words
	    for (var i = 0; i < bytesNeeded; i++) {
	      this.words[i] = ~this.words[i] & 0x3ffffff;
	    }

	    // Handle the residue
	    if (bitsLeft > 0) {
	      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
	    }

	    // And remove leading zeroes
	    return this.strip();
	  };

	  BN.prototype.notn = function notn (width) {
	    return this.clone().inotn(width);
	  };

	  // Set `bit` of `this`
	  BN.prototype.setn = function setn (bit, val) {
	    assert(typeof bit === 'number' && bit >= 0);

	    var off = (bit / 26) | 0;
	    var wbit = bit % 26;

	    this._expand(off + 1);

	    if (val) {
	      this.words[off] = this.words[off] | (1 << wbit);
	    } else {
	      this.words[off] = this.words[off] & ~(1 << wbit);
	    }

	    return this.strip();
	  };

	  // Add `num` to `this` in-place
	  BN.prototype.iadd = function iadd (num) {
	    var r;

	    // negative + positive
	    if (this.negative !== 0 && num.negative === 0) {
	      this.negative = 0;
	      r = this.isub(num);
	      this.negative ^= 1;
	      return this._normSign();

	    // positive + negative
	    } else if (this.negative === 0 && num.negative !== 0) {
	      num.negative = 0;
	      r = this.isub(num);
	      num.negative = 1;
	      return r._normSign();
	    }

	    // a.length > b.length
	    var a, b;
	    if (this.length > num.length) {
	      a = this;
	      b = num;
	    } else {
	      a = num;
	      b = this;
	    }

	    var carry = 0;
	    for (var i = 0; i < b.length; i++) {
	      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
	      this.words[i] = r & 0x3ffffff;
	      carry = r >>> 26;
	    }
	    for (; carry !== 0 && i < a.length; i++) {
	      r = (a.words[i] | 0) + carry;
	      this.words[i] = r & 0x3ffffff;
	      carry = r >>> 26;
	    }

	    this.length = a.length;
	    if (carry !== 0) {
	      this.words[this.length] = carry;
	      this.length++;
	    // Copy the rest of the words
	    } else if (a !== this) {
	      for (; i < a.length; i++) {
	        this.words[i] = a.words[i];
	      }
	    }

	    return this;
	  };

	  // Add `num` to `this`
	  BN.prototype.add = function add (num) {
	    var res;
	    if (num.negative !== 0 && this.negative === 0) {
	      num.negative = 0;
	      res = this.sub(num);
	      num.negative ^= 1;
	      return res;
	    } else if (num.negative === 0 && this.negative !== 0) {
	      this.negative = 0;
	      res = num.sub(this);
	      this.negative = 1;
	      return res;
	    }

	    if (this.length > num.length) return this.clone().iadd(num);

	    return num.clone().iadd(this);
	  };

	  // Subtract `num` from `this` in-place
	  BN.prototype.isub = function isub (num) {
	    // this - (-num) = this + num
	    if (num.negative !== 0) {
	      num.negative = 0;
	      var r = this.iadd(num);
	      num.negative = 1;
	      return r._normSign();

	    // -this - num = -(this + num)
	    } else if (this.negative !== 0) {
	      this.negative = 0;
	      this.iadd(num);
	      this.negative = 1;
	      return this._normSign();
	    }

	    // At this point both numbers are positive
	    var cmp = this.cmp(num);

	    // Optimization - zeroify
	    if (cmp === 0) {
	      this.negative = 0;
	      this.length = 1;
	      this.words[0] = 0;
	      return this;
	    }

	    // a > b
	    var a, b;
	    if (cmp > 0) {
	      a = this;
	      b = num;
	    } else {
	      a = num;
	      b = this;
	    }

	    var carry = 0;
	    for (var i = 0; i < b.length; i++) {
	      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
	      carry = r >> 26;
	      this.words[i] = r & 0x3ffffff;
	    }
	    for (; carry !== 0 && i < a.length; i++) {
	      r = (a.words[i] | 0) + carry;
	      carry = r >> 26;
	      this.words[i] = r & 0x3ffffff;
	    }

	    // Copy rest of the words
	    if (carry === 0 && i < a.length && a !== this) {
	      for (; i < a.length; i++) {
	        this.words[i] = a.words[i];
	      }
	    }

	    this.length = Math.max(this.length, i);

	    if (a !== this) {
	      this.negative = 1;
	    }

	    return this.strip();
	  };

	  // Subtract `num` from `this`
	  BN.prototype.sub = function sub (num) {
	    return this.clone().isub(num);
	  };

	  function smallMulTo (self, num, out) {
	    out.negative = num.negative ^ self.negative;
	    var len = (self.length + num.length) | 0;
	    out.length = len;
	    len = (len - 1) | 0;

	    // Peel one iteration (compiler can't do it, because of code complexity)
	    var a = self.words[0] | 0;
	    var b = num.words[0] | 0;
	    var r = a * b;

	    var lo = r & 0x3ffffff;
	    var carry = (r / 0x4000000) | 0;
	    out.words[0] = lo;

	    for (var k = 1; k < len; k++) {
	      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
	      // note that ncarry could be >= 0x3ffffff
	      var ncarry = carry >>> 26;
	      var rword = carry & 0x3ffffff;
	      var maxJ = Math.min(k, num.length - 1);
	      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
	        var i = (k - j) | 0;
	        a = self.words[i] | 0;
	        b = num.words[j] | 0;
	        r = a * b + rword;
	        ncarry += (r / 0x4000000) | 0;
	        rword = r & 0x3ffffff;
	      }
	      out.words[k] = rword | 0;
	      carry = ncarry | 0;
	    }
	    if (carry !== 0) {
	      out.words[k] = carry | 0;
	    } else {
	      out.length--;
	    }

	    return out.strip();
	  }

	  // TODO(indutny): it may be reasonable to omit it for users who don't need
	  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
	  // multiplication (like elliptic secp256k1).
	  var comb10MulTo = function comb10MulTo (self, num, out) {
	    var a = self.words;
	    var b = num.words;
	    var o = out.words;
	    var c = 0;
	    var lo;
	    var mid;
	    var hi;
	    var a0 = a[0] | 0;
	    var al0 = a0 & 0x1fff;
	    var ah0 = a0 >>> 13;
	    var a1 = a[1] | 0;
	    var al1 = a1 & 0x1fff;
	    var ah1 = a1 >>> 13;
	    var a2 = a[2] | 0;
	    var al2 = a2 & 0x1fff;
	    var ah2 = a2 >>> 13;
	    var a3 = a[3] | 0;
	    var al3 = a3 & 0x1fff;
	    var ah3 = a3 >>> 13;
	    var a4 = a[4] | 0;
	    var al4 = a4 & 0x1fff;
	    var ah4 = a4 >>> 13;
	    var a5 = a[5] | 0;
	    var al5 = a5 & 0x1fff;
	    var ah5 = a5 >>> 13;
	    var a6 = a[6] | 0;
	    var al6 = a6 & 0x1fff;
	    var ah6 = a6 >>> 13;
	    var a7 = a[7] | 0;
	    var al7 = a7 & 0x1fff;
	    var ah7 = a7 >>> 13;
	    var a8 = a[8] | 0;
	    var al8 = a8 & 0x1fff;
	    var ah8 = a8 >>> 13;
	    var a9 = a[9] | 0;
	    var al9 = a9 & 0x1fff;
	    var ah9 = a9 >>> 13;
	    var b0 = b[0] | 0;
	    var bl0 = b0 & 0x1fff;
	    var bh0 = b0 >>> 13;
	    var b1 = b[1] | 0;
	    var bl1 = b1 & 0x1fff;
	    var bh1 = b1 >>> 13;
	    var b2 = b[2] | 0;
	    var bl2 = b2 & 0x1fff;
	    var bh2 = b2 >>> 13;
	    var b3 = b[3] | 0;
	    var bl3 = b3 & 0x1fff;
	    var bh3 = b3 >>> 13;
	    var b4 = b[4] | 0;
	    var bl4 = b4 & 0x1fff;
	    var bh4 = b4 >>> 13;
	    var b5 = b[5] | 0;
	    var bl5 = b5 & 0x1fff;
	    var bh5 = b5 >>> 13;
	    var b6 = b[6] | 0;
	    var bl6 = b6 & 0x1fff;
	    var bh6 = b6 >>> 13;
	    var b7 = b[7] | 0;
	    var bl7 = b7 & 0x1fff;
	    var bh7 = b7 >>> 13;
	    var b8 = b[8] | 0;
	    var bl8 = b8 & 0x1fff;
	    var bh8 = b8 >>> 13;
	    var b9 = b[9] | 0;
	    var bl9 = b9 & 0x1fff;
	    var bh9 = b9 >>> 13;

	    out.negative = self.negative ^ num.negative;
	    out.length = 19;
	    /* k = 0 */
	    lo = Math.imul(al0, bl0);
	    mid = Math.imul(al0, bh0);
	    mid = (mid + Math.imul(ah0, bl0)) | 0;
	    hi = Math.imul(ah0, bh0);
	    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
	    w0 &= 0x3ffffff;
	    /* k = 1 */
	    lo = Math.imul(al1, bl0);
	    mid = Math.imul(al1, bh0);
	    mid = (mid + Math.imul(ah1, bl0)) | 0;
	    hi = Math.imul(ah1, bh0);
	    lo = (lo + Math.imul(al0, bl1)) | 0;
	    mid = (mid + Math.imul(al0, bh1)) | 0;
	    mid = (mid + Math.imul(ah0, bl1)) | 0;
	    hi = (hi + Math.imul(ah0, bh1)) | 0;
	    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
	    w1 &= 0x3ffffff;
	    /* k = 2 */
	    lo = Math.imul(al2, bl0);
	    mid = Math.imul(al2, bh0);
	    mid = (mid + Math.imul(ah2, bl0)) | 0;
	    hi = Math.imul(ah2, bh0);
	    lo = (lo + Math.imul(al1, bl1)) | 0;
	    mid = (mid + Math.imul(al1, bh1)) | 0;
	    mid = (mid + Math.imul(ah1, bl1)) | 0;
	    hi = (hi + Math.imul(ah1, bh1)) | 0;
	    lo = (lo + Math.imul(al0, bl2)) | 0;
	    mid = (mid + Math.imul(al0, bh2)) | 0;
	    mid = (mid + Math.imul(ah0, bl2)) | 0;
	    hi = (hi + Math.imul(ah0, bh2)) | 0;
	    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
	    w2 &= 0x3ffffff;
	    /* k = 3 */
	    lo = Math.imul(al3, bl0);
	    mid = Math.imul(al3, bh0);
	    mid = (mid + Math.imul(ah3, bl0)) | 0;
	    hi = Math.imul(ah3, bh0);
	    lo = (lo + Math.imul(al2, bl1)) | 0;
	    mid = (mid + Math.imul(al2, bh1)) | 0;
	    mid = (mid + Math.imul(ah2, bl1)) | 0;
	    hi = (hi + Math.imul(ah2, bh1)) | 0;
	    lo = (lo + Math.imul(al1, bl2)) | 0;
	    mid = (mid + Math.imul(al1, bh2)) | 0;
	    mid = (mid + Math.imul(ah1, bl2)) | 0;
	    hi = (hi + Math.imul(ah1, bh2)) | 0;
	    lo = (lo + Math.imul(al0, bl3)) | 0;
	    mid = (mid + Math.imul(al0, bh3)) | 0;
	    mid = (mid + Math.imul(ah0, bl3)) | 0;
	    hi = (hi + Math.imul(ah0, bh3)) | 0;
	    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
	    w3 &= 0x3ffffff;
	    /* k = 4 */
	    lo = Math.imul(al4, bl0);
	    mid = Math.imul(al4, bh0);
	    mid = (mid + Math.imul(ah4, bl0)) | 0;
	    hi = Math.imul(ah4, bh0);
	    lo = (lo + Math.imul(al3, bl1)) | 0;
	    mid = (mid + Math.imul(al3, bh1)) | 0;
	    mid = (mid + Math.imul(ah3, bl1)) | 0;
	    hi = (hi + Math.imul(ah3, bh1)) | 0;
	    lo = (lo + Math.imul(al2, bl2)) | 0;
	    mid = (mid + Math.imul(al2, bh2)) | 0;
	    mid = (mid + Math.imul(ah2, bl2)) | 0;
	    hi = (hi + Math.imul(ah2, bh2)) | 0;
	    lo = (lo + Math.imul(al1, bl3)) | 0;
	    mid = (mid + Math.imul(al1, bh3)) | 0;
	    mid = (mid + Math.imul(ah1, bl3)) | 0;
	    hi = (hi + Math.imul(ah1, bh3)) | 0;
	    lo = (lo + Math.imul(al0, bl4)) | 0;
	    mid = (mid + Math.imul(al0, bh4)) | 0;
	    mid = (mid + Math.imul(ah0, bl4)) | 0;
	    hi = (hi + Math.imul(ah0, bh4)) | 0;
	    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
	    w4 &= 0x3ffffff;
	    /* k = 5 */
	    lo = Math.imul(al5, bl0);
	    mid = Math.imul(al5, bh0);
	    mid = (mid + Math.imul(ah5, bl0)) | 0;
	    hi = Math.imul(ah5, bh0);
	    lo = (lo + Math.imul(al4, bl1)) | 0;
	    mid = (mid + Math.imul(al4, bh1)) | 0;
	    mid = (mid + Math.imul(ah4, bl1)) | 0;
	    hi = (hi + Math.imul(ah4, bh1)) | 0;
	    lo = (lo + Math.imul(al3, bl2)) | 0;
	    mid = (mid + Math.imul(al3, bh2)) | 0;
	    mid = (mid + Math.imul(ah3, bl2)) | 0;
	    hi = (hi + Math.imul(ah3, bh2)) | 0;
	    lo = (lo + Math.imul(al2, bl3)) | 0;
	    mid = (mid + Math.imul(al2, bh3)) | 0;
	    mid = (mid + Math.imul(ah2, bl3)) | 0;
	    hi = (hi + Math.imul(ah2, bh3)) | 0;
	    lo = (lo + Math.imul(al1, bl4)) | 0;
	    mid = (mid + Math.imul(al1, bh4)) | 0;
	    mid = (mid + Math.imul(ah1, bl4)) | 0;
	    hi = (hi + Math.imul(ah1, bh4)) | 0;
	    lo = (lo + Math.imul(al0, bl5)) | 0;
	    mid = (mid + Math.imul(al0, bh5)) | 0;
	    mid = (mid + Math.imul(ah0, bl5)) | 0;
	    hi = (hi + Math.imul(ah0, bh5)) | 0;
	    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
	    w5 &= 0x3ffffff;
	    /* k = 6 */
	    lo = Math.imul(al6, bl0);
	    mid = Math.imul(al6, bh0);
	    mid = (mid + Math.imul(ah6, bl0)) | 0;
	    hi = Math.imul(ah6, bh0);
	    lo = (lo + Math.imul(al5, bl1)) | 0;
	    mid = (mid + Math.imul(al5, bh1)) | 0;
	    mid = (mid + Math.imul(ah5, bl1)) | 0;
	    hi = (hi + Math.imul(ah5, bh1)) | 0;
	    lo = (lo + Math.imul(al4, bl2)) | 0;
	    mid = (mid + Math.imul(al4, bh2)) | 0;
	    mid = (mid + Math.imul(ah4, bl2)) | 0;
	    hi = (hi + Math.imul(ah4, bh2)) | 0;
	    lo = (lo + Math.imul(al3, bl3)) | 0;
	    mid = (mid + Math.imul(al3, bh3)) | 0;
	    mid = (mid + Math.imul(ah3, bl3)) | 0;
	    hi = (hi + Math.imul(ah3, bh3)) | 0;
	    lo = (lo + Math.imul(al2, bl4)) | 0;
	    mid = (mid + Math.imul(al2, bh4)) | 0;
	    mid = (mid + Math.imul(ah2, bl4)) | 0;
	    hi = (hi + Math.imul(ah2, bh4)) | 0;
	    lo = (lo + Math.imul(al1, bl5)) | 0;
	    mid = (mid + Math.imul(al1, bh5)) | 0;
	    mid = (mid + Math.imul(ah1, bl5)) | 0;
	    hi = (hi + Math.imul(ah1, bh5)) | 0;
	    lo = (lo + Math.imul(al0, bl6)) | 0;
	    mid = (mid + Math.imul(al0, bh6)) | 0;
	    mid = (mid + Math.imul(ah0, bl6)) | 0;
	    hi = (hi + Math.imul(ah0, bh6)) | 0;
	    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
	    w6 &= 0x3ffffff;
	    /* k = 7 */
	    lo = Math.imul(al7, bl0);
	    mid = Math.imul(al7, bh0);
	    mid = (mid + Math.imul(ah7, bl0)) | 0;
	    hi = Math.imul(ah7, bh0);
	    lo = (lo + Math.imul(al6, bl1)) | 0;
	    mid = (mid + Math.imul(al6, bh1)) | 0;
	    mid = (mid + Math.imul(ah6, bl1)) | 0;
	    hi = (hi + Math.imul(ah6, bh1)) | 0;
	    lo = (lo + Math.imul(al5, bl2)) | 0;
	    mid = (mid + Math.imul(al5, bh2)) | 0;
	    mid = (mid + Math.imul(ah5, bl2)) | 0;
	    hi = (hi + Math.imul(ah5, bh2)) | 0;
	    lo = (lo + Math.imul(al4, bl3)) | 0;
	    mid = (mid + Math.imul(al4, bh3)) | 0;
	    mid = (mid + Math.imul(ah4, bl3)) | 0;
	    hi = (hi + Math.imul(ah4, bh3)) | 0;
	    lo = (lo + Math.imul(al3, bl4)) | 0;
	    mid = (mid + Math.imul(al3, bh4)) | 0;
	    mid = (mid + Math.imul(ah3, bl4)) | 0;
	    hi = (hi + Math.imul(ah3, bh4)) | 0;
	    lo = (lo + Math.imul(al2, bl5)) | 0;
	    mid = (mid + Math.imul(al2, bh5)) | 0;
	    mid = (mid + Math.imul(ah2, bl5)) | 0;
	    hi = (hi + Math.imul(ah2, bh5)) | 0;
	    lo = (lo + Math.imul(al1, bl6)) | 0;
	    mid = (mid + Math.imul(al1, bh6)) | 0;
	    mid = (mid + Math.imul(ah1, bl6)) | 0;
	    hi = (hi + Math.imul(ah1, bh6)) | 0;
	    lo = (lo + Math.imul(al0, bl7)) | 0;
	    mid = (mid + Math.imul(al0, bh7)) | 0;
	    mid = (mid + Math.imul(ah0, bl7)) | 0;
	    hi = (hi + Math.imul(ah0, bh7)) | 0;
	    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
	    w7 &= 0x3ffffff;
	    /* k = 8 */
	    lo = Math.imul(al8, bl0);
	    mid = Math.imul(al8, bh0);
	    mid = (mid + Math.imul(ah8, bl0)) | 0;
	    hi = Math.imul(ah8, bh0);
	    lo = (lo + Math.imul(al7, bl1)) | 0;
	    mid = (mid + Math.imul(al7, bh1)) | 0;
	    mid = (mid + Math.imul(ah7, bl1)) | 0;
	    hi = (hi + Math.imul(ah7, bh1)) | 0;
	    lo = (lo + Math.imul(al6, bl2)) | 0;
	    mid = (mid + Math.imul(al6, bh2)) | 0;
	    mid = (mid + Math.imul(ah6, bl2)) | 0;
	    hi = (hi + Math.imul(ah6, bh2)) | 0;
	    lo = (lo + Math.imul(al5, bl3)) | 0;
	    mid = (mid + Math.imul(al5, bh3)) | 0;
	    mid = (mid + Math.imul(ah5, bl3)) | 0;
	    hi = (hi + Math.imul(ah5, bh3)) | 0;
	    lo = (lo + Math.imul(al4, bl4)) | 0;
	    mid = (mid + Math.imul(al4, bh4)) | 0;
	    mid = (mid + Math.imul(ah4, bl4)) | 0;
	    hi = (hi + Math.imul(ah4, bh4)) | 0;
	    lo = (lo + Math.imul(al3, bl5)) | 0;
	    mid = (mid + Math.imul(al3, bh5)) | 0;
	    mid = (mid + Math.imul(ah3, bl5)) | 0;
	    hi = (hi + Math.imul(ah3, bh5)) | 0;
	    lo = (lo + Math.imul(al2, bl6)) | 0;
	    mid = (mid + Math.imul(al2, bh6)) | 0;
	    mid = (mid + Math.imul(ah2, bl6)) | 0;
	    hi = (hi + Math.imul(ah2, bh6)) | 0;
	    lo = (lo + Math.imul(al1, bl7)) | 0;
	    mid = (mid + Math.imul(al1, bh7)) | 0;
	    mid = (mid + Math.imul(ah1, bl7)) | 0;
	    hi = (hi + Math.imul(ah1, bh7)) | 0;
	    lo = (lo + Math.imul(al0, bl8)) | 0;
	    mid = (mid + Math.imul(al0, bh8)) | 0;
	    mid = (mid + Math.imul(ah0, bl8)) | 0;
	    hi = (hi + Math.imul(ah0, bh8)) | 0;
	    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
	    w8 &= 0x3ffffff;
	    /* k = 9 */
	    lo = Math.imul(al9, bl0);
	    mid = Math.imul(al9, bh0);
	    mid = (mid + Math.imul(ah9, bl0)) | 0;
	    hi = Math.imul(ah9, bh0);
	    lo = (lo + Math.imul(al8, bl1)) | 0;
	    mid = (mid + Math.imul(al8, bh1)) | 0;
	    mid = (mid + Math.imul(ah8, bl1)) | 0;
	    hi = (hi + Math.imul(ah8, bh1)) | 0;
	    lo = (lo + Math.imul(al7, bl2)) | 0;
	    mid = (mid + Math.imul(al7, bh2)) | 0;
	    mid = (mid + Math.imul(ah7, bl2)) | 0;
	    hi = (hi + Math.imul(ah7, bh2)) | 0;
	    lo = (lo + Math.imul(al6, bl3)) | 0;
	    mid = (mid + Math.imul(al6, bh3)) | 0;
	    mid = (mid + Math.imul(ah6, bl3)) | 0;
	    hi = (hi + Math.imul(ah6, bh3)) | 0;
	    lo = (lo + Math.imul(al5, bl4)) | 0;
	    mid = (mid + Math.imul(al5, bh4)) | 0;
	    mid = (mid + Math.imul(ah5, bl4)) | 0;
	    hi = (hi + Math.imul(ah5, bh4)) | 0;
	    lo = (lo + Math.imul(al4, bl5)) | 0;
	    mid = (mid + Math.imul(al4, bh5)) | 0;
	    mid = (mid + Math.imul(ah4, bl5)) | 0;
	    hi = (hi + Math.imul(ah4, bh5)) | 0;
	    lo = (lo + Math.imul(al3, bl6)) | 0;
	    mid = (mid + Math.imul(al3, bh6)) | 0;
	    mid = (mid + Math.imul(ah3, bl6)) | 0;
	    hi = (hi + Math.imul(ah3, bh6)) | 0;
	    lo = (lo + Math.imul(al2, bl7)) | 0;
	    mid = (mid + Math.imul(al2, bh7)) | 0;
	    mid = (mid + Math.imul(ah2, bl7)) | 0;
	    hi = (hi + Math.imul(ah2, bh7)) | 0;
	    lo = (lo + Math.imul(al1, bl8)) | 0;
	    mid = (mid + Math.imul(al1, bh8)) | 0;
	    mid = (mid + Math.imul(ah1, bl8)) | 0;
	    hi = (hi + Math.imul(ah1, bh8)) | 0;
	    lo = (lo + Math.imul(al0, bl9)) | 0;
	    mid = (mid + Math.imul(al0, bh9)) | 0;
	    mid = (mid + Math.imul(ah0, bl9)) | 0;
	    hi = (hi + Math.imul(ah0, bh9)) | 0;
	    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
	    w9 &= 0x3ffffff;
	    /* k = 10 */
	    lo = Math.imul(al9, bl1);
	    mid = Math.imul(al9, bh1);
	    mid = (mid + Math.imul(ah9, bl1)) | 0;
	    hi = Math.imul(ah9, bh1);
	    lo = (lo + Math.imul(al8, bl2)) | 0;
	    mid = (mid + Math.imul(al8, bh2)) | 0;
	    mid = (mid + Math.imul(ah8, bl2)) | 0;
	    hi = (hi + Math.imul(ah8, bh2)) | 0;
	    lo = (lo + Math.imul(al7, bl3)) | 0;
	    mid = (mid + Math.imul(al7, bh3)) | 0;
	    mid = (mid + Math.imul(ah7, bl3)) | 0;
	    hi = (hi + Math.imul(ah7, bh3)) | 0;
	    lo = (lo + Math.imul(al6, bl4)) | 0;
	    mid = (mid + Math.imul(al6, bh4)) | 0;
	    mid = (mid + Math.imul(ah6, bl4)) | 0;
	    hi = (hi + Math.imul(ah6, bh4)) | 0;
	    lo = (lo + Math.imul(al5, bl5)) | 0;
	    mid = (mid + Math.imul(al5, bh5)) | 0;
	    mid = (mid + Math.imul(ah5, bl5)) | 0;
	    hi = (hi + Math.imul(ah5, bh5)) | 0;
	    lo = (lo + Math.imul(al4, bl6)) | 0;
	    mid = (mid + Math.imul(al4, bh6)) | 0;
	    mid = (mid + Math.imul(ah4, bl6)) | 0;
	    hi = (hi + Math.imul(ah4, bh6)) | 0;
	    lo = (lo + Math.imul(al3, bl7)) | 0;
	    mid = (mid + Math.imul(al3, bh7)) | 0;
	    mid = (mid + Math.imul(ah3, bl7)) | 0;
	    hi = (hi + Math.imul(ah3, bh7)) | 0;
	    lo = (lo + Math.imul(al2, bl8)) | 0;
	    mid = (mid + Math.imul(al2, bh8)) | 0;
	    mid = (mid + Math.imul(ah2, bl8)) | 0;
	    hi = (hi + Math.imul(ah2, bh8)) | 0;
	    lo = (lo + Math.imul(al1, bl9)) | 0;
	    mid = (mid + Math.imul(al1, bh9)) | 0;
	    mid = (mid + Math.imul(ah1, bl9)) | 0;
	    hi = (hi + Math.imul(ah1, bh9)) | 0;
	    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
	    w10 &= 0x3ffffff;
	    /* k = 11 */
	    lo = Math.imul(al9, bl2);
	    mid = Math.imul(al9, bh2);
	    mid = (mid + Math.imul(ah9, bl2)) | 0;
	    hi = Math.imul(ah9, bh2);
	    lo = (lo + Math.imul(al8, bl3)) | 0;
	    mid = (mid + Math.imul(al8, bh3)) | 0;
	    mid = (mid + Math.imul(ah8, bl3)) | 0;
	    hi = (hi + Math.imul(ah8, bh3)) | 0;
	    lo = (lo + Math.imul(al7, bl4)) | 0;
	    mid = (mid + Math.imul(al7, bh4)) | 0;
	    mid = (mid + Math.imul(ah7, bl4)) | 0;
	    hi = (hi + Math.imul(ah7, bh4)) | 0;
	    lo = (lo + Math.imul(al6, bl5)) | 0;
	    mid = (mid + Math.imul(al6, bh5)) | 0;
	    mid = (mid + Math.imul(ah6, bl5)) | 0;
	    hi = (hi + Math.imul(ah6, bh5)) | 0;
	    lo = (lo + Math.imul(al5, bl6)) | 0;
	    mid = (mid + Math.imul(al5, bh6)) | 0;
	    mid = (mid + Math.imul(ah5, bl6)) | 0;
	    hi = (hi + Math.imul(ah5, bh6)) | 0;
	    lo = (lo + Math.imul(al4, bl7)) | 0;
	    mid = (mid + Math.imul(al4, bh7)) | 0;
	    mid = (mid + Math.imul(ah4, bl7)) | 0;
	    hi = (hi + Math.imul(ah4, bh7)) | 0;
	    lo = (lo + Math.imul(al3, bl8)) | 0;
	    mid = (mid + Math.imul(al3, bh8)) | 0;
	    mid = (mid + Math.imul(ah3, bl8)) | 0;
	    hi = (hi + Math.imul(ah3, bh8)) | 0;
	    lo = (lo + Math.imul(al2, bl9)) | 0;
	    mid = (mid + Math.imul(al2, bh9)) | 0;
	    mid = (mid + Math.imul(ah2, bl9)) | 0;
	    hi = (hi + Math.imul(ah2, bh9)) | 0;
	    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
	    w11 &= 0x3ffffff;
	    /* k = 12 */
	    lo = Math.imul(al9, bl3);
	    mid = Math.imul(al9, bh3);
	    mid = (mid + Math.imul(ah9, bl3)) | 0;
	    hi = Math.imul(ah9, bh3);
	    lo = (lo + Math.imul(al8, bl4)) | 0;
	    mid = (mid + Math.imul(al8, bh4)) | 0;
	    mid = (mid + Math.imul(ah8, bl4)) | 0;
	    hi = (hi + Math.imul(ah8, bh4)) | 0;
	    lo = (lo + Math.imul(al7, bl5)) | 0;
	    mid = (mid + Math.imul(al7, bh5)) | 0;
	    mid = (mid + Math.imul(ah7, bl5)) | 0;
	    hi = (hi + Math.imul(ah7, bh5)) | 0;
	    lo = (lo + Math.imul(al6, bl6)) | 0;
	    mid = (mid + Math.imul(al6, bh6)) | 0;
	    mid = (mid + Math.imul(ah6, bl6)) | 0;
	    hi = (hi + Math.imul(ah6, bh6)) | 0;
	    lo = (lo + Math.imul(al5, bl7)) | 0;
	    mid = (mid + Math.imul(al5, bh7)) | 0;
	    mid = (mid + Math.imul(ah5, bl7)) | 0;
	    hi = (hi + Math.imul(ah5, bh7)) | 0;
	    lo = (lo + Math.imul(al4, bl8)) | 0;
	    mid = (mid + Math.imul(al4, bh8)) | 0;
	    mid = (mid + Math.imul(ah4, bl8)) | 0;
	    hi = (hi + Math.imul(ah4, bh8)) | 0;
	    lo = (lo + Math.imul(al3, bl9)) | 0;
	    mid = (mid + Math.imul(al3, bh9)) | 0;
	    mid = (mid + Math.imul(ah3, bl9)) | 0;
	    hi = (hi + Math.imul(ah3, bh9)) | 0;
	    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
	    w12 &= 0x3ffffff;
	    /* k = 13 */
	    lo = Math.imul(al9, bl4);
	    mid = Math.imul(al9, bh4);
	    mid = (mid + Math.imul(ah9, bl4)) | 0;
	    hi = Math.imul(ah9, bh4);
	    lo = (lo + Math.imul(al8, bl5)) | 0;
	    mid = (mid + Math.imul(al8, bh5)) | 0;
	    mid = (mid + Math.imul(ah8, bl5)) | 0;
	    hi = (hi + Math.imul(ah8, bh5)) | 0;
	    lo = (lo + Math.imul(al7, bl6)) | 0;
	    mid = (mid + Math.imul(al7, bh6)) | 0;
	    mid = (mid + Math.imul(ah7, bl6)) | 0;
	    hi = (hi + Math.imul(ah7, bh6)) | 0;
	    lo = (lo + Math.imul(al6, bl7)) | 0;
	    mid = (mid + Math.imul(al6, bh7)) | 0;
	    mid = (mid + Math.imul(ah6, bl7)) | 0;
	    hi = (hi + Math.imul(ah6, bh7)) | 0;
	    lo = (lo + Math.imul(al5, bl8)) | 0;
	    mid = (mid + Math.imul(al5, bh8)) | 0;
	    mid = (mid + Math.imul(ah5, bl8)) | 0;
	    hi = (hi + Math.imul(ah5, bh8)) | 0;
	    lo = (lo + Math.imul(al4, bl9)) | 0;
	    mid = (mid + Math.imul(al4, bh9)) | 0;
	    mid = (mid + Math.imul(ah4, bl9)) | 0;
	    hi = (hi + Math.imul(ah4, bh9)) | 0;
	    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
	    w13 &= 0x3ffffff;
	    /* k = 14 */
	    lo = Math.imul(al9, bl5);
	    mid = Math.imul(al9, bh5);
	    mid = (mid + Math.imul(ah9, bl5)) | 0;
	    hi = Math.imul(ah9, bh5);
	    lo = (lo + Math.imul(al8, bl6)) | 0;
	    mid = (mid + Math.imul(al8, bh6)) | 0;
	    mid = (mid + Math.imul(ah8, bl6)) | 0;
	    hi = (hi + Math.imul(ah8, bh6)) | 0;
	    lo = (lo + Math.imul(al7, bl7)) | 0;
	    mid = (mid + Math.imul(al7, bh7)) | 0;
	    mid = (mid + Math.imul(ah7, bl7)) | 0;
	    hi = (hi + Math.imul(ah7, bh7)) | 0;
	    lo = (lo + Math.imul(al6, bl8)) | 0;
	    mid = (mid + Math.imul(al6, bh8)) | 0;
	    mid = (mid + Math.imul(ah6, bl8)) | 0;
	    hi = (hi + Math.imul(ah6, bh8)) | 0;
	    lo = (lo + Math.imul(al5, bl9)) | 0;
	    mid = (mid + Math.imul(al5, bh9)) | 0;
	    mid = (mid + Math.imul(ah5, bl9)) | 0;
	    hi = (hi + Math.imul(ah5, bh9)) | 0;
	    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
	    w14 &= 0x3ffffff;
	    /* k = 15 */
	    lo = Math.imul(al9, bl6);
	    mid = Math.imul(al9, bh6);
	    mid = (mid + Math.imul(ah9, bl6)) | 0;
	    hi = Math.imul(ah9, bh6);
	    lo = (lo + Math.imul(al8, bl7)) | 0;
	    mid = (mid + Math.imul(al8, bh7)) | 0;
	    mid = (mid + Math.imul(ah8, bl7)) | 0;
	    hi = (hi + Math.imul(ah8, bh7)) | 0;
	    lo = (lo + Math.imul(al7, bl8)) | 0;
	    mid = (mid + Math.imul(al7, bh8)) | 0;
	    mid = (mid + Math.imul(ah7, bl8)) | 0;
	    hi = (hi + Math.imul(ah7, bh8)) | 0;
	    lo = (lo + Math.imul(al6, bl9)) | 0;
	    mid = (mid + Math.imul(al6, bh9)) | 0;
	    mid = (mid + Math.imul(ah6, bl9)) | 0;
	    hi = (hi + Math.imul(ah6, bh9)) | 0;
	    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
	    w15 &= 0x3ffffff;
	    /* k = 16 */
	    lo = Math.imul(al9, bl7);
	    mid = Math.imul(al9, bh7);
	    mid = (mid + Math.imul(ah9, bl7)) | 0;
	    hi = Math.imul(ah9, bh7);
	    lo = (lo + Math.imul(al8, bl8)) | 0;
	    mid = (mid + Math.imul(al8, bh8)) | 0;
	    mid = (mid + Math.imul(ah8, bl8)) | 0;
	    hi = (hi + Math.imul(ah8, bh8)) | 0;
	    lo = (lo + Math.imul(al7, bl9)) | 0;
	    mid = (mid + Math.imul(al7, bh9)) | 0;
	    mid = (mid + Math.imul(ah7, bl9)) | 0;
	    hi = (hi + Math.imul(ah7, bh9)) | 0;
	    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
	    w16 &= 0x3ffffff;
	    /* k = 17 */
	    lo = Math.imul(al9, bl8);
	    mid = Math.imul(al9, bh8);
	    mid = (mid + Math.imul(ah9, bl8)) | 0;
	    hi = Math.imul(ah9, bh8);
	    lo = (lo + Math.imul(al8, bl9)) | 0;
	    mid = (mid + Math.imul(al8, bh9)) | 0;
	    mid = (mid + Math.imul(ah8, bl9)) | 0;
	    hi = (hi + Math.imul(ah8, bh9)) | 0;
	    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
	    w17 &= 0x3ffffff;
	    /* k = 18 */
	    lo = Math.imul(al9, bl9);
	    mid = Math.imul(al9, bh9);
	    mid = (mid + Math.imul(ah9, bl9)) | 0;
	    hi = Math.imul(ah9, bh9);
	    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
	    w18 &= 0x3ffffff;
	    o[0] = w0;
	    o[1] = w1;
	    o[2] = w2;
	    o[3] = w3;
	    o[4] = w4;
	    o[5] = w5;
	    o[6] = w6;
	    o[7] = w7;
	    o[8] = w8;
	    o[9] = w9;
	    o[10] = w10;
	    o[11] = w11;
	    o[12] = w12;
	    o[13] = w13;
	    o[14] = w14;
	    o[15] = w15;
	    o[16] = w16;
	    o[17] = w17;
	    o[18] = w18;
	    if (c !== 0) {
	      o[19] = c;
	      out.length++;
	    }
	    return out;
	  };

	  // Polyfill comb
	  if (!Math.imul) {
	    comb10MulTo = smallMulTo;
	  }

	  function bigMulTo (self, num, out) {
	    out.negative = num.negative ^ self.negative;
	    out.length = self.length + num.length;

	    var carry = 0;
	    var hncarry = 0;
	    for (var k = 0; k < out.length - 1; k++) {
	      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
	      // note that ncarry could be >= 0x3ffffff
	      var ncarry = hncarry;
	      hncarry = 0;
	      var rword = carry & 0x3ffffff;
	      var maxJ = Math.min(k, num.length - 1);
	      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
	        var i = k - j;
	        var a = self.words[i] | 0;
	        var b = num.words[j] | 0;
	        var r = a * b;

	        var lo = r & 0x3ffffff;
	        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
	        lo = (lo + rword) | 0;
	        rword = lo & 0x3ffffff;
	        ncarry = (ncarry + (lo >>> 26)) | 0;

	        hncarry += ncarry >>> 26;
	        ncarry &= 0x3ffffff;
	      }
	      out.words[k] = rword;
	      carry = ncarry;
	      ncarry = hncarry;
	    }
	    if (carry !== 0) {
	      out.words[k] = carry;
	    } else {
	      out.length--;
	    }

	    return out.strip();
	  }

	  function jumboMulTo (self, num, out) {
	    var fftm = new FFTM();
	    return fftm.mulp(self, num, out);
	  }

	  BN.prototype.mulTo = function mulTo (num, out) {
	    var res;
	    var len = this.length + num.length;
	    if (this.length === 10 && num.length === 10) {
	      res = comb10MulTo(this, num, out);
	    } else if (len < 63) {
	      res = smallMulTo(this, num, out);
	    } else if (len < 1024) {
	      res = bigMulTo(this, num, out);
	    } else {
	      res = jumboMulTo(this, num, out);
	    }

	    return res;
	  };

	  // Cooley-Tukey algorithm for FFT
	  // slightly revisited to rely on looping instead of recursion

	  function FFTM (x, y) {
	    this.x = x;
	    this.y = y;
	  }

	  FFTM.prototype.makeRBT = function makeRBT (N) {
	    var t = new Array(N);
	    var l = BN.prototype._countBits(N) - 1;
	    for (var i = 0; i < N; i++) {
	      t[i] = this.revBin(i, l, N);
	    }

	    return t;
	  };

	  // Returns binary-reversed representation of `x`
	  FFTM.prototype.revBin = function revBin (x, l, N) {
	    if (x === 0 || x === N - 1) return x;

	    var rb = 0;
	    for (var i = 0; i < l; i++) {
	      rb |= (x & 1) << (l - i - 1);
	      x >>= 1;
	    }

	    return rb;
	  };

	  // Performs "tweedling" phase, therefore 'emulating'
	  // behaviour of the recursive algorithm
	  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
	    for (var i = 0; i < N; i++) {
	      rtws[i] = rws[rbt[i]];
	      itws[i] = iws[rbt[i]];
	    }
	  };

	  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
	    this.permute(rbt, rws, iws, rtws, itws, N);

	    for (var s = 1; s < N; s <<= 1) {
	      var l = s << 1;

	      var rtwdf = Math.cos(2 * Math.PI / l);
	      var itwdf = Math.sin(2 * Math.PI / l);

	      for (var p = 0; p < N; p += l) {
	        var rtwdf_ = rtwdf;
	        var itwdf_ = itwdf;

	        for (var j = 0; j < s; j++) {
	          var re = rtws[p + j];
	          var ie = itws[p + j];

	          var ro = rtws[p + j + s];
	          var io = itws[p + j + s];

	          var rx = rtwdf_ * ro - itwdf_ * io;

	          io = rtwdf_ * io + itwdf_ * ro;
	          ro = rx;

	          rtws[p + j] = re + ro;
	          itws[p + j] = ie + io;

	          rtws[p + j + s] = re - ro;
	          itws[p + j + s] = ie - io;

	          /* jshint maxdepth : false */
	          if (j !== l) {
	            rx = rtwdf * rtwdf_ - itwdf * itwdf_;

	            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
	            rtwdf_ = rx;
	          }
	        }
	      }
	    }
	  };

	  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
	    var N = Math.max(m, n) | 1;
	    var odd = N & 1;
	    var i = 0;
	    for (N = N / 2 | 0; N; N = N >>> 1) {
	      i++;
	    }

	    return 1 << i + 1 + odd;
	  };

	  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
	    if (N <= 1) return;

	    for (var i = 0; i < N / 2; i++) {
	      var t = rws[i];

	      rws[i] = rws[N - i - 1];
	      rws[N - i - 1] = t;

	      t = iws[i];

	      iws[i] = -iws[N - i - 1];
	      iws[N - i - 1] = -t;
	    }
	  };

	  FFTM.prototype.normalize13b = function normalize13b (ws, N) {
	    var carry = 0;
	    for (var i = 0; i < N / 2; i++) {
	      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
	        Math.round(ws[2 * i] / N) +
	        carry;

	      ws[i] = w & 0x3ffffff;

	      if (w < 0x4000000) {
	        carry = 0;
	      } else {
	        carry = w / 0x4000000 | 0;
	      }
	    }

	    return ws;
	  };

	  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
	    var carry = 0;
	    for (var i = 0; i < len; i++) {
	      carry = carry + (ws[i] | 0);

	      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
	      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
	    }

	    // Pad with zeroes
	    for (i = 2 * len; i < N; ++i) {
	      rws[i] = 0;
	    }

	    assert(carry === 0);
	    assert((carry & ~0x1fff) === 0);
	  };

	  FFTM.prototype.stub = function stub (N) {
	    var ph = new Array(N);
	    for (var i = 0; i < N; i++) {
	      ph[i] = 0;
	    }

	    return ph;
	  };

	  FFTM.prototype.mulp = function mulp (x, y, out) {
	    var N = 2 * this.guessLen13b(x.length, y.length);

	    var rbt = this.makeRBT(N);

	    var _ = this.stub(N);

	    var rws = new Array(N);
	    var rwst = new Array(N);
	    var iwst = new Array(N);

	    var nrws = new Array(N);
	    var nrwst = new Array(N);
	    var niwst = new Array(N);

	    var rmws = out.words;
	    rmws.length = N;

	    this.convert13b(x.words, x.length, rws, N);
	    this.convert13b(y.words, y.length, nrws, N);

	    this.transform(rws, _, rwst, iwst, N, rbt);
	    this.transform(nrws, _, nrwst, niwst, N, rbt);

	    for (var i = 0; i < N; i++) {
	      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
	      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
	      rwst[i] = rx;
	    }

	    this.conjugate(rwst, iwst, N);
	    this.transform(rwst, iwst, rmws, _, N, rbt);
	    this.conjugate(rmws, _, N);
	    this.normalize13b(rmws, N);

	    out.negative = x.negative ^ y.negative;
	    out.length = x.length + y.length;
	    return out.strip();
	  };

	  // Multiply `this` by `num`
	  BN.prototype.mul = function mul (num) {
	    var out = new BN(null);
	    out.words = new Array(this.length + num.length);
	    return this.mulTo(num, out);
	  };

	  // Multiply employing FFT
	  BN.prototype.mulf = function mulf (num) {
	    var out = new BN(null);
	    out.words = new Array(this.length + num.length);
	    return jumboMulTo(this, num, out);
	  };

	  // In-place Multiplication
	  BN.prototype.imul = function imul (num) {
	    return this.clone().mulTo(num, this);
	  };

	  BN.prototype.imuln = function imuln (num) {
	    assert(typeof num === 'number');
	    assert(num < 0x4000000);

	    // Carry
	    var carry = 0;
	    for (var i = 0; i < this.length; i++) {
	      var w = (this.words[i] | 0) * num;
	      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
	      carry >>= 26;
	      carry += (w / 0x4000000) | 0;
	      // NOTE: lo is 27bit maximum
	      carry += lo >>> 26;
	      this.words[i] = lo & 0x3ffffff;
	    }

	    if (carry !== 0) {
	      this.words[i] = carry;
	      this.length++;
	    }

	    return this;
	  };

	  BN.prototype.muln = function muln (num) {
	    return this.clone().imuln(num);
	  };

	  // `this` * `this`
	  BN.prototype.sqr = function sqr () {
	    return this.mul(this);
	  };

	  // `this` * `this` in-place
	  BN.prototype.isqr = function isqr () {
	    return this.imul(this.clone());
	  };

	  // Math.pow(`this`, `num`)
	  BN.prototype.pow = function pow (num) {
	    var w = toBitArray(num);
	    if (w.length === 0) return new BN(1);

	    // Skip leading zeroes
	    var res = this;
	    for (var i = 0; i < w.length; i++, res = res.sqr()) {
	      if (w[i] !== 0) break;
	    }

	    if (++i < w.length) {
	      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
	        if (w[i] === 0) continue;

	        res = res.mul(q);
	      }
	    }

	    return res;
	  };

	  // Shift-left in-place
	  BN.prototype.iushln = function iushln (bits) {
	    assert(typeof bits === 'number' && bits >= 0);
	    var r = bits % 26;
	    var s = (bits - r) / 26;
	    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
	    var i;

	    if (r !== 0) {
	      var carry = 0;

	      for (i = 0; i < this.length; i++) {
	        var newCarry = this.words[i] & carryMask;
	        var c = ((this.words[i] | 0) - newCarry) << r;
	        this.words[i] = c | carry;
	        carry = newCarry >>> (26 - r);
	      }

	      if (carry) {
	        this.words[i] = carry;
	        this.length++;
	      }
	    }

	    if (s !== 0) {
	      for (i = this.length - 1; i >= 0; i--) {
	        this.words[i + s] = this.words[i];
	      }

	      for (i = 0; i < s; i++) {
	        this.words[i] = 0;
	      }

	      this.length += s;
	    }

	    return this.strip();
	  };

	  BN.prototype.ishln = function ishln (bits) {
	    // TODO(indutny): implement me
	    assert(this.negative === 0);
	    return this.iushln(bits);
	  };

	  // Shift-right in-place
	  // NOTE: `hint` is a lowest bit before trailing zeroes
	  // NOTE: if `extended` is present - it will be filled with destroyed bits
	  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
	    assert(typeof bits === 'number' && bits >= 0);
	    var h;
	    if (hint) {
	      h = (hint - (hint % 26)) / 26;
	    } else {
	      h = 0;
	    }

	    var r = bits % 26;
	    var s = Math.min((bits - r) / 26, this.length);
	    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
	    var maskedWords = extended;

	    h -= s;
	    h = Math.max(0, h);

	    // Extended mode, copy masked part
	    if (maskedWords) {
	      for (var i = 0; i < s; i++) {
	        maskedWords.words[i] = this.words[i];
	      }
	      maskedWords.length = s;
	    }

	    if (s === 0) {
	      // No-op, we should not move anything at all
	    } else if (this.length > s) {
	      this.length -= s;
	      for (i = 0; i < this.length; i++) {
	        this.words[i] = this.words[i + s];
	      }
	    } else {
	      this.words[0] = 0;
	      this.length = 1;
	    }

	    var carry = 0;
	    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
	      var word = this.words[i] | 0;
	      this.words[i] = (carry << (26 - r)) | (word >>> r);
	      carry = word & mask;
	    }

	    // Push carried bits as a mask
	    if (maskedWords && carry !== 0) {
	      maskedWords.words[maskedWords.length++] = carry;
	    }

	    if (this.length === 0) {
	      this.words[0] = 0;
	      this.length = 1;
	    }

	    return this.strip();
	  };

	  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
	    // TODO(indutny): implement me
	    assert(this.negative === 0);
	    return this.iushrn(bits, hint, extended);
	  };

	  // Shift-left
	  BN.prototype.shln = function shln (bits) {
	    return this.clone().ishln(bits);
	  };

	  BN.prototype.ushln = function ushln (bits) {
	    return this.clone().iushln(bits);
	  };

	  // Shift-right
	  BN.prototype.shrn = function shrn (bits) {
	    return this.clone().ishrn(bits);
	  };

	  BN.prototype.ushrn = function ushrn (bits) {
	    return this.clone().iushrn(bits);
	  };

	  // Test if n bit is set
	  BN.prototype.testn = function testn (bit) {
	    assert(typeof bit === 'number' && bit >= 0);
	    var r = bit % 26;
	    var s = (bit - r) / 26;
	    var q = 1 << r;

	    // Fast case: bit is much higher than all existing words
	    if (this.length <= s) return false;

	    // Check bit and return
	    var w = this.words[s];

	    return !!(w & q);
	  };

	  // Return only lowers bits of number (in-place)
	  BN.prototype.imaskn = function imaskn (bits) {
	    assert(typeof bits === 'number' && bits >= 0);
	    var r = bits % 26;
	    var s = (bits - r) / 26;

	    assert(this.negative === 0, 'imaskn works only with positive numbers');

	    if (this.length <= s) {
	      return this;
	    }

	    if (r !== 0) {
	      s++;
	    }
	    this.length = Math.min(s, this.length);

	    if (r !== 0) {
	      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
	      this.words[this.length - 1] &= mask;
	    }

	    return this.strip();
	  };

	  // Return only lowers bits of number
	  BN.prototype.maskn = function maskn (bits) {
	    return this.clone().imaskn(bits);
	  };

	  // Add plain number `num` to `this`
	  BN.prototype.iaddn = function iaddn (num) {
	    assert(typeof num === 'number');
	    assert(num < 0x4000000);
	    if (num < 0) return this.isubn(-num);

	    // Possible sign change
	    if (this.negative !== 0) {
	      if (this.length === 1 && (this.words[0] | 0) < num) {
	        this.words[0] = num - (this.words[0] | 0);
	        this.negative = 0;
	        return this;
	      }

	      this.negative = 0;
	      this.isubn(num);
	      this.negative = 1;
	      return this;
	    }

	    // Add without checks
	    return this._iaddn(num);
	  };

	  BN.prototype._iaddn = function _iaddn (num) {
	    this.words[0] += num;

	    // Carry
	    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
	      this.words[i] -= 0x4000000;
	      if (i === this.length - 1) {
	        this.words[i + 1] = 1;
	      } else {
	        this.words[i + 1]++;
	      }
	    }
	    this.length = Math.max(this.length, i + 1);

	    return this;
	  };

	  // Subtract plain number `num` from `this`
	  BN.prototype.isubn = function isubn (num) {
	    assert(typeof num === 'number');
	    assert(num < 0x4000000);
	    if (num < 0) return this.iaddn(-num);

	    if (this.negative !== 0) {
	      this.negative = 0;
	      this.iaddn(num);
	      this.negative = 1;
	      return this;
	    }

	    this.words[0] -= num;

	    if (this.length === 1 && this.words[0] < 0) {
	      this.words[0] = -this.words[0];
	      this.negative = 1;
	    } else {
	      // Carry
	      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
	        this.words[i] += 0x4000000;
	        this.words[i + 1] -= 1;
	      }
	    }

	    return this.strip();
	  };

	  BN.prototype.addn = function addn (num) {
	    return this.clone().iaddn(num);
	  };

	  BN.prototype.subn = function subn (num) {
	    return this.clone().isubn(num);
	  };

	  BN.prototype.iabs = function iabs () {
	    this.negative = 0;

	    return this;
	  };

	  BN.prototype.abs = function abs () {
	    return this.clone().iabs();
	  };

	  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
	    var len = num.length + shift;
	    var i;

	    this._expand(len);

	    var w;
	    var carry = 0;
	    for (i = 0; i < num.length; i++) {
	      w = (this.words[i + shift] | 0) + carry;
	      var right = (num.words[i] | 0) * mul;
	      w -= right & 0x3ffffff;
	      carry = (w >> 26) - ((right / 0x4000000) | 0);
	      this.words[i + shift] = w & 0x3ffffff;
	    }
	    for (; i < this.length - shift; i++) {
	      w = (this.words[i + shift] | 0) + carry;
	      carry = w >> 26;
	      this.words[i + shift] = w & 0x3ffffff;
	    }

	    if (carry === 0) return this.strip();

	    // Subtraction overflow
	    assert(carry === -1);
	    carry = 0;
	    for (i = 0; i < this.length; i++) {
	      w = -(this.words[i] | 0) + carry;
	      carry = w >> 26;
	      this.words[i] = w & 0x3ffffff;
	    }
	    this.negative = 1;

	    return this.strip();
	  };

	  BN.prototype._wordDiv = function _wordDiv (num, mode) {
	    var shift = this.length - num.length;

	    var a = this.clone();
	    var b = num;

	    // Normalize
	    var bhi = b.words[b.length - 1] | 0;
	    var bhiBits = this._countBits(bhi);
	    shift = 26 - bhiBits;
	    if (shift !== 0) {
	      b = b.ushln(shift);
	      a.iushln(shift);
	      bhi = b.words[b.length - 1] | 0;
	    }

	    // Initialize quotient
	    var m = a.length - b.length;
	    var q;

	    if (mode !== 'mod') {
	      q = new BN(null);
	      q.length = m + 1;
	      q.words = new Array(q.length);
	      for (var i = 0; i < q.length; i++) {
	        q.words[i] = 0;
	      }
	    }

	    var diff = a.clone()._ishlnsubmul(b, 1, m);
	    if (diff.negative === 0) {
	      a = diff;
	      if (q) {
	        q.words[m] = 1;
	      }
	    }

	    for (var j = m - 1; j >= 0; j--) {
	      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
	        (a.words[b.length + j - 1] | 0);

	      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
	      // (0x7ffffff)
	      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

	      a._ishlnsubmul(b, qj, j);
	      while (a.negative !== 0) {
	        qj--;
	        a.negative = 0;
	        a._ishlnsubmul(b, 1, j);
	        if (!a.isZero()) {
	          a.negative ^= 1;
	        }
	      }
	      if (q) {
	        q.words[j] = qj;
	      }
	    }
	    if (q) {
	      q.strip();
	    }
	    a.strip();

	    // Denormalize
	    if (mode !== 'div' && shift !== 0) {
	      a.iushrn(shift);
	    }

	    return {
	      div: q || null,
	      mod: a
	    };
	  };

	  // NOTE: 1) `mode` can be set to `mod` to request mod only,
	  //       to `div` to request div only, or be absent to
	  //       request both div & mod
	  //       2) `positive` is true if unsigned mod is requested
	  BN.prototype.divmod = function divmod (num, mode, positive) {
	    assert(!num.isZero());

	    if (this.isZero()) {
	      return {
	        div: new BN(0),
	        mod: new BN(0)
	      };
	    }

	    var div, mod, res;
	    if (this.negative !== 0 && num.negative === 0) {
	      res = this.neg().divmod(num, mode);

	      if (mode !== 'mod') {
	        div = res.div.neg();
	      }

	      if (mode !== 'div') {
	        mod = res.mod.neg();
	        if (positive && mod.negative !== 0) {
	          mod.iadd(num);
	        }
	      }

	      return {
	        div: div,
	        mod: mod
	      };
	    }

	    if (this.negative === 0 && num.negative !== 0) {
	      res = this.divmod(num.neg(), mode);

	      if (mode !== 'mod') {
	        div = res.div.neg();
	      }

	      return {
	        div: div,
	        mod: res.mod
	      };
	    }

	    if ((this.negative & num.negative) !== 0) {
	      res = this.neg().divmod(num.neg(), mode);

	      if (mode !== 'div') {
	        mod = res.mod.neg();
	        if (positive && mod.negative !== 0) {
	          mod.isub(num);
	        }
	      }

	      return {
	        div: res.div,
	        mod: mod
	      };
	    }

	    // Both numbers are positive at this point

	    // Strip both numbers to approximate shift value
	    if (num.length > this.length || this.cmp(num) < 0) {
	      return {
	        div: new BN(0),
	        mod: this
	      };
	    }

	    // Very short reduction
	    if (num.length === 1) {
	      if (mode === 'div') {
	        return {
	          div: this.divn(num.words[0]),
	          mod: null
	        };
	      }

	      if (mode === 'mod') {
	        return {
	          div: null,
	          mod: new BN(this.modn(num.words[0]))
	        };
	      }

	      return {
	        div: this.divn(num.words[0]),
	        mod: new BN(this.modn(num.words[0]))
	      };
	    }

	    return this._wordDiv(num, mode);
	  };

	  // Find `this` / `num`
	  BN.prototype.div = function div (num) {
	    return this.divmod(num, 'div', false).div;
	  };

	  // Find `this` % `num`
	  BN.prototype.mod = function mod (num) {
	    return this.divmod(num, 'mod', false).mod;
	  };

	  BN.prototype.umod = function umod (num) {
	    return this.divmod(num, 'mod', true).mod;
	  };

	  // Find Round(`this` / `num`)
	  BN.prototype.divRound = function divRound (num) {
	    var dm = this.divmod(num);

	    // Fast case - exact division
	    if (dm.mod.isZero()) return dm.div;

	    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

	    var half = num.ushrn(1);
	    var r2 = num.andln(1);
	    var cmp = mod.cmp(half);

	    // Round down
	    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

	    // Round up
	    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
	  };

	  BN.prototype.modn = function modn (num) {
	    assert(num <= 0x3ffffff);
	    var p = (1 << 26) % num;

	    var acc = 0;
	    for (var i = this.length - 1; i >= 0; i--) {
	      acc = (p * acc + (this.words[i] | 0)) % num;
	    }

	    return acc;
	  };

	  // In-place division by number
	  BN.prototype.idivn = function idivn (num) {
	    assert(num <= 0x3ffffff);

	    var carry = 0;
	    for (var i = this.length - 1; i >= 0; i--) {
	      var w = (this.words[i] | 0) + carry * 0x4000000;
	      this.words[i] = (w / num) | 0;
	      carry = w % num;
	    }

	    return this.strip();
	  };

	  BN.prototype.divn = function divn (num) {
	    return this.clone().idivn(num);
	  };

	  BN.prototype.egcd = function egcd (p) {
	    assert(p.negative === 0);
	    assert(!p.isZero());

	    var x = this;
	    var y = p.clone();

	    if (x.negative !== 0) {
	      x = x.umod(p);
	    } else {
	      x = x.clone();
	    }

	    // A * x + B * y = x
	    var A = new BN(1);
	    var B = new BN(0);

	    // C * x + D * y = y
	    var C = new BN(0);
	    var D = new BN(1);

	    var g = 0;

	    while (x.isEven() && y.isEven()) {
	      x.iushrn(1);
	      y.iushrn(1);
	      ++g;
	    }

	    var yp = y.clone();
	    var xp = x.clone();

	    while (!x.isZero()) {
	      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
	      if (i > 0) {
	        x.iushrn(i);
	        while (i-- > 0) {
	          if (A.isOdd() || B.isOdd()) {
	            A.iadd(yp);
	            B.isub(xp);
	          }

	          A.iushrn(1);
	          B.iushrn(1);
	        }
	      }

	      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
	      if (j > 0) {
	        y.iushrn(j);
	        while (j-- > 0) {
	          if (C.isOdd() || D.isOdd()) {
	            C.iadd(yp);
	            D.isub(xp);
	          }

	          C.iushrn(1);
	          D.iushrn(1);
	        }
	      }

	      if (x.cmp(y) >= 0) {
	        x.isub(y);
	        A.isub(C);
	        B.isub(D);
	      } else {
	        y.isub(x);
	        C.isub(A);
	        D.isub(B);
	      }
	    }

	    return {
	      a: C,
	      b: D,
	      gcd: y.iushln(g)
	    };
	  };

	  // This is reduced incarnation of the binary EEA
	  // above, designated to invert members of the
	  // _prime_ fields F(p) at a maximal speed
	  BN.prototype._invmp = function _invmp (p) {
	    assert(p.negative === 0);
	    assert(!p.isZero());

	    var a = this;
	    var b = p.clone();

	    if (a.negative !== 0) {
	      a = a.umod(p);
	    } else {
	      a = a.clone();
	    }

	    var x1 = new BN(1);
	    var x2 = new BN(0);

	    var delta = b.clone();

	    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
	      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
	      if (i > 0) {
	        a.iushrn(i);
	        while (i-- > 0) {
	          if (x1.isOdd()) {
	            x1.iadd(delta);
	          }

	          x1.iushrn(1);
	        }
	      }

	      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
	      if (j > 0) {
	        b.iushrn(j);
	        while (j-- > 0) {
	          if (x2.isOdd()) {
	            x2.iadd(delta);
	          }

	          x2.iushrn(1);
	        }
	      }

	      if (a.cmp(b) >= 0) {
	        a.isub(b);
	        x1.isub(x2);
	      } else {
	        b.isub(a);
	        x2.isub(x1);
	      }
	    }

	    var res;
	    if (a.cmpn(1) === 0) {
	      res = x1;
	    } else {
	      res = x2;
	    }

	    if (res.cmpn(0) < 0) {
	      res.iadd(p);
	    }

	    return res;
	  };

	  BN.prototype.gcd = function gcd (num) {
	    if (this.isZero()) return num.abs();
	    if (num.isZero()) return this.abs();

	    var a = this.clone();
	    var b = num.clone();
	    a.negative = 0;
	    b.negative = 0;

	    // Remove common factor of two
	    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
	      a.iushrn(1);
	      b.iushrn(1);
	    }

	    do {
	      while (a.isEven()) {
	        a.iushrn(1);
	      }
	      while (b.isEven()) {
	        b.iushrn(1);
	      }

	      var r = a.cmp(b);
	      if (r < 0) {
	        // Swap `a` and `b` to make `a` always bigger than `b`
	        var t = a;
	        a = b;
	        b = t;
	      } else if (r === 0 || b.cmpn(1) === 0) {
	        break;
	      }

	      a.isub(b);
	    } while (true);

	    return b.iushln(shift);
	  };

	  // Invert number in the field F(num)
	  BN.prototype.invm = function invm (num) {
	    return this.egcd(num).a.umod(num);
	  };

	  BN.prototype.isEven = function isEven () {
	    return (this.words[0] & 1) === 0;
	  };

	  BN.prototype.isOdd = function isOdd () {
	    return (this.words[0] & 1) === 1;
	  };

	  // And first word and num
	  BN.prototype.andln = function andln (num) {
	    return this.words[0] & num;
	  };

	  // Increment at the bit position in-line
	  BN.prototype.bincn = function bincn (bit) {
	    assert(typeof bit === 'number');
	    var r = bit % 26;
	    var s = (bit - r) / 26;
	    var q = 1 << r;

	    // Fast case: bit is much higher than all existing words
	    if (this.length <= s) {
	      this._expand(s + 1);
	      this.words[s] |= q;
	      return this;
	    }

	    // Add bit and propagate, if needed
	    var carry = q;
	    for (var i = s; carry !== 0 && i < this.length; i++) {
	      var w = this.words[i] | 0;
	      w += carry;
	      carry = w >>> 26;
	      w &= 0x3ffffff;
	      this.words[i] = w;
	    }
	    if (carry !== 0) {
	      this.words[i] = carry;
	      this.length++;
	    }
	    return this;
	  };

	  BN.prototype.isZero = function isZero () {
	    return this.length === 1 && this.words[0] === 0;
	  };

	  BN.prototype.cmpn = function cmpn (num) {
	    var negative = num < 0;

	    if (this.negative !== 0 && !negative) return -1;
	    if (this.negative === 0 && negative) return 1;

	    this.strip();

	    var res;
	    if (this.length > 1) {
	      res = 1;
	    } else {
	      if (negative) {
	        num = -num;
	      }

	      assert(num <= 0x3ffffff, 'Number is too big');

	      var w = this.words[0] | 0;
	      res = w === num ? 0 : w < num ? -1 : 1;
	    }
	    if (this.negative !== 0) return -res | 0;
	    return res;
	  };

	  // Compare two numbers and return:
	  // 1 - if `this` > `num`
	  // 0 - if `this` == `num`
	  // -1 - if `this` < `num`
	  BN.prototype.cmp = function cmp (num) {
	    if (this.negative !== 0 && num.negative === 0) return -1;
	    if (this.negative === 0 && num.negative !== 0) return 1;

	    var res = this.ucmp(num);
	    if (this.negative !== 0) return -res | 0;
	    return res;
	  };

	  // Unsigned comparison
	  BN.prototype.ucmp = function ucmp (num) {
	    // At this point both numbers have the same sign
	    if (this.length > num.length) return 1;
	    if (this.length < num.length) return -1;

	    var res = 0;
	    for (var i = this.length - 1; i >= 0; i--) {
	      var a = this.words[i] | 0;
	      var b = num.words[i] | 0;

	      if (a === b) continue;
	      if (a < b) {
	        res = -1;
	      } else if (a > b) {
	        res = 1;
	      }
	      break;
	    }
	    return res;
	  };

	  BN.prototype.gtn = function gtn (num) {
	    return this.cmpn(num) === 1;
	  };

	  BN.prototype.gt = function gt (num) {
	    return this.cmp(num) === 1;
	  };

	  BN.prototype.gten = function gten (num) {
	    return this.cmpn(num) >= 0;
	  };

	  BN.prototype.gte = function gte (num) {
	    return this.cmp(num) >= 0;
	  };

	  BN.prototype.ltn = function ltn (num) {
	    return this.cmpn(num) === -1;
	  };

	  BN.prototype.lt = function lt (num) {
	    return this.cmp(num) === -1;
	  };

	  BN.prototype.lten = function lten (num) {
	    return this.cmpn(num) <= 0;
	  };

	  BN.prototype.lte = function lte (num) {
	    return this.cmp(num) <= 0;
	  };

	  BN.prototype.eqn = function eqn (num) {
	    return this.cmpn(num) === 0;
	  };

	  BN.prototype.eq = function eq (num) {
	    return this.cmp(num) === 0;
	  };

	  //
	  // A reduce context, could be using montgomery or something better, depending
	  // on the `m` itself.
	  //
	  BN.red = function red (num) {
	    return new Red(num);
	  };

	  BN.prototype.toRed = function toRed (ctx) {
	    assert(!this.red, 'Already a number in reduction context');
	    assert(this.negative === 0, 'red works only with positives');
	    return ctx.convertTo(this)._forceRed(ctx);
	  };

	  BN.prototype.fromRed = function fromRed () {
	    assert(this.red, 'fromRed works only with numbers in reduction context');
	    return this.red.convertFrom(this);
	  };

	  BN.prototype._forceRed = function _forceRed (ctx) {
	    this.red = ctx;
	    return this;
	  };

	  BN.prototype.forceRed = function forceRed (ctx) {
	    assert(!this.red, 'Already a number in reduction context');
	    return this._forceRed(ctx);
	  };

	  BN.prototype.redAdd = function redAdd (num) {
	    assert(this.red, 'redAdd works only with red numbers');
	    return this.red.add(this, num);
	  };

	  BN.prototype.redIAdd = function redIAdd (num) {
	    assert(this.red, 'redIAdd works only with red numbers');
	    return this.red.iadd(this, num);
	  };

	  BN.prototype.redSub = function redSub (num) {
	    assert(this.red, 'redSub works only with red numbers');
	    return this.red.sub(this, num);
	  };

	  BN.prototype.redISub = function redISub (num) {
	    assert(this.red, 'redISub works only with red numbers');
	    return this.red.isub(this, num);
	  };

	  BN.prototype.redShl = function redShl (num) {
	    assert(this.red, 'redShl works only with red numbers');
	    return this.red.shl(this, num);
	  };

	  BN.prototype.redMul = function redMul (num) {
	    assert(this.red, 'redMul works only with red numbers');
	    this.red._verify2(this, num);
	    return this.red.mul(this, num);
	  };

	  BN.prototype.redIMul = function redIMul (num) {
	    assert(this.red, 'redMul works only with red numbers');
	    this.red._verify2(this, num);
	    return this.red.imul(this, num);
	  };

	  BN.prototype.redSqr = function redSqr () {
	    assert(this.red, 'redSqr works only with red numbers');
	    this.red._verify1(this);
	    return this.red.sqr(this);
	  };

	  BN.prototype.redISqr = function redISqr () {
	    assert(this.red, 'redISqr works only with red numbers');
	    this.red._verify1(this);
	    return this.red.isqr(this);
	  };

	  // Square root over p
	  BN.prototype.redSqrt = function redSqrt () {
	    assert(this.red, 'redSqrt works only with red numbers');
	    this.red._verify1(this);
	    return this.red.sqrt(this);
	  };

	  BN.prototype.redInvm = function redInvm () {
	    assert(this.red, 'redInvm works only with red numbers');
	    this.red._verify1(this);
	    return this.red.invm(this);
	  };

	  // Return negative clone of `this` % `red modulo`
	  BN.prototype.redNeg = function redNeg () {
	    assert(this.red, 'redNeg works only with red numbers');
	    this.red._verify1(this);
	    return this.red.neg(this);
	  };

	  BN.prototype.redPow = function redPow (num) {
	    assert(this.red && !num.red, 'redPow(normalNum)');
	    this.red._verify1(this);
	    return this.red.pow(this, num);
	  };

	  // Prime numbers with efficient reduction
	  var primes = {
	    k256: null,
	    p224: null,
	    p192: null,
	    p25519: null
	  };

	  // Pseudo-Mersenne prime
	  function MPrime (name, p) {
	    // P = 2 ^ N - K
	    this.name = name;
	    this.p = new BN(p, 16);
	    this.n = this.p.bitLength();
	    this.k = new BN(1).iushln(this.n).isub(this.p);

	    this.tmp = this._tmp();
	  }

	  MPrime.prototype._tmp = function _tmp () {
	    var tmp = new BN(null);
	    tmp.words = new Array(Math.ceil(this.n / 13));
	    return tmp;
	  };

	  MPrime.prototype.ireduce = function ireduce (num) {
	    // Assumes that `num` is less than `P^2`
	    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
	    var r = num;
	    var rlen;

	    do {
	      this.split(r, this.tmp);
	      r = this.imulK(r);
	      r = r.iadd(this.tmp);
	      rlen = r.bitLength();
	    } while (rlen > this.n);

	    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
	    if (cmp === 0) {
	      r.words[0] = 0;
	      r.length = 1;
	    } else if (cmp > 0) {
	      r.isub(this.p);
	    } else {
	      r.strip();
	    }

	    return r;
	  };

	  MPrime.prototype.split = function split (input, out) {
	    input.iushrn(this.n, 0, out);
	  };

	  MPrime.prototype.imulK = function imulK (num) {
	    return num.imul(this.k);
	  };

	  function K256 () {
	    MPrime.call(
	      this,
	      'k256',
	      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
	  }
	  inherits(K256, MPrime);

	  K256.prototype.split = function split (input, output) {
	    // 256 = 9 * 26 + 22
	    var mask = 0x3fffff;

	    var outLen = Math.min(input.length, 9);
	    for (var i = 0; i < outLen; i++) {
	      output.words[i] = input.words[i];
	    }
	    output.length = outLen;

	    if (input.length <= 9) {
	      input.words[0] = 0;
	      input.length = 1;
	      return;
	    }

	    // Shift by 9 limbs
	    var prev = input.words[9];
	    output.words[output.length++] = prev & mask;

	    for (i = 10; i < input.length; i++) {
	      var next = input.words[i] | 0;
	      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
	      prev = next;
	    }
	    prev >>>= 22;
	    input.words[i - 10] = prev;
	    if (prev === 0 && input.length > 10) {
	      input.length -= 10;
	    } else {
	      input.length -= 9;
	    }
	  };

	  K256.prototype.imulK = function imulK (num) {
	    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
	    num.words[num.length] = 0;
	    num.words[num.length + 1] = 0;
	    num.length += 2;

	    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
	    var lo = 0;
	    for (var i = 0; i < num.length; i++) {
	      var w = num.words[i] | 0;
	      lo += w * 0x3d1;
	      num.words[i] = lo & 0x3ffffff;
	      lo = w * 0x40 + ((lo / 0x4000000) | 0);
	    }

	    // Fast length reduction
	    if (num.words[num.length - 1] === 0) {
	      num.length--;
	      if (num.words[num.length - 1] === 0) {
	        num.length--;
	      }
	    }
	    return num;
	  };

	  function P224 () {
	    MPrime.call(
	      this,
	      'p224',
	      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
	  }
	  inherits(P224, MPrime);

	  function P192 () {
	    MPrime.call(
	      this,
	      'p192',
	      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
	  }
	  inherits(P192, MPrime);

	  function P25519 () {
	    // 2 ^ 255 - 19
	    MPrime.call(
	      this,
	      '25519',
	      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
	  }
	  inherits(P25519, MPrime);

	  P25519.prototype.imulK = function imulK (num) {
	    // K = 0x13
	    var carry = 0;
	    for (var i = 0; i < num.length; i++) {
	      var hi = (num.words[i] | 0) * 0x13 + carry;
	      var lo = hi & 0x3ffffff;
	      hi >>>= 26;

	      num.words[i] = lo;
	      carry = hi;
	    }
	    if (carry !== 0) {
	      num.words[num.length++] = carry;
	    }
	    return num;
	  };

	  // Exported mostly for testing purposes, use plain name instead
	  BN._prime = function prime (name) {
	    // Cached version of prime
	    if (primes[name]) return primes[name];

	    var prime;
	    if (name === 'k256') {
	      prime = new K256();
	    } else if (name === 'p224') {
	      prime = new P224();
	    } else if (name === 'p192') {
	      prime = new P192();
	    } else if (name === 'p25519') {
	      prime = new P25519();
	    } else {
	      throw new Error('Unknown prime ' + name);
	    }
	    primes[name] = prime;

	    return prime;
	  };

	  //
	  // Base reduction engine
	  //
	  function Red (m) {
	    if (typeof m === 'string') {
	      var prime = BN._prime(m);
	      this.m = prime.p;
	      this.prime = prime;
	    } else {
	      assert(m.gtn(1), 'modulus must be greater than 1');
	      this.m = m;
	      this.prime = null;
	    }
	  }

	  Red.prototype._verify1 = function _verify1 (a) {
	    assert(a.negative === 0, 'red works only with positives');
	    assert(a.red, 'red works only with red numbers');
	  };

	  Red.prototype._verify2 = function _verify2 (a, b) {
	    assert((a.negative | b.negative) === 0, 'red works only with positives');
	    assert(a.red && a.red === b.red,
	      'red works only with red numbers');
	  };

	  Red.prototype.imod = function imod (a) {
	    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
	    return a.umod(this.m)._forceRed(this);
	  };

	  Red.prototype.neg = function neg (a) {
	    if (a.isZero()) {
	      return a.clone();
	    }

	    return this.m.sub(a)._forceRed(this);
	  };

	  Red.prototype.add = function add (a, b) {
	    this._verify2(a, b);

	    var res = a.add(b);
	    if (res.cmp(this.m) >= 0) {
	      res.isub(this.m);
	    }
	    return res._forceRed(this);
	  };

	  Red.prototype.iadd = function iadd (a, b) {
	    this._verify2(a, b);

	    var res = a.iadd(b);
	    if (res.cmp(this.m) >= 0) {
	      res.isub(this.m);
	    }
	    return res;
	  };

	  Red.prototype.sub = function sub (a, b) {
	    this._verify2(a, b);

	    var res = a.sub(b);
	    if (res.cmpn(0) < 0) {
	      res.iadd(this.m);
	    }
	    return res._forceRed(this);
	  };

	  Red.prototype.isub = function isub (a, b) {
	    this._verify2(a, b);

	    var res = a.isub(b);
	    if (res.cmpn(0) < 0) {
	      res.iadd(this.m);
	    }
	    return res;
	  };

	  Red.prototype.shl = function shl (a, num) {
	    this._verify1(a);
	    return this.imod(a.ushln(num));
	  };

	  Red.prototype.imul = function imul (a, b) {
	    this._verify2(a, b);
	    return this.imod(a.imul(b));
	  };

	  Red.prototype.mul = function mul (a, b) {
	    this._verify2(a, b);
	    return this.imod(a.mul(b));
	  };

	  Red.prototype.isqr = function isqr (a) {
	    return this.imul(a, a.clone());
	  };

	  Red.prototype.sqr = function sqr (a) {
	    return this.mul(a, a);
	  };

	  Red.prototype.sqrt = function sqrt (a) {
	    if (a.isZero()) return a.clone();

	    var mod3 = this.m.andln(3);
	    assert(mod3 % 2 === 1);

	    // Fast case
	    if (mod3 === 3) {
	      var pow = this.m.add(new BN(1)).iushrn(2);
	      return this.pow(a, pow);
	    }

	    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
	    //
	    // Find Q and S, that Q * 2 ^ S = (P - 1)
	    var q = this.m.subn(1);
	    var s = 0;
	    while (!q.isZero() && q.andln(1) === 0) {
	      s++;
	      q.iushrn(1);
	    }
	    assert(!q.isZero());

	    var one = new BN(1).toRed(this);
	    var nOne = one.redNeg();

	    // Find quadratic non-residue
	    // NOTE: Max is such because of generalized Riemann hypothesis.
	    var lpow = this.m.subn(1).iushrn(1);
	    var z = this.m.bitLength();
	    z = new BN(2 * z * z).toRed(this);

	    while (this.pow(z, lpow).cmp(nOne) !== 0) {
	      z.redIAdd(nOne);
	    }

	    var c = this.pow(z, q);
	    var r = this.pow(a, q.addn(1).iushrn(1));
	    var t = this.pow(a, q);
	    var m = s;
	    while (t.cmp(one) !== 0) {
	      var tmp = t;
	      for (var i = 0; tmp.cmp(one) !== 0; i++) {
	        tmp = tmp.redSqr();
	      }
	      assert(i < m);
	      var b = this.pow(c, new BN(1).iushln(m - i - 1));

	      r = r.redMul(b);
	      c = b.redSqr();
	      t = t.redMul(c);
	      m = i;
	    }

	    return r;
	  };

	  Red.prototype.invm = function invm (a) {
	    var inv = a._invmp(this.m);
	    if (inv.negative !== 0) {
	      inv.negative = 0;
	      return this.imod(inv).redNeg();
	    } else {
	      return this.imod(inv);
	    }
	  };

	  Red.prototype.pow = function pow (a, num) {
	    if (num.isZero()) return new BN(1);
	    if (num.cmpn(1) === 0) return a.clone();

	    var windowSize = 4;
	    var wnd = new Array(1 << windowSize);
	    wnd[0] = new BN(1).toRed(this);
	    wnd[1] = a;
	    for (var i = 2; i < wnd.length; i++) {
	      wnd[i] = this.mul(wnd[i - 1], a);
	    }

	    var res = wnd[0];
	    var current = 0;
	    var currentLen = 0;
	    var start = num.bitLength() % 26;
	    if (start === 0) {
	      start = 26;
	    }

	    for (i = num.length - 1; i >= 0; i--) {
	      var word = num.words[i];
	      for (var j = start - 1; j >= 0; j--) {
	        var bit = (word >> j) & 1;
	        if (res !== wnd[0]) {
	          res = this.sqr(res);
	        }

	        if (bit === 0 && current === 0) {
	          currentLen = 0;
	          continue;
	        }

	        current <<= 1;
	        current |= bit;
	        currentLen++;
	        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

	        res = this.mul(res, wnd[current]);
	        currentLen = 0;
	        current = 0;
	      }
	      start = 26;
	    }

	    return res;
	  };

	  Red.prototype.convertTo = function convertTo (num) {
	    var r = num.umod(this.m);

	    return r === num ? r.clone() : r;
	  };

	  Red.prototype.convertFrom = function convertFrom (num) {
	    var res = num.clone();
	    res.red = null;
	    return res;
	  };

	  //
	  // Montgomery method engine
	  //

	  BN.mont = function mont (num) {
	    return new Mont(num);
	  };

	  function Mont (m) {
	    Red.call(this, m);

	    this.shift = this.m.bitLength();
	    if (this.shift % 26 !== 0) {
	      this.shift += 26 - (this.shift % 26);
	    }

	    this.r = new BN(1).iushln(this.shift);
	    this.r2 = this.imod(this.r.sqr());
	    this.rinv = this.r._invmp(this.m);

	    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
	    this.minv = this.minv.umod(this.r);
	    this.minv = this.r.sub(this.minv);
	  }
	  inherits(Mont, Red);

	  Mont.prototype.convertTo = function convertTo (num) {
	    return this.imod(num.ushln(this.shift));
	  };

	  Mont.prototype.convertFrom = function convertFrom (num) {
	    var r = this.imod(num.mul(this.rinv));
	    r.red = null;
	    return r;
	  };

	  Mont.prototype.imul = function imul (a, b) {
	    if (a.isZero() || b.isZero()) {
	      a.words[0] = 0;
	      a.length = 1;
	      return a;
	    }

	    var t = a.imul(b);
	    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
	    var u = t.isub(c).iushrn(this.shift);
	    var res = u;

	    if (u.cmp(this.m) >= 0) {
	      res = u.isub(this.m);
	    } else if (u.cmpn(0) < 0) {
	      res = u.iadd(this.m);
	    }

	    return res._forceRed(this);
	  };

	  Mont.prototype.mul = function mul (a, b) {
	    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

	    var t = a.mul(b);
	    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
	    var u = t.isub(c).iushrn(this.shift);
	    var res = u;
	    if (u.cmp(this.m) >= 0) {
	      res = u.isub(this.m);
	    } else if (u.cmpn(0) < 0) {
	      res = u.iadd(this.m);
	    }

	    return res._forceRed(this);
	  };

	  Mont.prototype.invm = function invm (a) {
	    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
	    var res = this.imod(a._invmp(this.m).mul(this.r2));
	    return res._forceRed(this);
	  };
	})(typeof module === 'undefined' || module, this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)(module)))

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(29)
	var ieee754 = __webpack_require__(30)
	var isArray = __webpack_require__(31)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}

	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}

	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)

	  arr = new Arr(len * 3 / 4 - placeHolders)

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len

	  var L = 0

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }

	  parts.push(output)

	  return parts.join('')
	}


/***/ },
/* 30 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 31 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var r;

	module.exports = function rand(len) {
	  if (!r)
	    r = new Rand(null);

	  return r.generate(len);
	};

	function Rand(rand) {
	  this.rand = rand;
	}
	module.exports.Rand = Rand;

	Rand.prototype.generate = function generate(len) {
	  return this._rand(len);
	};

	if (typeof window === 'object') {
	  if (window.crypto && window.crypto.getRandomValues) {
	    // Modern browsers
	    Rand.prototype._rand = function _rand(n) {
	      var arr = new Uint8Array(n);
	      window.crypto.getRandomValues(arr);
	      return arr;
	    };
	  } else if (window.msCrypto && window.msCrypto.getRandomValues) {
	    // IE
	    Rand.prototype._rand = function _rand(n) {
	      var arr = new Uint8Array(n);
	      window.msCrypto.getRandomValues(arr);
	      return arr;
	    };
	  } else {
	    // Old junk
	    Rand.prototype._rand = function() {
	      throw new Error('Not implemented yet');
	    };
	  }
	} else {
	  // Node.js or Web worker
	  try {
	    var crypto = __webpack_require__(33);

	    Rand.prototype._rand = function _rand(n) {
	      return crypto.randomBytes(n);
	    };
	  } catch (e) {
	    // Emulate crypto API using randy
	    Rand.prototype._rand = function _rand(n) {
	      var res = new Uint8Array(n);
	      for (var i = 0; i < res.length; i++)
	        res[i] = this.rand.getByte();
	      return res;
	    };
	  }
	}


/***/ },
/* 33 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hash = __webpack_require__(35);
	var elliptic = __webpack_require__(24);
	var utils = elliptic.utils;
	var assert = utils.assert;

	function HmacDRBG(options) {
	  if (!(this instanceof HmacDRBG))
	    return new HmacDRBG(options);
	  this.hash = options.hash;
	  this.predResist = !!options.predResist;

	  this.outLen = this.hash.outSize;
	  this.minEntropy = options.minEntropy || this.hash.hmacStrength;

	  this.reseed = null;
	  this.reseedInterval = null;
	  this.K = null;
	  this.V = null;

	  var entropy = utils.toArray(options.entropy, options.entropyEnc);
	  var nonce = utils.toArray(options.nonce, options.nonceEnc);
	  var pers = utils.toArray(options.pers, options.persEnc);
	  assert(entropy.length >= (this.minEntropy / 8),
	         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');
	  this._init(entropy, nonce, pers);
	}
	module.exports = HmacDRBG;

	HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
	  var seed = entropy.concat(nonce).concat(pers);

	  this.K = new Array(this.outLen / 8);
	  this.V = new Array(this.outLen / 8);
	  for (var i = 0; i < this.V.length; i++) {
	    this.K[i] = 0x00;
	    this.V[i] = 0x01;
	  }

	  this._update(seed);
	  this.reseed = 1;
	  this.reseedInterval = 0x1000000000000;  // 2^48
	};

	HmacDRBG.prototype._hmac = function hmac() {
	  return new hash.hmac(this.hash, this.K);
	};

	HmacDRBG.prototype._update = function update(seed) {
	  var kmac = this._hmac()
	                 .update(this.V)
	                 .update([ 0x00 ]);
	  if (seed)
	    kmac = kmac.update(seed);
	  this.K = kmac.digest();
	  this.V = this._hmac().update(this.V).digest();
	  if (!seed)
	    return;

	  this.K = this._hmac()
	               .update(this.V)
	               .update([ 0x01 ])
	               .update(seed)
	               .digest();
	  this.V = this._hmac().update(this.V).digest();
	};

	HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
	  // Optional entropy enc
	  if (typeof entropyEnc !== 'string') {
	    addEnc = add;
	    add = entropyEnc;
	    entropyEnc = null;
	  }

	  entropy = utils.toBuffer(entropy, entropyEnc);
	  add = utils.toBuffer(add, addEnc);

	  assert(entropy.length >= (this.minEntropy / 8),
	         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');

	  this._update(entropy.concat(add || []));
	  this.reseed = 1;
	};

	HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
	  if (this.reseed > this.reseedInterval)
	    throw new Error('Reseed is required');

	  // Optional encoding
	  if (typeof enc !== 'string') {
	    addEnc = add;
	    add = enc;
	    enc = null;
	  }

	  // Optional additional data
	  if (add) {
	    add = utils.toArray(add, addEnc);
	    this._update(add);
	  }

	  var temp = [];
	  while (temp.length < len) {
	    this.V = this._hmac().update(this.V).digest();
	    temp = temp.concat(this.V);
	  }

	  var res = temp.slice(0, len);
	  this._update(add);
	  this.reseed++;
	  return utils.encode(res, enc);
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var hash = exports;

	hash.utils = __webpack_require__(36);
	hash.common = __webpack_require__(38);
	hash.sha = __webpack_require__(39);
	hash.ripemd = __webpack_require__(40);
	hash.hmac = __webpack_require__(41);

	// Proxy hash functions to the main object
	hash.sha1 = hash.sha.sha1;
	hash.sha256 = hash.sha.sha256;
	hash.sha224 = hash.sha.sha224;
	hash.sha384 = hash.sha.sha384;
	hash.sha512 = hash.sha.sha512;
	hash.ripemd160 = hash.ripemd.ripemd160;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var utils = exports;
	var inherits = __webpack_require__(37);

	function toArray(msg, enc) {
	  if (Array.isArray(msg))
	    return msg.slice();
	  if (!msg)
	    return [];
	  var res = [];
	  if (typeof msg === 'string') {
	    if (!enc) {
	      for (var i = 0; i < msg.length; i++) {
	        var c = msg.charCodeAt(i);
	        var hi = c >> 8;
	        var lo = c & 0xff;
	        if (hi)
	          res.push(hi, lo);
	        else
	          res.push(lo);
	      }
	    } else if (enc === 'hex') {
	      msg = msg.replace(/[^a-z0-9]+/ig, '');
	      if (msg.length % 2 !== 0)
	        msg = '0' + msg;
	      for (var i = 0; i < msg.length; i += 2)
	        res.push(parseInt(msg[i] + msg[i + 1], 16));
	    }
	  } else {
	    for (var i = 0; i < msg.length; i++)
	      res[i] = msg[i] | 0;
	  }
	  return res;
	}
	utils.toArray = toArray;

	function toHex(msg) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++)
	    res += zero2(msg[i].toString(16));
	  return res;
	}
	utils.toHex = toHex;

	function htonl(w) {
	  var res = (w >>> 24) |
	            ((w >>> 8) & 0xff00) |
	            ((w << 8) & 0xff0000) |
	            ((w & 0xff) << 24);
	  return res >>> 0;
	}
	utils.htonl = htonl;

	function toHex32(msg, endian) {
	  var res = '';
	  for (var i = 0; i < msg.length; i++) {
	    var w = msg[i];
	    if (endian === 'little')
	      w = htonl(w);
	    res += zero8(w.toString(16));
	  }
	  return res;
	}
	utils.toHex32 = toHex32;

	function zero2(word) {
	  if (word.length === 1)
	    return '0' + word;
	  else
	    return word;
	}
	utils.zero2 = zero2;

	function zero8(word) {
	  if (word.length === 7)
	    return '0' + word;
	  else if (word.length === 6)
	    return '00' + word;
	  else if (word.length === 5)
	    return '000' + word;
	  else if (word.length === 4)
	    return '0000' + word;
	  else if (word.length === 3)
	    return '00000' + word;
	  else if (word.length === 2)
	    return '000000' + word;
	  else if (word.length === 1)
	    return '0000000' + word;
	  else
	    return word;
	}
	utils.zero8 = zero8;

	function join32(msg, start, end, endian) {
	  var len = end - start;
	  assert(len % 4 === 0);
	  var res = new Array(len / 4);
	  for (var i = 0, k = start; i < res.length; i++, k += 4) {
	    var w;
	    if (endian === 'big')
	      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
	    else
	      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
	    res[i] = w >>> 0;
	  }
	  return res;
	}
	utils.join32 = join32;

	function split32(msg, endian) {
	  var res = new Array(msg.length * 4);
	  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
	    var m = msg[i];
	    if (endian === 'big') {
	      res[k] = m >>> 24;
	      res[k + 1] = (m >>> 16) & 0xff;
	      res[k + 2] = (m >>> 8) & 0xff;
	      res[k + 3] = m & 0xff;
	    } else {
	      res[k + 3] = m >>> 24;
	      res[k + 2] = (m >>> 16) & 0xff;
	      res[k + 1] = (m >>> 8) & 0xff;
	      res[k] = m & 0xff;
	    }
	  }
	  return res;
	}
	utils.split32 = split32;

	function rotr32(w, b) {
	  return (w >>> b) | (w << (32 - b));
	}
	utils.rotr32 = rotr32;

	function rotl32(w, b) {
	  return (w << b) | (w >>> (32 - b));
	}
	utils.rotl32 = rotl32;

	function sum32(a, b) {
	  return (a + b) >>> 0;
	}
	utils.sum32 = sum32;

	function sum32_3(a, b, c) {
	  return (a + b + c) >>> 0;
	}
	utils.sum32_3 = sum32_3;

	function sum32_4(a, b, c, d) {
	  return (a + b + c + d) >>> 0;
	}
	utils.sum32_4 = sum32_4;

	function sum32_5(a, b, c, d, e) {
	  return (a + b + c + d + e) >>> 0;
	}
	utils.sum32_5 = sum32_5;

	function assert(cond, msg) {
	  if (!cond)
	    throw new Error(msg || 'Assertion failed');
	}
	utils.assert = assert;

	utils.inherits = inherits;

	function sum64(buf, pos, ah, al) {
	  var bh = buf[pos];
	  var bl = buf[pos + 1];

	  var lo = (al + bl) >>> 0;
	  var hi = (lo < al ? 1 : 0) + ah + bh;
	  buf[pos] = hi >>> 0;
	  buf[pos + 1] = lo;
	}
	exports.sum64 = sum64;

	function sum64_hi(ah, al, bh, bl) {
	  var lo = (al + bl) >>> 0;
	  var hi = (lo < al ? 1 : 0) + ah + bh;
	  return hi >>> 0;
	};
	exports.sum64_hi = sum64_hi;

	function sum64_lo(ah, al, bh, bl) {
	  var lo = al + bl;
	  return lo >>> 0;
	};
	exports.sum64_lo = sum64_lo;

	function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
	  var carry = 0;
	  var lo = al;
	  lo = (lo + bl) >>> 0;
	  carry += lo < al ? 1 : 0;
	  lo = (lo + cl) >>> 0;
	  carry += lo < cl ? 1 : 0;
	  lo = (lo + dl) >>> 0;
	  carry += lo < dl ? 1 : 0;

	  var hi = ah + bh + ch + dh + carry;
	  return hi >>> 0;
	};
	exports.sum64_4_hi = sum64_4_hi;

	function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
	  var lo = al + bl + cl + dl;
	  return lo >>> 0;
	};
	exports.sum64_4_lo = sum64_4_lo;

	function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
	  var carry = 0;
	  var lo = al;
	  lo = (lo + bl) >>> 0;
	  carry += lo < al ? 1 : 0;
	  lo = (lo + cl) >>> 0;
	  carry += lo < cl ? 1 : 0;
	  lo = (lo + dl) >>> 0;
	  carry += lo < dl ? 1 : 0;
	  lo = (lo + el) >>> 0;
	  carry += lo < el ? 1 : 0;

	  var hi = ah + bh + ch + dh + eh + carry;
	  return hi >>> 0;
	};
	exports.sum64_5_hi = sum64_5_hi;

	function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
	  var lo = al + bl + cl + dl + el;

	  return lo >>> 0;
	};
	exports.sum64_5_lo = sum64_5_lo;

	function rotr64_hi(ah, al, num) {
	  var r = (al << (32 - num)) | (ah >>> num);
	  return r >>> 0;
	};
	exports.rotr64_hi = rotr64_hi;

	function rotr64_lo(ah, al, num) {
	  var r = (ah << (32 - num)) | (al >>> num);
	  return r >>> 0;
	};
	exports.rotr64_lo = rotr64_lo;

	function shr64_hi(ah, al, num) {
	  return ah >>> num;
	};
	exports.shr64_hi = shr64_hi;

	function shr64_lo(ah, al, num) {
	  var r = (ah << (32 - num)) | (al >>> num);
	  return r >>> 0;
	};
	exports.shr64_lo = shr64_lo;


/***/ },
/* 37 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var hash = __webpack_require__(35);
	var utils = hash.utils;
	var assert = utils.assert;

	function BlockHash() {
	  this.pending = null;
	  this.pendingTotal = 0;
	  this.blockSize = this.constructor.blockSize;
	  this.outSize = this.constructor.outSize;
	  this.hmacStrength = this.constructor.hmacStrength;
	  this.padLength = this.constructor.padLength / 8;
	  this.endian = 'big';

	  this._delta8 = this.blockSize / 8;
	  this._delta32 = this.blockSize / 32;
	}
	exports.BlockHash = BlockHash;

	BlockHash.prototype.update = function update(msg, enc) {
	  // Convert message to array, pad it, and join into 32bit blocks
	  msg = utils.toArray(msg, enc);
	  if (!this.pending)
	    this.pending = msg;
	  else
	    this.pending = this.pending.concat(msg);
	  this.pendingTotal += msg.length;

	  // Enough data, try updating
	  if (this.pending.length >= this._delta8) {
	    msg = this.pending;

	    // Process pending data in blocks
	    var r = msg.length % this._delta8;
	    this.pending = msg.slice(msg.length - r, msg.length);
	    if (this.pending.length === 0)
	      this.pending = null;

	    msg = utils.join32(msg, 0, msg.length - r, this.endian);
	    for (var i = 0; i < msg.length; i += this._delta32)
	      this._update(msg, i, i + this._delta32);
	  }

	  return this;
	};

	BlockHash.prototype.digest = function digest(enc) {
	  this.update(this._pad());
	  assert(this.pending === null);

	  return this._digest(enc);
	};

	BlockHash.prototype._pad = function pad() {
	  var len = this.pendingTotal;
	  var bytes = this._delta8;
	  var k = bytes - ((len + this.padLength) % bytes);
	  var res = new Array(k + this.padLength);
	  res[0] = 0x80;
	  for (var i = 1; i < k; i++)
	    res[i] = 0;

	  // Append length
	  len <<= 3;
	  if (this.endian === 'big') {
	    for (var t = 8; t < this.padLength; t++)
	      res[i++] = 0;

	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = (len >>> 24) & 0xff;
	    res[i++] = (len >>> 16) & 0xff;
	    res[i++] = (len >>> 8) & 0xff;
	    res[i++] = len & 0xff;
	  } else {
	    res[i++] = len & 0xff;
	    res[i++] = (len >>> 8) & 0xff;
	    res[i++] = (len >>> 16) & 0xff;
	    res[i++] = (len >>> 24) & 0xff;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;
	    res[i++] = 0;

	    for (var t = 8; t < this.padLength; t++)
	      res[i++] = 0;
	  }

	  return res;
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var hash = __webpack_require__(35);
	var utils = hash.utils;
	var assert = utils.assert;

	var rotr32 = utils.rotr32;
	var rotl32 = utils.rotl32;
	var sum32 = utils.sum32;
	var sum32_4 = utils.sum32_4;
	var sum32_5 = utils.sum32_5;
	var rotr64_hi = utils.rotr64_hi;
	var rotr64_lo = utils.rotr64_lo;
	var shr64_hi = utils.shr64_hi;
	var shr64_lo = utils.shr64_lo;
	var sum64 = utils.sum64;
	var sum64_hi = utils.sum64_hi;
	var sum64_lo = utils.sum64_lo;
	var sum64_4_hi = utils.sum64_4_hi;
	var sum64_4_lo = utils.sum64_4_lo;
	var sum64_5_hi = utils.sum64_5_hi;
	var sum64_5_lo = utils.sum64_5_lo;
	var BlockHash = hash.common.BlockHash;

	var sha256_K = [
	  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
	  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
	  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
	  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
	  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
	  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
	  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
	  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
	  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
	];

	var sha512_K = [
	  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	];

	var sha1_K = [
	  0x5A827999, 0x6ED9EBA1,
	  0x8F1BBCDC, 0xCA62C1D6
	];

	function SHA256() {
	  if (!(this instanceof SHA256))
	    return new SHA256();

	  BlockHash.call(this);
	  this.h = [ 0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
	             0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19 ];
	  this.k = sha256_K;
	  this.W = new Array(64);
	}
	utils.inherits(SHA256, BlockHash);
	exports.sha256 = SHA256;

	SHA256.blockSize = 512;
	SHA256.outSize = 256;
	SHA256.hmacStrength = 192;
	SHA256.padLength = 64;

	SHA256.prototype._update = function _update(msg, start) {
	  var W = this.W;

	  for (var i = 0; i < 16; i++)
	    W[i] = msg[start + i];
	  for (; i < W.length; i++)
	    W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);

	  var a = this.h[0];
	  var b = this.h[1];
	  var c = this.h[2];
	  var d = this.h[3];
	  var e = this.h[4];
	  var f = this.h[5];
	  var g = this.h[6];
	  var h = this.h[7];

	  assert(this.k.length === W.length);
	  for (var i = 0; i < W.length; i++) {
	    var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
	    var T2 = sum32(s0_256(a), maj32(a, b, c));
	    h = g;
	    g = f;
	    f = e;
	    e = sum32(d, T1);
	    d = c;
	    c = b;
	    b = a;
	    a = sum32(T1, T2);
	  }

	  this.h[0] = sum32(this.h[0], a);
	  this.h[1] = sum32(this.h[1], b);
	  this.h[2] = sum32(this.h[2], c);
	  this.h[3] = sum32(this.h[3], d);
	  this.h[4] = sum32(this.h[4], e);
	  this.h[5] = sum32(this.h[5], f);
	  this.h[6] = sum32(this.h[6], g);
	  this.h[7] = sum32(this.h[7], h);
	};

	SHA256.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils.toHex32(this.h, 'big');
	  else
	    return utils.split32(this.h, 'big');
	};

	function SHA224() {
	  if (!(this instanceof SHA224))
	    return new SHA224();

	  SHA256.call(this);
	  this.h = [ 0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
	             0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
	}
	utils.inherits(SHA224, SHA256);
	exports.sha224 = SHA224;

	SHA224.blockSize = 512;
	SHA224.outSize = 224;
	SHA224.hmacStrength = 192;
	SHA224.padLength = 64;

	SHA224.prototype._digest = function digest(enc) {
	  // Just truncate output
	  if (enc === 'hex')
	    return utils.toHex32(this.h.slice(0, 7), 'big');
	  else
	    return utils.split32(this.h.slice(0, 7), 'big');
	};

	function SHA512() {
	  if (!(this instanceof SHA512))
	    return new SHA512();

	  BlockHash.call(this);
	  this.h = [ 0x6a09e667, 0xf3bcc908,
	             0xbb67ae85, 0x84caa73b,
	             0x3c6ef372, 0xfe94f82b,
	             0xa54ff53a, 0x5f1d36f1,
	             0x510e527f, 0xade682d1,
	             0x9b05688c, 0x2b3e6c1f,
	             0x1f83d9ab, 0xfb41bd6b,
	             0x5be0cd19, 0x137e2179 ];
	  this.k = sha512_K;
	  this.W = new Array(160);
	}
	utils.inherits(SHA512, BlockHash);
	exports.sha512 = SHA512;

	SHA512.blockSize = 1024;
	SHA512.outSize = 512;
	SHA512.hmacStrength = 192;
	SHA512.padLength = 128;

	SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
	  var W = this.W;

	  // 32 x 32bit words
	  for (var i = 0; i < 32; i++)
	    W[i] = msg[start + i];
	  for (; i < W.length; i += 2) {
	    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
	    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
	    var c1_hi = W[i - 14];  // i - 7
	    var c1_lo = W[i - 13];
	    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
	    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
	    var c3_hi = W[i - 32];  // i - 16
	    var c3_lo = W[i - 31];

	    W[i] = sum64_4_hi(c0_hi, c0_lo,
	                      c1_hi, c1_lo,
	                      c2_hi, c2_lo,
	                      c3_hi, c3_lo);
	    W[i + 1] = sum64_4_lo(c0_hi, c0_lo,
	                          c1_hi, c1_lo,
	                          c2_hi, c2_lo,
	                          c3_hi, c3_lo);
	  }
	};

	SHA512.prototype._update = function _update(msg, start) {
	  this._prepareBlock(msg, start);

	  var W = this.W;

	  var ah = this.h[0];
	  var al = this.h[1];
	  var bh = this.h[2];
	  var bl = this.h[3];
	  var ch = this.h[4];
	  var cl = this.h[5];
	  var dh = this.h[6];
	  var dl = this.h[7];
	  var eh = this.h[8];
	  var el = this.h[9];
	  var fh = this.h[10];
	  var fl = this.h[11];
	  var gh = this.h[12];
	  var gl = this.h[13];
	  var hh = this.h[14];
	  var hl = this.h[15];

	  assert(this.k.length === W.length);
	  for (var i = 0; i < W.length; i += 2) {
	    var c0_hi = hh;
	    var c0_lo = hl;
	    var c1_hi = s1_512_hi(eh, el);
	    var c1_lo = s1_512_lo(eh, el);
	    var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
	    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
	    var c3_hi = this.k[i];
	    var c3_lo = this.k[i + 1];
	    var c4_hi = W[i];
	    var c4_lo = W[i + 1];

	    var T1_hi = sum64_5_hi(c0_hi, c0_lo,
	                           c1_hi, c1_lo,
	                           c2_hi, c2_lo,
	                           c3_hi, c3_lo,
	                           c4_hi, c4_lo);
	    var T1_lo = sum64_5_lo(c0_hi, c0_lo,
	                           c1_hi, c1_lo,
	                           c2_hi, c2_lo,
	                           c3_hi, c3_lo,
	                           c4_hi, c4_lo);

	    var c0_hi = s0_512_hi(ah, al);
	    var c0_lo = s0_512_lo(ah, al);
	    var c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
	    var c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

	    var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
	    var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

	    hh = gh;
	    hl = gl;

	    gh = fh;
	    gl = fl;

	    fh = eh;
	    fl = el;

	    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
	    el = sum64_lo(dl, dl, T1_hi, T1_lo);

	    dh = ch;
	    dl = cl;

	    ch = bh;
	    cl = bl;

	    bh = ah;
	    bl = al;

	    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
	    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
	  }

	  sum64(this.h, 0, ah, al);
	  sum64(this.h, 2, bh, bl);
	  sum64(this.h, 4, ch, cl);
	  sum64(this.h, 6, dh, dl);
	  sum64(this.h, 8, eh, el);
	  sum64(this.h, 10, fh, fl);
	  sum64(this.h, 12, gh, gl);
	  sum64(this.h, 14, hh, hl);
	};

	SHA512.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils.toHex32(this.h, 'big');
	  else
	    return utils.split32(this.h, 'big');
	};

	function SHA384() {
	  if (!(this instanceof SHA384))
	    return new SHA384();

	  SHA512.call(this);
	  this.h = [ 0xcbbb9d5d, 0xc1059ed8,
	             0x629a292a, 0x367cd507,
	             0x9159015a, 0x3070dd17,
	             0x152fecd8, 0xf70e5939,
	             0x67332667, 0xffc00b31,
	             0x8eb44a87, 0x68581511,
	             0xdb0c2e0d, 0x64f98fa7,
	             0x47b5481d, 0xbefa4fa4 ];
	}
	utils.inherits(SHA384, SHA512);
	exports.sha384 = SHA384;

	SHA384.blockSize = 1024;
	SHA384.outSize = 384;
	SHA384.hmacStrength = 192;
	SHA384.padLength = 128;

	SHA384.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils.toHex32(this.h.slice(0, 12), 'big');
	  else
	    return utils.split32(this.h.slice(0, 12), 'big');
	};

	function SHA1() {
	  if (!(this instanceof SHA1))
	    return new SHA1();

	  BlockHash.call(this);
	  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe,
	             0x10325476, 0xc3d2e1f0 ];
	  this.W = new Array(80);
	}

	utils.inherits(SHA1, BlockHash);
	exports.sha1 = SHA1;

	SHA1.blockSize = 512;
	SHA1.outSize = 160;
	SHA1.hmacStrength = 80;
	SHA1.padLength = 64;

	SHA1.prototype._update = function _update(msg, start) {
	  var W = this.W;

	  for (var i = 0; i < 16; i++)
	    W[i] = msg[start + i];

	  for(; i < W.length; i++)
	    W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

	  var a = this.h[0];
	  var b = this.h[1];
	  var c = this.h[2];
	  var d = this.h[3];
	  var e = this.h[4];

	  for (var i = 0; i < W.length; i++) {
	    var s = ~~(i / 20);
	    var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
	    e = d;
	    d = c;
	    c = rotl32(b, 30);
	    b = a;
	    a = t;
	  }

	  this.h[0] = sum32(this.h[0], a);
	  this.h[1] = sum32(this.h[1], b);
	  this.h[2] = sum32(this.h[2], c);
	  this.h[3] = sum32(this.h[3], d);
	  this.h[4] = sum32(this.h[4], e);
	};

	SHA1.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils.toHex32(this.h, 'big');
	  else
	    return utils.split32(this.h, 'big');
	};

	function ch32(x, y, z) {
	  return (x & y) ^ ((~x) & z);
	}

	function maj32(x, y, z) {
	  return (x & y) ^ (x & z) ^ (y & z);
	}

	function p32(x, y, z) {
	  return x ^ y ^ z;
	}

	function s0_256(x) {
	  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
	}

	function s1_256(x) {
	  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
	}

	function g0_256(x) {
	  return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
	}

	function g1_256(x) {
	  return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
	}

	function ft_1(s, x, y, z) {
	  if (s === 0)
	    return ch32(x, y, z);
	  if (s === 1 || s === 3)
	    return p32(x, y, z);
	  if (s === 2)
	    return maj32(x, y, z);
	}

	function ch64_hi(xh, xl, yh, yl, zh, zl) {
	  var r = (xh & yh) ^ ((~xh) & zh);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function ch64_lo(xh, xl, yh, yl, zh, zl) {
	  var r = (xl & yl) ^ ((~xl) & zl);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function maj64_hi(xh, xl, yh, yl, zh, zl) {
	  var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function maj64_lo(xh, xl, yh, yl, zh, zl) {
	  var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s0_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 28);
	  var c1_hi = rotr64_hi(xl, xh, 2);  // 34
	  var c2_hi = rotr64_hi(xl, xh, 7);  // 39

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s0_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 28);
	  var c1_lo = rotr64_lo(xl, xh, 2);  // 34
	  var c2_lo = rotr64_lo(xl, xh, 7);  // 39

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s1_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 14);
	  var c1_hi = rotr64_hi(xh, xl, 18);
	  var c2_hi = rotr64_hi(xl, xh, 9);  // 41

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function s1_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 14);
	  var c1_lo = rotr64_lo(xh, xl, 18);
	  var c2_lo = rotr64_lo(xl, xh, 9);  // 41

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g0_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 1);
	  var c1_hi = rotr64_hi(xh, xl, 8);
	  var c2_hi = shr64_hi(xh, xl, 7);

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g0_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 1);
	  var c1_lo = rotr64_lo(xh, xl, 8);
	  var c2_lo = shr64_lo(xh, xl, 7);

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g1_512_hi(xh, xl) {
	  var c0_hi = rotr64_hi(xh, xl, 19);
	  var c1_hi = rotr64_hi(xl, xh, 29);  // 61
	  var c2_hi = shr64_hi(xh, xl, 6);

	  var r = c0_hi ^ c1_hi ^ c2_hi;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}

	function g1_512_lo(xh, xl) {
	  var c0_lo = rotr64_lo(xh, xl, 19);
	  var c1_lo = rotr64_lo(xl, xh, 29);  // 61
	  var c2_lo = shr64_lo(xh, xl, 6);

	  var r = c0_lo ^ c1_lo ^ c2_lo;
	  if (r < 0)
	    r += 0x100000000;
	  return r;
	}


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var hash = __webpack_require__(35);
	var utils = hash.utils;

	var rotl32 = utils.rotl32;
	var sum32 = utils.sum32;
	var sum32_3 = utils.sum32_3;
	var sum32_4 = utils.sum32_4;
	var BlockHash = hash.common.BlockHash;

	function RIPEMD160() {
	  if (!(this instanceof RIPEMD160))
	    return new RIPEMD160();

	  BlockHash.call(this);

	  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
	  this.endian = 'little';
	}
	utils.inherits(RIPEMD160, BlockHash);
	exports.ripemd160 = RIPEMD160;

	RIPEMD160.blockSize = 512;
	RIPEMD160.outSize = 160;
	RIPEMD160.hmacStrength = 192;
	RIPEMD160.padLength = 64;

	RIPEMD160.prototype._update = function update(msg, start) {
	  var A = this.h[0];
	  var B = this.h[1];
	  var C = this.h[2];
	  var D = this.h[3];
	  var E = this.h[4];
	  var Ah = A;
	  var Bh = B;
	  var Ch = C;
	  var Dh = D;
	  var Eh = E;
	  for (var j = 0; j < 80; j++) {
	    var T = sum32(
	      rotl32(
	        sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
	        s[j]),
	      E);
	    A = E;
	    E = D;
	    D = rotl32(C, 10);
	    C = B;
	    B = T;
	    T = sum32(
	      rotl32(
	        sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
	        sh[j]),
	      Eh);
	    Ah = Eh;
	    Eh = Dh;
	    Dh = rotl32(Ch, 10);
	    Ch = Bh;
	    Bh = T;
	  }
	  T = sum32_3(this.h[1], C, Dh);
	  this.h[1] = sum32_3(this.h[2], D, Eh);
	  this.h[2] = sum32_3(this.h[3], E, Ah);
	  this.h[3] = sum32_3(this.h[4], A, Bh);
	  this.h[4] = sum32_3(this.h[0], B, Ch);
	  this.h[0] = T;
	};

	RIPEMD160.prototype._digest = function digest(enc) {
	  if (enc === 'hex')
	    return utils.toHex32(this.h, 'little');
	  else
	    return utils.split32(this.h, 'little');
	};

	function f(j, x, y, z) {
	  if (j <= 15)
	    return x ^ y ^ z;
	  else if (j <= 31)
	    return (x & y) | ((~x) & z);
	  else if (j <= 47)
	    return (x | (~y)) ^ z;
	  else if (j <= 63)
	    return (x & z) | (y & (~z));
	  else
	    return x ^ (y | (~z));
	}

	function K(j) {
	  if (j <= 15)
	    return 0x00000000;
	  else if (j <= 31)
	    return 0x5a827999;
	  else if (j <= 47)
	    return 0x6ed9eba1;
	  else if (j <= 63)
	    return 0x8f1bbcdc;
	  else
	    return 0xa953fd4e;
	}

	function Kh(j) {
	  if (j <= 15)
	    return 0x50a28be6;
	  else if (j <= 31)
	    return 0x5c4dd124;
	  else if (j <= 47)
	    return 0x6d703ef3;
	  else if (j <= 63)
	    return 0x7a6d76e9;
	  else
	    return 0x00000000;
	}

	var r = [
	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
	  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
	  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
	  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
	  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
	];

	var rh = [
	  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
	  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
	  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
	  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
	  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
	];

	var s = [
	  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
	  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
	  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
	  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
	  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
	];

	var sh = [
	  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
	  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
	  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
	  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
	  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
	];


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var hmac = exports;

	var hash = __webpack_require__(35);
	var utils = hash.utils;
	var assert = utils.assert;

	function Hmac(hash, key, enc) {
	  if (!(this instanceof Hmac))
	    return new Hmac(hash, key, enc);
	  this.Hash = hash;
	  this.blockSize = hash.blockSize / 8;
	  this.outSize = hash.outSize / 8;
	  this.inner = null;
	  this.outer = null;

	  this._init(utils.toArray(key, enc));
	}
	module.exports = Hmac;

	Hmac.prototype._init = function init(key) {
	  // Shorten key, if needed
	  if (key.length > this.blockSize)
	    key = new this.Hash().update(key).digest();
	  assert(key.length <= this.blockSize);

	  // Add padding to key
	  for (var i = key.length; i < this.blockSize; i++)
	    key.push(0);

	  for (var i = 0; i < key.length; i++)
	    key[i] ^= 0x36;
	  this.inner = new this.Hash().update(key);

	  // 0x36 ^ 0x5c = 0x6a
	  for (var i = 0; i < key.length; i++)
	    key[i] ^= 0x6a;
	  this.outer = new this.Hash().update(key);
	};

	Hmac.prototype.update = function update(msg, enc) {
	  this.inner.update(msg, enc);
	  return this;
	};

	Hmac.prototype.digest = function digest(enc) {
	  this.outer.update(this.inner.digest());
	  return this.outer.digest(enc);
	};


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var curve = exports;

	curve.base = __webpack_require__(43);
	curve.short = __webpack_require__(44);
	curve.mont = __webpack_require__(45);
	curve.edwards = __webpack_require__(46);


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BN = __webpack_require__(26);
	var elliptic = __webpack_require__(24);
	var utils = elliptic.utils;
	var getNAF = utils.getNAF;
	var getJSF = utils.getJSF;
	var assert = utils.assert;

	function BaseCurve(type, conf) {
	  this.type = type;
	  this.p = new BN(conf.p, 16);

	  // Use Montgomery, when there is no fast reduction for the prime
	  this.red = conf.prime ? BN.red(conf.prime) : BN.mont(this.p);

	  // Useful for many curves
	  this.zero = new BN(0).toRed(this.red);
	  this.one = new BN(1).toRed(this.red);
	  this.two = new BN(2).toRed(this.red);

	  // Curve configuration, optional
	  this.n = conf.n && new BN(conf.n, 16);
	  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);

	  // Temporary arrays
	  this._wnafT1 = new Array(4);
	  this._wnafT2 = new Array(4);
	  this._wnafT3 = new Array(4);
	  this._wnafT4 = new Array(4);

	  // Generalized Greg Maxwell's trick
	  var adjustCount = this.n && this.p.div(this.n);
	  if (!adjustCount || adjustCount.cmpn(100) > 0) {
	    this.redN = null;
	  } else {
	    this._maxwellTrick = true;
	    this.redN = this.n.toRed(this.red);
	  }
	}
	module.exports = BaseCurve;

	BaseCurve.prototype.point = function point() {
	  throw new Error('Not implemented');
	};

	BaseCurve.prototype.validate = function validate() {
	  throw new Error('Not implemented');
	};

	BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
	  assert(p.precomputed);
	  var doubles = p._getDoubles();

	  var naf = getNAF(k, 1);
	  var I = (1 << (doubles.step + 1)) - (doubles.step % 2 === 0 ? 2 : 1);
	  I /= 3;

	  // Translate into more windowed form
	  var repr = [];
	  for (var j = 0; j < naf.length; j += doubles.step) {
	    var nafW = 0;
	    for (var k = j + doubles.step - 1; k >= j; k--)
	      nafW = (nafW << 1) + naf[k];
	    repr.push(nafW);
	  }

	  var a = this.jpoint(null, null, null);
	  var b = this.jpoint(null, null, null);
	  for (var i = I; i > 0; i--) {
	    for (var j = 0; j < repr.length; j++) {
	      var nafW = repr[j];
	      if (nafW === i)
	        b = b.mixedAdd(doubles.points[j]);
	      else if (nafW === -i)
	        b = b.mixedAdd(doubles.points[j].neg());
	    }
	    a = a.add(b);
	  }
	  return a.toP();
	};

	BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
	  var w = 4;

	  // Precompute window
	  var nafPoints = p._getNAFPoints(w);
	  w = nafPoints.wnd;
	  var wnd = nafPoints.points;

	  // Get NAF form
	  var naf = getNAF(k, w);

	  // Add `this`*(N+1) for every w-NAF index
	  var acc = this.jpoint(null, null, null);
	  for (var i = naf.length - 1; i >= 0; i--) {
	    // Count zeroes
	    for (var k = 0; i >= 0 && naf[i] === 0; i--)
	      k++;
	    if (i >= 0)
	      k++;
	    acc = acc.dblp(k);

	    if (i < 0)
	      break;
	    var z = naf[i];
	    assert(z !== 0);
	    if (p.type === 'affine') {
	      // J +- P
	      if (z > 0)
	        acc = acc.mixedAdd(wnd[(z - 1) >> 1]);
	      else
	        acc = acc.mixedAdd(wnd[(-z - 1) >> 1].neg());
	    } else {
	      // J +- J
	      if (z > 0)
	        acc = acc.add(wnd[(z - 1) >> 1]);
	      else
	        acc = acc.add(wnd[(-z - 1) >> 1].neg());
	    }
	  }
	  return p.type === 'affine' ? acc.toP() : acc;
	};

	BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW,
	                                                       points,
	                                                       coeffs,
	                                                       len,
	                                                       jacobianResult) {
	  var wndWidth = this._wnafT1;
	  var wnd = this._wnafT2;
	  var naf = this._wnafT3;

	  // Fill all arrays
	  var max = 0;
	  for (var i = 0; i < len; i++) {
	    var p = points[i];
	    var nafPoints = p._getNAFPoints(defW);
	    wndWidth[i] = nafPoints.wnd;
	    wnd[i] = nafPoints.points;
	  }

	  // Comb small window NAFs
	  for (var i = len - 1; i >= 1; i -= 2) {
	    var a = i - 1;
	    var b = i;
	    if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
	      naf[a] = getNAF(coeffs[a], wndWidth[a]);
	      naf[b] = getNAF(coeffs[b], wndWidth[b]);
	      max = Math.max(naf[a].length, max);
	      max = Math.max(naf[b].length, max);
	      continue;
	    }

	    var comb = [
	      points[a], /* 1 */
	      null, /* 3 */
	      null, /* 5 */
	      points[b] /* 7 */
	    ];

	    // Try to avoid Projective points, if possible
	    if (points[a].y.cmp(points[b].y) === 0) {
	      comb[1] = points[a].add(points[b]);
	      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
	    } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
	      comb[1] = points[a].toJ().mixedAdd(points[b]);
	      comb[2] = points[a].add(points[b].neg());
	    } else {
	      comb[1] = points[a].toJ().mixedAdd(points[b]);
	      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
	    }

	    var index = [
	      -3, /* -1 -1 */
	      -1, /* -1 0 */
	      -5, /* -1 1 */
	      -7, /* 0 -1 */
	      0, /* 0 0 */
	      7, /* 0 1 */
	      5, /* 1 -1 */
	      1, /* 1 0 */
	      3  /* 1 1 */
	    ];

	    var jsf = getJSF(coeffs[a], coeffs[b]);
	    max = Math.max(jsf[0].length, max);
	    naf[a] = new Array(max);
	    naf[b] = new Array(max);
	    for (var j = 0; j < max; j++) {
	      var ja = jsf[0][j] | 0;
	      var jb = jsf[1][j] | 0;

	      naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
	      naf[b][j] = 0;
	      wnd[a] = comb;
	    }
	  }

	  var acc = this.jpoint(null, null, null);
	  var tmp = this._wnafT4;
	  for (var i = max; i >= 0; i--) {
	    var k = 0;

	    while (i >= 0) {
	      var zero = true;
	      for (var j = 0; j < len; j++) {
	        tmp[j] = naf[j][i] | 0;
	        if (tmp[j] !== 0)
	          zero = false;
	      }
	      if (!zero)
	        break;
	      k++;
	      i--;
	    }
	    if (i >= 0)
	      k++;
	    acc = acc.dblp(k);
	    if (i < 0)
	      break;

	    for (var j = 0; j < len; j++) {
	      var z = tmp[j];
	      var p;
	      if (z === 0)
	        continue;
	      else if (z > 0)
	        p = wnd[j][(z - 1) >> 1];
	      else if (z < 0)
	        p = wnd[j][(-z - 1) >> 1].neg();

	      if (p.type === 'affine')
	        acc = acc.mixedAdd(p);
	      else
	        acc = acc.add(p);
	    }
	  }
	  // Zeroify references
	  for (var i = 0; i < len; i++)
	    wnd[i] = null;

	  if (jacobianResult)
	    return acc;
	  else
	    return acc.toP();
	};

	function BasePoint(curve, type) {
	  this.curve = curve;
	  this.type = type;
	  this.precomputed = null;
	}
	BaseCurve.BasePoint = BasePoint;

	BasePoint.prototype.eq = function eq(/*other*/) {
	  throw new Error('Not implemented');
	};

	BasePoint.prototype.validate = function validate() {
	  return this.curve.validate(this);
	};

	BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
	  bytes = utils.toArray(bytes, enc);

	  var len = this.p.byteLength();

	  // uncompressed, hybrid-odd, hybrid-even
	  if ((bytes[0] === 0x04 || bytes[0] === 0x06 || bytes[0] === 0x07) &&
	      bytes.length - 1 === 2 * len) {
	    if (bytes[0] === 0x06)
	      assert(bytes[bytes.length - 1] % 2 === 0);
	    else if (bytes[0] === 0x07)
	      assert(bytes[bytes.length - 1] % 2 === 1);

	    var res =  this.point(bytes.slice(1, 1 + len),
	                          bytes.slice(1 + len, 1 + 2 * len));

	    return res;
	  } else if ((bytes[0] === 0x02 || bytes[0] === 0x03) &&
	              bytes.length - 1 === len) {
	    return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 0x03);
	  }
	  throw new Error('Unknown point format');
	};

	BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
	  return this.encode(enc, true);
	};

	BasePoint.prototype._encode = function _encode(compact) {
	  var len = this.curve.p.byteLength();
	  var x = this.getX().toArray('be', len);

	  if (compact)
	    return [ this.getY().isEven() ? 0x02 : 0x03 ].concat(x);

	  return [ 0x04 ].concat(x, this.getY().toArray('be', len)) ;
	};

	BasePoint.prototype.encode = function encode(enc, compact) {
	  return utils.encode(this._encode(compact), enc);
	};

	BasePoint.prototype.precompute = function precompute(power) {
	  if (this.precomputed)
	    return this;

	  var precomputed = {
	    doubles: null,
	    naf: null,
	    beta: null
	  };
	  precomputed.naf = this._getNAFPoints(8);
	  precomputed.doubles = this._getDoubles(4, power);
	  precomputed.beta = this._getBeta();
	  this.precomputed = precomputed;

	  return this;
	};

	BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
	  if (!this.precomputed)
	    return false;

	  var doubles = this.precomputed.doubles;
	  if (!doubles)
	    return false;

	  return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
	};

	BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
	  if (this.precomputed && this.precomputed.doubles)
	    return this.precomputed.doubles;

	  var doubles = [ this ];
	  var acc = this;
	  for (var i = 0; i < power; i += step) {
	    for (var j = 0; j < step; j++)
	      acc = acc.dbl();
	    doubles.push(acc);
	  }
	  return {
	    step: step,
	    points: doubles
	  };
	};

	BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
	  if (this.precomputed && this.precomputed.naf)
	    return this.precomputed.naf;

	  var res = [ this ];
	  var max = (1 << wnd) - 1;
	  var dbl = max === 1 ? null : this.dbl();
	  for (var i = 1; i < max; i++)
	    res[i] = res[i - 1].add(dbl);
	  return {
	    wnd: wnd,
	    points: res
	  };
	};

	BasePoint.prototype._getBeta = function _getBeta() {
	  return null;
	};

	BasePoint.prototype.dblp = function dblp(k) {
	  var r = this;
	  for (var i = 0; i < k; i++)
	    r = r.dbl();
	  return r;
	};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var curve = __webpack_require__(42);
	var elliptic = __webpack_require__(24);
	var BN = __webpack_require__(26);
	var inherits = __webpack_require__(37);
	var Base = curve.base;

	var assert = elliptic.utils.assert;

	function ShortCurve(conf) {
	  Base.call(this, 'short', conf);

	  this.a = new BN(conf.a, 16).toRed(this.red);
	  this.b = new BN(conf.b, 16).toRed(this.red);
	  this.tinv = this.two.redInvm();

	  this.zeroA = this.a.fromRed().cmpn(0) === 0;
	  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;

	  // If the curve is endomorphic, precalculate beta and lambda
	  this.endo = this._getEndomorphism(conf);
	  this._endoWnafT1 = new Array(4);
	  this._endoWnafT2 = new Array(4);
	}
	inherits(ShortCurve, Base);
	module.exports = ShortCurve;

	ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
	  // No efficient endomorphism
	  if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
	    return;

	  // Compute beta and lambda, that lambda * P = (beta * Px; Py)
	  var beta;
	  var lambda;
	  if (conf.beta) {
	    beta = new BN(conf.beta, 16).toRed(this.red);
	  } else {
	    var betas = this._getEndoRoots(this.p);
	    // Choose the smallest beta
	    beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
	    beta = beta.toRed(this.red);
	  }
	  if (conf.lambda) {
	    lambda = new BN(conf.lambda, 16);
	  } else {
	    // Choose the lambda that is matching selected beta
	    var lambdas = this._getEndoRoots(this.n);
	    if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
	      lambda = lambdas[0];
	    } else {
	      lambda = lambdas[1];
	      assert(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
	    }
	  }

	  // Get basis vectors, used for balanced length-two representation
	  var basis;
	  if (conf.basis) {
	    basis = conf.basis.map(function(vec) {
	      return {
	        a: new BN(vec.a, 16),
	        b: new BN(vec.b, 16)
	      };
	    });
	  } else {
	    basis = this._getEndoBasis(lambda);
	  }

	  return {
	    beta: beta,
	    lambda: lambda,
	    basis: basis
	  };
	};

	ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
	  // Find roots of for x^2 + x + 1 in F
	  // Root = (-1 +- Sqrt(-3)) / 2
	  //
	  var red = num === this.p ? this.red : BN.mont(num);
	  var tinv = new BN(2).toRed(red).redInvm();
	  var ntinv = tinv.redNeg();

	  var s = new BN(3).toRed(red).redNeg().redSqrt().redMul(tinv);

	  var l1 = ntinv.redAdd(s).fromRed();
	  var l2 = ntinv.redSub(s).fromRed();
	  return [ l1, l2 ];
	};

	ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
	  // aprxSqrt >= sqrt(this.n)
	  var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));

	  // 3.74
	  // Run EGCD, until r(L + 1) < aprxSqrt
	  var u = lambda;
	  var v = this.n.clone();
	  var x1 = new BN(1);
	  var y1 = new BN(0);
	  var x2 = new BN(0);
	  var y2 = new BN(1);

	  // NOTE: all vectors are roots of: a + b * lambda = 0 (mod n)
	  var a0;
	  var b0;
	  // First vector
	  var a1;
	  var b1;
	  // Second vector
	  var a2;
	  var b2;

	  var prevR;
	  var i = 0;
	  var r;
	  var x;
	  while (u.cmpn(0) !== 0) {
	    var q = v.div(u);
	    r = v.sub(q.mul(u));
	    x = x2.sub(q.mul(x1));
	    var y = y2.sub(q.mul(y1));

	    if (!a1 && r.cmp(aprxSqrt) < 0) {
	      a0 = prevR.neg();
	      b0 = x1;
	      a1 = r.neg();
	      b1 = x;
	    } else if (a1 && ++i === 2) {
	      break;
	    }
	    prevR = r;

	    v = u;
	    u = r;
	    x2 = x1;
	    x1 = x;
	    y2 = y1;
	    y1 = y;
	  }
	  a2 = r.neg();
	  b2 = x;

	  var len1 = a1.sqr().add(b1.sqr());
	  var len2 = a2.sqr().add(b2.sqr());
	  if (len2.cmp(len1) >= 0) {
	    a2 = a0;
	    b2 = b0;
	  }

	  // Normalize signs
	  if (a1.negative) {
	    a1 = a1.neg();
	    b1 = b1.neg();
	  }
	  if (a2.negative) {
	    a2 = a2.neg();
	    b2 = b2.neg();
	  }

	  return [
	    { a: a1, b: b1 },
	    { a: a2, b: b2 }
	  ];
	};

	ShortCurve.prototype._endoSplit = function _endoSplit(k) {
	  var basis = this.endo.basis;
	  var v1 = basis[0];
	  var v2 = basis[1];

	  var c1 = v2.b.mul(k).divRound(this.n);
	  var c2 = v1.b.neg().mul(k).divRound(this.n);

	  var p1 = c1.mul(v1.a);
	  var p2 = c2.mul(v2.a);
	  var q1 = c1.mul(v1.b);
	  var q2 = c2.mul(v2.b);

	  // Calculate answer
	  var k1 = k.sub(p1).sub(p2);
	  var k2 = q1.add(q2).neg();
	  return { k1: k1, k2: k2 };
	};

	ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
	  x = new BN(x, 16);
	  if (!x.red)
	    x = x.toRed(this.red);

	  var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
	  var y = y2.redSqrt();
	  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
	    throw new Error('invalid point');

	  // XXX Is there any way to tell if the number is odd without converting it
	  // to non-red form?
	  var isOdd = y.fromRed().isOdd();
	  if (odd && !isOdd || !odd && isOdd)
	    y = y.redNeg();

	  return this.point(x, y);
	};

	ShortCurve.prototype.validate = function validate(point) {
	  if (point.inf)
	    return true;

	  var x = point.x;
	  var y = point.y;

	  var ax = this.a.redMul(x);
	  var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
	  return y.redSqr().redISub(rhs).cmpn(0) === 0;
	};

	ShortCurve.prototype._endoWnafMulAdd =
	    function _endoWnafMulAdd(points, coeffs, jacobianResult) {
	  var npoints = this._endoWnafT1;
	  var ncoeffs = this._endoWnafT2;
	  for (var i = 0; i < points.length; i++) {
	    var split = this._endoSplit(coeffs[i]);
	    var p = points[i];
	    var beta = p._getBeta();

	    if (split.k1.negative) {
	      split.k1.ineg();
	      p = p.neg(true);
	    }
	    if (split.k2.negative) {
	      split.k2.ineg();
	      beta = beta.neg(true);
	    }

	    npoints[i * 2] = p;
	    npoints[i * 2 + 1] = beta;
	    ncoeffs[i * 2] = split.k1;
	    ncoeffs[i * 2 + 1] = split.k2;
	  }
	  var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);

	  // Clean-up references to points and coefficients
	  for (var j = 0; j < i * 2; j++) {
	    npoints[j] = null;
	    ncoeffs[j] = null;
	  }
	  return res;
	};

	function Point(curve, x, y, isRed) {
	  Base.BasePoint.call(this, curve, 'affine');
	  if (x === null && y === null) {
	    this.x = null;
	    this.y = null;
	    this.inf = true;
	  } else {
	    this.x = new BN(x, 16);
	    this.y = new BN(y, 16);
	    // Force redgomery representation when loading from JSON
	    if (isRed) {
	      this.x.forceRed(this.curve.red);
	      this.y.forceRed(this.curve.red);
	    }
	    if (!this.x.red)
	      this.x = this.x.toRed(this.curve.red);
	    if (!this.y.red)
	      this.y = this.y.toRed(this.curve.red);
	    this.inf = false;
	  }
	}
	inherits(Point, Base.BasePoint);

	ShortCurve.prototype.point = function point(x, y, isRed) {
	  return new Point(this, x, y, isRed);
	};

	ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
	  return Point.fromJSON(this, obj, red);
	};

	Point.prototype._getBeta = function _getBeta() {
	  if (!this.curve.endo)
	    return;

	  var pre = this.precomputed;
	  if (pre && pre.beta)
	    return pre.beta;

	  var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
	  if (pre) {
	    var curve = this.curve;
	    var endoMul = function(p) {
	      return curve.point(p.x.redMul(curve.endo.beta), p.y);
	    };
	    pre.beta = beta;
	    beta.precomputed = {
	      beta: null,
	      naf: pre.naf && {
	        wnd: pre.naf.wnd,
	        points: pre.naf.points.map(endoMul)
	      },
	      doubles: pre.doubles && {
	        step: pre.doubles.step,
	        points: pre.doubles.points.map(endoMul)
	      }
	    };
	  }
	  return beta;
	};

	Point.prototype.toJSON = function toJSON() {
	  if (!this.precomputed)
	    return [ this.x, this.y ];

	  return [ this.x, this.y, this.precomputed && {
	    doubles: this.precomputed.doubles && {
	      step: this.precomputed.doubles.step,
	      points: this.precomputed.doubles.points.slice(1)
	    },
	    naf: this.precomputed.naf && {
	      wnd: this.precomputed.naf.wnd,
	      points: this.precomputed.naf.points.slice(1)
	    }
	  } ];
	};

	Point.fromJSON = function fromJSON(curve, obj, red) {
	  if (typeof obj === 'string')
	    obj = JSON.parse(obj);
	  var res = curve.point(obj[0], obj[1], red);
	  if (!obj[2])
	    return res;

	  function obj2point(obj) {
	    return curve.point(obj[0], obj[1], red);
	  }

	  var pre = obj[2];
	  res.precomputed = {
	    beta: null,
	    doubles: pre.doubles && {
	      step: pre.doubles.step,
	      points: [ res ].concat(pre.doubles.points.map(obj2point))
	    },
	    naf: pre.naf && {
	      wnd: pre.naf.wnd,
	      points: [ res ].concat(pre.naf.points.map(obj2point))
	    }
	  };
	  return res;
	};

	Point.prototype.inspect = function inspect() {
	  if (this.isInfinity())
	    return '<EC Point Infinity>';
	  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
	      ' y: ' + this.y.fromRed().toString(16, 2) + '>';
	};

	Point.prototype.isInfinity = function isInfinity() {
	  return this.inf;
	};

	Point.prototype.add = function add(p) {
	  // O + P = P
	  if (this.inf)
	    return p;

	  // P + O = P
	  if (p.inf)
	    return this;

	  // P + P = 2P
	  if (this.eq(p))
	    return this.dbl();

	  // P + (-P) = O
	  if (this.neg().eq(p))
	    return this.curve.point(null, null);

	  // P + Q = O
	  if (this.x.cmp(p.x) === 0)
	    return this.curve.point(null, null);

	  var c = this.y.redSub(p.y);
	  if (c.cmpn(0) !== 0)
	    c = c.redMul(this.x.redSub(p.x).redInvm());
	  var nx = c.redSqr().redISub(this.x).redISub(p.x);
	  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
	  return this.curve.point(nx, ny);
	};

	Point.prototype.dbl = function dbl() {
	  if (this.inf)
	    return this;

	  // 2P = O
	  var ys1 = this.y.redAdd(this.y);
	  if (ys1.cmpn(0) === 0)
	    return this.curve.point(null, null);

	  var a = this.curve.a;

	  var x2 = this.x.redSqr();
	  var dyinv = ys1.redInvm();
	  var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);

	  var nx = c.redSqr().redISub(this.x.redAdd(this.x));
	  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
	  return this.curve.point(nx, ny);
	};

	Point.prototype.getX = function getX() {
	  return this.x.fromRed();
	};

	Point.prototype.getY = function getY() {
	  return this.y.fromRed();
	};

	Point.prototype.mul = function mul(k) {
	  k = new BN(k, 16);

	  if (this._hasDoubles(k))
	    return this.curve._fixedNafMul(this, k);
	  else if (this.curve.endo)
	    return this.curve._endoWnafMulAdd([ this ], [ k ]);
	  else
	    return this.curve._wnafMul(this, k);
	};

	Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
	  var points = [ this, p2 ];
	  var coeffs = [ k1, k2 ];
	  if (this.curve.endo)
	    return this.curve._endoWnafMulAdd(points, coeffs);
	  else
	    return this.curve._wnafMulAdd(1, points, coeffs, 2);
	};

	Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
	  var points = [ this, p2 ];
	  var coeffs = [ k1, k2 ];
	  if (this.curve.endo)
	    return this.curve._endoWnafMulAdd(points, coeffs, true);
	  else
	    return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
	};

	Point.prototype.eq = function eq(p) {
	  return this === p ||
	         this.inf === p.inf &&
	             (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
	};

	Point.prototype.neg = function neg(_precompute) {
	  if (this.inf)
	    return this;

	  var res = this.curve.point(this.x, this.y.redNeg());
	  if (_precompute && this.precomputed) {
	    var pre = this.precomputed;
	    var negate = function(p) {
	      return p.neg();
	    };
	    res.precomputed = {
	      naf: pre.naf && {
	        wnd: pre.naf.wnd,
	        points: pre.naf.points.map(negate)
	      },
	      doubles: pre.doubles && {
	        step: pre.doubles.step,
	        points: pre.doubles.points.map(negate)
	      }
	    };
	  }
	  return res;
	};

	Point.prototype.toJ = function toJ() {
	  if (this.inf)
	    return this.curve.jpoint(null, null, null);

	  var res = this.curve.jpoint(this.x, this.y, this.curve.one);
	  return res;
	};

	function JPoint(curve, x, y, z) {
	  Base.BasePoint.call(this, curve, 'jacobian');
	  if (x === null && y === null && z === null) {
	    this.x = this.curve.one;
	    this.y = this.curve.one;
	    this.z = new BN(0);
	  } else {
	    this.x = new BN(x, 16);
	    this.y = new BN(y, 16);
	    this.z = new BN(z, 16);
	  }
	  if (!this.x.red)
	    this.x = this.x.toRed(this.curve.red);
	  if (!this.y.red)
	    this.y = this.y.toRed(this.curve.red);
	  if (!this.z.red)
	    this.z = this.z.toRed(this.curve.red);

	  this.zOne = this.z === this.curve.one;
	}
	inherits(JPoint, Base.BasePoint);

	ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
	  return new JPoint(this, x, y, z);
	};

	JPoint.prototype.toP = function toP() {
	  if (this.isInfinity())
	    return this.curve.point(null, null);

	  var zinv = this.z.redInvm();
	  var zinv2 = zinv.redSqr();
	  var ax = this.x.redMul(zinv2);
	  var ay = this.y.redMul(zinv2).redMul(zinv);

	  return this.curve.point(ax, ay);
	};

	JPoint.prototype.neg = function neg() {
	  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
	};

	JPoint.prototype.add = function add(p) {
	  // O + P = P
	  if (this.isInfinity())
	    return p;

	  // P + O = P
	  if (p.isInfinity())
	    return this;

	  // 12M + 4S + 7A
	  var pz2 = p.z.redSqr();
	  var z2 = this.z.redSqr();
	  var u1 = this.x.redMul(pz2);
	  var u2 = p.x.redMul(z2);
	  var s1 = this.y.redMul(pz2.redMul(p.z));
	  var s2 = p.y.redMul(z2.redMul(this.z));

	  var h = u1.redSub(u2);
	  var r = s1.redSub(s2);
	  if (h.cmpn(0) === 0) {
	    if (r.cmpn(0) !== 0)
	      return this.curve.jpoint(null, null, null);
	    else
	      return this.dbl();
	  }

	  var h2 = h.redSqr();
	  var h3 = h2.redMul(h);
	  var v = u1.redMul(h2);

	  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
	  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
	  var nz = this.z.redMul(p.z).redMul(h);

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype.mixedAdd = function mixedAdd(p) {
	  // O + P = P
	  if (this.isInfinity())
	    return p.toJ();

	  // P + O = P
	  if (p.isInfinity())
	    return this;

	  // 8M + 3S + 7A
	  var z2 = this.z.redSqr();
	  var u1 = this.x;
	  var u2 = p.x.redMul(z2);
	  var s1 = this.y;
	  var s2 = p.y.redMul(z2).redMul(this.z);

	  var h = u1.redSub(u2);
	  var r = s1.redSub(s2);
	  if (h.cmpn(0) === 0) {
	    if (r.cmpn(0) !== 0)
	      return this.curve.jpoint(null, null, null);
	    else
	      return this.dbl();
	  }

	  var h2 = h.redSqr();
	  var h3 = h2.redMul(h);
	  var v = u1.redMul(h2);

	  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
	  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
	  var nz = this.z.redMul(h);

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype.dblp = function dblp(pow) {
	  if (pow === 0)
	    return this;
	  if (this.isInfinity())
	    return this;
	  if (!pow)
	    return this.dbl();

	  if (this.curve.zeroA || this.curve.threeA) {
	    var r = this;
	    for (var i = 0; i < pow; i++)
	      r = r.dbl();
	    return r;
	  }

	  // 1M + 2S + 1A + N * (4S + 5M + 8A)
	  // N = 1 => 6M + 6S + 9A
	  var a = this.curve.a;
	  var tinv = this.curve.tinv;

	  var jx = this.x;
	  var jy = this.y;
	  var jz = this.z;
	  var jz4 = jz.redSqr().redSqr();

	  // Reuse results
	  var jyd = jy.redAdd(jy);
	  for (var i = 0; i < pow; i++) {
	    var jx2 = jx.redSqr();
	    var jyd2 = jyd.redSqr();
	    var jyd4 = jyd2.redSqr();
	    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

	    var t1 = jx.redMul(jyd2);
	    var nx = c.redSqr().redISub(t1.redAdd(t1));
	    var t2 = t1.redISub(nx);
	    var dny = c.redMul(t2);
	    dny = dny.redIAdd(dny).redISub(jyd4);
	    var nz = jyd.redMul(jz);
	    if (i + 1 < pow)
	      jz4 = jz4.redMul(jyd4);

	    jx = nx;
	    jz = nz;
	    jyd = dny;
	  }

	  return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
	};

	JPoint.prototype.dbl = function dbl() {
	  if (this.isInfinity())
	    return this;

	  if (this.curve.zeroA)
	    return this._zeroDbl();
	  else if (this.curve.threeA)
	    return this._threeDbl();
	  else
	    return this._dbl();
	};

	JPoint.prototype._zeroDbl = function _zeroDbl() {
	  var nx;
	  var ny;
	  var nz;
	  // Z = 1
	  if (this.zOne) {
	    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
	    //     #doubling-mdbl-2007-bl
	    // 1M + 5S + 14A

	    // XX = X1^2
	    var xx = this.x.redSqr();
	    // YY = Y1^2
	    var yy = this.y.redSqr();
	    // YYYY = YY^2
	    var yyyy = yy.redSqr();
	    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
	    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
	    s = s.redIAdd(s);
	    // M = 3 * XX + a; a = 0
	    var m = xx.redAdd(xx).redIAdd(xx);
	    // T = M ^ 2 - 2*S
	    var t = m.redSqr().redISub(s).redISub(s);

	    // 8 * YYYY
	    var yyyy8 = yyyy.redIAdd(yyyy);
	    yyyy8 = yyyy8.redIAdd(yyyy8);
	    yyyy8 = yyyy8.redIAdd(yyyy8);

	    // X3 = T
	    nx = t;
	    // Y3 = M * (S - T) - 8 * YYYY
	    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
	    // Z3 = 2*Y1
	    nz = this.y.redAdd(this.y);
	  } else {
	    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
	    //     #doubling-dbl-2009-l
	    // 2M + 5S + 13A

	    // A = X1^2
	    var a = this.x.redSqr();
	    // B = Y1^2
	    var b = this.y.redSqr();
	    // C = B^2
	    var c = b.redSqr();
	    // D = 2 * ((X1 + B)^2 - A - C)
	    var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
	    d = d.redIAdd(d);
	    // E = 3 * A
	    var e = a.redAdd(a).redIAdd(a);
	    // F = E^2
	    var f = e.redSqr();

	    // 8 * C
	    var c8 = c.redIAdd(c);
	    c8 = c8.redIAdd(c8);
	    c8 = c8.redIAdd(c8);

	    // X3 = F - 2 * D
	    nx = f.redISub(d).redISub(d);
	    // Y3 = E * (D - X3) - 8 * C
	    ny = e.redMul(d.redISub(nx)).redISub(c8);
	    // Z3 = 2 * Y1 * Z1
	    nz = this.y.redMul(this.z);
	    nz = nz.redIAdd(nz);
	  }

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype._threeDbl = function _threeDbl() {
	  var nx;
	  var ny;
	  var nz;
	  // Z = 1
	  if (this.zOne) {
	    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html
	    //     #doubling-mdbl-2007-bl
	    // 1M + 5S + 15A

	    // XX = X1^2
	    var xx = this.x.redSqr();
	    // YY = Y1^2
	    var yy = this.y.redSqr();
	    // YYYY = YY^2
	    var yyyy = yy.redSqr();
	    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
	    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
	    s = s.redIAdd(s);
	    // M = 3 * XX + a
	    var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
	    // T = M^2 - 2 * S
	    var t = m.redSqr().redISub(s).redISub(s);
	    // X3 = T
	    nx = t;
	    // Y3 = M * (S - T) - 8 * YYYY
	    var yyyy8 = yyyy.redIAdd(yyyy);
	    yyyy8 = yyyy8.redIAdd(yyyy8);
	    yyyy8 = yyyy8.redIAdd(yyyy8);
	    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
	    // Z3 = 2 * Y1
	    nz = this.y.redAdd(this.y);
	  } else {
	    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html#doubling-dbl-2001-b
	    // 3M + 5S

	    // delta = Z1^2
	    var delta = this.z.redSqr();
	    // gamma = Y1^2
	    var gamma = this.y.redSqr();
	    // beta = X1 * gamma
	    var beta = this.x.redMul(gamma);
	    // alpha = 3 * (X1 - delta) * (X1 + delta)
	    var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
	    alpha = alpha.redAdd(alpha).redIAdd(alpha);
	    // X3 = alpha^2 - 8 * beta
	    var beta4 = beta.redIAdd(beta);
	    beta4 = beta4.redIAdd(beta4);
	    var beta8 = beta4.redAdd(beta4);
	    nx = alpha.redSqr().redISub(beta8);
	    // Z3 = (Y1 + Z1)^2 - gamma - delta
	    nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
	    // Y3 = alpha * (4 * beta - X3) - 8 * gamma^2
	    var ggamma8 = gamma.redSqr();
	    ggamma8 = ggamma8.redIAdd(ggamma8);
	    ggamma8 = ggamma8.redIAdd(ggamma8);
	    ggamma8 = ggamma8.redIAdd(ggamma8);
	    ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
	  }

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype._dbl = function _dbl() {
	  var a = this.curve.a;

	  // 4M + 6S + 10A
	  var jx = this.x;
	  var jy = this.y;
	  var jz = this.z;
	  var jz4 = jz.redSqr().redSqr();

	  var jx2 = jx.redSqr();
	  var jy2 = jy.redSqr();

	  var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

	  var jxd4 = jx.redAdd(jx);
	  jxd4 = jxd4.redIAdd(jxd4);
	  var t1 = jxd4.redMul(jy2);
	  var nx = c.redSqr().redISub(t1.redAdd(t1));
	  var t2 = t1.redISub(nx);

	  var jyd8 = jy2.redSqr();
	  jyd8 = jyd8.redIAdd(jyd8);
	  jyd8 = jyd8.redIAdd(jyd8);
	  jyd8 = jyd8.redIAdd(jyd8);
	  var ny = c.redMul(t2).redISub(jyd8);
	  var nz = jy.redAdd(jy).redMul(jz);

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype.trpl = function trpl() {
	  if (!this.curve.zeroA)
	    return this.dbl().add(this);

	  // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#tripling-tpl-2007-bl
	  // 5M + 10S + ...

	  // XX = X1^2
	  var xx = this.x.redSqr();
	  // YY = Y1^2
	  var yy = this.y.redSqr();
	  // ZZ = Z1^2
	  var zz = this.z.redSqr();
	  // YYYY = YY^2
	  var yyyy = yy.redSqr();
	  // M = 3 * XX + a * ZZ2; a = 0
	  var m = xx.redAdd(xx).redIAdd(xx);
	  // MM = M^2
	  var mm = m.redSqr();
	  // E = 6 * ((X1 + YY)^2 - XX - YYYY) - MM
	  var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
	  e = e.redIAdd(e);
	  e = e.redAdd(e).redIAdd(e);
	  e = e.redISub(mm);
	  // EE = E^2
	  var ee = e.redSqr();
	  // T = 16*YYYY
	  var t = yyyy.redIAdd(yyyy);
	  t = t.redIAdd(t);
	  t = t.redIAdd(t);
	  t = t.redIAdd(t);
	  // U = (M + E)^2 - MM - EE - T
	  var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
	  // X3 = 4 * (X1 * EE - 4 * YY * U)
	  var yyu4 = yy.redMul(u);
	  yyu4 = yyu4.redIAdd(yyu4);
	  yyu4 = yyu4.redIAdd(yyu4);
	  var nx = this.x.redMul(ee).redISub(yyu4);
	  nx = nx.redIAdd(nx);
	  nx = nx.redIAdd(nx);
	  // Y3 = 8 * Y1 * (U * (T - U) - E * EE)
	  var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
	  ny = ny.redIAdd(ny);
	  ny = ny.redIAdd(ny);
	  ny = ny.redIAdd(ny);
	  // Z3 = (Z1 + E)^2 - ZZ - EE
	  var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);

	  return this.curve.jpoint(nx, ny, nz);
	};

	JPoint.prototype.mul = function mul(k, kbase) {
	  k = new BN(k, kbase);

	  return this.curve._wnafMul(this, k);
	};

	JPoint.prototype.eq = function eq(p) {
	  if (p.type === 'affine')
	    return this.eq(p.toJ());

	  if (this === p)
	    return true;

	  // x1 * z2^2 == x2 * z1^2
	  var z2 = this.z.redSqr();
	  var pz2 = p.z.redSqr();
	  if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
	    return false;

	  // y1 * z2^3 == y2 * z1^3
	  var z3 = z2.redMul(this.z);
	  var pz3 = pz2.redMul(p.z);
	  return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
	};

	JPoint.prototype.eqXToP = function eqXToP(x) {
	  var zs = this.z.redSqr();
	  var rx = x.toRed(this.curve.red).redMul(zs);
	  if (this.x.cmp(rx) === 0)
	    return true;

	  var xc = x.clone();
	  var t = this.curve.redN.redMul(zs);
	  for (;;) {
	    xc.iadd(this.curve.n);
	    if (xc.cmp(this.curve.p) >= 0)
	      return false;

	    rx.redIAdd(t);
	    if (this.x.cmp(rx) === 0)
	      return true;
	  }
	  return false;
	};

	JPoint.prototype.inspect = function inspect() {
	  if (this.isInfinity())
	    return '<EC JPoint Infinity>';
	  return '<EC JPoint x: ' + this.x.toString(16, 2) +
	      ' y: ' + this.y.toString(16, 2) +
	      ' z: ' + this.z.toString(16, 2) + '>';
	};

	JPoint.prototype.isInfinity = function isInfinity() {
	  // XXX This code assumes that zero is always zero in red
	  return this.z.cmpn(0) === 0;
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var curve = __webpack_require__(42);
	var BN = __webpack_require__(26);
	var inherits = __webpack_require__(37);
	var Base = curve.base;

	var elliptic = __webpack_require__(24);
	var utils = elliptic.utils;

	function MontCurve(conf) {
	  Base.call(this, 'mont', conf);

	  this.a = new BN(conf.a, 16).toRed(this.red);
	  this.b = new BN(conf.b, 16).toRed(this.red);
	  this.i4 = new BN(4).toRed(this.red).redInvm();
	  this.two = new BN(2).toRed(this.red);
	  this.a24 = this.i4.redMul(this.a.redAdd(this.two));
	}
	inherits(MontCurve, Base);
	module.exports = MontCurve;

	MontCurve.prototype.validate = function validate(point) {
	  var x = point.normalize().x;
	  var x2 = x.redSqr();
	  var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
	  var y = rhs.redSqrt();

	  return y.redSqr().cmp(rhs) === 0;
	};

	function Point(curve, x, z) {
	  Base.BasePoint.call(this, curve, 'projective');
	  if (x === null && z === null) {
	    this.x = this.curve.one;
	    this.z = this.curve.zero;
	  } else {
	    this.x = new BN(x, 16);
	    this.z = new BN(z, 16);
	    if (!this.x.red)
	      this.x = this.x.toRed(this.curve.red);
	    if (!this.z.red)
	      this.z = this.z.toRed(this.curve.red);
	  }
	}
	inherits(Point, Base.BasePoint);

	MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
	  return this.point(utils.toArray(bytes, enc), 1);
	};

	MontCurve.prototype.point = function point(x, z) {
	  return new Point(this, x, z);
	};

	MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
	  return Point.fromJSON(this, obj);
	};

	Point.prototype.precompute = function precompute() {
	  // No-op
	};

	Point.prototype._encode = function _encode() {
	  return this.getX().toArray('be', this.curve.p.byteLength());
	};

	Point.fromJSON = function fromJSON(curve, obj) {
	  return new Point(curve, obj[0], obj[1] || curve.one);
	};

	Point.prototype.inspect = function inspect() {
	  if (this.isInfinity())
	    return '<EC Point Infinity>';
	  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
	      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
	};

	Point.prototype.isInfinity = function isInfinity() {
	  // XXX This code assumes that zero is always zero in red
	  return this.z.cmpn(0) === 0;
	};

	Point.prototype.dbl = function dbl() {
	  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#doubling-dbl-1987-m-3
	  // 2M + 2S + 4A

	  // A = X1 + Z1
	  var a = this.x.redAdd(this.z);
	  // AA = A^2
	  var aa = a.redSqr();
	  // B = X1 - Z1
	  var b = this.x.redSub(this.z);
	  // BB = B^2
	  var bb = b.redSqr();
	  // C = AA - BB
	  var c = aa.redSub(bb);
	  // X3 = AA * BB
	  var nx = aa.redMul(bb);
	  // Z3 = C * (BB + A24 * C)
	  var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
	  return this.curve.point(nx, nz);
	};

	Point.prototype.add = function add() {
	  throw new Error('Not supported on Montgomery curve');
	};

	Point.prototype.diffAdd = function diffAdd(p, diff) {
	  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#diffadd-dadd-1987-m-3
	  // 4M + 2S + 6A

	  // A = X2 + Z2
	  var a = this.x.redAdd(this.z);
	  // B = X2 - Z2
	  var b = this.x.redSub(this.z);
	  // C = X3 + Z3
	  var c = p.x.redAdd(p.z);
	  // D = X3 - Z3
	  var d = p.x.redSub(p.z);
	  // DA = D * A
	  var da = d.redMul(a);
	  // CB = C * B
	  var cb = c.redMul(b);
	  // X5 = Z1 * (DA + CB)^2
	  var nx = diff.z.redMul(da.redAdd(cb).redSqr());
	  // Z5 = X1 * (DA - CB)^2
	  var nz = diff.x.redMul(da.redISub(cb).redSqr());
	  return this.curve.point(nx, nz);
	};

	Point.prototype.mul = function mul(k) {
	  var t = k.clone();
	  var a = this; // (N / 2) * Q + Q
	  var b = this.curve.point(null, null); // (N / 2) * Q
	  var c = this; // Q

	  for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
	    bits.push(t.andln(1));

	  for (var i = bits.length - 1; i >= 0; i--) {
	    if (bits[i] === 0) {
	      // N * Q + Q = ((N / 2) * Q + Q)) + (N / 2) * Q
	      a = a.diffAdd(b, c);
	      // N * Q = 2 * ((N / 2) * Q + Q))
	      b = b.dbl();
	    } else {
	      // N * Q = ((N / 2) * Q + Q) + ((N / 2) * Q)
	      b = a.diffAdd(b, c);
	      // N * Q + Q = 2 * ((N / 2) * Q + Q)
	      a = a.dbl();
	    }
	  }
	  return b;
	};

	Point.prototype.mulAdd = function mulAdd() {
	  throw new Error('Not supported on Montgomery curve');
	};

	Point.prototype.jumlAdd = function jumlAdd() {
	  throw new Error('Not supported on Montgomery curve');
	};

	Point.prototype.eq = function eq(other) {
	  return this.getX().cmp(other.getX()) === 0;
	};

	Point.prototype.normalize = function normalize() {
	  this.x = this.x.redMul(this.z.redInvm());
	  this.z = this.curve.one;
	  return this;
	};

	Point.prototype.getX = function getX() {
	  // Normalize coordinates
	  this.normalize();

	  return this.x.fromRed();
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var curve = __webpack_require__(42);
	var elliptic = __webpack_require__(24);
	var BN = __webpack_require__(26);
	var inherits = __webpack_require__(37);
	var Base = curve.base;

	var assert = elliptic.utils.assert;

	function EdwardsCurve(conf) {
	  // NOTE: Important as we are creating point in Base.call()
	  this.twisted = (conf.a | 0) !== 1;
	  this.mOneA = this.twisted && (conf.a | 0) === -1;
	  this.extended = this.mOneA;

	  Base.call(this, 'edwards', conf);

	  this.a = new BN(conf.a, 16).umod(this.red.m);
	  this.a = this.a.toRed(this.red);
	  this.c = new BN(conf.c, 16).toRed(this.red);
	  this.c2 = this.c.redSqr();
	  this.d = new BN(conf.d, 16).toRed(this.red);
	  this.dd = this.d.redAdd(this.d);

	  assert(!this.twisted || this.c.fromRed().cmpn(1) === 0);
	  this.oneC = (conf.c | 0) === 1;
	}
	inherits(EdwardsCurve, Base);
	module.exports = EdwardsCurve;

	EdwardsCurve.prototype._mulA = function _mulA(num) {
	  if (this.mOneA)
	    return num.redNeg();
	  else
	    return this.a.redMul(num);
	};

	EdwardsCurve.prototype._mulC = function _mulC(num) {
	  if (this.oneC)
	    return num;
	  else
	    return this.c.redMul(num);
	};

	// Just for compatibility with Short curve
	EdwardsCurve.prototype.jpoint = function jpoint(x, y, z, t) {
	  return this.point(x, y, z, t);
	};

	EdwardsCurve.prototype.pointFromX = function pointFromX(x, odd) {
	  x = new BN(x, 16);
	  if (!x.red)
	    x = x.toRed(this.red);

	  var x2 = x.redSqr();
	  var rhs = this.c2.redSub(this.a.redMul(x2));
	  var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));

	  var y2 = rhs.redMul(lhs.redInvm());
	  var y = y2.redSqrt();
	  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
	    throw new Error('invalid point');

	  var isOdd = y.fromRed().isOdd();
	  if (odd && !isOdd || !odd && isOdd)
	    y = y.redNeg();

	  return this.point(x, y);
	};

	EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
	  y = new BN(y, 16);
	  if (!y.red)
	    y = y.toRed(this.red);

	  // x^2 = (y^2 - 1) / (d y^2 + 1)
	  var y2 = y.redSqr();
	  var lhs = y2.redSub(this.one);
	  var rhs = y2.redMul(this.d).redAdd(this.one);
	  var x2 = lhs.redMul(rhs.redInvm());

	  if (x2.cmp(this.zero) === 0) {
	    if (odd)
	      throw new Error('invalid point');
	    else
	      return this.point(this.zero, y);
	  }

	  var x = x2.redSqrt();
	  if (x.redSqr().redSub(x2).cmp(this.zero) !== 0)
	    throw new Error('invalid point');

	  if (x.isOdd() !== odd)
	    x = x.redNeg();

	  return this.point(x, y);
	};

	EdwardsCurve.prototype.validate = function validate(point) {
	  if (point.isInfinity())
	    return true;

	  // Curve: A * X^2 + Y^2 = C^2 * (1 + D * X^2 * Y^2)
	  point.normalize();

	  var x2 = point.x.redSqr();
	  var y2 = point.y.redSqr();
	  var lhs = x2.redMul(this.a).redAdd(y2);
	  var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));

	  return lhs.cmp(rhs) === 0;
	};

	function Point(curve, x, y, z, t) {
	  Base.BasePoint.call(this, curve, 'projective');
	  if (x === null && y === null && z === null) {
	    this.x = this.curve.zero;
	    this.y = this.curve.one;
	    this.z = this.curve.one;
	    this.t = this.curve.zero;
	    this.zOne = true;
	  } else {
	    this.x = new BN(x, 16);
	    this.y = new BN(y, 16);
	    this.z = z ? new BN(z, 16) : this.curve.one;
	    this.t = t && new BN(t, 16);
	    if (!this.x.red)
	      this.x = this.x.toRed(this.curve.red);
	    if (!this.y.red)
	      this.y = this.y.toRed(this.curve.red);
	    if (!this.z.red)
	      this.z = this.z.toRed(this.curve.red);
	    if (this.t && !this.t.red)
	      this.t = this.t.toRed(this.curve.red);
	    this.zOne = this.z === this.curve.one;

	    // Use extended coordinates
	    if (this.curve.extended && !this.t) {
	      this.t = this.x.redMul(this.y);
	      if (!this.zOne)
	        this.t = this.t.redMul(this.z.redInvm());
	    }
	  }
	}
	inherits(Point, Base.BasePoint);

	EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
	  return Point.fromJSON(this, obj);
	};

	EdwardsCurve.prototype.point = function point(x, y, z, t) {
	  return new Point(this, x, y, z, t);
	};

	Point.fromJSON = function fromJSON(curve, obj) {
	  return new Point(curve, obj[0], obj[1], obj[2]);
	};

	Point.prototype.inspect = function inspect() {
	  if (this.isInfinity())
	    return '<EC Point Infinity>';
	  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
	      ' y: ' + this.y.fromRed().toString(16, 2) +
	      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
	};

	Point.prototype.isInfinity = function isInfinity() {
	  // XXX This code assumes that zero is always zero in red
	  return this.x.cmpn(0) === 0 &&
	         this.y.cmp(this.z) === 0;
	};

	Point.prototype._extDbl = function _extDbl() {
	  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
	  //     #doubling-dbl-2008-hwcd
	  // 4M + 4S

	  // A = X1^2
	  var a = this.x.redSqr();
	  // B = Y1^2
	  var b = this.y.redSqr();
	  // C = 2 * Z1^2
	  var c = this.z.redSqr();
	  c = c.redIAdd(c);
	  // D = a * A
	  var d = this.curve._mulA(a);
	  // E = (X1 + Y1)^2 - A - B
	  var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
	  // G = D + B
	  var g = d.redAdd(b);
	  // F = G - C
	  var f = g.redSub(c);
	  // H = D - B
	  var h = d.redSub(b);
	  // X3 = E * F
	  var nx = e.redMul(f);
	  // Y3 = G * H
	  var ny = g.redMul(h);
	  // T3 = E * H
	  var nt = e.redMul(h);
	  // Z3 = F * G
	  var nz = f.redMul(g);
	  return this.curve.point(nx, ny, nz, nt);
	};

	Point.prototype._projDbl = function _projDbl() {
	  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
	  //     #doubling-dbl-2008-bbjlp
	  //     #doubling-dbl-2007-bl
	  // and others
	  // Generally 3M + 4S or 2M + 4S

	  // B = (X1 + Y1)^2
	  var b = this.x.redAdd(this.y).redSqr();
	  // C = X1^2
	  var c = this.x.redSqr();
	  // D = Y1^2
	  var d = this.y.redSqr();

	  var nx;
	  var ny;
	  var nz;
	  if (this.curve.twisted) {
	    // E = a * C
	    var e = this.curve._mulA(c);
	    // F = E + D
	    var f = e.redAdd(d);
	    if (this.zOne) {
	      // X3 = (B - C - D) * (F - 2)
	      nx = b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));
	      // Y3 = F * (E - D)
	      ny = f.redMul(e.redSub(d));
	      // Z3 = F^2 - 2 * F
	      nz = f.redSqr().redSub(f).redSub(f);
	    } else {
	      // H = Z1^2
	      var h = this.z.redSqr();
	      // J = F - 2 * H
	      var j = f.redSub(h).redISub(h);
	      // X3 = (B-C-D)*J
	      nx = b.redSub(c).redISub(d).redMul(j);
	      // Y3 = F * (E - D)
	      ny = f.redMul(e.redSub(d));
	      // Z3 = F * J
	      nz = f.redMul(j);
	    }
	  } else {
	    // E = C + D
	    var e = c.redAdd(d);
	    // H = (c * Z1)^2
	    var h = this.curve._mulC(this.c.redMul(this.z)).redSqr();
	    // J = E - 2 * H
	    var j = e.redSub(h).redSub(h);
	    // X3 = c * (B - E) * J
	    nx = this.curve._mulC(b.redISub(e)).redMul(j);
	    // Y3 = c * E * (C - D)
	    ny = this.curve._mulC(e).redMul(c.redISub(d));
	    // Z3 = E * J
	    nz = e.redMul(j);
	  }
	  return this.curve.point(nx, ny, nz);
	};

	Point.prototype.dbl = function dbl() {
	  if (this.isInfinity())
	    return this;

	  // Double in extended coordinates
	  if (this.curve.extended)
	    return this._extDbl();
	  else
	    return this._projDbl();
	};

	Point.prototype._extAdd = function _extAdd(p) {
	  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
	  //     #addition-add-2008-hwcd-3
	  // 8M

	  // A = (Y1 - X1) * (Y2 - X2)
	  var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
	  // B = (Y1 + X1) * (Y2 + X2)
	  var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
	  // C = T1 * k * T2
	  var c = this.t.redMul(this.curve.dd).redMul(p.t);
	  // D = Z1 * 2 * Z2
	  var d = this.z.redMul(p.z.redAdd(p.z));
	  // E = B - A
	  var e = b.redSub(a);
	  // F = D - C
	  var f = d.redSub(c);
	  // G = D + C
	  var g = d.redAdd(c);
	  // H = B + A
	  var h = b.redAdd(a);
	  // X3 = E * F
	  var nx = e.redMul(f);
	  // Y3 = G * H
	  var ny = g.redMul(h);
	  // T3 = E * H
	  var nt = e.redMul(h);
	  // Z3 = F * G
	  var nz = f.redMul(g);
	  return this.curve.point(nx, ny, nz, nt);
	};

	Point.prototype._projAdd = function _projAdd(p) {
	  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
	  //     #addition-add-2008-bbjlp
	  //     #addition-add-2007-bl
	  // 10M + 1S

	  // A = Z1 * Z2
	  var a = this.z.redMul(p.z);
	  // B = A^2
	  var b = a.redSqr();
	  // C = X1 * X2
	  var c = this.x.redMul(p.x);
	  // D = Y1 * Y2
	  var d = this.y.redMul(p.y);
	  // E = d * C * D
	  var e = this.curve.d.redMul(c).redMul(d);
	  // F = B - E
	  var f = b.redSub(e);
	  // G = B + E
	  var g = b.redAdd(e);
	  // X3 = A * F * ((X1 + Y1) * (X2 + Y2) - C - D)
	  var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
	  var nx = a.redMul(f).redMul(tmp);
	  var ny;
	  var nz;
	  if (this.curve.twisted) {
	    // Y3 = A * G * (D - a * C)
	    ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
	    // Z3 = F * G
	    nz = f.redMul(g);
	  } else {
	    // Y3 = A * G * (D - C)
	    ny = a.redMul(g).redMul(d.redSub(c));
	    // Z3 = c * F * G
	    nz = this.curve._mulC(f).redMul(g);
	  }
	  return this.curve.point(nx, ny, nz);
	};

	Point.prototype.add = function add(p) {
	  if (this.isInfinity())
	    return p;
	  if (p.isInfinity())
	    return this;

	  if (this.curve.extended)
	    return this._extAdd(p);
	  else
	    return this._projAdd(p);
	};

	Point.prototype.mul = function mul(k) {
	  if (this._hasDoubles(k))
	    return this.curve._fixedNafMul(this, k);
	  else
	    return this.curve._wnafMul(this, k);
	};

	Point.prototype.mulAdd = function mulAdd(k1, p, k2) {
	  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, false);
	};

	Point.prototype.jmulAdd = function jmulAdd(k1, p, k2) {
	  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, true);
	};

	Point.prototype.normalize = function normalize() {
	  if (this.zOne)
	    return this;

	  // Normalize coordinates
	  var zi = this.z.redInvm();
	  this.x = this.x.redMul(zi);
	  this.y = this.y.redMul(zi);
	  if (this.t)
	    this.t = this.t.redMul(zi);
	  this.z = this.curve.one;
	  this.zOne = true;
	  return this;
	};

	Point.prototype.neg = function neg() {
	  return this.curve.point(this.x.redNeg(),
	                          this.y,
	                          this.z,
	                          this.t && this.t.redNeg());
	};

	Point.prototype.getX = function getX() {
	  this.normalize();
	  return this.x.fromRed();
	};

	Point.prototype.getY = function getY() {
	  this.normalize();
	  return this.y.fromRed();
	};

	Point.prototype.eq = function eq(other) {
	  return this === other ||
	         this.getX().cmp(other.getX()) === 0 &&
	         this.getY().cmp(other.getY()) === 0;
	};

	Point.prototype.eqXToP = function eqXToP(x) {
	  var rx = x.toRed(this.curve.red).redMul(this.z);
	  if (this.x.cmp(rx) === 0)
	    return true;

	  var xc = x.clone();
	  var t = this.curve.redN.redMul(this.z);
	  for (;;) {
	    xc.iadd(this.curve.n);
	    if (xc.cmp(this.curve.p) >= 0)
	      return false;

	    rx.redIAdd(t);
	    if (this.x.cmp(rx) === 0)
	      return true;
	  }
	  return false;
	};

	// Compatibility with BaseCurve
	Point.prototype.toP = Point.prototype.normalize;
	Point.prototype.mixedAdd = Point.prototype.add;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var curves = exports;

	var hash = __webpack_require__(35);
	var elliptic = __webpack_require__(24);

	var assert = elliptic.utils.assert;

	function PresetCurve(options) {
	  if (options.type === 'short')
	    this.curve = new elliptic.curve.short(options);
	  else if (options.type === 'edwards')
	    this.curve = new elliptic.curve.edwards(options);
	  else
	    this.curve = new elliptic.curve.mont(options);
	  this.g = this.curve.g;
	  this.n = this.curve.n;
	  this.hash = options.hash;

	  assert(this.g.validate(), 'Invalid curve');
	  assert(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
	}
	curves.PresetCurve = PresetCurve;

	function defineCurve(name, options) {
	  Object.defineProperty(curves, name, {
	    configurable: true,
	    enumerable: true,
	    get: function() {
	      var curve = new PresetCurve(options);
	      Object.defineProperty(curves, name, {
	        configurable: true,
	        enumerable: true,
	        value: curve
	      });
	      return curve;
	    }
	  });
	}

	defineCurve('p192', {
	  type: 'short',
	  prime: 'p192',
	  p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
	  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
	  b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
	  n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
	  hash: hash.sha256,
	  gRed: false,
	  g: [
	    '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
	    '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811'
	  ]
	});

	defineCurve('p224', {
	  type: 'short',
	  prime: 'p224',
	  p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
	  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
	  b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
	  n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
	  hash: hash.sha256,
	  gRed: false,
	  g: [
	    'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
	    'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34'
	  ]
	});

	defineCurve('p256', {
	  type: 'short',
	  prime: null,
	  p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
	  a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
	  b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
	  n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
	  hash: hash.sha256,
	  gRed: false,
	  g: [
	    '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
	    '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5'
	  ]
	});

	defineCurve('p384', {
	  type: 'short',
	  prime: null,
	  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'fffffffe ffffffff 00000000 00000000 ffffffff',
	  a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'fffffffe ffffffff 00000000 00000000 fffffffc',
	  b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f ' +
	     '5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
	  n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 ' +
	     'f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
	  hash: hash.sha384,
	  gRed: false,
	  g: [
	    'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 ' +
	    '5502f25d bf55296c 3a545e38 72760ab7',
	    '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 ' +
	    '0a60b1ce 1d7e819d 7a431d7c 90ea0e5f'
	  ]
	});

	defineCurve('p521', {
	  type: 'short',
	  prime: null,
	  p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff ffffffff ffffffff ffffffff',
	  a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff ffffffff ffffffff fffffffc',
	  b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b ' +
	     '99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd ' +
	     '3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
	  n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
	     'ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 ' +
	     'f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
	  hash: hash.sha512,
	  gRed: false,
	  g: [
	    '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 ' +
	    '053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 ' +
	    'a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
	    '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 ' +
	    '579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 ' +
	    '3fad0761 353c7086 a272c240 88be9476 9fd16650'
	  ]
	});

	defineCurve('curve25519', {
	  type: 'mont',
	  prime: 'p25519',
	  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
	  a: '76d06',
	  b: '0',
	  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
	  hash: hash.sha256,
	  gRed: false,
	  g: [
	    '9'
	  ]
	});

	defineCurve('ed25519', {
	  type: 'edwards',
	  prime: 'p25519',
	  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
	  a: '-1',
	  c: '1',
	  // -121665 * (121666^(-1)) (mod P)
	  d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
	  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
	  hash: hash.sha256,
	  gRed: false,
	  g: [
	    '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',

	    // 4/5
	    '6666666666666666666666666666666666666666666666666666666666666658'
	  ]
	});

	var pre;
	try {
	  pre = __webpack_require__(48);
	} catch (e) {
	  pre = undefined;
	}

	defineCurve('secp256k1', {
	  type: 'short',
	  prime: 'k256',
	  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
	  a: '0',
	  b: '7',
	  n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
	  h: '1',
	  hash: hash.sha256,

	  // Precomputed endomorphism
	  beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
	  lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
	  basis: [
	    {
	      a: '3086d221a7d46bcde86c90e49284eb15',
	      b: '-e4437ed6010e88286f547fa90abfe4c3'
	    },
	    {
	      a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
	      b: '3086d221a7d46bcde86c90e49284eb15'
	    }
	  ],

	  gRed: false,
	  g: [
	    '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
	    '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
	    pre
	  ]
	});


/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = {
	  doubles: {
	    step: 4,
	    points: [
	      [
	        'e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a',
	        'f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821'
	      ],
	      [
	        '8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508',
	        '11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf'
	      ],
	      [
	        '175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739',
	        'd3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695'
	      ],
	      [
	        '363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640',
	        '4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9'
	      ],
	      [
	        '8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c',
	        '4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36'
	      ],
	      [
	        '723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda',
	        '96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f'
	      ],
	      [
	        'eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa',
	        '5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999'
	      ],
	      [
	        '100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0',
	        'cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09'
	      ],
	      [
	        'e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d',
	        '9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d'
	      ],
	      [
	        'feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d',
	        'e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088'
	      ],
	      [
	        'da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1',
	        '9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d'
	      ],
	      [
	        '53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0',
	        '5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8'
	      ],
	      [
	        '8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047',
	        '10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a'
	      ],
	      [
	        '385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862',
	        '283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453'
	      ],
	      [
	        '6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7',
	        '7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160'
	      ],
	      [
	        '3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd',
	        '56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0'
	      ],
	      [
	        '85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83',
	        '7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6'
	      ],
	      [
	        '948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a',
	        '53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589'
	      ],
	      [
	        '6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8',
	        'bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17'
	      ],
	      [
	        'e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d',
	        '4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda'
	      ],
	      [
	        'e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725',
	        '7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd'
	      ],
	      [
	        '213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754',
	        '4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2'
	      ],
	      [
	        '4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c',
	        '17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6'
	      ],
	      [
	        'fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6',
	        '6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f'
	      ],
	      [
	        '76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39',
	        'c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01'
	      ],
	      [
	        'c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891',
	        '893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3'
	      ],
	      [
	        'd895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b',
	        'febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f'
	      ],
	      [
	        'b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03',
	        '2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7'
	      ],
	      [
	        'e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d',
	        'eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78'
	      ],
	      [
	        'a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070',
	        '7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1'
	      ],
	      [
	        '90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4',
	        'e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150'
	      ],
	      [
	        '8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da',
	        '662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82'
	      ],
	      [
	        'e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11',
	        '1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc'
	      ],
	      [
	        '8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e',
	        'efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b'
	      ],
	      [
	        'e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41',
	        '2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51'
	      ],
	      [
	        'b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef',
	        '67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45'
	      ],
	      [
	        'd68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8',
	        'db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120'
	      ],
	      [
	        '324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d',
	        '648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84'
	      ],
	      [
	        '4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96',
	        '35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d'
	      ],
	      [
	        '9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd',
	        'ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d'
	      ],
	      [
	        '6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5',
	        '9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8'
	      ],
	      [
	        'a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266',
	        '40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8'
	      ],
	      [
	        '7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71',
	        '34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac'
	      ],
	      [
	        '928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac',
	        'c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f'
	      ],
	      [
	        '85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751',
	        '1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962'
	      ],
	      [
	        'ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e',
	        '493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907'
	      ],
	      [
	        '827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241',
	        'c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec'
	      ],
	      [
	        'eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3',
	        'be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d'
	      ],
	      [
	        'e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f',
	        '4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414'
	      ],
	      [
	        '1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19',
	        'aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd'
	      ],
	      [
	        '146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be',
	        'b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0'
	      ],
	      [
	        'fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9',
	        '6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811'
	      ],
	      [
	        'da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2',
	        '8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1'
	      ],
	      [
	        'a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13',
	        '7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c'
	      ],
	      [
	        '174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c',
	        'ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73'
	      ],
	      [
	        '959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba',
	        '2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd'
	      ],
	      [
	        'd2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151',
	        'e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405'
	      ],
	      [
	        '64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073',
	        'd99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589'
	      ],
	      [
	        '8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458',
	        '38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e'
	      ],
	      [
	        '13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b',
	        '69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27'
	      ],
	      [
	        'bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366',
	        'd3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1'
	      ],
	      [
	        '8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa',
	        '40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482'
	      ],
	      [
	        '8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0',
	        '620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945'
	      ],
	      [
	        'dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787',
	        '7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573'
	      ],
	      [
	        'f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e',
	        'ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82'
	      ]
	    ]
	  },
	  naf: {
	    wnd: 7,
	    points: [
	      [
	        'f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9',
	        '388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672'
	      ],
	      [
	        '2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4',
	        'd8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6'
	      ],
	      [
	        '5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc',
	        '6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da'
	      ],
	      [
	        'acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe',
	        'cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37'
	      ],
	      [
	        '774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb',
	        'd984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b'
	      ],
	      [
	        'f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8',
	        'ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81'
	      ],
	      [
	        'd7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e',
	        '581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58'
	      ],
	      [
	        'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34',
	        '4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77'
	      ],
	      [
	        '2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c',
	        '85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a'
	      ],
	      [
	        '352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5',
	        '321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c'
	      ],
	      [
	        '2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f',
	        '2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67'
	      ],
	      [
	        '9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714',
	        '73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402'
	      ],
	      [
	        'daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729',
	        'a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55'
	      ],
	      [
	        'c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db',
	        '2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482'
	      ],
	      [
	        '6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4',
	        'e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82'
	      ],
	      [
	        '1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5',
	        'b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396'
	      ],
	      [
	        '605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479',
	        '2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49'
	      ],
	      [
	        '62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d',
	        '80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf'
	      ],
	      [
	        '80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f',
	        '1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a'
	      ],
	      [
	        '7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb',
	        'd0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7'
	      ],
	      [
	        'd528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9',
	        'eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933'
	      ],
	      [
	        '49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963',
	        '758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a'
	      ],
	      [
	        '77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74',
	        '958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6'
	      ],
	      [
	        'f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530',
	        'e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37'
	      ],
	      [
	        '463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b',
	        '5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e'
	      ],
	      [
	        'f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247',
	        'cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6'
	      ],
	      [
	        'caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1',
	        'cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476'
	      ],
	      [
	        '2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120',
	        '4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40'
	      ],
	      [
	        '7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435',
	        '91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61'
	      ],
	      [
	        '754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18',
	        '673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683'
	      ],
	      [
	        'e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8',
	        '59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5'
	      ],
	      [
	        '186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb',
	        '3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b'
	      ],
	      [
	        'df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f',
	        '55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417'
	      ],
	      [
	        '5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143',
	        'efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868'
	      ],
	      [
	        '290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba',
	        'e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a'
	      ],
	      [
	        'af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45',
	        'f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6'
	      ],
	      [
	        '766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a',
	        '744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996'
	      ],
	      [
	        '59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e',
	        'c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e'
	      ],
	      [
	        'f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8',
	        'e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d'
	      ],
	      [
	        '7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c',
	        '30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2'
	      ],
	      [
	        '948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519',
	        'e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e'
	      ],
	      [
	        '7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab',
	        '100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437'
	      ],
	      [
	        '3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca',
	        'ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311'
	      ],
	      [
	        'd3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf',
	        '8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4'
	      ],
	      [
	        '1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610',
	        '68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575'
	      ],
	      [
	        '733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4',
	        'f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d'
	      ],
	      [
	        '15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c',
	        'd56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d'
	      ],
	      [
	        'a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940',
	        'edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629'
	      ],
	      [
	        'e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980',
	        'a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06'
	      ],
	      [
	        '311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3',
	        '66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374'
	      ],
	      [
	        '34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf',
	        '9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee'
	      ],
	      [
	        'f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63',
	        '4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1'
	      ],
	      [
	        'd7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448',
	        'fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b'
	      ],
	      [
	        '32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf',
	        '5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661'
	      ],
	      [
	        '7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5',
	        '8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6'
	      ],
	      [
	        'ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6',
	        '8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e'
	      ],
	      [
	        '16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5',
	        '5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d'
	      ],
	      [
	        'eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99',
	        'f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc'
	      ],
	      [
	        '78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51',
	        'f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4'
	      ],
	      [
	        '494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5',
	        '42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c'
	      ],
	      [
	        'a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5',
	        '204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b'
	      ],
	      [
	        'c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997',
	        '4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913'
	      ],
	      [
	        '841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881',
	        '73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154'
	      ],
	      [
	        '5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5',
	        '39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865'
	      ],
	      [
	        '36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66',
	        'd2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc'
	      ],
	      [
	        '336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726',
	        'ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224'
	      ],
	      [
	        '8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede',
	        '6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e'
	      ],
	      [
	        '1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94',
	        '60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6'
	      ],
	      [
	        '85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31',
	        '3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511'
	      ],
	      [
	        '29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51',
	        'b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b'
	      ],
	      [
	        'a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252',
	        'ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2'
	      ],
	      [
	        '4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5',
	        'cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c'
	      ],
	      [
	        'd24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b',
	        '6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3'
	      ],
	      [
	        'ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4',
	        '322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d'
	      ],
	      [
	        'af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f',
	        '6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700'
	      ],
	      [
	        'e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889',
	        '2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4'
	      ],
	      [
	        '591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246',
	        'b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196'
	      ],
	      [
	        '11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984',
	        '998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4'
	      ],
	      [
	        '3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a',
	        'b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257'
	      ],
	      [
	        'cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030',
	        'bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13'
	      ],
	      [
	        'c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197',
	        '6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096'
	      ],
	      [
	        'c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593',
	        'c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38'
	      ],
	      [
	        'a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef',
	        '21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f'
	      ],
	      [
	        '347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38',
	        '60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448'
	      ],
	      [
	        'da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a',
	        '49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a'
	      ],
	      [
	        'c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111',
	        '5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4'
	      ],
	      [
	        '4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502',
	        '7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437'
	      ],
	      [
	        '3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea',
	        'be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7'
	      ],
	      [
	        'cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26',
	        '8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d'
	      ],
	      [
	        'b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986',
	        '39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a'
	      ],
	      [
	        'd4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e',
	        '62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54'
	      ],
	      [
	        '48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4',
	        '25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77'
	      ],
	      [
	        'dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda',
	        'ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517'
	      ],
	      [
	        '6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859',
	        'cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10'
	      ],
	      [
	        'e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f',
	        'f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125'
	      ],
	      [
	        'eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c',
	        '6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e'
	      ],
	      [
	        '13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942',
	        'fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1'
	      ],
	      [
	        'ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a',
	        '1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2'
	      ],
	      [
	        'b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80',
	        '5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423'
	      ],
	      [
	        'ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d',
	        '438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8'
	      ],
	      [
	        '8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1',
	        'cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758'
	      ],
	      [
	        '52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63',
	        'c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375'
	      ],
	      [
	        'e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352',
	        '6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d'
	      ],
	      [
	        '7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193',
	        'ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec'
	      ],
	      [
	        '5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00',
	        '9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0'
	      ],
	      [
	        '32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58',
	        'ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c'
	      ],
	      [
	        'e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7',
	        'd3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4'
	      ],
	      [
	        '8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8',
	        'c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f'
	      ],
	      [
	        '4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e',
	        '67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649'
	      ],
	      [
	        '3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d',
	        'cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826'
	      ],
	      [
	        '674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b',
	        '299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5'
	      ],
	      [
	        'd32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f',
	        'f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87'
	      ],
	      [
	        '30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6',
	        '462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b'
	      ],
	      [
	        'be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297',
	        '62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc'
	      ],
	      [
	        '93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a',
	        '7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c'
	      ],
	      [
	        'b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c',
	        'ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f'
	      ],
	      [
	        'd5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52',
	        '4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a'
	      ],
	      [
	        'd3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb',
	        'bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46'
	      ],
	      [
	        '463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065',
	        'bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f'
	      ],
	      [
	        '7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917',
	        '603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03'
	      ],
	      [
	        '74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9',
	        'cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08'
	      ],
	      [
	        '30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3',
	        '553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8'
	      ],
	      [
	        '9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57',
	        '712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373'
	      ],
	      [
	        '176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66',
	        'ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3'
	      ],
	      [
	        '75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8',
	        '9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8'
	      ],
	      [
	        '809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721',
	        '9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1'
	      ],
	      [
	        '1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180',
	        '4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9'
	      ]
	    ]
	  }
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BN = __webpack_require__(26);
	var elliptic = __webpack_require__(24);
	var utils = elliptic.utils;
	var assert = utils.assert;

	var KeyPair = __webpack_require__(50);
	var Signature = __webpack_require__(51);

	function EC(options) {
	  if (!(this instanceof EC))
	    return new EC(options);

	  // Shortcut `elliptic.ec(curve-name)`
	  if (typeof options === 'string') {
	    assert(elliptic.curves.hasOwnProperty(options), 'Unknown curve ' + options);

	    options = elliptic.curves[options];
	  }

	  // Shortcut for `elliptic.ec(elliptic.curves.curveName)`
	  if (options instanceof elliptic.curves.PresetCurve)
	    options = { curve: options };

	  this.curve = options.curve.curve;
	  this.n = this.curve.n;
	  this.nh = this.n.ushrn(1);
	  this.g = this.curve.g;

	  // Point on curve
	  this.g = options.curve.g;
	  this.g.precompute(options.curve.n.bitLength() + 1);

	  // Hash for function for DRBG
	  this.hash = options.hash || options.curve.hash;
	}
	module.exports = EC;

	EC.prototype.keyPair = function keyPair(options) {
	  return new KeyPair(this, options);
	};

	EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
	  return KeyPair.fromPrivate(this, priv, enc);
	};

	EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
	  return KeyPair.fromPublic(this, pub, enc);
	};

	EC.prototype.genKeyPair = function genKeyPair(options) {
	  if (!options)
	    options = {};

	  // Instantiate Hmac_DRBG
	  var drbg = new elliptic.hmacDRBG({
	    hash: this.hash,
	    pers: options.pers,
	    entropy: options.entropy || elliptic.rand(this.hash.hmacStrength),
	    nonce: this.n.toArray()
	  });

	  var bytes = this.n.byteLength();
	  var ns2 = this.n.sub(new BN(2));
	  do {
	    var priv = new BN(drbg.generate(bytes));
	    if (priv.cmp(ns2) > 0)
	      continue;

	    priv.iaddn(1);
	    return this.keyFromPrivate(priv);
	  } while (true);
	};

	EC.prototype._truncateToN = function truncateToN(msg, truncOnly) {
	  var delta = msg.byteLength() * 8 - this.n.bitLength();
	  if (delta > 0)
	    msg = msg.ushrn(delta);
	  if (!truncOnly && msg.cmp(this.n) >= 0)
	    return msg.sub(this.n);
	  else
	    return msg;
	};

	EC.prototype.sign = function sign(msg, key, enc, options) {
	  if (typeof enc === 'object') {
	    options = enc;
	    enc = null;
	  }
	  if (!options)
	    options = {};

	  key = this.keyFromPrivate(key, enc);
	  msg = this._truncateToN(new BN(msg, 16));

	  // Zero-extend key to provide enough entropy
	  var bytes = this.n.byteLength();
	  var bkey = key.getPrivate().toArray('be', bytes);

	  // Zero-extend nonce to have the same byte size as N
	  var nonce = msg.toArray('be', bytes);

	  // Instantiate Hmac_DRBG
	  var drbg = new elliptic.hmacDRBG({
	    hash: this.hash,
	    entropy: bkey,
	    nonce: nonce,
	    pers: options.pers,
	    persEnc: options.persEnc
	  });

	  // Number of bytes to generate
	  var ns1 = this.n.sub(new BN(1));

	  for (var iter = 0; true; iter++) {
	    var k = options.k ?
	        options.k(iter) :
	        new BN(drbg.generate(this.n.byteLength()));
	    k = this._truncateToN(k, true);
	    if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
	      continue;

	    var kp = this.g.mul(k);
	    if (kp.isInfinity())
	      continue;

	    var kpX = kp.getX();
	    var r = kpX.umod(this.n);
	    if (r.cmpn(0) === 0)
	      continue;

	    var s = k.invm(this.n).mul(r.mul(key.getPrivate()).iadd(msg));
	    s = s.umod(this.n);
	    if (s.cmpn(0) === 0)
	      continue;

	    var recoveryParam = (kp.getY().isOdd() ? 1 : 0) |
	                        (kpX.cmp(r) !== 0 ? 2 : 0);

	    // Use complement of `s`, if it is > `n / 2`
	    if (options.canonical && s.cmp(this.nh) > 0) {
	      s = this.n.sub(s);
	      recoveryParam ^= 1;
	    }

	    return new Signature({ r: r, s: s, recoveryParam: recoveryParam });
	  }
	};

	EC.prototype.verify = function verify(msg, signature, key, enc) {
	  msg = this._truncateToN(new BN(msg, 16));
	  key = this.keyFromPublic(key, enc);
	  signature = new Signature(signature, 'hex');

	  // Perform primitive values validation
	  var r = signature.r;
	  var s = signature.s;
	  if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
	    return false;
	  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
	    return false;

	  // Validate signature
	  var sinv = s.invm(this.n);
	  var u1 = sinv.mul(msg).umod(this.n);
	  var u2 = sinv.mul(r).umod(this.n);

	  if (!this.curve._maxwellTrick) {
	    var p = this.g.mulAdd(u1, key.getPublic(), u2);
	    if (p.isInfinity())
	      return false;

	    return p.getX().umod(this.n).cmp(r) === 0;
	  }

	  // NOTE: Greg Maxwell's trick, inspired by:
	  // https://git.io/vad3K

	  var p = this.g.jmulAdd(u1, key.getPublic(), u2);
	  if (p.isInfinity())
	    return false;

	  // Compare `p.x` of Jacobian point with `r`,
	  // this will do `p.x == r * p.z^2` instead of multiplying `p.x` by the
	  // inverse of `p.z^2`
	  return p.eqXToP(r);
	};

	EC.prototype.recoverPubKey = function(msg, signature, j, enc) {
	  assert((3 & j) === j, 'The recovery param is more than two bits');
	  signature = new Signature(signature, enc);

	  var n = this.n;
	  var e = new BN(msg);
	  var r = signature.r;
	  var s = signature.s;

	  // A set LSB signifies that the y-coordinate is odd
	  var isYOdd = j & 1;
	  var isSecondKey = j >> 1;
	  if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
	    throw new Error('Unable to find sencond key candinate');

	  // 1.1. Let x = r + jn.
	  if (isSecondKey)
	    r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
	  else
	    r = this.curve.pointFromX(r, isYOdd);

	  var rInv = signature.r.invm(n);
	  var s1 = n.sub(e).mul(rInv).umod(n);
	  var s2 = s.mul(rInv).umod(n);

	  // 1.6.1 Compute Q = r^-1 (sR -  eG)
	  //               Q = r^-1 (sR + -eG)
	  return this.g.mulAdd(s1, r, s2);
	};

	EC.prototype.getKeyRecoveryParam = function(e, signature, Q, enc) {
	  signature = new Signature(signature, enc);
	  if (signature.recoveryParam !== null)
	    return signature.recoveryParam;

	  for (var i = 0; i < 4; i++) {
	    var Qprime;
	    try {
	      Qprime = this.recoverPubKey(e, signature, i);
	    } catch (e) {
	      continue;
	    }

	    if (Qprime.eq(Q))
	      return i;
	  }
	  throw new Error('Unable to find valid recovery factor');
	};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BN = __webpack_require__(26);

	function KeyPair(ec, options) {
	  this.ec = ec;
	  this.priv = null;
	  this.pub = null;

	  // KeyPair(ec, { priv: ..., pub: ... })
	  if (options.priv)
	    this._importPrivate(options.priv, options.privEnc);
	  if (options.pub)
	    this._importPublic(options.pub, options.pubEnc);
	}
	module.exports = KeyPair;

	KeyPair.fromPublic = function fromPublic(ec, pub, enc) {
	  if (pub instanceof KeyPair)
	    return pub;

	  return new KeyPair(ec, {
	    pub: pub,
	    pubEnc: enc
	  });
	};

	KeyPair.fromPrivate = function fromPrivate(ec, priv, enc) {
	  if (priv instanceof KeyPair)
	    return priv;

	  return new KeyPair(ec, {
	    priv: priv,
	    privEnc: enc
	  });
	};

	KeyPair.prototype.validate = function validate() {
	  var pub = this.getPublic();

	  if (pub.isInfinity())
	    return { result: false, reason: 'Invalid public key' };
	  if (!pub.validate())
	    return { result: false, reason: 'Public key is not a point' };
	  if (!pub.mul(this.ec.curve.n).isInfinity())
	    return { result: false, reason: 'Public key * N != O' };

	  return { result: true, reason: null };
	};

	KeyPair.prototype.getPublic = function getPublic(compact, enc) {
	  // compact is optional argument
	  if (typeof compact === 'string') {
	    enc = compact;
	    compact = null;
	  }

	  if (!this.pub)
	    this.pub = this.ec.g.mul(this.priv);

	  if (!enc)
	    return this.pub;

	  return this.pub.encode(enc, compact);
	};

	KeyPair.prototype.getPrivate = function getPrivate(enc) {
	  if (enc === 'hex')
	    return this.priv.toString(16, 2);
	  else
	    return this.priv;
	};

	KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
	  this.priv = new BN(key, enc || 16);

	  // Ensure that the priv won't be bigger than n, otherwise we may fail
	  // in fixed multiplication method
	  this.priv = this.priv.umod(this.ec.curve.n);
	};

	KeyPair.prototype._importPublic = function _importPublic(key, enc) {
	  if (key.x || key.y) {
	    this.pub = this.ec.curve.point(key.x, key.y);
	    return;
	  }
	  this.pub = this.ec.curve.decodePoint(key, enc);
	};

	// ECDH
	KeyPair.prototype.derive = function derive(pub) {
	  return pub.mul(this.priv).getX();
	};

	// ECDSA
	KeyPair.prototype.sign = function sign(msg, enc, options) {
	  return this.ec.sign(msg, this, enc, options);
	};

	KeyPair.prototype.verify = function verify(msg, signature) {
	  return this.ec.verify(msg, signature, this);
	};

	KeyPair.prototype.inspect = function inspect() {
	  return '<Key priv: ' + (this.priv && this.priv.toString(16, 2)) +
	         ' pub: ' + (this.pub && this.pub.inspect()) + ' >';
	};


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BN = __webpack_require__(26);

	var elliptic = __webpack_require__(24);
	var utils = elliptic.utils;
	var assert = utils.assert;

	function Signature(options, enc) {
	  if (options instanceof Signature)
	    return options;

	  if (this._importDER(options, enc))
	    return;

	  assert(options.r && options.s, 'Signature without r or s');
	  this.r = new BN(options.r, 16);
	  this.s = new BN(options.s, 16);
	  if (options.recoveryParam === undefined)
	    this.recoveryParam = null;
	  else
	    this.recoveryParam = options.recoveryParam;
	}
	module.exports = Signature;

	function Position() {
	  this.place = 0;
	}

	function getLength(buf, p) {
	  var initial = buf[p.place++];
	  if (!(initial & 0x80)) {
	    return initial;
	  }
	  var octetLen = initial & 0xf;
	  var val = 0;
	  for (var i = 0, off = p.place; i < octetLen; i++, off++) {
	    val <<= 8;
	    val |= buf[off];
	  }
	  p.place = off;
	  return val;
	}

	function rmPadding(buf) {
	  var i = 0;
	  var len = buf.length - 1;
	  while (!buf[i] && !(buf[i + 1] & 0x80) && i < len) {
	    i++;
	  }
	  if (i === 0) {
	    return buf;
	  }
	  return buf.slice(i);
	}

	Signature.prototype._importDER = function _importDER(data, enc) {
	  data = utils.toArray(data, enc);
	  var p = new Position();
	  if (data[p.place++] !== 0x30) {
	    return false;
	  }
	  var len = getLength(data, p);
	  if ((len + p.place) !== data.length) {
	    return false;
	  }
	  if (data[p.place++] !== 0x02) {
	    return false;
	  }
	  var rlen = getLength(data, p);
	  var r = data.slice(p.place, rlen + p.place);
	  p.place += rlen;
	  if (data[p.place++] !== 0x02) {
	    return false;
	  }
	  var slen = getLength(data, p);
	  if (data.length !== slen + p.place) {
	    return false;
	  }
	  var s = data.slice(p.place, slen + p.place);
	  if (r[0] === 0 && (r[1] & 0x80)) {
	    r = r.slice(1);
	  }
	  if (s[0] === 0 && (s[1] & 0x80)) {
	    s = s.slice(1);
	  }

	  this.r = new BN(r);
	  this.s = new BN(s);
	  this.recoveryParam = null;

	  return true;
	};

	function constructLength(arr, len) {
	  if (len < 0x80) {
	    arr.push(len);
	    return;
	  }
	  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
	  arr.push(octets | 0x80);
	  while (--octets) {
	    arr.push((len >>> (octets << 3)) & 0xff);
	  }
	  arr.push(len);
	}

	Signature.prototype.toDER = function toDER(enc) {
	  var r = this.r.toArray();
	  var s = this.s.toArray();

	  // Pad values
	  if (r[0] & 0x80)
	    r = [ 0 ].concat(r);
	  // Pad values
	  if (s[0] & 0x80)
	    s = [ 0 ].concat(s);

	  r = rmPadding(r);
	  s = rmPadding(s);

	  while (!s[0] && !(s[1] & 0x80)) {
	    s = s.slice(1);
	  }
	  var arr = [ 0x02 ];
	  constructLength(arr, r.length);
	  arr = arr.concat(r);
	  arr.push(0x02);
	  constructLength(arr, s.length);
	  var backHalf = arr.concat(s);
	  var res = [ 0x30 ];
	  constructLength(res, backHalf.length);
	  res = res.concat(backHalf);
	  return utils.encode(res, enc);
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hash = __webpack_require__(35);
	var elliptic = __webpack_require__(24);
	var utils = elliptic.utils;
	var assert = utils.assert;
	var parseBytes = utils.parseBytes;
	var KeyPair = __webpack_require__(53);
	var Signature = __webpack_require__(54);

	function EDDSA(curve) {
	  assert(curve === 'ed25519', 'only tested with ed25519 so far');

	  if (!(this instanceof EDDSA))
	    return new EDDSA(curve);

	  var curve = elliptic.curves[curve].curve;
	  this.curve = curve;
	  this.g = curve.g;
	  this.g.precompute(curve.n.bitLength() + 1);

	  this.pointClass = curve.point().constructor;
	  this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
	  this.hash = hash.sha512;
	}

	module.exports = EDDSA;

	/**
	* @param {Array|String} message - message bytes
	* @param {Array|String|KeyPair} secret - secret bytes or a keypair
	* @returns {Signature} - signature
	*/
	EDDSA.prototype.sign = function sign(message, secret) {
	  message = parseBytes(message);
	  var key = this.keyFromSecret(secret);
	  var r = this.hashInt(key.messagePrefix(), message);
	  var R = this.g.mul(r);
	  var Rencoded = this.encodePoint(R);
	  var s_ = this.hashInt(Rencoded, key.pubBytes(), message)
	               .mul(key.priv());
	  var S = r.add(s_).umod(this.curve.n);
	  return this.makeSignature({ R: R, S: S, Rencoded: Rencoded });
	};

	/**
	* @param {Array} message - message bytes
	* @param {Array|String|Signature} sig - sig bytes
	* @param {Array|String|Point|KeyPair} pub - public key
	* @returns {Boolean} - true if public key matches sig of message
	*/
	EDDSA.prototype.verify = function verify(message, sig, pub) {
	  message = parseBytes(message);
	  sig = this.makeSignature(sig);
	  var key = this.keyFromPublic(pub);
	  var h = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
	  var SG = this.g.mul(sig.S());
	  var RplusAh = sig.R().add(key.pub().mul(h));
	  return RplusAh.eq(SG);
	};

	EDDSA.prototype.hashInt = function hashInt() {
	  var hash = this.hash();
	  for (var i = 0; i < arguments.length; i++)
	    hash.update(arguments[i]);
	  return utils.intFromLE(hash.digest()).umod(this.curve.n);
	};

	EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
	  return KeyPair.fromPublic(this, pub);
	};

	EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
	  return KeyPair.fromSecret(this, secret);
	};

	EDDSA.prototype.makeSignature = function makeSignature(sig) {
	  if (sig instanceof Signature)
	    return sig;
	  return new Signature(this, sig);
	};

	/**
	* * https://tools.ietf.org/html/draft-josefsson-eddsa-ed25519-03#section-5.2
	*
	* EDDSA defines methods for encoding and decoding points and integers. These are
	* helper convenience methods, that pass along to utility functions implied
	* parameters.
	*
	*/
	EDDSA.prototype.encodePoint = function encodePoint(point) {
	  var enc = point.getY().toArray('le', this.encodingLength);
	  enc[this.encodingLength - 1] |= point.getX().isOdd() ? 0x80 : 0;
	  return enc;
	};

	EDDSA.prototype.decodePoint = function decodePoint(bytes) {
	  bytes = utils.parseBytes(bytes);

	  var lastIx = bytes.length - 1;
	  var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~0x80);
	  var xIsOdd = (bytes[lastIx] & 0x80) !== 0;

	  var y = utils.intFromLE(normed);
	  return this.curve.pointFromY(y, xIsOdd);
	};

	EDDSA.prototype.encodeInt = function encodeInt(num) {
	  return num.toArray('le', this.encodingLength);
	};

	EDDSA.prototype.decodeInt = function decodeInt(bytes) {
	  return utils.intFromLE(bytes);
	};

	EDDSA.prototype.isPoint = function isPoint(val) {
	  return val instanceof this.pointClass;
	};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var elliptic = __webpack_require__(24);
	var utils = elliptic.utils;
	var assert = utils.assert;
	var parseBytes = utils.parseBytes;
	var cachedProperty = utils.cachedProperty;

	/**
	* @param {EDDSA} eddsa - instance
	* @param {Object} params - public/private key parameters
	*
	* @param {Array<Byte>} [params.secret] - secret seed bytes
	* @param {Point} [params.pub] - public key point (aka `A` in eddsa terms)
	* @param {Array<Byte>} [params.pub] - public key point encoded as bytes
	*
	*/
	function KeyPair(eddsa, params) {
	  this.eddsa = eddsa;
	  this._secret = parseBytes(params.secret);
	  if (eddsa.isPoint(params.pub))
	    this._pub = params.pub;
	  else
	    this._pubBytes = parseBytes(params.pub);
	}

	KeyPair.fromPublic = function fromPublic(eddsa, pub) {
	  if (pub instanceof KeyPair)
	    return pub;
	  return new KeyPair(eddsa, { pub: pub });
	};

	KeyPair.fromSecret = function fromSecret(eddsa, secret) {
	  if (secret instanceof KeyPair)
	    return secret;
	  return new KeyPair(eddsa, { secret: secret });
	};

	KeyPair.prototype.secret = function secret() {
	  return this._secret;
	};

	cachedProperty(KeyPair, 'pubBytes', function pubBytes() {
	  return this.eddsa.encodePoint(this.pub());
	});

	cachedProperty(KeyPair, 'pub', function pub() {
	  if (this._pubBytes)
	    return this.eddsa.decodePoint(this._pubBytes);
	  return this.eddsa.g.mul(this.priv());
	});

	cachedProperty(KeyPair, 'privBytes', function privBytes() {
	  var eddsa = this.eddsa;
	  var hash = this.hash();
	  var lastIx = eddsa.encodingLength - 1;

	  var a = hash.slice(0, eddsa.encodingLength);
	  a[0] &= 248;
	  a[lastIx] &= 127;
	  a[lastIx] |= 64;

	  return a;
	});

	cachedProperty(KeyPair, 'priv', function priv() {
	  return this.eddsa.decodeInt(this.privBytes());
	});

	cachedProperty(KeyPair, 'hash', function hash() {
	  return this.eddsa.hash().update(this.secret()).digest();
	});

	cachedProperty(KeyPair, 'messagePrefix', function messagePrefix() {
	  return this.hash().slice(this.eddsa.encodingLength);
	});

	KeyPair.prototype.sign = function sign(message) {
	  assert(this._secret, 'KeyPair can only verify');
	  return this.eddsa.sign(message, this);
	};

	KeyPair.prototype.verify = function verify(message, sig) {
	  return this.eddsa.verify(message, sig, this);
	};

	KeyPair.prototype.getSecret = function getSecret(enc) {
	  assert(this._secret, 'KeyPair is public only');
	  return utils.encode(this.secret(), enc);
	};

	KeyPair.prototype.getPublic = function getPublic(enc) {
	  return utils.encode(this.pubBytes(), enc);
	};

	module.exports = KeyPair;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BN = __webpack_require__(26);
	var elliptic = __webpack_require__(24);
	var utils = elliptic.utils;
	var assert = utils.assert;
	var cachedProperty = utils.cachedProperty;
	var parseBytes = utils.parseBytes;

	/**
	* @param {EDDSA} eddsa - eddsa instance
	* @param {Array<Bytes>|Object} sig -
	* @param {Array<Bytes>|Point} [sig.R] - R point as Point or bytes
	* @param {Array<Bytes>|bn} [sig.S] - S scalar as bn or bytes
	* @param {Array<Bytes>} [sig.Rencoded] - R point encoded
	* @param {Array<Bytes>} [sig.Sencoded] - S scalar encoded
	*/
	function Signature(eddsa, sig) {
	  this.eddsa = eddsa;

	  if (typeof sig !== 'object')
	    sig = parseBytes(sig);

	  if (Array.isArray(sig)) {
	    sig = {
	      R: sig.slice(0, eddsa.encodingLength),
	      S: sig.slice(eddsa.encodingLength)
	    };
	  }

	  assert(sig.R && sig.S, 'Signature without R or S');

	  if (eddsa.isPoint(sig.R))
	    this._R = sig.R;
	  if (sig.S instanceof BN)
	    this._S = sig.S;

	  this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
	  this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
	}

	cachedProperty(Signature, 'S', function S() {
	  return this.eddsa.decodeInt(this.Sencoded());
	});

	cachedProperty(Signature, 'R', function R() {
	  return this.eddsa.decodePoint(this.Rencoded());
	});

	cachedProperty(Signature, 'Rencoded', function Rencoded() {
	  return this.eddsa.encodePoint(this.R());
	});

	cachedProperty(Signature, 'Sencoded', function Sencoded() {
	  return this.eddsa.encodeInt(this.S());
	});

	Signature.prototype.toBytes = function toBytes() {
	  return this.Rencoded().concat(this.Sencoded());
	};

	Signature.prototype.toHex = function toHex() {
	  return utils.encode(this.toBytes(), 'hex').toUpperCase();
	};

	module.exports = Signature;


/***/ }
/******/ ]);