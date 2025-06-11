var m = Object.defineProperty;
var w = (l, e, s) => e in l ? m(l, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : l[e] = s;
var n = (l, e, s) => w(l, typeof e != "symbol" ? e + "" : e, s);
var c = (l, e, s) => new Promise((t, a) => {
  var r = (o) => {
    try {
      i(s.next(o));
    } catch (h) {
      a(h);
    }
  }, d = (o) => {
    try {
      i(s.throw(o));
    } catch (h) {
      a(h);
    }
  }, i = (o) => o.done ? t(o.value) : Promise.resolve(o.value).then(r, d);
  i((s = s.apply(l, e)).next());
});
class g {
  constructor(e) {
    // 添加索引签名
    n(this, "windowMessageHandler", {});
    n(this, "messageHandler", {});
    n(this, "callbackId", 1);
    n(this, "callbacks", {});
    n(this, "isIframe", !0);
    n(this, "source", {
      url: "",
      query: {}
    });
    n(this, "defaultOptions", {
      methods: [
        "localStorage.removeItem",
        "localStorage.setItem",
        "localStorage.getItem",
        "localStorage.clear",
        "memoryStorage.removeItem",
        "memoryStorage.setItem",
        "memoryStorage.getItem",
        "memoryStorage.clear",
        "browser.windowPostMessage",
        // 窗口之间发送消息
        "browser.openChildWindow"
        // 打开子窗口
      ],
      appId: "memo-app"
    });
    n(this, "options");
    n(this, "player", {
      play: () => new Promise((e) => {
        var s;
        (s = this.browser) == null || s.windowPostMessage({
          type: "window:player:play:req",
          data: {}
        }), e();
      }),
      pause: () => new Promise((e) => {
        var s;
        (s = this.browser) == null || s.windowPostMessage({
          type: "window:player:pause:req",
          data: {}
        }), e();
      })
      // seek: (time: number) => {
      //   return new Promise<void>((resolve) => {
      //     this.browser?.windowPostMessage({
      //       type: 'window:player:seek:req',
      //       data: { time }
      //     })
      //     resolve()
      //   })
      // }
    });
    this.options = {
      methods: [...this.defaultOptions.methods, ...e.methods || []],
      appId: e.appId || this.defaultOptions.appId
    }, this.init();
  }
  init() {
    this.source.url = window.location.href, this.source.query = this.getQueryParams(this.source.url), window.addEventListener("message", (e) => {
      const { from: s, action: t, params: a } = e.data;
      if (s === `main:${this.options.appId}`) {
        if (t === "IPC_RESPONSE_SEND")
          for (const r in this.windowMessageHandler)
            this.windowMessageHandler[r](a.event, a.data);
        if (t === "IPC_RESPONSE") {
          const { callbackId: r, success: d, params: i } = e.data;
          this.callbacks[r] && (d ? this.callbacks[r].success(i.data) : this.callbacks[r].error(i.error), delete this.callbacks[r]);
        }
        if (t === "IPC_RESPONSE_SEND_MESSAGE")
          for (const r in this.messageHandler)
            this.messageHandler[r](a.event, a.data);
      }
    }), this.addMethods(this.options.methods);
  }
  getQueryParams(e) {
    const s = {}, t = e.match(/\?([^#]+)/);
    if (t) {
      const r = t[1], d = new URLSearchParams(r);
      for (const [i, o] of d.entries())
        s[i] = o;
    }
    const a = e.match(/#.*\?(.+)/);
    if (a) {
      const r = a[1], d = new URLSearchParams(r);
      for (const [i, o] of d.entries())
        s[i] = o;
    }
    return s;
  }
  addMethod(e) {
    const s = e.split(".");
    let t = this;
    for (let a = 0; a < s.length - 1; a++)
      t[s[a]] || (t[s[a]] = {}), t = t[s[a]];
    t[s[s.length - 1]] = (...a) => new Promise((r, d) => {
      this.callMain(e, a, r, d);
    });
  }
  addMethods(e) {
    for (const s of e)
      this.addMethod(s);
  }
  callMain(e, s, t, a) {
    this.callbackId++, this.callbacks[this.callbackId] = {
      success: t,
      error: a
    }, window.parent.postMessage({ from: `renderer:${this.options.appId}`, action: "IPC_REQUEST", data: { callbackId: this.callbackId, method: e, params: s } }, "*");
  }
  handleMessage(e, s) {
    return c(this, null, function* () {
      this.messageHandler[s] = e;
    });
  }
  removeHandler(e) {
    return c(this, null, function* () {
      e && this.messageHandler[e] && delete this.messageHandler[e];
    });
  }
  // 注册窗口之间的消息监听
  handleWindowMessage(e, s) {
    return c(this, null, function* () {
      this.windowMessageHandler[s] = e;
    });
  }
  // 移除窗口之间的消息监听
  removeWindowHandler(e) {
    return c(this, null, function* () {
      e && this.windowMessageHandler[e] && delete this.windowMessageHandler[e];
    });
  }
}
export {
  g as Bridge
};
