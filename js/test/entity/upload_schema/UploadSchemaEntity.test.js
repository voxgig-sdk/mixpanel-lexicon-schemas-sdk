
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


describe('UploadSchemaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelLexiconSchemasSDK.test()
    const ent = testsdk.UploadSchema()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"description","req":false,"short":"The entity description","type":"`$STRING`","index$":0},{"active":true,"name":"metadata","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"name":"properties","req":false,"short":"The list of properties that should be included on an instance of this entity","type":"`$OBJECT`","index$":2},{"active":true,"name":"status","req":false,"type":"`$STRING`","index$":3}],"name":"upload_schema","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"entity_type","orig":"entity_type","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"name","orig":"name","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$INTEGER`","index$":2}]},"contract":{"id":"POST /projects/{projectId}/schemas/{entityType}/{name}","json":"{\"operationId\":\"upload-schema-by-entity-and-name\",\"parameters\":[{\"description\":\"Your project id (eg: 12345)\",\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"The entity type (eg: event)\",\"in\":\"path\",\"name\":\"entityType\",\"required\":true,\"schema\":{\"enum\":[\"event\",\"profile\"],\"type\":\"string\"}},{\"description\":\"The entity name (eg: Added To Cart)\",\"in\":\"path\",\"name\":\"name\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"The schema for the entity\",\"properties\":{\"description\":{\"description\":\"The entity description\",\"type\":\"string\"},\"metadata\":{\"properties\":{\"com.mixpanel\":{\"additionalProperties\":false,\"description\":\"Metadata about this entity that is specific to Mixpanel\",\"properties\":{\"$source\":{\"description\":\"The source of this schema. Used by partners to identify themselves\",\"type\":\"string\"},\"contacts\":{\"description\":\"A list of emails belonging to users responsible for this entity.\",\"items\":{\"additionalProperties\":false,\"type\":\"string\"},\"type\":\"array\"},\"displayName\":{\"description\":\"If set, this name will be used in the Mixpanel UI instead of the entity name\",\"type\":\"string\"},\"dropped\":{\"default\":false,\"description\":\"[Events only] If true, the event will be dropped at ingestion time.\",\"type\":\"boolean\"},\"hidden\":{\"default\":false,\"description\":\"If true, this entity will be hidden in the Mixpanel UI\",\"type\":\"boolean\"},\"tags\":{\"description\":\"A list of tags to associate to this entity that can be used in the Mixpanel UI for filtering\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"teamContacts\":{\"description\":\"A list of team names responsible for this entity.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"},\"properties\":{\"additionalProperties\":{\"additionalProperties\":false,\"description\":\"The name and definition for a property. E.g. \\\"item_id\\\"\",\"properties\":{\"description\":{\"description\":\"The property description\",\"type\":\"string\"},\"metadata\":{\"properties\":{\"com.mixpanel\":{\"additionalProperties\":false,\"description\":\"Metadata that is specific to Mixpanel\",\"properties\":{\"displayName\":{\"description\":\"If set, this name will be used in the Mixpanel UI instead of the entity name\",\"type\":\"string\"},\"dropped\":{\"default\":false,\"description\":\"[Events only] If true, the property will be dropped at ingestion time.\",\"type\":\"boolean\"},\"hidden\":{\"default\":false,\"description\":\"If true, this property will be hidden in the Mixpanel UI\",\"type\":\"boolean\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":{\"enum\":[\"array\",\"boolean\",\"integer\",\"null\",\"number\",\"object\",\"string\"]}},\"required\":[\"type\"],\"type\":\"object\"},\"description\":\"The list of properties that should be included on an instance of this entity\",\"type\":\"object\"}},\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"status\":{\"enum\":[\"ok\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Success\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Details about the error that occurred\",\"type\":\"string\"},\"status\":{\"enum\":[\"error\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Forbidden\"}},\"security\":[{\"ServiceAccount\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/projects/{projectId}/schemas/{entityType}/{name}","rename":{"param":{"entityType":"entity_type","projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"schemas"},{"var":"entity_type"},{"var":"name"}],"select":{"exist":["entity_type","name","project_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["project","schema"]]},"key$":"upload_schema","name__orig":"upload_schema","Name":"UploadSchema","name_":"upload_schema","name-":"upload-schema","NAME":"UPLOAD_SCHEMA","index$":3}, {"active":true,"entity":"upload_schema","key$":"BasicUploadSchemaFlow","kind":"basic","name":"BasicUploadSchemaFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"upload_schema_ref01"},"match":{"entity_type":"entity_type01","name":"name01","project_id":"project01"},"op":"create","spec":[],"valid":[],"index$":0}]}, 'UploadSchema')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const upload_schema_ref01_ent = client.UploadSchema()
    let upload_schema_ref01_data = setup.data.new.upload_schema['upload_schema_ref01']
    upload_schema_ref01_data['entity_type'] = setup.idmap['entity_type01']
    upload_schema_ref01_data['name'] = setup.idmap['name01']
    upload_schema_ref01_data['project_id'] = setup.idmap['project01']

    upload_schema_ref01_data = (await upload_schema_ref01_ent.create(upload_schema_ref01_data)).data()
    assert(null != upload_schema_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/upload_schema/UploadSchemaTestData.json')

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
    ['upload_schema01','upload_schema02','upload_schema03','project01','project02','project03','schema01','schema02','schema03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID': idmap,
    'MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE': 'FALSE',
    'MIXPANEL_LEXICON_SCHEMAS_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_LEXICON_SCHEMAS_APIKEY': '',
    'MIXPANEL_LEXICON_SCHEMAS_SERVER_REGIONANDDOMAIN': "mixpanel",
  })

  idmap = env['MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID']

  const live = 'TRUE' === env.MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_LEXICON_SCHEMAS_TEST_UPLOAD_SCHEMA_ENTID']
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
  
