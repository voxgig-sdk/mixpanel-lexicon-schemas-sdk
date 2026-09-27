

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MixpanelLexiconSchemasSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('SchemaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelLexiconSchemasSDK.test()
    const ent = testsdk.Schema()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'schema.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"The entity description","t":"`$STRING`","key$":"description","index$":0},"entityType":{"a":true,"h":"Entity Type","n":"entityType","r":true,"t":"`$STRING`","key$":"entityType","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"t":"`$OBJECT`","key$":"metadata","index$":3},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The entity name (eg: Added To Cart)","t":"`$STRING`","key$":"name","index$":4},"properties":{"a":true,"h":"Properties","n":"properties","r":false,"sh":"The list of properties that should be included on an instance of this entity","t":"`$OBJECT`","key$":"properties","index$":5},"results":{"a":true,"h":"Results","n":"results","r":false,"t":"`$ARRAY`","key$":"results","index$":6},"schemaJson":{"a":true,"h":"Schema Json","n":"schemaJson","r":true,"sh":"The schema for the entity","t":"`$OBJECT`","key$":"schemaJson","index$":7},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":8}},"id":{"field":"id","name":"id"},"name":"schema","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /projects/{projectId}/schemas","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/projects/{projectId}/schemas","q":{"exist":["project_id"]},"r":{"param":{"projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"schemas"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /projects/{projectId}/schemas/{entityType}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"entity_type","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$INTEGER`","index$":1}],"query":[{"a":true,"k":"query","n":"entity_name","or":"entity_name","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/projects/{projectId}/schemas/{entityType}","q":{"exist":["entity_name","id","project_id"]},"r":{"param":{"entityType":"id","projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"schemas"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /projects/{projectId}/schemas/{entityType}/{name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"entity_type","or":"entity_type","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"name","or":"name","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/projects/{projectId}/schemas/{entityType}/{name}","q":{"exist":["entity_type","name","project_id"]},"r":{"param":{"entityType":"entity_type","projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"schemas"},{"var":"entity_type"},{"var":"name"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /projects/{projectId}/schemas/{entityType}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"entity_type","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$INTEGER`","index$":1}],"query":[{"a":true,"k":"query","n":"entity_name","or":"entity_name","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/projects/{projectId}/schemas/{entityType}","q":{"exist":["entity_name","id","project_id"]},"r":{"param":{"entityType":"id","projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"schemas"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0},{"a":true,"co":{"id":"DELETE /projects/{projectId}/schemas/{entityType}/{name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"entity_type","or":"entity_type","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"name","or":"name","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"DELETE","o":"/projects/{projectId}/schemas/{entityType}/{name}","q":{"exist":["entity_type","name","project_id"]},"r":{"param":{"entityType":"entity_type","projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"schemas"},{"var":"entity_type"},{"var":"name"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":1},{"a":true,"co":{"id":"DELETE /projects/{projectId}/schemas","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"DELETE","o":"/projects/{projectId}/schemas","q":{"exist":["project_id"]},"r":{"param":{"projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"schemas"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":2}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"schema","name__orig":"schema","Name":"Schema","name_":"schema","name-":"schema","NAME":"SCHEMA","index$":1}, {"active":true,"entity":"schema","key$":"BasicSchemaFlow","kind":"basic","name":"BasicSchemaFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"schema_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"schema_ref01","srcdatavar":"schema_ref01_data","suffix":"_dt0"},"m":{"entity_type":"entity_type01","id":"schema01","project_id":"project01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-schema_ref01"}}],"index$":1}]}, 'Schema', {"GET /projects/{projectId}/schemas":{"protocol":"http","parameters":[{"in":"path","name":"projectId","schema":{"type":"integer"},"required":true,"description":"Your project id (eg: 12345)","index$":0}]},"GET /projects/{projectId}/schemas/{entityType}":{"protocol":"http","parameters":[{"in":"path","name":"projectId","schema":{"type":"integer"},"required":true,"description":"Your project id (eg: 12345)","index$":0},{"in":"path","name":"entityType","schema":{"type":"string","enum":["event","profile"],"x-ref":"#/components/schemas/SchemaEntityType"},"required":true,"description":"The entity type (eg: event)","x-ref":"#/components/parameters/schemaEntityType","index$":1},{"in":"query","name":"entity_name","schema":{"type":"string"},"required":false,"description":"The entity name (eg: Added To Cart)","x-ref":"#/components/parameters/schemaEntityNameQuery","index$":2}]},"GET /projects/{projectId}/schemas/{entityType}/{name}":{"protocol":"http","parameters":[{"in":"path","name":"projectId","schema":{"type":"integer"},"required":true,"description":"Your project id (eg: 12345)","index$":0},{"in":"path","name":"entityType","schema":{"type":"string","enum":["event","profile"],"x-ref":"#/components/schemas/SchemaEntityType"},"required":true,"description":"The entity type (eg: event)","x-ref":"#/components/parameters/schemaEntityType","index$":1},{"in":"path","name":"name","schema":{"type":"string"},"required":true,"description":"The entity name (eg: Added To Cart)","x-ref":"#/components/parameters/schemaEntityName","index$":2}]},"DELETE /projects/{projectId}/schemas/{entityType}":{"protocol":"http","parameters":[{"in":"path","name":"projectId","schema":{"type":"integer"},"required":true,"description":"Your project id (eg: 12345)","index$":0},{"in":"path","name":"entityType","schema":{"type":"string","enum":["event","profile"],"x-ref":"#/components/schemas/SchemaEntityType"},"required":true,"description":"The entity type (eg: event)","x-ref":"#/components/parameters/schemaEntityType","index$":1},{"in":"query","name":"entity_name","schema":{"type":"string"},"required":false,"description":"The entity name (eg: Added To Cart)","x-ref":"#/components/parameters/schemaEntityNameQuery","index$":2}]},"DELETE /projects/{projectId}/schemas/{entityType}/{name}":{"protocol":"http","parameters":[{"in":"path","name":"projectId","schema":{"type":"integer"},"required":true,"description":"Your project id (eg: 12345)","index$":0},{"in":"path","name":"entityType","schema":{"type":"string","enum":["event","profile"],"x-ref":"#/components/schemas/SchemaEntityType"},"required":true,"description":"The entity type (eg: event)","x-ref":"#/components/parameters/schemaEntityType","index$":1},{"in":"path","name":"name","schema":{"type":"string"},"required":true,"description":"The entity name (eg: Added To Cart)","x-ref":"#/components/parameters/schemaEntityName","index$":2}]},"DELETE /projects/{projectId}/schemas":{"protocol":"http","parameters":[{"in":"path","name":"projectId","schema":{"type":"integer"},"required":true,"description":"Your project id (eg: 12345)","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let schema_ref01_data = Object.values(setup.data.existing.schema)[0] as any

    // LIST
    const schema_ref01_ent = client.Schema()
    const schema_ref01_match: any = {}
    schema_ref01_match['project_id'] = setup.idmap['project01']

    const schema_ref01_list = (await schema_ref01_ent.list(schema_ref01_match)).map((e: any) => e.data())


    // LOAD
    const schema_ref01_match_dt0: any = {}
    schema_ref01_match_dt0.id = schema_ref01_data.id
    const schema_ref01_data_dt0 = (await schema_ref01_ent.load(schema_ref01_match_dt0)).data()
    assert(schema_ref01_data_dt0.id === schema_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/schema/SchemaTestData.json')

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
    ['schema01','schema02','schema03','project01','entity_type01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_LEXICON_SCHEMAS_TEST_SCHEMA_ENTID': idmap,
    'MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE': 'FALSE',
    'MIXPANEL_LEXICON_SCHEMAS_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_LEXICON_SCHEMAS_APIKEY': '',
    'MIXPANEL_LEXICON_SCHEMAS_SECRET': '',
    'MIXPANEL_LEXICON_SCHEMAS_SERVER_REGIONANDDOMAIN': "mixpanel",
  })

  idmap = env['MIXPANEL_LEXICON_SCHEMAS_TEST_SCHEMA_ENTID']

  const live = 'TRUE' === env.MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_LEXICON_SCHEMAS_TEST_SCHEMA_ENTID']
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
        secret: env.MIXPANEL_LEXICON_SCHEMAS_SECRET,
        server: {
          regionAndDomain: env.MIXPANEL_LEXICON_SCHEMAS_SERVER_REGIONANDDOMAIN,
        },
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
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
  
