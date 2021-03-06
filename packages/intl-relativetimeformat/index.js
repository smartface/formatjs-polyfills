"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");
var InitializeRelativeTimeFormat_1 = require("./abstract/InitializeRelativeTimeFormat");
var PartitionRelativeTimePattern_1 = require("./abstract/PartitionRelativeTimePattern");
var get_internal_slots_1 = (0, tslib_1.__importDefault)(require("./get_internal_slots"));
var RelativeTimeFormat = /** @class */ (function () {
    function RelativeTimeFormat(locales, options) {
        // test262/test/intl402/RelativeTimeFormat/constructor/constructor/newtarget-undefined.js
        // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
        var newTarget = this && this instanceof RelativeTimeFormat ? this.constructor : void 0;
        if (!newTarget) {
            throw new TypeError("Intl.RelativeTimeFormat must be called with 'new'");
        }
        return (0, InitializeRelativeTimeFormat_1.InitializeRelativeTimeFormat)(this, locales, options, {
            getInternalSlots: get_internal_slots_1.default,
            availableLocales: RelativeTimeFormat.availableLocales,
            relevantExtensionKeys: RelativeTimeFormat.relevantExtensionKeys,
            localeData: RelativeTimeFormat.localeData,
            getDefaultLocale: RelativeTimeFormat.getDefaultLocale,
        });
    }
    RelativeTimeFormat.prototype.format = function (value, unit) {
        if (typeof this !== 'object') {
            throw new TypeError('format was called on a non-object');
        }
        var internalSlots = (0, get_internal_slots_1.default)(this);
        if (!internalSlots.initializedRelativeTimeFormat) {
            throw new TypeError('format was called on a invalid context');
        }
        return (0, PartitionRelativeTimePattern_1.PartitionRelativeTimePattern)(this, Number(value), (0, ecma402_abstract_1.ToString)(unit), {
            getInternalSlots: get_internal_slots_1.default,
        })
            .map(function (el) { return el.value; })
            .join('');
    };
    RelativeTimeFormat.prototype.formatToParts = function (value, unit) {
        if (typeof this !== 'object') {
            throw new TypeError('formatToParts was called on a non-object');
        }
        var internalSlots = (0, get_internal_slots_1.default)(this);
        if (!internalSlots.initializedRelativeTimeFormat) {
            throw new TypeError('formatToParts was called on a invalid context');
        }
        return (0, PartitionRelativeTimePattern_1.PartitionRelativeTimePattern)(this, Number(value), (0, ecma402_abstract_1.ToString)(unit), { getInternalSlots: get_internal_slots_1.default });
    };
    RelativeTimeFormat.prototype.resolvedOptions = function () {
        if (typeof this !== 'object') {
            throw new TypeError('resolvedOptions was called on a non-object');
        }
        var internalSlots = (0, get_internal_slots_1.default)(this);
        if (!internalSlots.initializedRelativeTimeFormat) {
            throw new TypeError('resolvedOptions was called on a invalid context');
        }
        // test262/test/intl402/RelativeTimeFormat/prototype/resolvedOptions/type.js
        return {
            locale: internalSlots.locale,
            style: internalSlots.style,
            numeric: internalSlots.numeric,
            numberingSystem: internalSlots.numberingSystem,
        };
    };
    RelativeTimeFormat.supportedLocalesOf = function (locales, options) {
        return (0, ecma402_abstract_1.SupportedLocales)(RelativeTimeFormat.availableLocales, (0, ecma402_abstract_1.CanonicalizeLocaleList)(locales), options);
    };
    RelativeTimeFormat.__addLocaleData = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
            var _b = data_1[_a], d = _b.data, locale = _b.locale;
            var minimizedLocale = new Intl.Locale(locale)
                .minimize()
                .toString();
            RelativeTimeFormat.localeData[locale] = RelativeTimeFormat.localeData[minimizedLocale] = d;
            RelativeTimeFormat.availableLocales.add(minimizedLocale);
            RelativeTimeFormat.availableLocales.add(locale);
            if (!RelativeTimeFormat.__defaultLocale) {
                RelativeTimeFormat.__defaultLocale = minimizedLocale;
            }
        }
    };
    RelativeTimeFormat.getDefaultLocale = function () {
        return RelativeTimeFormat.__defaultLocale;
    };
    RelativeTimeFormat.localeData = {};
    RelativeTimeFormat.availableLocales = new Set();
    RelativeTimeFormat.__defaultLocale = '';
    RelativeTimeFormat.relevantExtensionKeys = ['nu'];
    RelativeTimeFormat.polyfilled = true;
    return RelativeTimeFormat;
}());
exports.default = RelativeTimeFormat;
try {
    // IE11 does not have Symbol
    if (typeof Symbol !== 'undefined') {
        Object.defineProperty(RelativeTimeFormat.prototype, Symbol.toStringTag, {
            value: 'Intl.RelativeTimeFormat',
            writable: false,
            enumerable: false,
            configurable: true,
        });
    }
    // https://github.com/tc39/test262/blob/master/test/intl402/RelativeTimeFormat/constructor/length.js
    Object.defineProperty(RelativeTimeFormat.prototype.constructor, 'length', {
        value: 0,
        writable: false,
        enumerable: false,
        configurable: true,
    });
    // https://github.com/tc39/test262/blob/master/test/intl402/RelativeTimeFormat/constructor/supportedLocalesOf/length.js
    Object.defineProperty(RelativeTimeFormat.supportedLocalesOf, 'length', {
        value: 1,
        writable: false,
        enumerable: false,
        configurable: true,
    });
}
catch (e) {
    // Meta fix so we're test262-compliant, not important
}
