export class Project {
    private _rootPath: string;
    private _packageJsonPath: string;
    private _projectLockPath: string;
    private _flexpressLockPath: string;

    constructor(rootPath: string, packageJsonPath: string, projectLockPath: string, flexpressLockPath: string) {
        this._rootPath = rootPath;
        this._packageJsonPath = packageJsonPath;
        this._projectLockPath = projectLockPath;
        this._flexpressLockPath = flexpressLockPath;
    }

    get rootPath(): string {
        return this._rootPath;
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
