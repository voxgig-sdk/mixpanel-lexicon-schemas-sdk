-- Schema entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("mixpanel-lexicon-schemas_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("SchemaEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Schema(nil)
    assert.is_not_nil(ent)
  end)

  -- Feature #4: the entity stream(action, ...) method runs the op pipeline and
  -- returns an iterator over result items. With the streaming feature active it
  -- yields the feature's incremental output; otherwise it falls back to the
  -- materialised list so stream always yields.
  it("should stream", function()
    local seed = {
      entity = {
        ["schema"] = {
          s1 = { id = "s1" },
          s2 = { id = "s2" },
          s3 = { id = "s3" },
        },
      },
    }

    -- Fallback: streaming inactive -> yields the materialised list items.
    local base = sdk.test(seed, nil)
    local seen = {}
    for item in base:Schema(nil):stream("list", nil, nil) do
      table.insert(seen, item)
    end
    assert.are.equal(3, #seen)

    -- Inbound: streaming active -> yields each item from the feature.
    local config = require("config_shared")()
    if type(config.feature) == "table" and config.feature.streaming ~= nil then
      local streamsdk = sdk.test(seed, { feature = { streaming = { active = true } } })
      local got = {}
      for item in streamsdk:Schema(nil):stream("list", nil, nil) do
        if vs.islist(item) then
          for _, sub in ipairs(item) do
            table.insert(got, sub)
          end
        else
          table.insert(got, item)
        end
      end
      assert.are.equal(3, #got)
    end
  end)

  it("should run basic flow", function()
    local setup = schema_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "schema." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set MIXPANEL_LEXICON_SCHEMAS_TEST_SCHEMA_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local schema_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.schema")))
    local schema_ref01_data = nil
    if #schema_ref01_data_raw > 0 then
      schema_ref01_data = helpers.to_map(schema_ref01_data_raw[1][2])
    end

    -- LIST
    local schema_ref01_ent = client:Schema(nil)
    local schema_ref01_match = {
      ["project_id"] = setup.idmap["project01"],
    }

    local schema_ref01_list_result, err = schema_ref01_ent:list(schema_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(schema_ref01_list_result)

    -- LOAD
    local schema_ref01_match_dt0 = {
      id = schema_ref01_data["id"],
    }
    local schema_ref01_data_dt0_loaded, err = schema_ref01_ent:load(schema_ref01_match_dt0, nil)
    assert.is_nil(err)
    local schema_ref01_data_dt0_load_result = helpers.to_map(type(schema_ref01_data_dt0_loaded) == 'table' and schema_ref01_data_dt0_loaded.data_get and schema_ref01_data_dt0_loaded:data_get() or schema_ref01_data_dt0_loaded)
    assert.is_not_nil(schema_ref01_data_dt0_load_result)
    assert.are.equal(schema_ref01_data_dt0_load_result["id"], schema_ref01_data["id"])

  end)
end)

function schema_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/schema/SchemaTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read schema test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "schema01", "schema02", "schema03", "project01", "project02", "project03", "entity_type01" },
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
  local entid_env_raw = os.getenv("MIXPANEL_LEXICON_SCHEMAS_TEST_SCHEMA_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["MIXPANEL_LEXICON_SCHEMAS_TEST_SCHEMA_ENTID"] = idmap,
    ["MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE"] = "FALSE",
    ["MIXPANEL_LEXICON_SCHEMAS_TEST_EXPLAIN"] = "FALSE",
    ["MIXPANEL_LEXICON_SCHEMAS_APIKEY"] = "",
    ["MIXPANEL_LEXICON_SCHEMAS_SERVER_REGIONANDDOMAIN"] = "mixpanel",
  })

  local idmap_resolved = helpers.to_map(
    env["MIXPANEL_LEXICON_SCHEMAS_TEST_SCHEMA_ENTID"])
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
