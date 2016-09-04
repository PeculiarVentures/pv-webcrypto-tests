import * as React from "react";
import * as ReactDOM from "react-dom";

import {TestCaseCollection, GenerateKeyCase} from "./store/test";

// let testCol = new TestCaseCollection<GenerateKeyCase>([
//     new GenerateKeyCase({name: "Case 1"}),
//     new GenerateKeyCase({name: "Case 2"}),
//     new GenerateKeyCase({name: "Case 3"}),
// ]);

// Fix Sfari error
if ((crypto as any).webkitSubtle)
    crypto.subtle = (crypto as any).webkitSubtle;

import {App} from "./app";

ReactDOM.render(<App/>, document.getElementById("app"));