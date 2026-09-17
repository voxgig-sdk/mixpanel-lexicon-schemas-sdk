# MixpanelLexiconSchemas SDK exists test

import pytest
from mixpanellexiconschemas_sdk import MixpanelLexiconSchemasSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MixpanelLexiconSchemasSDK.test(None, None)
        assert testsdk is not None
