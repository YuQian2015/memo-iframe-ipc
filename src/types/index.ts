import type { IpcRendererEvent } from "electron";

interface Progress {
  percent: number;
  transferredBytes: number;
  totalBytes: number;
}

interface File {
  filename: string;
  path: string;
  fileSize: number;
  mimeType: string;
  url: string;
}

export type PlayerTimeUpdate = {
  currentTime: number
}

export interface WhisperSegments {
  st: string
  et: string
  text: string
  delete?: boolean
  cut?: boolean
}

// downloading 等待下载中
// ready 选择文件完成，已经获取元信息
// waiting 转换设置完成，等待开始转换
// processing 转写中
// canceled 已经取消转换
// success 转换成功
// delete 已删除
export type NoteStatus =
  | "downloading"
  | "ready"
  | "waiting"
  | "processing"
  | "canceled"
  | "success"
  | "delete";

export interface ITranscriptFile {
  id?: number | string;
  uuid: string;
  filename: string;
  hasAudio: boolean;
  hasVideo: boolean;
  hasThumb?: boolean; // 音频文件是否存在封面图
  filePath: string;
  metadata: IMetadata;
  ogFilename?: string;
  audioPath?: string;
  videoPath?: string;
  mp3Path?: string;
  thumbnail?: string;
  canplayVideo?: boolean;
  convertResult?: WhisperSegments[];
  status: NoteStatus;
  workspaceId?: number | string;
  downloadUrl?: string;
  downloadType?: DownloadPlatform;
  transcodeAudio?: boolean; // 是否已经转换过音频
  transcriptSettings?: ITranscriptSetting;
  summary?: { content: string; st: string }[];
  mindmap?: string;
  created_at?: string | null;
  updated_at?: string | null;
  translateResult?: WhisperSegments[];
  folderId?: number | string;
  multiTranslateResult?: {
    translateOrder: Array<string>;
    translateResult: Record<
      string,
      {
        enable: boolean;
        label: string;
        value: string;
        language: string;
        result: WhisperSegments[];
      }
    >;
  };
  _temp?: boolean;
}

