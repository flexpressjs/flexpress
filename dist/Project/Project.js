"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Project {
    constructor(rootPath, packageJsonPath, projectLockPath, flexpressLockPath) {
        this._rootPath = rootPath;
        this._packageJsonPath = packageJsonPath;
        this._projectLockPath = projectLockPath;
        this._flexpressLockPath = flexpressLockPath;
    }
    get rootPath() {
        return this._rootPath;
    }
    get packageJsonPath() {
        return this._packageJsonPath;
    }
    get projectLockPath() {
        return this._projectLockPath;
    }
    get flexpressLockPath() {
        return this._flexpressLockPath;
    }
}
exports.Project = Project;
//# sourceMappingURL=Project.js.map