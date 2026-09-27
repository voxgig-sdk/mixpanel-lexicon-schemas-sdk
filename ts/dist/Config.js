"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'MixpanelLexiconSchemas',
        slug: "mixpanel-lexicon-schemas",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        debug: {
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
        idempotency: {
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
        metrics: {
            "options": {
                "active": false
            },
            "optspec": {
                "now": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        paging: {
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
        ratelimit: {
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
        retry: {
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
        test: {
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
        timeout: {
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
    };
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
            batch_upload_schema: {},
            schema: {},
            upload_schema: {},
        }
    };
    entity = {
        "batch_upload_schema": {
            "fields": [
                {
                    "name": "added",
                    "title": "Added",
                    "type": "`$INTEGER`",
                    "short": "The number of entries that were inserted"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$INTEGER`",
                    "short": "The number of entries that were deleted (on applicable if `truncate: true`)"
                },
                {
                    "name": "entries",
                    "title": "Entries",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "The list of schema entries to upload"
                },
                {
                    "name": "truncate",
                    "title": "Truncate",
                    "type": "`$BOOLEAN`",
                    "short": "If true, delete your entire data dictionary before inserting these entries."
                }
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
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "schemas"
                                }
                            ],
                            "parts": [
                                "projects",
                                "{project_id}",
                                "schemas"
                            ],
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "transform": {
                                "req": {
                                    "entries": "`reqdata.entry`",
                                    "truncate": "`reqdata.truncate`"
                                },
                                "res": "`body.results`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "project_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "schema": {
            "fields": [
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "The entity description"
                },
                {
                    "name": "entityType",
                    "title": "Entity Type",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The entity name (eg: Added To Cart)"
                },
                {
                    "name": "properties",
                    "title": "Properties",
                    "type": "`$OBJECT`",
                    "short": "The list of properties that should be included on an instance of this entity"
                },
                {
                    "name": "results",
                    "title": "Results",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "schemaJson",
                    "title": "Schema Json",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The schema for the entity"
                },
                {
                    "name": "status",
                    "title": "Status",
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/projects/{projectId}/schemas",
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
                            "parts": [
                                "projects",
                                "{project_id}",
                                "schemas"
                            ],
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "project_id"
                                ]
                            }
                        }
                    ]
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
                            "parts": [
                                "projects",
                                "{project_id}",
                                "schemas",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "entityType": "id",
                                    "projectId": "project_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "entity_type",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "entity_name",
                                        "orig": "entity_name",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "entity_name",
                                    "id",
                                    "project_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/projects/{projectId}/schemas/{entityType}/{name}",
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
                            "parts": [
                                "projects",
                                "{project_id}",
                                "schemas",
                                "{entity_type}",
                                "{name}"
                            ],
                            "rename": {
                                "param": {
                                    "entityType": "entity_type",
                                    "projectId": "project_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "entity_type",
                                        "orig": "entity_type",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "entity_type",
                                    "name",
                                    "project_id"
                                ]
                            }
                        }
                    ]
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
                            "parts": [
                                "projects",
                                "{project_id}",
                                "schemas",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "entityType": "id",
                                    "projectId": "project_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "entity_type",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "entity_name",
                                        "orig": "entity_name",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "entity_name",
                                    "id",
                                    "project_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/projects/{projectId}/schemas/{entityType}/{name}",
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
                            "parts": [
                                "projects",
                                "{project_id}",
                                "schemas",
                                "{entity_type}",
                                "{name}"
                            ],
                            "rename": {
                                "param": {
                                    "entityType": "entity_type",
                                    "projectId": "project_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "entity_type",
                                        "orig": "entity_type",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "entity_type",
                                    "name",
                                    "project_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/projects/{projectId}/schemas",
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
                            "parts": [
                                "projects",
                                "{project_id}",
                                "schemas"
                            ],
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "project_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "upload_schema": {
            "fields": [
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "The entity description"
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "properties",
                    "title": "Properties",
                    "type": "`$OBJECT`",
                    "short": "The list of properties that should be included on an instance of this entity"
                },
                {
                    "name": "status",
                    "title": "Status",
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
                            "kind": "http",
                            "method": "POST",
                            "orig": "/projects/{projectId}/schemas/{entityType}/{name}",
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
                            "parts": [
                                "projects",
                                "{project_id}",
                                "schemas",
                                "{entity_type}",
                                "{name}"
                            ],
                            "rename": {
                                "param": {
                                    "entityType": "entity_type",
                                    "projectId": "project_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "entity_type",
                                        "orig": "entity_type",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "entity_type",
                                    "name",
                                    "project_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.schema"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map