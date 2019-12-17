cryptoEngines.js = window.crypto;

async function onListening(ws) {
  const isLoggedIn = await ws.isLoggedIn();

  if (!isLoggedIn) {
    const challenge = await ws.challenge();

    console.log(challenge);

    await ws.login();
  }

  const info = await ws.info();

  console.info("providers:", info);

  const providerCrypto = await ws.getCrypto(info.providers[0].id);

  cryptoEngines.local = providerCrypto;
}

async function onToken(info) {
  if (info.error) {
    console.error(info.error);
  } else {
    console.info(info);
  }
}

async function initWebcryptoSocket() {
  const storage = await WebcryptoSocket.BrowserStorage.create();
  const ws = new WebcryptoSocket.SocketProvider({
    storage,
  });

  ws.connect("127.0.0.1:31337")
    .on("error", (e) => {
      console.error(e);
    })
    .on("listening", () => {
      console.log("listening");

      onListening(ws);
    })
    .on("token", (info) => {
      console.log("token");

      onToken(info);
    })
    .on("close", () => {
      console.info("close");
    });
}

export default initWebcryptoSocket;
