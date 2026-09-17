<?php
declare(strict_types=1);

// MixpanelLexiconSchemas SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MixpanelLexiconSchemasMakeContext
{
    public static function call(array $ctxmap, ?MixpanelLexiconSchemasContext $basectx): MixpanelLexiconSchemasContext
    {
        return new MixpanelLexiconSchemasContext($ctxmap, $basectx);
    }
}
