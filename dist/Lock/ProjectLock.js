"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProjectLock {
    constructor(source, filename, installed) {
        this._source = source;
        this._filename = filename;
        this._installed = installed;
    }
    get source() {
        return this._source;
    }
    get filename() {
        return this._filename;
    }
    get installed() {
        return this._installed;
    }
    isInstalled(packageName) {
        return typeof this._installed[packageName] !== 'undefined';
    }
}
exports.ProjectLock = ProjectLock;
//# sourceMappingURL=ProjectLock.js.map