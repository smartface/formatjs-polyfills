"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartitionNumberPattern = void 0;
var tslib_1 = require("tslib");
var FormatNumericToString_1 = require("./FormatNumericToString");
var _262_1 = require("../262");
var ComputeExponent_1 = require("./ComputeExponent");
var format_to_parts_1 = (0, tslib_1.__importDefault)(require("./format_to_parts"));
/**
 * https://tc39.es/ecma402/#sec-formatnumberstring
 */
function PartitionNumberPattern(numberFormat, x, _a) {
    var _b;
    var getInternalSlots = _a.getInternalSlots;
    var internalSlots = getInternalSlots(numberFormat);
    var pl = internalSlots.pl, dataLocaleData = internalSlots.dataLocaleData, numberingSystem = internalSlots.numberingSystem;
    var symbols = dataLocaleData.numbers.symbols[numberingSystem] ||
        dataLocaleData.numbers.symbols[dataLocaleData.numbers.nu[0]];
    var magnitude = 0;
    var exponent = 0;
    var n;
    if (isNaN(x)) {
        n = symbols.nan;
    }
    else if (!isFinite(x)) {
        n = symbols.infinity;
    }
    else {
        if (internalSlots.style === 'percent') {
            x *= 100;
        }
        ;
        _b = (0, ComputeExponent_1.ComputeExponent)(numberFormat, x, {
            getInternalSlots: getInternalSlots,
        }), exponent = _b[0], magnitude = _b[1];
        // Preserve more precision by doing multiplication when exponent is negative.
        x = exponent < 0 ? x * Math.pow(10, -exponent) : x / Math.pow(10, exponent);
        var formatNumberResult = (0, FormatNumericToString_1.FormatNumericToString)(internalSlots, x);
        n = formatNumberResult.formattedString;
        x = formatNumberResult.roundedNumber;
    }
    // Based on https://tc39.es/ecma402/#sec-getnumberformatpattern
    // We need to do this before `x` is rounded.
    var sign;
    var signDisplay = internalSlots.signDisplay;
    switch (signDisplay) {
        case 'never':
            sign = 0;
            break;
        case 'auto':
            if ((0, _262_1.SameValue)(x, 0) || x > 0 || isNaN(x)) {
                sign = 0;
            }
            else {
                sign = -1;
            }
            break;
        case 'always':
            if ((0, _262_1.SameValue)(x, 0) || x > 0 || isNaN(x)) {
                sign = 1;
            }
            else {
                sign = -1;
            }
            break;
        default:
            // x === 0 -> x is 0 or x is -0
            if (x === 0 || isNaN(x)) {
                sign = 0;
            }
            else if (x > 0) {
                sign = 1;
            }
            else {
                sign = -1;
            }
    }
    return (0, format_to_parts_1.default)({ roundedNumber: x, formattedString: n, exponent: exponent, magnitude: magnitude, sign: sign }, internalSlots.dataLocaleData, pl, internalSlots);
}
exports.PartitionNumberPattern = PartitionNumberPattern;
