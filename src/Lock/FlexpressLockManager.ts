import * as fs from 'fs-extra';
import {FlexpressLock} from './FlexpressLock';
import {ProjectLock} from './ProjectLock';

export class FlexpressLockManager {
    public create(filename: string): FlexpressLock {
        if (!fs.existsSync(filename)) {
            return new FlexpressLock(filename, {});
        }

        return new FlexpressLock(filename, require(filename));
    }

    public persist(filename: string, lock: ProjectLock): void {
        fs.writeJSON(filename, lock);
    }
}
