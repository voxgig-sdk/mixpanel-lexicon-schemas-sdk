
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"added":{"a":true,"h":"Added","n":"added","r":false,"sh":"The number of entries that were inserted","t":"`$INTEGER`","key$":"added","index$":0},"deleted":{"a":true,"h":"Deleted","n":"deleted","r":false,"sh":"The number of entries that were deleted (on applicable if `truncate: true`)","t":"`$INTEGER`","key$":"deleted","index$":1},"entries":{"a":true,"h":"Entries","n":"entries","r":true,"sh":"The list of schema entries to upload","t":"`$ARRAY`","key$":"entries","index$":2},"truncate":{"a":true,"h":"Truncate","n":"truncate","r":false,"sh":"If true, delete your entire data dictionary before inserting these entries.","t":"`$BOOLEAN`","key$":"truncate","index$":3}},"name":"batch_upload_schema","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /projects/{projectId}/schemas","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/projects/{projectId}/schemas","q":{"exist":["project_id"]},"r":{"param":{"projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"schemas"}],"t":{"req":{"entries":"`reqdata.entry`","truncate":"`reqdata.truncate`"},"res":"`body.results`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"batch_upload_schema","name__orig":"batch_upload_schema","Name":"BatchUploadSchema","name_":"batch_upload_schema","name-":"batch-upload-schema","NAME":"BATCH_UPLOAD_SCHEMA","index$":0}, {"active":true,"entity":"batch_upload_schema","key$":"BasicBatchUploadSchemaFlow","kind":"basic","name":"BasicBatchUploadSchemaFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"batch_upload_schema_ref01"},"m":{"project_id":"project01"},"o":"create","s":[],"v":[],"index$":0}]}, 'BatchUploadSchema', {"POST /projects/{projectId}/schemas":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"entries":{"type":"array","description":"The list of schema entries to upload","items":{"type":"object","properties":{"entityType":{"enum":[],"type":"string","x-ref":"#/components/schemas/SchemaEntityType"},"name":{"description":"The entity name (eg: Added To Cart)","type":"string"},"schemaJson":{"description":"The schema for the entity","properties":{},"type":"object","x-ref":"#/components/schemas/Schema"}},"required":["name","entityType","schemaJson"],"additionalProperties":false,"x-ref":"#/components/schemas/SchemaEntry"},"key$":"entries"},"truncate":{"type":"boolean","description":"If true, delete your entire data dictionary before inserting these entries. This is primarily useful if you want to upload a single file that represents your entire data dictionary.","default":false,"key$":"truncate"}},"required":["entries"],"additionalProperties":false,"index$":1}}}},"parameters":[{"in":"path","name":"projectId","schema":{"type":"integer"},"required":true,"description":"Your project id (eg: 12345)","index$":0}]}})
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
    ['batch_upload_schema01','batch_upload_schema02','batch_upload_schema03','project01'],
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
  
