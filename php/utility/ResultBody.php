<?php
declare(strict_types=1);

// MixpanelLexiconSchemas SDK utility: result_body

class MixpanelLexiconSchemasResultBody
{
    public static function call(MixpanelLexiconSchemasContext $ctx): ?MixpanelLexiconSchemasResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
