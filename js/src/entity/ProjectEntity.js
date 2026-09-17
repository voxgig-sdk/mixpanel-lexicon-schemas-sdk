
const { inspect } = require('node:util')

const { MixpanelLexiconSchemasEntityBase } = require('../MixpanelLexiconSchemasEntityBase')


// TODO: needs Entity superclass
class ProjectEntity extends MixpanelLexiconSchemasEntityBase {

  constructor(client, entopts) {
    super(client, entopts)
    this.name = 'project'
    this.name_ = 'project'
    this.Name = 'Project'
  }


  make() {
    return new ProjectEntity(this._client, this.entopts())
  }







}


module.exports = {
  ProjectEntity
}
