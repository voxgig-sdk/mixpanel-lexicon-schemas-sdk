# MixpanelLexiconSchemas SDK error

from __future__ import annotations


class MixpanelLexiconSchemasError(Exception):
    def __init__(self, code="", msg="", ctx=None):
        super().__init__(msg)
        self.is_sdk_error = True
        self.sdk = "MixpanelLexiconSchemas"
        self.code = code
        self.msg = msg
        self.ctx = ctx
        self.result = None
        self.spec = None

    def __str__(self):
        return self.msg
