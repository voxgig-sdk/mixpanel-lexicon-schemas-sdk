// Typed models for the MixpanelLexiconSchemas SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/mixpanel-lexicon-schemas-sdk/go/core"
)

// BatchUploadSchema is the typed data model for the batch_upload_schema entity.
type BatchUploadSchema struct {
	Added *int `json:"added,omitempty"`
	Deleted *int `json:"deleted,omitempty"`
	Entries []any `json:"entries"`
	Truncate *bool `json:"truncate,omitempty"`
}

// BatchUploadSchemaCreateData is the typed request payload for BatchUploadSchema.CreateTyped.
type BatchUploadSchemaCreateData struct {
	ProjectId int `json:"project_id"`
	Added *int `json:"added,omitempty"`
	Deleted *int `json:"deleted,omitempty"`
	Entries []any `json:"entries"`
	Truncate *bool `json:"truncate,omitempty"`
}

// Project is the typed data model for the project entity.
type Project struct {
}

// Schema is the typed data model for the schema entity.
type Schema struct {
	Description *string `json:"description,omitempty"`
	EntityType string `json:"entityType"`
	Id *string `json:"id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Name string `json:"name"`
	Properties *map[string]any `json:"properties,omitempty"`
	Results *[]any `json:"results,omitempty"`
	SchemaJson map[string]any `json:"schemaJson"`
	Status *string `json:"status,omitempty"`
}

// SchemaLoadMatch is the typed request payload for Schema.LoadTyped.
type SchemaLoadMatch struct {
	Id *string `json:"id,omitempty"`
	ProjectId int `json:"project_id"`
	EntityName *string `json:"entity_name,omitempty"`
	EntityType *string `json:"entity_type,omitempty"`
	Name *string `json:"name,omitempty"`
}

// SchemaListMatch is the typed request payload for Schema.ListTyped.
type SchemaListMatch struct {
	ProjectId int `json:"project_id"`
}

// SchemaRemoveMatch is the typed request payload for Schema.RemoveTyped.
type SchemaRemoveMatch struct {
	Id *string `json:"id,omitempty"`
	ProjectId int `json:"project_id"`
	EntityName *string `json:"entity_name,omitempty"`
	EntityType *string `json:"entity_type,omitempty"`
	Name *string `json:"name,omitempty"`
}

// UploadSchema is the typed data model for the upload_schema entity.
type UploadSchema struct {
	Description *string `json:"description,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Properties *map[string]any `json:"properties,omitempty"`
	Status *string `json:"status,omitempty"`
}

// UploadSchemaCreateData is the typed request payload for UploadSchema.CreateTyped.
type UploadSchemaCreateData struct {
	EntityType string `json:"entity_type"`
	Name string `json:"name"`
	ProjectId int `json:"project_id"`
	Description *string `json:"description,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Properties *map[string]any `json:"properties,omitempty"`
	Status *string `json:"status,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
