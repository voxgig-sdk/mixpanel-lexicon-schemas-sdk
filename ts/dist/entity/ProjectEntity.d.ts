import { MixpanelLexiconSchemasEntityBase } from '../MixpanelLexiconSchemasEntityBase';
import type { MixpanelLexiconSchemasSDK } from '../MixpanelLexiconSchemasSDK';
import type { Project } from '../MixpanelLexiconSchemasTypes';
declare class ProjectEntity extends MixpanelLexiconSchemasEntityBase<Project> {
    constructor(client: MixpanelLexiconSchemasSDK, entopts: any);
    make(this: ProjectEntity): ProjectEntity;
}
export { ProjectEntity };
