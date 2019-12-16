// Copy crypto js implementation
cryptoEngines.js = window.crypto;

ws = new WebcryptoSocket.SocketProvider();

ws.connect("localhost:8080")
    .on("error", (e) => {
        console.error(e.error);
    })
    .on("listening", (e) => {
        ws.info()
            .then((info) => {
                console.log("Providers:", info);
                return ws.getCrypto(info.providers[0].id); // OpenSSL
            })
            .then((crypto) => {
                cryptoEngines.local = crypto;
            })
    })
    .on("token", (info) => {
        if (info.error) {
            console.error(info.error);
        } else {
            ws.info()
                .then((wcInfo) => {
                    console.log(wcInfo);
                });
        }
    })
    .on("close", (e) => {
        console.info("close");
    });
