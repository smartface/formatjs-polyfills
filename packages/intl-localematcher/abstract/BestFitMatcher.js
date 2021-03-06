"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BestFitMatcher = void 0;
var BestAvailableLocale_1 = require("./BestAvailableLocale");
var utils_1 = require("./utils");
/**
 * https://tc39.es/ecma402/#sec-bestfitmatcher
 * @param availableLocales
 * @param requestedLocales
 * @param getDefaultLocale
 */
function BestFitMatcher(availableLocales, requestedLocales, getDefaultLocale) {
    var minimizedAvailableLocaleMap = Array.from(availableLocales).reduce(function (all, l) {
        all[l] = l;
        return all;
    }, {});
    var minimizedAvailableLocales = new Set();
    availableLocales.forEach(function (locale) {
        var minimizedLocale = new Intl.Locale(locale)
            .minimize()
            .toString();
        minimizedAvailableLocaleMap[minimizedLocale] = locale;
        minimizedAvailableLocales.add(minimizedLocale);
    });
    var foundLocale;
    for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
        var l = requestedLocales_1[_i];
        if (foundLocale) {
            break;
        }
        var noExtensionLocale = l.replace(utils_1.UNICODE_EXTENSION_SEQUENCE_REGEX, '');
        if (availableLocales.has(noExtensionLocale)) {
            foundLocale = noExtensionLocale;
            break;
        }
        if (minimizedAvailableLocales.has(noExtensionLocale)) {
            foundLocale = noExtensionLocale;
            break;
        }
        var locale = new Intl.Locale(noExtensionLocale);
        var maximizedRequestedLocale = locale.maximize().toString();
        var minimizedRequestedLocale = locale.minimize().toString();
        // Check minimized locale
        if (minimizedAvailableLocales.has(minimizedRequestedLocale)) {
            foundLocale = minimizedRequestedLocale;
            break;
        }
        // Lookup algo on maximized locale
        foundLocale = BestAvailableLocale_1.BestAvailableLocale(minimizedAvailableLocales, maximizedRequestedLocale);
    }
    return {
        locale: (foundLocale && minimizedAvailableLocaleMap[foundLocale]) ||
            getDefaultLocale(),
    };
}
exports.BestFitMatcher = BestFitMatcher;
