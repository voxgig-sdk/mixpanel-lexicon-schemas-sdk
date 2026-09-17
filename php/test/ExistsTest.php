<?php
declare(strict_types=1);

// MixpanelLexiconSchemas SDK exists test

require_once __DIR__ . '/../mixpanellexiconschemas_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = MixpanelLexiconSchemasSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
