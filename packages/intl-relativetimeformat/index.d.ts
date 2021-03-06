import { LocaleFieldsData, RelativeTimeLocaleData } from '@formatjs/ecma402-abstract';
export default class RelativeTimeFormat {
    constructor(locales?: string | string[], options?: Intl.RelativeTimeFormatOptions);
    format(value: number, unit: Intl.RelativeTimeFormatUnit): string;
    formatToParts(value: number, unit: Intl.RelativeTimeFormatUnit): Intl.RelativeTimeFormatPart[];
    resolvedOptions(): Intl.ResolvedRelativeTimeFormatOptions;
    static supportedLocalesOf(locales: string | string[], options?: Pick<Intl.RelativeTimeFormatOptions, 'localeMatcher'>): string[];
    static __addLocaleData(...data: RelativeTimeLocaleData[]): void;
    static localeData: Record<string, LocaleFieldsData>;
    private static availableLocales;
    private static __defaultLocale;
    private static getDefaultLocale;
    private static relevantExtensionKeys;
    static polyfilled: boolean;
}
//# sourceMappingURL=index.d.ts.map