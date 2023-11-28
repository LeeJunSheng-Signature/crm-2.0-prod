import { JSONObject } from '@loopback/core';
export declare class XmlToJsonService {
    constructor();
    parseString(text: string): Promise<JSONObject>;
}
