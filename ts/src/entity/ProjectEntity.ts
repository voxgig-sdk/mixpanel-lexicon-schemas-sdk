
import { inspect } from 'node:util'

import { MixpanelLexiconSchemasEntityBase } from '../MixpanelLexiconSchemasEntityBase'

import type {
  MixpanelLexiconSchemasSDK,
} from '../MixpanelLexiconSchemasSDK'


import type {
  Operation,
  Context,
  Control,
} from '../types'

import type {
  Project,
} from '../MixpanelLexiconSchemasTypes'

// TODO: needs Entity superclass
class ProjectEntity extends MixpanelLexiconSchemasEntityBase<Project> {

  constructor(client: MixpanelLexiconSchemasSDK, entopts: any) {
    super(client, entopts)
    this.name = 'project'
    this.name_ = 'project'
    this.Name = 'Project'
  }


  make(this: ProjectEntity) {
    return new ProjectEntity(this._client, this.entopts())
  }







}


export {
  ProjectEntity
}
