import fetch from 'node-fetch';

if (!globalThis.fetch) {
	globalThis.fetch = fetch;
}

let baseUrl = "http://yjpf.gsosc.cn";


let headers = {
	"Accept": "application/json, text/plain, */*",
	"Content-Type": "application/json;charset=UTF-8",
	"Referer": "http://www.gsosc.cn/yj/home?projectId:emd2021",
	"Accept-Encoding": "gzip, deflate",
	"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36 QBCore/4.0.1326.400 QQBrowser/9.0.2524.400 Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2875.116 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63010200)",
	'Accept-Language': "zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.5;q=0.4",
	"Connection": "close",
	"Origin": "http://www.gsosc.cn"
}

export function randomNum(minNum, maxNum) {
	switch (arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10);
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
		default:
			return 0;
	}
}

function getAnswer(qDbName = "", options = { count: 5, no: [], wrongCount: 0, tiId: "" }, timeSum = { value: 0 }) {
	if (qDbName == "") {
		return [];
	}
	const _qDb = {
		"exercise": [
			{
				"tiId": "7701cee40fed4c6ab161a3bf4485a97e",
				"timu": "设区的市人民政府有权发布该行政区域内地震短期预报、临震预报。",
				"answer": "B",
				"fake": "C"
			}, {
				"tiId": "569852b6ebf3434a95e27d9040d087d7",
				"timu": "根据《建设工程抗震管理条例》，建设工程抗震应当坚持的原则有（  ）。",
				"answer": "ABC",
				"fake": "AC"
			}, {
				"tiId": "d229308b40014e49b9d7a74042094cf8",
				"timu": "有关建设工程的强制性标准，应当与抗震设防要求相衔接。（  ）",
				"answer": "A",
				"fake": "C"
			}, {
				"tiId": "4b3876028c9b44f9ac5a5abf45f818f1",
				"timu": "根据《工会法》，企业、事业单位、机关有会员（  ）人以上的，应当建立基层工会委员会。",
				"answer": "B",
				"fake": "C"
			}, {
				"tiId": "973dfb3266a6492c8b372f26ac77902e",
				"timu": "根据《劳动合同法》，用人单位自用工之日起满（  ）不与劳动者订立书面劳动合同的，视为用人单位与劳动者已订立无固定期限劳动合同。",
				"answer": "A",
				"fake": "C"
			}],
		"exam": [{
			"tiId": "76a50b360a90451088ab982c77053644",
			"answer": "B",
			"fake": "A"
		}, {
			"tiId": "02cbe782c7f544bc947b393ac6299fb4",
			"answer": "A",
			"fake": "B"
		}, {
			"tiId": "9a82ed3c9f364f2581eefead33aba0ad",
			"answer": "A",
			"fake": "A"
		}, {
			"tiId": "c9ef4d16358a44fb85738d8f702cec64",
			"answer": "A",
			"fake": "B"
		}, {
			"tiId": "99f6e1f2fc40416aacd4fa998088854a",
			"answer": "B",
			"fake": "A"
		}
		]
	};
	if (Object.keys(_qDb).indexOf(qDbName) < 0) {
		return [];
	}
	const _questions = _qDb[qDbName];
	const _questionsSelected = [];
	let { count, no, wrongCount, tiId } = options;
	let _q = null;
	let _time = 0;
	if (tiId) {
		_q = _questions.filter(ele => ele.tiId == tiId)[0];
		_time = randomNum(9000, 36000);
		timeSum.value += _time;
		return `${_q.tiId}#${_q.answer}#${_time}##`;
	}
	// if (no.length && no.forEach) {
	// 	no.forEach(e => {
	// 		_q = _questions[e];
	// 		_questionsSelected.push(`${_q.tiId}#${_q.answer}#${randomNum(9000, 36000)}##`)
	// 	});
	// 	//return _questionsSelected.map(e => `${e.tiId}#${e.answer}#${randomNum(9000, 36000)}##`).join("");
	// 	return _questionsSelected;
	// }
	no = [];
	let random = 0;
	for (; no.length < count;) {
		random = randomNum(0, _questions.length - 1);
		if (no.indexOf(random) < 0) {
			_q = _questions[random];
			if (wrongCount > 0) {
				if (randomNum(0, 1) || no.length + wrongCount > count) {
					if (_q.answer.length > 1) {
						_q.answer = _q.answer.replace(/\w$/, "");
					} else {
						if (_q.answer.indexOf("A") >= 0) {
							_q.answer = "B";
						} else if (_q.answer.indexOf("B") >= 0) {
							_q.answer = "A";
						} else if (_q.answer.indexOf("C") >= 0) {
							_q.answer = "D";
						} else {
							_q.answer = "C";
						}
					}
					wrongCount--;
				}
			}
			_time = randomNum(9000, 36000);
			timeSum.value += _time;
			_questionsSelected.push(`${_q.tiId}#${_q.answer}#${_time}##`)
			no.push(random);
		}
	}
	return _questionsSelected;
}

export async function sleep(ms = 1000, handler = { id: 0 }) {
	return new Promise((res, rej) => {
		handler.id = setTimeout(() => {
			res(handler);
		}, ms);
	});
}

