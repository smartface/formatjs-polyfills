import { PluralRulesInternal, PluralRulesData } from '@formatjs/ecma402-abstract';
export declare function InitializePluralRules(pl: Intl.PluralRules, locales: string | string[] | undefined, options: Intl.PluralRulesOptions | undefined, { availableLocales, relevantExtensionKeys, localeData, getDefaultLocale, getInternalSlots, }: {
    availableLocales: Set<string>;
    relevantExtensionKeys: string[];
    localeData: Record<string, PluralRulesData | undefined>;
    getDefaultLocale(): string;
    getInternalSlots(pl: Intl.PluralRules): PluralRulesInternal;
}): Intl.PluralRules;
//# sourceMappingURL=InitializePluralRules.d.ts.map