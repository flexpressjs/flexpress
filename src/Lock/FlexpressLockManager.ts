import * as fs from 'fs-extra';
import {FlexpressLock} from './FlexpressLock';
import {ProjectLock} from './ProjectLock';

export class FlexpressLockManager {
    public create(filename: string): FlexpressLock {
        if (!fs.existsSync(filename)) {
            return new FlexpressLock(filename, {});
        }

        return new FlexpressLock(filename, fs.readJSONSync(filename));
    }

    public persist(filename: string, lock: ProjectLock): void {
        fs.writeJSONSync(filename, lock.installed);
    }
}
