//Tue Feb 11 2025 05:14:32 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("阿里云社区"),
  notify = $.isNode() ? require("./sendNotify") : "",
  ckName = "aliyunWeb_data";
let userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || [];
const controlTime = ($.isNode() ? process.env.aliyunWeb_time : $.getdata("aliyunWeb_time")) || "12",
  controlScene = ($.isNode() ? process.env.aliyunWeb_scene : $.getdata("aliyunWeb_scene")) || "true",
  controlStock = ($.isNode() ? process.env.aliyunWeb_stock : $.getdata("aliyunWeb_stock")) || "true",
  controlVideo = ($.isNode() ? process.env.aliyunWeb_video : $.getdata("aliyunWeb_video")) || "true",
  taskGroup = [{
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
$.userIdx = 0;
$.userList = [];
$.notifyMsg = [];
$.succCount = 0;
$.is_debug = ($.isNode() ? process.env.IS_DEDUG : $.getdata("is_debug")) || "false";
async function main() {
  await proccessMain($.userList);
  $.title = "共" + $.userList.length + "个账号,成功" + $.succCount + "个,失败" + ($.userList.length - 0 - $.succCount) + "个";
  await sendMsg($.notifyMsg.join("\n"), {
    $media: $.avatar
  });
}
async function proccessMain(_0x465755) {
  const _0x16bd4c = 10;
  let _0xdcc8fc = 0;
  async function _0x428fa5() {
    const _0x4a8bc3 = _0x465755.slice(_0xdcc8fc, _0xdcc8fc + _0x16bd4c);
    _0xdcc8fc += _0x16bd4c;
    await Promise.allSettled(_0x4a8bc3.map(_0x2e54ba => _0x1fe25d(_0x2e54ba)));
    _0xdcc8fc < _0x465755.length && (await _0x428fa5());
  }
  await _0x428fa5();
  async function _0x1fe25d(_0x59437a) {
    try {
      const _0x4e478b = Date.now();
      this.userScore = (await _0x59437a.interactData()) ?? {};
      if (_0x59437a.ckStatus) {
        if (_0x4e478b < new Date(new Date().setHours(Math.floor(controlTime), 0, 0, 0)).getTime()) {
          for (let _0x35c6ac of taskGroup) {
            const _0x57451a = await _0x59437a.getUserSpaceSignInDetail(_0x35c6ac.code),
              _0x167780 = await _0x59437a.getTasks(_0x57451a);
            await _0x59437a.signin(_0x167780, _0x35c6ac.name);
            await $.wait(_0x59437a.getRandomTime());
            const _0x3add29 = await _0x59437a.assessSignInBonusQualification(_0x57451a, _0x35c6ac.name);
            await $.wait(_0x59437a.getRandomTime());
            _0x3add29 && (await _0x59437a.receiveSignInBonus(_0x57451a, _0x35c6ac.name), await $.wait(_0x59437a.getRandomTime()));
          }
          const _0x4ed41f = await _0x59437a.getEbooks();
          await $.wait(_0x59437a.getRandomTime());
          const _0x3597e4 = await _0x59437a.getCsrfToken(_0x4ed41f, "ebook");
          await $.wait(_0x59437a.getRandomTime());
          await _0x59437a.addBookComment(_0x4ed41f, _0x3597e4);
          await $.wait(_0x59437a.getRandomTime());
          for (let _0x4fb9c9 = 0; _0x4fb9c9 < 5; _0x4fb9c9++) {
            const _0x5b0b32 = await _0x59437a.getArticles();
            await $.wait(_0x59437a.getRandomTime());
            await _0x59437a.likeOrNotLike(_0x5b0b32, "aliyun-public-like", 0);
            await $.wait(_0x59437a.getRandomTime());
            await _0x59437a.likeOrNotLike(_0x5b0b32, "aliyun-public-favorite", 0);
            await $.wait(_0x59437a.getRandomTime());
            _0x4fb9c9 === 0 && (await _0x59437a.addComment(_0x5b0b32), await $.wait(_0x59437a.getRandomTime()), await _0x59437a.likeOrNotLike(_0x5b0b32, "aliyun-public-share", 0), await $.wait(_0x59437a.getRandomTime()));
            const _0x427f73 = await _0x59437a.getAsks();
            await $.wait(_0x59437a.getRandomTime());
            if (_0x427f73 && _0x427f73?.["id"]) {
              const _0x1b7ded = await _0x59437a.getCsrfToken(_0x427f73.id, "ask");
              await $.wait(_0x59437a.getRandomTime());
              const _0x1bb099 = await _0x59437a.getAskDetail(_0x427f73);
              await $.wait(_0x59437a.getRandomTime());
              _0x1bb099 && (await _0x59437a.voteAnswer(_0x427f73.id, _0x1bb099, _0x1b7ded, 1), await $.wait(_0x59437a.getRandomTime()));
            }
          }
          JSON.parse(controlScene) && (await _0x59437a.doScene(), await $.wait(_0x59437a.getRandomTime()));
          JSON.parse(controlVideo) && (await _0x59437a.playVideo(), await $.wait(_0x59437a.getRandomTime()));
          JSON.parse(controlStock) && (await _0x59437a.getGroupItems());
          this.pendingScore = await _0x59437a.getUserTotalPendingScore();
          $.title = "获得待领取积分: " + this.pendingScore;
          DoubleLog("🎉 当前积分: " + this.userScore + ", 待领取积分: " + this.pendingScore);
        } else {
          for (let _0x37a5ab of taskGroup) {
            const _0x3ba052 = await _0x59437a.getUserSpaceSignInDetail(_0x37a5ab.code),
              _0x44744c = await _0x59437a.assessSignInBonusQualification(_0x3ba052, _0x37a5ab.name);
            await $.wait(_0x59437a.getRandomTime());
            _0x44744c && (await _0x59437a.receiveSignInBonus(_0x3ba052, _0x37a5ab.name), await $.wait(_0x59437a.getRandomTime()));
          }
          this.pendingScore = await _0x59437a.getUserTotalPendingScore();
          await $.wait(_0x59437a.getRandomTime());
          await _0x59437a.collect();
          await $.wait(_0x59437a.getRandomTime());
          await $.wait(_0x59437a.getRandomTime());
          const _0x4b11af = (await _0x59437a.getFavors()) ?? [];
          await $.wait(_0x59437a.getRandomTime());
          if (_0x4b11af.length) {
            for (let _0x55c29c of _0x4b11af) {
              await _0x59437a.likeOrNotLike(_0x55c29c.objectId, "aliyun-public-like", 1);
              await $.wait(_0x59437a.getRandomTime());
              await _0x59437a.likeOrNotLike(_0x55c29c.objectId, "aliyun-public-favorite", 1);
              await $.wait(_0x59437a.getRandomTime());
            }
          }
          JSON.parse(controlStock) && (await _0x59437a.getGroupItems());
          let _0x5abc4e = (await _0x59437a.interactData()) ?? {};
          $.title = "本次运行共获得" + (this.pendingScore || 0) + "积分";
          DoubleLog("🎉 领取积分: " + this.pendingScore + ", 当前积分: " + _0x5abc4e);
        }
        $.succCount++;
      } else {
        DoubleLog("⛔️ 「" + (_0x59437a.userName ?? "账号" + _0xdcc8fc) + "」签到失败, 用户需要去登录");
      }
    } catch (_0x13f21d) {
      throw _0x13f21d;
    }
  }
}
class UserInfo {
  constructor(_0x34292b) {
    this.index = ++$.userIdx;
    this.token = "" || _0x34292b.token || _0x34292b;
    this.userId = "" || _0x34292b.userId;
    this.userName = _0x34292b.userName || "";
    this.avatar = _0x34292b.avatar;
    this.ckStatus = true;
    this.pendingScore = 0;
    this.userScore = 0;
    this.sceneId = "";
    this.resourceFrom = "";
    this.sectionId = "";
    this.ip = "";
    this.host = "https://developer.aliyun.com/developer/api";
    this.headers = {
      Cookie: this.token,
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Referer: "https://developer.aliyun.com/"
    };
    this.getRandomTime = () => randomInt(1, 2);
    this.fetch = async _0x454b16 => {
      try {
        if (typeof _0x454b16 === "string") {
          _0x454b16 = {
            url: _0x454b16
          };
        }
        if (_0x454b16?.["url"]?.["startsWith"]("/")) {
          _0x454b16.url = this.host + _0x454b16.url;
        }
        const _0x2a3ee6 = await Request({
          ..._0x454b16,
          headers: _0x454b16.headers || this.headers,
          url: _0x454b16.url || this.baseUrl
        });
        debug(_0x2a3ee6, _0x454b16?.["url"]?.["replace"](/\/+$/, "")["substring"](_0x454b16?.["url"]?.["lastIndexOf"]("/") + 1));
        if (_0x2a3ee6?.["code"] == 40001) {
          throw new Error(_0x2a3ee6?.["message"] || "用户需要去登录");
        }
        return _0x2a3ee6;
      } catch (_0x3603b8) {
        this.ckStatus = false;
        $.log("⛔️ 请求发起失败！" + _0x3603b8);
      }
    };
  }
  async getUser() {
    try {
      const _0x30cfa6 = {
        url: "/my/user/getUser",
        type: "get"
      };
      await this.fetch(_0x30cfa6);
    } catch (_0x3de38b) {
      this.ckStatus = false;
      $.log("⛔️ 获取签到任务列表失败! " + _0x3de38b);
    }
  }
  async assessSignInBonusQualification(_0x57739a, _0x3289c8) {
    if (!_0x57739a) {
      return null;
    }
    try {
      const _0xc8c3d6 = {
        url: "/sign/assessSignInBonusQualification",
        type: "get",
        params: {
          taskGroupId: _0x57739a
        }
      };
      let _0x12b8a2 = await this.fetch(_0xc8c3d6);
      return _0x12b8a2?.["data"];
    } catch (_0x2b810f) {
      this.ckStatus = false;
      $.log("⛔️ 查询领奖条件失败! " + _0x2b810f);
    }
  }
  async receiveSignInBonus(_0x51e1e2, _0x44e0ca) {
    try {
      const _0x2298a5 = {
        url: "/sign/receiveSignInBonus",
        type: "post",
        dataType: "form",
        body: {
          taskGroupId: _0x51e1e2
        }
      };
      let _0x1e91a6 = await this.fetch(_0x2298a5);
      if (_0x1e91a6?.["code"] == "200") {
        const _0x4b57b1 = _0x1e91a6?.["data"] || 0;
        $.log("✅ 抽奖 - " + (_0x44e0ca || "default") + ": 获得 " + _0x4b57b1 + " 积分");
      } else {
        $.log("⛔️ 抽奖 - " + (_0x44e0ca || "default") + ": " + _0x1e91a6?.["message"]);
      }
    } catch (_0x485ef1) {
      this.ckStatus = false;
      $.log("⛔️ 抽奖失败! " + _0x485ef1);
    }
  }
  async getUserSpaceSignInDetail(_0x4aa042) {
    try {
      const _0x3f87ae = {
        url: "/sign/getUserSpaceSignInDetail",
        type: "get",
        params: {
          excode: _0x4aa042
        }
      };
      let _0x4f1f1f = await this.fetch(_0x3f87ae);
      const _0xd98e3f = _0x4f1f1f?.["data"]?.["taskGroupId"] || null;
      return _0xd98e3f;
    } catch (_0x23dca9) {
      this.ckStatus = false;
      $.log("⛔️ 获取签到任务列表失败! " + _0x23dca9);
    }
  }
  async getTasks(_0x388291) {
    if (!_0x388291) {
      return null;
    }
    try {
      const _0x55df5c = {
        url: "/task/getTaskGroup?groupId=" + _0x388291,
        type: "get"
      };
      let _0x502750 = await this.fetch(_0x55df5c);
      const _0x3d0b2a = _0x502750?.["data"]?.["taskList"];
      let _0x3b8e2c = {};
      if (_0x3d0b2a.length) {
        const _0x95ad55 = new Date().getTime();
        for (let _0xd9d09f of _0x3d0b2a) {
          if (_0x95ad55 >= _0xd9d09f.gmtEnableStart && _0x95ad55 <= _0xd9d09f.gmtEnableEnd) {
            const _0x157cb6 = JSON.parse(_0xd9d09f.finishRule.replace(/&quot;/g, "\""));
            _0x3b8e2c.actionCode = _0x157cb6.actions[0].actionCode;
            _0x3b8e2c.activityCode = _0x157cb6.actions[0].actionCode;
            _0x3b8e2c.objectId = _0x157cb6.actions[0].objectId;
          }
        }
      }
      return _0x3b8e2c;
    } catch (_0x371dcc) {
      this.ckStatus = false;
      $.log("⛔️ 获取签到任务列表失败! " + _0x371dcc);
    }
  }
  async signin(_0x361610, _0x368b5c) {
    if (!_0x361610) {
      $.log("✅ 签到 - " + (_0x368b5c || "default") + ": 该社区无签到任务");
      return;
    }
    try {
      const _0x563e15 = {
        url: "/task/actionLog",
        type: "post",
        dataType: "form",
        body: _0x361610
      };
      let _0x20762e = await this.fetch(_0x563e15);
      $.log("✅ 签到 - " + (_0x368b5c || "default") + ": " + _0x20762e?.["message"]);
    } catch (_0xbf60c9) {
      this.ckStatus = false;
      $.log("⛔️ 签到失败! " + _0xbf60c9);
    }
  }
  async getArticles() {
    try {
      const _0x1fd136 = Math.floor(Math.random() * 31) + 1,
        _0x1e8694 = {
          url: "https://developer.aliyun.com/group/aliware/article_hot?pageNum=" + _0x1fd136,
          type: "get"
        };
      let _0x27d3e9 = await this.fetch(_0x1e8694);
      const _0x5e2433 = $.Cheerio.load(_0x27d3e9),
        _0x5eab1e = _0x5e2433(".community-detail-content"),
        _0x3cdab8 = _0x5eab1e.find(".community-list").map((_0x55c320, _0x83ea73) => {
          return {
            id: _0x5e2433(_0x83ea73).find(".feed-item").attr("data-id"),
            name: _0x5e2433(_0x83ea73).find(".feed-item-content-title h3").text()
          };
        }).get(),
        _0x502228 = _0x3cdab8[Math.floor(Math.random() * _0x3cdab8.length)],
        {
          id: _0x52f68e,
          name: _0x183ea6
        } = _0x502228;
      $.log("✅ 随机获取文章id: " + _0x52f68e + ", 标题: " + _0x183ea6);
      return _0x52f68e;
    } catch (_0x257822) {
      this.ckStatus = false;
      $.log("⛔️ 获取文章列表失败! " + _0x257822);
    }
  }
  async getEbooks() {
    try {
      const _0x9de6ca = Math.floor(Math.random() * 501) + 1,
        _0xaa66e4 = {
          url: "https://developer.aliyun.com/ebook/index/__0_0_0_" + _0x9de6ca,
          type: "get"
        };
      let _0x539984 = await this.fetch(_0xaa66e4);
      const _0x691836 = $.Cheerio.load(_0x539984),
        _0xf66626 = _0x691836(".ebook-home-list"),
        _0x358a2d = _0xf66626.find(".ebook-home-item").map((_0x1c36ca, _0x24b4a6) => {
          return {
            id: _0x691836(_0x24b4a6).attr("href").replace("/ebook/", ""),
            name: _0x691836(_0x24b4a6).find(".ebook-home-title").text()
          };
        }).get(),
        _0x16608f = _0x358a2d[Math.floor(Math.random() * _0x358a2d.length)],
        {
          id: _0x531095,
          name: _0x22f497
        } = _0x16608f;
      $.log("✅ 随机电子书id: " + _0x531095 + ", 标题: " + _0x22f497);
      return _0x531095;
    } catch (_0x552281) {
      this.ckStatus = false;
      $.log("⛔️ 获取电子书列表失败! " + _0x552281);
    }
  }
  async getAsks() {
    try {
      const _0x1c6abf = Math.floor(Math.random() * 31) + 1,
        _0xcbdfa2 = {
          url: "https://developer.aliyun.com/ask?pageNum=" + _0x1c6abf,
          type: "get"
        };
      let _0x530241 = await this.fetch(_0xcbdfa2);
      const _0x401c61 = $.Cheerio.load(_0x530241),
        _0x300bff = _0x401c61(".askProduct-list"),
        _0x13abb0 = _0x300bff.find(".askProduct-item").map((_0x24aec7, _0x3ff0e7) => {
          return {
            id: _0x401c61(_0x3ff0e7).attr("data-id") || "",
            name: _0x401c61(_0x3ff0e7).find(".askProduct-item-title-text h3").text() || "",
            answer: parseInt(_0x401c61(_0x3ff0e7).find(".askProduct-item-info-answer").text()) || ""
          };
        }).filter((_0x1b4dd3, _0x786f88) => _0x786f88.answer > 0).get(),
        _0x3f8f19 = _0x13abb0[Math.floor(Math.random() * _0x13abb0.length)];
      if (_0x3f8f19?.["id"] && _0x3f8f19?.["name"]) {
        const {
          id: _0x237fc1,
          name: _0x18e1df
        } = _0x3f8f19;
        $.log("✅ 随机获取问答id: " + _0x237fc1 + ", 标题: " + _0x18e1df);
        return _0x3f8f19;
      }
      return null;
    } catch (_0x57a0b7) {
      this.ckStatus = false;
      $.log("⛔️ 获取问答列表失败! " + _0x57a0b7);
    }
  }
  async getAskDetail(_0x23695a) {
    try {
      const _0xfa3695 = {
        url: "https://developer.aliyun.com/ask/" + _0x23695a.id,
        type: "get"
      };
      let _0x358699 = await this.fetch(_0xfa3695);
      const _0x3af0bf = $.Cheerio.load(_0x358699),
        _0x42279c = _0x3af0bf(".answer-list"),
        _0x2760a8 = _0x42279c.find(".answer-item").map((_0x58f6f2, _0x3ee105) => {
          return {
            id: _0x3af0bf(_0x3ee105).attr("data-id") || ""
          };
        }).get(),
        _0x492656 = _0x2760a8[Math.floor(Math.random() * _0x23695a.answer)];
      if (_0x492656) {
        const {
          id: _0xaa3e44
        } = _0x492656;
        $.log("✅ 随机获取问题问答id: " + _0xaa3e44);
        return _0xaa3e44;
      }
      return null;
    } catch (_0x55e6a4) {
      this.ckStatus = false;
      $.log("⛔️ 随机获取问题问答失败! " + _0x55e6a4);
    }
  }
  async likeOrNotLike(_0x1079a5, _0x328a11, _0x5eedfa) {
    try {
      const _0xf3d215 = {
        url: "https://ucc.aliyun.com/uccPagingComponent/likeOrNotLike",
        type: "get",
        params: {
          bizCategory: "yq-article",
          actionCode: _0x328a11,
          objectId: _0x1079a5,
          status: _0x5eedfa,
          uccCsrfToken: await this.getUccCsrfToken(),
          callback: getCallback()
        }
      };
      await this.fetch(_0xf3d215);
      let _0x50cf35 = "文章" + (_0x5eedfa === 1 ? "取消" : "");
      if (_0x328a11 === "aliyun-public-like") {
        _0x50cf35 += "点赞";
      } else {
        if (_0x328a11 === "aliyun-public-favorite") {
          _0x50cf35 += "收藏";
        } else {
          _0x328a11 === "aliyun-public-share" && (_0x50cf35 += "分享");
        }
      }
      $.log("✅ " + _0x50cf35 + "成功: " + _0x1079a5);
    } catch (_0x4308e3) {
      this.ckStatus = false;
      $.log("⛔️ " + taskType + "失败! " + _0x4308e3);
    }
  }
  async getCsrfToken(_0x14b275, _0x1df5a9) {
    try {
      const _0x52e8e3 = {
          url: "https://developer.aliyun.com/csrfToken",
          type: "get",
          headers: {
            Cookie: this.token,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(Aliyun/6.7.1) WindVane/8.7.2 1170x2532 WK",
            Referer: "https://developer.aliyun.com/" + _0x1df5a9 + "/" + _0x14b275
          }
        },
        _0x3bd607 = await this.fetch(_0x52e8e3);
      return _0x3bd607?.["token"];
    } catch (_0xff950d) {
      this.ckStatus = false;
      $.log("⛔️ 获取 csrf 失败! " + _0xff950d);
    }
  }
  async voteAnswer(_0x3fbe93, _0x42dac3, _0x537689, _0x265440) {
    try {
      const _0x10d8f7 = {
        url: "https://developer.aliyun.com/developer/api/my/ask/voteAnswer",
        type: "post",
        dataType: "form",
        headers: {
          Cookie: this.token,
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(Aliyun/6.7.1) WindVane/8.7.2 1170x2532 WK",
          Referer: "https://developer.aliyun.com/ask/" + _0x3fbe93
        },
        params: {
          p_csrf: _0x537689
        },
        body: {
          id: _0x42dac3,
          votes: _0x265440
        }
      };
      await this.fetch(_0x10d8f7);
      $.log("✅ 回答点赞: " + _0x3fbe93 + "-" + _0x42dac3);
    } catch (_0x7c5168) {
      this.ckStatus = false;
      $.log("⛔️ 回答点赞失败! " + _0x7c5168);
    }
  }
  async addBookComment(_0xaf91a2, _0x446dd7) {
    try {
      const _0x56afc = {
          url: "https://developer.aliyun.com/developer/api/ebook/mark/add",
          type: "post",
          dataType: "json",
          headers: {
            Cookie: this.token,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(Aliyun/6.7.1) WindVane/8.7.2 1170x2532 WK",
            Referer: "https://developer.aliyun.com/ebook/" + _0xaf91a2
          },
          params: {
            p_csrf: _0x446dd7
          },
          body: {
            eBookId: _0xaf91a2,
            score: 10,
            content: "很棒的一本书"
          }
        },
        _0xabd061 = await this.fetch(_0x56afc);
      _0xabd061?.["code"] == "200" ? $.log("✅ 评价电子书: " + _0xaf91a2) : $.log("⛔️ 评价电子书失败! " + _0xabd061?.["message"]);
    } catch (_0x29718e) {
      this.ckStatus = false;
      $.log("⛔️ 评价电子书失败! " + _0x29718e);
    }
  }
  async getFavors() {
    try {
      const _0x27ff04 = {
          url: "https://developer.aliyun.com/developer/api/my/subscribe/listUserFavor",
          type: "get",
          params: {
            pageNum: 1,
            pageSize: 10,
            type: 1
          }
        },
        _0x44277f = await this.fetch(_0x27ff04),
        {
          list: _0xa82dd5
        } = _0x44277f?.["data"];
      if (_0xa82dd5.length) {
        $.log("✅ 开始取消文章的点赞与收藏记录");
        return _0xa82dd5;
      }
      return [];
    } catch (_0x2ac5df) {
      this.ckStatus = false;
      $.log("⛔️ " + (type === "aliyun-public-like" ? "文章点赞" : "文章收藏") + "失败! " + _0x2ac5df);
    }
  }
  async addComment(_0x5a69fa) {
    try {
      const _0x1c933b = {
        url: "https://ucc.aliyun.com/uccPagingComponent/addComment",
        type: "get",
        params: {
          content: encodeURIComponent("很有用的文章，非常受用，感谢博主"),
          objectId: _0x5a69fa,
          bizCategory: "yq-comment-type-article",
          commentType: 0,
          sourceAppCode: "developer-ecology",
          sourceBizCategory: "developer-ecology-group",
          uccCsrfToken: await this.getUccCsrfToken(),
          callback: getCallback()
        }
      };
      await this.fetch(_0x1c933b);
      $.log("✅ 文章评论: " + _0x5a69fa);
    } catch (_0x5cc9d4) {
      this.ckStatus = false;
      $.log("⛔️ 文章点赞失败! " + _0x5cc9d4);
    }
  }
  async doScene() {
    const _0x3dd29a = this.token.match(new RegExp("c_csrf=([^;]*)"))[1];
    await this.getSceneList();
    await $.wait(this.getRandomTime());
    const _0x352737 = await this.getSceneDetailPageInfoById();
    await $.wait(this.getRandomTime());
    _0x352737 ? (await this.getSceneStartPageInfoById(), await $.wait(this.getRandomTime()), this.resourceFrom === "2" ? (await this.startSceneById(_0x3dd29a), await $.wait(this.getRandomTime()), await this.closeSceneById(_0x3dd29a), await $.wait(this.getRandomTime())) : await this.doScene()) : await this.doScene();
  }
  async getSceneList() {
    try {
      const _0x41c20d = Math.floor(Math.random() * 26) + 1,
        _0x2948af = 21,
        _0x33a49d = {
          url: "https://developer.aliyun.com/adc/api/getSceneList",
          type: "get",
          params: {
            tags: encodeURIComponent(","),
            difficulty: "",
            orderBy: "useCountTotal",
            pageNum: _0x41c20d,
            pageSize: _0x2948af
          },
          headers: {
            Cookie: this.headers.Cookie,
            Referer: "https://developer.aliyun.com/adc/labs/",
            "User-Agent": this.headers["User-Agent"]
          }
        },
        _0xc4a23 = await this.fetch(_0x33a49d),
        _0x2e9bbb = _0xc4a23?.["data"]?.["list"];
      if (_0x2e9bbb.length) {
        const _0x208b85 = _0x2e9bbb[Math.floor(Math.random() * _0x2e9bbb.length)];
        this.sceneId = _0x208b85?.["id"];
        $.log("✅ 获取场景: " + _0x208b85.name + "[" + this.sceneId + "]");
      } else {
        $.log("⛔️ 获取场景失败! " + e);
      }
    } catch (_0x4fcbc5) {
      this.ckStatus = false;
      $.log("⛔️ 获取场景失败! " + _0x4fcbc5);
    }
  }
  async getSceneDetailPageInfoById() {
    try {
      const _0x3da505 = {
          url: "https://developer.aliyun.com/adc/api/getSceneDetailPageInfoById",
          type: "get",
          params: {
            id: this.sceneId
          },
          headers: {
            cookie: this.headers.Cookie,
            referer: "https://developer.aliyun.com/adc/scenario/" + this.sceneId,
            "user-agent": this.headers["User-Agent"]
          }
        },
        _0x28ef4a = await this.fetch(_0x3da505),
        _0x497496 = _0x28ef4a?.["data"]?.["developerAdcExperienceStatusVO"]?.["buttonCode"];
      return _0x497496 ? _0x497496 === "1" ? ($.log("✅ 确认场景状态: " + _0x28ef4a?.["data"]?.["id"]), _0x28ef4a?.["data"]?.["id"]) : ($.log("⛔️ 确认场景状态: " + _0x28ef4a?.["data"]?.["id"] + " 已完成，将重新获取场景"), null) : ($.log("⛔️ 确认场景状态: " + _0x28ef4a?.["data"]?.["id"] + " 状态异常，将重新获取场景"), null);
    } catch (_0x7edf72) {
      this.ckStatus = false;
      $.log("⛔️ 确认场景状态失败! " + _0x7edf72);
    }
  }
  async getSceneStartPageInfoById() {
    try {
      const _0x2a5b50 = {
          url: "https://developer.aliyun.com/adc/api/getSceneStartPageInfoById",
          type: "get",
          params: {
            id: this.sceneId
          },
          headers: {
            cookie: this.headers.Cookie,
            referer: "https://developer.aliyun.com/adc/scenario/exp/" + this.sceneId,
            "user-agent": this.headers["User-Agent"]
          }
        },
        _0x994f69 = await this.fetch(_0x2a5b50);
      this.ip = _0x994f69?.["data"]?.["ip"];
      _0x994f69?.["data"]?.["resourceFrom"]["indexOf"]("1") > -1 ? this.resourceFrom = "1" : this.resourceFrom = "2";
      _0x994f69?.["data"]?.["resourceCardInfoDTOList"]["length"] && (this.sectionId = _0x994f69?.["data"]?.["resourceCardInfoDTOList"][0]?.["id"]);
      $.log("✅ 获取场景初始化信息: " + this.sceneId);
    } catch (_0x1f2d2e) {
      this.ckStatus = false;
      $.log("⛔️ 获取场景初始化信息失败! " + _0x1f2d2e);
    }
  }
  async startSceneById(_0x3458cc) {
    try {
      const _0x3b99fa = {
          url: "https://developer.aliyun.com/adc/api/startSceneById",
          type: "post",
          dataType: "form",
          headers: {
            Host: "developer.aliyun.com",
            H_csrf: _0x3458cc,
            "X-XSRF-TOKEN": _0x3458cc,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + this.sceneId
          },
          params: {
            p_csrf: _0x3458cc
          },
          body: {
            id: this.sceneId,
            resourceFrom: this.resourceFrom
          }
        },
        _0x3d8839 = await this.fetch(_0x3b99fa),
        {
          code: _0xc40c1b,
          message: _0x4409f8
        } = _0x3d8839;
      console.log((_0xc40c1b === "200" ? "✅" : "⛔️") + " 开始场景: " + this.sceneId + ", " + _0x4409f8);
    } catch (_0x153c26) {
      this.ckStatus = false;
      $.log("⛔️ 开始场景失败! " + _0x153c26);
    }
  }
  async closeSceneById(_0x15581c) {
    try {
      const _0x1af2e0 = {
          url: "https://developer.aliyun.com/adc/api/closeSceneById",
          type: "post",
          dataType: "form",
          body: {
            sceneId: this.sceneId,
            forceClose: "true"
          },
          params: {
            p_csrf: _0x15581c
          },
          headers: {
            Host: "developer.aliyun.com",
            H_csrf: _0x15581c,
            "X-XSRF-TOKEN": _0x15581c,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + this.sceneId
          }
        },
        _0x51d26a = await this.fetch(_0x1af2e0),
        {
          code: _0x25c55b,
          message: _0x56dd3d
        } = _0x51d26a;
      console.log((_0x25c55b === "200" ? "✅" : "⛔️") + " 结束场景: " + this.sceneId + ", " + _0x56dd3d);
    } catch (_0x1d4966) {
      this.ckStatus = false;
      $.log("⛔️ 结束场景失败! " + _0x1d4966);
    }
  }
  async createResourceById(_0x834011) {
    try {
      const _0x41a80d = {
          url: "https://developer.aliyun.com/adc/api/createResourceById",
          type: "post",
          dataType: "form",
          body: {
            id: this.sceneId,
            sectionId: this.sectionId,
            ip: this.ip
          },
          params: {
            p_csrf: _0x834011
          },
          headers: {
            Host: "developer.aliyun.com",
            H_csrf: _0x834011,
            "X-XSRF-TOKEN": _0x834011,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + this.sceneId
          }
        },
        _0x27cbab = await this.fetch(_0x41a80d);
      _0x27cbab?.["data"] && console.log("✅ 开始创建场景资源: " + this.sceneId);
    } catch (_0x412567) {
      this.ckStatus = false;
      $.log("⛔️ 创建场景资源失败! " + _0x412567);
    }
  }
  async getResourceCardInfoById() {
    try {
      const _0x4997a1 = {
          url: "https://developer.aliyun.com/adc/api/getResourceCardInfoById",
          type: "get",
          params: {
            sceneId: this.sceneId,
            sectionId: this.sectionId
          },
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + this.sceneId
          }
        },
        _0x495744 = await this.fetch(_0x4997a1),
        {
          code: _0x311cab,
          data: _0x1a5082
        } = _0x495744;
      if (_0x311cab === "200" && _0x1a5082) {
        if (_0x1a5082?.["status"] !== "RUNNING") {
          await $.wait(this.getRandomTime());
          await this.getResourceCardInfoById();
        } else {
          console.log("✅ 创建场景资源完毕: " + this.sceneId);
          return true;
        }
      }
    } catch (_0x2b5bb8) {
      this.ckStatus = false;
      $.log("⛔️ 创建场景资源失败! " + _0x2b5bb8);
    }
  }
  async getVideoDetail(_0x4d4d9c) {
    try {
      const _0x182acd = Date.now(),
        _0x3c4b70 = getCallback(_0x182acd),
        _0xcad9e0 = {
          url: "https://ucc.aliyun.com/api/ucc/live/open/detail",
          type: "get",
          params: {
            _: _0x182acd,
            callback: _0x3c4b70,
            version: "1.1.23",
            id: _0x4d4d9c
          },
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/live/" + _0x4d4d9c
          }
        },
        _0x4fc481 = await this.fetch(_0xcad9e0),
        _0x1b9559 = getJson(_0x4fc481),
        _0x2d27a2 = _0x1b9559?.["data"]?.["live"]?.["name"],
        _0x5999bb = _0x1b9559?.["data"]?.["live"]?.["duration"];
      console.log("✅ 获取视频信息成功: " + _0x2d27a2 + ", 时长: " + _0x5999bb + " 秒");
      return {
        videoName: _0x2d27a2,
        videoTime: _0x5999bb
      };
    } catch (_0x84caed) {
      this.ckStatus = false;
      $.log("⛔️ 获取视频信息失败! " + _0x84caed);
      return null;
    }
  }
  async getVideoView(_0x28cb91, _0x1fbdb6) {
    try {
      const _0x58383b = Date.now(),
        _0x212646 = getCallback(_0x58383b),
        _0x52ad1f = {
          url: "https://ucc.aliyun.com/api/ucc/live/open/view",
          type: "get",
          params: {
            _: _0x58383b,
            callback: _0x212646,
            version: "1.1.23",
            id: _0x28cb91,
            sessionId: _0x1fbdb6
          },
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/live/" + _0x28cb91
          }
        };
      await this.fetch(_0x52ad1f);
    } catch (_0x2ab9d3) {
      this.ckStatus = false;
      $.log("⛔️ 获取视频视图失败! " + _0x2ab9d3);
    }
  }
  async play(_0x5b0846, _0x59c88b, _0x586a5c) {
    try {
      const _0x41daf1 = Date.now(),
        _0x3ceb35 = getCallback(_0x41daf1),
        _0x2a6376 = {
          url: "https://ucc.aliyun.com/api/ucc/live/open/play",
          type: "get",
          params: {
            _: _0x41daf1,
            callback: _0x3ceb35,
            version: "1.1.23",
            id: _0x59c88b,
            sessionId: _0x586a5c
          },
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/live/" + _0x59c88b
          }
        };
      await this.fetch(_0x2a6376);
      console.log("✅ 开始播放视频: " + _0x5b0846);
    } catch (_0xe68df7) {
      this.ckStatus = false;
      $.log("⛔️ 播放视频失败! " + _0xe68df7);
    }
  }
  async danmu(_0x122aba, _0x394f20) {
    try {
      const _0x41f145 = Date.now(),
        _0x390528 = getCallback(_0x41f145),
        _0x568a06 = {
          url: "https://ucc.aliyun.com/api/ucc/live/open/danmu",
          type: "get",
          params: {
            _: _0x41f145,
            callback: _0x390528,
            version: "1.1.23",
            id: _0x122aba,
            seek: _0x394f20
          },
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/live/" + _0x122aba
          }
        },
        _0x200cba = await this.fetch(_0x568a06),
        _0x1dac19 = getJson(_0x200cba);
      console.log("✅ 获取第 " + _0x394f20 + " 秒弹幕: " + JSON.stringify(_0x1dac19?.["data"]));
    } catch (_0x21608a) {
      this.ckStatus = false;
      $.log("⛔️ 获取弹幕失败! " + _0x21608a);
    }
  }
  async online(_0x11a584, _0x489059) {
    try {
      const _0x46e34c = Date.now(),
        _0x119516 = getCallback(_0x46e34c),
        _0x46e6d1 = {
          url: "https://ucc.aliyun.com/api/ucc/live/open/online",
          type: "get",
          params: {
            _: _0x46e34c,
            callback: _0x119516,
            version: "1.1.23",
            id: _0x11a584,
            sessionId: _0x489059
          },
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/live/" + _0x11a584
          }
        };
      await this.fetch(_0x46e6d1);
      console.log("✅ 在线心跳确认成功");
    } catch (_0x35c97a) {
      this.ckStatus = false;
      $.log("⛔️ 在线心跳确认! " + _0x35c97a);
    }
  }
  async playVideo() {
    const _0x4d8dfa = "253842",
      _0x4dcf2c = getSessionId(this.token, _0x4d8dfa),
      {
        videoName: _0x5b35f6,
        videoTime: _0x2ea2a0
      } = await this.getVideoDetail(_0x4d8dfa);
    await $.wait(this.getRandomTime());
    await this.getVideoView(_0x4d8dfa, _0x4dcf2c);
    await $.wait(this.getRandomTime());
    await this.play(_0x5b35f6, _0x4d8dfa, _0x4dcf2c);
    await $.wait(this.getRandomTime());
    for (let _0x48defa = 3; _0x48defa < _0x2ea2a0; _0x48defa += 3) {
      await this.danmu(_0x4d8dfa, _0x48defa);
      await $.wait(3000);
      _0x48defa == 60 && (await this.online(_0x4d8dfa, _0x4dcf2c));
    }
    console.log("✅ 视频播放完毕: " + _0x5b35f6);
  }
  async getGroupItems() {
    try {
      const _0x2b6d43 = {
          url: "/lm/getGroupItems?pageNum=1&pageSize=50",
          type: "get"
        },
        _0x663d6b = await this.fetch(_0x2b6d43),
        {
          list: _0x541c1b
        } = _0x663d6b?.["data"];
      if (_0x541c1b.length) {
        $.log("✅ 开始查询库存:");
        for (let _0x44322e of _0x541c1b) {
          $.log("🎁 " + _0x44322e.itemTitle.replace(/【.*?】/g, "") + ": " + _0x44322e.points + " 分【" + _0x44322e.statusStr + "】");
        }
      }
    } catch (_0x5763b6) {
      $.log("⛔️ 查询待收获积分列表失败! " + _0x5763b6);
    }
  }
  async interactData() {
    try {
      const _0x5cb6da = {
        url: "/my/score/getUserScore?appCode=developer",
        type: "get"
      };
      let _0x13d234 = await this.fetch(_0x5cb6da);
      return _0x13d234?.["data"];
    } catch (_0x883fdf) {
      $.log("⛔️ 查询待收获积分列表失败! " + _0x883fdf);
    }
  }
  async getUserTotalPendingScore() {
    try {
      const _0x29b372 = {
        url: "/score/pending/getUserTotalPendingScore?appCode=developer",
        type: "get"
      };
      let _0x12dfd3 = await this.fetch(_0x29b372);
      $.log("✅ 待领取积分: " + _0x12dfd3?.["data"]);
      return _0x12dfd3?.["data"];
    } catch (_0x2bbc5e) {
      $.log("⛔️ 查询待领取积分失败! " + _0x2bbc5e);
    }
  }
  async collect() {
    try {
      const _0x4f66 = {
        url: "/score/pending/receiveAllPendingScore?appCode=developer",
        type: "get"
      };
      let _0x23baf3 = await this.fetch(_0x4f66);
      $.log("✅ 收取积分: " + _0x23baf3?.["data"]);
      return _0x23baf3?.["data"];
    } catch (_0x2c8e1c) {
      $.log("⛔️ 收取积分失败! " + _0x2c8e1c);
    }
  }
  async getUccCsrfToken() {
    try {
      const _0x24e997 = {
        url: "https://ucc.aliyun.com/uccPagingComponent/getUser",
        type: "get",
        params: {
          uccCsrfToken: "",
          callback: getCallback()
        }
      };
      let _0x2edf4c = await this.fetch(_0x24e997);
      const _0x37f0fc = _0x2edf4c.indexOf("{"),
        _0xd8588b = _0x2edf4c.lastIndexOf("}"),
        _0x141ec6 = _0x2edf4c.substring(_0x37f0fc, _0xd8588b + 1),
        _0x1346d4 = JSON.parse(_0x141ec6);
      return _0x1346d4.data.uccCsrfToken;
    } catch (_0x159ec7) {
      $.log("⛔️ 获取UccCsrfToken失败! " + _0x159ec7);
    }
  }
}
function getCallback(_0x2e427b) {
  _0x2e427b = _0x2e427b || Date.now();
  return "jsonp_" + _0x2e427b + "_" + Math.ceil(100000 * Math.random());
}
function getJson(_0x3c980a) {
  return JSON.parse(_0x3c980a.replace(/.*\(/, "").replace(/\)/, ""));
}
function getSessionId(_0x4bc8d7, _0x1bc20a) {
  function _0x1a8b69(_0x373769, _0x52bc5b) {
    var _0x517297 = (65535 & _0x373769) + (65535 & _0x52bc5b);
    return (_0x373769 >> 16) + (_0x52bc5b >> 16) + (_0x517297 >> 16) << 16 | 65535 & _0x517297;
  }
  function _0x594a9d(_0x4532dc, _0x56999a) {
    return _0x4532dc << _0x56999a | _0x4532dc >>> 32 - _0x56999a;
  }
  function _0x26e2d8(_0x30878b, _0x39f461, _0x255049, _0x277b53, _0x1cffed, _0x2a8b8f) {
    return _0x1a8b69(_0x594a9d(_0x1a8b69(_0x1a8b69(_0x39f461, _0x30878b), _0x1a8b69(_0x277b53, _0x2a8b8f)), _0x1cffed), _0x255049);
  }
  function _0x1fe965(_0x4404bd, _0x28c329, _0x414969, _0x4d94df, _0x23ca38, _0x23cbe2, _0x5621d3) {
    return _0x26e2d8(_0x28c329 & _0x414969 | ~_0x28c329 & _0x4d94df, _0x4404bd, _0x28c329, _0x23ca38, _0x23cbe2, _0x5621d3);
  }
  function _0xaf3166(_0x5c55fe, _0x3cd2ee, _0x5dc9ff, _0x38a183, _0x2f4f14, _0x52e310, _0x821325) {
    return _0x26e2d8(_0x3cd2ee & _0x38a183 | _0x5dc9ff & ~_0x38a183, _0x5c55fe, _0x3cd2ee, _0x2f4f14, _0x52e310, _0x821325);
  }
  function _0x995abc(_0x5c3393, _0x1265ab, _0x3e67ca, _0x3c3835, _0x30d775, _0x4f4e5f, _0x3111c3) {
    return _0x26e2d8(_0x1265ab ^ _0x3e67ca ^ _0x3c3835, _0x5c3393, _0x1265ab, _0x30d775, _0x4f4e5f, _0x3111c3);
  }
  function _0x5b2bde(_0x11d08c, _0x52a9e8, _0x23cd63, _0x1eac47, _0x4b908f, _0x177e9f, _0x12243e) {
    return _0x26e2d8(_0x23cd63 ^ (_0x52a9e8 | ~_0x1eac47), _0x11d08c, _0x52a9e8, _0x4b908f, _0x177e9f, _0x12243e);
  }
  function _0x4651da(_0x57d61e, _0x3d00f8) {
    var _0x4f550a, _0x29e414, _0x4afcdf, _0x379c23, _0x13631c;
    _0x57d61e[_0x3d00f8 >> 5] |= 128 << _0x3d00f8 % 32;
    _0x57d61e[14 + (_0x3d00f8 + 64 >>> 9 << 4)] = _0x3d00f8;
    var _0x1f2a42 = 1732584193,
      _0x200b86 = -271733879,
      _0x2139b5 = -1732584194,
      _0x23d0de = 271733878;
    for (_0x4f550a = 0; _0x4f550a < _0x57d61e.length; _0x4f550a += 16) {
      _0x29e414 = _0x1f2a42;
      _0x4afcdf = _0x200b86;
      _0x379c23 = _0x2139b5;
      _0x13631c = _0x23d0de;
      _0x200b86 = _0x5b2bde(_0x200b86 = _0x5b2bde(_0x200b86 = _0x5b2bde(_0x200b86 = _0x5b2bde(_0x200b86 = _0x995abc(_0x200b86 = _0x995abc(_0x200b86 = _0x995abc(_0x200b86 = _0x995abc(_0x200b86 = _0xaf3166(_0x200b86 = _0xaf3166(_0x200b86 = _0xaf3166(_0x200b86 = _0xaf3166(_0x200b86 = _0x1fe965(_0x200b86 = _0x1fe965(_0x200b86 = _0x1fe965(_0x200b86 = _0x1fe965(_0x200b86, _0x2139b5 = _0x1fe965(_0x2139b5, _0x23d0de = _0x1fe965(_0x23d0de, _0x1f2a42 = _0x1fe965(_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de, _0x57d61e[_0x4f550a], 7, -680876936), _0x200b86, _0x2139b5, _0x57d61e[_0x4f550a + 1], 12, -389564586), _0x1f2a42, _0x200b86, _0x57d61e[_0x4f550a + 2], 17, 606105819), _0x23d0de, _0x1f2a42, _0x57d61e[_0x4f550a + 3], 22, -1044525330), _0x2139b5 = _0x1fe965(_0x2139b5, _0x23d0de = _0x1fe965(_0x23d0de, _0x1f2a42 = _0x1fe965(_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de, _0x57d61e[_0x4f550a + 4], 7, -176418897), _0x200b86, _0x2139b5, _0x57d61e[_0x4f550a + 5], 12, 1200080426), _0x1f2a42, _0x200b86, _0x57d61e[_0x4f550a + 6], 17, -1473231341), _0x23d0de, _0x1f2a42, _0x57d61e[_0x4f550a + 7], 22, -45705983), _0x2139b5 = _0x1fe965(_0x2139b5, _0x23d0de = _0x1fe965(_0x23d0de, _0x1f2a42 = _0x1fe965(_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de, _0x57d61e[_0x4f550a + 8], 7, 1770035416), _0x200b86, _0x2139b5, _0x57d61e[_0x4f550a + 9], 12, -1958414417), _0x1f2a42, _0x200b86, _0x57d61e[_0x4f550a + 10], 17, -42063), _0x23d0de, _0x1f2a42, _0x57d61e[_0x4f550a + 11], 22, -1990404162), _0x2139b5 = _0x1fe965(_0x2139b5, _0x23d0de = _0x1fe965(_0x23d0de, _0x1f2a42 = _0x1fe965(_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de, _0x57d61e[_0x4f550a + 12], 7, 1804603682), _0x200b86, _0x2139b5, _0x57d61e[_0x4f550a + 13], 12, -40341101), _0x1f2a42, _0x200b86, _0x57d61e[_0x4f550a + 14], 17, -1502002290), _0x23d0de, _0x1f2a42, _0x57d61e[_0x4f550a + 15], 22, 1236535329), _0x2139b5 = _0xaf3166(_0x2139b5, _0x23d0de = _0xaf3166(_0x23d0de, _0x1f2a42 = _0xaf3166(_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de, _0x57d61e[_0x4f550a + 1], 5, -165796510), _0x200b86, _0x2139b5, _0x57d61e[_0x4f550a + 6], 9, -1069501632), _0x1f2a42, _0x200b86, _0x57d61e[_0x4f550a + 11], 14, 643717713), _0x23d0de, _0x1f2a42, _0x57d61e[_0x4f550a], 20, -373897302), _0x2139b5 = _0xaf3166(_0x2139b5, _0x23d0de = _0xaf3166(_0x23d0de, _0x1f2a42 = _0xaf3166(_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de, _0x57d61e[_0x4f550a + 5], 5, -701558691), _0x200b86, _0x2139b5, _0x57d61e[_0x4f550a + 10], 9, 38016083), _0x1f2a42, _0x200b86, _0x57d61e[_0x4f550a + 15], 14, -660478335), _0x23d0de, _0x1f2a42, _0x57d61e[_0x4f550a + 4], 20, -405537848), _0x2139b5 = _0xaf3166(_0x2139b5, _0x23d0de = _0xaf3166(_0x23d0de, _0x1f2a42 = _0xaf3166(_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de, _0x57d61e[_0x4f550a + 9], 5, 568446438), _0x200b86, _0x2139b5, _0x57d61e[_0x4f550a + 14], 9, -1019803690), _0x1f2a42, _0x200b86, _0x57d61e[_0x4f550a + 3], 14, -187363961), _0x23d0de, _0x1f2a42, _0x57d61e[_0x4f550a + 8], 20, 1163531501), _0x2139b5 = _0xaf3166(_0x2139b5, _0x23d0de = _0xaf3166(_0x23d0de, _0x1f2a42 = _0xaf3166(_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de, _0x57d61e[_0x4f550a + 13], 5, -1444681467), _0x200b86, _0x2139b5, _0x57d61e[_0x4f550a + 2], 9, -51403784), _0x1f2a42, _0x200b86, _0x57d61e[_0x4f550a + 7], 14, 1735328473), _0x23d0de, _0x1f2a42, _0x57d61e[_0x4f550a + 12], 20, -1926607734), _0x2139b5 = _0x995abc(_0x2139b5, _0x23d0de = _0x995abc(_0x23d0de, _0x1f2a42 = _0x995abc(_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de, _0x57d61e[_0x4f550a + 5], 4, -378558), _0x200b86, _0x2139b5, _0x57d61e[_0x4f550a + 8], 11, -2022574463), _0x1f2a42, _0x200b86, _0x57d61e[_0x4f550a + 11], 16, 1839030562), _0x23d0de, _0x1f2a42, _0x57d61e[_0x4f550a + 14], 23, -35309556), _0x2139b5 = _0x995abc(_0x2139b5, _0x23d0de = _0x995abc(_0x23d0de, _0x1f2a42 = _0x995abc(_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de, _0x57d61e[_0x4f550a + 1], 4, -1530992060), _0x200b86, _0x2139b5, _0x57d61e[_0x4f550a + 4], 11, 1272893353), _0x1f2a42, _0x200b86, _0x57d61e[_0x4f550a + 7], 16, -155497632), _0x23d0de, _0x1f2a42, _0x57d61e[_0x4f550a + 10], 23, -1094730640), _0x2139b5 = _0x995abc(_0x2139b5, _0x23d0de = _0x995abc(_0x23d0de, _0x1f2a42 = _0x995abc(_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de, _0x57d61e[_0x4f550a + 13], 4, 681279174), _0x200b86, _0x2139b5, _0x57d61e[_0x4f550a], 11, -358537222), _0x1f2a42, _0x200b86, _0x57d61e[_0x4f550a + 3], 16, -722521979), _0x23d0de, _0x1f2a42, _0x57d61e[_0x4f550a + 6], 23, 76029189), _0x2139b5 = _0x995abc(_0x2139b5, _0x23d0de = _0x995abc(_0x23d0de, _0x1f2a42 = _0x995abc(_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de, _0x57d61e[_0x4f550a + 9], 4, -640364487), _0x200b86, _0x2139b5, _0x57d61e[_0x4f550a + 12], 11, -421815835), _0x1f2a42, _0x200b86, _0x57d61e[_0x4f550a + 15], 16, 530742520), _0x23d0de, _0x1f2a42, _0x57d61e[_0x4f550a + 2], 23, -995338651), _0x2139b5 = _0x5b2bde(_0x2139b5, _0x23d0de = _0x5b2bde(_0x23d0de, _0x1f2a42 = _0x5b2bde(_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de, _0x57d61e[_0x4f550a], 6, -198630844), _0x200b86, _0x2139b5, _0x57d61e[_0x4f550a + 7], 10, 1126891415), _0x1f2a42, _0x200b86, _0x57d61e[_0x4f550a + 14], 15, -1416354905), _0x23d0de, _0x1f2a42, _0x57d61e[_0x4f550a + 5], 21, -57434055), _0x2139b5 = _0x5b2bde(_0x2139b5, _0x23d0de = _0x5b2bde(_0x23d0de, _0x1f2a42 = _0x5b2bde(_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de, _0x57d61e[_0x4f550a + 12], 6, 1700485571), _0x200b86, _0x2139b5, _0x57d61e[_0x4f550a + 3], 10, -1894986606), _0x1f2a42, _0x200b86, _0x57d61e[_0x4f550a + 10], 15, -1051523), _0x23d0de, _0x1f2a42, _0x57d61e[_0x4f550a + 1], 21, -2054922799), _0x2139b5 = _0x5b2bde(_0x2139b5, _0x23d0de = _0x5b2bde(_0x23d0de, _0x1f2a42 = _0x5b2bde(_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de, _0x57d61e[_0x4f550a + 8], 6, 1873313359), _0x200b86, _0x2139b5, _0x57d61e[_0x4f550a + 15], 10, -30611744), _0x1f2a42, _0x200b86, _0x57d61e[_0x4f550a + 6], 15, -1560198380), _0x23d0de, _0x1f2a42, _0x57d61e[_0x4f550a + 13], 21, 1309151649), _0x2139b5 = _0x5b2bde(_0x2139b5, _0x23d0de = _0x5b2bde(_0x23d0de, _0x1f2a42 = _0x5b2bde(_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de, _0x57d61e[_0x4f550a + 4], 6, -145523070), _0x200b86, _0x2139b5, _0x57d61e[_0x4f550a + 11], 10, -1120210379), _0x1f2a42, _0x200b86, _0x57d61e[_0x4f550a + 2], 15, 718787259), _0x23d0de, _0x1f2a42, _0x57d61e[_0x4f550a + 9], 21, -343485551);
      _0x1f2a42 = _0x1a8b69(_0x1f2a42, _0x29e414);
      _0x200b86 = _0x1a8b69(_0x200b86, _0x4afcdf);
      _0x2139b5 = _0x1a8b69(_0x2139b5, _0x379c23);
      _0x23d0de = _0x1a8b69(_0x23d0de, _0x13631c);
    }
    return [_0x1f2a42, _0x200b86, _0x2139b5, _0x23d0de];
  }
  function _0x4dda90(_0x1ed64c) {
    var _0x505d38,
      _0x34a230 = "",
      _0x2b8224 = 32 * _0x1ed64c.length;
    for (_0x505d38 = 0; _0x505d38 < _0x2b8224; _0x505d38 += 8) {
      _0x34a230 += String.fromCharCode(_0x1ed64c[_0x505d38 >> 5] >>> _0x505d38 % 32 & 255);
    }
    return _0x34a230;
  }
  function _0xca8648(_0x1db70f) {
    var _0x2a46cc,
      _0x774aed = [];
    for (_0x774aed[(_0x1db70f.length >> 2) - 1] = void 0, _0x2a46cc = 0; _0x2a46cc < _0x774aed.length; _0x2a46cc += 1) {
      _0x774aed[_0x2a46cc] = 0;
    }
    var _0x4d929d = 8 * _0x1db70f.length;
    for (_0x2a46cc = 0; _0x2a46cc < _0x4d929d; _0x2a46cc += 8) {
      _0x774aed[_0x2a46cc >> 5] |= (255 & _0x1db70f.charCodeAt(_0x2a46cc / 8)) << _0x2a46cc % 32;
    }
    return _0x774aed;
  }
  function _0x4001ad(_0x2f431c) {
    return _0x4dda90(_0x4651da(_0xca8648(_0x2f431c), 8 * _0x2f431c.length));
  }
  function _0x3f5b9e(_0x57adcd, _0x532490) {
    var _0x58a9e2,
      _0x23d4cf = _0xca8648(_0x57adcd),
      _0x332440 = [],
      _0x33be5d = [],
      _0x249b14;
    for (_0x332440[15] = _0x33be5d[15] = void 0, _0x23d4cf.length > 16 && (_0x23d4cf = _0x4651da(_0x23d4cf, 8 * _0x57adcd.length)), _0x58a9e2 = 0; _0x58a9e2 < 16; _0x58a9e2 += 1) {
      _0x332440[_0x58a9e2] = 909522486 ^ _0x23d4cf[_0x58a9e2];
      _0x33be5d[_0x58a9e2] = 1549556828 ^ _0x23d4cf[_0x58a9e2];
    }
    _0x249b14 = _0x4651da(_0x332440.concat(_0xca8648(_0x532490)), 512 + 8 * _0x532490.length);
    return _0x4dda90(_0x4651da(_0x33be5d.concat(_0x249b14), 640));
  }
  function _0x17ae50(_0x5a6a32) {
    var _0x4ecf8d = "0123456789abcdef",
      _0x340d69 = "",
      _0x6e7e1c,
      _0x1b0dfb;
    for (_0x1b0dfb = 0; _0x1b0dfb < _0x5a6a32.length; _0x1b0dfb += 1) {
      _0x6e7e1c = _0x5a6a32.charCodeAt(_0x1b0dfb);
      _0x340d69 += _0x4ecf8d.charAt(_0x6e7e1c >>> 4 & 15) + _0x4ecf8d.charAt(15 & _0x6e7e1c);
    }
    return _0x340d69;
  }
  function _0x5049ca(_0x5d03de) {
    return unescape(encodeURIComponent(_0x5d03de));
  }
  function _0x470b95(_0x2c59d2) {
    return _0x4001ad(_0x5049ca(_0x2c59d2));
  }
  function _0x4ed092(_0x24e69a) {
    return _0x17ae50(_0x470b95(_0x24e69a));
  }
  function _0x321bdd(_0x25b9bb, _0x787b1e) {
    return _0x3f5b9e(_0x5049ca(_0x25b9bb), _0x5049ca(_0x787b1e));
  }
  function _0xc1b072(_0x2d68fe, _0x48be79) {
    return _0x17ae50(_0x321bdd(_0x2d68fe, _0x48be79));
  }
  function _0x11f2ad(_0x9184e0, _0x4d2d6b, _0x4a8a3f) {
    return _0x4d2d6b ? _0x4a8a3f ? _0x321bdd(_0x4d2d6b, _0x9184e0) : _0xc1b072(_0x4d2d6b, _0x9184e0) : _0x4a8a3f ? _0x470b95(_0x9184e0) : _0x4ed092(_0x9184e0);
  }
  function _0x4a4a90(_0x140053) {
    for (var _0x5f031a = _0x4bc8d7.split(";"), _0x388cc0 = 0; _0x388cc0 < _0x5f031a.length; _0x388cc0++) {
      var _0xb6d3e7 = _0x5f031a[_0x388cc0].split("=");
      if (_0xb6d3e7[0].trim() == _0x140053) {
        return _0xb6d3e7[1];
      }
    }
    return null;
  }
  const _0x51036a = _0x4a4a90("cna") || "",
    _0x24a2da = _0x11f2ad(_0x51036a + _0x1bc20a + Date.now());
  return _0x24a2da;
}
async function getCookie() {
  if ($request && $request.method === "OPTIONS") {
    return;
  }
  const _0x21c23e = ObjectKeys2LowerCase($request.headers),
    _0x5af1da = _0x21c23e.cookie,
    _0x127003 = $.toObj($response.body);
  if (!_0x127003?.["data"]) {
    $.msg($.name, "⛔️ 获取Cookie失败!", "");
    return;
  }
  const {
      nickname: _0x430edb,
      avatar: _0x334a20
    } = _0x127003?.["data"],
    _0x7ed92 = {
      userId: _0x430edb,
      avatar: _0x334a20,
      token: _0x5af1da,
      userName: _0x430edb
    };
  userCookie = userCookie ? JSON.parse(userCookie) : [];
  const _0x16cb67 = userCookie.findIndex(_0x177ea3 => _0x177ea3.userId == _0x7ed92.userId);
  userCookie[_0x16cb67] ? userCookie[_0x16cb67] = _0x7ed92 : userCookie.push(_0x7ed92);
  $.setjson(userCookie, ckName);
  $.msg($.name, "🎉" + _0x7ed92.userName + "更新token成功!", "");
}
function randomInt(_0x467c1f, _0x27a3de) {
  return Math.round(Math.random() * (_0x27a3de - _0x467c1f) + _0x467c1f);
}
async function loadModule() {
  try {
    $.Cheerio = await loadCheerio();
    return $.Cheerio ? true : false;
  } catch (_0x5eea9a) {
    throw new Error("⛔️ loadModule run error => " + _0x5eea9a);
  }
}
async function loadCheerio() {
  let _0xdffde4 = ($.isNode() ? process.env.Cheerio_code : $.getdata("Cheerio_code")) || "";
  if (_0xdffde4 && Object.keys(_0xdffde4).length) {
    console.log("✅" + $.name + ":缓存中存在Cheerio模块,跳过下载");
    eval(_0xdffde4);
    return createCheerio();
  }
  console.log("🚀" + $.name + ": 开始下载Cheerio模块");
  return new Promise(async _0x265576 => {
    $.getScript("https://mirror.ghproxy.com/https://raw.githubusercontent.com/Yuheng0101/X/main/Utils/cheerio.js").then(_0x327959 => {
      $.setdata(_0x327959, "Cheerio_code");
      eval(_0x327959);
      const _0x592707 = createCheerio();
      console.log("✅Cheerio模块加载成功,请继续");
      _0x265576(_0x592707);
    });
  });
}
!(async () => {
  try {
    typeof $request != "undefined" ? await getCookie() : (await checkEnv(), await main());
  } catch (_0x568fd2) {
    throw _0x568fd2;
  }
})().catch(_0x52a723 => {
  $.logErr(_0x52a723);
  $.msg($.name, "⛔️ script run error!", _0x52a723.message || _0x52a723);
}).finally(async () => {
  $.done({
    ok: 1
  });
});
async function sendMsg(_0xb02355, _0x3d09e4) {
  _0xb02355 && ($.isNode() ? await notify.sendNotify($.name, _0xb02355) : $.msg($.name, $.title || "", _0xb02355, _0x3d09e4));
}
function DoubleLog(_0x3bb84c) {
  _0x3bb84c && ($.log("" + _0x3bb84c), $.notifyMsg.push("" + _0x3bb84c));
}
async function checkEnv() {
  try {
    userCookie = $.toObj(userCookie);
    if (!userCookie?.["length"]) {
      throw new Error("no available accounts found");
    }
    $.log("\n[INFO] 检测到 " + (userCookie?.["length"] ?? 0) + " 个账号\n");
    $.userList.push(...userCookie.map(_0x3a997a => new UserInfo(_0x3a997a)).filter(Boolean));
  } catch (_0x392a51) {
    throw _0x392a51;
  }
}
function debug(_0x222116, _0x293dde = "debug") {
  "true" === $.is_debug && ($.log("\n-----------" + _0x293dde + "------------\n"), $.log("string" == typeof _0x222116 ? _0x222116 : $.toStr(_0x222116) || "debug error => t=" + _0x222116), $.log("\n-----------" + _0x293dde + "------------\n"));
}
function ObjectKeys2LowerCase(_0xb83a3b) {
  return !_0xb83a3b ? {} : Object.fromEntries(Object.entries(_0xb83a3b).map(([_0xf67013, _0x9121e9]) => [_0xf67013.toLowerCase(), _0x9121e9]));
}
async function Request(_0x516550) {
  "string" == typeof _0x516550 && (_0x516550 = {
    url: _0x516550
  });
  try {
    if (!_0x516550?.["url"]) {
      throw new Error("[URL][ERROR] 缺少 url 参数");
    }
    let {
      url: _0x414de9,
      type: _0x378997,
      headers: _0x252b90 = {},
      body: _0x2e479b,
      params: _0x2cb8ad,
      dataType: _0x1d9585 = "form",
      resultType: _0x2da1f2 = "data"
    } = _0x516550;
    const _0x580dc3 = _0x378997 ? _0x378997?.["toLowerCase"]() : "body" in _0x516550 ? "post" : "get",
      _0x11d2ac = _0x414de9.concat("post" === _0x580dc3 ? "?" + $.queryStr(_0x2cb8ad) : ""),
      _0x2c4081 = _0x516550.timeout ? $.isSurge() ? _0x516550.timeout / 1000 : _0x516550.timeout : 10000;
    "json" === _0x1d9585 && (_0x252b90["Content-Type"] = "application/json;charset=UTF-8");
    const _0x304b9d = "string" == typeof _0x2e479b ? _0x2e479b : _0x2e479b && "form" == _0x1d9585 ? $.queryStr(_0x2e479b) : $.toStr(_0x2e479b),
      _0x318563 = {
        ..._0x516550,
        ...(_0x516550?.["opts"] ? _0x516550.opts : {}),
        url: _0x11d2ac,
        headers: _0x252b90,
        ...("post" === _0x580dc3 && {
          body: _0x304b9d
        }),
        ...("get" === _0x580dc3 && _0x2cb8ad && {
          params: _0x2cb8ad
        }),
        timeout: _0x2c4081
      },
      _0x279287 = $.http[_0x580dc3.toLowerCase()](_0x318563).then(_0x563f21 => "data" == _0x2da1f2 ? $.toObj(_0x563f21.body) || _0x563f21.body : $.toObj(_0x563f21) || _0x563f21).catch(_0x1ddcde => $.log("[" + _0x580dc3.toUpperCase() + "][ERROR] " + _0x1ddcde + "\n"));
    return Promise.race([new Promise((_0x2ab1f5, _0x1ebd27) => setTimeout(() => _0x1ebd27("当前请求已超时"), _0x2c4081)), _0x279287]);
  } catch (_0x5d200a) {
    console.log("[" + p.toUpperCase() + "][ERROR] " + _0x5d200a + "\n");
  }
}
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
      return new Promise((e, i) => {
        s.call(this, t, (t, s, o) => {
          t ? i(t) : e(s);
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
      this.logLevels = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
      };
      this.logLevelPrefixs = {
        debug: "[DEBUG] ",
        info: "[INFO] ",
        warn: "[WARN] ",
        error: "[ERROR] "
      };
      this.logLevel = "info";
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
    toStr(t, e = null, ...s) {
      try {
        return JSON.stringify(t, ...s);
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
        }, (t, s, i) => e(i));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let o = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        o = o ? 1 * o : 20;
        o = e && e.timeout ? e.timeout : o;
        const [r, a] = i.split("@"),
          n = {
            url: `http://${a}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: o
            },
            headers: {
              "X-Key": r,
              Accept: "*/*"
            },
            timeout: o
          };
        this.post(n, (t, e, i) => s(i));
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
          i = !s && this.fs.existsSync(e);
        if (!s && !i) {
          return {};
        }
        {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i));
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
          i = !s && this.fs.existsSync(e),
          o = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, o) : i ? this.fs.writeFileSync(e, o) : this.fs.writeFileSync(t, o);
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let o = t;
      for (const t of i) if (o = Object(o)[t], void 0 === o) {
        return s;
      }
      return o;
    }
    lodash_set(t, e, s) {
      Object(t) !== t || (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s);
      return t;
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
          o = s ? this.getval(s) : "";
        if (o) {
          try {
            const t = JSON.parse(o);
            e = t ? this.lodash_get(t, i, "") : e;
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
        const [, i, o] = /^@(.*?)\.(.*?)$/.exec(e),
          r = this.getval(i),
          a = i ? "null" === r ? null : r || "{}" : "{}";
        try {
          const e = JSON.parse(a);
          this.lodash_set(e, o, t);
          s = this.setval(JSON.stringify(e), i);
        } catch (e) {
          const r = {};
          this.lodash_set(r, o, t);
          s = this.setval(JSON.stringify(r), i);
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
      t && (t.headers = t.headers ? t.headers : {}, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.cookie && void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)));
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
          $httpClient.get(t, (t, s, i) => {
            !t && s && (s.body = i, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode);
            e(t, s, i);
          });
          break;
        case "Quantumult X":
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: i,
              headers: o,
              body: r,
              bodyBytes: a
            } = t;
            e(null, {
              status: s,
              statusCode: i,
              headers: o,
              body: r,
              bodyBytes: a
            }, r, a);
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
                statusCode: i,
                statusCode: o,
                headers: r,
                rawBody: a
              } = t,
              n = s.decode(a, this.encoding);
            e(null, {
              status: i,
              statusCode: o,
              headers: r,
              rawBody: a,
              body: n
            }, n);
          }, t => {
            const {
              message: i,
              response: o
            } = t;
            e(i, o, o && s.decode(o.rawBody, this.encoding));
          });
          break;
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
          $httpClient[s](t, (t, s, i) => {
            !t && s && (s.body = i, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode);
            e(t, s, i);
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
              statusCode: i,
              headers: o,
              body: r,
              bodyBytes: a
            } = t;
            e(null, {
              status: s,
              statusCode: i,
              headers: o,
              body: r,
              bodyBytes: a
            }, r, a);
          }, t => e(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          let i = require("iconv-lite");
          this.initGotEnv(t);
          const {
            url: o,
            ...r
          } = t;
          this.got[s](o, r).then(t => {
            const {
                statusCode: s,
                statusCode: o,
                headers: r,
                rawBody: a
              } = t,
              n = i.decode(a, this.encoding);
            e(null, {
              status: s,
              statusCode: o,
              headers: r,
              rawBody: a,
              body: n
            }, n);
          }, t => {
            const {
              message: s,
              response: o
            } = t;
            e(s, o, o && i.decode(o.rawBody, this.encoding));
          });
          break;
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
      return t;
    }
    queryStr(t) {
      let e = "";
      for (const s in t) {
        let i = t[s];
        null != i && "" !== i && ("object" == typeof i && (i = JSON.stringify(i)), e += `${s}=${i}&`);
      }
      e = e.substring(0, e.length - 1);
      return e;
    }
    msg(e = t, s = "", i = "", o = {}) {
      const r = t => {
        const {
          $open: e,
          $copy: s,
          $media: i,
          $mediaMime: o
        } = t;
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
                {
                  const r = {};
                  let a = t.openUrl || t.url || t["open-url"] || e;
                  a && Object.assign(r, {
                    action: "open-url",
                    url: a
                  });
                  let n = t["update-pasteboard"] || t.updatePasteboard || s;
                  if (n && Object.assign(r, {
                    action: "clipboard",
                    text: n
                  }), i) {
                    let t, e, s;
                    if (i.startsWith("http")) {
                      t = i;
                    } else {
                      if (i.startsWith("data:")) {
                        const [t] = i.split(";"),
                          [, o] = i.split(",");
                        e = o;
                        s = t.replace("data:", "");
                      } else {
                        e = i;
                        s = (t => {
                          const e = {
                            JVBERi0: "application/pdf",
                            R0lGODdh: "image/gif",
                            R0lGODlh: "image/gif",
                            iVBORw0KGgo: "image/png",
                            "/9j/": "image/jpg"
                          };
                          for (var s in e) if (0 === t.indexOf(s)) {
                            return e[s];
                          }
                          return null;
                        })(i);
                      }
                    }
                    Object.assign(r, {
                      "media-url": t,
                      "media-base64": e,
                      "media-base64-mime": o ?? s
                    });
                  }
                  Object.assign(r, {
                    "auto-dismiss": t["auto-dismiss"],
                    sound: t.sound
                  });
                  return r;
                }
              case "Loon":
                {
                  const s = {};
                  let o = t.openUrl || t.url || t["open-url"] || e;
                  o && Object.assign(s, {
                    openUrl: o
                  });
                  let r = t.mediaUrl || t["media-url"];
                  i?.startsWith("http") && (r = i);
                  r && Object.assign(s, {
                    mediaUrl: r
                  });
                  console.log(JSON.stringify(s));
                  return s;
                }
              case "Quantumult X":
                {
                  const o = {};
                  let r = t["open-url"] || t.url || t.openUrl || e;
                  r && Object.assign(o, {
                    "open-url": r
                  });
                  let a = t["media-url"] || t.mediaUrl;
                  i?.startsWith("http") && (a = i);
                  a && Object.assign(o, {
                    "media-url": a
                  });
                  let n = t["update-pasteboard"] || t.updatePasteboard || s;
                  n && Object.assign(o, {
                    "update-pasteboard": n
                  });
                  console.log(JSON.stringify(o));
                  return o;
                }
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
            $notification.post(e, s, i, r(o));
            break;
          case "Quantumult X":
            $notify(e, s, i, r(o));
            break;
          case "Node.js":
            break;
        }
      }
      if (!this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e);
        s && t.push(s);
        i && t.push(i);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    debug(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.debug && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.debug}${t.map(t => t ?? String(t)).join(this.logSeparator)}`));
    }
    info(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.info && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.info}${t.map(t => t ?? String(t)).join(this.logSeparator)}`));
    }
    warn(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.warn && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.warn}${t.map(t => t ?? String(t)).join(this.logSeparator)}`));
    }
    error(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.error && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.error}${t.map(t => t ?? String(t)).join(this.logSeparator)}`));
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.map(t => t ?? String(t)).join(this.logSeparator));
    }
    logErr(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          this.log("", `❗️${this.name}, 错误!`, e, t);
          break;
        case "Node.js":
          this.log("", `❗️${this.name}, 错误!`, e, void 0 !== t.message ? t.message : t, t.stack);
          break;
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