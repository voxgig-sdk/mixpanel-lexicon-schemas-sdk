package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/mixpanel-lexicon-schemas-sdk/go"
	"github.com/voxgig-sdk/mixpanel-lexicon-schemas-sdk/go/core"

	vs "github.com/voxgig-sdk/mixpanel-lexicon-schemas-sdk/go/utility/struct"
)

func TestUploadSchemaEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.UploadSchema(nil)
		if ent == nil {
			t.Fatal("expected non-nil UploadSchemaEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := upload_schemaBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "upload_schema." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		uploadSchemaRef01Ent := client.UploadSchema(nil)
		uploadSchemaRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "upload_schema"}), "upload_schema_ref01"))
		uploadSchemaRef01Data["entity_type"] = setup.idmap["entity_type01"]
		uploadSchemaRef01Data["name"] = setup.idmap["name01"]
		uploadSchemaRef01Data["project_id"] = setup.idmap["project01"]

		uploadSchemaRef01DataResult, err := uploadSchemaRef01Ent.Create(uploadSchemaRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		uploadSchemaRef01Data = core.ToMapAny(entityData(uploadSchemaRef01DataResult))
		if uploadSchemaRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func upload_schemaBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "upload_schema", "UploadSchemaTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read upload_schema test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse upload_schema test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"upload_schema01", "upload_schema02", "upload_schema03", "project01", "project02", "project03", "schema01", "schema02", "schema03", "entity_type01", "name01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID": idmap,
		"MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE":      "FALSE",
		"MIXPANEL_LEXICON_SCHEMAS_TEST_EXPLAIN":   "FALSE",
		"MIXPANEL_LEXICON_SCHEMAS_APIKEY":         "",
		"MIXPANEL_LEXICON_SCHEMAS_SERVER_REGIONANDDOMAIN": "mixpanel",
	})

	idmapResolved := core.ToMapAny(env["MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["MIXPANEL_LEXICON_SCHEMAS_APIKEY"],
				"server": map[string]any{
					"regionAndDomain": env["MIXPANEL_LEXICON_SCHEMAS_SERVER_REGIONANDDOMAIN"],
				},
			},
			extraOpts,
		})
		client = sdk.NewMixpanelLexiconSchemasSDK(core.ToMapAny(mergedOpts))
	}

	live := env["MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["MIXPANEL_LEXICON_SCHEMAS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
