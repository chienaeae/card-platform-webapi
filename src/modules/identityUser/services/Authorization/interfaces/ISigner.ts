export interface ISigner {
    verify<payloadObject>(token: string): Promise<payloadObject>;
    sign(payload: any): Promise<string>;
}

