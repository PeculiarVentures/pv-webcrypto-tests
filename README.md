# pv-webcrypto-tests
We have built a number of public projects ontop of Webcrypto, including [PKIjs](pkijs.org), [XMLDSIGjs](https://https://github.com/PeculiarVentures/xmldsigjs) and [XAdES](https://xadesjs.com). In addition we have made a number of WebCrypto polyfills including: [node-webcrypto-ossl](https://github.com/PeculiarVentures/node-webcrypto-ossl), [node-webcrypto-p11](https://github.com/PeculiarVentures/node-webcrypto-p11), and [webcrypto-liner](https://github.com/PeculiarVentures/webcrypto-liner).

`pv-webcrypto-tests` is intended to be a basic test suite that can be used in `node` as well as within the `browser` to asses what a given WebCrypto implementation supports.

You can see the web page variant of the tests at [this site](https://peculiarventures.github.io/pv-webcrypto-tests/).

## Important
This test suite is not ready for consumption, we have more work to do, including fixing known bugs and adding coverage for other capabilites such as PBDKF2, amongst other things.
