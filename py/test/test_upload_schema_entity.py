# UploadSchema entity test

import json
import os
import time

import pytest

from mixpanellexiconschemas_sdk.utility.voxgig_struct import voxgig_struct as vs
from mixpanellexiconschemas_sdk import MixpanelLexiconSchemasSDK
from mixpanellexiconschemas_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestUploadSchemaEntity:

    def test_should_create_instance(self):
        testsdk = MixpanelLexiconSchemasSDK.test(None, None)
        ent = testsdk.UploadSchema(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _upload_schema_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "upload_schema." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        upload_schema_ref01_ent = client.UploadSchema(None)
        upload_schema_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.upload_schema"), "upload_schema_ref01"))
        upload_schema_ref01_data["entity_type"] = setup["idmap"]["entity_type01"]
        upload_schema_ref01_data["name"] = setup["idmap"]["name01"]
        upload_schema_ref01_data["project_id"] = setup["idmap"]["project01"]

        upload_schema_ref01_data = helpers.to_map(runner.entity_data(upload_schema_ref01_ent.create(upload_schema_ref01_data, None)))
        assert upload_schema_ref01_data is not None



def _upload_schema_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/upload_schema/UploadSchemaTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = MixpanelLexiconSchemasSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["upload_schema01", "upload_schema02", "upload_schema03", "project01", "project02", "project03", "schema01", "schema02", "schema03", "entity_type01", "name01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID": idmap,
        "MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE": "FALSE",
        "MIXPANEL_LEXICON_SCHEMAS_TEST_EXPLAIN": "FALSE",
        "MIXPANEL_LEXICON_SCHEMAS_APIKEY": "",
        "MIXPANEL_LEXICON_SCHEMAS_SERVER_REGIONANDDOMAIN": "mixpanel",
    })

    idmap_resolved = helpers.to_map(
        env.get("MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("MIXPANEL_LEXICON_SCHEMAS_APIKEY"),
                "server": {
                    "regionAndDomain": env.get("MIXPANEL_LEXICON_SCHEMAS_SERVER_REGIONANDDOMAIN"),
                },
            },
            extra or {},
        ])
        client = MixpanelLexiconSchemasSDK(helpers.to_map(merged_opts))

    _live = env.get("MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("MIXPANEL_LEXICON_SCHEMAS_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
