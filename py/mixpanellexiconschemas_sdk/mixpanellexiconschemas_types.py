# Typed models for the MixpanelLexiconSchemas SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class BatchUploadSchemaRequired(TypedDict):
    entries: list


class BatchUploadSchema(BatchUploadSchemaRequired, total=False):
    added: int
    deleted: int
    truncate: bool


class BatchUploadSchemaCreateDataRequired(TypedDict):
    project_id: int
    entries: list


class BatchUploadSchemaCreateData(BatchUploadSchemaCreateDataRequired, total=False):
    added: int
    deleted: int
    truncate: bool


class Project(TypedDict):
    pass


class SchemaRequired(TypedDict):
    entityType: str
    name: str
    schemaJson: dict


class Schema(SchemaRequired, total=False):
    description: str
    id: str
    metadata: dict
    properties: dict
    results: list
    status: str


class SchemaLoadMatchRequired(TypedDict):
    project_id: int


class SchemaLoadMatch(SchemaLoadMatchRequired, total=False):
    id: str
    entity_name: str
    entity_type: str
    name: str


class SchemaListMatch(TypedDict):
    project_id: int


class SchemaRemoveMatchRequired(TypedDict):
    project_id: int


class SchemaRemoveMatch(SchemaRemoveMatchRequired, total=False):
    id: str
    entity_name: str
    entity_type: str
    name: str


class UploadSchema(TypedDict, total=False):
    description: str
    metadata: dict
    properties: dict
    status: str


class UploadSchemaCreateDataRequired(TypedDict):
    entity_type: str
    name: str
    project_id: int


class UploadSchemaCreateData(UploadSchemaCreateDataRequired, total=False):
    description: str
    metadata: dict
    properties: dict
    status: str
