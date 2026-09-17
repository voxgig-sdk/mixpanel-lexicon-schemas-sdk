import { Context } from './Context';
declare class MixpanelLexiconSchemasError extends Error {
    isMixpanelLexiconSchemasError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { MixpanelLexiconSchemasError };
