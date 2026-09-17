# MixpanelLexiconSchemas SDK feature factory

from mixpanellexiconschemas_sdk.feature.base_feature import MixpanelLexiconSchemasBaseFeature
from mixpanellexiconschemas_sdk.feature.debug_feature import MixpanelLexiconSchemasDebugFeature
from mixpanellexiconschemas_sdk.feature.idempotency_feature import MixpanelLexiconSchemasIdempotencyFeature
from mixpanellexiconschemas_sdk.feature.metrics_feature import MixpanelLexiconSchemasMetricsFeature
from mixpanellexiconschemas_sdk.feature.paging_feature import MixpanelLexiconSchemasPagingFeature
from mixpanellexiconschemas_sdk.feature.ratelimit_feature import MixpanelLexiconSchemasRatelimitFeature
from mixpanellexiconschemas_sdk.feature.retry_feature import MixpanelLexiconSchemasRetryFeature
from mixpanellexiconschemas_sdk.feature.test_feature import MixpanelLexiconSchemasTestFeature
from mixpanellexiconschemas_sdk.feature.timeout_feature import MixpanelLexiconSchemasTimeoutFeature


_FEATURES = {
    "base": lambda: MixpanelLexiconSchemasBaseFeature(),
    "debug": lambda: MixpanelLexiconSchemasDebugFeature(),
    "idempotency": lambda: MixpanelLexiconSchemasIdempotencyFeature(),
    "metrics": lambda: MixpanelLexiconSchemasMetricsFeature(),
    "paging": lambda: MixpanelLexiconSchemasPagingFeature(),
    "ratelimit": lambda: MixpanelLexiconSchemasRatelimitFeature(),
    "retry": lambda: MixpanelLexiconSchemasRetryFeature(),
    "test": lambda: MixpanelLexiconSchemasTestFeature(),
    "timeout": lambda: MixpanelLexiconSchemasTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
