import { match } from '@formatjs/intl-localematcher';
import { supportedLocales } from './supported-locales';
function supportedLocalesOf(locale) {
    if (!locale) {
        return true;
    }
    var locales = Array.isArray(locale) ? locale : [locale];
    return Intl.PluralRules.supportedLocalesOf(locales).length === locales.length;
}
export function shouldPolyfill(locale) {
    if (locale === void 0) { locale = 'en'; }
    if (!('PluralRules' in Intl) ||
        new Intl.PluralRules('en', { minimumFractionDigits: 2 }).select(1) ===
            'one' ||
        !supportedLocalesOf(locale)) {
        return locale ? match([locale], supportedLocales, 'en') : undefined;
    }
}
