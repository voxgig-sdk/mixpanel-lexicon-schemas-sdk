-- Typed models for the MixpanelLexiconSchemas SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class BatchUploadSchema
---@field added? number
---@field deleted? number
---@field entries table
---@field truncate? boolean

---@class BatchUploadSchemaCreateData
---@field project_id number
---@field added? number
---@field deleted? number
---@field entries table
---@field truncate? boolean

---@class Project

---@class Schema
---@field description? string
---@field entityType string
---@field id? string
---@field metadata? table
---@field name string
---@field properties? table
---@field results? table
---@field schemaJson table
---@field status? string

---@class SchemaLoadMatch
---@field id? string
---@field project_id number
---@field entity_name? string
---@field entity_type? string
---@field name? string

---@class SchemaListMatch
---@field project_id number

---@class SchemaRemoveMatch
---@field id? string
---@field project_id number
---@field entity_name? string
---@field entity_type? string
---@field name? string

---@class UploadSchema
---@field description? string
---@field metadata? table
---@field properties? table
---@field status? string

---@class UploadSchemaCreateData
---@field entity_type string
---@field name string
---@field project_id number
---@field description? string
---@field metadata? table
---@field properties? table
---@field status? string

local M = {}

return M
