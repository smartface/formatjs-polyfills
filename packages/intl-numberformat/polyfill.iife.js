(function() {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = function(target) {
    return __defProp(target, "__esModule", { value: true });
  };
  var __commonJS = function(cb, mod) {
    return function __require() {
      return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
  };
  var __reExport = function(target, module, desc) {
    if (module && typeof module === "object" || typeof module === "function")
      for (var keys = __getOwnPropNames(module), i = 0, n = keys.length, key; i < n; i++) {
        key = keys[i];
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: function(k) {
            return module[k];
          }.bind(null, key), enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
      }
    return target;
  };
  var __toModule = function(module) {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: function() {
      return module.default;
    }, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // bazel-out/darwin-fastbuild/bin/packages/intl-localematcher/abstract/utils.js
  var require_utils = __commonJS({
    "bazel-out/darwin-fastbuild/bin/packages/intl-localematcher/abstract/utils.js": function(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.invariant = exports.UNICODE_EXTENSION_SEQUENCE_REGEX = void 0;
      exports.UNICODE_EXTENSION_SEQUENCE_REGEX = /-u(?:-[0-9a-z]{2,8})+/gi;
      function invariant2(condition, message, Err) {
        if (Err === void 0) {
          Err = Error;
        }
        if (!condition) {
          throw new Err(message);
        }
      }
      exports.invariant = invariant2;
    }
  });

  // bazel-out/darwin-fastbuild/bin/packages/intl-localematcher/abstract/BestAvailableLocale.js
  var require_BestAvailableLocale = __commonJS({
    "bazel-out/darwin-fastbuild/bin/packages/intl-localematcher/abstract/BestAvailableLocale.js": function(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BestAvailableLocale = void 0;
      function BestAvailableLocale(availableLocales, locale) {
        var candidate = locale;
        while (true) {
          if (availableLocales.has(candidate)) {
            return candidate;
          }
          var pos = candidate.lastIndexOf("-");
          if (!~pos) {
            return void 0;
          }
          if (pos >= 2 && candidate[pos - 2] === "-") {
            pos -= 2;
          }
          candidate = candidate.slice(0, pos);
        }
      }
      exports.BestAvailableLocale = BestAvailableLocale;
    }
  });

  // bazel-out/darwin-fastbuild/bin/packages/intl-localematcher/abstract/LookupMatcher.js
  var require_LookupMatcher = __commonJS({
    "bazel-out/darwin-fastbuild/bin/packages/intl-localematcher/abstract/LookupMatcher.js": function(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.LookupMatcher = void 0;
      var utils_1 = require_utils();
      var BestAvailableLocale_1 = require_BestAvailableLocale();
      function LookupMatcher(availableLocales, requestedLocales, getDefaultLocale) {
        var result = { locale: "" };
        for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
          var locale = requestedLocales_1[_i];
          var noExtensionLocale = locale.replace(utils_1.UNICODE_EXTENSION_SEQUENCE_REGEX, "");
          var availableLocale = (0, BestAvailableLocale_1.BestAvailableLocale)(availableLocales, noExtensionLocale);
          if (availableLocale) {
            result.locale = availableLocale;
            if (locale !== noExtensionLocale) {
              result.extension = locale.slice(noExtensionLocale.length + 1, locale.length);
            }
            return result;
          }
        }
        result.locale = getDefaultLocale();
        return result;
      }
      exports.LookupMatcher = LookupMatcher;
    }
  });

  // bazel-out/darwin-fastbuild/bin/packages/intl-localematcher/abstract/BestFitMatcher.js
  var require_BestFitMatcher = __commonJS({
    "bazel-out/darwin-fastbuild/bin/packages/intl-localematcher/abstract/BestFitMatcher.js": function(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BestFitMatcher = void 0;
      var BestAvailableLocale_1 = require_BestAvailableLocale();
      var utils_1 = require_utils();
      function BestFitMatcher(availableLocales, requestedLocales, getDefaultLocale) {
        var minimizedAvailableLocaleMap = Array.from(availableLocales).reduce(function(all, l2) {
          all[l2] = l2;
          return all;
        }, {});
        var minimizedAvailableLocales = new Set();
        availableLocales.forEach(function(locale2) {
          var minimizedLocale = new Intl.Locale(locale2).minimize().toString();
          minimizedAvailableLocaleMap[minimizedLocale] = locale2;
          minimizedAvailableLocales.add(minimizedLocale);
        });
        var foundLocale;
        for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
          var l = requestedLocales_1[_i];
          if (foundLocale) {
            break;
          }
          var noExtensionLocale = l.replace(utils_1.UNICODE_EXTENSION_SEQUENCE_REGEX, "");
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
          if (minimizedAvailableLocales.has(minimizedRequestedLocale)) {
            foundLocale = minimizedRequestedLocale;
            break;
          }
          foundLocale = (0, BestAvailableLocale_1.BestAvailableLocale)(minimizedAvailableLocales, maximizedRequestedLocale);
        }
        return {
          locale: foundLocale && minimizedAvailableLocaleMap[foundLocale] || getDefaultLocale()
        };
      }
      exports.BestFitMatcher = BestFitMatcher;
    }
  });

  // bazel-out/darwin-fastbuild/bin/packages/intl-localematcher/abstract/UnicodeExtensionValue.js
  var require_UnicodeExtensionValue = __commonJS({
    "bazel-out/darwin-fastbuild/bin/packages/intl-localematcher/abstract/UnicodeExtensionValue.js": function(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.UnicodeExtensionValue = void 0;
      var utils_1 = require_utils();
      function UnicodeExtensionValue(extension, key) {
        (0, utils_1.invariant)(key.length === 2, "key must have 2 elements");
        var size = extension.length;
        var searchValue = "-".concat(key, "-");
        var pos = extension.indexOf(searchValue);
        if (pos !== -1) {
          var start = pos + 4;
          var end = start;
          var k = start;
          var done = false;
          while (!done) {
            var e = extension.indexOf("-", k);
            var len = void 0;
            if (e === -1) {
              len = size - k;
            } else {
              len = e - k;
            }
            if (len === 2) {
              done = true;
            } else if (e === -1) {
              end = size;
              done = true;
            } else {
              end = e;
              k = e + 1;
            }
          }
          return extension.slice(start, end);
        }
        searchValue = "-".concat(key);
        pos = extension.indexOf(searchValue);
        if (pos !== -1 && pos + 3 === size) {
          return "";
        }
        return void 0;
      }
      exports.UnicodeExtensionValue = UnicodeExtensionValue;
    }
  });

  // bazel-out/darwin-fastbuild/bin/packages/intl-localematcher/abstract/ResolveLocale.js
  var require_ResolveLocale = __commonJS({
    "bazel-out/darwin-fastbuild/bin/packages/intl-localematcher/abstract/ResolveLocale.js": function(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ResolveLocale = void 0;
      var LookupMatcher_1 = require_LookupMatcher();
      var BestFitMatcher_1 = require_BestFitMatcher();
      var utils_1 = require_utils();
      var UnicodeExtensionValue_1 = require_UnicodeExtensionValue();
      function ResolveLocale2(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData, getDefaultLocale) {
        var matcher = options.localeMatcher;
        var r;
        if (matcher === "lookup") {
          r = (0, LookupMatcher_1.LookupMatcher)(availableLocales, requestedLocales, getDefaultLocale);
        } else {
          r = (0, BestFitMatcher_1.BestFitMatcher)(availableLocales, requestedLocales, getDefaultLocale);
        }
        var foundLocale = r.locale;
        var result = { locale: "", dataLocale: foundLocale };
        var supportedExtension = "-u";
        for (var _i = 0, relevantExtensionKeys_1 = relevantExtensionKeys; _i < relevantExtensionKeys_1.length; _i++) {
          var key = relevantExtensionKeys_1[_i];
          (0, utils_1.invariant)(foundLocale in localeData, "Missing locale data for ".concat(foundLocale));
          var foundLocaleData = localeData[foundLocale];
          (0, utils_1.invariant)(typeof foundLocaleData === "object" && foundLocaleData !== null, "locale data ".concat(key, " must be an object"));
          var keyLocaleData = foundLocaleData[key];
          (0, utils_1.invariant)(Array.isArray(keyLocaleData), "keyLocaleData for ".concat(key, " must be an array"));
          var value = keyLocaleData[0];
          (0, utils_1.invariant)(typeof value === "string" || value === null, "value must be string or null but got ".concat(typeof value, " in key ").concat(key));
          var supportedExtensionAddition = "";
          if (r.extension) {
            var requestedValue = (0, UnicodeExtensionValue_1.UnicodeExtensionValue)(r.extension, key);
            if (requestedValue !== void 0) {
              if (requestedValue !== "") {
                if (~keyLocaleData.indexOf(requestedValue)) {
                  value = requestedValue;
                  supportedExtensionAddition = "-".concat(key, "-").concat(value);
                }
              } else if (~requestedValue.indexOf("true")) {
                value = "true";
                supportedExtensionAddition = "-".concat(key);
              }
            }
          }
          if (key in options) {
            var optionsValue = options[key];
            (0, utils_1.invariant)(typeof optionsValue === "string" || typeof optionsValue === "undefined" || optionsValue === null, "optionsValue must be String, Undefined or Null");
            if (~keyLocaleData.indexOf(optionsValue)) {
              if (optionsValue !== value) {
                value = optionsValue;
                supportedExtensionAddition = "";
              }
            }
          }
          result[key] = value;
          supportedExtension += supportedExtensionAddition;
        }
        if (supportedExtension.length > 2) {
          var privateIndex = foundLocale.indexOf("-x-");
          if (privateIndex === -1) {
            foundLocale = foundLocale + supportedExtension;
          } else {
            var preExtension = foundLocale.slice(0, privateIndex);
            var postExtension = foundLocale.slice(privateIndex, foundLocale.length);
            foundLocale = preExtension + supportedExtension + postExtension;
          }
          foundLocale = Intl.getCanonicalLocales(foundLocale)[0];
        }
        result.locale = foundLocale;
        return result;
      }
      exports.ResolveLocale = ResolveLocale2;
    }
  });

  // bazel-out/darwin-fastbuild/bin/packages/intl-localematcher/abstract/LookupSupportedLocales.js
  var require_LookupSupportedLocales = __commonJS({
    "bazel-out/darwin-fastbuild/bin/packages/intl-localematcher/abstract/LookupSupportedLocales.js": function(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.LookupSupportedLocales = void 0;
      var utils_1 = require_utils();
      var BestAvailableLocale_1 = require_BestAvailableLocale();
      function LookupSupportedLocales2(availableLocales, requestedLocales) {
        var subset = [];
        for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
          var locale = requestedLocales_1[_i];
          var noExtensionLocale = locale.replace(utils_1.UNICODE_EXTENSION_SEQUENCE_REGEX, "");
          var availableLocale = (0, BestAvailableLocale_1.BestAvailableLocale)(availableLocales, noExtensionLocale);
          if (availableLocale) {
            subset.push(availableLocale);
          }
        }
        return subset;
      }
      exports.LookupSupportedLocales = LookupSupportedLocales2;
    }
  });

  // bazel-out/darwin-fastbuild/bin/packages/intl-localematcher/index.js
  var require_intl_localematcher = __commonJS({
    "bazel-out/darwin-fastbuild/bin/packages/intl-localematcher/index.js": function(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ResolveLocale = exports.LookupSupportedLocales = exports.match = void 0;
      var ResolveLocale_1 = require_ResolveLocale();
      function match2(requestedLocales, availableLocales, defaultLocale, opts) {
        var locales = availableLocales.reduce(function(all, l) {
          all.add(l);
          return all;
        }, new Set());
        return (0, ResolveLocale_1.ResolveLocale)(locales, requestedLocales, {
          localeMatcher: (opts === null || opts === void 0 ? void 0 : opts.algorithm) || "best fit"
        }, [], {}, function() {
          return defaultLocale;
        }).locale;
      }
      exports.match = match2;
      var LookupSupportedLocales_1 = require_LookupSupportedLocales();
      Object.defineProperty(exports, "LookupSupportedLocales", { enumerable: true, get: function() {
        return LookupSupportedLocales_1.LookupSupportedLocales;
      } });
      var ResolveLocale_2 = require_ResolveLocale();
      Object.defineProperty(exports, "ResolveLocale", { enumerable: true, get: function() {
        return ResolveLocale_2.ResolveLocale;
      } });
    }
  });

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/CanonicalizeLocaleList.js
  function CanonicalizeLocaleList(locales) {
    return Intl.getCanonicalLocales(locales);
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/262.js
  function ToString(o) {
    if (typeof o === "symbol") {
      throw TypeError("Cannot convert a Symbol value to a string");
    }
    return String(o);
  }
  function ToNumber(val) {
    if (val === void 0) {
      return NaN;
    }
    if (val === null) {
      return 0;
    }
    if (typeof val === "boolean") {
      return val ? 1 : 0;
    }
    if (typeof val === "number") {
      return val;
    }
    if (typeof val === "symbol" || typeof val === "bigint") {
      throw new TypeError("Cannot convert symbol/bigint to number");
    }
    return Number(val);
  }
  function ToObject(arg) {
    if (arg == null) {
      throw new TypeError("undefined/null cannot be converted to object");
    }
    return Object(arg);
  }
  function SameValue(x, y) {
    if (Object.is) {
      return Object.is(x, y);
    }
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    }
    return x !== x && y !== y;
  }
  function ArrayCreate(len) {
    return new Array(len);
  }
  function HasOwnProperty(o, prop) {
    return Object.prototype.hasOwnProperty.call(o, prop);
  }
  var MINUTES_PER_HOUR = 60;
  var SECONDS_PER_MINUTE = 60;
  var MS_PER_SECOND = 1e3;
  var MS_PER_MINUTE = MS_PER_SECOND * SECONDS_PER_MINUTE;
  var MS_PER_HOUR = MS_PER_MINUTE * MINUTES_PER_HOUR;
  function IsCallable(fn) {
    return typeof fn === "function";
  }
  function OrdinaryHasInstance(C, O, internalSlots) {
    if (!IsCallable(C)) {
      return false;
    }
    if (internalSlots === null || internalSlots === void 0 ? void 0 : internalSlots.boundTargetFunction) {
      var BC = internalSlots === null || internalSlots === void 0 ? void 0 : internalSlots.boundTargetFunction;
      return O instanceof BC;
    }
    if (typeof O !== "object") {
      return false;
    }
    var P = C.prototype;
    if (typeof P !== "object") {
      throw new TypeError("OrdinaryHasInstance called on an object with an invalid prototype property.");
    }
    return Object.prototype.isPrototypeOf.call(P, O);
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/CoerceOptionsToObject.js
  function CoerceOptionsToObject(options) {
    if (typeof options === "undefined") {
      return Object.create(null);
    }
    return ToObject(options);
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/DefaultNumberOption.js
  function DefaultNumberOption(val, min, max, fallback) {
    if (val !== void 0) {
      val = Number(val);
      if (isNaN(val) || val < min || val > max) {
        throw new RangeError("".concat(val, " is outside of range [").concat(min, ", ").concat(max, "]"));
      }
      return Math.floor(val);
    }
    return fallback;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/GetNumberOption.js
  function GetNumberOption(options, property, minimum, maximum, fallback) {
    var val = options[property];
    return DefaultNumberOption(val, minimum, maximum, fallback);
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/GetOption.js
  function GetOption(opts, prop, type, values, fallback) {
    if (typeof opts !== "object") {
      throw new TypeError("Options must be an object");
    }
    var value = opts[prop];
    if (value !== void 0) {
      if (type !== "boolean" && type !== "string") {
        throw new TypeError("invalid type");
      }
      if (type === "boolean") {
        value = Boolean(value);
      }
      if (type === "string") {
        value = ToString(value);
      }
      if (values !== void 0 && !values.filter(function(val) {
        return val == value;
      }).length) {
        throw new RangeError("".concat(value, " is not within ").concat(values.join(", ")));
      }
      return value;
    }
    return fallback;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/IsSanctionedSimpleUnitIdentifier.js
  var SANCTIONED_UNITS = [
    "angle-degree",
    "area-acre",
    "area-hectare",
    "concentr-percent",
    "digital-bit",
    "digital-byte",
    "digital-gigabit",
    "digital-gigabyte",
    "digital-kilobit",
    "digital-kilobyte",
    "digital-megabit",
    "digital-megabyte",
    "digital-petabyte",
    "digital-terabit",
    "digital-terabyte",
    "duration-day",
    "duration-hour",
    "duration-millisecond",
    "duration-minute",
    "duration-month",
    "duration-second",
    "duration-week",
    "duration-year",
    "length-centimeter",
    "length-foot",
    "length-inch",
    "length-kilometer",
    "length-meter",
    "length-mile-scandinavian",
    "length-mile",
    "length-millimeter",
    "length-yard",
    "mass-gram",
    "mass-kilogram",
    "mass-ounce",
    "mass-pound",
    "mass-stone",
    "temperature-celsius",
    "temperature-fahrenheit",
    "volume-fluid-ounce",
    "volume-gallon",
    "volume-liter",
    "volume-milliliter"
  ];
  function removeUnitNamespace(unit) {
    return unit.slice(unit.indexOf("-") + 1);
  }
  var SIMPLE_UNITS = SANCTIONED_UNITS.map(removeUnitNamespace);
  function IsSanctionedSimpleUnitIdentifier(unitIdentifier) {
    return SIMPLE_UNITS.indexOf(unitIdentifier) > -1;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/IsWellFormedCurrencyCode.js
  function toUpperCase(str) {
    return str.replace(/([a-z])/g, function(_, c) {
      return c.toUpperCase();
    });
  }
  var NOT_A_Z_REGEX = /[^A-Z]/;
  function IsWellFormedCurrencyCode(currency) {
    currency = toUpperCase(currency);
    if (currency.length !== 3) {
      return false;
    }
    if (NOT_A_Z_REGEX.test(currency)) {
      return false;
    }
    return true;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/IsWellFormedUnitIdentifier.js
  function toLowerCase(str) {
    return str.replace(/([A-Z])/g, function(_, c) {
      return c.toLowerCase();
    });
  }
  function IsWellFormedUnitIdentifier(unit) {
    unit = toLowerCase(unit);
    if (IsSanctionedSimpleUnitIdentifier(unit)) {
      return true;
    }
    var units = unit.split("-per-");
    if (units.length !== 2) {
      return false;
    }
    var numerator = units[0], denominator = units[1];
    if (!IsSanctionedSimpleUnitIdentifier(numerator) || !IsSanctionedSimpleUnitIdentifier(denominator)) {
      return false;
    }
    return true;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/utils.js
  function getMagnitude(x) {
    return Math.floor(Math.log(x) * Math.LOG10E);
  }
  function repeat(s, times) {
    if (typeof s.repeat === "function") {
      return s.repeat(times);
    }
    var arr = new Array(times);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = s;
    }
    return arr.join("");
  }
  function defineProperty(target, name, _a) {
    var value = _a.value;
    Object.defineProperty(target, name, {
      configurable: true,
      enumerable: false,
      writable: true,
      value: value
    });
  }
  function invariant(condition, message, Err) {
    if (Err === void 0) {
      Err = Error;
    }
    if (!condition) {
      throw new Err(message);
    }
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/ComputeExponentForMagnitude.js
  function ComputeExponentForMagnitude(numberFormat, magnitude, _a) {
    var getInternalSlots2 = _a.getInternalSlots;
    var internalSlots = getInternalSlots2(numberFormat);
    var notation = internalSlots.notation, dataLocaleData = internalSlots.dataLocaleData, numberingSystem = internalSlots.numberingSystem;
    switch (notation) {
      case "standard":
        return 0;
      case "scientific":
        return magnitude;
      case "engineering":
        return Math.floor(magnitude / 3) * 3;
      default: {
        var compactDisplay = internalSlots.compactDisplay, style = internalSlots.style, currencyDisplay = internalSlots.currencyDisplay;
        var thresholdMap = void 0;
        if (style === "currency" && currencyDisplay !== "name") {
          var currency = dataLocaleData.numbers.currency[numberingSystem] || dataLocaleData.numbers.currency[dataLocaleData.numbers.nu[0]];
          thresholdMap = currency.short;
        } else {
          var decimal = dataLocaleData.numbers.decimal[numberingSystem] || dataLocaleData.numbers.decimal[dataLocaleData.numbers.nu[0]];
          thresholdMap = compactDisplay === "long" ? decimal.long : decimal.short;
        }
        if (!thresholdMap) {
          return 0;
        }
        var num = String(Math.pow(10, magnitude));
        var thresholds = Object.keys(thresholdMap);
        if (num < thresholds[0]) {
          return 0;
        }
        if (num > thresholds[thresholds.length - 1]) {
          return thresholds[thresholds.length - 1].length - 1;
        }
        var i = thresholds.indexOf(num);
        if (i === -1) {
          return 0;
        }
        var magnitudeKey = thresholds[i];
        var compactPattern = thresholdMap[magnitudeKey].other;
        if (compactPattern === "0") {
          return 0;
        }
        return magnitudeKey.length - thresholdMap[magnitudeKey].other.match(/0+/)[0].length;
      }
    }
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/ToRawPrecision.js
  function ToRawPrecision(x, minPrecision, maxPrecision) {
    var p = maxPrecision;
    var m;
    var e;
    var xFinal;
    if (x === 0) {
      m = repeat("0", p);
      e = 0;
      xFinal = 0;
    } else {
      var xToString = x.toString();
      var xToStringExponentIndex = xToString.indexOf("e");
      var _a = xToString.split("e"), xToStringMantissa = _a[0], xToStringExponent = _a[1];
      var xToStringMantissaWithoutDecimalPoint = xToStringMantissa.replace(".", "");
      if (xToStringExponentIndex >= 0 && xToStringMantissaWithoutDecimalPoint.length <= p) {
        e = +xToStringExponent;
        m = xToStringMantissaWithoutDecimalPoint + repeat("0", p - xToStringMantissaWithoutDecimalPoint.length);
        xFinal = x;
      } else {
        e = getMagnitude(x);
        var decimalPlaceOffset = e - p + 1;
        var n = Math.round(adjustDecimalPlace(x, decimalPlaceOffset));
        if (adjustDecimalPlace(n, p - 1) >= 10) {
          e = e + 1;
          n = Math.floor(n / 10);
        }
        m = n.toString();
        xFinal = adjustDecimalPlace(n, p - 1 - e);
      }
    }
    var int;
    if (e >= p - 1) {
      m = m + repeat("0", e - p + 1);
      int = e + 1;
    } else if (e >= 0) {
      m = "".concat(m.slice(0, e + 1), ".").concat(m.slice(e + 1));
      int = e + 1;
    } else {
      m = "0.".concat(repeat("0", -e - 1)).concat(m);
      int = 1;
    }
    if (m.indexOf(".") >= 0 && maxPrecision > minPrecision) {
      var cut = maxPrecision - minPrecision;
      while (cut > 0 && m[m.length - 1] === "0") {
        m = m.slice(0, -1);
        cut--;
      }
      if (m[m.length - 1] === ".") {
        m = m.slice(0, -1);
      }
    }
    return { formattedString: m, roundedNumber: xFinal, integerDigitsCount: int };
    function adjustDecimalPlace(x2, magnitude) {
      return magnitude < 0 ? x2 * Math.pow(10, -magnitude) : x2 / Math.pow(10, magnitude);
    }
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/ToRawFixed.js
  function ToRawFixed(x, minFraction, maxFraction) {
    var f = maxFraction;
    var n = Math.round(x * Math.pow(10, f));
    var xFinal = n / Math.pow(10, f);
    var m;
    if (n < 1e21) {
      m = n.toString();
    } else {
      m = n.toString();
      var _a = m.split("e"), mantissa = _a[0], exponent = _a[1];
      m = mantissa.replace(".", "");
      m = m + repeat("0", Math.max(+exponent - m.length + 1, 0));
    }
    var int;
    if (f !== 0) {
      var k = m.length;
      if (k <= f) {
        var z = repeat("0", f + 1 - k);
        m = z + m;
        k = f + 1;
      }
      var a = m.slice(0, k - f);
      var b = m.slice(k - f);
      m = "".concat(a, ".").concat(b);
      int = a.length;
    } else {
      int = m.length;
    }
    var cut = maxFraction - minFraction;
    while (cut > 0 && m[m.length - 1] === "0") {
      m = m.slice(0, -1);
      cut--;
    }
    if (m[m.length - 1] === ".") {
      m = m.slice(0, -1);
    }
    return { formattedString: m, roundedNumber: xFinal, integerDigitsCount: int };
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/FormatNumericToString.js
  function FormatNumericToString(intlObject, x) {
    var isNegative = x < 0 || SameValue(x, -0);
    if (isNegative) {
      x = -x;
    }
    var result;
    var rourndingType = intlObject.roundingType;
    switch (rourndingType) {
      case "significantDigits":
        result = ToRawPrecision(x, intlObject.minimumSignificantDigits, intlObject.maximumSignificantDigits);
        break;
      case "fractionDigits":
        result = ToRawFixed(x, intlObject.minimumFractionDigits, intlObject.maximumFractionDigits);
        break;
      default:
        result = ToRawPrecision(x, 1, 2);
        if (result.integerDigitsCount > 1) {
          result = ToRawFixed(x, 0, 0);
        }
        break;
    }
    x = result.roundedNumber;
    var string = result.formattedString;
    var int = result.integerDigitsCount;
    var minInteger = intlObject.minimumIntegerDigits;
    if (int < minInteger) {
      var forwardZeros = repeat("0", minInteger - int);
      string = forwardZeros + string;
    }
    if (isNegative) {
      x = -x;
    }
    return { roundedNumber: x, formattedString: string };
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/ComputeExponent.js
  function ComputeExponent(numberFormat, x, _a) {
    var getInternalSlots2 = _a.getInternalSlots;
    if (x === 0) {
      return [0, 0];
    }
    if (x < 0) {
      x = -x;
    }
    var magnitude = getMagnitude(x);
    var exponent = ComputeExponentForMagnitude(numberFormat, magnitude, {
      getInternalSlots: getInternalSlots2
    });
    x = exponent < 0 ? x * Math.pow(10, -exponent) : x / Math.pow(10, exponent);
    var formatNumberResult = FormatNumericToString(getInternalSlots2(numberFormat), x);
    if (formatNumberResult.roundedNumber === 0) {
      return [exponent, magnitude];
    }
    var newMagnitude = getMagnitude(formatNumberResult.roundedNumber);
    if (newMagnitude === magnitude - exponent) {
      return [exponent, magnitude];
    }
    return [
      ComputeExponentForMagnitude(numberFormat, magnitude + 1, {
        getInternalSlots: getInternalSlots2
      }),
      magnitude + 1
    ];
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/CurrencyDigits.js
  function CurrencyDigits(c, _a) {
    var currencyDigitsData2 = _a.currencyDigitsData;
    return HasOwnProperty(currencyDigitsData2, c) ? currencyDigitsData2[c] : 2;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/digit-mapping.generated.js
  var digitMapping = { "adlm": ["\uD83A\uDD50", "\uD83A\uDD51", "\uD83A\uDD52", "\uD83A\uDD53", "\uD83A\uDD54", "\uD83A\uDD55", "\uD83A\uDD56", "\uD83A\uDD57", "\uD83A\uDD58", "\uD83A\uDD59"], "ahom": ["\uD805\uDF30", "\uD805\uDF31", "\uD805\uDF32", "\uD805\uDF33", "\uD805\uDF34", "\uD805\uDF35", "\uD805\uDF36", "\uD805\uDF37", "\uD805\uDF38", "\uD805\uDF39"], "arab": ["\u0660", "\u0661", "\u0662", "\u0663", "\u0664", "\u0665", "\u0666", "\u0667", "\u0668", "\u0669"], "arabext": ["\u06F0", "\u06F1", "\u06F2", "\u06F3", "\u06F4", "\u06F5", "\u06F6", "\u06F7", "\u06F8", "\u06F9"], "bali": ["\u1B50", "\u1B51", "\u1B52", "\u1B53", "\u1B54", "\u1B55", "\u1B56", "\u1B57", "\u1B58", "\u1B59"], "beng": ["\u09E6", "\u09E7", "\u09E8", "\u09E9", "\u09EA", "\u09EB", "\u09EC", "\u09ED", "\u09EE", "\u09EF"], "bhks": ["\uD807\uDC50", "\uD807\uDC51", "\uD807\uDC52", "\uD807\uDC53", "\uD807\uDC54", "\uD807\uDC55", "\uD807\uDC56", "\uD807\uDC57", "\uD807\uDC58", "\uD807\uDC59"], "brah": ["\uD804\uDC66", "\uD804\uDC67", "\uD804\uDC68", "\uD804\uDC69", "\uD804\uDC6A", "\uD804\uDC6B", "\uD804\uDC6C", "\uD804\uDC6D", "\uD804\uDC6E", "\uD804\uDC6F"], "cakm": ["\uD804\uDD36", "\uD804\uDD37", "\uD804\uDD38", "\uD804\uDD39", "\uD804\uDD3A", "\uD804\uDD3B", "\uD804\uDD3C", "\uD804\uDD3D", "\uD804\uDD3E", "\uD804\uDD3F"], "cham": ["\uAA50", "\uAA51", "\uAA52", "\uAA53", "\uAA54", "\uAA55", "\uAA56", "\uAA57", "\uAA58", "\uAA59"], "deva": ["\u0966", "\u0967", "\u0968", "\u0969", "\u096A", "\u096B", "\u096C", "\u096D", "\u096E", "\u096F"], "diak": ["\uD806\uDD50", "\uD806\uDD51", "\uD806\uDD52", "\uD806\uDD53", "\uD806\uDD54", "\uD806\uDD55", "\uD806\uDD56", "\uD806\uDD57", "\uD806\uDD58", "\uD806\uDD59"], "fullwide": ["\uFF10", "\uFF11", "\uFF12", "\uFF13", "\uFF14", "\uFF15", "\uFF16", "\uFF17", "\uFF18", "\uFF19"], "gong": ["\uD807\uDDA0", "\uD807\uDDA1", "\uD807\uDDA2", "\uD807\uDDA3", "\uD807\uDDA4", "\uD807\uDDA5", "\uD807\uDDA6", "\uD807\uDDA7", "\uD807\uDDA8", "\uD807\uDDA9"], "gonm": ["\uD807\uDD50", "\uD807\uDD51", "\uD807\uDD52", "\uD807\uDD53", "\uD807\uDD54", "\uD807\uDD55", "\uD807\uDD56", "\uD807\uDD57", "\uD807\uDD58", "\uD807\uDD59"], "gujr": ["\u0AE6", "\u0AE7", "\u0AE8", "\u0AE9", "\u0AEA", "\u0AEB", "\u0AEC", "\u0AED", "\u0AEE", "\u0AEF"], "guru": ["\u0A66", "\u0A67", "\u0A68", "\u0A69", "\u0A6A", "\u0A6B", "\u0A6C", "\u0A6D", "\u0A6E", "\u0A6F"], "hanidec": ["\u3007", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D"], "hmng": ["\uD81A\uDF50", "\uD81A\uDF51", "\uD81A\uDF52", "\uD81A\uDF53", "\uD81A\uDF54", "\uD81A\uDF55", "\uD81A\uDF56", "\uD81A\uDF57", "\uD81A\uDF58", "\uD81A\uDF59"], "hmnp": ["\uD838\uDD40", "\uD838\uDD41", "\uD838\uDD42", "\uD838\uDD43", "\uD838\uDD44", "\uD838\uDD45", "\uD838\uDD46", "\uD838\uDD47", "\uD838\uDD48", "\uD838\uDD49"], "java": ["\uA9D0", "\uA9D1", "\uA9D2", "\uA9D3", "\uA9D4", "\uA9D5", "\uA9D6", "\uA9D7", "\uA9D8", "\uA9D9"], "kali": ["\uA900", "\uA901", "\uA902", "\uA903", "\uA904", "\uA905", "\uA906", "\uA907", "\uA908", "\uA909"], "khmr": ["\u17E0", "\u17E1", "\u17E2", "\u17E3", "\u17E4", "\u17E5", "\u17E6", "\u17E7", "\u17E8", "\u17E9"], "knda": ["\u0CE6", "\u0CE7", "\u0CE8", "\u0CE9", "\u0CEA", "\u0CEB", "\u0CEC", "\u0CED", "\u0CEE", "\u0CEF"], "lana": ["\u1A80", "\u1A81", "\u1A82", "\u1A83", "\u1A84", "\u1A85", "\u1A86", "\u1A87", "\u1A88", "\u1A89"], "lanatham": ["\u1A90", "\u1A91", "\u1A92", "\u1A93", "\u1A94", "\u1A95", "\u1A96", "\u1A97", "\u1A98", "\u1A99"], "laoo": ["\u0ED0", "\u0ED1", "\u0ED2", "\u0ED3", "\u0ED4", "\u0ED5", "\u0ED6", "\u0ED7", "\u0ED8", "\u0ED9"], "lepc": ["\u1A90", "\u1A91", "\u1A92", "\u1A93", "\u1A94", "\u1A95", "\u1A96", "\u1A97", "\u1A98", "\u1A99"], "limb": ["\u1946", "\u1947", "\u1948", "\u1949", "\u194A", "\u194B", "\u194C", "\u194D", "\u194E", "\u194F"], "mathbold": ["\uD835\uDFCE", "\uD835\uDFCF", "\uD835\uDFD0", "\uD835\uDFD1", "\uD835\uDFD2", "\uD835\uDFD3", "\uD835\uDFD4", "\uD835\uDFD5", "\uD835\uDFD6", "\uD835\uDFD7"], "mathdbl": ["\uD835\uDFD8", "\uD835\uDFD9", "\uD835\uDFDA", "\uD835\uDFDB", "\uD835\uDFDC", "\uD835\uDFDD", "\uD835\uDFDE", "\uD835\uDFDF", "\uD835\uDFE0", "\uD835\uDFE1"], "mathmono": ["\uD835\uDFF6", "\uD835\uDFF7", "\uD835\uDFF8", "\uD835\uDFF9", "\uD835\uDFFA", "\uD835\uDFFB", "\uD835\uDFFC", "\uD835\uDFFD", "\uD835\uDFFE", "\uD835\uDFFF"], "mathsanb": ["\uD835\uDFEC", "\uD835\uDFED", "\uD835\uDFEE", "\uD835\uDFEF", "\uD835\uDFF0", "\uD835\uDFF1", "\uD835\uDFF2", "\uD835\uDFF3", "\uD835\uDFF4", "\uD835\uDFF5"], "mathsans": ["\uD835\uDFE2", "\uD835\uDFE3", "\uD835\uDFE4", "\uD835\uDFE5", "\uD835\uDFE6", "\uD835\uDFE7", "\uD835\uDFE8", "\uD835\uDFE9", "\uD835\uDFEA", "\uD835\uDFEB"], "mlym": ["\u0D66", "\u0D67", "\u0D68", "\u0D69", "\u0D6A", "\u0D6B", "\u0D6C", "\u0D6D", "\u0D6E", "\u0D6F"], "modi": ["\uD805\uDE50", "\uD805\uDE51", "\uD805\uDE52", "\uD805\uDE53", "\uD805\uDE54", "\uD805\uDE55", "\uD805\uDE56", "\uD805\uDE57", "\uD805\uDE58", "\uD805\uDE59"], "mong": ["\u1810", "\u1811", "\u1812", "\u1813", "\u1814", "\u1815", "\u1816", "\u1817", "\u1818", "\u1819"], "mroo": ["\uD81A\uDE60", "\uD81A\uDE61", "\uD81A\uDE62", "\uD81A\uDE63", "\uD81A\uDE64", "\uD81A\uDE65", "\uD81A\uDE66", "\uD81A\uDE67", "\uD81A\uDE68", "\uD81A\uDE69"], "mtei": ["\uABF0", "\uABF1", "\uABF2", "\uABF3", "\uABF4", "\uABF5", "\uABF6", "\uABF7", "\uABF8", "\uABF9"], "mymr": ["\u1040", "\u1041", "\u1042", "\u1043", "\u1044", "\u1045", "\u1046", "\u1047", "\u1048", "\u1049"], "mymrshan": ["\u1090", "\u1091", "\u1092", "\u1093", "\u1094", "\u1095", "\u1096", "\u1097", "\u1098", "\u1099"], "mymrtlng": ["\uA9F0", "\uA9F1", "\uA9F2", "\uA9F3", "\uA9F4", "\uA9F5", "\uA9F6", "\uA9F7", "\uA9F8", "\uA9F9"], "newa": ["\uD805\uDC50", "\uD805\uDC51", "\uD805\uDC52", "\uD805\uDC53", "\uD805\uDC54", "\uD805\uDC55", "\uD805\uDC56", "\uD805\uDC57", "\uD805\uDC58", "\uD805\uDC59"], "nkoo": ["\u07C0", "\u07C1", "\u07C2", "\u07C3", "\u07C4", "\u07C5", "\u07C6", "\u07C7", "\u07C8", "\u07C9"], "olck": ["\u1C50", "\u1C51", "\u1C52", "\u1C53", "\u1C54", "\u1C55", "\u1C56", "\u1C57", "\u1C58", "\u1C59"], "orya": ["\u0B66", "\u0B67", "\u0B68", "\u0B69", "\u0B6A", "\u0B6B", "\u0B6C", "\u0B6D", "\u0B6E", "\u0B6F"], "osma": ["\uD801\uDCA0", "\uD801\uDCA1", "\uD801\uDCA2", "\uD801\uDCA3", "\uD801\uDCA4", "\uD801\uDCA5", "\uD801\uDCA6", "\uD801\uDCA7", "\uD801\uDCA8", "\uD801\uDCA9"], "rohg": ["\uD803\uDD30", "\uD803\uDD31", "\uD803\uDD32", "\uD803\uDD33", "\uD803\uDD34", "\uD803\uDD35", "\uD803\uDD36", "\uD803\uDD37", "\uD803\uDD38", "\uD803\uDD39"], "saur": ["\uA8D0", "\uA8D1", "\uA8D2", "\uA8D3", "\uA8D4", "\uA8D5", "\uA8D6", "\uA8D7", "\uA8D8", "\uA8D9"], "segment": ["\uD83E\uDFF0", "\uD83E\uDFF1", "\uD83E\uDFF2", "\uD83E\uDFF3", "\uD83E\uDFF4", "\uD83E\uDFF5", "\uD83E\uDFF6", "\uD83E\uDFF7", "\uD83E\uDFF8", "\uD83E\uDFF9"], "shrd": ["\uD804\uDDD0", "\uD804\uDDD1", "\uD804\uDDD2", "\uD804\uDDD3", "\uD804\uDDD4", "\uD804\uDDD5", "\uD804\uDDD6", "\uD804\uDDD7", "\uD804\uDDD8", "\uD804\uDDD9"], "sind": ["\uD804\uDEF0", "\uD804\uDEF1", "\uD804\uDEF2", "\uD804\uDEF3", "\uD804\uDEF4", "\uD804\uDEF5", "\uD804\uDEF6", "\uD804\uDEF7", "\uD804\uDEF8", "\uD804\uDEF9"], "sinh": ["\u0DE6", "\u0DE7", "\u0DE8", "\u0DE9", "\u0DEA", "\u0DEB", "\u0DEC", "\u0DED", "\u0DEE", "\u0DEF"], "sora": ["\uD804\uDCF0", "\uD804\uDCF1", "\uD804\uDCF2", "\uD804\uDCF3", "\uD804\uDCF4", "\uD804\uDCF5", "\uD804\uDCF6", "\uD804\uDCF7", "\uD804\uDCF8", "\uD804\uDCF9"], "sund": ["\u1BB0", "\u1BB1", "\u1BB2", "\u1BB3", "\u1BB4", "\u1BB5", "\u1BB6", "\u1BB7", "\u1BB8", "\u1BB9"], "takr": ["\uD805\uDEC0", "\uD805\uDEC1", "\uD805\uDEC2", "\uD805\uDEC3", "\uD805\uDEC4", "\uD805\uDEC5", "\uD805\uDEC6", "\uD805\uDEC7", "\uD805\uDEC8", "\uD805\uDEC9"], "talu": ["\u19D0", "\u19D1", "\u19D2", "\u19D3", "\u19D4", "\u19D5", "\u19D6", "\u19D7", "\u19D8", "\u19D9"], "tamldec": ["\u0BE6", "\u0BE7", "\u0BE8", "\u0BE9", "\u0BEA", "\u0BEB", "\u0BEC", "\u0BED", "\u0BEE", "\u0BEF"], "telu": ["\u0C66", "\u0C67", "\u0C68", "\u0C69", "\u0C6A", "\u0C6B", "\u0C6C", "\u0C6D", "\u0C6E", "\u0C6F"], "thai": ["\u0E50", "\u0E51", "\u0E52", "\u0E53", "\u0E54", "\u0E55", "\u0E56", "\u0E57", "\u0E58", "\u0E59"], "tibt": ["\u0F20", "\u0F21", "\u0F22", "\u0F23", "\u0F24", "\u0F25", "\u0F26", "\u0F27", "\u0F28", "\u0F29"], "tirh": ["\uD805\uDCD0", "\uD805\uDCD1", "\uD805\uDCD2", "\uD805\uDCD3", "\uD805\uDCD4", "\uD805\uDCD5", "\uD805\uDCD6", "\uD805\uDCD7", "\uD805\uDCD8", "\uD805\uDCD9"], "vaii": ["\u1620", "\u1621", "\u1622", "\u1623", "\u1624", "\u1625", "\u1626", "\u1627", "\u1628", "\u1629"], "wara": ["\uD806\uDCE0", "\uD806\uDCE1", "\uD806\uDCE2", "\uD806\uDCE3", "\uD806\uDCE4", "\uD806\uDCE5", "\uD806\uDCE6", "\uD806\uDCE7", "\uD806\uDCE8", "\uD806\uDCE9"], "wcho": ["\uD838\uDEF0", "\uD838\uDEF1", "\uD838\uDEF2", "\uD838\uDEF3", "\uD838\uDEF4", "\uD838\uDEF5", "\uD838\uDEF6", "\uD838\uDEF7", "\uD838\uDEF8", "\uD838\uDEF9"] };

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/regex.generated.js
  var S_UNICODE_REGEX = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BF\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEE0-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF73\uDF80-\uDFD8\uDFE0-\uDFEB]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDD78\uDD7A-\uDDCB\uDDCD-\uDE53\uDE60-\uDE6D\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6\uDF00-\uDF92\uDF94-\uDFCA]/;

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/format_to_parts.js
  var CARET_S_UNICODE_REGEX = new RegExp("^".concat(S_UNICODE_REGEX.source));
  var S_DOLLAR_UNICODE_REGEX = new RegExp("".concat(S_UNICODE_REGEX.source, "$"));
  var CLDR_NUMBER_PATTERN = /[#0](?:[\.,][#0]+)*/g;
  function formatToParts(numberResult, data, pl, options) {
    var sign = numberResult.sign, exponent = numberResult.exponent, magnitude = numberResult.magnitude;
    var notation = options.notation, style = options.style, numberingSystem = options.numberingSystem;
    var defaultNumberingSystem = data.numbers.nu[0];
    var compactNumberPattern = null;
    if (notation === "compact" && magnitude) {
      compactNumberPattern = getCompactDisplayPattern(numberResult, pl, data, style, options.compactDisplay, options.currencyDisplay, numberingSystem);
    }
    var nonNameCurrencyPart;
    if (style === "currency" && options.currencyDisplay !== "name") {
      var byCurrencyDisplay = data.currencies[options.currency];
      if (byCurrencyDisplay) {
        switch (options.currencyDisplay) {
          case "code":
            nonNameCurrencyPart = options.currency;
            break;
          case "symbol":
            nonNameCurrencyPart = byCurrencyDisplay.symbol;
            break;
          default:
            nonNameCurrencyPart = byCurrencyDisplay.narrow;
            break;
        }
      } else {
        nonNameCurrencyPart = options.currency;
      }
    }
    var numberPattern;
    if (!compactNumberPattern) {
      if (style === "decimal" || style === "unit" || style === "currency" && options.currencyDisplay === "name") {
        var decimalData = data.numbers.decimal[numberingSystem] || data.numbers.decimal[defaultNumberingSystem];
        numberPattern = getPatternForSign(decimalData.standard, sign);
      } else if (style === "currency") {
        var currencyData = data.numbers.currency[numberingSystem] || data.numbers.currency[defaultNumberingSystem];
        numberPattern = getPatternForSign(currencyData[options.currencySign], sign);
      } else {
        var percentPattern = data.numbers.percent[numberingSystem] || data.numbers.percent[defaultNumberingSystem];
        numberPattern = getPatternForSign(percentPattern, sign);
      }
    } else {
      numberPattern = compactNumberPattern;
    }
    var decimalNumberPattern = CLDR_NUMBER_PATTERN.exec(numberPattern)[0];
    numberPattern = numberPattern.replace(CLDR_NUMBER_PATTERN, "{0}").replace(/'(.)'/g, "$1");
    if (style === "currency" && options.currencyDisplay !== "name") {
      var currencyData = data.numbers.currency[numberingSystem] || data.numbers.currency[defaultNumberingSystem];
      var afterCurrency = currencyData.currencySpacing.afterInsertBetween;
      if (afterCurrency && !S_DOLLAR_UNICODE_REGEX.test(nonNameCurrencyPart)) {
        numberPattern = numberPattern.replace("\xA4{0}", "\xA4".concat(afterCurrency, "{0}"));
      }
      var beforeCurrency = currencyData.currencySpacing.beforeInsertBetween;
      if (beforeCurrency && !CARET_S_UNICODE_REGEX.test(nonNameCurrencyPart)) {
        numberPattern = numberPattern.replace("{0}\xA4", "{0}".concat(beforeCurrency, "\xA4"));
      }
    }
    var numberPatternParts = numberPattern.split(/({c:[^}]+}|\{0\}|[??%\-\+])/g);
    var numberParts = [];
    var symbols = data.numbers.symbols[numberingSystem] || data.numbers.symbols[defaultNumberingSystem];
    for (var _i = 0, numberPatternParts_1 = numberPatternParts; _i < numberPatternParts_1.length; _i++) {
      var part = numberPatternParts_1[_i];
      if (!part) {
        continue;
      }
      switch (part) {
        case "{0}": {
          numberParts.push.apply(numberParts, paritionNumberIntoParts(symbols, numberResult, notation, exponent, numberingSystem, !compactNumberPattern && options.useGrouping, decimalNumberPattern));
          break;
        }
        case "-":
          numberParts.push({ type: "minusSign", value: symbols.minusSign });
          break;
        case "+":
          numberParts.push({ type: "plusSign", value: symbols.plusSign });
          break;
        case "%":
          numberParts.push({ type: "percentSign", value: symbols.percentSign });
          break;
        case "\xA4":
          numberParts.push({ type: "currency", value: nonNameCurrencyPart });
          break;
        default:
          if (/^\{c:/.test(part)) {
            numberParts.push({
              type: "compact",
              value: part.substring(3, part.length - 1)
            });
          } else {
            numberParts.push({ type: "literal", value: part });
          }
          break;
      }
    }
    switch (style) {
      case "currency": {
        if (options.currencyDisplay === "name") {
          var unitPattern = (data.numbers.currency[numberingSystem] || data.numbers.currency[defaultNumberingSystem]).unitPattern;
          var unitName = void 0;
          var currencyNameData = data.currencies[options.currency];
          if (currencyNameData) {
            unitName = selectPlural(pl, numberResult.roundedNumber * Math.pow(10, exponent), currencyNameData.displayName);
          } else {
            unitName = options.currency;
          }
          var unitPatternParts = unitPattern.split(/(\{[01]\})/g);
          var result = [];
          for (var _a = 0, unitPatternParts_1 = unitPatternParts; _a < unitPatternParts_1.length; _a++) {
            var part = unitPatternParts_1[_a];
            switch (part) {
              case "{0}":
                result.push.apply(result, numberParts);
                break;
              case "{1}":
                result.push({ type: "currency", value: unitName });
                break;
              default:
                if (part) {
                  result.push({ type: "literal", value: part });
                }
                break;
            }
          }
          return result;
        } else {
          return numberParts;
        }
      }
      case "unit": {
        var unit = options.unit, unitDisplay = options.unitDisplay;
        var unitData = data.units.simple[unit];
        var unitPattern = void 0;
        if (unitData) {
          unitPattern = selectPlural(pl, numberResult.roundedNumber * Math.pow(10, exponent), data.units.simple[unit][unitDisplay]);
        } else {
          var _b = unit.split("-per-"), numeratorUnit = _b[0], denominatorUnit = _b[1];
          unitData = data.units.simple[numeratorUnit];
          var numeratorUnitPattern = selectPlural(pl, numberResult.roundedNumber * Math.pow(10, exponent), data.units.simple[numeratorUnit][unitDisplay]);
          var perUnitPattern = data.units.simple[denominatorUnit].perUnit[unitDisplay];
          if (perUnitPattern) {
            unitPattern = perUnitPattern.replace("{0}", numeratorUnitPattern);
          } else {
            var perPattern = data.units.compound.per[unitDisplay];
            var denominatorPattern = selectPlural(pl, 1, data.units.simple[denominatorUnit][unitDisplay]);
            unitPattern = unitPattern = perPattern.replace("{0}", numeratorUnitPattern).replace("{1}", denominatorPattern.replace("{0}", ""));
          }
        }
        var result = [];
        for (var _c = 0, _d = unitPattern.split(/(\s*\{0\}\s*)/); _c < _d.length; _c++) {
          var part = _d[_c];
          var interpolateMatch = /^(\s*)\{0\}(\s*)$/.exec(part);
          if (interpolateMatch) {
            if (interpolateMatch[1]) {
              result.push({ type: "literal", value: interpolateMatch[1] });
            }
            result.push.apply(result, numberParts);
            if (interpolateMatch[2]) {
              result.push({ type: "literal", value: interpolateMatch[2] });
            }
          } else if (part) {
            result.push({ type: "unit", value: part });
          }
        }
        return result;
      }
      default:
        return numberParts;
    }
  }
  function paritionNumberIntoParts(symbols, numberResult, notation, exponent, numberingSystem, useGrouping, decimalNumberPattern) {
    var result = [];
    var n = numberResult.formattedString, x = numberResult.roundedNumber;
    if (isNaN(x)) {
      return [{ type: "nan", value: n }];
    } else if (!isFinite(x)) {
      return [{ type: "infinity", value: n }];
    }
    var digitReplacementTable = digitMapping[numberingSystem];
    if (digitReplacementTable) {
      n = n.replace(/\d/g, function(digit) {
        return digitReplacementTable[+digit] || digit;
      });
    }
    var decimalSepIndex = n.indexOf(".");
    var integer;
    var fraction;
    if (decimalSepIndex > 0) {
      integer = n.slice(0, decimalSepIndex);
      fraction = n.slice(decimalSepIndex + 1);
    } else {
      integer = n;
    }
    if (useGrouping && (notation !== "compact" || x >= 1e4)) {
      var groupSepSymbol = symbols.group;
      var groups = [];
      var integerNumberPattern = decimalNumberPattern.split(".")[0];
      var patternGroups = integerNumberPattern.split(",");
      var primaryGroupingSize = 3;
      var secondaryGroupingSize = 3;
      if (patternGroups.length > 1) {
        primaryGroupingSize = patternGroups[patternGroups.length - 1].length;
      }
      if (patternGroups.length > 2) {
        secondaryGroupingSize = patternGroups[patternGroups.length - 2].length;
      }
      var i = integer.length - primaryGroupingSize;
      if (i > 0) {
        groups.push(integer.slice(i, i + primaryGroupingSize));
        for (i -= secondaryGroupingSize; i > 0; i -= secondaryGroupingSize) {
          groups.push(integer.slice(i, i + secondaryGroupingSize));
        }
        groups.push(integer.slice(0, i + secondaryGroupingSize));
      } else {
        groups.push(integer);
      }
      while (groups.length > 0) {
        var integerGroup = groups.pop();
        result.push({ type: "integer", value: integerGroup });
        if (groups.length > 0) {
          result.push({ type: "group", value: groupSepSymbol });
        }
      }
    } else {
      result.push({ type: "integer", value: integer });
    }
    if (fraction !== void 0) {
      result.push({ type: "decimal", value: symbols.decimal }, { type: "fraction", value: fraction });
    }
    if ((notation === "scientific" || notation === "engineering") && isFinite(x)) {
      result.push({ type: "exponentSeparator", value: symbols.exponential });
      if (exponent < 0) {
        result.push({ type: "exponentMinusSign", value: symbols.minusSign });
        exponent = -exponent;
      }
      var exponentResult = ToRawFixed(exponent, 0, 0);
      result.push({
        type: "exponentInteger",
        value: exponentResult.formattedString
      });
    }
    return result;
  }
  function getPatternForSign(pattern, sign) {
    if (pattern.indexOf(";") < 0) {
      pattern = "".concat(pattern, ";-").concat(pattern);
    }
    var _a = pattern.split(";"), zeroPattern = _a[0], negativePattern = _a[1];
    switch (sign) {
      case 0:
        return zeroPattern;
      case -1:
        return negativePattern;
      default:
        return negativePattern.indexOf("-") >= 0 ? negativePattern.replace(/-/g, "+") : "+".concat(zeroPattern);
    }
  }
  function getCompactDisplayPattern(numberResult, pl, data, style, compactDisplay, currencyDisplay, numberingSystem) {
    var _a;
    var roundedNumber = numberResult.roundedNumber, sign = numberResult.sign, magnitude = numberResult.magnitude;
    var magnitudeKey = String(Math.pow(10, magnitude));
    var defaultNumberingSystem = data.numbers.nu[0];
    var pattern;
    if (style === "currency" && currencyDisplay !== "name") {
      var byNumberingSystem = data.numbers.currency;
      var currencyData = byNumberingSystem[numberingSystem] || byNumberingSystem[defaultNumberingSystem];
      var compactPluralRules = (_a = currencyData.short) === null || _a === void 0 ? void 0 : _a[magnitudeKey];
      if (!compactPluralRules) {
        return null;
      }
      pattern = selectPlural(pl, roundedNumber, compactPluralRules);
    } else {
      var byNumberingSystem = data.numbers.decimal;
      var byCompactDisplay = byNumberingSystem[numberingSystem] || byNumberingSystem[defaultNumberingSystem];
      var compactPlaralRule = byCompactDisplay[compactDisplay][magnitudeKey];
      if (!compactPlaralRule) {
        return null;
      }
      pattern = selectPlural(pl, roundedNumber, compactPlaralRule);
    }
    if (pattern === "0") {
      return null;
    }
    pattern = getPatternForSign(pattern, sign).replace(/([^\s;\-\+\d??]+)/g, "{c:$1}").replace(/0+/, "0");
    return pattern;
  }
  function selectPlural(pl, x, rules) {
    return rules[pl.select(x)] || rules.other;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/PartitionNumberPattern.js
  function PartitionNumberPattern(numberFormat, x, _a) {
    var _b;
    var getInternalSlots2 = _a.getInternalSlots;
    var internalSlots = getInternalSlots2(numberFormat);
    var pl = internalSlots.pl, dataLocaleData = internalSlots.dataLocaleData, numberingSystem = internalSlots.numberingSystem;
    var symbols = dataLocaleData.numbers.symbols[numberingSystem] || dataLocaleData.numbers.symbols[dataLocaleData.numbers.nu[0]];
    var magnitude = 0;
    var exponent = 0;
    var n;
    if (isNaN(x)) {
      n = symbols.nan;
    } else if (!isFinite(x)) {
      n = symbols.infinity;
    } else {
      if (internalSlots.style === "percent") {
        x *= 100;
      }
      ;
      _b = ComputeExponent(numberFormat, x, {
        getInternalSlots: getInternalSlots2
      }), exponent = _b[0], magnitude = _b[1];
      x = exponent < 0 ? x * Math.pow(10, -exponent) : x / Math.pow(10, exponent);
      var formatNumberResult = FormatNumericToString(internalSlots, x);
      n = formatNumberResult.formattedString;
      x = formatNumberResult.roundedNumber;
    }
    var sign;
    var signDisplay = internalSlots.signDisplay;
    switch (signDisplay) {
      case "never":
        sign = 0;
        break;
      case "auto":
        if (SameValue(x, 0) || x > 0 || isNaN(x)) {
          sign = 0;
        } else {
          sign = -1;
        }
        break;
      case "always":
        if (SameValue(x, 0) || x > 0 || isNaN(x)) {
          sign = 1;
        } else {
          sign = -1;
        }
        break;
      default:
        if (x === 0 || isNaN(x)) {
          sign = 0;
        } else if (x > 0) {
          sign = 1;
        } else {
          sign = -1;
        }
    }
    return formatToParts({ roundedNumber: x, formattedString: n, exponent: exponent, magnitude: magnitude, sign: sign }, internalSlots.dataLocaleData, pl, internalSlots);
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/FormatNumericToParts.js
  function FormatNumericToParts(nf, x, implDetails) {
    var parts = PartitionNumberPattern(nf, x, implDetails);
    var result = ArrayCreate(0);
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
      var part = parts_1[_i];
      result.push({
        type: part.type,
        value: part.value
      });
    }
    return result;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/InitializeNumberFormat.js
  var import_intl_localematcher = __toModule(require_intl_localematcher());

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/SetNumberFormatUnitOptions.js
  function SetNumberFormatUnitOptions(nf, options, _a) {
    if (options === void 0) {
      options = Object.create(null);
    }
    var getInternalSlots2 = _a.getInternalSlots;
    var internalSlots = getInternalSlots2(nf);
    var style = GetOption(options, "style", "string", ["decimal", "percent", "currency", "unit"], "decimal");
    internalSlots.style = style;
    var currency = GetOption(options, "currency", "string", void 0, void 0);
    if (currency !== void 0 && !IsWellFormedCurrencyCode(currency)) {
      throw RangeError("Malformed currency code");
    }
    if (style === "currency" && currency === void 0) {
      throw TypeError("currency cannot be undefined");
    }
    var currencyDisplay = GetOption(options, "currencyDisplay", "string", ["code", "symbol", "narrowSymbol", "name"], "symbol");
    var currencySign = GetOption(options, "currencySign", "string", ["standard", "accounting"], "standard");
    var unit = GetOption(options, "unit", "string", void 0, void 0);
    if (unit !== void 0 && !IsWellFormedUnitIdentifier(unit)) {
      throw RangeError("Invalid unit argument for Intl.NumberFormat()");
    }
    if (style === "unit" && unit === void 0) {
      throw TypeError("unit cannot be undefined");
    }
    var unitDisplay = GetOption(options, "unitDisplay", "string", ["short", "narrow", "long"], "short");
    if (style === "currency") {
      internalSlots.currency = currency.toUpperCase();
      internalSlots.currencyDisplay = currencyDisplay;
      internalSlots.currencySign = currencySign;
    }
    if (style === "unit") {
      internalSlots.unit = unit;
      internalSlots.unitDisplay = unitDisplay;
    }
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/SetNumberFormatDigitOptions.js
  function SetNumberFormatDigitOptions(internalSlots, opts, mnfdDefault, mxfdDefault, notation) {
    var mnid = GetNumberOption(opts, "minimumIntegerDigits", 1, 21, 1);
    var mnfd = opts.minimumFractionDigits;
    var mxfd = opts.maximumFractionDigits;
    var mnsd = opts.minimumSignificantDigits;
    var mxsd = opts.maximumSignificantDigits;
    internalSlots.minimumIntegerDigits = mnid;
    if (mnsd !== void 0 || mxsd !== void 0) {
      internalSlots.roundingType = "significantDigits";
      mnsd = DefaultNumberOption(mnsd, 1, 21, 1);
      mxsd = DefaultNumberOption(mxsd, mnsd, 21, 21);
      internalSlots.minimumSignificantDigits = mnsd;
      internalSlots.maximumSignificantDigits = mxsd;
    } else if (mnfd !== void 0 || mxfd !== void 0) {
      internalSlots.roundingType = "fractionDigits";
      mnfd = DefaultNumberOption(mnfd, 0, 20, mnfdDefault);
      var mxfdActualDefault = Math.max(mnfd, mxfdDefault);
      mxfd = DefaultNumberOption(mxfd, mnfd, 20, mxfdActualDefault);
      internalSlots.minimumFractionDigits = mnfd;
      internalSlots.maximumFractionDigits = mxfd;
    } else if (notation === "compact") {
      internalSlots.roundingType = "compactRounding";
    } else {
      internalSlots.roundingType = "fractionDigits";
      internalSlots.minimumFractionDigits = mnfdDefault;
      internalSlots.maximumFractionDigits = mxfdDefault;
    }
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/NumberFormat/InitializeNumberFormat.js
  function InitializeNumberFormat(nf, locales, opts, _a) {
    var getInternalSlots2 = _a.getInternalSlots, localeData = _a.localeData, availableLocales = _a.availableLocales, numberingSystemNames2 = _a.numberingSystemNames, getDefaultLocale = _a.getDefaultLocale, currencyDigitsData2 = _a.currencyDigitsData;
    var requestedLocales = CanonicalizeLocaleList(locales);
    var options = CoerceOptionsToObject(opts);
    var opt = Object.create(null);
    var matcher = GetOption(options, "localeMatcher", "string", ["lookup", "best fit"], "best fit");
    opt.localeMatcher = matcher;
    var numberingSystem = GetOption(options, "numberingSystem", "string", void 0, void 0);
    if (numberingSystem !== void 0 && numberingSystemNames2.indexOf(numberingSystem) < 0) {
      throw RangeError("Invalid numberingSystems: ".concat(numberingSystem));
    }
    opt.nu = numberingSystem;
    var r = (0, import_intl_localematcher.ResolveLocale)(availableLocales, requestedLocales, opt, ["nu"], localeData, getDefaultLocale);
    var dataLocaleData = localeData[r.dataLocale];
    invariant(!!dataLocaleData, "Missing locale data for ".concat(r.dataLocale));
    var internalSlots = getInternalSlots2(nf);
    internalSlots.locale = r.locale;
    internalSlots.dataLocale = r.dataLocale;
    internalSlots.numberingSystem = r.nu;
    internalSlots.dataLocaleData = dataLocaleData;
    SetNumberFormatUnitOptions(nf, options, { getInternalSlots: getInternalSlots2 });
    var style = internalSlots.style;
    var mnfdDefault;
    var mxfdDefault;
    if (style === "currency") {
      var currency = internalSlots.currency;
      var cDigits = CurrencyDigits(currency, { currencyDigitsData: currencyDigitsData2 });
      mnfdDefault = cDigits;
      mxfdDefault = cDigits;
    } else {
      mnfdDefault = 0;
      mxfdDefault = style === "percent" ? 0 : 3;
    }
    var notation = GetOption(options, "notation", "string", ["standard", "scientific", "engineering", "compact"], "standard");
    internalSlots.notation = notation;
    SetNumberFormatDigitOptions(internalSlots, options, mnfdDefault, mxfdDefault, notation);
    var compactDisplay = GetOption(options, "compactDisplay", "string", ["short", "long"], "short");
    if (notation === "compact") {
      internalSlots.compactDisplay = compactDisplay;
    }
    var useGrouping = GetOption(options, "useGrouping", "boolean", void 0, true);
    internalSlots.useGrouping = useGrouping;
    var signDisplay = GetOption(options, "signDisplay", "string", ["auto", "never", "always", "exceptZero"], "auto");
    internalSlots.signDisplay = signDisplay;
    return nf;
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/SupportedLocales.js
  var import_intl_localematcher2 = __toModule(require_intl_localematcher());
  function SupportedLocales(availableLocales, requestedLocales, options) {
    var matcher = "best fit";
    if (options !== void 0) {
      options = ToObject(options);
      matcher = GetOption(options, "localeMatcher", "string", ["lookup", "best fit"], "best fit");
    }
    if (matcher === "best fit") {
      return (0, import_intl_localematcher2.LookupSupportedLocales)(availableLocales, requestedLocales);
    }
    return (0, import_intl_localematcher2.LookupSupportedLocales)(availableLocales, requestedLocales);
  }

  // node_modules/tslib/tslib.es6.js
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/data.js
  var MissingLocaleDataError = function(_super) {
    __extends(MissingLocaleDataError2, _super);
    function MissingLocaleDataError2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = "MISSING_LOCALE_DATA";
      return _this;
    }
    return MissingLocaleDataError2;
  }(Error);

  // bazel-out/darwin-fastbuild/bin/packages/ecma402-abstract/lib/types/date-time.js
  var RangePatternType;
  (function(RangePatternType2) {
    RangePatternType2["startRange"] = "startRange";
    RangePatternType2["shared"] = "shared";
    RangePatternType2["endRange"] = "endRange";
  })(RangePatternType || (RangePatternType = {}));

  // bazel-out/darwin-fastbuild/bin/packages/intl-numberformat/lib/src/currency-digits.generated.js
  var currencyDigitsData = { "ADP": 0, "AFN": 0, "ALL": 0, "AMD": 2, "BHD": 3, "BIF": 0, "BYN": 2, "BYR": 0, "CAD": 2, "CHF": 2, "CLF": 4, "CLP": 0, "COP": 2, "CRC": 2, "CZK": 2, "DEFAULT": 2, "DJF": 0, "DKK": 2, "ESP": 0, "GNF": 0, "GYD": 2, "HUF": 2, "IDR": 2, "IQD": 0, "IRR": 0, "ISK": 0, "ITL": 0, "JOD": 3, "JPY": 0, "KMF": 0, "KPW": 0, "KRW": 0, "KWD": 3, "LAK": 0, "LBP": 0, "LUF": 0, "LYD": 3, "MGA": 0, "MGF": 0, "MMK": 0, "MNT": 2, "MRO": 0, "MUR": 2, "NOK": 2, "OMR": 3, "PKR": 2, "PYG": 0, "RSD": 0, "RWF": 0, "SEK": 2, "SLL": 0, "SOS": 0, "STD": 0, "SYP": 0, "TMM": 0, "TND": 3, "TRL": 0, "TWD": 2, "TZS": 2, "UGX": 0, "UYI": 0, "UYW": 4, "UZS": 2, "VEF": 2, "VND": 0, "VUV": 0, "XAF": 0, "XOF": 0, "XPF": 0, "YER": 0, "ZMK": 0, "ZWD": 0 };

  // bazel-out/darwin-fastbuild/bin/packages/intl-numberformat/lib/src/numbering-systems.generated.js
  var numberingSystemNames = ["adlm", "ahom", "arab", "arabext", "armn", "armnlow", "bali", "beng", "bhks", "brah", "cakm", "cham", "cyrl", "deva", "diak", "ethi", "fullwide", "geor", "gong", "gonm", "grek", "greklow", "gujr", "guru", "hanidays", "hanidec", "hans", "hansfin", "hant", "hantfin", "hebr", "hmng", "hmnp", "java", "jpan", "jpanfin", "jpanyear", "kali", "khmr", "knda", "lana", "lanatham", "laoo", "latn", "lepc", "limb", "mathbold", "mathdbl", "mathmono", "mathsanb", "mathsans", "mlym", "modi", "mong", "mroo", "mtei", "mymr", "mymrshan", "mymrtlng", "newa", "nkoo", "olck", "orya", "osma", "rohg", "roman", "romanlow", "saur", "segment", "shrd", "sind", "sinh", "sora", "sund", "takr", "talu", "taml", "tamldec", "telu", "thai", "tibt", "tirh", "vaii", "wara", "wcho"];

  // bazel-out/darwin-fastbuild/bin/packages/intl-numberformat/lib/src/get_internal_slots.js
  var internalSlotMap = new WeakMap();
  function getInternalSlots(x) {
    var internalSlots = internalSlotMap.get(x);
    if (!internalSlots) {
      internalSlots = Object.create(null);
      internalSlotMap.set(x, internalSlots);
    }
    return internalSlots;
  }

  // bazel-out/darwin-fastbuild/bin/packages/intl-numberformat/lib/src/core.js
  var RESOLVED_OPTIONS_KEYS = [
    "locale",
    "numberingSystem",
    "style",
    "currency",
    "currencyDisplay",
    "currencySign",
    "unit",
    "unitDisplay",
    "minimumIntegerDigits",
    "minimumFractionDigits",
    "maximumFractionDigits",
    "minimumSignificantDigits",
    "maximumSignificantDigits",
    "useGrouping",
    "notation",
    "compactDisplay",
    "signDisplay"
  ];
  var NumberFormat = function(locales, options) {
    if (!this || !OrdinaryHasInstance(NumberFormat, this)) {
      return new NumberFormat(locales, options);
    }
    InitializeNumberFormat(this, locales, options, {
      getInternalSlots: getInternalSlots,
      localeData: NumberFormat.localeData,
      availableLocales: NumberFormat.availableLocales,
      getDefaultLocale: NumberFormat.getDefaultLocale,
      currencyDigitsData: currencyDigitsData,
      numberingSystemNames: numberingSystemNames
    });
    var internalSlots = getInternalSlots(this);
    var dataLocale = internalSlots.dataLocale;
    var dataLocaleData = NumberFormat.localeData[dataLocale];
    invariant(dataLocaleData !== void 0, "Cannot load locale-dependent data for ".concat(dataLocale, "."));
    internalSlots.pl = new Intl.PluralRules(dataLocale, {
      minimumFractionDigits: internalSlots.minimumFractionDigits,
      maximumFractionDigits: internalSlots.maximumFractionDigits,
      minimumIntegerDigits: internalSlots.minimumIntegerDigits,
      minimumSignificantDigits: internalSlots.minimumSignificantDigits,
      maximumSignificantDigits: internalSlots.maximumSignificantDigits
    });
    return this;
  };
  function formatToParts2(x) {
    return FormatNumericToParts(this, toNumeric(x), {
      getInternalSlots: getInternalSlots
    });
  }
  try {
    Object.defineProperty(formatToParts2, "name", {
      value: "formatToParts",
      enumerable: false,
      writable: false,
      configurable: true
    });
  } catch (e) {
  }
  defineProperty(NumberFormat.prototype, "formatToParts", {
    value: formatToParts2
  });
  defineProperty(NumberFormat.prototype, "resolvedOptions", {
    value: function resolvedOptions() {
      if (typeof this !== "object" || !OrdinaryHasInstance(NumberFormat, this)) {
        throw TypeError("Method Intl.NumberFormat.prototype.resolvedOptions called on incompatible receiver");
      }
      var internalSlots = getInternalSlots(this);
      var ro = {};
      for (var _i = 0, RESOLVED_OPTIONS_KEYS_1 = RESOLVED_OPTIONS_KEYS; _i < RESOLVED_OPTIONS_KEYS_1.length; _i++) {
        var key = RESOLVED_OPTIONS_KEYS_1[_i];
        var value = internalSlots[key];
        if (value !== void 0) {
          ro[key] = value;
        }
      }
      return ro;
    }
  });
  var formatDescriptor = {
    enumerable: false,
    configurable: true,
    get: function() {
      if (typeof this !== "object" || !OrdinaryHasInstance(NumberFormat, this)) {
        throw TypeError("Intl.NumberFormat format property accessor called on incompatible receiver");
      }
      var internalSlots = getInternalSlots(this);
      var numberFormat = this;
      var boundFormat = internalSlots.boundFormat;
      if (boundFormat === void 0) {
        boundFormat = function(value) {
          var x = toNumeric(value);
          return numberFormat.formatToParts(x).map(function(x2) {
            return x2.value;
          }).join("");
        };
        try {
          Object.defineProperty(boundFormat, "name", {
            configurable: true,
            enumerable: false,
            writable: false,
            value: ""
          });
        } catch (e) {
        }
        internalSlots.boundFormat = boundFormat;
      }
      return boundFormat;
    }
  };
  try {
    Object.defineProperty(formatDescriptor.get, "name", {
      configurable: true,
      enumerable: false,
      writable: false,
      value: "get format"
    });
  } catch (e) {
  }
  Object.defineProperty(NumberFormat.prototype, "format", formatDescriptor);
  defineProperty(NumberFormat, "supportedLocalesOf", {
    value: function supportedLocalesOf(locales, options) {
      return SupportedLocales(NumberFormat.availableLocales, CanonicalizeLocaleList(locales), options);
    }
  });
  NumberFormat.__addLocaleData = function __addLocaleData() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      data[_i] = arguments[_i];
    }
    for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
      var _b = data_1[_a], d = _b.data, locale = _b.locale;
      var minimizedLocale = new Intl.Locale(locale).minimize().toString();
      NumberFormat.localeData[locale] = NumberFormat.localeData[minimizedLocale] = d;
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
      throw new Error('Locale data for "'.concat(locale, '" has not been loaded in NumberFormat. \nPlease __addLocaleData before adding additional unit data'));
    }
    for (var unit in unitsData.simple) {
      existingData.units.simple[unit] = unitsData.simple[unit];
    }
    for (var unit in unitsData.compound) {
      existingData.units.compound[unit] = unitsData.compound[unit];
    }
  };
  NumberFormat.__defaultLocale = "";
  NumberFormat.localeData = {};
  NumberFormat.availableLocales = new Set();
  NumberFormat.getDefaultLocale = function() {
    return NumberFormat.__defaultLocale;
  };
  NumberFormat.polyfilled = true;
  function toNumeric(val) {
    if (typeof val === "bigint") {
      return val;
    }
    return ToNumber(val);
  }
  try {
    if (typeof Symbol !== "undefined") {
      Object.defineProperty(NumberFormat.prototype, Symbol.toStringTag, {
        configurable: true,
        enumerable: false,
        writable: false,
        value: "Intl.NumberFormat"
      });
    }
    Object.defineProperty(NumberFormat.prototype.constructor, "length", {
      configurable: true,
      enumerable: false,
      writable: false,
      value: 0
    });
    Object.defineProperty(NumberFormat.supportedLocalesOf, "length", {
      configurable: true,
      enumerable: false,
      writable: false,
      value: 1
    });
    Object.defineProperty(NumberFormat, "prototype", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: NumberFormat.prototype
    });
  } catch (e) {
  }

  // bazel-out/darwin-fastbuild/bin/packages/intl-numberformat/lib/src/to_locale_string.js
  function toLocaleString(x, locales, options) {
    var numberFormat = new NumberFormat(locales, options);
    return numberFormat.format(x);
  }

  // bazel-out/darwin-fastbuild/bin/packages/intl-numberformat/lib/should-polyfill.js
  var import_intl_localematcher3 = __toModule(require_intl_localematcher());

  // bazel-out/darwin-fastbuild/bin/packages/intl-numberformat/lib/supported-locales.js
  var supportedLocales = ["af-NA", "af", "agq", "ak", "am", "ar-AE", "ar-BH", "ar-DJ", "ar-DZ", "ar-EG", "ar-EH", "ar-ER", "ar-IL", "ar-IQ", "ar-JO", "ar-KM", "ar-KW", "ar-LB", "ar-LY", "ar-MA", "ar-MR", "ar-OM", "ar-PS", "ar-QA", "ar-SA", "ar-SD", "ar-SO", "ar-SS", "ar-SY", "ar-TD", "ar-TN", "ar-YE", "ar", "as", "asa", "ast", "az-Cyrl", "az-Latn", "az", "bas", "be", "bem", "bez", "bg", "bm", "bn-IN", "bn", "bo-IN", "bo", "br", "brx", "bs-Cyrl", "bs-Latn", "bs", "ca-AD", "ca-ES-VALENCIA", "ca-FR", "ca-IT", "ca", "ccp-IN", "ccp", "ce", "ceb", "cgg", "chr", "ckb-IR", "ckb", "cs", "cy", "da-GL", "da", "dav", "de-AT", "de-BE", "de-CH", "de-IT", "de-LI", "de-LU", "de", "dje", "doi", "dsb", "dua", "dyo", "dz", "ebu", "ee-TG", "ee", "el-CY", "el", "en-001", "en-150", "en-AE", "en-AG", "en-AI", "en-AS", "en-AT", "en-AU", "en-BB", "en-BE", "en-BI", "en-BM", "en-BS", "en-BW", "en-BZ", "en-CA", "en-CC", "en-CH", "en-CK", "en-CM", "en-CX", "en-CY", "en-DE", "en-DG", "en-DK", "en-DM", "en-ER", "en-FI", "en-FJ", "en-FK", "en-FM", "en-GB", "en-GD", "en-GG", "en-GH", "en-GI", "en-GM", "en-GU", "en-GY", "en-HK", "en-IE", "en-IL", "en-IM", "en-IN", "en-IO", "en-JE", "en-JM", "en-KE", "en-KI", "en-KN", "en-KY", "en-LC", "en-LR", "en-LS", "en-MG", "en-MH", "en-MO", "en-MP", "en-MS", "en-MT", "en-MU", "en-MW", "en-MY", "en-NA", "en-NF", "en-NG", "en-NL", "en-NR", "en-NU", "en-NZ", "en-PG", "en-PH", "en-PK", "en-PN", "en-PR", "en-PW", "en-RW", "en-SB", "en-SC", "en-SD", "en-SE", "en-SG", "en-SH", "en-SI", "en-SL", "en-SS", "en-SX", "en-SZ", "en-TC", "en-TK", "en-TO", "en-TT", "en-TV", "en-TZ", "en-UG", "en-UM", "en-US-POSIX", "en-VC", "en-VG", "en-VI", "en-VU", "en-WS", "en-ZA", "en-ZM", "en-ZW", "en", "eo", "es-419", "es-AR", "es-BO", "es-BR", "es-BZ", "es-CL", "es-CO", "es-CR", "es-CU", "es-DO", "es-EA", "es-EC", "es-GQ", "es-GT", "es-HN", "es-IC", "es-MX", "es-NI", "es-PA", "es-PE", "es-PH", "es-PR", "es-PY", "es-SV", "es-US", "es-UY", "es-VE", "es", "et", "eu", "ewo", "fa-AF", "fa", "ff-Adlm-BF", "ff-Adlm-CM", "ff-Adlm-GH", "ff-Adlm-GM", "ff-Adlm-GW", "ff-Adlm-LR", "ff-Adlm-MR", "ff-Adlm-NE", "ff-Adlm-NG", "ff-Adlm-SL", "ff-Adlm-SN", "ff-Adlm", "ff-Latn-BF", "ff-Latn-CM", "ff-Latn-GH", "ff-Latn-GM", "ff-Latn-GN", "ff-Latn-GW", "ff-Latn-LR", "ff-Latn-MR", "ff-Latn-NE", "ff-Latn-NG", "ff-Latn-SL", "ff-Latn", "ff", "fi", "fil", "fo-DK", "fo", "fr-BE", "fr-BF", "fr-BI", "fr-BJ", "fr-BL", "fr-CA", "fr-CD", "fr-CF", "fr-CG", "fr-CH", "fr-CI", "fr-CM", "fr-DJ", "fr-DZ", "fr-GA", "fr-GF", "fr-GN", "fr-GP", "fr-GQ", "fr-HT", "fr-KM", "fr-LU", "fr-MA", "fr-MC", "fr-MF", "fr-MG", "fr-ML", "fr-MQ", "fr-MR", "fr-MU", "fr-NC", "fr-NE", "fr-PF", "fr-PM", "fr-RE", "fr-RW", "fr-SC", "fr-SN", "fr-SY", "fr-TD", "fr-TG", "fr-TN", "fr-VU", "fr-WF", "fr-YT", "fr", "fur", "fy", "ga-GB", "ga", "gd", "gl", "gsw-FR", "gsw-LI", "gsw", "gu", "guz", "gv", "ha-GH", "ha-NE", "ha", "haw", "he", "hi", "hr-BA", "hr", "hsb", "hu", "hy", "ia", "id", "ig", "ii", "is", "it-CH", "it-SM", "it-VA", "it", "ja", "jgo", "jmc", "jv", "ka", "kab", "kam", "kde", "kea", "khq", "ki", "kk", "kkj", "kl", "kln", "km", "kn", "ko-KP", "ko", "kok", "ks-Arab", "ks", "ksb", "ksf", "ksh", "ku", "kw", "ky", "lag", "lb", "lg", "lkt", "ln-AO", "ln-CF", "ln-CG", "ln", "lo", "lrc-IQ", "lrc", "lt", "lu", "luo", "luy", "lv", "mai", "mas-TZ", "mas", "mer", "mfe", "mg", "mgh", "mgo", "mi", "mk", "ml", "mn", "mni-Beng", "mni", "mr", "ms-BN", "ms-ID", "ms-SG", "ms", "mt", "mua", "my", "mzn", "naq", "nb-SJ", "nb", "nd", "nds-NL", "nds", "ne-IN", "ne", "nl-AW", "nl-BE", "nl-BQ", "nl-CW", "nl-SR", "nl-SX", "nl", "nmg", "nn", "nnh", "no", "nus", "nyn", "om-KE", "om", "or", "os-RU", "os", "pa-Arab", "pa-Guru", "pa", "pcm", "pl", "ps-PK", "ps", "pt-AO", "pt-CH", "pt-CV", "pt-GQ", "pt-GW", "pt-LU", "pt-MO", "pt-MZ", "pt-PT", "pt-ST", "pt-TL", "pt", "qu-BO", "qu-EC", "qu", "rm", "rn", "ro-MD", "ro", "rof", "ru-BY", "ru-KG", "ru-KZ", "ru-MD", "ru-UA", "ru", "rw", "rwk", "sa", "sah", "saq", "sat-Olck", "sat", "sbp", "sd-Arab", "sd-Deva", "sd", "se-FI", "se-SE", "se", "seh", "ses", "sg", "shi-Latn", "shi-Tfng", "shi", "si", "sk", "sl", "smn", "sn", "so-DJ", "so-ET", "so-KE", "so", "sq-MK", "sq-XK", "sq", "sr-Cyrl-BA", "sr-Cyrl-ME", "sr-Cyrl-XK", "sr-Cyrl", "sr-Latn-BA", "sr-Latn-ME", "sr-Latn-XK", "sr-Latn", "sr", "su-Latn", "su", "sv-AX", "sv-FI", "sv", "sw-CD", "sw-KE", "sw-UG", "sw", "ta-LK", "ta-MY", "ta-SG", "ta", "te", "teo-KE", "teo", "tg", "th", "ti-ER", "ti", "tk", "to", "tr-CY", "tr", "tt", "twq", "tzm", "ug", "uk", "ur-IN", "ur", "uz-Arab", "uz-Cyrl", "uz-Latn", "uz", "vai-Latn", "vai-Vaii", "vai", "vi", "vun", "wae", "wo", "xh", "xog", "yav", "yi", "yo-BJ", "yo", "yue-Hans", "yue-Hant", "yue", "zgh", "zh-Hans-HK", "zh-Hans-MO", "zh-Hans-SG", "zh-Hans", "zh-Hant-HK", "zh-Hant-MO", "zh-Hant", "zh", "zu"];

  // bazel-out/darwin-fastbuild/bin/packages/intl-numberformat/lib/should-polyfill.js
  function onlySupportsEn() {
    return !Intl.NumberFormat.polyfilled && !Intl.NumberFormat.supportedLocalesOf(["es"]).length;
  }
  function supportsES2020() {
    try {
      var s = new Intl.NumberFormat("en", {
        style: "unit",
        unit: "bit",
        unitDisplay: "long",
        notation: "scientific"
      }).format(1e4);
      if (s !== "1E4 bits") {
        return false;
      }
    } catch (e) {
      return false;
    }
    return true;
  }
  function supportedLocalesOf2(locale) {
    if (!locale) {
      return true;
    }
    var locales = Array.isArray(locale) ? locale : [locale];
    return Intl.NumberFormat.supportedLocalesOf(locales).length === locales.length;
  }
  function shouldPolyfill(locale) {
    if (locale === void 0) {
      locale = "en";
    }
    if (typeof Intl === "undefined" || !("NumberFormat" in Intl) || !supportsES2020() || onlySupportsEn() || !supportedLocalesOf2(locale)) {
      return locale ? (0, import_intl_localematcher3.match)([locale], supportedLocales, "en") : void 0;
    }
  }

  // bazel-out/darwin-fastbuild/bin/packages/intl-numberformat/lib/polyfill.js
  if (shouldPolyfill()) {
    defineProperty(Intl, "NumberFormat", { value: NumberFormat });
    defineProperty(Number.prototype, "toLocaleString", {
      value: function toLocaleString2(locales, options) {
        return toLocaleString(this, locales, options);
      }
    });
  }
})();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
//# sourceMappingURL=polyfill.iife.js.map
