var m = Object.defineProperty;
var g = (d, e, s) => e in d ? m(d, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : d[e] = s;
var i = (d, e, s) => g(d, typeof e != "symbol" ? e + "" : e, s);
var c = (d, e, s) => new Promise((t, a) => {
  var r = (o) => {
    try {
      n(s.next(o));
    } catch (h) {
      a(h);
    }
  }, l = (o) => {
    try {
      n(s.throw(o));
    } catch (h) {
      a(h);
    }
  }, n = (o) => o.done ? t(o.value) : Promise.resolve(o.value).then(r, l);
  n((s = s.apply(d, e)).next());
});
class w {
  constructor(e) {
    // 添加索引签名
    i(this, "windowMessageHandler", {});
    i(this, "messageHandler", {});
    i(this, "callbackId", 1);
    i(this, "callbacks", {});
    i(this, "isIframe", !0);
    i(this, "source", {
      url: "",
      query: {}
    });
    i(this, "defaultOptions", {
      methods: [
        "localStorage.removeItem",
        "localStorage.setItem",
        "localStorage.getItem",
        "localStorage.clear",
        "memoryStorage.removeItem",
        "memoryStorage.setItem",
        "memoryStorage.getItem",
        "memoryStorage.clear",
        "storage.removeItem",
        "storage.setItem",
        "storage.getItem",
        "storage.clear",
        "storage.keys",
        "browser.windowPostMessage",
        // 窗口之间发送消息
        "browser.openChildWindow"
        // 打开子窗口
      ],
      appId: "memo-app"
    });
    i(this, "withAppIdKeys", [
      "storage.removeItem",
      "storage.setItem",
      "storage.getItem",
      "storage.clear",
      "storage.keys",
      "file.savePluginFile",
      "file.readPluginFile",
      "file.checkPluginFileExist"
    ]);
    i(this, "options");
    i(this, "player", {
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
          const { callbackId: r, success: l, params: n } = e.data;
          this.callbacks[r] && (l ? this.callbacks[r].success(n.data) : this.callbacks[r].error(n.error), delete this.callbacks[r]);
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
      const r = t[1], l = new URLSearchParams(r);
      for (const [n, o] of l.entries())
        s[n] = o;
    }
    const a = e.match(/#.*\?(.+)/);
    if (a) {
      const r = a[1], l = new URLSearchParams(r);
      for (const [n, o] of l.entries())
        s[n] = o;
    }
    return s;
  }
  addMethod(e) {
    const s = e.split(".");
    let t = this;
    for (let a = 0; a < s.length - 1; a++)
      t[s[a]] || (t[s[a]] = {}), t = t[s[a]];
    t[s[s.length - 1]] = (...a) => (this.withAppIdKeys.includes(e) && a.push(this.options.appId), new Promise((r, l) => {
      this.callMain(e, a, r, l);
    }));
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
  w as Bridge
};
