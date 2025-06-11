import { MessageData, IElectronAPI } from './types';
export declare class Bridge implements Partial<IElectronAPI> {
    [key: string]: any;
    private windowMessageHandler;
    private messageHandler;
    private callbackId;
    private callbacks;
    isIframe: boolean;
    source: {
        url: string;
        query: Record<string, string>;
    };
    private defaultOptions;
    options: {
        methods: string[];
        appId: string;
    };
    constructor(options: {
        methods: string[];
        appId: string;
    });
    private init;
    private getQueryParams;
    private addMethod;
    private addMethods;
    private callMain;
    player: {
        play: () => Promise<void>;
        pause: () => Promise<void>;
    };
    handleMessage(handleFunction: (event: any, data: MessageData) => any, name: string): Promise<void>;
    removeHandler(name?: string): Promise<void>;
    handleWindowMessage(handleFunction: (event: any, data: MessageData) => any, name: string): Promise<void>;
    removeWindowHandler(name?: string): Promise<void>;
}
