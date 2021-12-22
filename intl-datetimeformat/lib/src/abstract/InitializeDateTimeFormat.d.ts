import { IntlDateTimeFormatInternal, DateTimeFormatLocaleInternalData } from '@formatjs/ecma402-abstract';
/**
 * https://tc39.es/ecma402/#sec-initializedatetimeformat
 * @param dtf DateTimeFormat
 * @param locales locales
 * @param opts options
 */
export declare function InitializeDateTimeFormat(dtf: Intl.DateTimeFormat, locales: string | string[] | undefined, opts: Intl.DateTimeFormatOptions | undefined, { getInternalSlots, availableLocales, localeData, getDefaultLocale, getDefaultTimeZone, relevantExtensionKeys, tzData, uppercaseLinks, }: {
    getInternalSlots(dtf: Intl.DateTimeFormat): IntlDateTimeFormatInternal;
    availableLocales: Set<string>;
    getDefaultLocale(): string;
    getDefaultTimeZone(): string;
    relevantExtensionKeys: string[];
    localeData: Record<string, DateTimeFormatLocaleInternalData | undefined>;
    tzData: Record<string, unknown>;
    uppercaseLinks: Record<string, string>;
}): Intl.DateTimeFormat;
//# sourceMappingURL=InitializeDateTimeFormat.d.ts.map