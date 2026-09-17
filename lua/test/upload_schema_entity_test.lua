-- UploadSchema entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("mixpanel-lexicon-schemas_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("UploadSchemaEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:UploadSchema(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = upload_schema_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "upload_schema." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local upload_schema_ref01_ent = client:UploadSchema(nil)
    local upload_schema_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.upload_schema"), "upload_schema_ref01"))
    upload_schema_ref01_data["entity_type"] = setup.idmap["entity_type01"]
    upload_schema_ref01_data["name"] = setup.idmap["name01"]
    upload_schema_ref01_data["project_id"] = setup.idmap["project01"]

    local upload_schema_ref01_data_result, err = upload_schema_ref01_ent:create(upload_schema_ref01_data, nil)
    assert.is_nil(err)
    upload_schema_ref01_data = helpers.to_map(type(upload_schema_ref01_data_result) == 'table' and upload_schema_ref01_data_result.data_get and upload_schema_ref01_data_result:data_get() or upload_schema_ref01_data_result)
    assert.is_not_nil(upload_schema_ref01_data)

  end)
end)

function upload_schema_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/upload_schema/UploadSchemaTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read upload_schema test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "upload_schema01", "upload_schema02", "upload_schema03", "project01", "project02", "project03", "schema01", "schema02", "schema03", "entity_type01", "name01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID"] = idmap,
    ["MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE"] = "FALSE",
    ["MIXPANEL_LEXICON_SCHEMAS_TEST_EXPLAIN"] = "FALSE",
    ["MIXPANEL_LEXICON_SCHEMAS_APIKEY"] = "",
    ["MIXPANEL_LEXICON_SCHEMAS_SERVER_REGIONANDDOMAIN"] = "mixpanel",
  })

  local idmap_resolved = helpers.to_map(
    env["MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["MIXPANEL_LEXICON_SCHEMAS_APIKEY"],
        server = {
          ["regionAndDomain"] = env["MIXPANEL_LEXICON_SCHEMAS_SERVER_REGIONANDDOMAIN"],
        },
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["MIXPANEL_LEXICON_SCHEMAS_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
