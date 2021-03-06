"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var should_polyfill_1 = require("./should-polyfill");
if (typeof Intl === 'undefined') {
    if (typeof window !== 'undefined') {
        Object.defineProperty(window, 'Intl', {
            value: {},
        });
    }
    else if (typeof global !== 'undefined') {
        Object.defineProperty(global, 'Intl', {
            value: {},
        });
    }
}
if ((0, should_polyfill_1.shouldPolyfill)()) {
    Object.defineProperty(Intl, 'getCanonicalLocales', {
        value: _1.getCanonicalLocales,
        writable: true,
        enumerable: false,
        configurable: true,
    });
}
