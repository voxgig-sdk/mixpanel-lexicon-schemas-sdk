// Typed models for the MixpanelLexiconSchemas SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} BatchUploadSchema
 * @property {number} [added]
 * @property {number} [deleted]
 * @property {Array} entries
 * @property {boolean} [truncate]
 */

/**
 * @typedef {Object} BatchUploadSchemaCreateData
 * @property {number} project_id
 * @property {number} [added]
 * @property {number} [deleted]
 * @property {Array} entries
 * @property {boolean} [truncate]
 */

/**
 * @typedef {Object} Project
 */

/**
 * @typedef {Object} Schema
 * @property {string} [description]
 * @property {string} entityType
 * @property {string} [id]
 * @property {Object} [metadata]
 * @property {string} name
 * @property {Object} [properties]
 * @property {Array} [results]
 * @property {Object} schemaJson
 * @property {string} [status]
 */

/**
 * @typedef {Object} SchemaLoadMatch
 * @property {string} [id]
 * @property {number} project_id
 * @property {string} [entity_name]
 * @property {string} [entity_type]
 * @property {string} [name]
 */

/**
 * @typedef {Object} SchemaListMatch
 * @property {number} project_id
 */

/**
 * @typedef {Object} SchemaRemoveMatch
 * @property {string} [id]
 * @property {number} project_id
 * @property {string} [entity_name]
 * @property {string} [entity_type]
 * @property {string} [name]
 */

/**
 * @typedef {Object} UploadSchema
 * @property {string} [description]
 * @property {Object} [metadata]
 * @property {Object} [properties]
 * @property {string} [status]
 */

/**
 * @typedef {Object} UploadSchemaCreateData
 * @property {string} entity_type
 * @property {string} name
 * @property {number} project_id
 * @property {string} [description]
 * @property {Object} [metadata]
 * @property {Object} [properties]
 * @property {string} [status]
 */

