import {Dependencies} from '../types';

export class ProjectLock {
    private _source: string;
    private _filename: string;
    private _installed: Dependencies;

    constructor(source: string, filename: string, installed: Dependencies) {
        this._source = source;
        this._filename = filename;
        this._installed = installed;
    }

    get source(): string {
        return this._source;
    }

    get filename(): string {
        return this._filename;
    }

    get installed(): Dependencies {
        return this._installed;
    }

    isInstalled(packageName: string): boolean {
        return typeof this._installed[packageName] !== 'undefined';
    }
}
