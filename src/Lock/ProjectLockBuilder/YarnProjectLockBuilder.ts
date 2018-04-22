import * as fs from 'fs-extra';
import {ProjectLockBuilderInterface} from './ProjectLockBuilderInterface';
import {ProjectLock} from '../ProjectLock';
import {Dependencies} from '../../types';

export class YarnProjectLockBuilder implements ProjectLockBuilderInterface {
    public supports(filename: string): boolean {
        return filename.endsWith('yarn.lock');
    }

    public create(filename: string): ProjectLock {
        const lockData = require('@yarnpkg/lockfile').parse(fs.readFileSync(filename, 'utf8'));
        if (lockData.type !== 'success') {
            throw new Error('Your yarn.lock file could not be parsed ('+filename+').');
        }

        let installed: Dependencies = {};
        for (let pkgConstraint in lockData.object) {
            installed[pkgConstraint.split('@')[0]] = lockData.object[pkgConstraint].version.split('-')[0];
        }

        return new ProjectLock('yarn', filename, installed);
    }
}
