import {ProjectLockBuilderInterface} from './ProjectLockBuilderInterface';
import {ProjectLock} from '../ProjectLock';
import {Dependencies} from '../../types';

export class NpmProjectLockBuilder implements ProjectLockBuilderInterface {
    public supports(filename: string): boolean {
        return filename.endsWith('package-lock.json');
    }

    public create(filename: string): ProjectLock {
        const lockData = require(filename);

        let installed: Dependencies = {};
        for (let pkgName in lockData.dependencies) {
            installed[pkgName] = lockData.dependencies[pkgName].version.split('-')[0];
        }

        return new ProjectLock('npm', filename, installed);
    }
}
