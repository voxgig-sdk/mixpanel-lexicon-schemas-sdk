<?php
declare(strict_types=1);

// UploadSchema entity test

require_once __DIR__ . '/../mixpanellexiconschemas_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class UploadSchemaEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = MixpanelLexiconSchemasSDK::test(null, null);
        $ent = $testsdk->UploadSchema(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = upload_schema_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "upload_schema." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $upload_schema_ref01_ent = $client->UploadSchema(null);
        $upload_schema_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.upload_schema"), "upload_schema_ref01"));
        $upload_schema_ref01_data["entity_type"] = $setup["idmap"]["entity_type01"];
        $upload_schema_ref01_data["name"] = $setup["idmap"]["name01"];
        $upload_schema_ref01_data["project_id"] = $setup["idmap"]["project01"];

        $upload_schema_ref01_data_result = $upload_schema_ref01_ent->create($upload_schema_ref01_data, null);
        $upload_schema_ref01_data = Helpers::to_map(is_object($upload_schema_ref01_data_result) && method_exists($upload_schema_ref01_data_result, 'data_get') ? $upload_schema_ref01_data_result->data_get() : $upload_schema_ref01_data_result);
        $this->assertNotNull($upload_schema_ref01_data);

    }
}

function upload_schema_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/upload_schema/UploadSchemaTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MixpanelLexiconSchemasSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["upload_schema01", "upload_schema02", "upload_schema03", "project01", "project02", "project03", "schema01", "schema02", "schema03", "entity_type01", "name01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID" => $idmap,
        "MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE" => "FALSE",
        "MIXPANEL_LEXICON_SCHEMAS_TEST_EXPLAIN" => "FALSE",
        "MIXPANEL_LEXICON_SCHEMAS_APIKEY" => "",
        "MIXPANEL_LEXICON_SCHEMAS_SERVER_REGIONANDDOMAIN" => 'mixpanel',
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["MIXPANEL_LEXICON_SCHEMAS_APIKEY"],
                "server" => [
                    "regionAndDomain" => $env["MIXPANEL_LEXICON_SCHEMAS_SERVER_REGIONANDDOMAIN"],
                ],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new MixpanelLexiconSchemasSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["MIXPANEL_LEXICON_SCHEMAS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
