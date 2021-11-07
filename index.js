import Proxy from 'http-mitm-proxy';
import LuckyDog, { randomNum, sleep } from './LuckyDog.js';
const proxy = Proxy();
const port = 8081;

let fuckedFlag = new Map();
function fuckYou(token = "") {
	if (token.indexOf("Bearer") < 0) {
		token = `Bearer ${token}`;
	}
	if (fuckedFlag.get(token)) {
		return;
	}
	fuckedFlag.set(token, !fuckedFlag.get(token));
	console.log(`Token是${token}`);
	console.log("已经获取到Token了, 稍等1分钟左右开始自动答题");
	sleep(randomNum(60, 100) * 1000).then(res => LuckyDog(token)).then(res => {
		fuckedFlag.delete(token);
	}).catch(e => {
		if (e.code == -9999) {
			console.log("Token无效, 点一点网页, 程序会自动地再抓一个");
			fuckedFlag.delete(token);
		} else {
			console.log("出错了");
			console.error(e);
			fuckedFlag.set(token, false);
		}
	});
}

proxy.onError(function (ctx, err) {
	if ('ERR_SSL_SSLV3_ALERT_CERTIFICATE_UNKNOWN' == err.code) {
		console.info("遇到一个证书错误, 不过不用管, 因为答题平台是HTTP的, 和这个错误无关");
		return;
	}
	//if (!fuckYou) {
		console.info("代理出错了, 不用管它, 只要获取到了Token就行:", err);
	//}
});

proxy.onRequest(function (ctx, callback) {
	const headers = ctx.clientToProxyRequest.headers;
	if (headers.host.indexOf(".gsosc.cn") >= 0) {
		if (headers.authorizationlg) {
			fuckYou(headers.authorizationlg);
		} else if (headers.cookie && headers.cookie.indexOf("WChart-Token") >= 0) {
			fuckYou(headers.cookie.replace("WChart-Token=", "Bearer "));
		}
	}
	return callback();
});

proxy.listen({ port });
console.log(`在电脑或手机上设置代理, 端口是${port}, 代理类型是HTTP ....`);
