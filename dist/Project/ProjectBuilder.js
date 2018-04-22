"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const Project_1 = require("./Project");
class ProjectBuilder {
    static createProjectFromStructure() {
        const packageJsonPath = require('pkg-up').sync();
        if (!packageJsonPath) {
            throw new Error('Your package.json file has not been found. Are you sure you are located in a proper Node.js project?');
        }
        const rootPath = path.dirname(packageJsonPath);
        let projectLockPath = rootPath + '/yarn.lock';
        if (!fs.existsSync(projectLockPath)) {
            projectLockPath = rootPath + '/package-lock.json';
            if (!fs.existsSync(projectLockPath)) {
                throw new Error('Neither a package-lock.json nor a yarn.lock file was found in your project. Please run npm install or yarn install before running Flexpress.');
            }
        }
        return new Project_1.Project(rootPath, packageJsonPath, projectLockPath, rootPath + '/flexpress.lock');
    }
}
exports.ProjectBuilder = ProjectBuilder;
//# sourceMappingURL=ProjectBuilder.js.map