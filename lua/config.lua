-- MixpanelLexiconSchemas SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "MixpanelLexiconSchemas",
      slug = "mixpanel-lexicon-schemas",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["debug"] = {
        ["options"] = {
          ["active"] = false,
          ["max"] = 100,
          ["redact"] = {
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          },
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["onEntry"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["idempotency"] = {
        ["options"] = {
          ["active"] = false,
          ["header"] = "Idempotency-Key",
          ["methods"] = {
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          },
          ["ops"] = {
            "create",
            "update",
            "remove",
          },
        },
        ["optspec"] = {
          ["keygen"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["metrics"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["paging"] = {
        ["options"] = {
          ["active"] = false,
          ["afterVar"] = "after",
          ["cursorParam"] = "cursor",
          ["firstVar"] = "first",
          ["limitParam"] = "limit",
          ["pageParam"] = "page",
          ["startPage"] = 1,
        },
        ["optspec"] = {
          ["limit"] = "`$NUMBER`",
          ["ops"] = "`$LIST`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://{regionAndDomain}.com/api/app",
      server = {
        ["regionAndDomain"] = "mixpanel",
      },
      auth = {
        prefix = "Basic",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["batch_upload_schema"] = {},
        ["project"] = {},
        ["schema"] = {},
        ["upload_schema"] = {},
      },
    },
    entity = {
      ["batch_upload_schema"] = {
        ["fields"] = {
          {
            ["name"] = "added",
            ["short"] = "The number of entries that were inserted",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "deleted",
            ["short"] = "The number of entries that were deleted (on applicable if `truncate: true`)",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "entries",
            ["req"] = true,
            ["short"] = "The list of schema entries to upload",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "truncate",
            ["short"] = "If true, delete your entire data dictionary before inserting these entries.",
            ["type"] = "`$BOOLEAN`",
          },
        },
        ["name"] = "batch_upload_schema",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/projects/{projectId}/schemas",
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "schemas",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = {
                    ["entries"] = "`reqdata.entry`",
                    ["truncate"] = "`reqdata.truncate`",
                  },
                  ["res"] = "`body.results`",
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "schemas",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "project",
            },
          },
        },
      },
      ["project"] = {
        ["fields"] = {},
        ["name"] = "project",
        ["op"] = {},
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["schema"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["short"] = "The entity description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "entityType",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "metadata",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["short"] = "The entity name (eg: Added To Cart)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "properties",
            ["short"] = "The list of properties that should be included on an instance of this entity",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "results",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "schemaJson",
            ["req"] = true,
            ["short"] = "The schema for the entity",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "status",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "schema",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/projects/{projectId}/schemas",
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "schemas",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "schemas",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "entity_type",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "entity_name",
                      ["orig"] = "entity_name",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/projects/{projectId}/schemas/{entityType}",
                ["rename"] = {
                  ["param"] = {
                    ["entityType"] = "id",
                    ["projectId"] = "project_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "schemas",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "entity_name",
                    "id",
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "schemas",
                  "{id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "entity_type",
                      ["orig"] = "entity_type",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "name",
                      ["orig"] = "name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/projects/{projectId}/schemas/{entityType}/{name}",
                ["rename"] = {
                  ["param"] = {
                    ["entityType"] = "entity_type",
                    ["projectId"] = "project_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "schemas",
                  },
                  {
                    ["var"] = "entity_type",
                  },
                  {
                    ["var"] = "name",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "entity_type",
                    "name",
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "schemas",
                  "{entity_type}",
                  "{name}",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "entity_type",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "entity_name",
                      ["orig"] = "entity_name",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/projects/{projectId}/schemas/{entityType}",
                ["rename"] = {
                  ["param"] = {
                    ["entityType"] = "id",
                    ["projectId"] = "project_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "schemas",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "entity_name",
                    "id",
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "schemas",
                  "{id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "entity_type",
                      ["orig"] = "entity_type",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "name",
                      ["orig"] = "name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/projects/{projectId}/schemas/{entityType}/{name}",
                ["rename"] = {
                  ["param"] = {
                    ["entityType"] = "entity_type",
                    ["projectId"] = "project_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "schemas",
                  },
                  {
                    ["var"] = "entity_type",
                  },
                  {
                    ["var"] = "name",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "entity_type",
                    "name",
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "schemas",
                  "{entity_type}",
                  "{name}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/projects/{projectId}/schemas",
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "schemas",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "schemas",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "project",
            },
            {
              "project",
              "schema",
            },
          },
        },
      },
      ["upload_schema"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["short"] = "The entity description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "metadata",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "properties",
            ["short"] = "The list of properties that should be included on an instance of this entity",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "status",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "upload_schema",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "entity_type",
                      ["orig"] = "entity_type",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "name",
                      ["orig"] = "name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/projects/{projectId}/schemas/{entityType}/{name}",
                ["rename"] = {
                  ["param"] = {
                    ["entityType"] = "entity_type",
                    ["projectId"] = "project_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "projects",
                  },
                  {
                    ["var"] = "project_id",
                  },
                  {
                    ["lit"] = "schemas",
                  },
                  {
                    ["var"] = "entity_type",
                  },
                  {
                    ["var"] = "name",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "entity_type",
                    "name",
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "schemas",
                  "{entity_type}",
                  "{name}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "project",
              "schema",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
