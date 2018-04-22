"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const ProjectLock_1 = require("../ProjectLock");
class YarnProjectLockBuilder {
    supports(filename) {
        return filename.endsWith('yarn.lock');
    }
    create(filename) {
        const lockData = require('@yarnpkg/lockfile').parse(fs.readFileSync(filename, 'utf8'));
        if (lockData.type !== 'success') {
            throw new Error('Your yarn.lock file could not be parsed (' + filename + ').');
        }
        let installed = {};
        for (let pkgConstraint in lockData.object) {
            installed[pkgConstraint.split('@')[0]] = lockData.object[pkgConstraint].version.split('-')[0];
        }
        return new ProjectLock_1.ProjectLock('yarn', filename, installed);
    }
}
exports.YarnProjectLockBuilder = YarnProjectLockBuilder;
//# sourceMappingURL=YarnProjectLockBuilder.js.map