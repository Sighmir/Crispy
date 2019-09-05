import { MarkovGenerateOptions, MarkovResult } from "markov-strings";
interface ICrispyOptions {
    [key: string]: any;
    stateSize: number;
    minLength: number;
    minWords: number;
    minScore: number;
    maxTries?: number;
    prng?: () => number;
    filter?: (result: MarkovResult) => boolean;
}
export declare class Crispy {
    db: any;
    user: any;
    options: ICrispyOptions;
    cooldown: Set<string>;
    private _api;
    private _url;
    private _token;
    private _globalCorpus;
    private _userCorpus;
    private _events;
    private _io;
    constructor(token: string, options?: ICrispyOptions);
    readonly io: SocketIOClient.Socket;
    getEventPrefix(eventName: string): string | null;
    connect(): Promise<unknown>;
    join(room: string, user?: object): SocketIOClient.Socket;
    getIgnoreList(roomName: string): SocketIOClient.Socket;
    checkYoutube(notify?: boolean): SocketIOClient.Socket;
    handleChange(handle: string): SocketIOClient.Socket;
    isStillJoined(room: string): SocketIOClient.Socket;
    message(room: string, message: string): SocketIOClient.Socket;
    command(room: string, command: string, value?: string): SocketIOClient.Socket;
    on(event: string, handler: (data?: any) => void): SocketIOClient.Emitter;
    emit(event: string, data?: any): void;
    getCurrentUser(): Promise<unknown>;
    getUserProfile(userId: string): Promise<unknown>;
    getUnreadMessages(userId: string): Promise<unknown>;
    checkCanBroadcast(room: string): Promise<unknown>;
    getRoomEmojis(room: string): Promise<unknown>;
    getRoomPlaylist(room: string): Promise<unknown>;
    searchYoutube(query: string): Promise<unknown>;
    getTurnServer(): Promise<unknown>;
    getJanusToken(): Promise<unknown>;
    getJanusEndpoints(): Promise<unknown>;
    addUniqueMessage(message: string, user?: string): boolean;
    addMessage(message: string, user?: string): void;
    getMessages(user?: string): any;
    hasUser(user: string): any;
    getUsers(): any;
    generateMessage(user?: string, options?: MarkovGenerateOptions): any;
    cleanCooldown(): void;
    private _initCorpus;
    private _buildCorpus;
    private _requestPromise;
}
export {};
//# sourceMappingURL=crispy.d.ts.map