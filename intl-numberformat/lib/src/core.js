import { defineProperty, invariant, SupportedLocales, InitializeNumberFormat, FormatNumericToParts, ToNumber, CanonicalizeLocaleList, OrdinaryHasInstance, } from '@formatjs/ecma402-abstract';
import { currencyDigitsData } from './currency-digits.generated';
import { numberingSystemNames } from './numbering-systems.generated';
// eslint-disable-next-line import/no-cycle
import getInternalSlots from './get_internal_slots';
var RESOLVED_OPTIONS_KEYS = [
    'locale',
    'numberingSystem',
    'style',
    'currency',
    'currencyDisplay',
    'currencySign',
    'unit',
    'unitDisplay',
    'minimumIntegerDigits',
    'minimumFractionDigits',
    'maximumFractionDigits',
    'minimumSignificantDigits',
    'maximumSignificantDigits',
    'useGrouping',
    'notation',
    'compactDisplay',
    'signDisplay',
];
/**
 * https://tc39.es/ecma402/#sec-intl-numberformat-constructor
 */
export var NumberFormat = function (locales, options) {
    // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
    if (!this || !OrdinaryHasInstance(NumberFormat, this)) {
        return new NumberFormat(locales, options);
    }
    InitializeNumberFormat(this, locales, options, {
        getInternalSlots: getInternalSlots,
        localeData: NumberFormat.localeData,
        availableLocales: NumberFormat.availableLocales,
        getDefaultLocale: NumberFormat.getDefaultLocale,
        currencyDigitsData: currencyDigitsData,
        numberingSystemNames: numberingSystemNames,
    });
    var internalSlots = getInternalSlots(this);
    var dataLocale = internalSlots.dataLocale;
    var dataLocaleData = NumberFormat.localeData[dataLocale];
    invariant(dataLocaleData !== undefined, "Cannot load locale-dependent data for ".concat(dataLocale, "."));
    internalSlots.pl = new Intl.PluralRules(dataLocale, {
        minimumFractionDigits: internalSlots.minimumFractionDigits,
        maximumFractionDigits: internalSlots.maximumFractionDigits,
        minimumIntegerDigits: internalSlots.minimumIntegerDigits,
        minimumSignificantDigits: internalSlots.minimumSignificantDigits,
        maximumSignificantDigits: internalSlots.maximumSignificantDigits,
    });
    return this;
};
function formatToParts(x) {
    return FormatNumericToParts(this, toNumeric(x), {
        getInternalSlots: getInternalSlots,
    });
}
try {
    Object.defineProperty(formatToParts, 'name', {
        value: 'formatToParts',
        enumerable: false,
        writable: false,
        configurable: true,
    });
}
catch (e) {
    // In older browser (e.g Chrome 36 like polyfill.io)
    // TypeError: Cannot redefine property: name
}
defineProperty(NumberFormat.prototype, 'formatToParts', {
    value: formatToParts,
});
defineProperty(NumberFormat.prototype, 'resolvedOptions', {
    value: function resolvedOptions() {
        if (typeof this !== 'object' || !OrdinaryHasInstance(NumberFormat, this)) {
            throw TypeError('Method Intl.NumberFormat.prototype.resolvedOptions called on incompatible receiver');
        }
        var internalSlots = getInternalSlots(this);
        var ro = {};
        for (var _i = 0, RESOLVED_OPTIONS_KEYS_1 = RESOLVED_OPTIONS_KEYS; _i < RESOLVED_OPTIONS_KEYS_1.length; _i++) {
            var key = RESOLVED_OPTIONS_KEYS_1[_i];
            var value = internalSlots[key];
            if (value !== undefined) {
                ro[key] = value;
            }
        }
        return ro;
    },
});
var formatDescriptor = {
    enumerable: false,
    configurable: true,
    get: function () {
        if (typeof this !== 'object' || !OrdinaryHasInstance(NumberFormat, this)) {
            throw TypeError('Intl.NumberFormat format property accessor called on incompatible receiver');
        }
        var internalSlots = getInternalSlots(this);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var numberFormat = this;
        var boundFormat = internalSlots.boundFormat;
        if (boundFormat === undefined) {
            // https://tc39.es/proposal-unified-intl-numberformat/section11/numberformat_diff_out.html#sec-number-format-functions
            boundFormat = function (value) {
                // TODO: check bigint
                var x = toNumeric(value);
                return numberFormat
                    .formatToParts(x)
                    .map(function (x) { return x.value; })
                    .join('');
            };
            try {
                // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/prototype/format/format-function-name.js
                Object.defineProperty(boundFormat, 'name', {
                    configurable: true,
                    enumerable: false,
                    writable: false,
                    value: '',
                });
            }
            catch (e) {
                // In older browser (e.g Chrome 36 like polyfill.io)
                // TypeError: Cannot redefine property: name
            }
            internalSlots.boundFormat = boundFormat;
        }
        return boundFormat;
    },
};
try {
    // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/prototype/format/name.js
    Object.defineProperty(formatDescriptor.get, 'name', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: 'get format',
    });
}
catch (e) {
    // In older browser (e.g Chrome 36 like polyfill.io)
    // TypeError: Cannot redefine property: name
}
Object.defineProperty(NumberFormat.prototype, 'format', formatDescriptor);
// Static properties
defineProperty(NumberFormat, 'supportedLocalesOf', {
    value: function supportedLocalesOf(locales, options) {
        return SupportedLocales(NumberFormat.availableLocales, CanonicalizeLocaleList(locales), options);
    },
});
NumberFormat.__addLocaleData = function __addLocaleData() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
        var _b = data_1[_a], d = _b.data, locale = _b.locale;
        var minimizedLocale = new Intl.Locale(locale)
            .minimize()
            .toString();
        NumberFormat.localeData[locale] = NumberFormat.localeData[minimizedLocale] =
            d;
        NumberFormat.availableLocales.add(minimizedLocale);
        NumberFormat.availableLocales.add(locale);
        if (!NumberFormat.__defaultLocale) {
            NumberFormat.__defaultLocale = minimizedLocale;
        }
    }
};
NumberFormat.__addUnitData = function __addUnitData(locale, unitsData) {
    var _a = NumberFormat.localeData, _b = locale, existingData = _a[_b];
    if (!existingData) {
        throw new Error("Locale data for \"".concat(locale, "\" has not been loaded in NumberFormat. \nPlease __addLocaleData before adding additional unit data"));
    }
    for (var unit in unitsData.simple) {
        existingData.units.simple[unit] = unitsData.simple[unit];
    }
    for (var unit in unitsData.compound) {
        existingData.units.compound[unit] = unitsData.compound[unit];
    }
};
NumberFormat.__defaultLocale = '';
NumberFormat.localeData = {};
NumberFormat.availableLocales = new Set();
NumberFormat.getDefaultLocale = function () {
    return NumberFormat.__defaultLocale;
};
NumberFormat.polyfilled = true;
function toNumeric(val) {
    if (typeof val === 'bigint') {
        return val;
    }
    return ToNumber(val);
}
try {
    // IE11 does not have Symbol
    if (typeof Symbol !== 'undefined') {
        Object.defineProperty(NumberFormat.prototype, Symbol.toStringTag, {
            configurable: true,
            enumerable: false,
            writable: false,
            value: 'Intl.NumberFormat',
        });
    }
    // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/length.js
    Object.defineProperty(NumberFormat.prototype.constructor, 'length', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: 0,
    });
    // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/supportedLocalesOf/length.js
    Object.defineProperty(NumberFormat.supportedLocalesOf, 'length', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: 1,
    });
    Object.defineProperty(NumberFormat, 'prototype', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: NumberFormat.prototype,
    });
}
catch (e) {
    // Meta fix so we're test262-compliant, not important
}