
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { MixpanelLexiconSchemasSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MixpanelLexiconSchemasSDK.test()
    equal(null !== testsdk, true)
  })

})
