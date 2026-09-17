package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewBatchUploadSchemaEntityFunc func(client *MixpanelLexiconSchemasSDK, entopts map[string]any) MixpanelLexiconSchemasEntity

var NewProjectEntityFunc func(client *MixpanelLexiconSchemasSDK, entopts map[string]any) MixpanelLexiconSchemasEntity

var NewSchemaEntityFunc func(client *MixpanelLexiconSchemasSDK, entopts map[string]any) MixpanelLexiconSchemasEntity

var NewUploadSchemaEntityFunc func(client *MixpanelLexiconSchemasSDK, entopts map[string]any) MixpanelLexiconSchemasEntity

