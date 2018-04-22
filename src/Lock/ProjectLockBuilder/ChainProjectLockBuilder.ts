import {ProjectLockBuilderInterface} from './ProjectLockBuilderInterface';
import {ProjectLock} from '../ProjectLock';

export class ChainProjectLockBuilder implements ProjectLockBuilderInterface {
    private projectLockBuilders: ProjectLockBuilderInterface[];

    constructor(projectLockBuilders: ProjectLockBuilderInterface[]) {
        this.projectLockBuilders = projectLockBuilders;
    }

    public supports(filename: string): boolean {
        for (let i in this.projectLockBuilders) {
            if (this.projectLockBuilders[i].supports(filename)) {
                return true;
            }
        }

        return false;
    }

    public create(filename: string): ProjectLock {
        for (let i in this.projectLockBuilders) {
            if (this.projectLockBuilders[i].supports(filename)) {
                return this.projectLockBuilders[i].create(filename);
            }
        }

        throw new Error('No project lock builder was found to parse file "'+ filename +'"');
    }
}
