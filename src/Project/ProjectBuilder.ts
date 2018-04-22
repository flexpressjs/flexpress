import * as fs from 'fs-extra';
import * as path from 'path';
import {Project} from './Project';

export class ProjectBuilder {
    public static createProjectFromStructure(): Project {
        const packageJsonPath = require('pkg-up').sync();

        if (!packageJsonPath) {
            throw new Error('Your package.json file has not been found. Are you sure you are located in a proper Node.js project?');
        }

        const rootDir = path.dirname(packageJsonPath);

        let projectLockPath = rootDir+'/yarn.lock';
        if (!fs.existsSync(projectLockPath)) {
            projectLockPath = rootDir+'/package-lock.json';

            if (!fs.existsSync(projectLockPath)) {
                throw new Error('Neither a package-lock.json nor a yarn.lock file was found in your project. Please run npm install or yarn install before running Flexpress.');
            }
        }

        return new Project(packageJsonPath, projectLockPath, rootDir+'/flexpress.lock');
    }
}
