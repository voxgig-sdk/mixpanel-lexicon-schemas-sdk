<?php
declare(strict_types=1);

// MixpanelLexiconSchemas SDK utility: prepare_headers

class MixpanelLexiconSchemasPrepareHeaders
{
    public static function call(MixpanelLexiconSchemasContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
