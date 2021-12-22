import { __spreadArray } from "tslib";
export function pack(data) {
    var zoneNames = Object.keys(data.zones);
    zoneNames.sort(); // so output is stable
    return {
        zones: zoneNames.map(function (zone) {
            return __spreadArray([
                zone
            ], data.zones[zone].map(function (_a) {
                var ts = _a[0], others = _a.slice(1);
                return __spreadArray([ts === '' ? '' : ts.toString(36)], others, true).join(',');
            }), true).join('|');
        }),
        abbrvs: data.abbrvs.join('|'),
        offsets: data.offsets.map(function (o) { return o.toString(36); }).join('|'),
    };
}
export function unpack(data) {
    var abbrvs = data.abbrvs.split('|');
    var offsets = data.offsets.split('|').map(function (n) { return parseInt(n, 36); });
    var packedZones = data.zones;
    var zones = {};
    for (var _i = 0, packedZones_1 = packedZones; _i < packedZones_1.length; _i++) {
        var d = packedZones_1[_i];
        var _a = d.split('|'), zone = _a[0], zoneData = _a.slice(1);
        zones[zone] = zoneData
            .map(function (z) { return z.split(','); })
            .map(function (_a) {
            var ts = _a[0], abbrvIndex = _a[1], offsetIndex = _a[2], dst = _a[3];
            return [
                ts === '' ? -Infinity : parseInt(ts, 36),
                abbrvs[+abbrvIndex],
                offsets[+offsetIndex],
                dst === '1',
            ];
        });
    }
    return zones;
}
