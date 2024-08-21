//Wed Aug 21 2024 13:30:57 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("阿里云社区"),
  ckName = "aliyunWeb_data",
  controlTime = ($.isNode() ? process.env.aliyunWeb_time : $.getdata("aliyunWeb_time")) || "12",
  controlScene = ($.isNode() ? process.env.aliyunWeb_scene : $.getdata("aliyunWeb_scene")) || "false",
  controlStock = ($.isNode() ? process.env.aliyunWeb_stock : $.getdata("aliyunWeb_stock")) || "false",
  Notify = 1,
  notify = $.isNode() ? require("./sendNotify") : "";
let envSplitor = ["@"];
var userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || "";
let userList = [],
  userIdx = 0,
  userCount = 0;
const taskGroup = [{
  code: "",
  name: "我的社区"
}, {
  code: "ecs",
  name: "弹性计算"
}, {
  code: "computenest",
  name: "计算巢"
}, {
  code: "yitian",
  name: "倚天"
}, {
  code: "wuying",
  name: "无影"
}, {
  code: "cloudnative",
  name: "云原生"
}, {
  code: "storage",
  name: "云存储"
}, {
  code: "luoshen",
  name: "飞天洛神云网络"
}, {
  code: "database",
  name: "数据库"
}, {
  code: "polardb",
  name: "PolarDB开源"
}, {
  code: "bigdata",
  name: "大数据与机器学习"
}, {
  code: "modelscope",
  name: "ModelScope模型即服务"
}, {
  code: "viapi",
  name: "视觉智能"
}, {
  code: "dns",
  name: "域名解析DNS"
}, {
  code: "iot",
  name: "物联网"
}, {
  code: "devops",
  name: "云效DevOps"
}, {
  code: "aliyun_linux",
  name: "龙蜥操作系统"
}, {
  code: "modelstudio",
  name: "百炼大模型"
}, {
  code: "tongyi",
  name: "通义大模型"
}];
$.is_debug = ($.isNode() ? process.env.IS_DEDUG : $.getdata("is_debug")) || "false";
$.notifyList = [];
$.notifyMsg = [];
let pendingScore = 0,
  userScore = 0,
  sceneId = "",
  resourceFrom = "",
  sectionId = "",
  ip = "";
