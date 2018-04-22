import * as fs from 'fs-extra';
import * as path from 'path';

import {Project} from '../Project/Project';
import {ProjectLock} from '../Lock/ProjectLock';
import {FlexpressLock} from '../Lock/FlexpressLock';
import {Manifest, ResolvedRecipe} from '../types';

export class RecipesApplier {
    private cachePath: string;

    constructor(cachePath: string) {
        this.cachePath = cachePath;
    }

    public findRecipesToApply(recipes: ResolvedRecipe[], projectLock: ProjectLock, flexpressLock: FlexpressLock): ResolvedRecipe[] {
        let newPackages: { [key: string]: boolean } = {};
        for (let pkgName in projectLock.installed) {
            if (!flexpressLock.isConfigured(pkgName)) {
                newPackages[pkgName] = true;
            }
        }

        let toApply: ResolvedRecipe[] = [];
        recipes.forEach(recipe => {
            if (typeof newPackages[recipe.dependency] !== 'undefined') {
                toApply.push(recipe);
            }
        });

        return toApply;
    }

    public applyRecipe(project: Project, recipe: ResolvedRecipe): Manifest {
        const projectRoot = path.dirname(project.packageJsonPath);
        const recipeCacheDir = this.cachePath+'/'+recipe.dependency+'/'+recipe.version;
        const manifest: Manifest = require(recipeCacheDir+'/manifest.json');

        if (typeof manifest.copy !== 'undefined') {
            for (let from in manifest.copy) {
                from = recipeCacheDir+'/'+from;
                const to = projectRoot+'/'+manifest.copy[from];

                fs.ensureDirSync(path.dirname(to));
                fs.copyFileSync(from, to);
            }
        }

        return manifest;
    }
}
