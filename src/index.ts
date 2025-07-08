import { MessageData, IElectronAPI } from "@/types";

export class Bridge implements Partial<IElectronAPI> {
  [key: string]: any;  // 添加索引签名

  private windowMessageHandler: Record<string, (event: any, data: MessageData) => any> = {}
  private messageHandler: Record<string, (event: any, data: MessageData) => any> = {}

  private callbackId = 1
  private callbacks: Record<string, any> = {}

  isIframe: boolean = true
  source: {
    url: string
    query: Record<string, string>
  } = {
      url: "",
      query: {}
    }

  private defaultOptions = {
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
      "player.play",
      "player.pause",
      "player.seek",
      "player.seekForward",
      "player.seekBackward",
      "player.getCurrentTime",
      "player.screenshot",
      "locales.getLanguage",
      "browser.windowPostMessage", // 窗口之间发送消息
      "browser.openChildWindow", // 打开子窗口
    ],
    appId: "memo-app",
  }

  private withAppIdKeys = [
    "storage.removeItem",
    "storage.setItem",
    "storage.getItem",
    "storage.clear",
    "storage.keys",
    "file.savePluginFile",
    "file.readPluginFile",
    "file.checkPluginFileExist"
  ]

  options: {
    methods: string[]
    appId: string
  }
  constructor(options: {
    methods: string[]
    appId: string
  }) {
    this.options = {
      methods: [...this.defaultOptions.methods, ...(options.methods || [])],
      appId: options.appId || this.defaultOptions.appId,
    }
    this.init()
  }

  private init() {
    this.source.url = window.location.href
    this.source.query = this.getQueryParams(this.source.url)

    window.addEventListener('message', (event: MessageEvent) => {
      const { from, action, params } = event.data;

      if (from === `main:${this.options.appId}`) {
        if (action === "IPC_RESPONSE_SEND") {
          for (const key in this.windowMessageHandler) {
            this.windowMessageHandler[key](params.event, params.data)
          }
        }

        if (action === "IPC_RESPONSE") {
          const { callbackId, success, params } = event.data;
          if (this.callbacks[callbackId]) {
            if (success) {
              this.callbacks[callbackId].success(params.data)
            } else {
              this.callbacks[callbackId].error(params.error)
            }
            delete this.callbacks[callbackId]
          }
        }

        if (action === "IPC_RESPONSE_SEND_MESSAGE") {
          for (const key in this.messageHandler) {
            this.messageHandler[key](params.event, params.data)
          }
        }
      }
    })

    this.addMethods(this.options.methods)
  }

  private getQueryParams(url: string) {
    const queryParams: { [key: string]: string } = {};

    // Extract the main query parameters
    const queryMatch = url.match(/\?([^#]+)/);
    if (queryMatch) {
      const queryString = queryMatch[1];
      const params = new URLSearchParams(queryString);
      for (const [key, value] of params.entries()) {
        queryParams[key] = value;
      }
    }

    // Extract the hash query parameters
    const hashMatch = url.match(/#.*\?(.+)/);
    if (hashMatch) {
      const hashQueryString = hashMatch[1];
      const hashParams = new URLSearchParams(hashQueryString);
      for (const [key, value] of hashParams.entries()) {
        queryParams[key] = value;
      }
    }

    return queryParams;
  }

  private addMethod(path: string) {
    const parts = path.split('.');
    let current: Record<string, any> = this;

    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }

    current[parts[parts.length - 1]] = (...arg: any[]) => {
      if (this.withAppIdKeys.includes(path)) {
        arg.push(this.options.appId)
      }
      return new Promise((resolve, reject) => {
        this.callMain(path, arg, resolve, reject)
      })
    };
  }

  private addMethods(methods: string[]) {
    for (const method of methods) {
      this.addMethod(method)
    }
  }

  private callMain(
    method: string,
    params?: any[],
    success?: (event: any, data: MessageData) => any,
    error?: (event: any, data: MessageData) => any
  ) {
    this.callbackId++
    this.callbacks[this.callbackId] = {
      success, error
    }
    window.parent.postMessage({ from: `renderer:${this.options.appId}`, action: 'IPC_REQUEST', data: { callbackId: this.callbackId, method, params } }, '*')
  }

  async handleMessage(handleFunction: (event: any, data: MessageData) => any, name: string) {
    this.messageHandler[name] = handleFunction
  }

  async removeHandler(name?: string) {
    if (name && this.messageHandler[name]) {
      delete this.messageHandler[name]
    }
  }

  // 注册窗口之间的消息监听
  async handleWindowMessage(handleFunction: (event: any, data: MessageData) => any, name: string) {
    this.windowMessageHandler[name] = handleFunction
  }

  // 移除窗口之间的消息监听
  async removeWindowHandler(name?: string) {
    if (name && this.windowMessageHandler[name]) {
      delete this.windowMessageHandler[name]
    }
  }
}