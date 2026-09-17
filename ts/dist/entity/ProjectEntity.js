"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectEntity = void 0;
const MixpanelLexiconSchemasEntityBase_1 = require("../MixpanelLexiconSchemasEntityBase");
// TODO: needs Entity superclass
class ProjectEntity extends MixpanelLexiconSchemasEntityBase_1.MixpanelLexiconSchemasEntityBase {
    constructor(client, entopts) {
        super(client, entopts);
        this.name = 'project';
        this.name_ = 'project';
        this.Name = 'Project';
    }
    make() {
        return new ProjectEntity(this._client, this.entopts());
    }
}
exports.ProjectEntity = ProjectEntity;
//# sourceMappingURL=ProjectEntity.js.map