export interface NoteModel {
  id?: number | string;
  uuid: string;
  filename: string;
  hasAudio: boolean;
  hasVideo: boolean;
  filePath: string;
  metadata: string;
  convertResult: string;
  translateResult?: string;
  multiTranslateResult?: string;
  status: NoteStatus;
  workspaceId?: number | string;
  downloadUrl?: string;
  downloadType?: DownloadPlatform;
  transcodeAudio?: boolean; // 是否已经转换过音频
  transcriptSettings?: string;
  ogFilename?: string;
  audioPath?: string;
  videoPath?: string;
  thumbnail?: any;
  summary?: string;
  mindmap?: string;
  folderId?: number | string;
  canplayVideo?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface TagModel {
  id: number;
  name: string;
}

export type DownloadPlatform = 'YouTube' | 'Bilibili' | 'Xiaoyuzhou' | 'ApplePodcast' | 'Other'
export type DownloadStatus = 'ready' | 'waiting' | 'pending' | 'downloading' | 'completed' | 'error'

export interface DownloadModel {
  id?: number;
  title: string;
  filename: string;
  localFilename: string;
  url: string;
  description?: string;
  thumbnail?: string;
  platform?: DownloadPlatform;
  quality?: string;
  qualityLabel?: string;
  ext?: string;
  status?: DownloadStatus;
  progress?: number;
  trackUrl?: string;
  trackType?: string;
  trackLang?: string;
  trackData?: string;
  transcriptSettings?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface WorkspaceModel {
  id?: number;
  name: string;
  folder: string;
  icon?: string;
  thumbnail?: string;
  description?: string;
  backgroundColor?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface DocModel {
  id?: number | string;
  title: string;
  localFilename: string;
  workspaceId: number | string;
  noteId?: number | string;
  folderId?: number | string;
  icon?: string;
  thumbnail?: string;
  description?: string;
  content?: string;
  created_at?: string | null;
  updated_at?: string | null;
}


export interface TagModel {
  id: number;
  name: string;
}

export interface AudioToTextProgress {
  type: 'audio:text:progress'
  data: { file: IAimInputFile, text: string }
}

export interface AudioToTextEnd {
  type: 'audio:text:end'
  data: { file: IAimInputFile }
}

export interface AudioToTextError {
  type: 'audio:text:error'
  data: { file: IAimInputFile, message: string }
}

export interface MediaConvertProgress {
  type: 'media:encode:progress'
  data: { progress: number }
}

export interface VideoConvertProgress {
  type: 'media:encode:video:progress'
  data: { progress: number }
}

export interface ModelFolderExist {
  type: 'model:folder:exist'
  data: {
    path: string,
    exist: boolean
  }
}

export interface ModelImportProgress {
  type: 'model:import:progress'
  data: { progress: number }
}

export interface ModelMoveProgress {
  type: 'model:move:progress'
  data: { percent: number, total: number, currentFile?: string }
}

export interface ModelMoveComplete {
  type: 'model:move:complete'
  data: { percent: number, total: number, currentFile?: string }
}

export interface SettingChange {
  type: 'setting:change'
  data: Record<string, any>
}

export interface FileDownloadProgress {
  type: 'file:download:progress'
  data: Progress
}

export interface FileDownloadTotalProgress {
  type: 'file:download:total:progress'
  data: Progress
}

export interface FileDownloadCompleted {
  type: 'file:download:completed'
  data: File
}

export interface VideoDownloadProgress {
  type: 'video:download:progress'
  data: {
    percent?: number
    total?: number
    downloaded?: number
    runningTime?: number
    estimatedTimeLeft?: number
    statusText?: string
    downloadSpeed?: string
    totalSize?: string
    eta?: string
  },
  downloadItem: DownloadModel
}

export interface VideoDownloadCompleted {
  type: 'video:download:completed'
  data: any,
  thumbnails?: string[],
  downloadItem: DownloadModel
  trackData?: Array<WhisperSegments[]>
}

export interface VideoDownloadError {
  type: 'video:download:error'
  data: any,
  downloadItem: DownloadModel
}

export interface VideoCutStart {
  type: 'video:cut:start'
  data: any
}

export interface VideoCutProgress {
  type: 'video:cut:progress'
  data: any
}

export interface VideoCutCompleted {
  type: 'video:cut:completed'
  data: any
}

export interface VideoCutError {
  type: 'video:cut:error'
  data: any
}

export interface VideoMergeStart {
  type: 'video:merge:start'
  data: any
}

export interface VideoMergeProgress {
  type: 'video:merge:progress'
  data: any
}

export interface VideoMergeCompleted {
  type: 'video:merge:completed'
  data: any
}

export interface VideoMergeError {
  type: 'video:merge:error'
  data: any
}

export interface VideoExportComplete {
  type: 'video:export:complete'
  data: any
}

// 视频片段定义
export type VideoClip = {
  start: number // 视频片段开始时间
  end: number // 视频片段结束时间
  isCut: boolean // 是否裁剪
  percent?: number // 所占百分比
}

export interface DesktopSource {
  type: 'desktop:source'
  data: {
    id: string,
    name: string,
    icon?: string,
    thumbnail: string
  }
}

export interface StartCheckSystemProxy {
  type: 'proxy:check:system:start'
  data: any
}

export interface StopCheckSystemProxy {
  type: 'proxy:check:system:stop'
  data: any
}

export type Message = AudioToTextProgress | ModelImportProgress | ModelMoveProgress | ModelMoveComplete | ModelFolderExist
  | MediaConvertProgress | AudioToTextEnd | VideoConvertProgress | SettingChange
  | FileDownloadProgress | FileDownloadTotalProgress | FileDownloadCompleted
  | VideoDownloadProgress | VideoDownloadCompleted | VideoDownloadError
  | VideoCutStart | VideoCutProgress | VideoCutCompleted | VideoCutError
  | VideoMergeStart | VideoMergeProgress | VideoMergeCompleted | VideoMergeError
  | VideoExportComplete
  | StartCheckSystemProxy | StopCheckSystemProxy

export interface MessageData<T extends Message = Message> {
  type: T['type']
  data: T['data']
}

type GenerateUnionType<T extends string> =
  | `window:${T}:req`
  | `window:${T}:res`;

export type WindowPostMessage = {
  // 渲染进程之间通信消息
  // window:功能:动作:请求|响应
  type:
  | GenerateUnionType<"player:screenshot">
  | GenerateUnionType<"player:timestamp">
  | GenerateUnionType<"view:pin">
  | GenerateUnionType<"view:unpin">
  | GenerateUnionType<"view:mini">
  | GenerateUnionType<"view:normal">
  | GenerateUnionType<"player:play">
  | GenerateUnionType<"player:pause">
  | GenerateUnionType<"player:seek">
  | GenerateUnionType<"child:data">
  | GenerateUnionType<"child:exec">;
  data: any;
  appId?: string;
};

export interface IMetadata {
  chapters: Array<any>
  format: Record<string, any>
  streams: Array<Record<string, any>>
}

export interface IAimInputFile {
  id?: number
  uuid: string
  filename: string
  hasAudio: boolean
  hasVideo: boolean
  filePath: string
  metadata: IMetadata
  ogFilename?: string
  audioPath?: string
  videoPath?: string
  thumbnail?: string
  canplayVideo?: boolean
  content: string
  convertResult: string
  // ready 选择文件完成，已经获取元信息
  // waiting 转换设置完成，等待开始转换
  // processing 转换中
  // canceled 已经取消转换
  // success 转换成功
  status: 'downloading' | 'ready' | 'waiting' | 'processing' | 'canceled' | 'success' | 'delete';
  downloadUrl?: string;
  downloadType?: DownloadPlatform;
  transcodeAudio?: boolean; // 是否已经转换过音频
  transcriptSettings?: ITranscriptSetting
  created_at?: string | null
  updated_at?: string | null
}

export interface ITranscriptSetting {
  transcriptType: 'local' | 'cloud'
  model: string
  language: string
  prompt: string
  maxLen?: number
  enableMaxLen?: boolean
  translateLanguage?: 0 | 1
  mergeAudio?: 0 | 1
}

export interface AppSettings {
  OpenAI?: string
  OpenAIHost?: string
  showWelcome?: "0" | "1"
  darkMode?: "0" | "1"
  translateProvider?: SupportProviders
  language?: string
  httpProxy?: {
    port?: number
    host?: string
  }
  proxy?: {
    type: 'none' | 'system' | 'custom',
    proxy?: Array<{
      type?: 'http' | 'socks5',
      active?: boolean
      port?: number
      hostname?: string
    }>
  }
  volctrans?: {
    accessKeyId: string, secretKey: string
  },
  DeepL?: {

    freeApi: boolean, authKey: string
  }
  notion?: {
    secretKey?: string
    pageId?: string
  }
  modelDir?: string
}

export interface IModel {
  label: string;
  value: string;
  size: string;
  description: string;
  disabled: boolean;
  downloadLink: string;
  speed: number;
  quality: number;
  download: boolean;
  lang?: string;
}

export interface AppFolder {
  basePath: string;
  model: Path;
  temp: Path;
  db: Path;
  conf: Path;
  log: Path;
  migrations: Path;
}

export interface Path {
  path: string;
  exist: boolean;
}

export type NoteFilterTypes = 'all' | 'audio' | 'video'

export type PartialByKey<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredByKey<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type LanguageCode =
  | "auto" // 自动检测
  | "zh_cn" // 简体中文
  | "zh_tw" // 繁体中文
  | "yue" // 粤语
  | "en" // 英语
  | "ja" // 日语
  | "ko" // 韩语
  | "fr" // 法语
  | "es" // 西班牙语
  | "ru" // 俄语
  | "de" // 德语
  | "it" // 意大利语
  | "tr" // 土耳其语
  | "pt" // 葡萄牙语
  | "vi" // 越南语
  | "id" // 印度尼西亚语
  | "th" // 泰语
  | "ms" // 马来西亚语
  | "ar" // 阿拉伯语
  | "hi"; // 印地语(印度的官方语言)

export type SupportProviders = 'Google' | 'OpenAI' | 'Microsoft' | 'Volctrans' | 'DeepL'

export type MediaPreviewInfo = {
  title: string
  url: string
  image: string
  type: DownloadPlatform
  originalUrl: string // 用户输入的原始链接
  ext: string
  quality?: string
  qualityLabel?: string
  trackUrl?: string
  trackType?: string
} | null

export interface DocRequestData {
  find: Partial<DocModel>
  create: Partial<DocModel>
  update: RequiredByKey<Partial<DocModel>, 'id'>
  detail: RequiredByKey<Partial<DocModel>, 'id'>
  delete: RequiredByKey<DocModel, 'id'>
}

export interface DownloadRequestData {
  find: Partial<DownloadModel>
  create: Partial<DownloadModel>
  update: RequiredByKey<Partial<DownloadModel>, 'id'>
  detail: RequiredByKey<DownloadModel, 'id'>
  delete: RequiredByKey<DownloadModel, 'id'>
}


export interface BridgeInterface {
  isIframe: boolean
  source: {
    url: string
    query: Record<string, string>
  }
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  prompt?: string;
  model?: string;
  temperature?: number;
  provider?: string;
  uuid?: string;
}

export interface ControllerRequestData<T extends { id?: number | string }> {
  find: Partial<T>
  create: Partial<T> | Partial<T>[]
  update: RequiredByKey<Partial<T>, "id">
  detail: RequiredByKey<Partial<T>, "id">
  delete: RequiredByKey<Partial<T>, "id">
  remove: RequiredByKey<Partial<T>, "id">
  backup: Partial<T>
  batchDelete: RequiredByKey<Partial<T>, "id">[]
  batchUpdate: RequiredByKey<Partial<T>, "id">[]
}

export interface ControllerResponseData<T> {
  find: T[]
  create: T[]
  update: T[]
  detail: T
  delete: T
  remove: T
  backup: T[]
  batchDelete: number | T[]
  batchUpdate: number
}

// 语言代码映射
export const LANGUAGE_MAP = {
  // 美式英语 (American English)
  // 女性声音
  af_heart: "a",    // 🚺❤️ Target Quality: A
  af_alloy: "a",    // 🚺 Target Quality: B, Training: MM minutes, Grade: C
  af_aoede: "a",    // 🚺 Target Quality: B, Training: H hours, Grade: C+
  af_bella: "a",    // 🚺🔥 Target Quality: A, Training: HH hours, Grade: A-
  af_jessica: "a",  // 🚺 Target Quality: C, Training: MM minutes, Grade: D
  af_kore: "a",     // 🚺 Target Quality: B, Training: H hours, Grade: C+
  af_nicole: "a",   // 🚺🎧 Target Quality: B, Training: HH hours, Grade: B-
  af_nova: "a",     // 🚺 Target Quality: B, Training: MM minutes, Grade: C
  af_river: "a",    // 🚺 Target Quality: C, Training: MM minutes, Grade: D
  af_sarah: "a",    // 🚺 Target Quality: B, Training: H hours, Grade: C+
  af_sky: "a",      // 🚺 Target Quality: B, Training: M minutes, Grade: C-
  // 男性声音
  am_adam: "a",     // 🚹 Target Quality: D, Training: H hours, Grade: F+
  am_echo: "a",     // 🚹 Target Quality: C, Training: MM minutes, Grade: D
  am_eric: "a",     // 🚹 Target Quality: C, Training: MM minutes, Grade: D
  am_fenrir: "a",   // 🚹 Target Quality: B, Training: H hours, Grade: C+
  am_liam: "a",     // 🚹 Target Quality: C, Training: MM minutes, Grade: D
  am_michael: "a",  // 🚹 Target Quality: B, Training: H hours, Grade: C+
  am_onyx: "a",     // 🚹 Target Quality: C, Training: MM minutes, Grade: D
  am_puck: "a",     // 🚹 Target Quality: B, Training: H hours, Grade: C+
  am_santa: "a",    // 🚹 Target Quality: C, Training: M minutes, Grade: D-

  // 英式英语 (British English)
  // 女性声音
  bf_alice: "b",    // 🚺 Target Quality: C, Training: MM minutes, Grade: D
  bf_emma: "b",     // 🚺 Target Quality: B, Training: HH hours, Grade: B-
  bf_isabella: "b", // 🚺 Target Quality: B, Training: MM minutes, Grade: C
  bf_lily: "b",     // 🚺 Target Quality: C, Training: MM minutes, Grade: D
  // 男性声音
  bm_daniel: "b",   // 🚹 Target Quality: C, Training: MM minutes, Grade: D
  bm_fable: "b",    // 🚹 Target Quality: B, Training: MM minutes, Grade: C
  bm_george: "b",   // 🚹 Target Quality: B, Training: MM minutes, Grade: C
  bm_lewis: "b",    // 🚹 Target Quality: C, Training: H hours, Grade: D+

  // 日语 (Japanese)
  // 女性声音
  jf_alpha: "j",    // 🚺 Target Quality: B, Training: H hours, Grade: C+
  jf_gongitsune: "j", // 🚺 Target Quality: B, Training: MM minutes, Grade: C
  jf_nezumi: "j",   // 🚺 Target Quality: B, Training: M minutes, Grade: C-
  jf_tebukuro: "j", // 🚺 Target Quality: B, Training: MM minutes, Grade: C
  // 男性声音
  jm_kumo: "j",     // 🚹 Target Quality: B, Training: M minutes, Grade: C-

  // 中文 (Mandarin Chinese)
  // 女性声音
  zf_xiaobei: "z",  // 🚺 Target Quality: C, Training: MM minutes, Grade: D
  zf_xiaoni: "z",   // 🚺 Target Quality: C, Training: MM minutes, Grade: D
  zf_xiaoxiao: "z", // 🚺 Target Quality: C, Training: MM minutes, Grade: D
  zf_xiaoyi: "z",   // 🚺 Target Quality: C, Training: MM minutes, Grade: D
  // 男性声音
  zm_yunjian: "z",  // 🚹 Target Quality: C, Training: MM minutes, Grade: D
  zm_yunxi: "z",    // 🚹 Target Quality: C, Training: MM minutes, Grade: D
  zm_yunxia: "z",   // 🚹 Target Quality: C, Training: MM minutes, Grade: D
  zm_yunyang: "z",  // 🚹 Target Quality: C, Training: MM minutes, Grade: D

  // 西班牙语 (Spanish)
  ef_dora: "e",     // 🚺 Spanish female voice
  em_alex: "e",     // 🚹 Spanish male voice
  em_santa: "e",    // 🚹 Spanish male voice

  // 法语 (French)
  ff_siwis: "f",    // 🚺 Target Quality: B, Training: <11 hours, Grade: B-

  // 印地语 (Hindi)
  hf_alpha: "h",    // 🚺 Target Quality: B, Training: MM minutes, Grade: C
  hf_beta: "h",     // 🚺 Target Quality: B, Training: MM minutes, Grade: C
  hm_omega: "h",    // 🚹 Target Quality: B, Training: MM minutes, Grade: C
  hm_psi: "h",      // 🚹 Target Quality: B, Training: MM minutes, Grade: C

  // 意大利语 (Italian)
  if_sara: "i",     // 🚺 Target Quality: B, Training: MM minutes, Grade: C
  im_nicola: "i",   // 🚹 Target Quality: B, Training: MM minutes, Grade: C

  // 巴西葡萄牙语 (Brazilian Portuguese)
  pf_dora: "p",     // 🚺 Brazilian Portuguese female voice
  pm_alex: "p",     // 🚹 Brazilian Portuguese male voice
  pm_santa: "p"     // 🚹 Brazilian Portuguese male voice
} as const;

// 声音类型定义
// https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md#american-english
export type KokoroVoice = keyof typeof LANGUAGE_MAP;

export interface KokoroSynthesizeParams {
  text: string;
  voice: KokoroVoice;
  speed: number;
  textList?: Array<{
      text: string;
      voice: KokoroVoice;
      speed: number;
  }>;
  outputFile?: string;
  device?: "cuda" | "cpu" | "mps";
  localModel?: string;
  localConfig?: string;
  mpsFallback?: boolean;
  returnBuffer?: boolean;
}

export interface PlayParams {
  timeRanges: {
    start: number;
    end: number;
  }[];
  loopCount: number; // 0 表示永久循环
}

export interface IElectronAPI extends BridgeInterface {
  isMac: boolean;
  isWindows: boolean;
  isLinux: boolean;
  platform: 'win32' | 'darwin' | 'linux';
  localStorage: {
    setItem: (key: string, value: string) => Promise<void>;
    getItem: (key: string) => Promise<string>;
    removeItem: (key: string) => Promise<void>;
    clear: () => Promise<void>;
  };
  memoryStorage: {
    setItem: (key: string, value: any) => Promise<void>;
    getItem: (key: string) => Promise<any>;
    removeItem: (key: string) => Promise<void>;
    clear: () => Promise<void>;
  };
  storage: {
    setItem: (key: string, value: any) => Promise<void>
    getItem: (key: string) => Promise<any>
    removeItem: (key: string) => Promise<void>
    clear: () => Promise<void>;
    keys: () => Promise<string[]>;
  }
  transcriptionData: <T extends keyof ControllerRequestData<NoteModel>>(
    method: T,
    data: ControllerRequestData<NoteModel>[T],
  ) => Promise<ControllerResponseData<NoteModel>[T]>;
  chat: {
    chat: (data: ChatRequest) => Promise<string>;
    getProviders: () => Promise<{
      value: string;
      label: string;
    }[]>;
    getModels: (provider: string) => Promise<{
      value: string;
      label: string;
    }[]>;
  };
  file: {
    checkPluginFileExist: (filename: string) => Promise<boolean>;
    savePluginFile: (data: {
      filename: string, // 包含后缀
      data: Buffer | string | any
      isBase64?: boolean
      open?: boolean
    }) => Promise<boolean>;
    readPluginFile: (data: {
      filename: string, // 包含后缀
      encode?: BufferEncoding
    }) => Promise<string | Buffer>;
  },
  tts: {
    kokoroSynthesize: (data: KokoroSynthesizeParams) => Promise<{ success: boolean, data: Buffer | string }>;
  },
  browser: {
    windowPostMessage: (data: WindowPostMessage) => () => Promise<unknown>;
  };
  player: {
    play: (params?: PlayParams) => Promise<void>;
    pause: () => Promise<void>;
    seek: (time: number) => Promise<void>;
    seekForward: (seconds?: number) => Promise<void>;
    seekBackward: (seconds?: number) => Promise<void>;
    getCurrentTime: () => Promise<number>;
    screenshot: () => Promise<string>;
    // getDuration: () => Promise<number>;
    // getVolume: () => Promise<number>;
    // setVolume: (volume: number) => Promise<void>;
    // getMute: () => Promise<boolean>;
    // setMute: (mute: boolean) => Promise<void>;
    // getPlaybackRate: () => Promise<number>;
    // setPlaybackRate: (rate: number) => Promise<void>;
  },
  handleMessage: (handleFunction: (event: IpcRendererEvent, data: MessageData) => any, name: string) => Promise<void>;
  removeHandler: (name?: string) => Promise<void>;
  handleWindowMessage: (handleFunction: (event: IpcRendererEvent, data: MessageData) => any, name: string) => Promise<void>;
  removeWindowHandler: (name?: string) => Promise<void>;
}
