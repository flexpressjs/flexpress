export class Project {
    private _packageJsonPath: string;
    private _projectLockPath: string;
    private _flexpressLockPath: string;

    constructor(packageJsonPath: string, projectLockPath: string, flexpressLockPath: string) {
        this._packageJsonPath = packageJsonPath;
        this._projectLockPath = projectLockPath;
        this._flexpressLockPath = flexpressLockPath;
    }

    get packageJsonPath(): string {
        return this._packageJsonPath;
    }

    get projectLockPath(): string {
        return this._projectLockPath;
    }

    get flexpressLockPath(): string {
        return this._flexpressLockPath;
    }
}
