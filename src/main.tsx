import * as React from "react";
import * as ReactDOM from "react-dom";

import {App} from "./app";
import initWebcryptoSocket from "./utils/init_webcrypto_socket";

initWebcryptoSocket();

ReactDOM.render(
  <App/>,
  document.getElementById("app"),
);
