<?php
declare(strict_types=1);

// MixpanelLexiconSchemas SDK base feature

class MixpanelLexiconSchemasBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MixpanelLexiconSchemasContext $ctx, array $options): void {}
    public function PostConstruct(MixpanelLexiconSchemasContext $ctx): void {}
    public function PostConstructEntity(MixpanelLexiconSchemasContext $ctx): void {}
    public function SetData(MixpanelLexiconSchemasContext $ctx): void {}
    public function GetData(MixpanelLexiconSchemasContext $ctx): void {}
    public function GetMatch(MixpanelLexiconSchemasContext $ctx): void {}
    public function SetMatch(MixpanelLexiconSchemasContext $ctx): void {}
    public function PrePoint(MixpanelLexiconSchemasContext $ctx): void {}
    public function PreSpec(MixpanelLexiconSchemasContext $ctx): void {}
    public function PreRequest(MixpanelLexiconSchemasContext $ctx): void {}
    public function PreResponse(MixpanelLexiconSchemasContext $ctx): void {}
    public function PreResult(MixpanelLexiconSchemasContext $ctx): void {}
    public function PreDone(MixpanelLexiconSchemasContext $ctx): void {}
    public function PreUnexpected(MixpanelLexiconSchemasContext $ctx): void {}
}
