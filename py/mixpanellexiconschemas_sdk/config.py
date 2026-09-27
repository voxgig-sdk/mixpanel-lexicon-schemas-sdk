# MixpanelLexiconSchemas SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "MixpanelLexiconSchemas",
            "slug": "mixpanel-lexicon-schemas",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://{regionAndDomain}.com/api/app",
            "server": {
                "regionAndDomain": "mixpanel",
            },
            "auth": {
                "prefix": "Basic",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "batch_upload_schema": {},
                "schema": {},
                "upload_schema": {},
            },
        },
        "entity": {
      "batch_upload_schema": {
        "fields": [
          {
            "name": "added",
            "title": "Added",
            "type": "`$INTEGER`",
            "short": "The number of entries that were inserted",
          },
          {
            "name": "deleted",
            "title": "Deleted",
            "type": "`$INTEGER`",
            "short": "The number of entries that were deleted (on applicable if `truncate: true`)",
          },
          {
            "name": "entries",
            "title": "Entries",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The list of schema entries to upload",
          },
          {
            "name": "truncate",
            "title": "Truncate",
            "type": "`$BOOLEAN`",
            "short": "If true, delete your entire data dictionary before inserting these entries.",
          },
        ],
        "name": "batch_upload_schema",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/projects/{projectId}/schemas",
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "schemas",
                  },
                ],
                "parts": [
                  "projects",
                  "{project_id}",
                  "schemas",
                ],
                "rename": {
                  "param": {
                    "projectId": "project_id",
                  },
                },
                "transform": {
                  "req": {
                    "entries": "`reqdata.entry`",
                    "truncate": "`reqdata.truncate`",
                  },
                  "res": "`body.results`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "schema": {
        "fields": [
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "The entity description",
          },
          {
            "name": "entityType",
            "title": "Entity Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "metadata",
            "title": "Metadata",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "The entity name (eg: Added To Cart)",
          },
          {
            "name": "properties",
            "title": "Properties",
            "type": "`$OBJECT`",
            "short": "The list of properties that should be included on an instance of this entity",
          },
          {
            "name": "results",
            "title": "Results",
            "type": "`$ARRAY`",
          },
          {
            "name": "schemaJson",
            "title": "Schema Json",
            "type": "`$OBJECT`",
            "req": True,
            "short": "The schema for the entity",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "schema",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/projects/{projectId}/schemas",
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "schemas",
                  },
                ],
                "parts": [
                  "projects",
                  "{project_id}",
                  "schemas",
                ],
                "rename": {
                  "param": {
                    "projectId": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/projects/{projectId}/schemas/{entityType}",
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "schemas",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "projects",
                  "{project_id}",
                  "schemas",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "entityType": "id",
                    "projectId": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "entity_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "entity_name",
                      "orig": "entity_name",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "entity_name",
                    "id",
                    "project_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/projects/{projectId}/schemas/{entityType}/{name}",
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "schemas",
                  },
                  {
                    "var": "entity_type",
                  },
                  {
                    "var": "name",
                  },
                ],
                "parts": [
                  "projects",
                  "{project_id}",
                  "schemas",
                  "{entity_type}",
                  "{name}",
                ],
                "rename": {
                  "param": {
                    "entityType": "entity_type",
                    "projectId": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "entity_type",
                      "orig": "entity_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "entity_type",
                    "name",
                    "project_id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/projects/{projectId}/schemas/{entityType}",
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "schemas",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "projects",
                  "{project_id}",
                  "schemas",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "entityType": "id",
                    "projectId": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "entity_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "entity_name",
                      "orig": "entity_name",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "entity_name",
                    "id",
                    "project_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/projects/{projectId}/schemas/{entityType}/{name}",
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "schemas",
                  },
                  {
                    "var": "entity_type",
                  },
                  {
                    "var": "name",
                  },
                ],
                "parts": [
                  "projects",
                  "{project_id}",
                  "schemas",
                  "{entity_type}",
                  "{name}",
                ],
                "rename": {
                  "param": {
                    "entityType": "entity_type",
                    "projectId": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "args": {
                  "params": [
                    {
                      "name": "entity_type",
                      "orig": "entity_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "entity_type",
                    "name",
                    "project_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/projects/{projectId}/schemas",
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "schemas",
                  },
                ],
                "parts": [
                  "projects",
                  "{project_id}",
                  "schemas",
                ],
                "rename": {
                  "param": {
                    "projectId": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "upload_schema": {
        "fields": [
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "The entity description",
          },
          {
            "name": "metadata",
            "title": "Metadata",
            "type": "`$OBJECT`",
          },
          {
            "name": "properties",
            "title": "Properties",
            "type": "`$OBJECT`",
            "short": "The list of properties that should be included on an instance of this entity",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
          },
        ],
        "name": "upload_schema",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/projects/{projectId}/schemas/{entityType}/{name}",
                "segments": [
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "schemas",
                  },
                  {
                    "var": "entity_type",
                  },
                  {
                    "var": "name",
                  },
                ],
                "parts": [
                  "projects",
                  "{project_id}",
                  "schemas",
                  "{entity_type}",
                  "{name}",
                ],
                "rename": {
                  "param": {
                    "entityType": "entity_type",
                    "projectId": "project_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "entity_type",
                      "orig": "entity_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "entity_type",
                    "name",
                    "project_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.schema",
            ],
          ],
        },
      },
    },
    }
