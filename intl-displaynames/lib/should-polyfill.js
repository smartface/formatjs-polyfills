import { match } from '@formatjs/intl-localematcher';
import { supportedLocales } from './supported-locales';
/**
 * https://bugs.chromium.org/p/chromium/issues/detail?id=1097432
 */
function hasMissingICUBug() {
    var DisplayNames = Intl.DisplayNames;
    if (DisplayNames && !DisplayNames.polyfilled) {
        return (new DisplayNames(['en'], {
            type: 'region',
        }).of('CA') === 'CA');
    }
    return false;
}
/**
 * https://bugs.chromium.org/p/chromium/issues/detail?id=1176979
 */
function hasScriptBug() {
    var DisplayNames = Intl.DisplayNames;
    if (DisplayNames && !DisplayNames.polyfilled) {
        return (new DisplayNames(['en'], {
            type: 'script',
        }).of('arab') !== 'Arabic');
    }
    return false;
}
function supportedLocalesOf(locale) {
    if (!locale) {
        return true;
    }
    var locales = Array.isArray(locale) ? locale : [locale];
    return (Intl.DisplayNames.supportedLocalesOf(locales).length ===
        locales.length);
}
export function _shouldPolyfillWithoutLocale() {
    return !Intl.DisplayNames || hasMissingICUBug() || hasScriptBug();
}
export function shouldPolyfill(locale) {
    if (locale === void 0) { locale = 'en'; }
    if (_shouldPolyfillWithoutLocale() || !supportedLocalesOf(locale)) {
        return match([locale], supportedLocales, 'en');
    }
}
