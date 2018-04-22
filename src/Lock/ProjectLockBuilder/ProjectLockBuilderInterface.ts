import {ProjectLock} from '../ProjectLock';

export interface ProjectLockBuilderInterface {
    supports(filename: string): boolean;
    create(filename: string): ProjectLock;
}
