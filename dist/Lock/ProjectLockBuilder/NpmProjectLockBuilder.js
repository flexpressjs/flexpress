"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectLock_1 = require("../ProjectLock");
class NpmProjectLockBuilder {
    supports(filename) {
        return filename.endsWith('package-lock.json');
    }
    create(filename) {
        const lockData = require(filename);
        let installed = {};
        for (let pkgName in lockData.dependencies) {
            installed[pkgName] = lockData.dependencies[pkgName].version.split('-')[0];
        }
        return new ProjectLock_1.ProjectLock('npm', filename, installed);
    }
}
exports.NpmProjectLockBuilder = NpmProjectLockBuilder;
//# sourceMappingURL=NpmProjectLockBuilder.js.map