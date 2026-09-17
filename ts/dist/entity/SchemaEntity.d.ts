import { MixpanelLexiconSchemasEntityBase } from '../MixpanelLexiconSchemasEntityBase';
import type { MixpanelLexiconSchemasSDK } from '../MixpanelLexiconSchemasSDK';
import type { Control } from '../types';
import type { Schema, SchemaLoadMatch, SchemaListMatch, SchemaRemoveMatch } from '../MixpanelLexiconSchemasTypes';
declare class SchemaEntity extends MixpanelLexiconSchemasEntityBase<Schema> {
    constructor(client: MixpanelLexiconSchemasSDK, entopts: any);
    make(this: SchemaEntity): SchemaEntity;
    load(this: any, reqmatch?: SchemaLoadMatch, ctrl?: Control): Promise<SchemaEntity>;
    list(this: any, reqmatch?: SchemaListMatch, ctrl?: Control): Promise<SchemaEntity[]>;
    remove(this: any, reqmatch?: SchemaRemoveMatch, ctrl?: Control): Promise<SchemaEntity>;
}
export { SchemaEntity };
