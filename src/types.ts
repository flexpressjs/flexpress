export interface Dependencies {
    [key: string]: string,
}

export interface ResolvedRecipe {
    dependency: string,
    version: string,
    archive: string,
    hash: string,
    depends: string[],
}

export interface Manifest {
    module?: string,
    copy?: { [recipePath: string]: string },
    gitignore?: string[],
    scripts?: { [name: string]: string },
    postInstallOutput?: string,
}
