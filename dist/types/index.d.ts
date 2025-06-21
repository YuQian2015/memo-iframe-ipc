import { IpcRendererEvent } from 'electron';
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
    currentTime: number;
};
export interface WhisperSegments {
    st: string;
    et: string;
    text: string;
    delete?: boolean;
    cut?: boolean;
}
export type NoteStatus = "downloading" | "ready" | "waiting" | "processing" | "canceled" | "success" | "delete";
export interface ITranscriptFile {
    id?: number | string;
    uuid: string;
    filename: string;
    hasAudio: boolean;
    hasVideo: boolean;
    hasThumb?: boolean;
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
    transcodeAudio?: boolean;
    transcriptSettings?: ITranscriptSetting;
    summary?: {
        content: string;
        st: string;
    }[];
    mindmap?: string;
    created_at?: string | null;
    updated_at?: string | null;
    translateResult?: WhisperSegments[];
    folderId?: number | string;
    multiTranslateResult?: {
        translateOrder: Array<string>;
        translateResult: Record<string, {
            enable: boolean;
            label: string;
            value: string;
            language: string;
            result: WhisperSegments[];
        }>;
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
    transcodeAudio?: boolean;
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
export type DownloadPlatform = 'YouTube' | 'Bilibili' | 'Xiaoyuzhou' | 'ApplePodcast' | 'Other';
export type DownloadStatus = 'ready' | 'waiting' | 'pending' | 'downloading' | 'completed' | 'error';
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
    type: 'audio:text:progress';
    data: {
        file: IAimInputFile;
        text: string;
    };
}
export interface AudioToTextEnd {
    type: 'audio:text:end';
    data: {
        file: IAimInputFile;
    };
}
export interface AudioToTextError {
    type: 'audio:text:error';
    data: {
        file: IAimInputFile;
        message: string;
    };
}
export interface MediaConvertProgress {
    type: 'media:encode:progress';
    data: {
        progress: number;
    };
}
export interface VideoConvertProgress {
    type: 'media:encode:video:progress';
    data: {
        progress: number;
    };
}
export interface ModelFolderExist {
    type: 'model:folder:exist';
    data: {
        path: string;
        exist: boolean;
    };
}
export interface ModelImportProgress {
    type: 'model:import:progress';
    data: {
        progress: number;
    };
}
export interface ModelMoveProgress {
    type: 'model:move:progress';
    data: {
        percent: number;
        total: number;
        currentFile?: string;
    };
}
export interface ModelMoveComplete {
    type: 'model:move:complete';
    data: {
        percent: number;
        total: number;
        currentFile?: string;
    };
}
export interface SettingChange {
    type: 'setting:change';
    data: Record<string, any>;
}
export interface FileDownloadProgress {
    type: 'file:download:progress';
    data: Progress;
}
export interface FileDownloadTotalProgress {
    type: 'file:download:total:progress';
    data: Progress;
}
export interface FileDownloadCompleted {
    type: 'file:download:completed';
    data: File;
}
export interface VideoDownloadProgress {
    type: 'video:download:progress';
    data: {
        percent?: number;
        total?: number;
        downloaded?: number;
        runningTime?: number;
        estimatedTimeLeft?: number;
        statusText?: string;
        downloadSpeed?: string;
        totalSize?: string;
        eta?: string;
    };
    downloadItem: DownloadModel;
}
export interface VideoDownloadCompleted {
    type: 'video:download:completed';
    data: any;
    thumbnails?: string[];
    downloadItem: DownloadModel;
    trackData?: Array<WhisperSegments[]>;
}
export interface VideoDownloadError {
    type: 'video:download:error';
    data: any;
    downloadItem: DownloadModel;
}
export interface VideoCutStart {
    type: 'video:cut:start';
    data: any;
}
export interface VideoCutProgress {
    type: 'video:cut:progress';
    data: any;
}
export interface VideoCutCompleted {
    type: 'video:cut:completed';
    data: any;
}
export interface VideoCutError {
    type: 'video:cut:error';
    data: any;
}
export interface VideoMergeStart {
    type: 'video:merge:start';
    data: any;
}
export interface VideoMergeProgress {
    type: 'video:merge:progress';
    data: any;
}
export interface VideoMergeCompleted {
    type: 'video:merge:completed';
    data: any;
}
export interface VideoMergeError {
    type: 'video:merge:error';
    data: any;
}
export interface VideoExportComplete {
    type: 'video:export:complete';
    data: any;
}
export type VideoClip = {
    start: number;
    end: number;
    isCut: boolean;
    percent?: number;
};
export interface DesktopSource {
    type: 'desktop:source';
    data: {
        id: string;
        name: string;
        icon?: string;
        thumbnail: string;
    };
}
export interface StartCheckSystemProxy {
    type: 'proxy:check:system:start';
    data: any;
}
export interface StopCheckSystemProxy {
    type: 'proxy:check:system:stop';
    data: any;
}
export type Message = AudioToTextProgress | ModelImportProgress | ModelMoveProgress | ModelMoveComplete | ModelFolderExist | MediaConvertProgress | AudioToTextEnd | VideoConvertProgress | SettingChange | FileDownloadProgress | FileDownloadTotalProgress | FileDownloadCompleted | VideoDownloadProgress | VideoDownloadCompleted | VideoDownloadError | VideoCutStart | VideoCutProgress | VideoCutCompleted | VideoCutError | VideoMergeStart | VideoMergeProgress | VideoMergeCompleted | VideoMergeError | VideoExportComplete | StartCheckSystemProxy | StopCheckSystemProxy;
export interface MessageData<T extends Message = Message> {
    type: T['type'];
    data: T['data'];
}
type GenerateUnionType<T extends string> = `window:${T}:req` | `window:${T}:res`;
export type WindowPostMessage = {
    type: GenerateUnionType<"player:screenshot"> | GenerateUnionType<"player:timestamp"> | GenerateUnionType<"view:pin"> | GenerateUnionType<"view:unpin"> | GenerateUnionType<"view:mini"> | GenerateUnionType<"view:normal"> | GenerateUnionType<"player:play"> | GenerateUnionType<"player:pause"> | GenerateUnionType<"player:seek"> | GenerateUnionType<"child:data"> | GenerateUnionType<"child:exec">;
    data: any;
    appId?: string;
};
export interface IMetadata {
    chapters: Array<any>;
    format: Record<string, any>;
    streams: Array<Record<string, any>>;
}
export interface IAimInputFile {
    id?: number;
    uuid: string;
    filename: string;
    hasAudio: boolean;
    hasVideo: boolean;
    filePath: string;
    metadata: IMetadata;
    ogFilename?: string;
    audioPath?: string;
    videoPath?: string;
    thumbnail?: string;
    canplayVideo?: boolean;
    content: string;
    convertResult: string;
    status: 'downloading' | 'ready' | 'waiting' | 'processing' | 'canceled' | 'success' | 'delete';
    downloadUrl?: string;
    downloadType?: DownloadPlatform;
    transcodeAudio?: boolean;
    transcriptSettings?: ITranscriptSetting;
    created_at?: string | null;
    updated_at?: string | null;
}
export interface ITranscriptSetting {
    transcriptType: 'local' | 'cloud';
    model: string;
    language: string;
    prompt: string;
    maxLen?: number;
    enableMaxLen?: boolean;
    translateLanguage?: 0 | 1;
    mergeAudio?: 0 | 1;
}
export interface AppSettings {
    OpenAI?: string;
    OpenAIHost?: string;
    showWelcome?: "0" | "1";
    darkMode?: "0" | "1";
    translateProvider?: SupportProviders;
    language?: string;
    httpProxy?: {
        port?: number;
        host?: string;
    };
    proxy?: {
        type: 'none' | 'system' | 'custom';
        proxy?: Array<{
            type?: 'http' | 'socks5';
            active?: boolean;
            port?: number;
            hostname?: string;
        }>;
    };
    volctrans?: {
        accessKeyId: string;
        secretKey: string;
    };
    DeepL?: {
        freeApi: boolean;
        authKey: string;
    };
    notion?: {
        secretKey?: string;
        pageId?: string;
    };
    modelDir?: string;
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
export type NoteFilterTypes = 'all' | 'audio' | 'video';
export type PartialByKey<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredByKey<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export type LanguageCode = "auto" | "zh_cn" | "zh_tw" | "yue" | "en" | "ja" | "ko" | "fr" | "es" | "ru" | "de" | "it" | "tr" | "pt" | "vi" | "id" | "th" | "ms" | "ar" | "hi";
export type SupportProviders = 'Google' | 'OpenAI' | 'Microsoft' | 'Volctrans' | 'DeepL';
export type MediaPreviewInfo = {
    title: string;
    url: string;
    image: string;
    type: DownloadPlatform;
    originalUrl: string;
    ext: string;
    quality?: string;
    qualityLabel?: string;
    trackUrl?: string;
    trackType?: string;
} | null;
export interface DocRequestData {
    find: Partial<DocModel>;
    create: Partial<DocModel>;
    update: RequiredByKey<Partial<DocModel>, 'id'>;
    detail: RequiredByKey<Partial<DocModel>, 'id'>;
    delete: RequiredByKey<DocModel, 'id'>;
}
export interface DownloadRequestData {
    find: Partial<DownloadModel>;
    create: Partial<DownloadModel>;
    update: RequiredByKey<Partial<DownloadModel>, 'id'>;
    detail: RequiredByKey<DownloadModel, 'id'>;
    delete: RequiredByKey<DownloadModel, 'id'>;
}
export interface BridgeInterface {
    isIframe: boolean;
    source: {
        url: string;
        query: Record<string, string>;
    };
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
export interface ControllerRequestData<T extends {
    id?: number | string;
}> {
    find: Partial<T>;
    create: Partial<T> | Partial<T>[];
    update: RequiredByKey<Partial<T>, "id">;
    detail: RequiredByKey<Partial<T>, "id">;
    delete: RequiredByKey<Partial<T>, "id">;
    remove: RequiredByKey<Partial<T>, "id">;
    backup: Partial<T>;
    batchDelete: RequiredByKey<Partial<T>, "id">[];
    batchUpdate: RequiredByKey<Partial<T>, "id">[];
}
export interface ControllerResponseData<T> {
    find: T[];
    create: T[];
    update: T[];
    detail: T;
    delete: T;
    remove: T;
    backup: T[];
    batchDelete: number | T[];
    batchUpdate: number;
}
export declare const LANGUAGE_MAP: {
    readonly af_heart: "a";
    readonly af_alloy: "a";
    readonly af_aoede: "a";
    readonly af_bella: "a";
    readonly af_jessica: "a";
    readonly af_kore: "a";
    readonly af_nicole: "a";
    readonly af_nova: "a";
    readonly af_river: "a";
    readonly af_sarah: "a";
    readonly af_sky: "a";
    readonly am_adam: "a";
    readonly am_echo: "a";
    readonly am_eric: "a";
    readonly am_fenrir: "a";
    readonly am_liam: "a";
    readonly am_michael: "a";
    readonly am_onyx: "a";
    readonly am_puck: "a";
    readonly am_santa: "a";
    readonly bf_alice: "b";
    readonly bf_emma: "b";
    readonly bf_isabella: "b";
    readonly bf_lily: "b";
    readonly bm_daniel: "b";
    readonly bm_fable: "b";
    readonly bm_george: "b";
    readonly bm_lewis: "b";
    readonly jf_alpha: "j";
    readonly jf_gongitsune: "j";
    readonly jf_nezumi: "j";
    readonly jf_tebukuro: "j";
    readonly jm_kumo: "j";
    readonly zf_xiaobei: "z";
    readonly zf_xiaoni: "z";
    readonly zf_xiaoxiao: "z";
    readonly zf_xiaoyi: "z";
    readonly zm_yunjian: "z";
    readonly zm_yunxi: "z";
    readonly zm_yunxia: "z";
    readonly zm_yunyang: "z";
    readonly ef_dora: "e";
    readonly em_alex: "e";
    readonly em_santa: "e";
    readonly ff_siwis: "f";
    readonly hf_alpha: "h";
    readonly hf_beta: "h";
    readonly hm_omega: "h";
    readonly hm_psi: "h";
    readonly if_sara: "i";
    readonly im_nicola: "i";
    readonly pf_dora: "p";
    readonly pm_alex: "p";
    readonly pm_santa: "p";
};
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
    loopCount: number;
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
        setItem: (key: string, value: any) => Promise<void>;
        getItem: (key: string) => Promise<any>;
        removeItem: (key: string) => Promise<void>;
        clear: () => Promise<void>;
        keys: () => Promise<string[]>;
    };
    transcriptionData: <T extends keyof ControllerRequestData<NoteModel>>(method: T, data: ControllerRequestData<NoteModel>[T]) => Promise<ControllerResponseData<NoteModel>[T]>;
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
            filename: string;
            data: Buffer | string | any;
            isBase64?: boolean;
            open?: boolean;
        }) => Promise<boolean>;
        readPluginFile: (data: {
            filename: string;
            encode?: BufferEncoding;
        }) => Promise<string | Buffer>;
    };
    tts: {
        kokoroSynthesize: (data: KokoroSynthesizeParams) => Promise<{
            success: boolean;
            data: Buffer | string;
        }>;
    };
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
    };
    handleMessage: (handleFunction: (event: IpcRendererEvent, data: MessageData) => any, name: string) => Promise<void>;
    removeHandler: (name?: string) => Promise<void>;
    handleWindowMessage: (handleFunction: (event: IpcRendererEvent, data: MessageData) => any, name: string) => Promise<void>;
    removeWindowHandler: (name?: string) => Promise<void>;
}
export {};
