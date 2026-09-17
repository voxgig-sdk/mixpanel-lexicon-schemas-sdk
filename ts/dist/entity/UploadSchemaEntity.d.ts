import { MixpanelLexiconSchemasEntityBase } from '../MixpanelLexiconSchemasEntityBase';
import type { MixpanelLexiconSchemasSDK } from '../MixpanelLexiconSchemasSDK';
import type { Control } from '../types';
import type { UploadSchema, UploadSchemaCreateData } from '../MixpanelLexiconSchemasTypes';
declare class UploadSchemaEntity extends MixpanelLexiconSchemasEntityBase<UploadSchema> {
    constructor(client: MixpanelLexiconSchemasSDK, entopts: any);
    make(this: UploadSchemaEntity): UploadSchemaEntity;
    create(this: any, reqdata?: UploadSchemaCreateData, ctrl?: Control): Promise<UploadSchemaEntity>;
}
export { UploadSchemaEntity };
