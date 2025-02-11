//Tue Feb 11 2025 05:06:01 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("阿里云社区-场景任务"),
  ckName = "aliyunWeb_data",
  Notify = 1,
  notify = $.isNode() ? require("./sendNotify") : "";
let envSplitor = ["@"];
var userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || "";
let userList = [],
  userIdx = 0,
  userCount = 0;
$.is_debug = ($.isNode() ? process.env.IS_DEDUG : $.getdata("is_debug")) || "false";
$.notifyList = [];
$.notifyMsg = [];
let pendingScore = 0,
  sceneId = "",
  resourceFrom = "",
  sectionId = "",
  ip = "";
async function main() {
  try {
    $.log("\n================== 任务 ==================\n");
    for (let _0x22e75a of userList) {
      console.log("🔷账号" + _0x22e75a.index + " >> Start work");
      console.log("随机延迟" + _0x22e75a.getRandomTime() + "秒");
      (await _0x22e75a.interactData()) ?? {};
      if (_0x22e75a.ckStatus) {
        await _0x22e75a.doScene();
        await $.wait(_0x22e75a.getRandomTime());
        pendingScore = await _0x22e75a.getUserTotalPendingScore();
        await $.wait(_0x22e75a.getRandomTime());
        await _0x22e75a.collect();
        await $.wait(_0x22e75a.getRandomTime());
        let _0x145663 = (await _0x22e75a.interactData()) ?? {};
        $.title = "本次运行共获得" + (pendingScore || 0) + "积分";
        DoubleLog("🎉 领取积分: " + pendingScore + ", 当前积分: " + _0x145663);
      } else {
        $.notifyMsg.push("⛔️ 账号" + (_0x22e75a.userName || _0x22e75a.index) + " >> Check ck error!");
      }
      $.notifyList.push({
        id: _0x22e75a.index,
        avatar: _0x22e75a.avatar,
        message: $.notifyMsg
      });
      $.notifyMsg = [];
    }
  } catch (_0x47bba8) {
    $.log("⛔️ main run error => " + _0x47bba8);
    throw new Error("⛔️ main run error => " + _0x47bba8);
  }
}
class UserInfo {
  constructor(_0x36b0c6) {
    this.index = ++userIdx;
    this.token = _0x36b0c6.token || _0x36b0c6;
    this.userId = _0x36b0c6.userId;
    this.userName = _0x36b0c6.userName;
    this.avatar = _0x36b0c6.avatar;
    this.ckStatus = true;
    this.baseUrl = "";
    this.host = "https://developer.aliyun.com/developer/api";
    this.headers = {
      Cookie: this.token,
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Referer: "https://developer.aliyun.com/"
    };
    this.getRandomTime = () => randomInt(1, 2);
    this.fetch = async _0x364b47 => {
      try {
        if (typeof _0x364b47 === "string") {
          _0x364b47 = {
            url: _0x364b47
          };
        }
        if (_0x364b47?.["url"]?.["startsWith"]("/")) {
          _0x364b47.url = this.host + _0x364b47.url;
        }
        const _0x4e81a0 = await Request({
          ..._0x364b47,
          headers: _0x364b47.headers || this.headers,
          url: _0x364b47.url || this.baseUrl
        });
        debug(_0x4e81a0, _0x364b47?.["url"]?.["replace"](/\/+$/, "")["substring"](_0x364b47?.["url"]?.["lastIndexOf"]("/") + 1));
        if (_0x4e81a0?.["code"] == 40001) {
          throw new Error(_0x4e81a0?.["message"] || "用户需要去登录");
        }
        return _0x4e81a0;
      } catch (_0x4165bb) {
        this.ckStatus = false;
        $.log("⛔️ 请求发起失败！" + _0x4165bb);
      }
    };
  }
  async getUser() {
    try {
      const _0x47b788 = {
        url: "/my/user/getUser",
        type: "get"
      };
      await this.fetch(_0x47b788);
    } catch (_0xb6d1af) {
      this.ckStatus = false;
      $.log("⛔️ 获取签到任务列表失败! " + _0xb6d1af);
    }
  }
  async doScene() {
    const _0x140d49 = this.token.match(new RegExp("c_csrf=([^;]*)"))[1];
    await this.getSceneList();
    await $.wait(this.getRandomTime());
    const _0x301904 = await this.getSceneDetailPageInfoById();
    await $.wait(this.getRandomTime());
    if (_0x301904) {
      await this.getSceneStartPageInfoById();
      await $.wait(this.getRandomTime());
      await this.startSceneById(_0x140d49);
      await $.wait(this.getRandomTime());
      resourceFrom === "1" && sectionId && (await this.createResourceById(_0x140d49), await $.wait(this.getRandomTime()), await this.getResourceCardInfoById(), await $.wait(this.getRandomTime()));
      await this.closeSceneById(_0x140d49);
      await $.wait(this.getRandomTime());
    } else {
      await this.doScene();
    }
  }
  async getSceneList() {
    try {
      const _0x248196 = Math.floor(Math.random() * 27) + 1,
        _0x410d88 = 21,
        _0x2d66f5 = {
          url: "https://developer.aliyun.com/adc/api/getSceneList",
          type: "get",
          params: {
            tags: encodeURIComponent(","),
            difficulty: "",
            orderBy: "useCountTotal",
            pageNum: _0x248196,
            pageSize: _0x410d88
          },
          headers: {
            Cookie: this.headers.Cookie,
            Referer: "https://developer.aliyun.com/adc/labs/",
            "User-Agent": this.headers["User-Agent"]
          }
        },
        _0x27360d = await this.fetch(_0x2d66f5),
        _0xf4f509 = _0x27360d?.["data"]?.["list"];
      if (_0xf4f509.length) {
        const _0x4b3686 = _0xf4f509[Math.floor(Math.random() * _0xf4f509.length)];
        sceneId = _0x4b3686?.["id"];
        $.log("✅ 获取场景: " + _0x4b3686.name + "[" + sceneId + "]");
      } else {
        $.log("⛔️ 获取场景失败! " + e);
      }
    } catch (_0x8ae465) {
      this.ckStatus = false;
      $.log("⛔️ 获取场景失败! " + _0x8ae465);
    }
  }
  async getSceneDetailPageInfoById() {
    try {
      const _0x57d1de = {
          url: "https://developer.aliyun.com/adc/api/getSceneDetailPageInfoById",
          type: "get",
          params: {
            id: sceneId
          },
          headers: {
            cookie: this.headers.Cookie,
            referer: "https://developer.aliyun.com/adc/scenario/" + sceneId,
            "user-agent": this.headers["User-Agent"]
          }
        },
        _0x383005 = await this.fetch(_0x57d1de),
        {
          buttonCode: _0x44513e
        } = _0x383005?.["data"]?.["developerAdcExperienceStatusVO"];
      return _0x44513e === "1" ? ($.log("✅ 确认场景状态: " + _0x383005?.["data"]?.["id"]), _0x383005?.["data"]?.["id"]) : ($.log("⛔️ 确认场景状态: " + _0x383005?.["data"]?.["id"] + " 已完成，将重新获取场景"), null);
    } catch (_0x895f37) {
      this.ckStatus = false;
      $.log("⛔️ 确认场景状态失败! " + _0x895f37);
    }
  }
  async getSceneStartPageInfoById() {
    try {
      const _0x337c7f = {
          url: "https://developer.aliyun.com/adc/api/getSceneStartPageInfoById",
          type: "get",
          params: {
            id: sceneId
          },
          headers: {
            cookie: this.headers.Cookie,
            referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId,
            "user-agent": this.headers["User-Agent"]
          }
        },
        _0x925643 = await this.fetch(_0x337c7f);
      ip = _0x925643?.["data"]?.["ip"];
      _0x925643?.["data"]?.["resourceFrom"]["indexOf"]("1") > -1 ? resourceFrom = "1" : resourceFrom = "2";
      _0x925643?.["data"]?.["resourceCardInfoDTOList"]["length"] && (sectionId = _0x925643?.["data"]?.["resourceCardInfoDTOList"][0]?.["id"]);
      $.log("✅ 获取场景初始化信息: " + sceneId);
    } catch (_0x35c598) {
      this.ckStatus = false;
      $.log("⛔️ 获取场景初始化信息失败! " + _0x35c598);
    }
  }
  async startSceneById(_0x17b25b) {
    try {
      const _0x110213 = {
          url: "https://developer.aliyun.com/adc/api/startSceneById",
          type: "post",
          dataType: "form",
          headers: {
            Host: "developer.aliyun.com",
            H_csrf: _0x17b25b,
            "X-XSRF-TOKEN": _0x17b25b,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId
          },
          params: {
            p_csrf: _0x17b25b
          },
          body: {
            id: sceneId,
            resourceFrom: resourceFrom
          }
        },
        _0x5d3e92 = await this.fetch(_0x110213),
        {
          code: _0xa1aeb6,
          message: _0x56333b
        } = _0x5d3e92;
      console.log((_0xa1aeb6 === "200" ? "✅" : "⛔️") + " 开始场景: " + sceneId + ", " + _0x56333b);
    } catch (_0x4be286) {
      this.ckStatus = false;
      $.log("⛔️ 开始场景失败! " + _0x4be286);
    }
  }
  async closeSceneById(_0x3aa4b2) {
    try {
      const _0x1abdb2 = {
          url: "https://developer.aliyun.com/adc/api/closeSceneById",
          type: "post",
          dataType: "form",
          body: {
            sceneId: sceneId,
            forceClose: "true"
          },
          params: {
            p_csrf: _0x3aa4b2
          },
          headers: {
            Host: "developer.aliyun.com",
            H_csrf: _0x3aa4b2,
            "X-XSRF-TOKEN": _0x3aa4b2,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId
          }
        },
        _0x1d2cf6 = await this.fetch(_0x1abdb2),
        {
          code: _0x4b1bc4,
          message: _0x1729a6
        } = _0x1d2cf6;
      console.log((_0x4b1bc4 === "200" ? "✅" : "⛔️") + " 结束场景: " + sceneId + ", " + _0x1729a6);
    } catch (_0x48997c) {
      this.ckStatus = false;
      $.log("⛔️ 结束场景失败! " + _0x48997c);
    }
  }
  async createResourceById(_0x1a8157) {
    try {
      const _0x1d8183 = {
          url: "https://developer.aliyun.com/adc/api/createResourceById",
          type: "post",
          dataType: "form",
          body: {
            id: sceneId,
            sectionId: sectionId,
            ip: ip
          },
          params: {
            p_csrf: _0x1a8157
          },
          headers: {
            Host: "developer.aliyun.com",
            H_csrf: _0x1a8157,
            "X-XSRF-TOKEN": _0x1a8157,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId
          }
        },
        _0x5482d8 = await this.fetch(_0x1d8183);
      _0x5482d8?.["data"] && console.log("✅ 开始创建场景资源: " + sceneId);
    } catch (_0x4f65fb) {
      this.ckStatus = false;
      $.log("⛔️ 创建场景资源失败! " + _0x4f65fb);
    }
  }
  async getResourceCardInfoById() {
    try {
      const _0x32d89f = {
          url: "https://developer.aliyun.com/adc/api/getResourceCardInfoById",
          type: "get",
          params: {
            sceneId: sceneId,
            sectionId: sectionId
          },
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId
          }
        },
        _0x1ad750 = await this.fetch(_0x32d89f),
        {
          code: _0x1f07a2,
          data: _0x2313e8
        } = _0x1ad750;
      if (_0x1f07a2 === "200" && _0x2313e8) {
        if (_0x2313e8?.["status"] !== "RUNNING") {
          await $.wait(this.getRandomTime());
          await this.getResourceCardInfoById();
        } else {
          console.log("✅ 创建场景资源完毕: " + sceneId);
          return true;
        }
      }
    } catch (_0x5b11a8) {
      this.ckStatus = false;
      $.log("⛔️ 创建场景资源失败! " + _0x5b11a8);
    }
  }
  async interactData() {
    try {
      const _0x2e87ac = {
        url: "/my/score/getUserScore?appCode=developer",
        type: "get"
      };
      let _0x17c11f = await this.fetch(_0x2e87ac);
      return _0x17c11f?.["data"];
    } catch (_0x59b274) {
      $.log("⛔️ 查询待收获积分列表失败! " + _0x59b274);
    }
  }
  async getUserTotalPendingScore() {
    try {
      const _0x3262bf = {
        url: "/score/pending/getUserTotalPendingScore?appCode=developer",
        type: "get"
      };
      let _0x1edabc = await this.fetch(_0x3262bf);
      $.log("✅ 待领取积分: " + _0x1edabc?.["data"]);
      return _0x1edabc?.["data"];
    } catch (_0x4714d6) {
      $.log("⛔️ 查询待领取积分失败! " + _0x4714d6);
    }
  }
  async collect() {
    try {
      const _0x494889 = {
        url: "/score/pending/receiveAllPendingScore?appCode=developer",
        type: "get"
      };
      let _0x1b64d7 = await this.fetch(_0x494889);
      $.log("✅ 收取积分: " + _0x1b64d7?.["data"]);
      return _0x1b64d7?.["data"];
    } catch (_0x4a880a) {
      $.log("⛔️ 收取积分失败! " + _0x4a880a);
    }
  }
}
async function getCookie() {
  if ($request && $request.method === "OPTIONS") {
    return;
  }
  const _0x10aa1e = ObjectKeys2LowerCase($request.headers),
    _0x122eb9 = _0x10aa1e.cookie,
    _0xa6a327 = $.toObj($response.body);
  if (!_0xa6a327?.["data"]) {
    $.msg($.name, "⛔️ 获取Cookie失败!", "");
    return;
  }
  const {
      nickname: _0x318d38,
      avatar: _0x25e32f
    } = _0xa6a327?.["data"],
    _0x38a293 = {
      userId: _0x318d38,
      avatar: _0x25e32f,
      token: _0x122eb9,
      userName: _0x318d38
    };
  userCookie = userCookie ? JSON.parse(userCookie) : [];
  const _0x3193e2 = userCookie.findIndex(_0x224fab => _0x224fab.userId == _0x38a293.userId);
  userCookie[_0x3193e2] ? userCookie[_0x3193e2] = _0x38a293 : userCookie.push(_0x38a293);
  $.setjson(userCookie, ckName);
  $.msg($.name, "🎉" + _0x38a293.userName + "更新token成功!", "");
}
async function checkEnv() {
  try {
    const _0x5d3661 = envSplitor.find(_0x5271ab => userCookie.includes(_0x5271ab)) || envSplitor[0];
    userCookie = $.toObj(userCookie) || userCookie.split(_0x5d3661);
    userList.push(...userCookie.map(_0x4d28e1 => new UserInfo(_0x4d28e1)).filter(Boolean));
    userCount = userList.length;
    console.log("共找到" + userCount + "个账号");
    return true;
  } catch (_0x386fca) {
    throw new Error("⛔️ checkEnv run error => " + _0x386fca);
  }
}
async function Request(_0x502b28) {
  if (typeof _0x502b28 === "string") {
    _0x502b28 = {
      url: _0x502b28
    };
  }
  try {
    if (!_0x502b28?.["url"]) {
      throw new Error("[发送请求] 缺少 url 参数");
    }
    let {
      url: _0x92727a,
      type: _0x38babe,
      headers = {},
      body: _0x162f0d,
      params: _0x5328f6,
      dataType = "form",
      resultType = "data"
    } = _0x502b28;
    const _0x1cc246 = _0x38babe ? _0x38babe?.["toLowerCase"]() : "body" in _0x502b28 ? "post" : "get",
      _0x48ce42 = _0x92727a.concat(_0x1cc246 === "post" ? "?" + $.queryStr(_0x5328f6) : ""),
      _0x4878d7 = _0x502b28.timeout ? $.isSurge() ? _0x502b28.timeout / 1000 : _0x502b28.timeout : 10000;
    if (dataType === "json") {
      headers["Content-Type"] = "application/json;charset=UTF-8";
    }
    const _0x105d5e = _0x162f0d && dataType == "form" ? $.queryStr(_0x162f0d) : $.toStr(_0x162f0d),
      _0x5b0ceb = {
        ..._0x502b28,
        ...(_0x502b28?.["opts"] ? _0x502b28.opts : {}),
        url: _0x48ce42,
        headers: headers,
        ...(_0x1cc246 === "post" && {
          body: _0x105d5e
        }),
        ...(_0x1cc246 === "get" && _0x5328f6 && {
          params: _0x5328f6
        }),
        timeout: _0x4878d7
      },
      _0x543a4e = $.http[_0x1cc246.toLowerCase()](_0x5b0ceb).then(_0x91a5e2 => resultType == "data" ? $.toObj(_0x91a5e2.body) || _0x91a5e2.body : $.toObj(_0x91a5e2) || _0x91a5e2).catch(_0x4879bb => $.log("⛔️ 请求发起失败！原因为: " + _0x4879bb));
    return Promise.race([new Promise((_0x36ebd4, _0x55b9c7) => setTimeout(() => _0x55b9c7("当前请求已超时"), _0x4878d7)), _0x543a4e]);
  } catch (_0x94d45) {
    console.log("⛔️ 请求发起失败！原因为: " + _0x94d45);
  }
}
function randomInt(_0x2edac2, _0x4d4c06) {
  return Math.round(Math.random() * (_0x4d4c06 - _0x2edac2) + _0x2edac2);
}
function DoubleLog(_0x1c6202) {
  if (_0x1c6202 && $.isNode()) {
    console.log("" + _0x1c6202);
    $.notifyMsg.push("" + _0x1c6202);
  } else {
    _0x1c6202 && (console.log("" + _0x1c6202), $.notifyMsg.push("" + _0x1c6202));
  }
}
function debug(_0x1fe99d, _0x74e769 = "debug") {
  $.is_debug === "true" && ($.log("\n-----------" + _0x74e769 + "------------\n"), $.log(typeof _0x1fe99d == "string" ? _0x1fe99d : $.toStr(_0x1fe99d) || "debug error => t=" + _0x1fe99d), $.log("\n-----------" + _0x74e769 + "------------\n"));
}
async function SendMsgList(_0x20beab) {
  await Promise.allSettled(_0x20beab?.["map"](_0x1a506b => SendMsg(_0x1a506b.message.join("\n"), _0x1a506b.avatar)));
}
async function SendMsg(_0x46db8d, _0x178c12) {
  _0x46db8d && (0 < Notify ? $.isNode() ? await notify.sendNotify($.name, _0x46db8d) : $.msg($.name, $.title || "", _0x46db8d, {
    "media-url": _0x178c12
  }) : console.log(_0x46db8d));
}
function ObjectKeys2LowerCase(_0x5027bf) {
  _0x5027bf = Object.fromEntries(Object.entries(_0x5027bf).map(([_0x309936, _0x3183ff]) => [_0x309936.toLowerCase(), _0x3183ff]));
  return new Proxy(_0x5027bf, {
    get: function (_0x5a2a59, _0x24ca42, _0x1d755b) {
      return Reflect.get(_0x5a2a59, _0x24ca42.toLowerCase(), _0x1d755b);
    },
    set: function (_0x481e93, _0x4a34e8, _0x2febb4, _0xeb9cb4) {
      return Reflect.set(_0x481e93, _0x4a34e8.toLowerCase(), _0x2febb4, _0xeb9cb4);
    }
  });
}
!(async () => {
  if (typeof $request != "undefined") {
    await getCookie();
  } else {
    if (!(await checkEnv())) {
      throw new Error("⛔️ 未检测到ck，请添加环境变量");
    }
    if (userList.length > 0) {
      await main();
    }
  }
})().catch(_0x463fe9 => $.notifyMsg.push(_0x463fe9.message || _0x463fe9)).finally(async () => {
  await SendMsgList($.notifyList);
  $.done({
    ok: 1
  });
});
function Env(t, e) {
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      "POST" === e && (s = this.post);
      return new Promise((e, r) => {
        s.call(this, t, (t, s, a) => {
          t ? r(t) : e(s);
        });
      });
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.encoding = "utf-8";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    getEnv() {
      return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0;
    }
    isNode() {
      return "Node.js" === this.getEnv();
    }
    isQuanX() {
      return "Quantumult X" === this.getEnv();
    }
    isSurge() {
      return "Surge" === this.getEnv();
    }
    isLoon() {
      return "Loon" === this.getEnv();
    }
    isShadowrocket() {
      return "Shadowrocket" === this.getEnv();
    }
    isStash() {
      return "Stash" === this.getEnv();
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      if (this.getdata(t)) {
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      }
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, r) => e(r));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        r = r ? r.replace(/\n/g, "").trim() : r;
        let a = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        a = a ? 1 * a : 20;
        a = e && e.timeout ? e.timeout : a;
        const [i, o] = r.split("@"),
          n = {
            url: `http://${o}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: a
            },
            headers: {
              "X-Key": i,
              Accept: "*/*"
            },
            timeout: a
          };
        this.post(n, (t, e, r) => s(r));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          r = !s && this.fs.existsSync(e);
        if (!s && !r) {
          return {};
        }
        {
          const r = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(r));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          r = !s && this.fs.existsSync(e),
          a = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, a) : r ? this.fs.writeFileSync(e, a) : this.fs.writeFileSync(t, a);
      }
    }
    lodash_get(t, e, s = void 0) {
      const r = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let a = t;
      for (const t of r) if (a = Object(a)[t], void 0 === a) {
        return s;
      }
      return a;
    }
    lodash_set(t, e, s) {
      Object(t) !== t || (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, r) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[r + 1]) >> 0 == +e[r + 1] ? [] : {}, t)[e[e.length - 1]] = s);
      return t;
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, r] = /^@(.*?)\.(.*?)$/.exec(t),
          a = s ? this.getval(s) : "";
        if (a) {
          try {
            const t = JSON.parse(a);
            e = t ? this.lodash_get(t, r, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, r, a] = /^@(.*?)\.(.*?)$/.exec(e),
          i = this.getval(r),
          o = r ? "null" === i ? null : i || "{}" : "{}";
        try {
          const e = JSON.parse(o);
          this.lodash_set(e, a, t);
          s = this.setval(JSON.stringify(e), r);
        } catch (e) {
          const i = {};
          this.lodash_set(i, a, t);
          s = this.setval(JSON.stringify(i), r);
        }
      } else {
        s = this.setval(t, e);
      }
      return s;
    }
    getval(t) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.read(t);
        case "Quantumult X":
          return $prefs.valueForKey(t);
        case "Node.js":
          this.data = this.loaddata();
          return this.data[t];
        default:
          return this.data && this.data[t] || null;
      }
    }
    setval(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.write(t, e);
        case "Quantumult X":
          return $prefs.setValueForKey(t, e);
        case "Node.js":
          this.data = this.loaddata();
          this.data[e] = t;
          this.writedata();
          return !0;
        default:
          return this.data && this.data[e] || null;
      }
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
    }
    get(t, e = () => {}) {
      switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {
        redirection: !1
      })), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          }));
          $httpClient.get(t, (t, s, r) => {
            !t && s && (s.body = r, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode);
            e(t, s, r);
          });
          break;
        case "Quantumult X":
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: r,
              headers: a,
              body: i,
              bodyBytes: o
            } = t;
            e(null, {
              status: s,
              statusCode: r,
              headers: a,
              body: i,
              bodyBytes: o
            }, i, o);
          }, t => e(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          let s = require("iconv-lite");
          this.initGotEnv(t);
          this.got(t).on("redirect", (t, e) => {
            try {
              if (t.headers["set-cookie"]) {
                const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                s && this.ckjar.setCookieSync(s, null);
                e.cookieJar = this.ckjar;
              }
            } catch (t) {
              this.logErr(t);
            }
          }).then(t => {
            const {
                statusCode: r,
                statusCode: a,
                headers: i,
                rawBody: o
              } = t,
              n = s.decode(o, this.encoding);
            e(null, {
              status: r,
              statusCode: a,
              headers: i,
              rawBody: o,
              body: n
            }, n);
          }, t => {
            const {
              message: r,
              response: a
            } = t;
            e(r, a, a && s.decode(a.rawBody, this.encoding));
          });
      }
    }
    post(t, e = () => {}) {
      const s = t.method ? t.method.toLocaleLowerCase() : "post";
      switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {
        redirection: !1
      })), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          }));
          $httpClient[s](t, (t, s, r) => {
            !t && s && (s.body = r, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode);
            e(t, s, r);
          });
          break;
        case "Quantumult X":
          t.method = s;
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: r,
              headers: a,
              body: i,
              bodyBytes: o
            } = t;
            e(null, {
              status: s,
              statusCode: r,
              headers: a,
              body: i,
              bodyBytes: o
            }, i, o);
          }, t => e(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          let r = require("iconv-lite");
          this.initGotEnv(t);
          const {
            url: a,
            ...i
          } = t;
          this.got[s](a, i).then(t => {
            const {
                statusCode: s,
                statusCode: a,
                headers: i,
                rawBody: o
              } = t,
              n = r.decode(o, this.encoding);
            e(null, {
              status: s,
              statusCode: a,
              headers: i,
              rawBody: o,
              body: n
            }, n);
          }, t => {
            const {
              message: s,
              response: a
            } = t;
            e(s, a, a && r.decode(a.rawBody, this.encoding));
          });
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let r = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in r) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? r[e] : ("00" + r[e]).substr(("" + r[e]).length)));
      return t;
    }
    queryStr(t) {
      let e = "";
      for (const s in t) {
        let r = t[s];
        null != r && "" !== r && ("object" == typeof r && (r = JSON.stringify(r)), e += `${s}=${r}&`);
      }
      e = e.substring(0, e.length - 1);
      return e;
    }
    msg(e = t, s = "", r = "", a) {
      const i = t => {
        switch (typeof t) {
          case void 0:
            return t;
          case "string":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              default:
                return {
                  url: t
                };
              case "Loon":
              case "Shadowrocket":
                return t;
              case "Quantumult X":
                return {
                  "open-url": t
                };
              case "Node.js":
                return;
            }
          case "object":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              case "Shadowrocket":
              default:
                return {
                  url: t.url || t.openUrl || t["open-url"]
                };
              case "Loon":
                return {
                  openUrl: t.openUrl || t.url || t["open-url"],
                  mediaUrl: t.mediaUrl || t["media-url"]
                };
              case "Quantumult X":
                return {
                  "open-url": t["open-url"] || t.url || t.openUrl,
                  "media-url": t["media-url"] || t.mediaUrl,
                  "update-pasteboard": t["update-pasteboard"] || t.updatePasteboard
                };
              case "Node.js":
                return;
            }
          default:
            return;
        }
      };
      if (!this.isMute) {
        switch (this.getEnv()) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Shadowrocket":
          default:
            $notification.post(e, s, r, i(a));
            break;
          case "Quantumult X":
            $notify(e, s, r, i(a));
          case "Node.js":
        }
      }
      if (!this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e);
        s && t.push(s);
        r && t.push(r);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.join(this.logSeparator));
    }
    logErr(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          this.log("", `❗️${this.name}, 错误!`, t);
          break;
        case "Node.js":
          this.log("", `❗️${this.name}, 错误!`, t.stack);
      }
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = (new Date().getTime() - this.startTime) / 1000;
      switch (this.log("", `🔔${this.name}, 结束! 🕛 ${e} 秒`), this.log(), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          $done(t);
          break;
        case "Node.js":
          process.exit(1);
      }
    }
  }(t, e);
}