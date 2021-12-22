"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolveLocale = void 0;
var LookupMatcher_1 = require("./LookupMatcher");
var BestFitMatcher_1 = require("./BestFitMatcher");
var utils_1 = require("./utils");
var UnicodeExtensionValue_1 = require("./UnicodeExtensionValue");
/**
 * https://tc39.es/ecma402/#sec-resolvelocale
 */
function ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData, getDefaultLocale) {
    var matcher = options.localeMatcher;
    var r;
    if (matcher === 'lookup') {
        r = LookupMatcher_1.LookupMatcher(availableLocales, requestedLocales, getDefaultLocale);
    }
    else {
        r = BestFitMatcher_1.BestFitMatcher(availableLocales, requestedLocales, getDefaultLocale);
    }
    var foundLocale = r.locale;
    var result = { locale: '', dataLocale: foundLocale };
    var supportedExtension = '-u';
    for (var _i = 0, relevantExtensionKeys_1 = relevantExtensionKeys; _i < relevantExtensionKeys_1.length; _i++) {
        var key = relevantExtensionKeys_1[_i];
        utils_1.invariant(foundLocale in localeData, "Missing locale data for " + foundLocale);
        var foundLocaleData = localeData[foundLocale];
        utils_1.invariant(typeof foundLocaleData === 'object' && foundLocaleData !== null, "locale data " + key + " must be an object");
        var keyLocaleData = foundLocaleData[key];
        utils_1.invariant(Array.isArray(keyLocaleData), "keyLocaleData for " + key + " must be an array");
        var value = keyLocaleData[0];
        utils_1.invariant(typeof value === 'string' || value === null, "value must be string or null but got " + typeof value + " in key " + key);
        var supportedExtensionAddition = '';
        if (r.extension) {
            var requestedValue = UnicodeExtensionValue_1.UnicodeExtensionValue(r.extension, key);
            if (requestedValue !== undefined) {
                if (requestedValue !== '') {
                    if (~keyLocaleData.indexOf(requestedValue)) {
                        value = requestedValue;
                        supportedExtensionAddition = "-" + key + "-" + value;
                    }
                }
                else if (~requestedValue.indexOf('true')) {
                    value = 'true';
                    supportedExtensionAddition = "-" + key;
                }
            }
        }
        if (key in options) {
            var optionsValue = options[key];
            utils_1.invariant(typeof optionsValue === 'string' ||
                typeof optionsValue === 'undefined' ||
                optionsValue === null, 'optionsValue must be String, Undefined or Null');
            if (~keyLocaleData.indexOf(optionsValue)) {
                if (optionsValue !== value) {
                    value = optionsValue;
                    supportedExtensionAddition = '';
                }
            }
        }
        result[key] = value;
        supportedExtension += supportedExtensionAddition;
    }
    if (supportedExtension.length > 2) {
        var privateIndex = foundLocale.indexOf('-x-');
        if (privateIndex === -1) {
            foundLocale = foundLocale + supportedExtension;
        }
        else {
            var preExtension = foundLocale.slice(0, privateIndex);
            var postExtension = foundLocale.slice(privateIndex, foundLocale.length);
            foundLocale = preExtension + supportedExtension + postExtension;
        }
        foundLocale = Intl.getCanonicalLocales(foundLocale)[0];
    }
    result.locale = foundLocale;
    return result;
}
exports.ResolveLocale = ResolveLocale;
