
import { BaseFeature } from './feature/base/BaseFeature'
import { DebugFeature } from './feature/debug/DebugFeature'
import { IdempotencyFeature } from './feature/idempotency/IdempotencyFeature'
import { MetricsFeature } from './feature/metrics/MetricsFeature'
import { PagingFeature } from './feature/paging/PagingFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   debug: DebugFeature,
 idempotency: IdempotencyFeature,
 metrics: MetricsFeature,
 paging: PagingFeature,
 ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'MixpanelLexiconSchemas',
        slug: "mixpanel-lexicon-schemas",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     debug:     {
      "options": {
        "active": false,
        "max": 100,
        "redact": [
          "authorization",
          "cookie",
          "set-cookie",
          "api-key",
          "apikey",
          "x-api-key",
          "idempotency-key"
        ]
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "onEntry": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 idempotency:     {
      "options": {
        "active": false,
        "header": "Idempotency-Key",
        "methods": [
          "POST",
          "PUT",
          "PATCH",
          "DELETE"
        ],
        "ops": [
          "create",
          "update",
          "remove"
        ]
      },
      "optspec": {
        "keygen": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 metrics:     {
      "options": {
        "active": false
      },
      "optspec": {
        "now": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 paging:     {
      "options": {
        "active": false,
        "afterVar": "after",
        "cursorParam": "cursor",
        "firstVar": "first",
        "limitParam": "limit",
        "pageParam": "page",
        "startPage": 1
      },
      "optspec": {
        "limit": "`$NUMBER`",
        "ops": "`$LIST`"
      },
      "strict": false,
      "transport": "none"
    },
 ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://{regionAndDomain}.com/api/app",

    server: {
      "regionAndDomain": "mixpanel",
    },

    auth: {
      prefix: 'Basic',
      basic: true,
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        batch_upload_schema: {
        },
  
        project: {
        },
  
        schema: {
        },
  
        upload_schema: {
        },
  
    }
  }


  entity = {
    "batch_upload_schema": {
      "fields": [
        {
          "name": "added",
          "short": "The number of entries that were inserted",
          "type": "`$INTEGER`"
        },
        {
          "name": "deleted",
          "short": "The number of entries that were deleted (on applicable if `truncate: true`)",
          "type": "`$INTEGER`"
        },
        {
          "name": "entries",
          "req": true,
          "short": "The list of schema entries to upload",
          "type": "`$ARRAY`"
        },
        {
          "name": "truncate",
          "short": "If true, delete your entire data dictionary before inserting these entries.",
          "type": "`$BOOLEAN`"
        }
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/projects/{projectId}/schemas",
              "rename": {
                "param": {
                  "projectId": "project_id"
                }
              },
              "segments": [
                {
                  "lit": "projects"
                },
                {
                  "var": "project_id"
                },
                {
                  "lit": "schemas"
                }
              ],
              "select": {
                "exist": [
                  "project_id"
                ]
              },
              "transform": {
                "req": {
                  "entries": "`reqdata.entry`",
                  "truncate": "`reqdata.truncate`"
                },
                "res": "`body.results`"
              },
              "parts": [
                "projects",
                "{project_id}",
                "schemas"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "project"
          ]
        ]
      }
    },
    "project": {
      "fields": [],
      "name": "project",
      "op": {},
      "relations": {
        "ancestors": []
      }
    },
    "schema": {
      "fields": [
        {
          "name": "description",
          "short": "The entity description",
          "type": "`$STRING`"
        },
        {
          "name": "entityType",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "metadata",
          "type": "`$OBJECT`"
        },
        {
          "name": "name",
          "req": true,
          "short": "The entity name (eg: Added To Cart)",
          "type": "`$STRING`"
        },
        {
          "name": "properties",
          "short": "The list of properties that should be included on an instance of this entity",
          "type": "`$OBJECT`"
        },
        {
          "name": "results",
          "type": "`$ARRAY`"
        },
        {
          "name": "schemaJson",
          "req": true,
          "short": "The schema for the entity",
          "type": "`$OBJECT`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/projects/{projectId}/schemas",
              "rename": {
                "param": {
                  "projectId": "project_id"
                }
              },
              "segments": [
                {
                  "lit": "projects"
                },
                {
                  "var": "project_id"
                },
                {
                  "lit": "schemas"
                }
              ],
              "select": {
                "exist": [
                  "project_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "parts": [
                "projects",
                "{project_id}",
                "schemas"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "entity_name",
                    "orig": "entity_name",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/projects/{projectId}/schemas/{entityType}",
              "rename": {
                "param": {
                  "entityType": "id",
                  "projectId": "project_id"
                }
              },
              "segments": [
                {
                  "lit": "projects"
                },
                {
                  "var": "project_id"
                },
                {
                  "lit": "schemas"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "entity_name",
                  "id",
                  "project_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "projects",
                "{project_id}",
                "schemas",
                "{id}"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "entity_type",
                    "orig": "entity_type",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "name",
                    "orig": "name",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/projects/{projectId}/schemas/{entityType}/{name}",
              "rename": {
                "param": {
                  "entityType": "entity_type",
                  "projectId": "project_id"
                }
              },
              "segments": [
                {
                  "lit": "projects"
                },
                {
                  "var": "project_id"
                },
                {
                  "lit": "schemas"
                },
                {
                  "var": "entity_type"
                },
                {
                  "var": "name"
                }
              ],
              "select": {
                "exist": [
                  "entity_type",
                  "name",
                  "project_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "projects",
                "{project_id}",
                "schemas",
                "{entity_type}",
                "{name}"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "entity_name",
                    "orig": "entity_name",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/projects/{projectId}/schemas/{entityType}",
              "rename": {
                "param": {
                  "entityType": "id",
                  "projectId": "project_id"
                }
              },
              "segments": [
                {
                  "lit": "projects"
                },
                {
                  "var": "project_id"
                },
                {
                  "lit": "schemas"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "entity_name",
                  "id",
                  "project_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "parts": [
                "projects",
                "{project_id}",
                "schemas",
                "{id}"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "entity_type",
                    "orig": "entity_type",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "name",
                    "orig": "name",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/projects/{projectId}/schemas/{entityType}/{name}",
              "rename": {
                "param": {
                  "entityType": "entity_type",
                  "projectId": "project_id"
                }
              },
              "segments": [
                {
                  "lit": "projects"
                },
                {
                  "var": "project_id"
                },
                {
                  "lit": "schemas"
                },
                {
                  "var": "entity_type"
                },
                {
                  "var": "name"
                }
              ],
              "select": {
                "exist": [
                  "entity_type",
                  "name",
                  "project_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "parts": [
                "projects",
                "{project_id}",
                "schemas",
                "{entity_type}",
                "{name}"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/projects/{projectId}/schemas",
              "rename": {
                "param": {
                  "projectId": "project_id"
                }
              },
              "segments": [
                {
                  "lit": "projects"
                },
                {
                  "var": "project_id"
                },
                {
                  "lit": "schemas"
                }
              ],
              "select": {
                "exist": [
                  "project_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "parts": [
                "projects",
                "{project_id}",
                "schemas"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "project"
          ],
          [
            "project",
            "schema"
          ]
        ]
      }
    },
    "upload_schema": {
      "fields": [
        {
          "name": "description",
          "short": "The entity description",
          "type": "`$STRING`"
        },
        {
          "name": "metadata",
          "type": "`$OBJECT`"
        },
        {
          "name": "properties",
          "short": "The list of properties that should be included on an instance of this entity",
          "type": "`$OBJECT`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "name",
                    "orig": "name",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/projects/{projectId}/schemas/{entityType}/{name}",
              "rename": {
                "param": {
                  "entityType": "entity_type",
                  "projectId": "project_id"
                }
              },
              "segments": [
                {
                  "lit": "projects"
                },
                {
                  "var": "project_id"
                },
                {
                  "lit": "schemas"
                },
                {
                  "var": "entity_type"
                },
                {
                  "var": "name"
                }
              ],
              "select": {
                "exist": [
                  "entity_type",
                  "name",
                  "project_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "projects",
                "{project_id}",
                "schemas",
                "{entity_type}",
                "{name}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "project",
            "schema"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

