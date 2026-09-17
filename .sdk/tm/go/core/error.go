package core

type MixpanelLexiconSchemasError struct {
	IsMixpanelLexiconSchemasError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMixpanelLexiconSchemasError(code string, msg string, ctx *Context) *MixpanelLexiconSchemasError {
	return &MixpanelLexiconSchemasError{
		IsMixpanelLexiconSchemasError: true,
		Sdk:              "MixpanelLexiconSchemas",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MixpanelLexiconSchemasError) Error() string {
	return e.Msg
}
