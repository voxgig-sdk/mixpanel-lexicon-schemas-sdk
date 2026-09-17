
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')


const { MixpanelLexiconSchemasSDK } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
} = require('../../utility')


describe('SchemaDirect', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE'))

  test('direct-exists', async () => {
    const sdk = new MixpanelLexiconSchemasSDK({
      // Concrete base: a live construction must satisfy any server
      // variables a templated base URL declares; overriding base with a
      // literal (as the direct flow tests do) sidesteps the requirement.
      base: 'http://localhost:8080',
      system: { fetch: async () => ({}) }
    })
    assert('function' === typeof sdk.direct)
    assert('function' === typeof sdk.prepare)
  })


  test('direct-load-schema', async (t) => {
    if (liveScenariosActive()) { t.skip('Covered by live operation scenarios'); return }
    const setup = directSetup({ id: 'direct01' })
    const { client, calls } = setup

    const params = {}
    if (setup.live) {
      const listResult = await client.direct({
        path: 'projects/{project_id}/schemas',
        method: 'GET',
        params: {
        project_id: setup.idmap['project01'],
        },
      })
      assert(listResult.ok === true)
      const listData = listResult.data
      if (!Array.isArray(listData) || listData.length === 0) {
        throw new Error('Live load blocked: discovery returned no usable entities')
      }
      params.id = listData[0].id
      params.project_id = setup.idmap['project01']
    } else {
      params.id = 'direct01'
      params.project_id = 'direct02'
    }

    const result = await client.direct({
      path: 'projects/{project_id}/schemas/{id}',
      method: 'GET',
      params,
    })

    assert(result.ok === true)
    assert(setup.live ? result.status >= 200 && result.status < 300 : result.status === 200)
    assert(null != result.data)

    if (!setup.live) {
      assert(result.data.id === 'direct01')
      assert(calls.length === 1)
      assert(calls[0].init.method === 'GET')
      assert(calls[0].url.includes('direct01'))
      assert(calls[0].url.includes('direct02'))
    }
  })

  test('direct-list-schema', async (t) => {
    if (liveScenariosActive()) { t.skip('Covered by live operation scenarios'); return }
    const setup = directSetup([{ id: 'direct01' }, { id: 'direct02' }])
    const { client, calls } = setup

    const params = {}
    if (setup.live) {
      params.project_id = setup.idmap['project01']
    } else {
      params.project_id = 'direct01'
    }

    const result = await client.direct({
      path: 'projects/{project_id}/schemas',
      method: 'GET',
      params,
    })

    assert(result.ok === true)
    assert(setup.live ? result.status >= 200 && result.status < 300 : result.status === 200)
    assert(Array.isArray(result.data))

    if (!setup.live) {
      assert(result.data.length === 2)
      assert(calls.length === 1)
      assert(calls[0].init.method === 'GET')
      assert(calls[0].url.includes('direct01'))
    }
  })

})



function liveScenariosActive() { return false && process.env.MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE === 'TRUE' }
function directSetup(mockres) {
  const calls = []

  const env = envOverride({
    'MIXPANEL_LEXICON_SCHEMAS_TEST_SCHEMA_ENTID': {},
    'MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE': 'FALSE',
    'MIXPANEL_LEXICON_SCHEMAS_APIKEY': '',
    'MIXPANEL_LEXICON_SCHEMAS_SERVER_REGIONANDDOMAIN': "mixpanel",
  })

  const live = 'TRUE' === env.MIXPANEL_LEXICON_SCHEMAS_TEST_LIVE

  if (live) {
    // Merged so the generated fields win: sdk-test-control.json's
    // test.client.options adds to the live client, it does not redirect it.
    const client = new MixpanelLexiconSchemasSDK(
      Object.assign({}, liveClientOptions(), {
      apikey: env.MIXPANEL_LEXICON_SCHEMAS_APIKEY,
      server: {
        regionAndDomain: env.MIXPANEL_LEXICON_SCHEMAS_SERVER_REGIONANDDOMAIN,
      },
      }))

    let idmap = env['MIXPANEL_LEXICON_SCHEMAS_TEST_SCHEMA_ENTID']
    if ('string' === typeof idmap && idmap.startsWith('{')) {
      idmap = JSON.parse(idmap)
    }

    return { client, calls, live, idmap }
  }

  const mockFetch = async (url, init) => {
    calls.push({ url, init })
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      json: async () => (null != mockres ? mockres : { id: 'direct01' }),
    }
  }

  const client = new MixpanelLexiconSchemasSDK({
    base: 'http://localhost:8080',
    system: { fetch: mockFetch },
  })

  return { client, calls, live, idmap: {} }
}
  
