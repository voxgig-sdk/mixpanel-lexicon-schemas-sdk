import { BatchUploadSchemaEntity } from './entity/BatchUploadSchemaEntity';
import { ProjectEntity } from './entity/ProjectEntity';
import { SchemaEntity } from './entity/SchemaEntity';
import { UploadSchemaEntity } from './entity/UploadSchemaEntity';
export type * from './MixpanelLexiconSchemasTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { MixpanelLexiconSchemasEntityBase } from './MixpanelLexiconSchemasEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class MixpanelLexiconSchemasSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    BatchUploadSchema(entopts?: Record<string, any>): BatchUploadSchemaEntity;
    Project(entopts?: Record<string, any>): ProjectEntity;
    Schema(entopts?: Record<string, any>): SchemaEntity;
    UploadSchema(entopts?: Record<string, any>): UploadSchemaEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): MixpanelLexiconSchemasSDK;
    tester(testopts?: any, sdkopts?: any): MixpanelLexiconSchemasSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof MixpanelLexiconSchemasSDK;
export { stdutil, config, BaseFeature, MixpanelLexiconSchemasEntityBase, MixpanelLexiconSchemasSDK, SDK, };
