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
			  "tiId": "e7f13972847447f9811c94524b1d44ae",
			  "answer": "A",
			  "fake": "B"
			 }, {
			  "tiId": "9df9cf9f4a114b869485442f83a16542",
			  "answer": "CD",
			  "fake": "B"
			 }, {
			  "tiId": "7b413e1085594a5a826395447b5f1511",
			  "answer": "C",
			  "fake": "B"
			 }, {
			  "tiId": "6f704464296c4ff98ee610ea17276cdf",
			  "answer": "C",
			  "fake": "B"
			 }, {
			  "tiId": "25dbd1bcfa62464684ec24cddb7d7cfd",
			  "answer": "A",
			  "fake": "B"
			 }, {
			  "tiId": "8aef558b82644b729b0f4088dff1a3dd",
			  "answer": "ABD",
			  "fake": "B"
			 }, {
			  "tiId": "07878dcfb7f84558b4410f0477840263",
			  "answer": "BD",
			  "fake": "B"
			 }, {
			  "tiId": "facb239429824bc9bc3eb46ae26355cb",
			  "answer": "B",
			  "fake": "B"
			 }, {
			  "tiId": "6f8b747db30b4540a14deb4fd5f26911",
			  "answer": "ABCD",
			  "fake": "B"
			 }, {
			  "tiId": "6aebd8e35aa645fe934437f4a0ecca2d",
			  "answer": "A",
			  "fake": "B"
			 }, {
			  "tiId": "cdb82ec513c94394b990c9336a6d5a94",
			  "answer": "C",
			  "fake": "B"
			 }, {
			  "tiId": "65b0506b7cc44d528604aee502427497",
			  "answer": "B",
			  "fake": "B"
			 }, {
			  "tiId": "8cca7efc20a34b9783569ee0587257bd",
			  "answer": "A",
			  "fake": "B"
			 }, {
			  "tiId": "2fca0cc633f445f7a219ca19b8a36fb6",
			  "answer": "A",
			  "fake": "B"
			 }, {
			  "tiId": "d53d8044641949d99734f229914683bb",
			  "answer": "ABD",
			  "fake": "B"
			 }, {
			  "tiId": "0ce38223a1904a79a39063ec1d85ee0b",
			  "answer": "ABCD",
			  "fake": "B"
			 }, {
			  "tiId": "8c0fd009ea194beca41295d3876e0688",
			  "answer": "B",
			  "fake": "B"
			 }, {
			  "tiId": "352c89ce970d4eb98957ea98a693995f",
			  "answer": "ABCD",
			  "fake": "B"
			 }, {
			  "tiId": "38caeae84f224d66ab8aa5d670959a61",
			  "answer": "A",
			  "fake": "B"
			 }, {
			  "tiId": "9364c411420a467bac40e1d59e0a883a",
			  "answer": "B",
			  "fake": "B"
			 }, {
			  "tiId": "309a1863d05b4eae9c5f4af8a0d731f0",
			  "answer": "ABCD",
			  "fake": "B"
			 }, {
			  "tiId": "1ee6593676094759b6a504b18f18643f",
			  "answer": "A",
			  "fake": "B"
			 },
			{
				"tiId": "7701cee40fed4c6ab161a3bf4485a97e",
				"timu": "??????????????????????????????????????????????????????????????????????????????????????????",
				"answer": "B",
				"fake": "C"
			}, {
				"tiId": "569852b6ebf3434a95e27d9040d087d7",
				"timu": "??????????????????????????????????????????????????????????????????????????????????????????  ??????",
				"answer": "ABC",
				"fake": "AC"
			}, {
				"tiId": "d229308b40014e49b9d7a74042094cf8",
				"timu": "?????????????????????????????????????????????????????????????????????????????????  ???",
				"answer": "A",
				"fake": "C"
			}, {
				"tiId": "4b3876028c9b44f9ac5a5abf45f818f1",
				"timu": "??????????????????????????????????????????????????????????????????  ??????????????????????????????????????????????????????",
				"answer": "B",
				"fake": "C"
			}, {
				"tiId": "973dfb3266a6492c8b372f26ac77902e",
				"timu": "??????????????????????????????????????????????????????????????????  ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
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
		},{
			"tiId": "125523743f144994a10ce99b4c4baa67",
			"answer": "A",
			"fake": "B"
		   }, {
			"tiId": "b9a3c9e87632467e9f93c8fee089628d",
			"answer": "A",
			"fake": "B"
		   }, {
			"tiId": "cf49d108d73847478265821ccdc26e1e",
			"answer": "A",
			"fake": "B"
		   }, {
			"tiId": "531ec1b1306b4953bf1310848b3fd58d",
			"answer": "C",
			"fake": "B"
		   }, {
			"tiId": "f47221ac2267407593ceff55c74fc13d",
			"answer": "A",
			"fake": "B"
		   }, {
			"tiId": "5b1e24f05f56443db29776ccf3257d0c",
			"answer": "A",
			"fake": "B"
		   }, {
			"tiId": "c81ec8af4bd84890a3bdae7ba08bf0c0",
			"answer": "A",
			"fake": "B"
		   }, {
			"tiId": "32e673fa8f8d40fbb4c1985543836c39",
			"answer": "ABCD",
			"fake": "B"
		   }, {
			"tiId": "3cc766c3da3b48659ad4caef17a8bb5f",
			"answer": "B",
			"fake": "B"
		   }, {
			"tiId": "a07e5c5de15d4fadb79e45f22ad3a493",
			"answer": "B",
			"fake": "A"
		   }, {
			"tiId": "fe854452d9a9429b8694f3b266165cee",
			"answer": "ABCD",
			"fake": "B"
		   }, {
			"tiId": "24c6a715f79348a68835c631f49de840",
			"answer": "B",
			"fake": "B"
		   }, {
			"tiId": "c0a7429b741143aaa3e5c8d65a8e8e93",
			"answer": "C",
			"fake": "B"
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
			console.log("?????????");
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
				console.log(`?????????${res.data.answer.rightTi}???`);
			}
		} catch (e) {
			console.log("?????????.");
		}
		console.log("????????????...");
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
				console.log(`?????????${res.data.answer.rightTi}???`);
			}
		} catch (e) {
			console.log("?????????.");
		}
		console.log("????????????...");
		await sleep(randomNum(120000, 300000) + randomNum(1, 5) * 1000);
	}
}

//noSense()
//Start - Sleep - Seconds 5
//console.log("??????5s...");

export default async function (authorizationLg = "") {
	if (authorizationLg == "") {
		return Promise.reject({ "code": -9999, msg: "??????token" });
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
			console.log("??????????????????.");
		}
	}
	console.log("10??????????????????...");
	await sleep(10 * 1000);
	await doExam(3);
	console.log("5??????????????????...");
	await sleep(5 * 1000)

	await doExercise(5);
	console.log("End.");
}
