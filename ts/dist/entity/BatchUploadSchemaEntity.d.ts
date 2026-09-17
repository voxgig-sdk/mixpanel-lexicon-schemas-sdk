import { MixpanelLexiconSchemasEntityBase } from '../MixpanelLexiconSchemasEntityBase';
import type { MixpanelLexiconSchemasSDK } from '../MixpanelLexiconSchemasSDK';
import type { Control } from '../types';
import type { BatchUploadSchema, BatchUploadSchemaCreateData } from '../MixpanelLexiconSchemasTypes';
declare class BatchUploadSchemaEntity extends MixpanelLexiconSchemasEntityBase<BatchUploadSchema> {
    constructor(client: MixpanelLexiconSchemasSDK, entopts: any);
    make(this: BatchUploadSchemaEntity): BatchUploadSchemaEntity;
    create(this: any, reqdata?: BatchUploadSchemaCreateData, ctrl?: Control): Promise<BatchUploadSchemaEntity>;
}
export { BatchUploadSchemaEntity };
