/**
 * Returns info about browser
 */
export function BrowserInfo() {
    const res = {
        name: "",
        version: "",
    };
    const userAgent = window.navigator.userAgent;

    let reg: string[] | null;
    if (reg = /edge\/([\d\.]+)/i.exec(userAgent)) {
        res.name = "Edge";
        res.version = reg[1];
    } else if (/msie/i.test(userAgent)) {
        res.name = "Internet Explorer";
        res.version = /msie ([\d\.]+)/i.exec(userAgent)![1];
    } else if (/Trident/i.test(userAgent)) {
        res.name = "Internet Explorer";
        res.version = /rv:([\d\.]+)/i.exec(userAgent)![1];
    } else if (/chrome/i.test(userAgent)) {
        res.name = "Chrome";
        res.version = /chrome\/([\d\.]+)/i.exec(userAgent)![1];
    } else if (/safari/i.test(userAgent)) {
        res.name = "Safari";
        res.version = /version\/([\d\.]+)/i.exec(userAgent)![1];
    } else if (/firefox/i.test(userAgent)) {
        res.name = "Firefox";
        res.version = /firefox\/([\d\.]+)/i.exec(userAgent)![1];
    }
    return res;
}