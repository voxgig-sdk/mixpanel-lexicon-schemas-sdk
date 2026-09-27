
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"The entity description","t":"`$STRING`","key$":"description","index$":0},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"t":"`$OBJECT`","key$":"metadata","index$":1},"properties":{"a":true,"h":"Properties","n":"properties","r":false,"sh":"The list of properties that should be included on an instance of this entity","t":"`$OBJECT`","key$":"properties","index$":2},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":3}},"name":"upload_schema","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /projects/{projectId}/schemas/{entityType}/{name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"entity_type","or":"entity_type","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"name","or":"name","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"POST","o":"/projects/{projectId}/schemas/{entityType}/{name}","q":{"exist":["entity_type","name","project_id"]},"r":{"param":{"entityType":"entity_type","projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"schemas"},{"var":"entity_type"},{"var":"name"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.schema"]]},"key$":"upload_schema","name__orig":"upload_schema","Name":"UploadSchema","name_":"upload_schema","name-":"upload-schema","NAME":"UPLOAD_SCHEMA","index$":2}, {"active":true,"entity":"upload_schema","key$":"BasicUploadSchemaFlow","kind":"basic","name":"BasicUploadSchemaFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"upload_schema_ref01"},"m":{"entity_type":"entity_type01","name":"name01","project_id":"project01"},"o":"create","s":[],"v":[],"index$":0}]}, 'UploadSchema', {"POST /projects/{projectId}/schemas/{entityType}/{name}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","description":"The schema for the entity","properties":{"description":{"description":"The entity description","type":"string","key$":"description"},"properties":{"additionalProperties":{"additionalProperties":false,"description":"The name and definition for a property. E.g. \"item_id\"","properties":{"description":{"description":"The property description","type":"string"},"metadata":{"properties":{},"type":"object"},"type":{"enum":[]}},"required":["type"],"type":"object"},"description":"The list of properties that should be included on an instance of this entity","type":"object","key$":"properties"},"metadata":{"properties":{"com.mixpanel":{"additionalProperties":false,"description":"Metadata about this entity that is specific to Mixpanel","properties":{"$source":{},"contacts":{},"displayName":{},"dropped":{},"hidden":{},"tags":{},"teamContacts":{}},"type":"object"}},"type":"object","key$":"metadata"}},"x-ref":"#/components/schemas/Schema","index$":1}}}},"parameters":[{"in":"path","name":"projectId","schema":{"type":"integer"},"required":true,"description":"Your project id (eg: 12345)","index$":0},{"in":"path","name":"entityType","schema":{"type":"string","enum":["event","profile"],"x-ref":"#/components/schemas/SchemaEntityType"},"required":true,"description":"The entity type (eg: event)","x-ref":"#/components/parameters/schemaEntityType","index$":1},{"in":"path","name":"name","schema":{"type":"string"},"required":true,"description":"The entity name (eg: Added To Cart)","x-ref":"#/components/parameters/schemaEntityName","index$":2}]}})
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
    ['upload_schema01','upload_schema02','upload_schema03','schema01','schema02','schema03','entity_type01','name01','project01'],
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
  
