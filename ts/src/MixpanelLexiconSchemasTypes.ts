// Typed models for the MixpanelLexiconSchemas SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface BatchUploadSchema {
  added?: number
  deleted?: number
  entries: any[]
  truncate?: boolean
}

export interface BatchUploadSchemaCreateData {
  project_id: number
  added?: number
  deleted?: number
  entries: any[]
  truncate?: boolean
}

export interface Project {
}

export interface Schema {
  description?: string
  entityType: string
  id?: string
  metadata?: Record<string, any>
  name: string
  properties?: Record<string, any>
  results?: any[]
  schemaJson: Record<string, any>
  status?: string
}

export interface SchemaLoadMatch {
  id?: string
  project_id: number
  entity_name?: string
  entity_type?: string
  name?: string
}

export interface SchemaListMatch {
  project_id: number
}

export interface SchemaRemoveMatch {
  id?: string
  project_id: number
  entity_name?: string
  entity_type?: string
  name?: string
}

export interface UploadSchema {
  description?: string
  metadata?: Record<string, any>
  properties?: Record<string, any>
  status?: string
}

export interface UploadSchemaCreateData {
  entity_type: string
  name: string
  project_id: number
  description?: string
  metadata?: Record<string, any>
  properties?: Record<string, any>
  status?: string
}

