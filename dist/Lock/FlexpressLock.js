"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FlexpressLock {
    constructor(filename, configured) {
        this._filename = filename;
        this._configured = configured;
    }
    get filename() {
        return this._filename;
    }
    get configured() {
        return this._configured;
    }
    isConfigured(packageName) {
        return typeof this._configured[packageName] !== 'undefined';
    }
}
exports.FlexpressLock = FlexpressLock;
//# sourceMappingURL=FlexpressLock.js.map