async function main() {
  try {
    $.log("\n================== 任务 ==================\n");
    for (let _0xd81f96 of userList) {
      console.log("🔷账号" + _0xd81f96.index + " >> Start work");
      console.log("随机延迟" + _0xd81f96.getRandomTime() + "秒");
      const _0x9c1899 = Date.now();
      userScore = (await _0xd81f96.interactData()) ?? {};
      if (_0xd81f96.ckStatus) {
        if (_0x9c1899 < new Date(new Date().setHours(Math.floor(controlTime), 0, 0, 0)).getTime()) {
          for (let _0x366916 of taskGroup) {
            const _0x40f7a7 = await _0xd81f96.getUserSpaceSignInDetail(_0x366916.code),
              _0x25f6b5 = await _0xd81f96.getTasks(_0x40f7a7);
            await _0xd81f96.signin(_0x25f6b5, _0x366916.name);
            await $.wait(_0xd81f96.getRandomTime());
            const _0x134674 = await _0xd81f96.assessSignInBonusQualification(_0x40f7a7, _0x366916.name);
            await $.wait(_0xd81f96.getRandomTime());
            _0x134674 && (await _0xd81f96.receiveSignInBonus(_0x40f7a7, _0x366916.name), await $.wait(_0xd81f96.getRandomTime()));
          }
          const _0x27722a = await _0xd81f96.getEbooks();
          await $.wait(_0xd81f96.getRandomTime());
          const _0x1731c7 = await _0xd81f96.getCsrfToken(_0x27722a, "ebook");
          await $.wait(_0xd81f96.getRandomTime());
          await _0xd81f96.addBookComment(_0x27722a, _0x1731c7);
          await $.wait(_0xd81f96.getRandomTime());
          for (let _0x49d7fe = 0; _0x49d7fe < 5; _0x49d7fe++) {
            const _0x1b98bc = await _0xd81f96.getArticles();
            await $.wait(_0xd81f96.getRandomTime());
            await _0xd81f96.likeOrNotLike(_0x1b98bc, "aliyun-public-like", 0);
            await $.wait(_0xd81f96.getRandomTime());
            await _0xd81f96.likeOrNotLike(_0x1b98bc, "aliyun-public-favorite", 0);
            await $.wait(_0xd81f96.getRandomTime());
            _0x49d7fe === 0 && (await _0xd81f96.addComment(_0x1b98bc), await $.wait(_0xd81f96.getRandomTime()), await _0xd81f96.likeOrNotLike(_0x1b98bc, "aliyun-public-share", 0), await $.wait(_0xd81f96.getRandomTime()));
            const _0x26bf75 = await _0xd81f96.getAsks();
            await $.wait(_0xd81f96.getRandomTime());
            if (_0x26bf75 && _0x26bf75?.["id"]) {
              const _0x450d48 = await _0xd81f96.getCsrfToken(_0x26bf75.id, "ask");
              await $.wait(_0xd81f96.getRandomTime());
              const _0x3cc1d1 = await _0xd81f96.getAskDetail(_0x26bf75);
              await $.wait(_0xd81f96.getRandomTime());
              _0x3cc1d1 && (await _0xd81f96.voteAnswer(_0x26bf75.id, _0x3cc1d1, _0x450d48, 1), await $.wait(_0xd81f96.getRandomTime()));
            }
          }
          JSON.parse(controlScene) && (await _0xd81f96.doScene(), await $.wait(_0xd81f96.getRandomTime()));
          JSON.parse(controlStock) && (await _0xd81f96.getGroupItems());
          pendingScore = await _0xd81f96.getUserTotalPendingScore();
          $.title = "获得待领取积分: " + pendingScore;
          DoubleLog("🎉 当前积分: " + userScore + ", 待领取积分: " + pendingScore);
        } else {
          for (let _0x5f20ca of taskGroup) {
            const _0x6c1176 = await _0xd81f96.getUserSpaceSignInDetail(_0x5f20ca.code),
              _0xd92b66 = await _0xd81f96.assessSignInBonusQualification(_0x6c1176, _0x5f20ca.name);
            await $.wait(_0xd81f96.getRandomTime());
            _0xd92b66 && (await _0xd81f96.receiveSignInBonus(_0x6c1176, _0x5f20ca.name), await $.wait(_0xd81f96.getRandomTime()));
          }
          pendingScore = await _0xd81f96.getUserTotalPendingScore();
          await $.wait(_0xd81f96.getRandomTime());
          await _0xd81f96.collect();
          await $.wait(_0xd81f96.getRandomTime());
          await $.wait(_0xd81f96.getRandomTime());
          const _0x144066 = (await _0xd81f96.getFavors()) ?? [];
          await $.wait(_0xd81f96.getRandomTime());
          if (_0x144066.length) {
            for (let _0x7635a2 of _0x144066) {
              await _0xd81f96.likeOrNotLike(_0x7635a2.objectId, "aliyun-public-like", 1);
              await $.wait(_0xd81f96.getRandomTime());
              await _0xd81f96.likeOrNotLike(_0x7635a2.objectId, "aliyun-public-favorite", 1);
              await $.wait(_0xd81f96.getRandomTime());
            }
          }
          JSON.parse(controlStock) && (await _0xd81f96.getGroupItems());
          let _0x18099b = (await _0xd81f96.interactData()) ?? {};
          $.title = "本次运行共获得" + (pendingScore || 0) + "积分";
          DoubleLog("🎉 领取积分: " + pendingScore + ", 当前积分: " + _0x18099b);
        }
      } else {
        $.notifyMsg.push("⛔️ 账号" + (_0xd81f96.userName || _0xd81f96.index) + " >> Check ck error!");
      }
      $.notifyList.push({
        id: _0xd81f96.index,
        avatar: _0xd81f96.avatar,
        message: $.notifyMsg
      });
      $.notifyMsg = [];
    }
  } catch (_0x35bd44) {
    $.log("⛔️ main run error => " + _0x35bd44);
    throw new Error("⛔️ main run error => " + _0x35bd44);
  }
}
class UserInfo {
  constructor(_0x1c531f) {
    this.index = ++userIdx;
    this.token = _0x1c531f.token || _0x1c531f;
    this.userId = _0x1c531f.userId;
    this.userName = _0x1c531f.userName;
    this.avatar = _0x1c531f.avatar;
    this.ckStatus = true;
    this.baseUrl = "";
    this.host = "https://developer.aliyun.com/developer/api";
    this.headers = {
      Cookie: this.token,
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Referer: "https://developer.aliyun.com/"
    };
    this.getRandomTime = () => randomInt(1, 2);
    this.fetch = async _0x4cb92a => {
      try {
        if (typeof _0x4cb92a === "string") {
          _0x4cb92a = {
            url: _0x4cb92a
          };
        }
        if (_0x4cb92a?.["url"]?.["startsWith"]("/")) {
          _0x4cb92a.url = this.host + _0x4cb92a.url;
        }
        const _0x1e24b7 = await Request({
          ..._0x4cb92a,
          headers: _0x4cb92a.headers || this.headers,
          url: _0x4cb92a.url || this.baseUrl
        });
        debug(_0x1e24b7, _0x4cb92a?.["url"]?.["replace"](/\/+$/, "")["substring"](_0x4cb92a?.["url"]?.["lastIndexOf"]("/") + 1));
        if (_0x1e24b7?.["code"] == 40001) {
          throw new Error(_0x1e24b7?.["message"] || "用户需要去登录");
        }
        return _0x1e24b7;
      } catch (_0x4ff423) {
        this.ckStatus = false;
        $.log("⛔️ 请求发起失败！" + _0x4ff423);
      }
    };
  }
  async getUser() {
    try {
      const _0x4bdfb4 = {
        url: "/my/user/getUser",
        type: "get"
      };
      await this.fetch(_0x4bdfb4);
    } catch (_0x2c4c25) {
      this.ckStatus = false;
      $.log("⛔️ 获取签到任务列表失败! " + _0x2c4c25);
    }
  }
  async assessSignInBonusQualification(_0x25ef27, _0x5d9fca) {
    if (!_0x25ef27) {
      return null;
    }
    try {
      const _0x1e96cf = {
        url: "/sign/assessSignInBonusQualification",
        type: "get",
        params: {
          taskGroupId: _0x25ef27
        }
      };
      let _0x75b850 = await this.fetch(_0x1e96cf);
      return _0x75b850?.["data"];
    } catch (_0x1faec0) {
      this.ckStatus = false;
      $.log("⛔️ 查询领奖条件失败! " + _0x1faec0);
    }
  }
  async receiveSignInBonus(_0x17a014, _0x392c16) {
    try {
      const _0x2d1840 = {
        url: "/sign/receiveSignInBonus",
        type: "post",
        dataType: "form",
        body: {
          taskGroupId: _0x17a014
        }
      };
      let _0x5d5ece = await this.fetch(_0x2d1840);
      if (_0x5d5ece?.["code"] == "200") {
        const _0x515e27 = _0x5d5ece?.["data"] || 0;
        $.log("✅ 抽奖 - " + (_0x392c16 || "default") + ": 获得 " + _0x515e27 + " 积分");
      } else {
        $.log("⛔️ 抽奖 - " + (_0x392c16 || "default") + ": " + _0x5d5ece?.["message"]);
      }
    } catch (_0x5d8e05) {
      this.ckStatus = false;
      $.log("⛔️ 抽奖失败! " + _0x5d8e05);
    }
  }
  async getUserSpaceSignInDetail(_0x379f77) {
    try {
      const _0x44421e = {
        url: "/sign/getUserSpaceSignInDetail",
        type: "get",
        params: {
          excode: _0x379f77
        }
      };
      let _0x4a8c2d = await this.fetch(_0x44421e);
      const _0x47fee5 = _0x4a8c2d?.["data"]?.["taskGroupId"] || null;
      return _0x47fee5;
    } catch (_0x232fc0) {
      this.ckStatus = false;
      $.log("⛔️ 获取签到任务列表失败! " + _0x232fc0);
    }
  }
  async getTasks(_0x42e37c) {
    if (!_0x42e37c) {
      return null;
    }
    try {
      const _0x55e995 = {
        url: "/task/getTaskGroup?groupId=" + _0x42e37c,
        type: "get"
      };
      let _0x28352b = await this.fetch(_0x55e995);
      const _0x429142 = _0x28352b?.["data"]?.["taskList"];
      let _0x12c288 = {};
      if (_0x429142.length) {
        const _0xeac76b = new Date().getTime();
        for (let _0x37389f of _0x429142) {
          if (_0xeac76b >= _0x37389f.gmtEnableStart && _0xeac76b <= _0x37389f.gmtEnableEnd) {
            const _0x4b59de = JSON.parse(_0x37389f.finishRule.replace(/&quot;/g, "\""));
            _0x12c288.actionCode = _0x4b59de.actions[0].actionCode;
            _0x12c288.activityCode = _0x4b59de.actions[0].actionCode;
            _0x12c288.objectId = _0x4b59de.actions[0].objectId;
          }
        }
      }
      return _0x12c288;
    } catch (_0x2703c8) {
      this.ckStatus = false;
      $.log("⛔️ 获取签到任务列表失败! " + _0x2703c8);
    }
  }
  async signin(_0x4d9795, _0x3a18ef) {
    if (!_0x4d9795) {
      $.log("✅ 签到 - " + (_0x3a18ef || "default") + ": 该社区无签到任务");
      return;
    }
    try {
      const _0x34c6c = {
        url: "/task/actionLog",
        type: "post",
        dataType: "form",
        body: _0x4d9795
      };
      let _0xdfcf1 = await this.fetch(_0x34c6c);
      $.log("✅ 签到 - " + (_0x3a18ef || "default") + ": " + _0xdfcf1?.["message"]);
    } catch (_0x467fd3) {
      this.ckStatus = false;
      $.log("⛔️ 签到失败! " + _0x467fd3);
    }
  }
  async getArticles() {
    try {
      const _0x107b3e = Math.floor(Math.random() * 31) + 1,
        _0x2c635e = {
          url: "https://developer.aliyun.com/group/aliware/article_hot?pageNum=" + _0x107b3e,
          type: "get"
        };
      let _0x57bef9 = await this.fetch(_0x2c635e);
      const _0x16a9e0 = $.Cheerio.load(_0x57bef9),
        _0x1540c5 = _0x16a9e0(".community-detail-content"),
        _0x3ce1b6 = _0x1540c5.find(".community-list").map((_0x523cb4, _0x402edf) => {
          return {
            id: _0x16a9e0(_0x402edf).find(".feed-item").attr("data-id"),
            name: _0x16a9e0(_0x402edf).find(".feed-item-content-title h3").text()
          };
        }).get(),
        _0x25163a = _0x3ce1b6[Math.floor(Math.random() * _0x3ce1b6.length)],
        {
          id: _0x1a2cb8,
          name: _0x54e668
        } = _0x25163a;
      $.log("✅ 随机获取文章id: " + _0x1a2cb8 + ", 标题: " + _0x54e668);
      return _0x1a2cb8;
    } catch (_0x5e3fcd) {
      this.ckStatus = false;
      $.log("⛔️ 获取文章列表失败! " + _0x5e3fcd);
    }
  }
  async getEbooks() {
    try {
      const _0x1abbe1 = Math.floor(Math.random() * 501) + 1,
        _0x4a62de = {
          url: "https://developer.aliyun.com/ebook/index/__0_0_0_" + _0x1abbe1,
          type: "get"
        };
      let _0x5c814f = await this.fetch(_0x4a62de);
      const _0x3b0354 = $.Cheerio.load(_0x5c814f),
        _0x30dd24 = _0x3b0354(".ebook-home-list"),
        _0x1c71b7 = _0x30dd24.find(".ebook-home-item").map((_0x29a93a, _0xc6272d) => {
          return {
            id: _0x3b0354(_0xc6272d).attr("href").replace("/ebook/", ""),
            name: _0x3b0354(_0xc6272d).find(".ebook-home-title").text()
          };
        }).get(),
        _0x2b0a68 = _0x1c71b7[Math.floor(Math.random() * _0x1c71b7.length)],
        {
          id: _0x768906,
          name: _0x4d9e79
        } = _0x2b0a68;
      $.log("✅ 随机电子书id: " + _0x768906 + ", 标题: " + _0x4d9e79);
      return _0x768906;
    } catch (_0x3ba18e) {
      this.ckStatus = false;
      $.log("⛔️ 获取电子书列表失败! " + _0x3ba18e);
    }
  }
  async getAsks() {
    try {
      const _0x528c49 = Math.floor(Math.random() * 31) + 1,
        _0x3e00c4 = {
          url: "https://developer.aliyun.com/ask?pageNum=" + _0x528c49,
          type: "get"
        };
      let _0x43fa1d = await this.fetch(_0x3e00c4);
      const _0x279b89 = $.Cheerio.load(_0x43fa1d),
        _0x296938 = _0x279b89(".askProduct-list"),
        _0x2f645a = _0x296938.find(".askProduct-item").map((_0x24545e, _0x58a0d3) => {
          return {
            id: _0x279b89(_0x58a0d3).attr("data-id") || "",
            name: _0x279b89(_0x58a0d3).find(".askProduct-item-title-text h3").text() || "",
            answer: parseInt(_0x279b89(_0x58a0d3).find(".askProduct-item-info-answer").text()) || ""
          };
        }).filter((_0xd6cceb, _0x133fb6) => _0x133fb6.answer > 0).get(),
        _0x5a4f4e = _0x2f645a[Math.floor(Math.random() * _0x2f645a.length)];
      if (_0x5a4f4e?.["id"] && _0x5a4f4e?.["name"]) {
        const {
          id: _0x3d0ce6,
          name: _0x572602
        } = _0x5a4f4e;
        $.log("✅ 随机获取问答id: " + _0x3d0ce6 + ", 标题: " + _0x572602);
        return _0x5a4f4e;
      }
      return null;
    } catch (_0xfee64a) {
      this.ckStatus = false;
      $.log("⛔️ 获取问答列表失败! " + _0xfee64a);
    }
  }
  async getAskDetail(_0x29e29a) {
    try {
      const _0x146abd = {
        url: "https://developer.aliyun.com/ask/" + _0x29e29a.id,
        type: "get"
      };
      let _0x4412bd = await this.fetch(_0x146abd);
      const _0x5b2dab = $.Cheerio.load(_0x4412bd),
        _0x129ea2 = _0x5b2dab(".answer-list"),
        _0xce291f = _0x129ea2.find(".answer-item").map((_0x4df284, _0x3e9f0a) => {
          return {
            id: _0x5b2dab(_0x3e9f0a).attr("data-id") || ""
          };
        }).get(),
        _0x1229f4 = _0xce291f[Math.floor(Math.random() * _0x29e29a.answer)];
      if (_0x1229f4) {
        const {
          id: _0x2862cd
        } = _0x1229f4;
        $.log("✅ 随机获取问题问答id: " + _0x2862cd);
        return _0x2862cd;
      }
      return null;
    } catch (_0x2d7574) {
      this.ckStatus = false;
      $.log("⛔️ 随机获取问题问答失败! " + _0x2d7574);
    }
  }
  async likeOrNotLike(_0x394dde, _0x5a5176, _0x466603) {
    try {
      const _0x2ebf25 = {
        url: "https://ucc.aliyun.com/uccPagingComponent/likeOrNotLike",
        type: "get",
        params: {
          bizCategory: "yq-article",
          actionCode: _0x5a5176,
          objectId: _0x394dde,
          status: _0x466603,
          uccCsrfToken: await this.getUccCsrfToken(),
          callback: getCallback()
        }
      };
      await this.fetch(_0x2ebf25);
      let _0x1acedc = "文章" + (_0x466603 === 1 ? "取消" : "");
      if (_0x5a5176 === "aliyun-public-like") {
        _0x1acedc += "点赞";
      } else {
        if (_0x5a5176 === "aliyun-public-favorite") {
          _0x1acedc += "收藏";
        } else {
          _0x5a5176 === "aliyun-public-share" && (_0x1acedc += "分享");
        }
      }
      $.log("✅ " + _0x1acedc + "成功: " + _0x394dde);
    } catch (_0x2bbd6f) {
      this.ckStatus = false;
      $.log("⛔️ " + taskType + "失败! " + _0x2bbd6f);
    }
  }
  async getCsrfToken(_0x55fe01, _0x5ee7dd) {
    try {
      const _0x287d50 = {
          url: "https://developer.aliyun.com/csrfToken",
          type: "get",
          headers: {
            Cookie: this.token,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(Aliyun/6.7.1) WindVane/8.7.2 1170x2532 WK",
            Referer: "https://developer.aliyun.com/" + _0x5ee7dd + "/" + _0x55fe01
          }
        },
        _0x14eeac = await this.fetch(_0x287d50);
      return _0x14eeac?.["token"];
    } catch (_0x468c79) {
      this.ckStatus = false;
      $.log("⛔️ 获取 csrf 失败! " + _0x468c79);
    }
  }
  async voteAnswer(_0x1cb48f, _0x174446, _0xba390, _0x2e0c2d) {
    try {
      const _0x415f68 = {
        url: "https://developer.aliyun.com/developer/api/my/ask/voteAnswer",
        type: "post",
        dataType: "form",
        headers: {
          Cookie: this.token,
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(Aliyun/6.7.1) WindVane/8.7.2 1170x2532 WK",
          Referer: "https://developer.aliyun.com/ask/" + _0x1cb48f
        },
        params: {
          p_csrf: _0xba390
        },
        body: {
          id: _0x174446,
          votes: _0x2e0c2d
        }
      };
      await this.fetch(_0x415f68);
      $.log("✅ 回答点赞: " + _0x1cb48f + "-" + _0x174446);
    } catch (_0x4bb2ca) {
      this.ckStatus = false;
      $.log("⛔️ 回答点赞失败! " + _0x4bb2ca);
    }
  }
  async addBookComment(_0x3fa91c, _0x2e589b) {
    try {
      const _0x184a6d = {
          url: "https://developer.aliyun.com/developer/api/ebook/mark/add",
          type: "post",
          dataType: "json",
          headers: {
            Cookie: this.token,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(Aliyun/6.7.1) WindVane/8.7.2 1170x2532 WK",
            Referer: "https://developer.aliyun.com/ebook/" + _0x3fa91c
          },
          params: {
            p_csrf: _0x2e589b
          },
          body: {
            eBookId: _0x3fa91c,
            score: 10,
            content: "很棒的一本书"
          }
        },
        _0x263162 = await this.fetch(_0x184a6d);
      _0x263162?.["code"] == "200" ? $.log("✅ 评价电子书: " + _0x3fa91c) : $.log("⛔️ 评价电子书失败! " + _0x263162?.["message"]);
    } catch (_0x9f49b0) {
      this.ckStatus = false;
      $.log("⛔️ 评价电子书失败! " + _0x9f49b0);
    }
  }
  async getFavors() {
    try {
      const _0x5c8c82 = {
          url: "https://developer.aliyun.com/developer/api/my/subscribe/listUserFavor",
          type: "get",
          params: {
            pageNum: 1,
            pageSize: 10,
            type: 1
          }
        },
        _0x35cdd4 = await this.fetch(_0x5c8c82),
        {
          list: _0x300a5a
        } = _0x35cdd4?.["data"];
      if (_0x300a5a.length) {
        $.log("✅ 开始取消文章的点赞与收藏记录");
        return _0x300a5a;
      }
      return [];
    } catch (_0x2be402) {
      this.ckStatus = false;
      $.log("⛔️ " + (type === "aliyun-public-like" ? "文章点赞" : "文章收藏") + "失败! " + _0x2be402);
    }
  }
  async addComment(_0x2be17b) {
    try {
      const _0x530eef = {
        url: "https://ucc.aliyun.com/uccPagingComponent/addComment",
        type: "get",
        params: {
          content: encodeURIComponent("感谢博主的分享"),
          objectId: _0x2be17b,
          bizCategory: "yq-comment-type-article",
          commentType: 0,
          sourceAppCode: "developer-ecology",
          sourceBizCategory: "developer-ecology-group",
          uccCsrfToken: await this.getUccCsrfToken(),
          callback: getCallback()
        }
      };
      await this.fetch(_0x530eef);
      $.log("✅ 文章评论: " + _0x2be17b);
    } catch (_0x11b439) {
      this.ckStatus = false;
      $.log("⛔️ 文章点赞失败! " + _0x11b439);
    }
  }
  async doScene() {
    const _0x1f06ce = this.token.match(new RegExp("c_csrf=([^;]*)"))[1];
    await this.getSceneList();
    await $.wait(this.getRandomTime());
    const _0x23943d = await this.getSceneDetailPageInfoById();
    await $.wait(this.getRandomTime());
    _0x23943d ? (await this.getSceneStartPageInfoById(), await $.wait(this.getRandomTime()), resourceFrom === "2" ? (await this.startSceneById(_0x1f06ce), await $.wait(this.getRandomTime()), await this.closeSceneById(_0x1f06ce), await $.wait(this.getRandomTime())) : await this.doScene()) : await this.doScene();
  }
  async getSceneList() {
    try {
      const _0x16caa3 = Math.floor(Math.random() * 11) + 1,
        _0x41f80b = 21,
        _0x200975 = {
          url: "https://developer.aliyun.com/adc/api/getSceneList",
          type: "get",
          params: {
            tags: encodeURIComponent(","),
            difficulty: "",
            orderBy: "useCountTotal",
            pageNum: _0x16caa3,
            pageSize: _0x41f80b
          },
          headers: {
            Cookie: this.headers.Cookie,
            Referer: "https://developer.aliyun.com/adc/labs/",
            "User-Agent": this.headers["User-Agent"]
          }
        },
        _0x3c4b18 = await this.fetch(_0x200975),
        _0x48ff47 = _0x3c4b18?.["data"]?.["list"];
      if (_0x48ff47.length) {
        const _0x495539 = _0x48ff47[Math.floor(Math.random() * _0x48ff47.length)];
        sceneId = _0x495539?.["id"];
        $.log("✅ 获取场景: " + _0x495539.name + "[" + sceneId + "]");
      } else {
        $.log("⛔️ 获取场景失败! " + e);
      }
    } catch (_0x555ee2) {
      this.ckStatus = false;
      $.log("⛔️ 获取场景失败! " + _0x555ee2);
    }
  }
  async getSceneDetailPageInfoById() {
    try {
      const _0x196727 = {
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
        _0x4642e4 = await this.fetch(_0x196727),
        _0x5a4de4 = _0x4642e4?.["data"]?.["developerAdcExperienceStatusVO"]?.["buttonCode"];
      return _0x5a4de4 ? _0x5a4de4 === "1" ? ($.log("✅ 确认场景状态: " + _0x4642e4?.["data"]?.["id"]), _0x4642e4?.["data"]?.["id"]) : ($.log("⛔️ 确认场景状态: " + _0x4642e4?.["data"]?.["id"] + " 已完成，将重新获取场景"), null) : ($.log("⛔️ 确认场景状态: " + _0x4642e4?.["data"]?.["id"] + " 状态异常，将重新获取场景"), null);
    } catch (_0x789f77) {
      this.ckStatus = false;
      $.log("⛔️ 确认场景状态失败! " + _0x789f77);
    }
  }
  async getSceneStartPageInfoById() {
    try {
      const _0x1f1886 = {
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
        _0x4681ea = await this.fetch(_0x1f1886);
      ip = _0x4681ea?.["data"]?.["ip"];
      _0x4681ea?.["data"]?.["resourceFrom"]["indexOf"]("1") > -1 ? resourceFrom = "1" : resourceFrom = "2";
      _0x4681ea?.["data"]?.["resourceCardInfoDTOList"]["length"] && (sectionId = _0x4681ea?.["data"]?.["resourceCardInfoDTOList"][0]?.["id"]);
      $.log("✅ 获取场景初始化信息: " + sceneId);
    } catch (_0x529931) {
      this.ckStatus = false;
      $.log("⛔️ 获取场景初始化信息失败! " + _0x529931);
    }
  }
  async startSceneById(_0x5301ff) {
    try {
      const _0x22b0fa = {
          url: "https://developer.aliyun.com/adc/api/startSceneById",
          type: "post",
          dataType: "form",
          headers: {
            Host: "developer.aliyun.com",
            H_csrf: _0x5301ff,
            "X-XSRF-TOKEN": _0x5301ff,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId
          },
          params: {
            p_csrf: _0x5301ff
          },
          body: {
            id: sceneId,
            resourceFrom: resourceFrom
          }
        },
        _0x102152 = await this.fetch(_0x22b0fa),
        {
          code: _0xc5adcc,
          message: _0x24c2ea
        } = _0x102152;
      console.log((_0xc5adcc === "200" ? "✅" : "⛔️") + " 开始场景: " + sceneId + ", " + _0x24c2ea);
    } catch (_0x2fa9cd) {
      this.ckStatus = false;
      $.log("⛔️ 开始场景失败! " + _0x2fa9cd);
    }
  }
  async closeSceneById(_0x43f819) {
    try {
      const _0x2dd18a = {
          url: "https://developer.aliyun.com/adc/api/closeSceneById",
          type: "post",
          dataType: "form",
          body: {
            sceneId: sceneId,
            forceClose: "true"
          },
          params: {
            p_csrf: _0x43f819
          },
          headers: {
            Host: "developer.aliyun.com",
            H_csrf: _0x43f819,
            "X-XSRF-TOKEN": _0x43f819,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId
          }
        },
        _0x4564b1 = await this.fetch(_0x2dd18a),
        {
          code: _0x481136,
          message: _0x2ed700
        } = _0x4564b1;
      console.log((_0x481136 === "200" ? "✅" : "⛔️") + " 结束场景: " + sceneId + ", " + _0x2ed700);
    } catch (_0x46b385) {
      this.ckStatus = false;
      $.log("⛔️ 结束场景失败! " + _0x46b385);
    }
  }
  async createResourceById(_0x4439cd) {
    try {
      const _0x3b123e = {
          url: "https://developer.aliyun.com/adc/api/createResourceById",
          type: "post",
          dataType: "form",
          body: {
            id: sceneId,
            sectionId: sectionId,
            ip: ip
          },
          params: {
            p_csrf: _0x4439cd
          },
          headers: {
            Host: "developer.aliyun.com",
            H_csrf: _0x4439cd,
            "X-XSRF-TOKEN": _0x4439cd,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId
          }
        },
        _0x2655b0 = await this.fetch(_0x3b123e);
      _0x2655b0?.["data"] && console.log("✅ 开始创建场景资源: " + sceneId);
    } catch (_0x18f508) {
      this.ckStatus = false;
      $.log("⛔️ 创建场景资源失败! " + _0x18f508);
    }
  }
  async getResourceCardInfoById() {
    try {
      const _0x29e45c = {
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
        _0x1bf7ee = await this.fetch(_0x29e45c),
        {
          code: _0x227aee,
          data: _0x4658f3
        } = _0x1bf7ee;
      if (_0x227aee === "200" && _0x4658f3) {
        if (_0x4658f3?.["status"] !== "RUNNING") {
          await $.wait(this.getRandomTime());
          await this.getResourceCardInfoById();
        } else {
          console.log("✅ 创建场景资源完毕: " + sceneId);
          return true;
        }
      }
    } catch (_0x19524f) {
      this.ckStatus = false;
      $.log("⛔️ 创建场景资源失败! " + _0x19524f);
    }
  }
  async getGroupItems() {
    try {
      const _0x543bad = {
          url: "/lm/getGroupItems?pageNum=1&pageSize=50",
          type: "get"
        },
        _0xd16b8f = await this.fetch(_0x543bad),
        {
          list: _0x481aa2
        } = _0xd16b8f?.["data"];
      if (_0x481aa2.length) {
        $.log("✅ 开始查询库存:");
        for (let _0x307c3b of _0x481aa2) {
          $.log("🎁 " + _0x307c3b.itemTitle.replace(/【.*?】/g, "") + ": " + _0x307c3b.points + " 分【" + _0x307c3b.statusStr + "】");
        }
      }
    } catch (_0x545477) {
      $.log("⛔️ 查询待收获积分列表失败! " + _0x545477);
    }
  }
  async interactData() {
    try {
      const _0x26bd11 = {
        url: "/my/score/getUserScore?appCode=developer",
        type: "get"
      };
      let _0x457c93 = await this.fetch(_0x26bd11);
      return _0x457c93?.["data"];
    } catch (_0x393286) {
      $.log("⛔️ 查询待收获积分列表失败! " + _0x393286);
    }
  }
  async getUserTotalPendingScore() {
    try {
      const _0x5598d1 = {
        url: "/score/pending/getUserTotalPendingScore?appCode=developer",
        type: "get"
      };
      let _0x41b85d = await this.fetch(_0x5598d1);
      $.log("✅ 待领取积分: " + _0x41b85d?.["data"]);
      return _0x41b85d?.["data"];
    } catch (_0x34f0fb) {
      $.log("⛔️ 查询待领取积分失败! " + _0x34f0fb);
    }
  }
  async collect() {
    try {
      const _0x172b83 = {
        url: "/score/pending/receiveAllPendingScore?appCode=developer",
        type: "get"
      };
      let _0x11492a = await this.fetch(_0x172b83);
      $.log("✅ 收取积分: " + _0x11492a?.["data"]);
      return _0x11492a?.["data"];
    } catch (_0x24a160) {
      $.log("⛔️ 收取积分失败! " + _0x24a160);
    }
  }
  async getUccCsrfToken() {
    try {
      const _0x19a6ed = {
        url: "https://ucc.aliyun.com/uccPagingComponent/getUser",
        type: "get",
        params: {
          uccCsrfToken: "",
          callback: getCallback()
        }
      };
      let _0x486584 = await this.fetch(_0x19a6ed);
      const _0x291ada = _0x486584.indexOf("{"),
        _0x24edfe = _0x486584.lastIndexOf("}"),
        _0x14238b = _0x486584.substring(_0x291ada, _0x24edfe + 1),
        _0x1fac20 = JSON.parse(_0x14238b);
      return _0x1fac20.data.uccCsrfToken;
    } catch (_0x2ec754) {
      $.log("⛔️ 获取UccCsrfToken失败! " + _0x2ec754);
    }
  }
}
function getCallback() {
  return "jsonp_" + Date.now() + "_" + Math.ceil(100000 * Math.random());
}
async function getCookie() {
  if ($request && $request.method === "OPTIONS") {
    return;
  }
  const _0x470710 = ObjectKeys2LowerCase($request.headers),
    _0xfab98b = _0x470710.cookie,
    _0x56ddd1 = $.toObj($response.body);
  if (!_0x56ddd1?.["data"]) {
    $.msg($.name, "⛔️ 获取Cookie失败!", "");
    return;
  }
  const {
      nickname: _0x2cf7d0,
      avatar: _0x766d1f
    } = _0x56ddd1?.["data"],
    _0x471755 = {
      userId: _0x2cf7d0,
      avatar: _0x766d1f,
      token: _0xfab98b,
      userName: _0x2cf7d0
    };
  userCookie = userCookie ? JSON.parse(userCookie) : [];
  const _0x179a54 = userCookie.findIndex(_0x720b6c => _0x720b6c.userId == _0x471755.userId);
  userCookie[_0x179a54] ? userCookie[_0x179a54] = _0x471755 : userCookie.push(_0x471755);
  $.setjson(userCookie, ckName);
  $.msg($.name, "🎉" + _0x471755.userName + "更新token成功!", "");
}
async function loadModule() {
  try {
    $.Cheerio = await loadCheerio();
    return $.Cheerio ? true : false;
  } catch (_0x27d550) {
    throw new Error("⛔️ loadModule run error => " + _0x27d550);
  }
}
async function checkEnv() {
  try {
    const _0x26b718 = envSplitor.find(_0xd0b47 => userCookie.includes(_0xd0b47)) || envSplitor[0];
    userCookie = $.toObj(userCookie) || userCookie.split(_0x26b718);
    userList.push(...userCookie.map(_0x9d6b4e => new UserInfo(_0x9d6b4e)).filter(Boolean));
    userCount = userList.length;
    console.log("共找到" + userCount + "个账号");
    return true;
  } catch (_0x10560b) {
    throw new Error("⛔️ checkEnv run error => " + _0x10560b);
  }
}
async function Request(_0x2b27fc) {
  if (typeof _0x2b27fc === "string") {
    _0x2b27fc = {
      url: _0x2b27fc
    };
  }
  try {
    if (!_0x2b27fc?.["url"]) {
      throw new Error("[发送请求] 缺少 url 参数");
    }
    let {
      url: _0x3b24b0,
      type: _0x30cc23,
      headers = {},
      body: _0x262529,
      params: _0x50ffd7,
      dataType = "form",
      resultType = "data"
    } = _0x2b27fc;
    const _0x44b822 = _0x30cc23 ? _0x30cc23?.["toLowerCase"]() : "body" in _0x2b27fc ? "post" : "get",
      _0x4519c1 = _0x3b24b0.concat(_0x44b822 === "post" ? "?" + $.queryStr(_0x50ffd7) : ""),
      _0x1ae11d = _0x2b27fc.timeout ? $.isSurge() ? _0x2b27fc.timeout / 1000 : _0x2b27fc.timeout : 10000;
    if (dataType === "json") {
      headers["Content-Type"] = "application/json;charset=UTF-8";
    }
    const _0x1c3467 = _0x262529 && dataType == "form" ? $.queryStr(_0x262529) : $.toStr(_0x262529),
      _0x32dc9f = {
        ..._0x2b27fc,
        ...(_0x2b27fc?.["opts"] ? _0x2b27fc.opts : {}),
        url: _0x4519c1,
        headers: headers,
        ...(_0x44b822 === "post" && {
          body: _0x1c3467
        }),
        ...(_0x44b822 === "get" && _0x50ffd7 && {
          params: _0x50ffd7
        }),
        timeout: _0x1ae11d
      },
      _0x1a7a4a = $.http[_0x44b822.toLowerCase()](_0x32dc9f).then(_0x3b7b97 => resultType == "data" ? $.toObj(_0x3b7b97.body) || _0x3b7b97.body : $.toObj(_0x3b7b97) || _0x3b7b97).catch(_0x1baccb => $.log("⛔️ 请求发起失败！原因为: " + _0x1baccb));
    return Promise.race([new Promise((_0x49b7ee, _0x548db5) => setTimeout(() => _0x548db5("当前请求已超时"), _0x1ae11d)), _0x1a7a4a]);
  } catch (_0x381d57) {
    console.log("⛔️ 请求发起失败！原因为: " + _0x381d57);
  }
}
function randomInt(_0x1d8d5b, _0x22188c) {
  return Math.round(Math.random() * (_0x22188c - _0x1d8d5b) + _0x1d8d5b);
}
function DoubleLog(_0x9db827) {
  if (_0x9db827 && $.isNode()) {
    console.log("" + _0x9db827);
    $.notifyMsg.push("" + _0x9db827);
  } else {
    _0x9db827 && (console.log("" + _0x9db827), $.notifyMsg.push("" + _0x9db827));
  }
}
function debug(_0x156986, _0x499fbd = "debug") {
  $.is_debug === "true" && ($.log("\n-----------" + _0x499fbd + "------------\n"), $.log(typeof _0x156986 == "string" ? _0x156986 : $.toStr(_0x156986) || "debug error => t=" + _0x156986), $.log("\n-----------" + _0x499fbd + "------------\n"));
}
async function SendMsgList(_0x1c952b) {
  await Promise.allSettled(_0x1c952b?.["map"](_0x3149ff => SendMsg(_0x3149ff.message.join("\n"), _0x3149ff.avatar)));
}
async function SendMsg(_0x23e0d4, _0x189043) {
  _0x23e0d4 && (0 < Notify ? $.isNode() ? await notify.sendNotify($.name, _0x23e0d4) : $.msg($.name, $.title || "", _0x23e0d4, {
    "media-url": _0x189043
  }) : console.log(_0x23e0d4));
}
function ObjectKeys2LowerCase(_0x3bb5b0) {
  _0x3bb5b0 = Object.fromEntries(Object.entries(_0x3bb5b0).map(([_0x13b737, _0x5ca16d]) => [_0x13b737.toLowerCase(), _0x5ca16d]));
  return new Proxy(_0x3bb5b0, {
    get: function (_0x5c9484, _0x48fcf8, _0x57b493) {
      return Reflect.get(_0x5c9484, _0x48fcf8.toLowerCase(), _0x57b493);
    },
    set: function (_0x51a69b, _0x230e12, _0x6e4558, _0x5eb5f4) {
      return Reflect.set(_0x51a69b, _0x230e12.toLowerCase(), _0x6e4558, _0x5eb5f4);
    }
  });
}
async function loadCheerio() {
  let _0x1b24c4 = ($.isNode() ? process.env.Cheerio_code : $.getdata("Cheerio_code")) || "";
  if (_0x1b24c4 && Object.keys(_0x1b24c4).length) {
    console.log("✅" + $.name + ":缓存中存在Cheerio模块,跳过下载");
    eval(_0x1b24c4);
    return createCheerio();
  }
  console.log("🚀" + $.name + ":开始下载Cheerio模块");
  return new Promise(async _0xe53978 => {
    $.getScript("https://mirror.ghproxy.com/https://raw.githubusercontent.com/Yuheng0101/X/main/Utils/cheerio.js").then(_0x1eb03b => {
      $.setdata(_0x1eb03b, "Cheerio_code");
      eval(_0x1eb03b);
      const _0x3ed81b = createCheerio();
      console.log("✅Cheerio模块加载成功,请继续");
      _0xe53978(_0x3ed81b);
    });
  });
}
!(async () => {
  if (typeof $request != "undefined") {
    await getCookie();
  } else {
    if (!(await loadModule())) {
      throw new Error("⛔️ 加载模块失败，请检查模块路径是否正常");
    }
    if (!(await checkEnv())) {
      throw new Error("⛔️ 未检测到ck，请添加环境变量");
    }
    if (userList.length > 0) {
      await main();
    }
  }
})().catch(_0x5644f7 => $.notifyMsg.push(_0x5644f7.message || _0x5644f7)).finally(async () => {
  await SendMsgList($.notifyList);
  $.done({
    ok: 1
  });
});