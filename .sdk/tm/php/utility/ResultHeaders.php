<?php
declare(strict_types=1);

// MixpanelLexiconSchemas SDK utility: result_headers

class MixpanelLexiconSchemasResultHeaders
{
    public static function call(MixpanelLexiconSchemasContext $ctx): ?MixpanelLexiconSchemasResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
