
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { MixpanelLexiconSchemasSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('BatchUploadSchemaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelLexiconSchemasSDK.test()
    const ent = testsdk.BatchUploadSchema()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"added","req":false,"short":"The number of entries that were inserted","type":"`$INTEGER`","index$":0},{"active":true,"name":"deleted","req":false,"short":"The number of entries that were deleted (on applicable if `truncate: true`)","type":"`$INTEGER`","index$":1},{"active":true,"name":"entries","req":true,"short":"The list of schema entries to upload","type":"`$ARRAY`","index$":2},{"active":true,"name":"truncate","req":false,"short":"If true, delete your entire data dictionary before inserting these entries.","type":"`$BOOLEAN`","index$":3}],"name":"batch_upload_schema","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"POST /projects/{projectId}/schemas","json":"{\"operationId\":\"upload-schemas-for-project\",\"parameters\":[{\"description\":\"Your project id (eg: 12345)\",\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"entries\":{\"description\":\"The list of schema entries to upload\",\"items\":{\"additionalProperties\":false,\"properties\":{\"entityType\":{\"enum\":[\"event\",\"profile\"],\"type\":\"string\"},\"name\":{\"description\":\"The entity name (eg: Added To Cart)\",\"type\":\"string\"},\"schemaJson\":{\"description\":\"The schema for the entity\",\"properties\":{\"description\":{\"description\":\"The entity description\",\"type\":\"string\"},\"metadata\":{\"properties\":{\"com.mixpanel\":{\"additionalProperties\":false,\"description\":\"Metadata about this entity that is specific to Mixpanel\",\"properties\":{\"$source\":{\"description\":\"The source of this schema. Used by partners to identify themselves\",\"type\":\"string\"},\"contacts\":{\"description\":\"A list of emails belonging to users responsible for this entity.\",\"items\":{\"additionalProperties\":false,\"type\":\"string\"},\"type\":\"array\"},\"displayName\":{\"description\":\"If set, this name will be used in the Mixpanel UI instead of the entity name\",\"type\":\"string\"},\"dropped\":{\"default\":false,\"description\":\"[Events only] If true, the event will be dropped at ingestion time.\",\"type\":\"boolean\"},\"hidden\":{\"default\":false,\"description\":\"If true, this entity will be hidden in the Mixpanel UI\",\"type\":\"boolean\"},\"tags\":{\"description\":\"A list of tags to associate to this entity that can be used in the Mixpanel UI for filtering\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"teamContacts\":{\"description\":\"A list of team names responsible for this entity.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"},\"properties\":{\"additionalProperties\":{\"additionalProperties\":false,\"description\":\"The name and definition for a property. E.g. \\\"item_id\\\"\",\"properties\":{\"description\":{\"description\":\"The property description\",\"type\":\"string\"},\"metadata\":{\"properties\":{\"com.mixpanel\":{\"additionalProperties\":false,\"description\":\"Metadata that is specific to Mixpanel\",\"properties\":{\"displayName\":{\"description\":\"If set, this name will be used in the Mixpanel UI instead of the entity name\",\"type\":\"string\"},\"dropped\":{\"default\":false,\"description\":\"[Events only] If true, the property will be dropped at ingestion time.\",\"type\":\"boolean\"},\"hidden\":{\"default\":false,\"description\":\"If true, this property will be hidden in the Mixpanel UI\",\"type\":\"boolean\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":{\"enum\":[\"array\",\"boolean\",\"integer\",\"null\",\"number\",\"object\",\"string\"]}},\"required\":[\"type\"],\"type\":\"object\"},\"description\":\"The list of properties that should be included on an instance of this entity\",\"type\":\"object\"}},\"type\":\"object\"}},\"required\":[\"name\",\"entityType\",\"schemaJson\"],\"type\":\"object\"},\"type\":\"array\"},\"truncate\":{\"default\":false,\"description\":\"If true, delete your entire data dictionary before inserting these entries. This is primarily useful if you want to upload a single file that represents your entire data dictionary.\",\"type\":\"boolean\"}},\"required\":[\"entries\"],\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"results\":{\"properties\":{\"added\":{\"description\":\"The number of entries that were inserted\",\"type\":\"integer\"},\"deleted\":{\"description\":\"The number of entries that were deleted (on applicable if `truncate: true`)\",\"type\":\"integer\"}},\"type\":\"object\"},\"status\":{\"enum\":[\"ok\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/projects/{projectId}/schemas","rename":{"param":{"projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"schemas"}],"select":{"exist":["project_id"]},"transform":{"req":{"entries":"`reqdata.entry`","truncate":"`reqdata.truncate`"},"res":"`body.results`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["project"]]},"key$":"batch_upload_schema","name__orig":"batch_upload_schema","Name":"BatchUploadSchema","name_":"batch_upload_schema","name-":"batch-upload-schema","NAME":"BATCH_UPLOAD_SCHEMA","index$":0}, {"active":true,"entity":"batch_upload_schema","key$":"BasicBatchUploadSchemaFlow","kind":"basic","name":"BasicBatchUploadSchemaFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"batch_upload_schema_ref01"},"match":{"project_id":"project01"},"op":"create","spec":[],"valid":[],"index$":0}]}, 'BatchUploadSchema')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const batch_upload_schema_ref01_ent = client.BatchUploadSchema()
    let batch_upload_schema_ref01_data = setup.data.new.batch_upload_schema['batch_upload_schema_ref01']
    batch_upload_schema_ref01_data['project_id'] = setup.idmap['project01']

    batch_upload_schema_ref01_data = (await batch_upload_schema_ref01_ent.create(batch_upload_schema_ref01_data)).data()
    assert(null != batch_upload_schema_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/batch_upload_schema/BatchUploadSchemaTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MixpanelLexiconSchemasSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['batch_upload_schema01','batch_upload_schema02','batch_upload_schema03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_LEXICON_SCHEMAS_TEST_BATCH_UPLOAD_SCHEMA_ENTID': idmap,
    'MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE': 'FALSE',
    'MIXPANEL_LEXICON_SCHEMAS_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_LEXICON_SCHEMAS_APIKEY': '',
    'MIXPANEL_LEXICON_SCHEMAS_SERVER_REGIONANDDOMAIN': "mixpanel",
  })

  idmap = env['MIXPANEL_LEXICON_SCHEMAS_TEST_BATCH_UPLOAD_SCHEMA_ENTID']

  const live = 'TRUE' === env.MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_LEXICON_SCHEMAS_TEST_BATCH_UPLOAD_SCHEMA_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MixpanelLexiconSchemasSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.MIXPANEL_LEXICON_SCHEMAS_APIKEY,
        server: {
          regionAndDomain: env.MIXPANEL_LEXICON_SCHEMAS_SERVER_REGIONANDDOMAIN,
        },
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.MIXPANEL_LEXICON_SCHEMAS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
