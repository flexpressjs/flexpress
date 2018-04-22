"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProjectRootFinder {
    static findProjectRoot() {
        const packageJsonPath = require('pkg-up').sync();
        if (!packageJsonPath) {
            throw new Error('Your package.json file has not been found. Are you sure you are located in a proper Node.js project?');
        }
        return packageJsonPath;
    }
}
exports.ProjectRootFinder = ProjectRootFinder;
//# sourceMappingURL=ProjectRootFinder.js.map