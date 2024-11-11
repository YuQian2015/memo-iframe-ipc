var m = Object.defineProperty;
var g = (l, e, s) => e in l ? m(l, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : l[e] = s;
var d = (l, e, s) => g(l, typeof e != "symbol" ? e + "" : e, s);
var c = (l, e, s) => new Promise((t, a) => {
  var o = (r) => {
    try {
      i(s.next(r));
    } catch (h) {
      a(h);
    }
  }, n = (r) => {
    try {
      i(s.throw(r));
    } catch (h) {
      a(h);
    }
  }, i = (r) => r.done ? t(r.value) : Promise.resolve(r.value).then(o, n);
  i((s = s.apply(l, e)).next());
});
class f {
  constructor(e) {
    d(this, "windowMessageHandler", {});
    d(this, "messageHandler", {});
    d(this, "callbackId", 1);
    d(this, "callbacks", {});
    d(this, "isIframe", !0);
    d(this, "source", {
      url: "",
      query: {}
    });
    d(this, "defaultOptions", {
      methods: [
        "localStorage.removeItem",
        "localStorage.setItem",
        "localStorage.getItem",
        "localStorage.clear",
        "memoryStorage.removeItem",
        "memoryStorage.setItem",
        "memoryStorage.getItem",
        "memoryStorage.clear",
        "windowPostMessage",
        // 窗口之间发送消息
        "openChildWindow"
        // 打开子窗口
      ],
      appId: "memo-app"
    });
    d(this, "options");
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
          for (const o in this.windowMessageHandler)
            this.windowMessageHandler[o](a.event, a.data);
        if (t === "IPC_RESPONSE") {
          const { callbackId: o, success: n, params: i } = e.data;
          this.callbacks[o] && (n ? this.callbacks[o].success(i.data) : this.callbacks[o].error(i.error), delete this.callbacks[o]);
        }
        if (t === "IPC_RESPONSE_SEND_MESSAGE")
          for (const o in this.messageHandler)
            this.messageHandler[o](a.event, a.data);
      }
    }), this.addMethods(this.options.methods);
  }
  getQueryParams(e) {
    const s = {}, t = e.match(/\?([^#]+)/);
    if (t) {
      const o = t[1], n = new URLSearchParams(o);
      for (const [i, r] of n.entries())
        s[i] = r;
    }
    const a = e.match(/#.*\?(.+)/);
    if (a) {
      const o = a[1], n = new URLSearchParams(o);
      for (const [i, r] of n.entries())
        s[i] = r;
    }
    return s;
  }
  addMethod(e) {
    const s = e.split(".");
    let t = this;
    for (let a = 0; a < s.length - 1; a++)
      t[s[a]] || (t[s[a]] = {}), t = t[s[a]];
    t[s[s.length - 1]] = (...a) => new Promise((o, n) => {
      this.callMain(e, a, o, n);
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
  f as Bridge
};
