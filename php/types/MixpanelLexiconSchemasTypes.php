<?php
declare(strict_types=1);

// Typed models for the MixpanelLexiconSchemas SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** BatchUploadSchema entity data model. */
class BatchUploadSchema
{
    public ?int $added = null;
    public ?int $deleted = null;
    public array $entries;
    public ?bool $truncate = null;
}

/** Request payload for BatchUploadSchema#create. */
class BatchUploadSchemaCreateData
{
    public int $project_id;
    public ?int $added = null;
    public ?int $deleted = null;
    public array $entries;
    public ?bool $truncate = null;
}

/** Project entity data model. */
class Project
{
}

/** Schema entity data model. */
class Schema
{
    public ?string $description = null;
    public string $entityType;
    public ?string $id = null;
    public ?array $metadata = null;
    public string $name;
    public ?array $properties = null;
    public ?array $results = null;
    public array $schemaJson;
    public ?string $status = null;
}

/** Request payload for Schema#load. */
class SchemaLoadMatch
{
    public ?string $id = null;
    public int $project_id;
    public ?string $entity_name = null;
    public ?string $entity_type = null;
    public ?string $name = null;
}

/** Request payload for Schema#list. */
class SchemaListMatch
{
    public int $project_id;
}

/** Request payload for Schema#remove. */
class SchemaRemoveMatch
{
    public ?string $id = null;
    public int $project_id;
    public ?string $entity_name = null;
    public ?string $entity_type = null;
    public ?string $name = null;
}

/** UploadSchema entity data model. */
class UploadSchema
{
    public ?string $description = null;
    public ?array $metadata = null;
    public ?array $properties = null;
    public ?string $status = null;
}

/** Request payload for UploadSchema#create. */
class UploadSchemaCreateData
{
    public string $entity_type;
    public string $name;
    public int $project_id;
    public ?string $description = null;
    public ?array $metadata = null;
    public ?array $properties = null;
    public ?string $status = null;
}

