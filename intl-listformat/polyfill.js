"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _1 = (0, tslib_1.__importDefault)(require("./"));
var should_polyfill_1 = require("./should-polyfill");
if ((0, should_polyfill_1.shouldPolyfill)()) {
    Object.defineProperty(Intl, 'ListFormat', {
        value: _1.default,
        writable: true,
        enumerable: false,
        configurable: true,
    });
}
