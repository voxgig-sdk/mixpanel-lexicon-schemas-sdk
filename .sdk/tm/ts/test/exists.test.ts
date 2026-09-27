
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MixpanelLexiconSchemasSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MixpanelLexiconSchemasSDK.test()
    equal(testsdk instanceof MixpanelLexiconSchemasSDK, true,
      'MixpanelLexiconSchemasSDK.test() must return a client synchronously')
  })

})
