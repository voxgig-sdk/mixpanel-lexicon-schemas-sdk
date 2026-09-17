-- MixpanelLexiconSchemas SDK exists test

local sdk = require("mixpanel-lexicon-schemas_sdk")

describe("MixpanelLexiconSchemasSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
