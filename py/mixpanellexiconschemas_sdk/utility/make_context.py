# MixpanelLexiconSchemas SDK utility: make_context

from mixpanellexiconschemas_sdk.core.context import MixpanelLexiconSchemasContext


def make_context_util(ctxmap, basectx):
    return MixpanelLexiconSchemasContext(ctxmap, basectx)