async function request(url = "", curlParameter = null) {
	if (url == "") {
		return null;
	}
	const _res = await fetch(url, curlParameter);
	const json = await _res.json();
	if (json.code != 200) {
		console.error(json.msg);
		console.error(JSON.stringify(json));
		return Promise.reject(json);
	}
	return Promise.resolve(json);
}

async function noSense() {
	let _url = `${baseUrl.replace("yjpf", "www")}/prod-api/app/project/zyaction`;
	let _param = {
		method: "POST",
		headers: headers,
		body: JSON.stringify({
			"projectId": "emd2021",
			"pageName": "emd2021_home",
			"stayTime": 1,
			"type": "1"
		})
	};
	await request(_url, _param);
	_url = `${baseUrl.replace("yjpf", "www")}/prod-api/app/project/zybrowser`;
	_param.body = JSON.stringify({ "projectId": "emd2021", "type": 0 });
	await request(_url, _param);
	_url = `${baseUrl.replace("yjpf", "www")}/prod-api/modMainWx/wChatConfig`;
	_param.body = JSON.stringify({ "url": "http://www.gsosc.cn/yj/home?projectId=emd2021", "projectId": "emd2021" });
	await request(_url, _param);
}

async function checkIn() {
	let url = `${baseUrl}/prod-api/app/qiandao/add`;
	let param = { method: "POST", headers };

	param.headers.Referer = "http://www.gsosc.cn/yj/answershizhan?projectId=emd2021";
	param.body = JSON.stringify({
		"projectId": "emd2021",
		"mesId": "qiandao023",
		"answer": 2
	});
	try {
		const res = await request(url, param);
		if (null != res) {
			console.log("已签到");
		}
		return Promise.resolve(res);
	} catch (e) {
		return Promise.reject(e);
	}
}

async function doExercise(times = 5) {
	let url = `${baseUrl}/prod-api/app/bzCeShi/saveJJLUserAnswer`;
	const answerTimeSum = { value: 0 };
	let body = {
		"projectId": "emd2021",
		"dtId": "emd2021_jlldt"
	}
	let json = {
		"answer": getAnswer("exercise", {
			count: 5,
			wrongCount: randomNum(0, 2),
		}, answerTimeSum).join(""),
		"time": randomNum(120000, 300000)
	};
	let param = { method: "POST", headers };
	param.headers.Referer = "http://www.gsosc.cn/yj/answer?projectId=emd2021&cpId=";
	for (let i = 1; i <= times; i++) {
		json.time = randomNum(120000, 300000);
		if (json.time < answerTimeSum.value) {
			json.time = answerTimeSum.value - randomNum(100, 300);
		}
		body.json = JSON.stringify(json, undefined, '');
		param["body"] = JSON.stringify(body);
		try {
			const res = await request(url, param);
			if (null != res) {
				console.log(res.msg);
				console.log(`答对了${res.data.answer.rightTi}题`);
			}
		} catch (e) {
			console.log("出错了.");
		}
		console.log("稍等一会...");
		await sleep(randomNum(120000, 300000) + randomNum(1, 5) * 1000);
	}
}

async function doExam(times = 3) {
	let url = `${baseUrl}/prod-api/app/bzCeShi/saveSZYUserAnswer`;
	const answerTimeSum = { value: 0 };
	let body = {
		"projectId": "emd2021",
		"dtId": "emd2021_szydt"
	}
	let json = {
		"answer": getAnswer("exam", {
			count: 5,
			wrongCount: randomNum(0, 2)
		}, answerTimeSum).join(""),
		"time": randomNum(120000, 300000)
	};
	let param = { method: "POST", headers };
	param.headers.Referer = "http://www.gsosc.cn/yj/answershizhan?projectId=emd2021";
	for (let i = 1; i <= times; i++) {
		json.time = randomNum(120000, 300000);
		json.answer = getAnswer("exam", {
			count: 5,
			wrongCount: randomNum(0, 2)
		}, answerTimeSum).join("");
		if (json.time < answerTimeSum.value) {
			json.time = answerTimeSum.value - randomNum(100, 300);
		}
		body['json'] = JSON.stringify(json, undefined, '');
		param["body"] = JSON.stringify(body);
		try {
			const res = await request(url, param);
			if (null != res) {
				console.log(res.msg);
				console.log(`答对了${res.data.answer.rightTi}题`);
			}
		} catch (e) {
			console.log("出错了.");
		}
		console.log("稍等一会...");
		await sleep(randomNum(120000, 300000) + randomNum(1, 5) * 1000);
	}
}

//noSense()
//Start - Sleep - Seconds 5
//console.log("等待5s...");

export default async function (authorizationLg = "") {
	if (authorizationLg == "") {
		return Promise.reject({ "code": -9999, msg: "没有token" });
	}
	if (authorizationLg.indexOf("Bearer") < 0) {
		authorizationLg = `Bearer ${authorizationLg}`;
	}
	headers["AuthorizationLg"] = authorizationLg;

	try {
		let res = await checkIn();
	} catch (e) {
		if (e.code == -9999) {
			return Promise.reject(e);
		} else {
			console.log("签到时出错了.");
		}
	}
	console.log("10秒后开始答题...");
	await sleep(10 * 1000);
	await doExam(3);
	console.log("5秒后开始练习...");
	await sleep(5 * 1000)

	await doExercise(5);
	console.log("End.");
}
