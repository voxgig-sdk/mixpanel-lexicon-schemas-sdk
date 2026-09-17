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
                "project": {},
                "schema": {},
                "upload_schema": {},
            },
        },
        "entity": {
      "batch_upload_schema": {
        "fields": [
          {
            "name": "added",
            "short": "The number of entries that were inserted",
            "type": "`$INTEGER`",
          },
          {
            "name": "deleted",
            "short": "The number of entries that were deleted (on applicable if `truncate: true`)",
            "type": "`$INTEGER`",
          },
          {
            "name": "entries",
            "req": True,
            "short": "The list of schema entries to upload",
            "type": "`$ARRAY`",
          },
          {
            "name": "truncate",
            "short": "If true, delete your entire data dictionary before inserting these entries.",
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "batch_upload_schema",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/projects/{projectId}/schemas",
                "rename": {
                  "param": {
                    "projectId": "project_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "transform": {
                  "req": {
                    "entries": "`reqdata.entry`",
                    "truncate": "`reqdata.truncate`",
                  },
                  "res": "`body.results`",
                },
                "parts": [
                  "projects",
                  "{project_id}",
                  "schemas",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "project",
            ],
          ],
        },
      },
      "project": {
        "fields": [],
        "name": "project",
        "op": {},
        "relations": {
          "ancestors": [],
        },
      },
      "schema": {
        "fields": [
          {
            "name": "description",
            "short": "The entity description",
            "type": "`$STRING`",
          },
          {
            "name": "entityType",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "metadata",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "req": True,
            "short": "The entity name (eg: Added To Cart)",
            "type": "`$STRING`",
          },
          {
            "name": "properties",
            "short": "The list of properties that should be included on an instance of this entity",
            "type": "`$OBJECT`",
          },
          {
            "name": "results",
            "type": "`$ARRAY`",
          },
          {
            "name": "schemaJson",
            "req": True,
            "short": "The schema for the entity",
            "type": "`$OBJECT`",
          },
          {
            "name": "status",
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
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/projects/{projectId}/schemas",
                "rename": {
                  "param": {
                    "projectId": "project_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "projects",
                  "{project_id}",
                  "schemas",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "entity_type",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "entity_name",
                      "orig": "entity_name",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/projects/{projectId}/schemas/{entityType}",
                "rename": {
                  "param": {
                    "entityType": "id",
                    "projectId": "project_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "entity_name",
                    "id",
                    "project_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "projects",
                  "{project_id}",
                  "schemas",
                  "{id}",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "entity_type",
                      "orig": "entity_type",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "name",
                      "orig": "name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/projects/{projectId}/schemas/{entityType}/{name}",
                "rename": {
                  "param": {
                    "entityType": "entity_type",
                    "projectId": "project_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "entity_type",
                    "name",
                    "project_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "projects",
                  "{project_id}",
                  "schemas",
                  "{entity_type}",
                  "{name}",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "entity_type",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "entity_name",
                      "orig": "entity_name",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/projects/{projectId}/schemas/{entityType}",
                "rename": {
                  "param": {
                    "entityType": "id",
                    "projectId": "project_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "entity_name",
                    "id",
                    "project_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "projects",
                  "{project_id}",
                  "schemas",
                  "{id}",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "entity_type",
                      "orig": "entity_type",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "name",
                      "orig": "name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/projects/{projectId}/schemas/{entityType}/{name}",
                "rename": {
                  "param": {
                    "entityType": "entity_type",
                    "projectId": "project_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "entity_type",
                    "name",
                    "project_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "projects",
                  "{project_id}",
                  "schemas",
                  "{entity_type}",
                  "{name}",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/projects/{projectId}/schemas",
                "rename": {
                  "param": {
                    "projectId": "project_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "projects",
                  "{project_id}",
                  "schemas",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "project",
            ],
            [
              "project",
              "schema",
            ],
          ],
        },
      },
      "upload_schema": {
        "fields": [
          {
            "name": "description",
            "short": "The entity description",
            "type": "`$STRING`",
          },
          {
            "name": "metadata",
            "type": "`$OBJECT`",
          },
          {
            "name": "properties",
            "short": "The list of properties that should be included on an instance of this entity",
            "type": "`$OBJECT`",
          },
          {
            "name": "status",
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
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "entity_type",
                      "orig": "entity_type",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "name",
                      "orig": "name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/projects/{projectId}/schemas/{entityType}/{name}",
                "rename": {
                  "param": {
                    "entityType": "entity_type",
                    "projectId": "project_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "entity_type",
                    "name",
                    "project_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "projects",
                  "{project_id}",
                  "schemas",
                  "{entity_type}",
                  "{name}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "project",
              "schema",
            ],
          ],
        },
      },
    },
    }
