-- MixpanelLexiconSchemas SDK error

local MixpanelLexiconSchemasError = {}
MixpanelLexiconSchemasError.__index = MixpanelLexiconSchemasError


function MixpanelLexiconSchemasError.new(code, msg, ctx)
  local self = setmetatable({}, MixpanelLexiconSchemasError)
  self.is_sdk_error = true
  self.sdk = "MixpanelLexiconSchemas"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MixpanelLexiconSchemasError:error()
  return self.msg
end


function MixpanelLexiconSchemasError:__tostring()
  return self.msg
end


return MixpanelLexiconSchemasError
