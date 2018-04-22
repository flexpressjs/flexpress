import {Dependencies} from '../types';

export class FlexpressLock {
    private _filename: string;
    private _configured: Dependencies;

    constructor(filename: string, configured: Dependencies) {
        this._filename = filename;
        this._configured = configured;
    }

    get filename(): string {
        return this._filename;
    }

    get configured(): Dependencies {
        return this._configured;
    }

    isConfigured(packageName: string): boolean {
        return typeof this._configured[packageName] !== 'undefined';
    }
}
